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

document.addEventListener('DOMContentLoaded', function() {
  /**
   * Event listener for the teacher button click event.
   *
   * @callback TeacherButtonClickCallback
   * @param {Event} event - The click event object.
   */

  /**
   * Represents the teacher button element.
   *
   * @type {HTMLElement}
   */
  var teacherButton = document.getElementById('teacherButton');

  /**
   * Represents the password popup element.
   *
   * @type {HTMLElement}
   */
  var passwordPopup = document.getElementById('passwordPopup');

  /**
   * Represents the password input element.
   *
   * @type {HTMLInputElement}
   */
  var passwordInput = document.getElementById('passwordInput');

  /**
   * Represents the password submit button element.
   *
   * @type {HTMLElement}
   */
  var passwordSubmit = document.getElementById('passwordSubmit');

  teacherButton.addEventListener('click', function(event) {
    /**
     * Prevents the default behavior of the click event.
     *
     * @function Event#preventDefault
     */

    event.preventDefault();

    passwordPopup.style.display = 'block';
  });

  passwordSubmit.addEventListener('click', function() {
    /**
     * Represents the password value entered by the user.
     *
     * @type {string}
     */
    var password = passwordInput.value;

    if (password === '1234') {
      window.location.href = 'admin.html';
    } else {
      /**
       * Shows an alert for an incorrect password.
       *
       * @function alert
       * @param {string} message - The alert message to display.
       */
      alert('Incorrect password. Please try again.');
    }
  });
});
