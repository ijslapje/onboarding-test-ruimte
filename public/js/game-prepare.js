/**
 * Waits for the DOM to load before executing the code.
 *
 * @callback DOMContentLoadedCallback
 */

/**
 * Event: DOMContentLoaded.
 * This event fires when the initial HTML document has been completely loaded and parsed.
 *
 * @event Event:DOMContentLoaded
 * @param {DOMContentLoadedCallback} listener - The callback function to execute when the DOM content is loaded.
 */

document.addEventListener("DOMContentLoaded", function () {
  /**
   * Event listener for the continue button click event.
   *
   * @callback ContinueButtonClickCallback
   */

  /**
   * Represents the continue button element.
   *
   * @type {HTMLElement}
   */
  const continueButton = document.getElementById("continueButton");
  let chosenTeam;

  if (continueButton) {
    continueButton.addEventListener("click", function () {
      /**
       * Represents the team dropdown element.
       *
       * @type {HTMLSelectElement}
       */
      const teamDropdown = document.getElementById("teamDropdown");
      if (teamDropdown) {
        chosenTeam = teamDropdown.value;

        fetch("/game-prepare", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ chosenTeam }),
        })
          .then((response) => {
            if (response.ok) {
              console.log("Chosen team sent successfully");
              console.log(chosenTeam);
            } else {
              /**
               * An error occurred while sending the chosen team.
               *
               * @type {Error}
               */
              console.error("Failed to send chosen team");
            }
          })
          .catch((error) => {
            /**
             * An error occurred during the request to send the chosen team.
             *
             * @type {Error}
             */
            console.error("Error:", error);
          });

        // Redirect to game-load.html
        window.location.href = `game-load.html?team=${encodeURIComponent(chosenTeam)}`;
      } else {
        /**
         * Error: Team dropdown element not found.
         *
         * @type {Error}
         */
        console.error("Team dropdown element not found.");
      }
    });
  } else {
    /**
     * Error: Continue button element not found.
     *
     * @type {Error}
     */
    console.error("Continue button element not found.");
  }
});
