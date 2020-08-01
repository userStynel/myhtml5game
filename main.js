var http = require('http');
var url = require('url');
var fs = require('fs');
var mime = require('mime');

var server = http.createServer(function(request, response){
	var parsedUrl = url.parse(request.url);
	var resource = parsedUrl.pathname;
	
	if(resource == '/')
	{
		fs.readFile('test.html', function(error, data){
			if(error)
			{
				response.writeHead(500, {'Content-Type':'text/html'});
				response.end('500 Internal Server ' + error);
			}
			else
			{
				response.writeHead(200, {'Content-Type':'text/html'});
				response.end(data);
			}
		});
	}
	else if(resource.indexOf('/assets/') == 0)
	{
		var imgPath = resource.substring(1);
		console.log('imgPath= ' + imgPath);
		var imgMime = mime.getType(imgPath);
		console.log('mime= ' + imgMime);
		
		fs.readFile(imgPath, function(error, data){
			if(error)
			{
				response.writeHead(500, {'Content-Type':'text/html'});
				response.end('500 Internal Server ' + error);
			}
			else
			{
				response.writeHead(200, {'Content-Type':imgMime});
				response.end(data);
			}
		});
	}
	else if(resource.indexOf('/phaser-3.23.0/') == 0)
	{
		var scriptPath = resource.substring(1);
		console.log('scriptPath= ' + scriptPath);
		var scriptMime = mime.getType(scriptPath);
		console.log('mime= ' + scriptMime);
		
		fs.readFile(scriptPath, function(error, data){
			if(error)
			{
				response.writeHead(500, {'Content-Type':'text/html'});
				response.end('500 Internal Server ' + error);
			}
			else
			{
				response.writeHead(200, {'Content-Type':scriptMime});
				response.end(data);
			}
		});
	}
	else if(resource.indexOf('/scripts/') == 0)
	{
		var scriptPath = resource.substring(1);
		console.log('scriptPath= ' + scriptPath);
		var scriptMime = mime.getType(scriptPath);
		console.log('mime= ' + scriptMime);
		
		fs.readFile(scriptPath, function(error, data){
			if(error)
			{
				response.writeHead(500, {'Content-Type':'text/html'});
				response.end('500 Internal Server ' + error);
			}
			else
			{
				response.writeHead(200, {'Content-Type':scriptMime});
				response.end(data);
			}
		});
	}
	else if(resource.indexOf('/ME') == 0 || resource.indexOf('/me') == 0)
	{
		fs.readFile('./mapEditor/mapEditor.html', function(error, data){
			if(error)
			{
				response.writeHead(500, {'Content-Type':'text/html'});
				response.end('500 Internal Server ' + error);
			}
			else
			{
				response.writeHead(200, {'Content-Type':'text/html'});
				response.end(data);
			}
		});
	}
	else if(resource.indexOf('/TME') == 0 || resource.indexOf('/tme') == 0)
	{
		fs.readFile('./mapEditor/newmapEditor.html', function(error, data){
			if(error)
			{
				response.writeHead(500, {'Content-Type':'text/html'});
				response.end('500 Internal Server ' + error);
			}
			else
			{
				response.writeHead(200, {'Content-Type':'text/html'});
				response.end(data);
			}
		});
	}
	else if(resource.indexOf('/mapEditor/') == 0)
	{
		var resourcePath = resource.substring(1);
		console.log('resourcePath= ' + resourcePath);
		var resourceMime = mime.getType(resourcePath);
		console.log('mime = ' + resourceMime);
		
		fs.readFile(resourcePath, function(error, data){
			if(error)
			{
				response.writeHead(500, {'Content-Type':'text/html'});
				response.end('500 Internal Server ' + error);
			}
			else
			{
				response.writeHead(200, {'Content-Type':resourceMime});
				response.end(data);
			}
		});
	}
});

server.listen(3000, function(){console.log('Server is running...')});