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

  // Create a new FormData object
  const formData = new FormData();

  // Add the message to the FormData object
  formData.append('message', message);

  // Send the FormData object to the server using a POST request
  fetch('https://harry-w-potter.github.io/messages.json', {
    method: 'POST',
    body: formData
  })
    .then(response => response.json())
    .then(data => {
      console.log('Message added to JSON file:', data);
    })
    .catch(error => {
      console.error('Error adding message to JSON file:', error);
    });
});

// Fetch the JSON file and display the messages in the chat window
fetch('messages.json')
  .then(response => response.json())
  .then(data => {
    data.messages.forEach(message => {
      const li = document.createElement('li');
      li.textContent = message;
      document.getElementById('chat-messages').appendChild(li);
    });
  })
  .catch(error => {
    console.error('Error fetching JSON file:', error);
  });