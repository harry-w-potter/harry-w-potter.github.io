// Fetch the JSON file containing the messages
fetch('messages.json')
  .then(response => response.json())
  .then(data => {
    // Store the messages in a variable
    const messages = data.messages;

    // Display the messages in the chat window
    messages.forEach(message => {
      const li = document.createElement('li');
      li.textContent = message;
      document.getElementById('chat-messages').appendChild(li);
    });
  });

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
});