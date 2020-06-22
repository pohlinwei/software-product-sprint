class ReplyForm extends InputProvider {
  constructor(repliesManager) {
    super();
    this.managerId = repliesManager.id;
    this.formElement = this.toElement(repliesManager);
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
        '<input type="text" name="responder-name"/><label class="form-label" for="replyMsg">Reply</label>' +
        '<input type="text" name="replyMsg"/><input type="submit" value="Submit"/>';
  }

  /**
   * Enables the reply form.
   * @param {Updatable} replyUpdatable This updatable performs the necessary updates.
   */
  enableReply(replyUpdatable) {
    enableForm(formElement, this, replyUpdatable);
  }

  /** @override Gets form inputs. */
  get inputs() {
    const responderNameElement = this.formElement.querySelector('input[name="responder-name"]');
    // TODO: ensure responderNameElement is non-null
    const responderName = responderNameElement.value;

    const replyMsgElement = this.formElement.querySelector('input[name="replyMsg"]');
    // TODO: ensure replyMsgElement is non-null
    const replyMsg = replyMsgElement.value;

    return {id: this.managerId, name: responderName, replyMsg: replyMsg};
  }
}
