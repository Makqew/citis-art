var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

var circles = [
  {
    x: 0,   // Initial x-coordinate
    y: -200,                 // Initial y-coordinate
    radius: 200,
    velocityX: 2,          // Initial horizontal velocity
    velocityY: 0,          // Initial vertical velocity
    acceleration: 0.5,      // Gravitational acceleration
    friction: 0.25,
    icon: new Image(),
    link: "https://www.instagram.com/citisartstudio/"
  },
  {
    x: canvas.width / 2 + 500,  // Initial x-coordinate
    y: -200,                    // Initial y-coordinate
    radius: 200,
    velocityX: -1,             // Initial horizontal velocity
    velocityY: 0,              // Initial vertical velocity
    acceleration: 0.5,         // Gravitational acceleration
    friction: 0.25,
    icon: new Image(),
    link: "mailto:info@citiss.art" 
  }
];

circles[0].icon.src = "images/instagram_fill_icon.svg";  // Path to the first icon image
circles[1].icon.src = "images/mail_fill_icon.svg"  ;  // Path to the second icon image
canvas.width = window.innerWidth - 96;
canvas.height = window.innerHeight;

function resizeCanvas() { 
  canvas.width = window.innerWidth - 96;
  canvas.height = window.innerHeight;
  console.log("width:" + canvas.width + ", " + "height" + canvas.height)
  circles.forEach(function(circle) {
    circle.radius = circle.radius / canvas.width * window.innerWidth;
  });
};
resizeCanvas();

// function drawText() {
//     var text = "Мы готовы к сотрудничеству с заказчиками разного уровня и будем рады реализовать новые проекты. Свяжитесь с нами и мы обсудим ваш проект!";
//   var fontSize = 20;
//   var fontFamily = "Arial";
  
//   ctx.font = fontSize + "px " + fontFamily;
//   ctx.fillStyle = "black";

//   var textWidth = ctx.measureText(text).width;
//   var x = (canvas.width - textWidth) / 2; // Center the text horizontally
//   var y = 40; // Vertical position of the text

//   ctx.fillText(text, x, y);
//   }

function drawCircle(circle) {
  ctx.beginPath();
  ctx.arc(circle.x, circle.y, circle.radius, 0, Math.PI * 2);
  ctx.fillStyle = "#C9F2BB";
  ctx.fill();
  ctx.closePath();
  

  ctx.drawImage(
    circle.icon,
    circle.x - circle.radius/1.3,
    circle.y - circle.radius/1.3,
    circle.radius * 1.5,
    circle.radius * 1.5
  );

  // canvas.addEventListener("mouseenter", function(event) {
  //   circle.color = "red";  // Change the circle's color on hover
  //   drawCircle(circle);    // Redraw the circle with the new color
  // });

  // canvas.addEventListener("mouseleave", function(event) {
  //   circle.color = "blue";  // Restore the circle's color when not hovering
  //   drawCircle(circle);    // Redraw the circle with the original color
  // });
  //очень многго ресурсов забирает?
  canvas.addEventListener("click", function(event) {
    var rect = canvas.getBoundingClientRect();
    var clickX = event.clientX - rect.left;
    var clickY = event.clientY - rect.top;

    var distance = Math.sqrt(
      Math.pow(clickX - circle.x, 2) + Math.pow(clickY - circle.y, 2)
    );

    if (distance <= circle.radius) {
      // Redirect to the circle's link
      window.location.href = circle.link;
    //   drawCircle(circle);
    }
  });
  
  
}

function checkCollision(circleA, circleB) {
  var dx = circleA.x - circleB.x;
  var dy = circleA.y - circleB.y;
  var distance = Math.sqrt(dx * dx + dy * dy);

  if (distance < circleA.radius + circleB.radius) {
    // Collision detected
    // You can handle the collision here, e.g., by changing velocities or positions of the circles
    // For simplicity, let's reverse the velocities of the circles
    circleA.velocityX *= -1;
    circleA.velocityY *= -1;
    circleB.velocityX *= -1;
    circleB.velocityY *= -1;
  }
}

function updateCircles(time) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (var i = 0; i < circles.length; i++) {
    var circle = circles[i];

    circle.velocityY += circle.acceleration;  // Update vertical velocity
    circle.y += circle.velocityY;             // Update y-coordinate
    
    circle.x += circle.velocityX/circle.friction;             // Update x-coordinate
    // Check if the circle hits the bottom of the canvas
    if (circle.y + circle.radius > canvas.height) {
      circle.y = canvas.height - circle.radius;  // Reset y-coordinate
      circle.velocityY *= -0.8;                  // Reverse vertical velocity with damping
      circle.friction += 0.1;
    }

    // Check if the circle hits the sides of the canvas
    if (circle.x + circle.radius > canvas.width) {
      circle.x = canvas.width - circle.radius;  // Adjust x-coordinate to stay within the canvas
      circle.velocityX *= -0.8;                    // Reverse horizontal velocity
      circle.friction += 0.1;
      
    } else if (circle.x - circle.radius < 0) {
      circle.x = circle.radius;                 // Adjust x-coordinate to stay within the canvas
      circle.velocityX *= -1;                    // Reverse horizontal velocity
      circle.friction += 0.1;
    }
    // Check for collisions with other circles
    for (var j = i + 1; j < circles.length; j++) {
      var otherCircle = circles[j];
      checkCollision(circle, otherCircle);
    }
    drawCircle(circle);
  }
  // drawText();

  if(time < 15000){
    requestAnimationFrame(updateCircles);
  }else{
    console.log(Math.abs(circle.velocityY))
    console.log("Y: " + circle.y)
    console.log("Height: " + canvas.height)
    console.log("STOP TIME! - " + time)
  }
}

// window.addEventListener("resize", resizeCanvas);




// Set up the options for the Intersection Observer
var options = {
  root: null,       // Use the viewport as the root element
  rootMargin: "0px", // No margin
  threshold: 0.5,    // Trigger when 50% of the element is visible
};

// Create a new Intersection Observer instance
var observer = new IntersectionObserver(function(entries, observer) {
  entries.forEach(function(entry) {
    if (entry.isIntersecting) {
      let t = performance.now()
      console.log(t)
      updateCircles(t);
      // Start the animation when the element becomes visible
      observer.unobserve(entry.target); // Stop observing once animation starts
    }
  });
}, options);

// Start observing the target element
observer.observe(canvas);