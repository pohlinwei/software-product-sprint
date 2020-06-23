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

/** Converts a JSON representation of reply to a reply HTML element. */
const toReply = (replyJson) => {
  return createReply(replyJson.responderName, replyJson.replyMsg, replyJson.replyColour);
}
