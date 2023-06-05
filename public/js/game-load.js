/**
 * Function to be executed when the DOM content is loaded.
 * Fetches the game data from '/game-load' endpoint and handles the loading and continuation of the game.
 */
document.addEventListener('DOMContentLoaded', function () {
  /**
   * Fetches the game data from the '/game-load' endpoint.
   * Handles the loading and continuation of the game.
   */
  fetch('/game-load')
    .then(response => response.json())
    .then(data => {
      /**
       * Personal team data received from the '/game-load' endpoint.
       * @type {object}
       */
      const personalTeamData = data;
      console.log(personalTeamData);

      /**
       * Function to be executed after a delay of 2000 milliseconds.
       * Handles the loading and continuation elements on the page.
       */
      setTimeout(function () {
        /**
         * Element representing the loading container.
         * @type {HTMLElement}
         */
        const loadingContainer = document.getElementById('loadingContainer');

        /**
         * Element representing the continue container.
         * @type {HTMLElement}
         */
        const continueContainer = document.getElementById('continueContainer');

        loadingContainer.classList.add('hidden');
        continueContainer.classList.remove('hidden');

        // Add click event listener to the continue button
        const continueButton = document.getElementById('continueButton');
        continueButton.addEventListener('click', function () {
          fetch('/game-play', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ personalTeamData })
          })
            .then(response => {
              if (response.ok) {
                // Redirect to the game-play.html page
                window.location.href = 'game-play.html';
              } else {
                console.error('Error:', response.status);
              }
            })
            .catch(error => {
              console.error('Error:', error);
            });
        });
      }, 2000);
    })
    .catch(error => {
      console.error('Error:', error);
    });
});
