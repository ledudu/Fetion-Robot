var seqJobCtx = require('./seqJobCtx').seqJobCtx;
var account = require('./account');
var contactGroupList = require('./contactGroupList');
var contactList = require('./contactList');
var chooseUser = require('./chooseUser');
var sendMsg = require('./sendMsg');
var checkMsg = require('./checkMsg');

seqJobCtx.user = 'user';
seqJobCtx.password = 'password';
seqJobCtx.setCallbackArray([account.login,checkMsg.checkMsg]);

/*seqJobCtx.setCallbackArray([account.login,contactGroupList.groupContacts,
		contactList.contactView,chooseUser.chooseSingleUser,
		sendMsg.setSendMsg,sendMsg.sendNewMsg]);
		*/
seqJobCtx.start();
