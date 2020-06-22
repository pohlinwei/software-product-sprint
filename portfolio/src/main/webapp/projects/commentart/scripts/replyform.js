class ReplyForm extends InputProvider {
  constructor(repliesManager) {
    super();
    this.managerId = repliesManager.id;
    this.formElement = toElement(repliesManager);
  }

  toElement(replyUpdatable) {
    const formElement = document.createElement('form');

    formElement.setAttribute('name', 'reply-form');
    const SERVER_URL = '/add_reply';
    formElement.setAttribute('action', SERVER_URL);
    formElement.setAttribute('method', 'post');

    formElement.innerHTML = this.getFormContent();
    this.enableReply(formElement, replyUpdatable);

    return formElement;
  }
  
  /** Gets HTML for reply form. */
  getFormContent() {
    return '<label class="form-label" for="responder-name">Name</label>' +
        '<input type="text" name="responder-name"/><label class="form-label" for="response">Reply</label>' +
        '<input type="text" name="response"/><input type="submit" value="Submit"/>';
  }

  /**
   * Enables the reply form.
   * @param {Updatable} replyUpdatable This updatable performs the necessary updates.
   */
  enableReply(replyUpdatable) {
    enableForm(this.formElement, this, replyUpdatable);
  }

  /** @override Gets form inputs. */
  get inputs() {
    const responderNameElement = this.formElement.querySelector('input[name="responder-name"]');
    // TODO: ensure responderNameElement is non-null
    const responderName = responderNameElement.value;

    const responseElement = this.formElement.querySelector('input[name="response"]');
    // TODO: ensure responseElement is non-null
    const response = responseElement.value;

    return {id: this.managerId, name: responderName, response: response};
  }
}
