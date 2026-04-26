function scrollToSection() {
  document.getElementById("cards").scrollIntoView({
    behavior: "smooth"
  });
}

function goToPage(page) {
  window.location.href = page;
}
