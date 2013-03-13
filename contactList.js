var http = require('http');
var account = require('./account');

function groupContacts(callback) {
		var cookie = account.getCookie();
		var headers = {
				'Cookie': cookie,
				'Content-Type':'application/json'
		};
		var options = {
				hostname: 'f.10086.cn',
				path: '/im5/index/loadGroupContactsAjax.action?' + 't=' + (new Date()).valueOf(),
				headers: headers,
				method: 'GET'
		};
		var request = http.request(options,function(response) {
				if(response.statusCode >= 300) {
					account.login('13422349864','QCX/7330507',function() {
							groupContacts(callback);
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
		request.end();
}

exports.groupContacts = groupContacts;
