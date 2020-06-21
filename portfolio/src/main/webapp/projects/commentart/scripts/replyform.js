class ReplyForm {
  constructor(managerId) {
    this.managerId = managerId;
  }

  toElement(addReply) {
    const formElement = document.createElement('form');

    formElement.setAttribute('name', 'reply-form');
    const SERVER_URL = '/add_reply';
    formElement.setAttribute('action', SERVER_URL);
    formElement.setAttribute('method', 'post');

    formElement.innerHTML = this.getFormContent();
    this.enableAsyncReply(formElement, addReply);
  }
  
  /** Gets HTML for reply form. */
  getFormContent() {
    return '<label class="form-label" for="responder-name">Name</label>' +
        '<input type="text" name="responder-name"/><label class="form-label" for="response">Reply</label>' +
        '<input type="text" name="response"/><input type="submit" value="Submit"/>';
  }

  enableAsyncReply(formElement, addReply) {
    enableAsyncForm(formElement, getInputs, addReply);
  }

  getInputs() {
    const responderNameElement = replyForm.querySelector('input[name="responder-name"]');
    // TODO: ensure responderNameElement is non-null
    const responderName = responderNameElement.value;

    const responseElement = replyForm.querySelector('input[name="response"]');
    // TODO: ensure responseElement is non-null
    const response = responseElement.value;

    return {id: this.managerId, name: responderName, response: response};
  }
}
