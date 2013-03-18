var http = require('http');
var account = require('./account');

function groupContacts(ctx) {
		var headers = {
				'Cookie': ctx.cookie,
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
						account.login(ctx);
						groupContacts(ctx);
				} else {
						var body = '';
						response.setEncoding('utf8');
						response.on('data',function(chunk) {
								body += chunk;
						});
						response.on('end',function() {
								ctx.contactGroupList = JSON.parse(body);
								ctx.contactGroup = ctx.contactGroupList['contacts'];
								ctx.friendGroupIds = ctx.contactGroupList['friendGroupIds'].split(',');
								ctx.next();
						});
				}
		});
		request.on('error',function(e) {
				console.log('Problem with request:' + e);
		});
		request.end();
}

exports.groupContacts = groupContacts;
