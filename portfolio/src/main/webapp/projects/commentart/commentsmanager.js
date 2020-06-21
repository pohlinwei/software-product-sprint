class CommentsManager {
  /** @param {Array<Comment>} comments All comments that need to be managed */
  constructor(comments) {
    this.comments = comments;
    this.commentsElement = document.getElementById('comments-placeholder');
    // TODO: ensure that commentsElement exists
  }

  addComment(replyJson) {
    const newComment = Comment.toComment(replyJson);
    this.comments.push(newComment);
    this.commentsElement.appendChild(newComment.toElement);
  }
}
