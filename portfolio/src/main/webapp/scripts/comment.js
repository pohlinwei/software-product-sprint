/** Sets up comment section */
const setupComment = () => {
  const body = document.getElementsByTagName('body')[0];
  body.onload = fetchAndShowResponse;
}

/** Fetches response from the server and displays it under 'Contact' section. */
const fetchAndShowResponse = () => {
  const commentPlaceholder = document.getElementById('comment-placeholder');
  try {
    ensureNonNull(commentPlaceholder);
  } catch (err) {
    console.log(error);
  }
  fetch('/comment').then(response => response.json()).then(comments => {
    comments.forEach(commentText => {
      commentPlaceholder.appendChild(createCommentElement(commentText))
    });
  });
}

/** Creates an element which contains the comment text. */
const createCommentElement = (commentText) => {
  const comment = document.createElement('li');
  comment.innerHTML = commentText;
  return comment;
}

setupComment();
