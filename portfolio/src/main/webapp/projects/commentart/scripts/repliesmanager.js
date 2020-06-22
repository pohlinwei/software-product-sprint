class RepliesManager extends Updatable {
  /**
   * @param {string} id Id that is used to identify this manager in the database.
   * @param {Array<Reply>} replies All replies that are managed by this manager.
   */
  constructor(id, replies) {
    super();
    this.id = id;
    this.replies = replies;
    this.replyForm = null;
    this.repliesElement = this.createRepliesElement();
  }

  static toRepliesManager(repliesManagerJson) {
    const id = repliesManagerJson.id;
    const replies = repliesManagerJson.replies.map(replyJson => Reply.toReply(replyJson));
    const repliesManager = new RepliesManager(id, replies);
    repliesManager.replyForm = new ReplyForm(repliesManager);
    return repliesManager;
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
    this.repliesElement.style.display === 'block';
  }
  
  get replyFormElement() {
    return this.replyForm.formElement;
  }
}
