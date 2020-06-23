/** Sets up all the required listeners and creates all necessary elements. */
const main = () => {
  const body = document.getElementsByTagName('body')[0];
  body.onload = fetchAndShowComments;
}

const READ_SERVER_LINK = '/read_comments';
/** Fetches and loads all required data. */
const fetchAndShowComments = () => {
  fetch(READ_SERVER_LINK)
      .then(response => response.json())
      .then(readResponse => {
        const commentsJson = readResponse.comments;
        setupComments(commentsJson);
        const paintsJson = readResponse.paints;
        // TODO: add function to alter colour
        enableCommentForm();
      })
      .catch(err => console.error(err));
}

/** Sets up the comment section. */
const setupComments = (commentsJson) => {
  const commentsPlaceholder = document.getElementById('comments-placeholder');
  commentsPlaceholder.innerHTML = commentsJson.map(commentJson => toComment(commentJson).outerHTML)
      .join('');
}

main();
