/** Enables comment form. */
const enableCommentForm = () => {
  const commentForm = document.getElementById('comment-form-placeholder');
  const messageElement = commentForm.querySelector('textarea');
  const nameElement = commentForm.querySelector('input[name="commenter-name"]');

  const getCommentInputs = () => {
    const message = messageElement.value;
    const commenterName = nameElement.value;
    return {commenterName: commenterName, message: message};
  }
  
  const commentsPlaceholder = document.getElementById('comments-placeholder');
  const onDataFetched = (commentResponse) => {
    const message = messageElement.value;
    const commenterName = nameElement.value;
    const commentId = commentResponse.commentId;
    const commentColour = commentResponse.commentColour;
    commentsPlaceholder.appendChild(createComment(commentId, commenterName, message, commentColour)); 

    clearInput(nameElement);
    clearInput(messageElement);

    updatePainting(commentResponse.paints);
  }
  
  const commentSubmitButton = commentForm.querySelector('input[type="submit"]');
  const commentRequestLink = commentForm.querySelector('form[name="user-comments"]')
        .getAttribute('action');

  enableForm(commentSubmitButton, commentRequestLink, getCommentInputs, onDataFetched);
}
