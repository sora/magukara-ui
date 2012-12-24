express  = require 'express'
wsserver = require('ws').Server

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
    ws.send buf
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

