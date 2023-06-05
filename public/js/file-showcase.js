// Get the gallery container element
const galleryContainer = document.getElementById('gallery');

console.log('Fetching files...');

fetch('/file-showcase')
  .then(response => response.json())
  .then(data => {
    console.log('Files received:', data);
    const files = data.files;
    for (const file of files) {
      const url = `/files/${file.filename}`;

      // Create a card element for each file
      const cardElement = document.createElement('div');
      cardElement.classList.add('card');

      // Create a container element for the media elements
      const mediaContainer = document.createElement('div');

      // Create an image or video element based on the file type
      let previewElement;
      let mediaElement;
      if (file.type === 'image') {
        previewElement = document.createElement('img');
        previewElement.src = url; // Set the preview image source URL
      } else if (file.type === 'video') {
        previewElement = document.createElement('img');
        mediaElement = document.createElement('video');
        previewElement.src = `/video-preview/${file.filename}`; // Set the video preview image URL
        mediaElement.src = url; // Set the video source URL
        mediaElement.controls = true; // Enable video controls
      }

      // Append the preview element to the media container
      mediaContainer.appendChild(previewElement);

      // Append the media element to the media container if it exists
      if (mediaElement) {
        mediaContainer.appendChild(mediaElement);
      }

      // Append the media container to the card element
      cardElement.appendChild(mediaContainer);

      // Append the card element to the gallery container
      galleryContainer.appendChild(cardElement);

      // Add click event listener to each media element
      cardElement.addEventListener('click', function (event) {
        event.stopPropagation(); // Prevent event bubbling to the gallery container
        if (file.type === 'video') {
          event.preventDefault(); // Prevent the default behavior of the video element
        }
        openPopup(file);
      });
    }
  })
  .catch(error => {
    console.error('Error:', error);
  });



// Function to open the popup and show the selected media file
function openPopup(file) {
  const popup = document.getElementById('popup');
  const popupMedia = document.getElementById('popup-media');

  // Create an image or video element based on the file type
  let mediaElement;
  if (file.type === 'image') {
    mediaElement = document.createElement('img');
    mediaElement.style.maxHeight = '80vh'; // Set max height to 80vh
  } else if (file.type === 'video') {
    mediaElement = document.createElement('video');
    mediaElement.controls = true;
  }

  mediaElement.src = `/files/${file.filename}`; // Update the URL

  // Clear previous content
  popupMedia.innerHTML = '';

  // Append the media element to the popup
  popupMedia.appendChild(mediaElement);

  // Show the popup
  popup.classList.add('active');
}


// Function to close the popup
function closePopup() {
  const popup = document.getElementById('popup');
  const popupMedia = document.getElementById('popup-media');

  // Clear the media element
  popupMedia.innerHTML = '';

  // Hide the popup
  popup.classList.remove('active');
}

// Event listener for closing the popup
const popupClose = document.querySelector('.popup-close');
popupClose.addEventListener('click', closePopup);

const popup = document.getElementById('popup');
popup.addEventListener('click', function (event) {
  if (event.target === popup) {
    closePopup();
  }
});
