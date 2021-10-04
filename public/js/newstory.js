const newFormHandler = async function(event) {
    event.preventDefault();
  
    const title = document.querySelector('input[name="story-title"]').value;
    const content = document.querySelector('textarea[name="story-content"]').value;


    await fetch(`/api/stories`, {
      method: 'POST',
      body: JSON.stringify({
        title,
        content,
        
      }),
      headers: { 'Content-Type': 'application/json' },
    });
  
    document.location.replace('/profile');
  };
  
  document
    .querySelector('#new-story-form')
    .addEventListener('submit', newFormHandler);