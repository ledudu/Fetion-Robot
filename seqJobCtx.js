exports.seqJobCtx = new function() {
		this.user = null;
		this.password = null;
		this.cookie = null;
		this.contactGroupList = null;
		this.contactGroup = null;
		this.friendGroupIds = null;
		this.contactList = null;
		this.contactsMap = null;
		this.contactsArray = null;
		this.userId = null;
		this.userIdList = null;
		this.sendMsg = null;
		this.recvMsg = null;
		this.callbackArray = [];

		this.setCallbackArray = function(callbackArray) {
				this.callbackArray = callbackArray;
		};

		this.next = function() {
				var callback = this.callbackArray.shift();
				if(callback != null) {
						callback(this);
				}
		};

		this.start = function() {
				this.next();
		};
};
