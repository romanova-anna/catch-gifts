"use strict";

let gamer = document.querySelector('#gamer');
let point = document.querySelector("#point");
let fatality = document.querySelectorAll('#life');

let left = 37,
	right = 39,
	fatalPoint = 0,
	arrayFatalPoint = [],
	objectPoint = 0,
	arrayPoint = [];

	function playSoundFond() {
		let soundFond = document.querySelector("#fond");
		soundFond.play();
	}
	playSoundFond();

		document.addEventListener('keydown', function(e) {
			switch(e.keyCode){
				case left:
					gamer.style.left = gamer.offsetLeft - 250 + "px";
					gamer.classList.add("left");
					break;
				case right:
					gamer.style.left = gamer.offsetLeft + 250 + "px";
					gamer.classList.remove("left");
					break;
			}
		});

function createGifts() {
	let gift = document.createElement('div');
	gift.className = "gift";
	gift.style.left = random(0, document.body.offsetWidth + 20) + "px";
	document.body.appendChild(gift);
	let timerId = setInterval(function() {
		gift.style.top = (gift.offsetTop + 1) + "px";
		if(gift.offsetTop + gift.offsetHeight > 600) {
			gift.remove();
		clearInterval(timerId);
		createGifts();
		// die();
	}
	giftContact();
	}, 5);
	gift.dataset.timer = timerId;
}
createGifts();

function createBombs() {
	let bomb = document.createElement('div');
	bomb.className = "bomb";
	bomb.style.left = random(0, document.body.offsetWidth + 0) + "px";
	document.body.appendChild(bomb);
	let timerBombs = setInterval(function() {
		bomb.style.top = (bomb.offsetTop + 1) + "px";
		if(bomb.offsetTop + bomb.offsetHeight > 600) {
			bomb.remove();
		clearInterval(timerBombs);
		createBombs();
		// 
	}
		bombСontact();
	}, 4);
	bomb.dataset.timer = timerBombs;
}
createBombs();

function random(min, max) {
	let r = min + Math.random() * (max - min);
	return Math.floor(r);
}
function playSoundWin() {
	let soundWin = document.querySelector("#win");
	soundWin.play();
}

function giftContact() {
	let gift = document.querySelector('.gift');
	if (gift.offsetTop > gamer.offsetTop &&
		gift.offsetTop < gamer.offsetTop + gamer.offsetHeight &&
		gift.offsetLeft <= gamer.offsetLeft + gamer.offsetWidth &&
		gift.offsetLeft >= gamer.offsetLeft) {
			gift.className = " ";
			playSoundWin();
			gamer.classList.add("get");
			setTimeout(function(){
				gamer.classList.remove('get');
				},300);
			clearInterval(gift.dataset.timer);
			setTimeout(function() {
				gift.remove();
				createGifts();
			}, 500);
			score();
		}
}

function playSound() {
	let sound = document.querySelector("#beep");
	sound.play();
}

function bombСontact() {
	let bomb = document.querySelector('.bomb');

	if (bomb.offsetTop > gamer.offsetTop &&
		bomb.offsetTop < gamer.offsetTop + gamer.offsetHeight &&
		bomb.offsetLeft <= gamer.offsetLeft + gamer.offsetWidth &&
		bomb.offsetLeft >= gamer.offsetLeft) {
			bomb.className = " ";
			playSound();
			gamer.classList.add("getbomb");
			setTimeout(function(){
				gamer.classList.remove('getbomb');
				},5000);
			clearInterval(bomb.dataset.timer);
			setTimeout(function() {
				bomb.remove();
				createBombs();
			}, 500);
			removeFatalPoint();
		}
}

function score() {
	objectPoint++;
	arrayPoint.push(objectPoint);
	for (let i = 0; i < arrayPoint.length; i++) {
		point.textContent = `${arrayPoint[i]}`;
		}
}





function removeFatalPoint() {
	fatalPoint++;
	arrayFatalPoint.push(fatalPoint);
	for (let i = 0; i < arrayFatalPoint.length; i++) {
		console.log(arrayFatalPoint[i]);
		}
	if (arrayFatalPoint.length == 1) {
		fatality[2].remove();
	}
	if (arrayFatalPoint.length == 2) {
		fatality[1].remove();
	}
	if (arrayFatalPoint.length == 3) {
		fatality[0].remove();
		window.location.reload(true);
	}
}