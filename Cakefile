fs               = require 'fs'
{print, error}   = require 'util'
{spawn}          = require 'child_process'
CoffeeScript     = require 'coffee-script'
{parser, uglify} = require 'uglify-js'

source_files =
  'app.js': [
    'coffee/server.coffee'
  ]
  'public/js/script.js': [
    'coffee/client.coffee'
    'coffee/wiremap.coffee'
  ]

write_javascript = (filename, body) ->
  fs.writeFileSync filename, """
// Magukara UI
// by Yohei Kuga <sora@haeena.net>
#{body}
"""
  print "wrote #{filename}"

# build
#
task 'build', 'build magukara-ui from source', ->
  file_name     = null
  file_contents = null
  try
    for javascript, sources of source_files
      code = ''
      for src in sources
        file_name     = src
        file_contents = "#{fs.readFileSync src}"
        code          += CoffeeScript.compile file_contents
    ast = parser.parse code
    ast = uglify.gen_code ast, { beautify: true }
    write_javascript javascript, ast
  catch e
    error e, file_name

