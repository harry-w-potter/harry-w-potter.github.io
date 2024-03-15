// Function to submit a new comment
function submitComment(event) {
  event.preventDefault();
  
  const nameInput = document.getElementById('name');
  const commentInput = document.getElementById('comment');
  
  const name = nameInput.value;
  const comment = commentInput.value;

  // Create a new comment object
  const newComment = { name, comment };
  
  // Fetch API to POST the new comment to the server
  fetch('/comments.json', { // Corrected endpoint
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(newComment)
  })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        addComment(newComment);
        nameInput.value = '';
        commentInput.value = '';
      } else {
        alert('Failed to submit the comment. Please try again.');
      }
    })
    .catch(error => {
      console.error('Error:', error);
      alert('An error occurred while submitting the comment. Please try again.');
    });
}

// Fetch API to GET the comments from the server
fetch('/comments.json') // Corrected endpoint
  .then(response => response.json())
  .then(data => {
    // Add each comment to the comment list
    data.forEach(comment => addComment(comment));
  })
  .catch(error => {
    console.error('Error:', error);
    alert('An error occurred while fetching the comments. Please try again.');
  });