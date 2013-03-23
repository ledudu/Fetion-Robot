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

function findIdsByNumbers(ctx,numList) {
		var count = ctx.contactsArray.length;
		ctx.userIdList = [];
		ctx.contactsArray.forEach(function(contact) {
				--count;
				numList.forEach(function(number) {
						if(contact['mobileNo'] == number) {
								ctx.userIdList[ctx.userIdList.length] = contact['idContact'];
								numList.remove(number);
						}
				});
				if(numList.length == 0 || count == 0) {
						ctx.next();
				}
		});
}

function chooseSingleUser(ctx) {
		findIdFetionByPhoneNumber(ctx,'18825166251');
}

function chooseUsers(ctx) {
		findIdsByNumbers(ctx,['18825166251','13719356819']);
}

exports.findIdFetionByPhoneNumber = findIdFetionByPhoneNumber;
exports.chooseSingleUser = chooseSingleUser;
