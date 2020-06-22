class CommentsManager extends Updatable {
  constructor() {
    this.comments = [];
    this.commentsElement = document.getElementById('comments-placeholder');
    // TODO: ensure that commentsElement exists
  }

  /** @override Uses data to add comment. */
  onDataFetched(replyJson) {
    const newComment = Comment.toComment(replyJson);
    this.comments.push(newComment);
    this.commentsElement.appendChild(newComment.toElement);
  }
}
