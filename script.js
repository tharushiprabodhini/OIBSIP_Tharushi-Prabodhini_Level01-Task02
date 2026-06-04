// Highlight active nav link on scroll
function highlightActiveNav() {
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.nav-links a');

  window.addEventListener('scroll', () => {
    let current = '';

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;

      if (pageYOffset >= sectionTop - sectionHeight / 3) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href').slice(1) === current) {
        link.classList.add('active');
      }
    });
  });
}

// Theme toggle functionality
const themeBtn = document.getElementById('theme-btn');
const body = document.body;

// Check for saved theme preference
let isDark = localStorage.getItem('theme') === 'dark';

// Apply saved theme on load
function applyTheme() {
  if (isDark) {
    body.classList.add('dark-theme');
    themeBtn.textContent = 'Light Mode';
  } else {
    body.classList.remove('dark-theme');
    themeBtn.textContent = 'Dark Mode';
  }
}

// Toggle theme on button click
themeBtn.addEventListener('click', () => {
  isDark = !isDark;
  applyTheme();
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
});


// Handle contact form submission
function handleContactFormSubmit() {
  const form = document.querySelector('.contact-form');

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      // Get form values
      const userName = document.getElementById('name').value;
      const userEmail = document.getElementById('email').value;
      const userMessage = document.getElementById('message').value;

      // Hide form
      form.style.display = 'none';

      // Create success message
      const successMessage = document.createElement('div');
      successMessage.className = 'success-message';

      successMessage.innerHTML = `
        <h3>Message Sent Successfully ✅</h3>

        <p><strong>Name:</strong> ${userName}</p>

        <p><strong>Email:</strong> ${userEmail}</p>

        <p><strong>Your Message:</strong><br>${userMessage}</p>

        <button class="ok-btn">OK</button>
      `;

      // Add success message
      const contactContainer = form.parentElement;
      contactContainer.appendChild(successMessage);

      // OK button
      const okBtn = successMessage.querySelector('.ok-btn');

      okBtn.addEventListener('click', () => {
        successMessage.remove();
        form.style.display = 'flex';
        form.reset();
      });
    });
  }
}


// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  applyTheme();
  highlightActiveNav();
  handleContactFormSubmit();
});

