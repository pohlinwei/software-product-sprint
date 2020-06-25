/**
 * Creates a reply HTML element.
 * @param {string} responderName Name of the responder that is to be displayed.
 * @param {string} replyMsg Message that is to be displayed.
 * @param {string} replyColour Colour which is used to highlight the responder's name.
 */
function createReply(responderName, replyMsg, replyColour) {
  const replyElement = document.createElement('li');
  replyElement.classList.add('reply');
  replyElement.innerHTML = `<p><span class="responder-name"><mark>${responderName}</mark></span>:</p>` +
      `<div class="response"><p>${replyMsg}</p></div>`;

  // highlight responder's name 
  const responderNameElement = replyElement.querySelector('mark');
  responderNameElement.style.backgroundColor = replyColour;

  return replyElement;
}

/** Creates a reply HTML element from its JSON representation. */
const createReplyElementFromJson = (replyJson) => {
  return createReply(replyJson.responderName, replyJson.replyMsg, replyJson.replyColour);
}
