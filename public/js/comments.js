const commentFormHandler = async function(event) {
    event.preventDefault();
  
    const story_id = document.querySelector('input[name="story-id"]').value;
    const description = document.querySelector('textarea[name="comment-description"]').value;
  
    if (description) {
      await fetch('/api/comments', {
        method: 'POST',
        body: JSON.stringify({ 
          story_id,
          description
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      });
  
      document.location.reload();
    }
  };
  
  document
    .querySelector('#new-comment-form')
    .addEventListener('submit', commentFormHandler);
  