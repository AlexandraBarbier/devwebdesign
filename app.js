"use strict";

// U like my website ? See my code, friends.

// Alexandra Barbier

// Specialist : e-commerce developpement
// Global work : Front-end developpemnt - Design - UX strategy - SEO friendly
// Based in France
// Contact-me if u need, find how to on the page
// Personal website v1.00 - 2022

// Ok, stop blabla and start to code.. :)

// Variables to make life easier
const body = document.body;
const html = document.documentElement;
const arrow = document.querySelector(".b-down-arrow");
let scrollPos = 0;
let docH = Math.max(
  body.scrollHeight,
  body.offsetHeight,
  html.clientHeight,
  html.scrollHeight,
  html.offsetHeight
);

// Loading Icon
let loaderIcon = document.createElement("div");
loaderIcon.innerHTML =
  '<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" class="b-loading-icon"><circle cx="50" cy="50" r="45"/ class="b-loading-circle"></svg>';

// // Navigation Menu
// const burger = document.querySelector(".s-header-burger");
// const header = document.querySelector(".s-header");
// const content = document.querySelector(".b-content");

// burger.addEventListener("click", () => {
//   active = true;
//   header.classList.toggle("active");
//   content.classList.toggle("active");
// });

// Get parameter to see what page we're on
function getParameterByName(name, url) {
  if (!url) url = window.location.href;
  name = name.replace(/[\[\]]/g, "\\$&");
  let regex = new RegExp("[/&]" + name + "(:([^&#]*)|&|#|$)"),
    results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return "";
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}

// Check URL
function highlightactiveURL() {
  let field = location.href;
  let url = window.location.href;
  // console.log(url.indexOf('tag'));
  if (url.indexOf("work") != -1 || url.indexOf("blog") != -1) {
    if (url.indexOf("-") == -1) {
      if (url.indexOf("category") != -1) {
        let category = getParameterByName("category");
        document
          .querySelector('[data-slug="' + category + '"]')
          .classList.add("active");
      } else if (url.indexOf("tag") == 23 || url.indexOf("tag") == -1) {
        return;
      } else {
        document
          .querySelector(".j-sub-nav")
          .firstElementChild.firstElementChild.classList.add("active");
      }
    }
  }
}

// Fetch New Page
const loadPage = (url) => {
  document.querySelector("body").style.overflowY = "hidden";
  let mainContent = document.querySelector(".b-ajax-content");
  mainContent.classList.add("transition");
  header.classList.remove("active");
  content.classList.remove("active");
  window.scroll({ top: 0, left: 0, behavior: "smooth" });
  document.querySelector("body").appendChild(loaderIcon);
  document.querySelector(".b-down-arrow").style.display = "none";
  setTimeout(() => {
    fetch(url, { method: "GET" })
      .then((response) => {
        return response.text();
      })
      .then(function (response) {
        let newContent = document.createElement("div");
        newContent.innerHTML = response;
        let newTitle = newContent.querySelector("title").innerHTML;
        document.title = newTitle;
        document.querySelector("body").removeChild(loaderIcon);
        document.querySelector("body").style.overflowY = "auto";
        newContent.innerHTML =
          newContent.querySelector(".b-ajax-content").innerHTML;
        document.querySelector(".b-down-arrow").style.display = "block";
        mainContent.parentNode.replaceChild(newContent, mainContent);
        newContent.classList.add("b-ajax-content");
        highlightactiveURL();
      })
      .catch(function (err) {
        // Error
      });
  }, 1000);
};

// Back + Forward Button
window.addEventListener(
  "popstate",
  (e) => {
    loadPage(location.href);
  },
  true
);

// Disable Links + Push Url + Load Page
document.addEventListener(
  "click",
  (e) => {
    if (!e.target.matches("a")) return;
    if (
      e.target.hostname !== window.location.hostname ||
      e.target.hasAttribute("target")
    )
      return;
    e.preventDefault();
    let url = e.target || e.srcElement;
    while (url) {
      if (url instanceof HTMLAnchorElement) break;
      url = target.parentNode;
    }
    window.history.pushState(null, null, url);
    loadPage(url);
  },
  true
);

// Cursor
const cursor = document.querySelector(".b-cursor");

