class CommentForm extends InputProvider {
  constructor(commentsManager) {
    super();
    this.commentsManager = commentsManager;

    const commentForm = document.getElementById('comment-form-placeholder');
    // TODO: ensure that it is not null
    this.messageElement = this.findMessageElement(commentForm);
    this.nameElement = this.findNameElement(commentForm);
    // TODO: ensure messagElement and nameElement are not null
  }

  findMessageElement(commentForm) {
    return commentForm.querySelector('textarea');
  }

  findNameElement(commentForm) {
    return commentForm.querySelector('input[name="commenter-name"]');
  }

  enableComment() {
    const commentForm = document.getElementById('comment-form-placeholder');
    // TODO: ensure that it is not null
    const formElement = commentForm.querySelector('form');
    // TODO: ensure that it is non-null
    enableForm(formElement, this, this.commentsManager);
  }

  /** @override */
  get inputs() {
    const message = this.messageElement.value;
    const commenterName = this.nameElement.value;

    return {name: commenterName, message: message};
  }
}
