/** Sets up all the required listeners and creates all necessary elements. */
const main = () => {
  const body = document.getElementsByTagName('body')[0];
  body.onload = fetchAndShowComments;
}

/** Fetches comments from the server. */
const fetchAndShowComments = () => {
  fetch('/read_comments')
      .then(response => response.json())
      .then(commentsJson => {
        const comments = commentsJson.map(Comment.toComment(commentJson));
        const commentsManager = new CommentsManager(comments);
        enableComment(commentsManager);
      });
}

main();
