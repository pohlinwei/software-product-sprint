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
