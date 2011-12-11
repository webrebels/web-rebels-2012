fs = require "fs"
path = require "path"
express = require "express"
jade = require "jade"
stylus = require "stylus"
nib = require "nib"
_ = require "underscore"

articlePath = path.join __dirname, "articles"
pageTemplate = jade.compile fs.readFileSync (path.join __dirname, "views", "layout.jade"), "utf-8"

app = express.createServer()
app.configure ->
  app.use express.bodyParser()
  app.use express.cookieParser()
  app.use stylus.middleware
    src: "#{__dirname}/public"
    compile: (str, path) ->
      stylus(str).set("filename", path).set("compress", true).use nib()
  app.use app.router
  app.use express.static "#{__dirname}/public"

app.configure "development", ->
  app.use express.errorHandler
    dumpExceptions: true
    showStack: true

app.configure "production", ->
  app.use express.errorHandler()

fs.readdir articlePath, (err, files) ->
  (_(files).chain().filter (file) -> file.match /\.jade$/).each (file) ->
    fs.readFile (path.join articlePath, file), "utf-8", (err, data) ->
      page = pageTemplate { body: (jade.compile data)() }
      url = path.basename file, '.jade'
      app.get "/#{if url is 'index' then '' else url}", (req, res) ->
        res.send page,
          "Content-Type": "text/html"

app.listen((parseInt process.env.PORT, 10) or 1337)
console.log "Listening on port #{app.address().port} in #{app.settings.env} mode."
