/**
 * Retrieves the current time in the format "HH:MM:SS".
 *
 * @returns {string} The current time in the format "HH:MM:SS".
 */
function getCurrentTimeInFormat() {
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');
  return `${hours}:${minutes}:${seconds}`;
}

// Add click event listener to the element with id "confirmButton"
document.getElementById('confirmButton').addEventListener('click', () => {
  const startTime = getCurrentTimeInFormat();

  /**
   * Sends a POST request to the '/adminScript' endpoint with the start time in the request body.
   *
   * @param {string} startTime - The start time in the format "HH:MM:SS".
   */
  fetch('/adminScript', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ startTime }),
  })
    .then(response => {
      if (response.ok) {
        console.log('Start time sent successfully');

        // Redirect to file-showcase.html
        window.location.href = 'file-showcase.html';
      } else {
        console.error('Failed to send start time');
      }
    })
    .catch(error => {
      console.error('Error:', error);
    });
});
