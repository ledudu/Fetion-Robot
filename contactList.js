var http = require('http');
var account = require('./account');

function contactView(ctx) {
		var headers = {
				'Cookie': ctx.cookie,
				'Connection': 'keep-alive'
		};
		if(ctx.friendGroupIds.length == ctx.contactGroupList['total']) {
				ctx.contactList = [];
				ctx.contactsMap = {};
				ctx.contactsArray = [];
		}
		if(ctx.friendGroupIds.length == 0) {
				ctx.friendGroupIds = ctx.contactGroupList['friendGroupIds'].split(',');
				console.log('You can send message.');
				ctx.next();
				return;
		}
		var friendGroupId = ctx.friendGroupIds.shift();
		var options = {
				hostname: 'f.10086.cn',
				path: '/im5/index/contactlistView.action?idContactList=' + friendGroupId + '&t=' + (new Date()).valueOf() +
						'&_=' + (new Date()).valueOf(),
				headers: headers,
				method: 'GET'
		};
		var request = http.request(options,function(response) {
				if(response.statusCode >= 300) {
						account.login(ctx);
				}
				var body = '';
				response.setEncoding('utf8');
				response.on('data',function(chunk) {
						body += chunk;
				});
				response.on('end',function() {
						ctx.contactList[ctx.contactList.length] = JSON.parse(body);
						ctx.contactsMap[friendGroupId] = ctx.contactList[ctx.contactList.length-1]['contacts'];
						ctx.contactsArray = ctx.contactsArray.concat(ctx.contactsMap[friendGroupId]);
						contactView(ctx);
				});
		});
		request.on('error',function(e) {
				console.log('Problem with request:' + e);
		});
		request.end();
}

exports.contactView = contactView;
