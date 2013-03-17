var http = require('http');
var account = require('./account');

function sendNewShortMsg(userId,msg,callback) {
		var cookie = account.getCookie();
		var body = 'touserid=' + userId + '&msg=' + msg;
		var headers = {
				'Content-Length' : body.length,
				'Content-Type' : 'application/x-www-form-urlencoded',
				'Cookie' : cookie
		};
		var option = {
				hostname: 'f.10086.cn',
				path: '/im5/chat/sendNewMsg.action?' + 't=' + (new Date()).valueOf(),
				headers: headers,
				method: 'POST'
		};
		var request = http.request(options,function(response) {
				if(response.statusCode >= 300) {
					account.login('','',function() {
							sendNewShortMsg(userId,msg,callback);
					});
				} else {
						var body = '';
						response.setEncoding('utf8');
						response.on('data',function(chunk) {
								body += chunk;
						});
						response.on('end',function() {
								(callback && typeof(callback) === 'function') && callback(JSON.parse(body));
						});
				}
		});
		request.on('error',function(e) {
				console.log('Problem with request:' + e);
		});
		request.write(body);
		request.end();
}

function sendNewMsg(userId,msg,callback) {
} 

function sendNewGroupShortMsg(userIdList,msg,callback) {
}

exports.sendNewShortMsg = sendNewShortMsg;
exports.sendNewMsg = sendNewMsg;
exports.sendNewGroupShortMsg = sendNewGroupShortMsg;
