let startTime = '';
let teamData = {};
let currentTeamIndex = 0;
let countdownDuration = [5 * 60, 15 * 60];

// Countdown function
function startCountdown(duration, onFinish) {
  let timer = duration;
  const timerElement = document.getElementById('timer');

  const countdownInterval = setInterval(() => {
    const minutes = Math.floor(timer / 60);
    const seconds = timer % 60;

    timerElement.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

    if (--timer < 0) {
      clearInterval(countdownInterval);
      console.log('Countdown finished');
      onFinish();
    }

    // Check if the timer duration should switch from 5 to 10 minutes
    if (duration === countdownDuration[0] && timer === countdownDuration[1] - countdownDuration[0]) {
      const instructionElement = document.getElementById('instruction');
      instructionElement.textContent = 'Upload your Result!';
    }
  }, 1000);
}

// Function to update the HTML elements with team data
function updateTeamData() {
  const locationNameElement = document.getElementById('locationName');
  const assignmentElement = document.getElementById('assignment');
  const tipsElement = document.getElementById('tips');

  const locations = Object.keys(teamData);
  const location = locations[currentTeamIndex % locations.length];
  const locationInfo = teamData[location][currentTeamIndex % teamData[location].length];

  console.log('Location info:', locationInfo);

  locationNameElement.textContent = locationInfo.Name;
  assignmentElement.textContent = locationInfo.Assignment;
  tipsElement.textContent = locationInfo.Tips;

  currentTeamIndex++;

  const instructionElement = document.getElementById('instruction');
  instructionElement.textContent = 'Find the Room!';
}

// Function to cycle through the timeline items
function cycle() {
  const timelineItems = document.querySelectorAll('.timeline-item');
  let currentIndex = 0;

  // Function to update the active timeline item and team data
  function updateTimeline() {
    // Remove the "active" class from all timeline items
    timelineItems.forEach((item) => {
      item.classList.remove('active');
    });

    // Add the "active" class to the corresponding timeline item
    const currentItem = timelineItems[currentIndex];
    currentItem.classList.add('active');
    console.log('Current Timeline Item:', currentItem.textContent);

    if (currentItem.textContent > 1) {
      // Update team data
      updateTeamData();
    }
  }

  // Start the cycling process
  function startCycling() {
    // Start the first countdown
    console.log('Countdown started');
    startCountdown(countdownDuration[0], () => {
      console.log('First countdown finished');

      // Wait for a duration (e.g., 2 seconds) before starting the second countdown
      setTimeout(() => {
        console.log('Second countdown finished');
        startCountdown(countdownDuration[1], () => {
          console.log('Second countdown finished');
          currentIndex++;
          if (currentIndex < timelineItems.length) {
            updateTimeline();
            startCycling();
          } else {
            console.log('End of cycles');
          }
        });
      });
    });
  }

  startCycling();
}

// Get startTime for the countdown from server.js
fetch('/game-play')
  .then(response => response.json())
  .then(data => {
    startTime = data.startTime;
    console.log('startTime:', startTime);

    const [hours, minutes, seconds] = startTime.split(':');
    const startTimestamp = new Date();
    startTimestamp.setHours(hours);
    startTimestamp.setMinutes(minutes);
    startTimestamp.setSeconds(seconds);
    const currentTime = new Date();
    const duration = Math.floor((startTimestamp - currentTime) / 1000);

    if (duration > 0) {
      console.log('Countdown will start in', duration, 'seconds');
      startCountdown(duration, () => {
        console.log('Countdown finished');
        fetch('/game-load')
          .then(response => response.json())
          .then(data => {
            teamData = data;
            console.log('teamData:', teamData);
            updateTeamData();
            cycle();
          })
          .catch(error => {
            console.error('Error:', error);
          });
      });
    } else {
      console.log('Countdown started');
      fetch('/game-load')
        .then(response => response.json())
        .then(data => {
          teamData = data;
          console.log('teamData:', teamData);
          updateTeamData();
          cycle();
        })
        .catch(error => {
          console.error('Error:', error);
        });
    }
  })
  .catch(error => {
    console.error('Error:', error);
  });

// Send and upload Photo/Video to 'files' using server.js
const fileInput = document.getElementById('imageInput');
if (fileInput) {
  fileInput.addEventListener('change', () => {
    const file = fileInput.files[0];
    const formData = new FormData();
    formData.append('image', file);

    fetch('/upload-image', {
      method: 'POST',
      body: formData,
    })
      .then(response => {
        if (response.ok) {
          console.log('File uploaded successfully');
        } else {
          console.error('Failed to upload file');
        }
      })
      .catch(error => {
        console.error('Error:', error);
      });
  });
}