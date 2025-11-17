// Wait for the entire page to load before running any scripts
document.addEventListener("DOMContentLoaded", function () {
  /********************************************************
    Mobile Navigation Toggle
  *********************************************************/
  const navToggle = document.querySelector(".nav-toggle");
  const navMenu = document.querySelector(".nav-menu");
  const navLinks = document.querySelectorAll(".nav-menu a");

  // === ADD THIS LINE TO SELECT THE OVERLAY ===
  const overlay = document.querySelector(".overlay");

  if (navToggle && navMenu) {
    navToggle.addEventListener("click", function () {
      navToggle.classList.toggle("active");
      navMenu.classList.toggle("active");
      // === ADD THIS LINE TO TOGGLE THE OVERLAY ===
      overlay.classList.toggle("active");
    });
  }

  function closeMenu() {
    navMenu.classList.remove("active");
    navToggle.classList.remove("active");
    // === ADD THIS LINE TO CLOSE THE OVERLAY ===
    overlay.classList.remove("active");
  }

  navLinks.forEach(function (link) {
    link.addEventListener("click", closeMenu);
  });

  /********************************************************
    Carousel Initializations
  *********************************************************/

  // --- 1. Initialize the MEDIA Carousel ---
  // We check if an element with this class exists before trying to initialize it
  if (document.querySelector(".media-carousel")) {
    const mediaSwiper = new Swiper(".media-carousel", {
      loop: true,
      grabCursor: true,
      autoplay: {
        delay: 3500,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      },
      slidesPerView: 1,
      spaceBetween: 30,
      breakpoints: {
        // For screens 800px wide or larger, show 2 slides
        768: { slidesPerView: 2, spaceBetween: 30 },
        // For screens 1024px wide or larger, show 3 slides
        1024: { slidesPerView: 3, spaceBetween: 40 },
      },
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
    });
  }

  // --- 2. Initialize the HERO Album Carousel ---
  // We check for this new carousel separately
  if (document.querySelector(".hero-album-carousel")) {
    const heroAlbumSwiper = new Swiper(".hero-album-carousel", {
      // Set the direction to vertical
      direction: "vertical",

      // Enable continuous looping
      loop: true,

      // Since this is decorative, we disable user interaction like dragging
      allowTouchMove: false,

      // Configure autoplay
      autoplay: {
        delay: 2500, // A slightly faster scroll feels good for vertical
        disableOnInteraction: false,
      },

      // We only want to show one album at a time
      slidesPerView: 1,
    });
  }

  // === RESPONSIVE TABLE SCRIPT (Required for Phone View) ===
  function makeTablesResponsive() {
    const tables = document.querySelectorAll(".tour-table-container table");
    tables.forEach((table) => {
      const headers = [];
      table.querySelectorAll("thead th").forEach((header) => {
        headers.push(header.textContent);
      });
      table.querySelectorAll("tbody tr").forEach((row) => {
        row.querySelectorAll("td").forEach((cell, index) => {
          cell.setAttribute("data-label", headers[index]);
        });
      });
    });
  }
  makeTablesResponsive();

  // You can add more initializations for other scripts or carousels here in the future!
});

// --- 3. Initialize Spinning CD Rotator ---
document.addEventListener("DOMContentLoaded", function () {
  const cdElement = document.getElementById("spinning-cd");

  // --- IMPORTANT: ADD YOUR IMAGE PATHS HERE ---
  const images = [
    "assets/image/PleaseLang.jpg", // Example: Your band logo
    "assets/image/puzzled.jpg",
    "assets/image/AyokoNa.jpg",
    "assets/image/BreakNaTayo.jpg",
  ];

  // Make sure we don't run this code if the CD element doesn't exist
  if (cdElement && images.length > 0) {
    let currentImageIndex = 0;

    // Function to change the background image
    function changeImage() {
      // Move to the next image in the array
      currentImageIndex = (currentImageIndex + 1) % images.length;

      // Update the background image of the CD
      cdElement.style.backgroundImage = `url('${images[currentImageIndex]}')`;
    }

    // Set the very first image immediately on load
    cdElement.style.backgroundImage = `url('${images[0]}')`;

    // Set an interval to call the changeImage function every 4 seconds
    // 4000 milliseconds = 4 seconds. You can change this value.
    setInterval(changeImage, 10000);
  }
});
