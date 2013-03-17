var http = require('http');
var account = require('./account');

function checkMsg(callback) {
		var cookie = account.getCookie();
		var headers = {
				'Cookie': cookie,
				'Content-Length' : 0,
				'Content-Type': 'application/json'
		};
		var options = {
				hostname: 'f.10086.cn',
				path: '/im5/box/alllist.action?' + 't=' + (new Date()).valueOf(),
				headers: headers,
				method: 'POST'
		};
		var request = http.request(options,function(response) {
				if(response.statusCode >= 300) {
						account.login('','',function() {
								checkMsg(callback);
						});
				} else {
						console.log(response.headers);
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
		request.end();
}

function checkMsgFrequently() {
		setInterval(function(){
				checkMsg(cookie);
		},15000);
}

exports.checkMsg = checkMsg;
exports.checkMsgFrequently = checkMsgFrequently;
