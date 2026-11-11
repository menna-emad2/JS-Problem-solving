
var themeToggleButton = document.getElementById("theme-toggle-button");
var htmlElement = document.documentElement;

themeToggleButton.addEventListener("click", function () {
  htmlElement.classList.toggle("dark");

  var isDark = htmlElement.classList.contains("dark");

  themeToggleButton.setAttribute("aria-pressed", isDark);
});

var sections = document.querySelectorAll("main section[id]");
var navLinks = document.querySelectorAll('#header a[href^="#"]');

window.addEventListener("scroll", function () {
  var currentSection = "";

  sections.forEach(function (section) {
    var sectionTop = section.offsetTop - 150;

    if (window.scrollY >= sectionTop) {
      currentSection = section.getAttribute("id");
    }
  });

  navLinks.forEach(function (link) {
    link.style.color = "";

    if (link.getAttribute("href") === "#" + currentSection) {
      link.style.color = "var(--color-primary)";
    }
  });
});

var filterButtons = document.querySelectorAll(".portfolio-filter");
var portfolioItems = document.querySelectorAll(".portfolio-item");

filterButtons.forEach(function (button) {
  button.addEventListener("click", function () {

    var selectedFilter = button.getAttribute("data-filter");

    filterButtons.forEach(function (btn) {
      btn.classList.remove("active");
      btn.setAttribute("aria-pressed", "false");
    });

    button.classList.add("active");
    button.setAttribute("aria-pressed", "true");

    portfolioItems.forEach(function (item) {
      var itemCategory = item.getAttribute("data-category");

      if (selectedFilter === "all" || selectedFilter === itemCategory) {
        item.style.display = "";
      } else {
        item.style.display = "none";
      }
    });

  });
});

var carousel = document.getElementById("testimonials-carousel");
var testimonialCards = document.querySelectorAll(".testimonial-card");

var nextButton = document.getElementById("next-testimonial");
var prevButton = document.getElementById("prev-testimonial");

var indicators = document.querySelectorAll(".carousel-indicator");

var currentIndex = 0;

function getVisibleCards() {
  if (window.innerWidth >= 1024) {
    return 3;
  } else if (window.innerWidth >= 640) {
    return 2;
  } else {
    return 1;
  }
}


function updateCarousel() {

  var visibleCards = getVisibleCards();
  var maxIndex = testimonialCards.length - visibleCards;

  if (currentIndex > maxIndex) {
    currentIndex = maxIndex;
  }

  var cardWidth = testimonialCards[0].getBoundingClientRect().width;

  var direction = getComputedStyle(carousel).direction;

  var move = currentIndex * cardWidth;

  if (direction === "rtl") {
    carousel.style.transform = "translateX(" + move + "px)";
  } else {
    carousel.style.transform = "translateX(-" + move + "px)";
  }

 
  indicators.forEach(function (indicator, index) {

    if (index === currentIndex) {
      indicator.style.backgroundColor = "#a855f7";
      indicator.style.transform = "scale(1.3)";
    } else {
      indicator.style.backgroundColor = "#475569";
      indicator.style.transform = "scale(1)";
    }

  });

}

nextButton.addEventListener("click", function () {

  var maxIndex = testimonialCards.length - getVisibleCards();

  if (currentIndex < maxIndex) {
    currentIndex++;
  } else {
    currentIndex = 0;
  }

  updateCarousel();

});


prevButton.addEventListener("click", function () {

  var maxIndex = testimonialCards.length - getVisibleCards();

  if (currentIndex > 0) {
    currentIndex--;
  } else {
    currentIndex = maxIndex;
  }

  updateCarousel();

});
indicators.forEach(function (indicator, index) {

  indicator.addEventListener("click", function () {
    currentIndex = index;
    updateCarousel();
  });

});

window.addEventListener("resize", updateCarousel);

updateCarousel();

var settingsToggle = document.getElementById("settings-toggle");
var settingsSidebar = document.getElementById("settings-sidebar");
var closeSettings = document.getElementById("close-settings");

function openSettings() {
  settingsSidebar.classList.remove("translate-x-full");
  settingsToggle.setAttribute("aria-expanded", "true");
  settingsSidebar.setAttribute("aria-hidden", "false");
}

function hideSettings() {
  settingsSidebar.classList.add("translate-x-full");
  settingsToggle.setAttribute("aria-expanded", "false");
  settingsSidebar.setAttribute("aria-hidden", "true");
}

settingsToggle.addEventListener("click", openSettings);

closeSettings.addEventListener("click", hideSettings);

var colorsGrid = document.getElementById("theme-colors-grid");

var themeColors = [
  "#6366f1",
  "#8b5cf6",
  "#ec4899",
  "#0ea5e9",
  "#10b981",
  "#f97316",
  "#ef4444",
  "#14b8a6"
];

themeColors.forEach(function (color) {
  var colorButton = document.createElement("button");

  colorButton.type = "button";
  colorButton.style.backgroundColor = color;
  colorButton.style.width = "40px";
  colorButton.style.height = "40px";
  colorButton.style.borderRadius = "50%";
  colorButton.style.cursor = "pointer";
  colorButton.style.border = "3px solid white";
  colorButton.style.outline = "2px solid " + color;

  colorButton.setAttribute("aria-label", "اختيار اللون " + color);

  colorButton.addEventListener("click", function () {
    document.documentElement.style.setProperty("--color-primary", color);
  });

  colorsGrid.appendChild(colorButton);
});

var fontOptions = document.querySelectorAll(".font-option");

fontOptions.forEach(function (fontButton) {
  fontButton.addEventListener("click", function () {

    var selectedFont = fontButton.getAttribute("data-font");

    document.body.style.fontFamily = selectedFont + ", sans-serif";

    fontOptions.forEach(function (font) {
      font.classList.remove("active");
      font.setAttribute("aria-checked", "false");
    });

    fontButton.classList.add("active");
    fontButton.setAttribute("aria-checked", "true");

  });
});

var resetSettings = document.getElementById("reset-settings");

resetSettings.addEventListener("click", function () {

  document.documentElement.style.removeProperty("--color-primary");

  document.body.style.fontFamily = "";

  fontOptions.forEach(function (font) {
    font.classList.remove("active");
    font.setAttribute("aria-checked", "false");
  });

  var defaultFont = document.querySelector('[data-font="tajawal"]');

  if (defaultFont) {
    defaultFont.classList.add("active");
    defaultFont.setAttribute("aria-checked", "true");
  }

});

var scrollToTopButton = document.getElementById("scroll-to-top");

window.addEventListener("scroll", function () {

  if (window.scrollY > 300) {
    scrollToTopButton.classList.remove("opacity-0", "invisible");
    scrollToTopButton.classList.add("opacity-100", "visible");
  } else {
    scrollToTopButton.classList.add("opacity-0", "invisible");
    scrollToTopButton.classList.remove("opacity-100", "visible");
  }

});

scrollToTopButton.addEventListener("click", function () {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});
