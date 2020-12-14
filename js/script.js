"use strict";

// первая страничка: создание заголовка, input, кнопки, массива с именем, 
// проверка на имя, подключение body
	let title = document.createElement('h2');
		title.className = "title";
		document.body.appendChild(title);
		title.textContent = 'Ваше Имя:';

	let entryPoint = document.createElement('input');
		entryPoint.type = 'text';
		entryPoint.size = '50';
		entryPoint.className = 'control';
		document.body.appendChild(entryPoint);

	let buttonStart = document.createElement('button');
		buttonStart.className = "buttonStart";
		document.body.appendChild(buttonStart);
		buttonStart.textContent = "Далее";
	
	let titleCatch = document.querySelector('.titleCatch');
		
	let notesUserName = [];
	
		buttonStart.addEventListener('click', (e) => {
			e.preventDefault();
			const fullName = entryPoint.value;
			notesUserName.push(fullName);
			function nameСheck() {
				if (entryPoint.value == "") {
					alert("Введите Ваше имя!!!!!!");
				}
				else {
				choicePerson();
				}
			}
			nameСheck();
			
			});	
	
		
	let body = document.querySelector('body');

		
//вторая страничка: выбор персонажа
function choicePerson() {
	title.remove();
	entryPoint.remove();
	buttonStart.remove();
	body.classList.add('back2');

	let timeOfDay;
	const myDate = new Date();
	let hour = myDate.getHours();
		
		if (hour < 12) {
			timeOfDay = "Доброе утро";
		} else if (hour < 18) {
			timeOfDay = "Добрый день";
		} else {
			timeOfDay = "Добрый вечер";
		}
	let welcome = document.createElement('h2');
		welcome.className = "welcome";
		document.body.appendChild(welcome);
		welcome.textContent = `${timeOfDay}, ${notesUserName[0]}!`;	
	
	let choiceText = document.createElement('h2');
		choiceText.className = "choiceText";
		document.body.appendChild(choiceText);
		choiceText.textContent = `Правила игры: Поймай подарки за 30 секунд, не потеряв 3 жизни.`;
	
	
	let buttonStartGame = document.createElement('button');
		buttonStartGame.className = "buttonStartGame";
		document.body.appendChild(buttonStartGame);
		buttonStartGame.textContent = "Играть!";


	function pressBtn() {
		buttonStartGame.addEventListener('click', (e) => {
			e.preventDefault();
			buttonStartGame.remove();
			choiceText.remove();
			welcome.remove();
			body.classList.add('back3');
			playSoundFond();
			start();
			});
		}
	pressBtn();
}

function playSoundFond() {
	let soundFond = document.querySelector("#fond");
	soundFond.play();
}

//функция начала игры
function start() {
	let gamer = document.createElement('div');
	gamer.setAttribute('id','gamer');
	document.body.appendChild(gamer);

	let point = document.createElement('div');
	point.className = "point";
	document.body.appendChild(point);
	
	let fatality = document.querySelectorAll('#life');
	let life = document.querySelector('.life');
	function addClassLife() {
		life.classList.add("doublelife");
	}
	addClassLife();

	titleCatch.remove();

	let timerShow = document.createElement('div');
		timerShow.className = "timer";
		document.body.appendChild(timerShow);
	
	let left = 37,
		right = 39,
		fatalPoint = 0,
		arrayFatalPoint = [],
		objectPoint = 0,
		arrayPoint = [];
			
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

//функиция создания подарков 
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
				playSoundWin(); //играет музыка победы
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
					},500);
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
	
	function timer() {
        let i = 60 * 0.5,
        timerId = setInterval(function() {
            i--;
            timerShow.innerHTML = Math.floor(i / 60) + '.' + Math.floor(i % 60 / 10) + i % 60 % 10;
            if (i < 1) {
			clearInterval(timerId);
			win();
		    }
		}, 1000);
		
	}
	timer();



	function pickUpGamer() {
			let ambulance = document.createElement('div');
			ambulance.className = "ambulance";
			document.body.appendChild(ambulance);
			ambulance.style.top = "350px";
			ambulance.style.left = "0px";
			
			let timerAmbulance = setInterval(function() {
				ambulance.style.left = (ambulance.offsetLeft + 1) + "px";
				ambulanceСontact();
			}, 8);
			ambulance.dataset.timer = timerAmbulance;
		}

	function ambulanceСontact() {
		let ambulance = document.querySelector('.ambulance');
	
		if (ambulance.offsetLeft <= gamer.offsetLeft + gamer.offsetWidth &&
			ambulance.offsetLeft >= gamer.offsetLeft) {
				gamer.className = " ";
				gamer.remove();
			}
	}
	function playSoundWinGame() {
		let winGame = document.querySelector("#wingame");
		winGame.play();
	}

	function win() {
		let gameOverTitle = document.createElement('h2');
		gameOverTitle.className = "gameOverTitle";
		document.body.appendChild(gameOverTitle);
		gameOverTitle.textContent = 'WIN';

		let result = document.createElement('h2');
		result.className = "result";
		document.body.appendChild(result);
		result.textContent = `${notesUserName[0]}, Ваш результат: ${arrayPoint.length}`;

		let buttonRestart = document.createElement('button');
		buttonRestart.className = "buttonRestart";
		document.body.appendChild(buttonRestart);
		buttonRestart.textContent = "Играть еще";
		playSoundWinGame();
		let soundFondDelete = document.querySelector("#fond");
			soundFondDelete.remove();
		point.remove();

		buttonRestart.addEventListener('click', (e) => {
			window.location.reload(true);
	});

		}

	function gameOver() {
		let gameOverTitle = document.createElement('h2');
		gameOverTitle.className = "gameOverTitle";
		document.body.appendChild(gameOverTitle);
		gameOverTitle.textContent = 'Game Over';

		let result = document.createElement('h2');
		result.className = "result";
		document.body.appendChild(result);
		result.textContent = `${notesUserName[0]}, Ваш результат: ${arrayPoint.length}`;

		let buttonRestart = document.createElement('button');
		buttonRestart.className = "buttonRestart";
		document.body.appendChild(buttonRestart);
		buttonRestart.textContent = "Начать заново";

		buttonRestart.addEventListener('click', (e) => {
			window.location.reload(true);
	});
}

function playSoundDie() {
	let soundDie = document.querySelector("#die");
	soundDie.play();
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
			gamer.classList.add("getbomb");
			let soundFondDelete = document.querySelector("#fond");
			soundFondDelete.remove();
			playSoundDie();
			gameOver();
			point.remove();
			timerShow.remove();
			document.addEventListener('keydown', function(e) {
				switch(e.keyCode){
					case left:
						gamer.style.left = gamer.offsetLeft - 0 + "px";
						gamer.classList.add("getbomb");
						break;
					case right:
						gamer.style.left = gamer.offsetLeft + 0 + "px";
						gamer.classList.add("getbomb");
						break;
				}
			});
			pickUpGamer();
		}
	}
}