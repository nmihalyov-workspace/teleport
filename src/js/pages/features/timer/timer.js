'use strict'

let countDownDate = new Date("January 1, 2022 00:00:00").getTime();

let x = setInterval(function() {
	let now = new Date().getTime();
	let distance = countDownDate - now;
	let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
	let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
	let seconds = Math.floor((distance % (1000 * 60)) / 1000);
	
	document.getElementById("timer").innerHTML = hours + "ч " + minutes + "м " + seconds + "с ";
	
	if (distance < 0) {
		clearInterval(x);
		document.getElementById("timer").innerHTML = "Время истекло";
	}
}, 1000);
//# sourceMappingURL=timer.js.map
