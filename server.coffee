fs = require "fs"
path = require "path"
connect = require "connect"
gzip = require "connect-gzip"
jade = require "jade"
stylus = require "stylus"
nib = require "nib"
_ = require "underscore"

articlePath = path.join __dirname, "articles"
pageTemplate = jade.compile fs.readFileSync (path.join __dirname, "views", "layout.jade"), "utf-8"
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
    fs.readdir articlePath, (err, files) ->
      (_(files).chain().filter (file) -> file.match /\.jade$/).each (file) ->
        fs.readFile (path.join articlePath, file), "utf-8", (err, data) ->
          page = pageTemplate { body: (jade.compile data)() }
          url = path.basename file, '.jade'
          app.get "/#{if url is 'index' then '' else url}", (req, res) ->
            res.setHeader "Content-Type", "text/html"
            res.end page

if environment is "production"
  app.use connect.errorHandler()
  app.use connect.staticCache()
else
  app.use connect.errorHandler
    dumpExceptions: true
    showStack: true

app.listen((parseInt process.env.PORT, 10) or 1337)
console.log "Listening on port #{app.address().port} in #{environment} mode."
