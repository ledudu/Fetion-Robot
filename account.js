var http = require('http');
var parseToCookie = require('./parseToCookie');

function login(ctx) {
		var body = 'm=' + ctx.user + '&pass=' + ctx.password + '&captchaCode=&checkCodeKey=null';
		var headers = {
				'Content-Length': body.length,
				'Connection': 'keep-alive',
				'Content-Type':'application/x-www-form-urlencoded'
		};
		var options = {
				hostname: 'f.10086.cn',
				path: '/im5/login/loginHtml5.action?' + 't=' + (new Date()).valueOf(),
				headers: headers,
				method: 'POST'
		};
		var request = http.request(options,function(response) {
				var setCookie = response.headers['set-cookie'];
				var body = '';
				ctx.cookie = parseToCookie.getCookieString(setCookie);
				response.on('data',function(chunk) {
						body += chunk;
				});
				response.on('end',function() {
						var tip = JSON.parse(body)['tip'];
						if(tip == '') {
								ctx.next();
						} else {
								console.log(tip);
						}
				});
		});
		request.on('error',function(e) {
				console.log('Problem with request:' + e);
		});
		request.write(body);
		request.end();
}

function logout(ctx) {
		var headers = {
				'Cookie': ctx.cookie,
				'Connection': 'keep-alive'
		};
		var options = {
				hostname: 'f.10086.cn',
				path: '/im5/login/login.action?type=logout',
				headers: headers,
				method: 'GET'
		};
		var request = http.request(options,function(response) {
				console.log('Successfully logout.');
		});
		request.on('error',function(e) {
				console.log('Problem with request:' + e);
		});
		request.end();
}

exports.login = login;
exports.logout = logout;
