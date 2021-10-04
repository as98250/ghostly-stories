const storyId = document.querySelector('input[name="story-id"]').value;

const editFormHandler = async function(event) {
  event.preventDefault();
  console.log(1);
  const storyTitle = document.querySelector('input[name="story-title"]').value;
  const storyContent = document.querySelector('textarea[name="story-content"]').value;
  console.log(2);
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
  console.log(3);
  document.location.replace('/profile');
};

const deleteClickHandler = async function() {
  await fetch(`/api/stories/${storyId}`, {
    method: 'DELETE'
  });
  document.location.replace('/profile');
};

document
  .querySelector('#editBtn')
  .addEventListener('submit', editFormHandler);
document
  .querySelector('#deleteBtn')
  .addEventListener('click', deleteClickHandler);