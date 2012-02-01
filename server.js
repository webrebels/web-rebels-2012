var http = require('http');
var url = require('url');
var path = require('path');
var fs = require('fs');
var sys = require('sys');



// Simple http server

var httpServer = http.createServer( function ( request, response ) {

    var uri             = url.parse( request.url ).pathname,
        filepath        = "www" + uri,
        proxy,
        proxyOptions    = {
            host: 'api.twitter.com',
            port: 80,
            path: request.url,
            method: 'GET'
        };

    /*
     // Proxy example - Uncomment if we want to snatch data from somewhere and pass it trough to a XHR request

     if ( request.url.substring(0,8) === '/twitter' ) {

     options = {
     host: 'api.twitter.com',
     port: 80,
     path: request.url,
     method: 'GET'
     };

     proxy = http.request(options, function ( proxyRequest ) {

     response.writeHead(proxyRequest.statusCode, {'Content-Type': proxyRequest.headers['content-type']});

     proxyRequest.on('data', function ( chunk ) {
     response.write(chunk, "binary");
     });

     proxyRequest.on('end', function () {
     response.end();
     });
     });

     proxy.on('error', function ( e ) {
     console.log('problem with proxy request: ' + e.message);
     });

     proxy.end();

     return;


     } else
     */

    // If no filename provided, assume we want to serve index.html

    if ( filepath.substring(filepath.length - 1) === '/' ) {
        filepath  += 'index.html';
    }


    path.exists(filepath, function ( ex ) {

        if ( !ex ) {

            // File not on disc - Serve 404
            httpServer.status404( response, uri );
            return;
        }

        fs.readFile(filepath, "binary", function ( error, fileContent ) {

            // Crapper... Something went wrong. Serve 500
            if ( error ) {
                httpServer.status500( response, filepath );
                return;
            }

            // Yay!!! All ok! Serve file :-D
            httpServer.status200( response, fileContent, httpServer.types[path.extname(filepath).slice(1)] ? httpServer.types[path.extname(filepath).slice(1)] : 'application/octet-stream' );
        });

    });

});
httpServer.listen( parseInt( process.env.PORT, 10) || 1337);
console.log('Rebel running wild at port: ' + ( httpServer.address().port ) );



// Status codes

httpServer.status200 = function ( response, data, contentType ) {
    response.writeHead(200, {'Content-Type': contentType});
    response.write(data, "binary");
    response.end();
};

httpServer.status404 = function ( response, data ) {
    response.writeHead(404, {'Content-Type': 'text/html'});
    response.write("404 - File not found: " + data);
    response.end();
};

httpServer.status500 = function ( response, data ) {
    response.writeHead(500, {'Content-Type': 'text/html'});
    response.write("500 - Could not read " + data + " from file system!");
    response.end();
};



// MIME types

httpServer.types = {
    'appcache'  : 'text/cache-manifest',
    'atom'      : 'application/atom+xml',
    'crx'       : 'application/x-chrome-extension',
    'css'       : 'text/css',
    'eot'       : 'application/vnd.ms-fontobject',
    'gif'       : 'image/gif',
    'html'      : 'text/html',
    'ico'       : 'image/vnd.microsoft.icon',
    'jpg'       : 'image/jpeg',
    'jpeg'      : 'image/jpeg',
    'js'        : 'text/javascript',
    'json'      : 'application/json',
    'mathml'    : 'application/mathml+xml',
    'mov'       : 'video/quicktime',
    'mp3'       : 'audio/mpeg',
    'mp4'       : 'video/mp4',
    'mpeg'      : 'video/mpeg',
    'ogg'       : 'video/ogg',
    'otf'       : 'font/opentype',
    'pdf'       : 'application/pdf',
    'png'       : 'image/png',
    'svg'       : 'image/svg+xml',
    'swf'       : 'application/x-shockwave-flash',
    'tar'       : 'application/x-tar',
    'ttf'       : 'font/truetype',
    'txt'       : 'text/plain',
    'webm'      : 'video/webm',
    'webp'      : 'image/webp',
    'woff'      : 'font/woff',
    'xhtml'     : 'application/xhtml+xml',
    'xml'       : 'application/xml',
    'xsl'       : 'application/xml',
    'xslt'      : 'application/xslt+xml',
    'zip'       : 'application/zip'
};
