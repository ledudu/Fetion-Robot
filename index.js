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

				process.stdin.resume();
				process.stdin.setEncoding('utf8');

				process.stdout.write('\n1.Relogin.\n2.Send message to mobile phone.\n' + 
														 '3.Send message to fetion.\n4.Send group messages.\nPlease choose.\n\n');
				process.stdin.on('data',function(chunk) {
						if(chunk == 1) {
								account.login(seqJobCtx);
						} else if(chunk == 2) {
								seqJobCtx.setCallbackArray([account.login,chooseUser.chooseSingleUser,
																					 sendMsg.setSendMsg,sendMsg.sendNewShortMsg]);
								seqJobCtx.start();
						} else if(chunk == 3) {
								seqJobCtx.setCallbackArray([account.login,chooseUser.chooseSingleUser,
																					 sendMsg.setSendMsg,sendMsg.sendNewMsg]);
								seqJobCtx.start();
						} else if(chunk == 4) {
								seqJobCtx.setCallbackArray([account.login,chooseUser.chooseUsers,
																					 sendMsg.setSendMsg,sendMsg.sendNewGroupShortMsg]);
								seqJobCtx.start();
						}
						process.stdout.write('\n1.Relogin.\n2.Send message to mobile phone.\n' + 
																 '3.Send message to fetion.\n4.Send group messages.\nPlease choose.\n\n');
				});

				process.stdin.on('end',function() {
						account.logout(seqJobCtx);
						rl.close();
				});
		});
});
