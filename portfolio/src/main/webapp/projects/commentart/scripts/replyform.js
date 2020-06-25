/**
 * Creates a reply form HTML element.
 * @param {string} commentId Id indicates which comment this form belongs to.
 * @param {HTMLElement} repliesPlaceholder Placeholder where new replies should be appended to.
 */
function createReplyForm(commentId, repliesPlaceholder) {
  const replyForm = document.createElement('form');

  replyForm.setAttribute('name', 'reply-form');
  const SERVER_URL = '/add_reply';
  replyForm.setAttribute('action', SERVER_URL);
  replyForm.setAttribute('method', 'post');

  replyForm.innerHTML = '<label class="form-label" for="responder-name">Name</label>' +
      '<input type="text" name="responder-name"/><label class="form-label" for="reply-msg">Reply</label>' +
      '<input type="text" name="reply-msg"/><input type="submit" value="Submit"/>';
  
  const enableReplyForm = () => {
    const responderNameElement = replyForm.querySelector('input[name="responder-name"]');
    const replyMsgElement = replyForm.querySelector('input[name="reply-msg"]');

    const getReplyInputs = () => {
      const responderName = responderNameElement.value;
      const replyMsg = replyMsgElement.value;
      return {id: commentId, responderName: responderName, replyMsg: replyMsg};
    }

    const onDataFetched = (replyResponse) => {
      const responderName = responderNameElement.value;
      const replyMsg = replyMsgElement.value;
      const replyColour = replyResponse.replyColour; 
      repliesPlaceholder.appendChild(createReply(responderName, replyMsg, replyColour));

      clearInput(responderNameElement);
      clearInput(replyMsgElement);
      repliesPlaceholder.style.display = 'block';

      updatePainting(replyResponse.paints); // TODO: implement `updatePainting`
    }

    const replySubmitButton = replyForm.querySelector('input[type="submit"]');
    enableForm(replySubmitButton, SERVER_URL, getReplyInputs, onDataFetched);
  }
  enableReplyForm();

  return replyForm;
}
