function getCookieJSON(setCookieJSON) {
		var lst = JSON.stringify(setCookieJSON).split('"');
		var cookieJSON = {};
		lst.forEach(function(cookie) {
				var ckMap = cookie.split(';')[0];
				var parts = ckMap.split('=');
				if(parts.length >= 2) {
						cookieJSON[parts[0].trim()] = parts[1].trim();
				}
		});
		return cookieJSON;
}

function getCookieString(setCookieJSON) {
		var lst = JSON.stringify(setCookieJSON).split('"');
		var cookieString = '';
		lst.forEach(function(cookie) {
				var ckMap = cookie.split(';')[0];
				if(ckMap.split('=').length >= 2) {
						cookieString += ckMap + "; ";
				}
		});
		return cookieString;
}

exports.getCookieJSON = getCookieJSON;
exports.getCookieString = getCookieString;
