fs             = require 'fs'
mmap           = require 'mmap'
{print, error} = require 'util'

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
  , 1000

