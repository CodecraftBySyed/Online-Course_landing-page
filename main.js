AOS.init({
  duration: 900,
  once: true,
  offset: 60,
  easing: "ease-in-out",
});
// Dark mode toggle
const darkToggle = document.getElementById("dark-toggle");
const html = document.documentElement;
if (
  localStorage.getItem("theme") === "dark" ||
  (!("theme" in localStorage) &&
    window.matchMedia("(prefers-color-scheme: dark)").matches)
) {
  html.classList.add("dark");
}
if (darkToggle) {
  darkToggle.addEventListener("click", () => {
    html.classList.toggle("dark");
    localStorage.setItem(
      "theme",
      html.classList.contains("dark") ? "dark" : "light"
    );
  });
}

// Countdown Timer (set your webinar date/time here)
const webinarDate = new Date("2025-06-15T18:00:00"); // Change to your event date/time
function updateCountdown() {
  const now = new Date();
  const diff = webinarDate - now;
  if (diff <= 0) {
    document.getElementById("countdown").innerHTML =
      '<span class="text-green-600">Webinar Started!</span>';
    return;
  }
  const days = String(Math.floor(diff / (1000 * 60 * 60 * 24))).padStart(
    2,
    "0"
  );
  const hours = String(Math.floor((diff / (1000 * 60 * 60)) % 24)).padStart(
    2,
    "0"
  );
  const minutes = String(Math.floor((diff / (1000 * 60)) % 60)).padStart(
    2,
    "0"
  );
  const seconds = String(Math.floor((diff / 1000) % 60)).padStart(2, "0");
  document.getElementById("days").textContent = days;
  document.getElementById("hours").textContent = hours;
  document.getElementById("minutes").textContent = minutes;
  document.getElementById("seconds").textContent = seconds;
}
updateCountdown();
setInterval(updateCountdown, 1000);

// Accessible Signup Form Validation + Spinner + Animated Success
const form = document.getElementById("signup-form");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const nameError = document.getElementById("name-error");
const emailError = document.getElementById("email-error");
const formSuccess = document.getElementById("form-success");
const submitBtn = document.getElementById("submit-btn");
const submitText = document.getElementById("submit-text");
const spinner = document.getElementById("spinner");

form.addEventListener("submit", function (e) {
  let valid = true;
  nameError.classList.add("hidden");
  emailError.classList.add("hidden");
  nameInput.classList.remove("border-red-500");
  emailInput.classList.remove("border-red-500");

  if (!nameInput.value.trim()) {
    nameError.classList.remove("hidden");
    nameInput.classList.add("border-red-500");
    valid = false;
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value.trim())) {
    emailError.classList.remove("hidden");
    emailInput.classList.add("border-red-500");
    valid = false;
  }
  if (!valid) {
    e.preventDefault();
    return;
  }
  // Show spinner and disable button
  submitBtn.disabled = true;
  spinner.classList.remove("hidden");
  submitText.classList.add("opacity-50");

  // For demo: simulate async submit (remove if using real backend)
  e.preventDefault();
  setTimeout(() => {
    spinner.classList.add("hidden");
    submitText.classList.remove("opacity-50");
    submitBtn.disabled = false;
    formSuccess.classList.remove("hidden");
    setTimeout(() => {
      formSuccess.classList.add("opacity-100");
      formSuccess.classList.remove("opacity-0");
    }, 10);
    setTimeout(() => {
      formSuccess.classList.add("opacity-0");
      formSuccess.classList.remove("opacity-100");
      setTimeout(() => formSuccess.classList.add("hidden"), 700);
    }, 3500);
    form.reset();
  }, 1500);
});

// Mobile menu functionality
const mobileMenuBtn = document.getElementById("mobile-menu-btn");
const mobileMenu = document.getElementById("mobile-menu");
const closeMobileMenuBtn = document.getElementById("close-mobile-menu");

if (mobileMenuBtn && mobileMenu && closeMobileMenuBtn) {
  mobileMenuBtn.addEventListener("click", () => {
    mobileMenu.classList.remove("hidden");
  });
  closeMobileMenuBtn.addEventListener("click", () => {
    mobileMenu.classList.add("hidden");
  });
  // Close menu when clicking outside the menu panel
  mobileMenu.addEventListener("click", (e) => {
    if (e.target === mobileMenu) {
      mobileMenu.classList.add("hidden");
    }
  });
  // Close menu when clicking any link inside the mobile menu
  mobileMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      mobileMenu.classList.add("hidden");
    });
  });
}

