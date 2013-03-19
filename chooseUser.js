var account = require('./account');

function findIdFetionByPhoneNumber(ctx,number) {
		var count = ctx.contactsArray.length;
		ctx.contactsArray.forEach(function(contact) {
				--count;
				if(contact['mobileNo'] == number) {
						ctx.userId = contact['idContact'];
						ctx.next();
						return;
				}
				if(count == 0) {
						ctx.next();
				}
		});
}

function chooseSingleUser(ctx) {
		findIdFetionByPhoneNumber(ctx,'15914225549');
}

exports.findIdFetionByPhoneNumber = findIdFetionByPhoneNumber;
exports.chooseSingleUser = chooseSingleUser;