document.addEventListener("mousemove", (e) => {
  cursor.setAttribute(
    "style",
    "top: " + (e.pageY - 2) + "px; left: " + (e.pageX - 2) + "px;"
  );
});

document.addEventListener("click", () => {
  cursor.classList.add("expand");
  setTimeout(() => {
    cursor.classList.remove("expand");
  }, 500);
});

// Full Width Video
function fullWidthVid() {
  let iframes = document.getElementsByTagName("iframe");

  for (let i = 0; i < iframes.length; i++) {
    let iframe = iframes[i],
      players = /www.youtube.com|player.vimeo.com/;
    if (iframe.src.search(players) > 0) {
      let videoRatio = (iframe.height / iframe.width) * 100;
      iframe.style.position = "absolute";
      iframe.style.top = "0";
      iframe.style.left = "0";
      iframe.width = "100%";
      iframe.height = "100%";

      let wrap = document.createElement("div");
      wrap.className = "fluid-vids";
      wrap.style.width = "100%";
      wrap.style.position = "relative";
      wrap.style.paddingTop = videoRatio + "%";

      let iframeParent = iframe.parentNode;
      iframeParent.insertBefore(wrap, iframe);
      wrap.appendChild(iframe);
    }
  }
}

// Scrolling Arrow Function
function checkPosition() {
  let windowY = window.scrollY;
  if (windowY < scrollPos) {
    arrow.classList.add("up");
  } else {
    arrow.classList.remove("up");
  }

  scrollPos = windowY;

  if (window.innerHeight + window.scrollY >= docH) {
    arrow.classList.add("up");
  }
  if (window.scrollY == 0) {
    arrow.classList.remove("up");
  }

  arrow.addEventListener("click", (scroll) => {
    window.scroll({ top: 0, left: 0, behavior: "smooth" });
  });
}

function init() {
  highlightactiveURL();
  fullWidthVid();
  window.addEventListener("scroll", checkPosition);
}

init();

const hoverLinks = () => {
  console.log("hoverLinks");
  // CONTACT LINK HOVER EFFECT
  const spanContainers = document.querySelectorAll(
    ".contactLink div, .menuLink div, .globalLink div"
  );
  spanContainers.forEach((item) => {
    const letters = item.children[0].textContent.split("");
    item.innerHTML = "";

    letters.forEach((el, index) => {
      item.innerHTML += `<span style="transition-delay:${
        0.07 * index
      }s">${el}</span>`;
    });
  });
};

const ham = document.querySelector("#menu");

const menu = () => {
  console.log("menu open animation");
  const tl1 = gsap.timeline();
  tl1.from(".logo , .menu-open", {
    duration: 1,
    y: -100,
    opacity: 0,
    stagger: {
      amount: 0.4,
    },
  });
  tl1.to(
    ".header",
    {
      opacity: 1,
      letterSpacing: "0px",
      duration: 1.2,
    },
    "-=.7"
  );

  const tl = gsap.timeline({
    paused: "true",
  });

  tl.to(".menu-container", {
    duration: 1,
    x: 0,
  });
  tl.from(
    ".menu-close",
    {
      opacity: 0,
      rotate: "180deg",
    },
    "-=.2"
  );
  tl.from(
    ".line",
    {
      duration: 1,
      stagger: {
        amount: 0.5,
      },
      width: "0%",
    },
    "-=.2"
  );
  tl.from(
    ".menu-item-number",
    {
      duration: 1,
      stagger: {
        amount: 0.5,
      },
      y: 100,
    },
    "-=1.5"
  );
  tl.from(
    ".menu-item-name",
    {
      duration: 1,
      stagger: {
        amount: 0.5,
      },
      y: 100,
    },
    "-=1.3"
  );
  tl.from(
    ".menu-item-sub",
    {
      duration: 1,
      stagger: {
        amount: 0.5,
      },
      y: 100,
    },
    "-=1.1"
  );
  tl.from(
    ".menu-item-icon",
    {
      duration: 1,
      stagger: {
        amount: 0.5,
      },
      y: 100,
    },
    "-=1"
  );

  tl.reverse();

  ham.addEventListener("click", () => {
    tl.reversed(!tl.reversed());
  });
};