// Smooth scroll for anchor links
document.addEventListener("DOMContentLoaded", function () {
  new Swiper(".testimonials-swiper", {
    loop: true,
    autoplay: { delay: 3500, disableOnInteraction: false },
    pagination: { el: ".swiper-pagination", clickable: true },
    slidesPerView: 1,
    spaceBetween: 24,
    breakpoints: {
      768: { slidesPerView: 2 },
    },
  });
});

// Typing animation for hero headline
const messages = [
  "Master Modern Web Development",
  "Build Real-World Projects Fast",
  "Learn React, Tailwind & More",
  "Get Certified by Industry Experts",
];
const typedText = document.getElementById("typed-text");
const cursor = document.getElementById("typed-cursor");
let msgIdx = 0,
  charIdx = 0,
  typing = true;
function typeLoop() {
  if (!typedText) return;
  const current = messages[msgIdx];
  if (typing) {
    if (charIdx < current.length) {
      typedText.textContent += current[charIdx++];
      setTimeout(typeLoop, 55 + Math.random() * 40);
    } else {
      typing = false;
      setTimeout(typeLoop, 1200);
    }
  } else {
    if (charIdx > 0) {
      typedText.textContent = current.slice(0, --charIdx);
      setTimeout(typeLoop, 30 + Math.random() * 30);
    } else {
      typing = true;
      msgIdx = (msgIdx + 1) % messages.length;
      setTimeout(typeLoop, 400);
    }
  }
}
typeLoop();

// Modal logic for course details
const courseDetails = {
  js: {
    title: "JavaScript Essentials",
    image: "asset/webp/JavaScript_Essentials.webp",
    desc: `Master the fundamentals of JavaScript with hands-on projects and real-world examples. Learn variables, functions, DOM, ES6+, and more. Perfect for beginners!
    
✔ 8+ real projects
✔ Live mentor support
✔ Certificate included`,
    level: "Beginner",
    duration: "4 Weeks",
    price: "$49",
  },
  react: {
    title: "React for Beginners",
    image: "asset/webp/React-for-Beginners.webp",
    desc: `Build interactive UIs and single-page apps using React and modern JavaScript. Covers hooks, state, props, and deployment.
    
✔ 6+ React projects
✔ Live Q&A
✔ Certificate included`,
    level: "Intermediate",
    duration: "6 Weeks",
    price: "$79",
  },
  tailwind: {
    title: "Tailwind CSS Mastery",
    image: "asset/webp/Tailwind-CSS-Mastery.webp",
    desc: `Design beautiful, responsive websites with utility-first Tailwind CSS. Learn custom themes, animations, and best practices.
    
✔ 5+ UI projects
✔ Advanced tips
✔ Certificate included`,
    level: "All Levels",
    duration: "3 Weeks",
    price: "$39",
  },
  fullstack: {
    title: "Fullstack Bootcamp",
    image: "asset/webp/Fullstack-Bootcamp.webp",
    desc: `Become a fullstack developer with our comprehensive bootcamp covering frontend and backend. Includes Node.js, APIs, databases, and deployment.
    
✔ 10+ fullstack projects
✔ Career guidance
✔ Certificate included`,
    level: "Advanced",
    duration: "8 Weeks",
    price: "$129",
  },
};

function openModal(courseKey) {
  const modal = document.getElementById("course-modal");
  const content = document.getElementById("modal-content");
  const data = courseDetails[courseKey];
  if (!data) return;
  content.innerHTML = `
    <img src="${data.image}" alt="${data.title}" class="w-full h-48 object-cover rounded-xl mb-4 shadow-md" />
    <h3 class="text-2xl font-bold mb-2 text-primary">${data.title}</h3>
    <p class="text-gray-700 dark:text-gray-200 whitespace-pre-line mb-4">${data.desc}</p>
    <div class="flex flex-wrap gap-3 mb-4">
      <span class="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 rounded text-sm font-semibold">${data.level}</span>
      <span class="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded text-sm font-semibold">${data.duration}</span>
      <span class="px-3 py-1 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 rounded text-sm font-semibold">${data.price}</span>
    </div>
    <button id="enroll-btn" class="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-500 text-white font-bold rounded-xl shadow-lg hover:scale-105 transition-transform text-lg tracking-wide mt-2">Enroll Now</button>
  `;
  modal.classList.remove("hidden");
  setTimeout(() => modal.classList.add("backdrop-blur-sm"), 10);
}

function closeModal() {
  const modal = document.getElementById("course-modal");
  modal.classList.add("hidden");
  modal.classList.remove("backdrop-blur-sm");
}

