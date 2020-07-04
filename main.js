var http = require('http');
var fs = require('fs');

function onRequest(request, response)
{
	if(request.method == 'GET' && request.url == '/'){ response.writeHead(200,{"Content-Type":"text/html"});												  fs.createReadStream("./test.html").pipe(response);
													 }
}

http.createServer(onRequest).listen(3000);
console.log("running");