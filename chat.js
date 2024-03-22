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

      // Update the JSON file with the new message
      fetch('messages.json', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
    });
});