document.querySelectorAll(".view-details-btn").forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    openModal(btn.getAttribute("data-course"));
  });
});
const closeModalBtn = document.getElementById("close-modal");
const courseModal = document.getElementById("course-modal");
if (closeModalBtn) {
  closeModalBtn.addEventListener("click", closeModal);
}
if (courseModal) {
  courseModal.addEventListener("click", (e) => {
    if (e.target === e.currentTarget) closeModal();
  });
}
// Optional: handle enroll button
// document.getElementById('modal-content').addEventListener('click', e => {
//   if (e.target.id === 'enroll-btn') {
//     // Add enroll logic here
//     closeModal();
//   }
// });

// --- Intro Video Modal Logic (Local Video) ---
const watchIntroBtn = document.getElementById("watch-intro-btn");
const introModal = document.getElementById("intro-video-modal");
const closeIntroModal = document.getElementById("close-intro-modal");
const introVideo = document.getElementById("intro-video");
const playPauseBtn = document.getElementById("play-pause-btn");
const playIcon = document.getElementById("play-icon");
const pauseIcon = document.getElementById("pause-icon");
const muteBtn = document.getElementById("mute-btn");
const volumeIcon = document.getElementById("volume-icon");
const mutedIcon = document.getElementById("muted-icon");
const seekBar = document.getElementById("seek-bar");
const currentTimeEl = document.getElementById("current-time");
const durationEl = document.getElementById("duration");

function formatTime(time) {
  const m = Math.floor(time / 60);
  const s = Math.floor(time % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

function updatePlayPause() {
  if (introVideo.paused) {
    playIcon.classList.remove("hidden");
    pauseIcon.classList.add("hidden");
  } else {
    playIcon.classList.add("hidden");
    pauseIcon.classList.remove("hidden");
  }
}

function updateMute() {
  if (introVideo.muted || introVideo.volume === 0) {
    volumeIcon.classList.add("hidden");
    mutedIcon.classList.remove("hidden");
  } else {
    volumeIcon.classList.remove("hidden");
    mutedIcon.classList.add("hidden");
  }
}

function updateTime() {
  if (currentTimeEl)
    currentTimeEl.textContent = formatTime(introVideo.currentTime);
  if (durationEl) durationEl.textContent = formatTime(introVideo.duration || 0);
  if (seekBar) seekBar.value = introVideo.currentTime;
}

function updateSeekBar() {
  if (seekBar) {
    seekBar.max = introVideo.duration || 0;
    seekBar.value = introVideo.currentTime;
  }
}

if (introVideo) {
  introVideo.addEventListener("play", updatePlayPause);
  introVideo.addEventListener("pause", updatePlayPause);
  introVideo.addEventListener("volumechange", updateMute);
  introVideo.addEventListener("timeupdate", () => {
    updateTime();
    updateSeekBar();
  });
  introVideo.addEventListener("loadedmetadata", () => {
    updateTime();
    updateSeekBar();
  });
}
if (playPauseBtn) {
  playPauseBtn.addEventListener("click", () => {
    if (introVideo.paused) {
      introVideo.play();
    } else {
      introVideo.pause();
    }
  });
}
if (muteBtn) {
  muteBtn.addEventListener("click", () => {
    introVideo.muted = !introVideo.muted;
    updateMute();
  });
}
if (seekBar) {
  seekBar.addEventListener("input", (e) => {
    introVideo.currentTime = parseFloat(e.target.value);
    updateTime();
  });
}

function openIntroModal() {
  if (introModal) {
    introModal.classList.remove("hidden");
    setTimeout(() => introModal.classList.add("backdrop-blur-sm"), 10);
    if (introVideo) {
      introVideo.currentTime = 0;
      setTimeout(() => {
        introVideo.play();
        updatePlayPause();
        updateMute();
        updateTime();
        updateSeekBar();
      }, 100);
    }
  }
}

function closeIntroVideoModal() {
  if (introModal) {
    introModal.classList.add("hidden");
    introModal.classList.remove("backdrop-blur-sm");
  }
  if (introVideo) {
    introVideo.pause();
    introVideo.currentTime = 0;
    updatePlayPause();
    updateTime();
    updateSeekBar();
  }
}

if (watchIntroBtn && introModal && closeIntroModal) {
  watchIntroBtn.addEventListener("click", openIntroModal);
  closeIntroModal.addEventListener("click", closeIntroVideoModal);
  introModal.addEventListener("click", (e) => {
    if (e.target === introModal) closeIntroVideoModal();
  });
}

// Redirect to loading screen
// window.location.href = "loading-screen.html";
// fetch("loading-screen.html");
// <script src="loading-screen.html"></script>
