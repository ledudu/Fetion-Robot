var seqJobCtx = require('./seqJobCtx').seqJobCtx;
var account = require('./account');
var contactGroupList = require('./contactGroupList');
var chooseUser = require('./chooseUser');
var sendMsg = require('./sendMsg');
var checkMsg = require('./checkMsg');

var readline = require('readline');

var rl = readline.createInterface({
		input: process.stdin,
		output: process.stdout
});

process.stdout.write('Please login.\n');
rl.question('User:',function(user) {
		seqJobCtx.user = user;
		rl.question('Password:',function(password) {
				seqJobCtx.password = password;
				contactGroupList.groupContactsFrequently();
				checkMsg.checkMsgFrequently();
				rl.close();
		});
});
/*
seqJobCtx.setCallbackArray([account.login,chooseUser.chooseSingleUser,
													 sendMsg.setSendMsg,sendMsg.sendNewMsg]);
*/
seqJobCtx.start();
