var http = require('http');
var parseToCookie = require('./parseToCookie');

var cookie = '';

function login(user,password,callback) {
		var body = 'm=' + user + '&pass=' + password;
		var headers = {
				'Content-Length': body.length,
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
				cookie = parseToCookie.getCookieString(setCookie);
				response.on('data',function(chunk) {
						body += chunk;
				});
				response.on('end',function() {
						var tip = JSON.parse(body)['tip'];
						if(tip == '') {
								(callback && typeof(callback) === 'function') && callback();
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

function getCookie() {
		return cookie;
}

exports.login = login;
exports.getCookie = getCookie;
