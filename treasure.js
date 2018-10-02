var colors = [];
var numOfSquares = 16;
var pickedColor;
var chanceLeft = 3;
var squares = document.querySelectorAll(".square");
var modeButton = document.querySelectorAll(".mode");
var chance = document.querySelector("#chances");
var resetButton = document.querySelector("#reset");
var messageDisplay = document.querySelector("#message");
var h1 = document.querySelector("h1");
var bannerColor = document.querySelector("#colorDisplay")



init();

function init() {
	setUpModeButtons();
	setUpSquares();
	resetEverything();
}

function setUpModeButtons() {
	for(var i = 0; i < modeButton.length; i++) {
		modeButton[i].addEventListener("click", function(){
			modeButton[0].classList.remove("selected");
			modeButton[1].classList.remove("selected");
			modeButton[2].classList.remove("selected");
			this.classList.add("selected");

			if(this.textContent === "Easy") {
				numOfSquares = 4;
			}
			else if(this.textContent === "Medium") {
				numOfSquares = 8;
			}
			else{
				numOfSquares = 16;
			}

			resetEverything();

		});
	}
}


function setUpSquares() {
	for(var i = 0; i < squares.length; i++) {
		squares[i].addEventListener("click", function(){
			
			if(chanceLeft <= 1) {
				chance.textContent = "None";
				messageDisplay.textContent = "Game Over";
				resetButton.textContent = "Play Again?";
			}
			else{
				var clickedColor = this.style.backgroundColor;
			
				if(clickedColor === pickedColor) {
					messageDisplay.textContent = "You Win!";
					resetButton.textContent = "Play Again?";
					changeColor(clickedColor);
				}

				else {
						// this.classList.add("danger");
						messageDisplay.textContent = "Wrong!";
						chanceLeft--;
						chance.textContent = chanceLeft;
						
				}
				
			}
		
		});
	}
}

function resetEverything() {
	resetButton.textContent = "New Game";

	colors = generateRandomColors(numOfSquares);

	pickedColor = pickColor();

	chanceLeft = 3;

	messageDisplay.textContent = "";
	chance.textContent = chanceLeft;
	bannerColor.textContent = pickedColor;

	h1.style.backgroundColor = "#17a2b8";

	for(var i = 0; i < squares.length; i++) {
		if(colors[i]) {
			squares[i].style.display = "block";
			squares[i].style.backgroundColor = colors[i];
			squares[i].classList.remove("danger");
			squares[i].classList.remove("treasure");
		}
		else {
			squares[i].style.display = "none";
		}
	}

}

resetButton.addEventListener("click", function(){
	resetEverything();
});

function changeColor(color) {
	for(var i = 0; i < squares.length; i++) {
		squares[i].style.backgroundColor = color;
	}
	h1.style.backgroundColor = color;
}

function pickColor() {
	return colors[Math.floor(Math.random() * colors.length)];
}

function generateRandomColors(numOfSquares) {
	var ara = [];

	for(var i = 0; i < numOfSquares; i++) {
		ara.push(randomColor());
	}
	return ara;
}

function randomColor() {
	//pick red from 0 - 255
	var red = Math.floor(Math.random() * 256);
	//pick green from 0 - 255
	var green = Math.floor(Math.random() * 256);
	//pick blue from 0 - 255
	var blue = Math.floor(Math.random() * 256);

	return "rgb(" + red + ", " + green + ", " + blue + ")";
}
