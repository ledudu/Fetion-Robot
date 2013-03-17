var http = require('http');
var account = require('./account');
var contactList = require('./contactList');

function contactView(id,callback) {
		var cookie = account.getCookie();
		var headers = {
				'Cookie': cookie,
				'Content-Type':'application/json'
		};
		var options = {
				hostname: 'f.10086.cn',
				path: '/im5/index/contactlistView.action?idContactList=' + id + '&t=' + (new Date()).valueOf(),
				headers: headers,
				method: 'GET'
		};
		var request = http.request(options,function(response) {
				if(response.statusCode >= 300) {
						account.login('','',function() {
								contactView(id,callback);
						});
				} else {
						var body = '';
						response.seEncoding('utf8');
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

exports.contactView = contactView;
