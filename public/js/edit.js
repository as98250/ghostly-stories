const storyId = document.querySelector('input[name="story-id"]').value;

const editFormHandler = async function(event) {
  event.preventDefault();
  const title = document.querySelector('input[name="story-title"]').value;
  const content = document.querySelector('textarea[name="story-content"]').value;
  await fetch(`/api/stories/${storyId}`, {
    method: 'PUT',
    body: JSON.stringify({
      title,
      content,
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  });
  document.location.replace('/profile');
};

const deleteClickHandler = async function() {
  await fetch(`/api/stories/${storyId}`, {
    method: 'DELETE'
  });
  document.location.replace('/profile');
};

document
  .getElementById('edit-story-form')
  .addEventListener('submit', editFormHandler);
document
  .querySelector('#deleteBtn')
  .addEventListener('click', deleteClickHandler);