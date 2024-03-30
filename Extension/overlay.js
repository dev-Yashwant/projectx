
// JavaScript code to inject the overlay HTML directly into the webpage's DOM
const overlayHTML = `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Overlay</title>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css"> <!-- Include Font Awesome CSS -->
<style>
/* Styles for the overlay */
#overlay {
  position: fixed;
  top: 30%;
  left: 83%;            
  max-witdh:100%;
  width:20%;
  transform: translate(-50%, -50%);
  background-color: rgba(100, 100, 100, 0.2); /* Adjust alpha value for transparency */
  padding: 20px;
  border-radius: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  color: white; /* Set text color to white */
  box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.5);
}

#overlay .content {
  text-align: center;
}

#overlay .content1 {
  border-radius: 10px; /* Set border radius */
  // border: 2px solid grey; /* Set border with white color */
  padding:2%;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5); /* Add box shadow */
  margin-bottom:5%;
  margin-top:5%;
  width-100%
}

#overlay .content2 {
  border-radius: 10px; /* Set border radius */
  // border: 2px solid grey; /* Set border with white color */
  padding:2%;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5); /* Add box shadow */
  width-100%
}

#main {
    display: flex;
    flex-direction: column;
   max-width: 100%;
}
  
#overlay .content1 p {
  font-size: 20px;
  margin-bottom: 10px;
  
}
#overlay .content2 p {
  font-size: 20px;
  margin-bottom: 10px;
}

#overlay .content1 h1 {
  font-size: 24px;
  color: black;
  margin-top: 20px;
  margin-bottom: 10px;
  font-family: 'Pacifico', cursive;
  
  
}
#overlay .content2 h2 {
  font-size: 24px;
  color: black;
  margin-top: 20px;
  margin-bottom: 10px;
  font-family: 'Pacifico', cursive;
  
}

.icon {
  font-size: 40px;      
  margin-right: 10px;
}

/* Progress bar styles */
.progress-bar {
  width: 100%;
  height: 20px;
  background-color: #333;
  border-radius: 10px;
  overflow: hidden;
}

.progress {
  height: 100%;
  transition: width 0.5s ease, background-color 0.5s ease; /* Smooth transition for both width and color */
}

/* Change color based on progress value */
.progress.red {
  background-color: C40707;
}

.progress.light-red {
  background-color: C46607; /* Light red */
}

.progress.orange {
  background-color: C48E07;
}

.progress.light-orange {
  background-color: #BEC407; /* Light orange */
}

.progress.green {
  background-color: green;
}

/* Comment styles */
#comments-container {
  margin-top: 20px;
  overflow-y: auto;
  max-height: 100px; /* Limit height to allow scrolling */
  max-width:100%;
}

.comment {
  margin-bottom: 10px;
  padding: 5px;
  border-radius: 5px;
  color:black;
  background-color: rgba(255, 255, 255, 0.1);
  word-wrap: break-word; /* Allow long words to break and wrap to the next line */
}
</style>
</head>
<body>

<!-- Overlay HTML -->
<div id="overlay">
 <div id="main"> 
    <div class="content1">
        
        <h1>Trust Score</h1>
        <!-- Progress bar for Trust Score -->
        <div class="progress-bar">
          <div class="progress" style="width: 0%;"></div> <!-- Initial progress value (starts at 0%) -->
        </div>
    </div>
    <div class="content2">
       
        <h2>Comments</h2>
        <!-- Container for comments -->
        <div id="comments-container"></div>
    </div>
 </div> 
</div>

</body>
</html>
`;

// Inject the overlay HTML directly into the webpage's DOM
document.body.insertAdjacentHTML('beforeend', overlayHTML);

// Function to update progress bar color and value
function updateProgressBar() {
    const progressElement = document.querySelector('.progress');
    const progressValue = Math.random() * 100; // Generate random progress value (0 to 100)
    progressElement.style.width = `${progressValue}%`; // Update width of progress bar

    // Update color based on progress value
    if (progressValue < 20) {
        progressElement.className = 'progress red';
    } else if (progressValue < 40) {
        progressElement.className = 'progress light-red';
    } else if (progressValue < 60) {
        progressElement.className = 'progress orange';
    } else if (progressValue < 80) {
        progressElement.className = 'progress light-orange';
    } else {
        progressElement.className = 'progress green';
    }
}

// Function to add a new comment
function addComment(author, text) {
  const commentsContainer = document.getElementById('comments-container');
  const commentElement = document.createElement('div');
  commentElement.classList.add('comment');
  commentElement.innerHTML = `<strong>${author}:</strong> ${text}`;
  commentsContainer.appendChild(commentElement);

  // Check if the number of comments exceeds the limit
  const commentElements = commentsContainer.querySelectorAll('.comment');
  if (commentElements.length > 3) {
      commentsContainer.style.overflowY = 'scroll'; // Enable vertical scrolling
  }
}


// Update progress bar color and value every 2 seconds
setInterval(updateProgressBar, 2000);

// Dummy comments for demonstration
const dummyComments = [
    { author: '1', text: 'Great video!' },
    { author: '2', text: 'I love this topic!' },
    { author: '3', text: 'Can you eabout...?' },
    { author: '3', text: 'Can you explain more about...?' },
    { author: '3', text: 'Can you explain more about...?' },
    { author: '3', text: 'Can you explain more fejgoivjeiojgoihrjjjihagvjrewkghwieugjrihheiuhreiabout...?' },
    { author: '3', text: 'Can you explain more about...?' },
    { author: '3', text: 'Can you explain more about...?' },
];

// Add dummy comments
dummyComments.forEach(comment => {
    addComment(comment.author, comment.text);
});
