var seqJobCtx = require('./seqJobCtx').seqJobCtx;
var account = require('./account');
var contactGroupList = require('./contactGroupList');
var chooseUser = require('./chooseUser');
var sendMsg = require('./sendMsg');
var checkMsg = require('./checkMsg');

seqJobCtx.user = 'user';
seqJobCtx.password = 'password';

contactGroupList.groupContactsFrequently();
checkMsg.checkMsgFrequently();

/*
seqJobCtx.setCallbackArray([account.login,contactGroupList.groupContacts,
		chooseUser.chooseSingleUser,sendMsg.setSendMsg,sendMsg.sendNewMsg]);
*/
seqJobCtx.start();
