// Comment data structure
function Comment(name, text) {
    this.name = name;
    this.text = text;
    this.replies = [];
  }
  
  // Function to submit a new comment
  function submitComment(event) {
    event.preventDefault();
    
    const nameInput = document.getElementById('name');
    const commentInput = document.getElementById('comment');
    
    const name = nameInput.value;
    const comment = commentInput.value;
    
    const newComment = new Comment(name, comment);
    addComment(newComment);
    
    nameInput.value = '';
    commentInput.value = '';
  }
  
  // Function to add a comment to the comment list
  function addComment(comment) {
    const commentList = document.getElementById('comment-list');
    
    const li = document.createElement('li');
    li.innerHTML = `
      <strong>${comment.name}</strong>
      <p>${comment.text}</p>
    `;
    
    commentList.appendChild(li);
  }
  
  // Example comments
  const comment1 = new Comment('John', 'Great post!');
  const comment2 = new Comment('Jane', 'I enjoyed reading this.');
  
  // Add example comments to the comment list
  addComment(comment1);
  addComment(comment2);