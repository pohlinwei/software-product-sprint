function enableAsyncForm(form, getInputs, callBackFunc) {
  // TODO: ensure that form is not null
  const requestLink = form.getAttribute('action');
  const submissionBtn = form.querySelector('input[type="submit"]');
  // TODO: ensure that submissionBtn is not null
  submissionBtn.onclick = (event) => {
    event.preventDefault();
    fetch(requestLink, {
      method: 'POST',
      body: JSON.stringify(getInputs())
    }).then(response => response.json())
      .then(data => callBackFunc(data))
      .catch(err => console.log(err));
  }
}
