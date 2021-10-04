const storyId = document.querySelector('input[name="story-id"]').value;

const editFormHandler = async function(event) {
  event.preventDefault();

  const storyTitle = document.querySelector('input[name="story-title"]').value;
  const storyContent = document.querySelector('textarea[name="story-content"]').value;

  await fetch(`/api/stories/${storyId}`, {
    method: 'PUT',
    body: JSON.stringify({
      storyTitle,
      storyContent
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
  .querySelector('#edit-story')
  .addEventListener('submit', editFormHandler);
document
  .querySelector('#deleteBtn')
  .addEventListener('click', deleteClickHandler);