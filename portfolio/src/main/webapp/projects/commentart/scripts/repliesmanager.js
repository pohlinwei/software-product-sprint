class RepliesManager extends Updatable {
  /**
   * @param {string} id Id that is used to identify this manager in the database.
   * @param {Array<Reply>} replies All replies that are managed by this manager.
   */
  constructor(id, replies) {
    this.id = id;
    this.replies = replies;
    this.replyForm = new ReplyForm(id);
    this.repliesElement = this.createRepliesElement();
  }

  static toRepliesManager(repliesManagerJson) {
    const id = repliesManagerJson.id;
    const replies = repliesManagerJson.replies.map(replyJson => Reply.toReply(replyJson));
    return new RepliesManager(id, replies);
  }

  createRepliesElement() {
    const repliesElement = document.createElement('ul');
    repliesElement.setAttribute('class', 'replies');
    this.replies.forEach(reply => repliesElement.appendChild(reply.toElement));
    
    return repliesElement;
  }

  /** @override Uses data to add reply. */
  onDataFetched(replyJson) {
    const newReply = Reply.toReply(replyJson);
    this.replies.push(newReply);
    this.repliesElement.appendChild(newReply.toElement);
  }
  
  get replyFormElement() {
    return this.replyForm.toElement(this);
  }
}
