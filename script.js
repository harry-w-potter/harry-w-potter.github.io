// Function to submit a new comment
function submitComment(event) {
    event.preventDefault();
    
    const nameInput = document.getElementById('name');
    const commentInput = document.getElementById('comment');
    
    const name = nameInput.value;
    const comment = commentInput.value;
    
    // Create a new comment object
    const newComment = { name, comment };
    
    // Fetch API to POST the new comment
    fetch('/comments', {
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
  
  // Fetch API to GET the comments from the Markdown file
  fetch('/comments.md')
    .then(response => response.text())
    .then(data => {
      // Parse the Markdown file and extract the comments
      const comments = parseComments(data);
      
      // Add each comment to the comment list
      comments.forEach(comment => addComment(comment));
    })
    .catch(error => {
      console.error('Error:', error);
      alert('An error occurred while fetching the comments. Please try again.');
    });
  
  // Parse the Markdown file and extract the comments
  function parseComments(markdownText) {
    // Code to parse the Markdown file and extract comment data
    // You can use libraries like remark, marked, or regex to parse the Markdown
    
    // Sample code that assumes comments are written in a specific format:
    const regex = /- \*\*([^*]+)\*\*\n\n  ([^\n]+)/g;
    const comments = [];
    let match;
    
    while ((match = regex.exec(markdownText)) !== null) {
      const [, name, comment] = match;
      comments.push({ name, comment });
    }
    
    return comments;
  }