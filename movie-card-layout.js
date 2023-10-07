// Get a reference to the container element for movie cards
const container = document.querySelector('.movie-card-container');

// Define breakpoints for different screen sizes
const breakpoints = {
  extraSmall: 575,
  small: 767,
  medium: 991,
  large: 1199,
};

// Function to calculate the number of columns based on screen width
function calculateColumns() {
  const screenWidth = window.innerWidth;

  if (screenWidth <= breakpoints.extraSmall) {
    return 1; // Display 1 card per row on extra small screens
  } else if (screenWidth <= breakpoints.small) {
    return 2; // Display 2 cards per row on small screens
  } else if (screenWidth <= breakpoints.medium) {
    return 3; // Display 3 cards per row on medium screens
  } else if (screenWidth <= breakpoints.large) {
    return 4; // Display 4 cards per row on large screens
  } else {
    return 4; // Default to 4 columns for larger screens
  }
}

// Function to update the number of columns and apply CSS styles
function updateColumns() {
  const columns = calculateColumns();
  const cardWidth = 100 / columns;

  // Set the width of each card based on the number of columns
  const cards = container.querySelectorAll('.movie-card');
  cards.forEach((card) => {
    card.style.width = `${cardWidth}%`;
  });
}

// Update the number of columns initially and whenever the window is resized
updateColumns();
window.addEventListener('resize', updateColumns);
