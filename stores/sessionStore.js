const _ = require('lodash');

class SessionStore {
  associateUserIDsocketID(userID, socketID){}
  findSocketIdBy_id(id){}
}

class InMemorySessionStore extends SessionStore {
  constructor() {
    super();
    this.sessions = [];
  }

  associateUserIDsocketID(userId, socketId) {
    this.sessions[userId] = socketId;
    console.log(this.sessions)
  }

  findSocketIdBy_id(id){
    return this.sessions[id];
  }

}

module.exports = {
  InMemorySessionStore
}