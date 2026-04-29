function scrollToSection() {
  document.getElementById("cards").scrollIntoView({
    behavior: "smooth"
  });
}

function goToPage(page) {
  window.location.href = page;
}


function submitContact() {
  const name    = document.getElementById('contact-name').value.trim();
  const email   = document.getElementById('contact-email').value.trim();
  const message = document.getElementById('contact-message').value.trim();
  const feedback = document.getElementById('form-feedback');

  // Basic validation
  if (!name || !email || !message) {
    feedback.textContent = 'Please fill in all fields.';
    feedback.className = 'form-feedback error';
    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    feedback.textContent = 'Please enter a valid email address.';
    feedback.className = 'form-feedback error';
    return;
  }

  // Success state
  feedback.textContent = '✓ Message sent! We\'ll get back to you soon.';
  feedback.className = 'form-feedback success';

  // Clear fields
  document.getElementById('contact-name').value = '';
  document.getElementById('contact-email').value = '';
  document.getElementById('contact-message').value = '';

  setTimeout(() => { feedback.textContent = ''; }, 5000);
}

function toggleMenu() {
    const nav = document.querySelector("nav");
    nav.classList.toggle("active");
}