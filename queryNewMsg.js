var http = require('http');
var account = require('./account');

function query(ctx,idMsgs) {
		var headers = {
				'Cookie': ctx.cookie,
				'Connection': 'keep-alive'
		};
		var options = {
				hostname: 'f.10086.cn',
				path: '/im5/chat/queryNewMsg.action?' + 't=' + (new Date()).valueOf() +
					'&idMsgs=' + idMsgs,
				headers: headers,
				method: 'GET'
		};
		var request = http.request(options,function(response) {
				if(response.statusCode >= 300) {
						account.login(ctx);
				} 
		});
		request.on('error',function(e) {
				console.log('Problem with request:' + e);
		});
		request.end();
}

exports.query = query;
