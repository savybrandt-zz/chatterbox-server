/*************************************************************

You should implement your request handler function in this file.

requestHandler is already getting passed to http.createServer()
in basic-server.js, but it won't work as is.

You'll have to figure out a way to export this function from
this file and include it in basic-server.js so that it actually works.

*Hint* Check out the node module documentation at http://nodejs.org/api/modules.html.

**************************************************************/
var defaultCorsHeaders = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'access-control-max-age': 10 // Seconds.
};
var _ = require('underscore');
var fs = require('fs');
var messages = [];


var requestHandler = function(request, response) {
  console.log('request.url: ', request.url);
  if (request.url === '/' || request.url === '/?username=anonymous') {
    fs.readFile('/Users/student/Desktop/hrsf53-chatterbox-client/client/index.html', function(err, data) {
      if (err) {
        throw err;
      }
      data = data.toString();
      var statusCode = 200;
      var headers = defaultCorsHeaders;
      headers['Content-Type'] = 'text/html';
      response.writeHead(statusCode, headers);
      response.end(data);
      console.log('responsed html');
    });
  } else if ( request.url === '/classes/messages') {
    console.log('Serving request type ' + request.method + ' for url ' + request.url);
    if (request.method === 'POST') {
      if (request._postData) {
        var message = request._postData;
        messages.push(message);
      } else {
        request.on('data', function(chunk) {
          var message = (chunk.toString());
          messages.push(JSON.parse(message));
        });  
      }
      var statusCode = 201;
      //console.log(_.findKey(response, 'username'));
    } else if ( request.method === 'GET') {
      var statusCode = 200; 

    }
    // The outgoing status.
    // See the note below about CORS headers.
    var headers = defaultCorsHeaders;

    // Tell the client we are sending them plain text.
    //
    // *You will need to change this if you are sending something
    // other than plain text, like JSON or HTML.
    headers['Content-Type'] = 'application/json';

    // .writeHead() writes to the request line and headers of the response,
    // which includes the status and all headers.
    response.writeHead(statusCode, headers);

    // Make sure to always call response.end() - Node may not send
    // anything back to the client until you do. The string you pass to
    // response.end() will be the body of the response - i.e. what shows
    // up in the browser.
    //
    // Calling .end "flushes" the response's internal buffer, forcing
    // node to actually send all the data over to the client.
    response.end(JSON.stringify({results: messages}));
  } else if (request.url === '/styles/styles.css') {
    fs.readFile('/Users/student/Desktop/hrsf53-chatterbox-client/client/styles/styles.css', function(err, data) {
      if (err) {
        throw err;
      }
      data = data.toString();
      var statusCode = 200;
      var headers = defaultCorsHeaders;
      headers['Content-Type'] = 'text/css';
      response.writeHead(statusCode, headers);
      response.end(data);
      console.log('responded css');
    });
  } else if (request.url === '/bower_components/jquery/dist/jquery.js') {
    fs.readFile('/Users/student/Desktop/hrsf53-chatterbox-client/client/bower_components/jquery/dist/jquery.js', function(err, data) {
      if (err) {
        throw err;
      }
      data = data.toString();
      var statusCode = 200;
      var headers = defaultCorsHeaders;
      headers['Content-Type'] = 'text/javascript';
      response.writeHead(statusCode, headers);
      response.end(data);
      console.log('responded bower/jquery');
    });
  } else if (request.url === '/env/config.js') {
    fs.readFile('/Users/student/Desktop/hrsf53-chatterbox-client/client/env/config.js', function(err, data) {
      if (err) {
        throw err;
      }
      data = data.toString();
      var statusCode = 200;
      var headers = defaultCorsHeaders;
      headers['Content-Type'] = 'text/javascript';
      response.writeHead(statusCode, headers);
      response.end(data);
      console.log('responded config.js');
    });
  } else if (request.url === '/scripts/app.js') {
    fs.readFile('/Users/student/Desktop/hrsf53-chatterbox-client/client/scripts/app.js', function(err, data) {
      if (err) {
        throw err;
      }
      data = data.toString();
      var statusCode = 200;
      var headers = defaultCorsHeaders;
      headers['Content-Type'] = 'text/javascript';
      response.writeHead(statusCode, headers);
      response.end(data);
      console.log('responded app.js');
    });
  } else if (request.url === '/images/spiffygif_46x46.gif') {
    fs.readFile('/Users/student/Desktop/hrsf53-chatterbox-client/client/images/spiffygif_46x46.gif', function(err, data) {
      if (err) {
        throw err;
      }
      data = data.toString();
      var statusCode = 200;
      var headers = defaultCorsHeaders;
      headers['Content-Type'] = 'image/gif';
      response.writeHead(statusCode, headers);
      response.end(data);
      console.log('responded spiffygif_46x46.gif');
    });
  } else if (request.url === '/?username=anonymous') {
    var statusCode = 200;
    console.log('inside of anonymous');
    var headers = defaultCorsHeaders;
    response.writeHead(statusCode);
    response.end();
  } else {
    response.writeHead(404);
    response.end();
  }
  // if (request.url !== '/classes/messages') {
  // }
  // Request and Response come from node's http module.
  //
  // They include information about both the incoming request, such as
  // headers and URL, and about the outgoing response, such as its status
  // and content.
  //
  // Documentation for both request and response can be found in the HTTP section at
  // http://nodejs.org/documentation/api/

  // Do some basic logging.
  //
  // Adding more logging to your server can be an easy way to get passive
  // debugging help, but you should always be careful about leaving stray
  // console.logs in your code.
};

// These headers will allow Cross-Origin Resource Sharing (CORS).
// This code allows this server to talk to websites that
// are on different domains, for instance, your chat client.
//
// Your chat client is running from a url like file://your/chat/client/index.html,
// which is considered a different domain.
//
// Another way to get around this restriction is to serve you chat
// client from this domain by setting up static file serving.

module.exports.requestHandler = requestHandler;
// module.exports.messages = messages;

