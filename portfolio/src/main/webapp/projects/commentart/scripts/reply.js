class Reply {
  /**
   * @param {string} responderName 
   * @param {string} replyMsg
   * @param {number} sentiment A float that is between -1 and 1.
   */
  constructor(responderName, replyMsg, sentiment) {
    this.responderName = responderName;
    this.replyMsg = replyMsg;
    this.sentiment = sentiment;
  }

  static toReply(replyJson) {
    return new Reply(replyJson.responderName, replyJson.replyMsg, replyJson.sentiment);
  }

  get toElement() {
    const replyElement = document.createElement('li');
    replyElement.classList.add('reply');
    replyElement.innerHTML = `<p><span class="responder-name">${this.responderName}</span>:</p>` +
        `<div class="response"><p>${this.replyMsg}</p></div>`;
    return replyElement;
  }
}
