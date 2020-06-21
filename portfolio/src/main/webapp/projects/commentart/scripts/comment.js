class Comment {
  /**
   * @param {string} commenterName 
   * @param {string} commentMsg Commenter's message.
   * @param {number} sentiment Either 1 (positive) or -1 (negative).
   * @param {RepliesManager} repliesManager Manager that manages all associated replies.
   */
  constructor(commenterName, commentMsg, sentiment, repliesManager) {
    this.commenterName = commenterName;
    this.commentMsg = commentMsg;
    this.sentiment = sentiment;
    this.repliesManager = repliesManager;
  }

  /** Converts a comment that is in .json format to a `Comment` object. */
  static toComment(commentJson) {
    const commenterName = commentJson.name;
    const commentMsg = commentJson.commentMsg;
    const commentSentiments = commentJson.sentiment;
    const repliesManager = RepliesManager.toRepliesManager(commentJson.repliesManager);
    return new Comment(commenterName, commentMsg, commentSentiments, repliesManager);
  }

  /** @return {HTML element} HTML element representing this comment */
  get toElement() {
    const commentElement = document.createElement('li');
    commentElement.innerHTML = this.mainSection;

    const replyForm = this.repliesManager.replyFormElement;
    const replies = this.repliesManager.repliesElement;

    commentElement.appendChild(replyForm);
    commentElement.appendChild(replies);

    this.enableToggleReplyForm(commentElement, replyForm);
    this.enableToggleReplies(commentElement, replies);
    return commentElement;
  }

  /** @return {HTML as string} HTML for commenter's name, comment message and view replies button. */
  get mainSectionHtml() {
    return `<div class="comment-header">` +
        `<p><span class="commenter-name">${this.commenterName}</span> says</p>` +  
        `<p class="reply-text"><span class="reply-button">reply</span></p>` + 
        `</div><p>${this.commentMsg}</p>` +
        `<button class="view-replies-btn">View Replies <i class="far fa-comments"></i></button>`;
  }

  /** Hides/shows reply form when reply button is clicked. */
  enableToggleReplyForm(commentElement, replyForm) {
    const replyButton = commentElement.querySelector('.reply-button');
    // TODO: add validation to ensure that replyButton is not null
    replyButton.onclick = () => {
      const isDisplayed = replyForm.style.display === 'block';
      replyForm.style.display = isDisplayed ? 'none' : 'block';
    }
  }

  /** Hides/shows replies when 'view replies' button is clicked. */
  enableToggleReplies(commentElement, replies) {
    const viewRepliesButton = commentElement.querySelector('.view-replies-btn');
    // TODO: Ensure that the button is non-null
    viewRepliesButton.onclick = () => {
      const isDisplayed = replies.style.display === 'block';
      replies.style.display = isDisplayed ? 'none' : 'block';
    };
  }
}
