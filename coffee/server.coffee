fs             = require 'fs'
mmap           = require 'mmap'
{print, error} = require 'util'
express        = require 'express'
wsserver       = require('ws').Server

PCI_BASE_ADDR = 0xe9000000
MEM_SIZE      = 0x80

if process.env.NODE_ENV is 'run'
  # setup: fd
  try
    fd = fs.openSync '/dev/mem', 'w+'
  catch e
    error 'cannot open: /dev/mem'

  # setup: mmap
  try
    buf = mmap.map MEM_SIZE, mmap.PROT_READ | mmap.PROT_WRITE, mmap.MAP_SHARED, fd, PCI_BASE_ADDR
  catch e
    error 'cannot mmap: ' + PCI_BASE_ADDR
else if process.env.NODE_ENV is 'test'
  setInterval ->
    # setup: fd
    try
      fd = fs.openSync '/dev/urandom', 'r'
    catch e
      error 'cannot open: /dev/urandom'
    buf = fs.readSync fd, MEM_SIZE, 0, 'base64'
    print buf + "\n"
    fs.close fd
  , 100

# setup: web server
app = express()
app.configure ->
  app.use express.static(__dirname + '/public')
app.listen 8081

# setup: websocket server
wss = new wsserver {server: app}

# websocket: server
wss.on 'connection', (ws) ->
  # Server: send NIC stats
  id = setInterval ->
    ws.send buf, {binary: true, mask: false}
  , 15

  # Server: recieve commands
  ws.on 'message', (_msg) ->
    msg = JSON.parse _msg
    switch msg.cmd
      when 'mode'
        buf[0x0] = msg.data
      when 'frame_size'
        buf[0x4..0x7] = [msg.data >> 24, msg.data >> 16, msg.data >> 8, msg.data & 0xF]
      when 'frame_gap'
        buf[0x8..0xb] = [msg.data >> 24, msg.data >> 16, msg.data >> 8, msg.data & 0xF]
      when 'arpreq'
        buf[0xc] = msg.data

  # Server: close session
  ws.on 'close', ->
    console.log 'Stopping connection'
    clearInterval id

