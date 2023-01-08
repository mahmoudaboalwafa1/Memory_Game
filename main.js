// global rules
let game = Array.from(document.querySelector(".game-memory").children);
let gameApp = document.querySelector(".game-memory");
let start = document.getElementById("start");
let name = document.getElementById("name");
let hello = document.querySelector("ul.name span");
let orderRange = [...Array(game.length).keys()];
let fail = document.getElementById("fail");
let letsGo = document.getElementById("letsGo");
let success = document.getElementById("success");
let time = document.querySelector("#time span");
let failing = document.getElementById("failing");
let gameOver = document.getElementById("gameOver");
let fast = document.getElementById("fast");

game.forEach(function (ele) {
  ele.onclick = () => {
    ele.classList.add("rotate");
    let filt = game.filter((ele) => ele.classList.contains("rotate"));
    if (filt.length === 2) {
      stopClick();
      matching(filt[0], filt[1]);
    }
  };
});

// Open Game from btn start
start.onclick = () => {
  if (name.value.length > 1) {
    hello.textContent = name.value;
  } else {
    hello.textContent = "Unkown";
  }
  start.parentElement.remove();
  letsGo.play();
  game.forEach((ele) => {
    ele.classList.add("rotate");
  });
  setTimeout(() => {
    game.forEach((ele) => {
      ele.classList.remove("rotate");
    });
  }, 2000);

  // timer
  let count = setInterval(function () {
    time.textContent -= 1;
    if (time.textContent <= 30) {
      fast.play();
    }
    if (time.textContent <= 1) {
      fast.pause();
    }
    if (time.textContent == 0) {
      clearInterval(count);
      failing.style.cssText =
        "display: block; opacity: 1;  animation: Fail 0.5s ease-in-out  ";
      setTimeout(function () {
        gameOver.play();
        setTimeout(function () {
          window.location.reload();
        }, 1500);
      }, 2000);
    }
  }, 1000);
};

// Order Elements
function shuffle(arr) {
  let random;
  let temp;
  let current = arr.length;

  while (current > 0) {
    random = Math.trunc(Math.random() * current); // Random Numbers 0 9  5 8 6 7 2 3 4 1
    current--; // current => array.length  19 18 17 16;
    temp = arr[current];
    arr[current] = arr[random];
  }
  return arr;
}

let shuffling = Array.from(shuffle(orderRange));

game.forEach(function (ele, index) {
  ele.style.order = shuffling[index];
});
// Order Elements

// stop click if blocks = 2
function stopClick() {
  gameApp.classList.add("stop-click");
  // After oneSecond return All Blocks TurnOn
  setTimeout(() => {
    gameApp.classList.remove("stop-click");
  }, 1000);
}

// check if matching
function matching(blockOne, blockTwo) {
  let tries = document.querySelector("ul.try span");
  if (blockOne.dataset.action == blockTwo.dataset.action) {
    blockOne.classList.remove("rotate");
    blockTwo.classList.remove("rotate");
    blockOne.classList.add("match");
    blockTwo.classList.add("match");
    success.play();
  } else {
    setTimeout(() => {
      blockOne.classList.remove("rotate");
      blockTwo.classList.remove("rotate");
    }, 1000);
    tries.textContent = parseInt(tries.textContent) + 1;
    fail.play();
  }
}
