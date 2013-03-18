var http = require('http');
var account = require('./account');

function setSendMsg(ctx) {
		ctx.sendMsg = '(By fetion robot.)';
		ctx.next();
}

function sendNewShortMsg(ctx) {
		var body = 'touserid=' + ctx.userId + '&msg=' + ctx.sendMsg;
		var headers = {
				'Content-Length' : body.length,
				'Content-Type' : 'application/x-www-form-urlencoded',
				'Cookie' : ctx.cookie
		};
		var options = {
				hostname: 'f.10086.cn',
				path: '/im5/chat/sendNewShortMsg.action?' + 't=' + (new Date()).valueOf(),
				headers: headers,
				method: 'POST'
		};
		var request = http.request(options,function(response) {
				if(response.statusCode >= 300) {
						account.login(ctx);
				} else {
						var body = '';
						response.setEncoding('utf8');
						response.on('data',function(chunk) {
								body += chunk;
						});
						response.on('end',function() {
								console.log(JSON.parse(body));
						});
				}
		});
		request.on('error',function(e) {
				console.log('Problem with request:' + e);
		});
		request.write(body);
		request.end();
}

function sendNewMsg(ctx) {
		var body = 'touserid=' + ctx.userId + '&msg=' + 'monkey';
		console.log(body);
		var headers = {
				'Content-Length' : body.length,
				'Content-Type' : 'application/x-www-form-urlencoded',
				'Cookie' : ctx.cookie
		};
		var options = {
				hostname: 'f.10086.cn',
				path: '/im5/chat/sendNewMsg.action?' + 't=' + (new Date()).valueOf(),
				headers: headers,
				method: 'POST'
		};
		var request = http.request(options,function(response) {
				if(response.statusCode >= 300) {
						account.login(ctx);
				} else {
						var body = '';
						response.setEncoding('utf8');
						response.on('data',function(chunk) {
								body += chunk;
						});
						response.on('end',function() {
								console.log(JSON.parse(body));
						});
				}
		});
		request.on('error',function(e) {
				console.log('Problem with request:' + e);
		});
		request.write(body);
		request.end();
} 

function sendNewGroupShortMsg(ctx) {
}

exports.sendNewShortMsg = sendNewShortMsg;
exports.sendNewMsg = sendNewMsg;
exports.sendNewGroupShortMsg = sendNewGroupShortMsg;
