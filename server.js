var express = require("express"),
    stylus = require("stylus"),
    nib = require("nib");

var app = express.createServer();
app.configure(function() {
    app.set("views", __dirname + "/views");
    app.set("view engine", "jade");
    app.use(express.bodyParser());
    app.use(express.cookieParser());
    app.use(stylus.middleware({
        src: __dirname + "/public",
        compile: function compile(str, path) {
            return stylus(str)
                .set('filename', path)
                .set('compress', true)
                .use(nib());
        }
    }));
    app.use(app.router);
    app.use(express["static"](__dirname + "/public"));
});

app.configure("development", function() {
    app.use(express.errorHandler({
        dumpExceptions: true,
        showStack: true
    }));
});

app.configure("production", function() {
    app.use(express.errorHandler());
});

app.get("/", function(req, res) {
    res.render("index", {
        layout: false
    });
});

app.listen(parseInt(process.env.PORT, 10) || 1337);
console.log("Listening on port " + app.address().port + " in " + app.settings.env + " mode.");
