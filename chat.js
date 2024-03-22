// Add an event listener to the chat form
document.getElementById('chat-form').addEventListener('submit', e => {
  e.preventDefault();

  // Get the message from the input field
  const message = document.getElementById('chat-input').value;

  // Add the message to the chat window
  const li = document.createElement('li');
  li.textContent = message;
  document.getElementById('chat-messages').appendChild(li);

  // Clear the input field
  document.getElementById('chat-input').value = '';

  // Add the message to the JSON file
  fetch('messages.json')
    .then(response => response.json())
    .then(data => {
      data.messages.push(message);

      // Convert the data back to JSON
      const json = JSON.stringify(data);

      // Create a Blob object with the JSON data
      const blob = new Blob([json], { type: 'application/json' });

      // Create a new File object with the Blob object
      const file = new File([blob], 'messages.json');

      // Create a FormData object with the File object
      const formData = new FormData();
      formData.append('file', file);

      // Send the FormData object to the server using a POST request
      fetch('https://webdev-dummy.herokuapp.com/messages.json', {
        method: 'POST',
        body: formData
      })
        .then(response => response.json())
        .then(data => {
          console.log('Message added to JSON file:', data);
        });
    });
});