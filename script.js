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
    fetch('/comments.json', {
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
  fetch('/comments.json')
    .then(response => response.json())
    .then(data => {
      // Add each comment to the comment list
      data.forEach(comment => addComment(comment));
    })
    .catch(error => {
      console.error('Error:', error);
      alert('An error occurred while fetching the comments. Please try again.');
    });
  
  // Function to add a comment to the comment list
  function addComment(comment) {
    const commentList = document.getElementById('comment-list');
    
    const li = document.createElement('li');
    li.innerHTML = `
      <strong>${comment.name}</strong>
      <p>${comment.comment}</p>
    `;
    
    commentList.appendChild(li);
  }
  
  // Attach event listener to the comment form
  const commentForm = document.getElementById('comment-form');
  commentForm.addEventListener('submit', submitComment);