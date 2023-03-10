const key1 = document.querySelector('.key1')
const key2 = document.querySelector('.key2')
const key3 = document.querySelector('.key3')
const key4 = document.querySelector('.key4')
const key5 = document.querySelector('.key5')
const key6 = document.querySelector('.key6')
const key7 = document.querySelector('.key7')
const key8 = document.querySelector('.key8')
const key9 = document.querySelector('.key9')
const keys = document.querySelectorAll('.key')
const dayBtn = document.querySelector('.day-btn')
const nightBtn = document.querySelector('.night-btn')
const start = document.querySelector('.start')
const timer = document.querySelector('.timer')
const points = document.querySelector('#point')
let winKey = document.querySelector('.key--win')
let lostKey = document.querySelectorAll('.key--lost')
let actualPoint = 0

const soundPeak = new Audio('../sounds/peak.mp3')
const soundStart = new Audio('../sounds/start.mp3')
const soundEnd = new Audio('../sounds/end.mp3')
const soundPick = new Audio('../sounds/pick.mp3')
const soundMole = new Audio('../sounds/mole.mp3')

const record = document.querySelector('#record')
let yourRecord = 0

const lottery = () => {
	//loteria
	keys[Math.floor(Math.random() * 8)].classList.add('key--active')
}

// funkcja odliczania czasu
const countdown = () => {
	timer.innerHTML = gameCountdown
	const countdown2 = setInterval(function () {
		if (gameCountdown > 0) {
			gameCountdown -= 1
			timer.innerHTML = gameCountdown
		} else {
			let activeKey = document.querySelector('.key--active')
			activeKey.classList.remove('key--active') //usuwamy aktywna klase
			clearInterval(countdown2) //usuwamy interwal
			const lastPoint = document.querySelector('#lastPoint')
			let yourLastPoint = actualPoint
			lastPoint.innerHTML = yourLastPoint

			recordSave()

			actualPoint = 0
			points.innerHTML = actualPoint
			startBtn() //zaczynamy od nowa
		}
	}, 1000)
}

//usunięcie zaznaczonych pól po prawidłowym oznaczeniu
const removeWin = () => {
	winKey.classList.remove('key--win')
	for (let z = 0; z < lostKey.length; z++) {
		lostKey[z].classList.remove('key--lost')
	}
	lottery()
}

//usuwa aktywne pola
// const removeActive = () => {}

const pressKey = () => {
	timer.style.color = 'black'
	gameCountdown = 7 //czas gry
	// soundStart.play()
	lottery()
	countdown()

	for (let i = 0; i < keys.length; i++) {
		keys[i].addEventListener('click', () => {
			if (keys[i].classList.contains('key--active') === true) {
				keys[i].classList.remove('key--active')
				keys[i].classList.add('key--win')
				// soundMole.play()
				actualPoint += 1
				points.innerHTML = actualPoint
				winKey = document.querySelector('.key--win')
				lostKey = document.querySelectorAll('.key--lost')
				removeWin()
			} else {
				// soundPick.play()
				// keys[i].classList.add('key--lost')
				// setTimeout(function () {
				// 	//funcka kasuje czerwone pola po 1 sekundzie
				// 	keys[i].classList.remove('key--lost')
				// }, 1000)
			}
		})
	}
}

const startBtn = () => {
	timer.innerHTML = '3'
	// soundPeak.play()
	timer.style.color = 'red'
	setTimeout(function () {
		timer.innerHTML = '2'
		// soundPeak.play()
	}, 1000)
	setTimeout(function () {
		timer.innerHTML = '1'
		// soundPeak.play()
	}, 2000)
	setTimeout(pressKey, 3000)
}
//funkcja naciśnięcia przycisku START
start.addEventListener('click', () => {
	start.classList.add('hidden')
	timer.classList.remove('hidden')
	startBtn()
})

//zapis rekordu
const recordSave = () => {
	yourLastPoint = actualPoint
	if (Number(yourLastPoint) > Number(yourRecord)) {
		yourRecord = yourLastPoint
		record.innerHTML = yourRecord
	}
}
