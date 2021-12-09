class MessageStore {
	saveMessage(message) {}
	findMessagesForUser(userID) {}
}

class InMemoryMessageStore extends MessageStore {

	constructor() {
		super();
		this.messages = [];
	}

	saveMessage(message) {
		this.messages.push(message);
		console.log(this.messages);
	}

	findConversationBetween(messageFrom, messageTo) {
		return this.messages.filter(
    		({ from, to }) => {
    			return (messageFrom == from && messageTo == to) || 
    			(messageFrom == to && messageTo == from)
    		}
    	);
	}

}

module.exports = {
	InMemoryMessageStore,
};