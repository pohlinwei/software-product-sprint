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

/** Clears user input that is specified at `element`. */
const clearInput = (element) => element.value = '';

/**
 * Enables form submission.
 * @param {HTMLElement} submitButton Submit button for the form.
 * @param {string} requestLink Link to which the data should be sent.
 * @param {function():any} getInputs Gets the user inputs that need to be sent.
 * @param {function():void} onDataFetched Manipulates the retrieved data.
 */
function enableForm(submitButton, requestLink, getInputs, onDataFetched) {
  submitButton.onclick = (event) => {
    event.preventDefault();
    fetch(requestLink, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: toFormUrlEncoded(getInputs())
    }).then(response => response.json())
      .then(data => onDataFetched(data))
      .catch(err => console.log(err));
  }

  /**
   * Converts the specified object to x-www-form-urlencoded format.
   * @param {any} object 
   */
  function toFormUrlEncoded(object) {
    return Object.entries(object)
      .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
      .join('&');
  }
}

/**
 * Creates a comment an HTML element that represents the comment.
 * @param {string} commentId Id that is used for retrieval of this comment from database.
 * @param {string} commenterName Name of the commenter that is to be displayed.
 * @param {string} message Message that is to be displayed.
 * @param {string} commentColour Colour which is used to highlight the commenter's name.
 * @param {?Array<HTMLElement>} replies Reply elements that belong to this comment.
 */
function createComment(commentId, commenterName, message, commentColour, replies) {
  const commentElement = document.createElement('li');
  
  // TODO: add colour here
  commentElement.innerHTML = `<div class="comment-header">` +
    `<p><span class="commenter-name">${commenterName}</span> says</p>` +  
    `<p class="reply-text"><span class="reply-button">reply</span></p>` + 
    `</div><p>${message}</p>` +
    `<button class="view-replies-btn">View Replies <i class="far fa-comments"></i></button>`;
  
  const repliesPlaceholder = document.createElement('ul');
  repliesPlaceholder.setAttribute('class', 'replies');
  repliesPlaceholder.innerHTML = replies != null ? replies.map(reply => reply.outerHTML).join('') : '';
  commentElement.appendChild(repliesPlaceholder); 

  const replyForm = createReplyForm(commentId, repliesPlaceholder);
  commentElement.appendChild(replyForm);

  /** Hides/shows reply form when reply button is clicked. */
  const enableToggleReplyForm = () => {
    const replyButton = commentElement.querySelector('.reply-button');
    replyButton.onclick = () => {
      const isDisplayed = replyForm.style.display === 'block';
      replyForm.style.display = isDisplayed ? 'none' : 'block';
    }
  }
  enableToggleReplyForm();

  /** Hides/shows replies when 'view replies' button is clicked. */
  const enableToggleReplies = () => {
    const viewRepliesButton = commentElement.querySelector('.view-replies-btn');
    viewRepliesButton.onclick = () => {
      const isDisplayed = repliesPlaceholder.style.display === 'block';
      repliesPlaceholder.style.display = isDisplayed ? 'none' : 'block';
    };
  }
  enableToggleReplies();
    
  return commentElement;
}

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
      repliesPlaceholder.style.display === 'block';

      updatePainting(replyResponse.paints); // TODO: implement `updatePainting`
    }

    const replySubmitButton = replyForm.querySelector('input[type="submit"]');
    enableForm(replySubmitButton, SERVER_URL, getReplyInputs, onDataFetched);
  }
  enableReplyForm();

  return replyForm;
}

/**
 * Creates a reply HTML element.
 * @param {string} responderName Name of the responder that is to be displayed.
 * @param {string} replyMsg Message that is to be displayed.
 * @param {string} replyColour Colour which is used to highlight the responder's name.
 */
function createReply(responderName, replyMsg, replyColour) {
  const replyElement = document.createElement('li');
  replyElement.classList.add('reply');
  replyElement.innerHTML = `<p><span class="responder-name">${responderName}</span>:</p>` +
      `<div class="response"><p>${replyMsg}</p></div>`;
  return replyElement;
}

const main = () => {
  const body = document.getElementsByTagName('body')[0];
  body.onload = fetchAndShowComments;
}


const READ_SERVER_LINK = '/read_comments';
const fetchAndShowComments = () => {
  fetch(READ_SERVER_LINK)
      .then(response => response.json())
      .then(readResponse => {
        const commentsJson = readResponse.comments;
        setupComments(commentsJson);
        const paintsJson = readResponse.paints;
        // TODO: add function to alter colour
        enableCommentForm();
      });
}

const setupComments = (commentsJson) => {
  const commentsPlaceholder = document.getElementById('comments-placeholder');
  commentsPlaceholder.innerHTML = commentsJson.map(commentJson => toComment(commentJson).outerHTML)
      .join('');
}

/** Converts a JSON representation of comment to a comment HTML element. */
const toComment = (commentJson) => {
  const replies = commentJson.replies.forEach(replyJson => toReply(replyJson));
  return createComment(commentJson.id, commentJson.commenterName, 
      commentJson.commentColour, replies);
}

/** Converts a JSON representation of reply to a reply HTML element. */
const toReply = (replyJson) => {
  return createReply(replyJson.responderName, replyJson.replyMsg, replyJson.replyColour);
}

main();
