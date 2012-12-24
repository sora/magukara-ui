fs      = require 'fs'
{print} = require 'util'
{spawn} = require 'child_process'

build = (callback) ->
  # coffee -j app.js -c mmap.coffee server.coffee
  coffee = spawn 'coffee', ['-j', 'app.js', '-c', 'src']
  coffee.stderr.on 'data', (data) ->
    process.stderr.write data.toString()
  coffee.stdout.on 'data', (data) ->
    print data.toString()
  coffee.on 'exit', (code) ->
    callback?() if code is 0

task 'build', 'Compile MAGUKARA-UI source files', ->
  build()

