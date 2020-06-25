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

/** Creates a comment HTML element from its JSON representation. */
const createCommentElementFromJson = (commentJson) => {
  const replies = [];
  commentJson.replies
      .forEach(replyJson => replies.push(createReplyElementFromJson(replyJson)));
  return createComment(commentJson.commentId, commentJson.commenterName, 
      commentJson.message, commentJson.commentColour, replies);
}
