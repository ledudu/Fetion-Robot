var http = require('http');
var account = require('./account');
var queryNewMsg = require('./queryNewMsg');
var seqJobCtx = require('./seqJobCtx').seqJobCtx;

function checkMsg(ctx) {
		var headers = {
				'Cookie': ctx.cookie,
				'Content-Length' : 0,
				'Connection': 'keep-alive'
		};
		var options = {
				hostname: 'f.10086.cn',
				path: '/im5/box/alllist.action?' + 't=' + (new Date()).valueOf(),
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
								if(body != null && body != '') {
										ctx.recvMsg = JSON.parse(body);
										var chatMsgList = ctx.recvMsg['chat_messages'];
										chatMsgList.forEach(function(chatMsg) {
												console.log(chatMsg['sendTime'] + '\t\t' + 
														chatMsg['fromNickname'] + ':\t' + chatMsg['message']);
												queryNewMsg.query(ctx,chatMsg['idMessage']);
										});
										ctx.next();
								}
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
				checkMsg(seqJobCtx);
		},15000);
}

exports.checkMsg = checkMsg;
exports.checkMsgFrequently = checkMsgFrequently;
