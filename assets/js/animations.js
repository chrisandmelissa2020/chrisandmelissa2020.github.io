function initSmoothScroll() {
/*  $("a").on('click', function(event) {
    // Make sure this.hash has a value before overriding default behavior
    if (this.hash !== "") {
      // Prevent default anchor click behavior
      event.preventDefault();

      // Store hash
      var hash = this.hash;

      // Using jQuery's animate() method to add smooth page scroll
      // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
      $('html, body').animate({
        scrollTop: $(hash).offset().top
      }, 800, function(){
   
        // Add hash (#) to URL when done scrolling (default click behavior)
        window.location.hash = hash;
      });
    } // End if
  });*/
}


function initHeroAnimation() {
  console.log("initing hero animation");
  var masks = document.querySelectorAll("mask > path");
  masks.forEach((path) => {
    var length = path.getTotalLength();
    path.style.strokeDasharray = length;
    path.style.strokeDashoffset = length;
    path.style.stroke='white';
    path.style.animationName='brush';
  });
  var leftOrnaments = document.querySelectorAll(".sunray.left");
  var otherOrnaments = document.querySelectorAll(".sunray:not(.left)");
  var iDots = document.querySelectorAll(".i-dot");
  otherOrnaments.forEach((path) => {
    path.style.animationName='sunray-bottom-and-right';
  });
  leftOrnaments.forEach((path) => {
    path.style.animationName='sunray-left';
  });
  iDots.forEach((path) => {
   path.style.animationName='idot';
  });
}

export function setUp() {
  console.log("setting up");
  initHeroAnimation();
  initSmoothScroll();
}
