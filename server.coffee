express = require "express"
stylus = require "stylus"
nib = require "nib"

app = express.createServer()
app.configure ->
  app.set "views", "#{__dirname}/views"
  app.set "view engine", "jade"
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

app.get "/", (req, res) ->
  res.render "index"

app.listen((parseInt process.env.PORT, 10) or 1337)
console.log "Listening on port #{app.address().port} in #{app.settings.env} mode."
