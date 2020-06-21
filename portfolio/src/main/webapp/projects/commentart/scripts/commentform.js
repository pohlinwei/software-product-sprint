function enableComment(commentsManager) {
  const commentForm = document.getElementById('comment-form-placeholder');
  // TODO: ensure that it is not null
  const formElement = commentForm.querySelector('form');
  // TODO: ensure that it is non-null

  const getInputs = () => {
    const messageElement = commentForm.querySelector('textarea');
    // TODO: ensure non-null
    const message = messageElement.value;

    const nameElement = commentForm.querySelector('input[name="commenter-name"]');
    // TODO: ensure responseElement is non-null
    const commenterName = nameElement.value;

    return {name: commenterName, message: message};
  }

  enableForm(formElement, getInputs, commentsManager.addComment);
}
