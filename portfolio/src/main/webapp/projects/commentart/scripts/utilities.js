/** 
 * Enables a form to post request.  
 * @param {HTML Form element} form
 * @param {InputProvider} inputProvider Provides the necessary inputs.
 * @param {Updatable} updatable Performs the necessary updates.
 */
function enableForm(form, inputProvider, updatable) {
  // TODO: ensure that form is not null
  const requestLink = form.getAttribute('action');
  const submissionBtn = form.querySelector('input[type="submit"]');
  // TODO: ensure that submissionBtn is not null
  submissionBtn.onclick = (event) => {
    event.preventDefault();
    fetch(requestLink, {
      method: 'POST',
      body: JSON.stringify(inputProvider.inputs)
    }).then(response => response.json())
      .then(data => updatable.onDataFetched(data))
      .catch(err => console.log(err));
  }
}
