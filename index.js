var seqJobCtx = require('./seqJobCtx').seqJobCtx;
var account = require('./account');
var contactGroupList = require('./contactGroupList');
var contactList = require('./contactList');
var chooseUser = require('./chooseUser');
var sendMsg = require('./sendMsg');
var checkMsg = require('./checkMsg');

seqJobCtx.user = '13422349864';
seqJobCtx.password = 'QCX/7330507';

checkMsg.checkMsgFrequently();
/*seqJobCtx.setCallbackArray([account.login,contactGroupList.groupContacts,
		contactList.contactView,chooseUser.chooseSingleUser,
		sendMsg.setSendMsg,sendMsg.sendNewMsg]);
		*/
seqJobCtx.start();
