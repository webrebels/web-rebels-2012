fs = require "fs"
path = require "path"
connect = require "connect"
gzip = require "connect-gzip"
jade = require "jade"
stylus = require "stylus"
nib = require "nib"
_ = require "underscore"

environment = process.env.NODE_ENV or "development"

app = connect()
app.use connect.bodyParser()
app.use connect.cookieParser()
app.use connect.errorHandler()
app.use connect.limit("1kb")
app.use stylus.middleware
    src: "#{__dirname}/public"
    compile: (str, path) ->
      stylus(str).set("filename", path).set("compress", true).use nib()
app.use gzip.staticGzip "#{__dirname}/public"
app.use connect.router (app) ->
  index = fs.readFileSync (path.join __dirname, "views", "index.html"), "utf-8"
  app.get "/", (req, res) ->
    res.setHeader "Content-Type", "text/html"
    res.end index

if environment is "production"
  app.use connect.errorHandler()
  app.use connect.staticCache()
else
  app.use connect.errorHandler
    dumpExceptions: true
    showStack: true

app.listen((parseInt process.env.PORT, 10) or 1337)
console.log "Listening on port #{app.address().port} in #{environment} mode."
