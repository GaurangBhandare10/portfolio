const scroll = new LocomotiveScroll({
  el: document.querySelector("#main"),
  smooth: true,
});
const minicircle = document.querySelector("#minicircle");

// gsap is a library which is uses to give animation to the page.
// it performs same function as that of a css code and bascially it is
// used bcoz it provides short syntaxes as compared to css

function updateClock() {
  const date = new Date();

  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";

  // Update the element content
  const currentTimeElement = document.getElementById("current-time");
  currentTimeElement.textContent = `${hours}:${String(minutes).padStart(
    2,
    "0"
  )} ${ampm}`;
}

// Call the function initially
updateClock();

// Update the time every second (1000 milliseconds)
setInterval(updateClock, 1000);

function firstPageAnimation() {
  var t1 = gsap.timeline();

  t1.from("#nav", {
    y: "-10",
    opacity: 0,
    duration: 1.3,
    ease: Expo.easeInOut,
  })
    .to(".boundingelem", {
      y: "0",
      duration: 1.5,
      ease: Expo.easeInOut,
      delay: -1,
      stagger: 0.2,
    })

    .from("#herofooter", {
      y: "-10",
      opacity: 0,
      duration: 1.5,
      ease: Expo.easeInOut,
      delay: -1,
    });
}

var timeout;

function circleChaptaKaro() {
  // define default scale value
  var xscale = 1;
  var yscale = 1;

  var xprev = 0;
  var yprev = 0;

  window.addEventListener("mousemove", function (dets) {
    clearTimeout(timeout);

    xscale = gsap.utils.clamp(0.8, 1.2, dets.clientX - xprev);
    yscale = gsap.utils.clamp(0.8, 1.2, dets.clientY - yprev);

    xprev = dets.clientX;
    yprev = dets.clientY;

    circleMouseFollower(xscale, yscale);

    timeout = setTimeout(function () {
      document.querySelector(
        "#minicircle"
      ).style.transform = `translate(${dets.clientX}px, ${dets.clientY}px) scale(1, 1)`;
    }, 100);
  });
}

function circleMouseFollower(xscale, yscale) {
  window.addEventListener("mousemove", function (dets) {
    document.querySelector(
      "#minicircle"
    ).style.transform = `translate(${dets.clientX}px, ${dets.clientY}px) scale(${xscale}, ${yscale})`;
  });
}
circleChaptaKaro();
circleMouseFollower();
firstPageAnimation();

document.querySelectorAll(".elem").forEach(function (elem) {
  var rotate = 0;
  var difference = 0;
  elem.addEventListener("mouseleave", function (details) {
    gsap.to(elem.querySelector("img"), {
      opacity: 0,
      ease: Power3,
      duration: 0.5,
    });
    minicircle.style.height = "10px";
    minicircle.style.width = "10px";
    minicircle.style.padding = "0px";
    minicircle.style.paddingTop = "0px";
    minicircle.innerHTML = "";
  });

  elem.addEventListener("mousemove", function (details) {
    var diff = details.clientY - elem.getBoundingClientRect().top;
    difference = details.clientX - rotate;
    rotate = details.clientX;

    minicircle.style.height = "50px";
    minicircle.style.width = "50px";
    minicircle.innerHTML = "view";
    minicircle.style.textAlign = "center";
    minicircle.style.padding = "5px";
    minicircle.style.paddingTop = "10px";

    gsap.to(elem.querySelector("img"), {
      opacity: 1,
      ease: Power3,
      top: diff,
      left: details.clientX,
      rotate: gsap.utils.clamp(-20, 20, difference * 0.8),
    });
  });
});
