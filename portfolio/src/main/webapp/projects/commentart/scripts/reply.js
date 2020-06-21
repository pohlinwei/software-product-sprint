class Reply {
  /**
   * @param {string} responderName 
   * @param {string} response 
   * @param {number} sentiment Either 1 (positive) or -1 (negative).
   */
  constructor(responderName, response, sentiment) {
    this.responderName = responderName;
    this.response = response;
    this.sentiment = sentiment;
  }

  static toReply(replyJson) {
    return new Reply(replyJson.responderName, replyJson.response, replyJson.sentiment);
  }

  get toElement() {
    const replyElement = document.createElement('li');
    replyElement.classList.add('reply');
    replyElement.innerHTML = `<p><span class="responder-name">${this.responderName}</span>:</p>` +
        `<div class="response"><p>${this.response}</p></div>`;
    return replyElement;
  }
}
