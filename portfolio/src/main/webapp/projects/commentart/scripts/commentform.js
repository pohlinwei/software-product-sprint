/** Enables comment form. */
const enableCommentForm = () => {
  const commentForm = document.getElementById('comment-form-placeholder');
  const messageElement = commentForm.querySelector('textarea');
  const nameElement = commentForm.querySelector('input[name="commenter-name"]');

  const getCommentInputs = () => {
    const message = messageElement.value;
    const commenterName = nameElement.value;
    return {name: commenterName, message: message};
  }
  
  const commentsPlaceholder = document.getElementById('comments-placeholder');
  const onDataFetched = (commentResponse) => {
    const message = messageElement.value;
    const commenterName = nameElement.value;
    const commentId = commentResponse.commentId;
    const commentColour = commentResponse.commentColour; // TODO: how is this represented?
    commentsPlaceholder.appendChild(createComment(commentId, commenterName, message, commentColour)); 

    clearInput(nameElement);
    clearInput(messageElement);

    updatePainting(commentResponse.paints); // TODO: implement `updatePainting`
  }
  
  const commentSubmitButton = commentForm.querySelector('input[type="submit"]');
  const commentRequestLink = commentForm.getAttribute('action');

  enableForm(commentSubmitButton, commentRequestLink, getCommentInputs, onDataFetched);
}
