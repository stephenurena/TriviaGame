//qame obj and array of objects of selections
//==========================================================================================
var game = {
	landingPage: function() {
		startScreen = $("<button>");
		startScreen.attr('id', "startBtn");
		startScreen.addClass("btn btn-primary btn-lg btn-block start-button");
		startScreen.text("Finish the lyric Yo!");
		$("#gameDiv").append(startScreen);
	},
	gMarkUp: function(){
			//game div to nest p's of timer, song, and answers
			gameDiv = $("<div>");
					  gameDiv.attr("id", "quiz")
					  gameDiv.addClass("panel-body");
					  $("#gameDiv").append(gameDiv);
			//create el p for timer
			gameP = '<p class="text-center timer-p">Time Remaining: <span id="timer">10</span></p><p class="text-center">' + songArr[questionCounter] + '</p><p class="text-center">' + lyricArr[questionCounter] + '</p><p class="first-answer answer">A. ' + answerArr[questionCounter][0] + "</p><p class='answer'>B. " + answerArr[questionCounter][1] + "</p><p class='answer'>C. " + answerArr[questionCounter][2] + "</p>";
					$("#quiz").html(gameP);
		},

	timeCountDown: function(){
			clockCount = setInterval(gameTimer, 1000);
				function gameTimer() {
					if (counter === 0) { //loss due to not answerings in time
						clearInterval(clockCount);
						this.game.unansweredLoss();
						console.log(lossTally);
						// this.game.inBetweenScreen();
					}
					if (counter > 0) {
						// clearInterval(clockCount);
						counter--;
					}
					$("#timer").html(counter);
				}
	},
	inBetweenScreen: function () {
		if (questionCounter < 6) {
			$("#quiz").show();
			//tried putting hide for #quizWin but didn't work, was hiding during a win
			questionCounter++;
			clearInterval(clockCount);
			this.gMarkUp();
			counter = 10;
			this.timeCountDown();
			}
			else {
				clearInterval(clockCount);
				this.resultScreen();
			};
	},

	unansweredLoss: function() {
		lossTally++;
		console.log(lossTally);
		setInterval(this.inBetweenScreen(), 1000 *10);
	},

	win: function(){
		winTally++;
		console.log(winTally);
		genDivs = $("<div>");
				  genDivs.attr("id", "quizWin");
				  genDivs.addClass("panel-body");
				  genDivs.text("Test");
				  $("#gameDiv").append(genDivs);
		correctP = '<p id="answer" class="text-center">YES! ' + "<strong>" + correctLyric[questionCounter] + "</strong> is correct</p>" + videoArr[questionCounter];
			$("#quizWin").html(correctP);
		setInterval(this.inBetweenScreen(), 1000 *30);
		
	},

	loss: function(){
		lossTally++;
		console.log(lossTally);
		genDivs = $("<div>");
				  genDivs.attr("id", "quizWin");
				  genDivs.addClass("panel-body");
				  genDivs.text("test")
				  $("#gameDiv").append(genDivs);
		correctP = '<p id="answer" class="text-center">No! The correct answer was  ' + "<strong>" + correctLyric[questionCounter] + "</strong></p>";
		$("#gameDiv").html(correctP);
		setInterval(this.inBetweenScreen(), 1000 *10);
	},
	resultScreen: function () {
			results = "<div id='results' <p class='text-center'>All done, here's how you did!" + "</p>" + "<p class='summary-correct'>Correct Answers: " + winTally + "</p>" + "<p>Wrong Answers: " + lossTally + "</p>" + "<p class='text-center reset-button-container'><a class='btn btn-primary btn-lg btn-block reset-button' href='#' role='button'>Let's try this again!</a></p></div>";
			$("#gameDiv").html(results);
	},
	reset: function () {
		$("#results").hide();
		questionCounter = 0;
		winTally = 0;
		lossTally = 0;
		counter = 10;
		this.landingPage();
	}

};

//Event listeners
//==========================================================================================
$(document).ready(function(){
	game.landingPage();
});

$("#gameDiv").on("click", "#startBtn", function(){
	$("#startBtn").hide();
	game.gMarkUp();
	sound.play();

	game.timeCountDown();
});
$("body").on("click", ".reset-button", function(){
	sound.play();
	game.reset();
});
$("body").on("click", ".answer", function(){
	sound.play();
	clickedAnswer = $(this).text();
	console.log(clickedAnswer);
	if(clickedAnswer === correctLyric[questionCounter]){
		clearInterval(clockCount);
		game.win();
		$("#quiz").hide();
		console.log("correct");
	} else {
		clearInterval(clockCount);
		game.loss();
		$("#quiz").hide();
		console.log("incorrect");	

	}
});

//Global variables
//==========================================================================================
var genDivs;
var startScreen;
var results;
var timerP;
var songP;
var answerP;
var gMarkUp; //variable to create markup during event listener click
var counter = 10;
var questionCounter = 0;
var clickedAnswer;
var clockCount;
var winTally = 0;
var lossTally = 0;
var sound = new Audio("assets/sounds/sound.wav") //add a user click sound

//Global quiz arrays....
//==========================================================================================
var songArr = ['"Feel Me Flow"-Naughty By Nature', '"Can I Kick It?" — A Tribe Called Quest', 'Passing Me By" — The Pharcyde', '"Electric Relaxation"— A Tribe Called Quest', '"A Children\'s Story" — Slick Rick', '"It Takes Two"— Rob Base and DJ EZ Rock', '"This Is How We Do It"- Montell Jordan' ];
var lyricArr = ["So here we go now, Holla if ya hear me though, come ____________", "Can I kick it? (____________)", "My ____, my ____, my ____, you do not know me but I know you very well", "Relax yourself girl, ______ _____ _____", "___ ___ ___, Once upon a time not long ago, When people wore _____ and lived life ____, When laws were stern and justice stood, And people were behavin' like they ____ __ good", "I wanna ____ right now, I'm ____ ____ and I came to get down, I'm not internationally known, But I'm known to ____ the microphone", "This is ___ we do it, It's _____ _______, and I feel alright, The party is here on the ______ _______" ];
var answerArr = [["and feel me flow","and hear me grow, ", "and see me tho, ", "and be me yo, "], ["yes, you can", "no, we ain't ready", "yes, we will!"], ["love, love, love", "babe, babe, babe", "dear, dear, dear"], ["peace and calm", "please settle down", "please can you"], ["Maybe so yo, somethin, hoodies, are too","How bout no, nothin, fast, sort ta", "Here we go, pajamas, slow; stern, ought ta"], ["rock, Rob Base, rock", "sleep, on fire, drop", "eat, so hype, hold"], ["where, Tuesday night, school site", "when, Saturday night, East side", "how, Friday night, West side"]];
var correctLyric = ["A. and feel me flow", "A. yes, you can", "C. dear, dear, dear", "C. please can you", "C. Here we go, pajamas, slow; stern, ought ta", "A. rock, Rob Base, rock", "C. how, Friday night, West side"];
var videoArr = [['<iframe width="560" height="315" src="https://www.youtube.com/embed/4ZSWeliCq4s?list=RD4ZSWeliCq4s" ?rel=0&autoplay=1 frameborder="0" allowfullscreen></iframe>'], ['<iframe width="560" height="315" src="https://www.youtube.com/embed/71ubKHzujy8" ?rel=0&autoplay=1 frameborder="0" allowfullscreen></iframe>'], ['<iframe width="560" height="315" src="https://www.youtube.com/embed/QjsPG0Kspxo" ?rel=0&autoplay=1 frameborder="0" allowfullscreen></iframe>'], ['<iframe width="560" height="315" src="https://www.youtube.com/embed/WHRnvjCkTsw" ?rel=0&autoplay=1 frameborder="0" allowfullscreen></iframe>'], ['<iframe width="560" height="315" src="https://www.youtube.com/embed/HjNTu8jdukA" ?rel=0&autoplay=1 frameborder="0" allowfullscreen></iframe>'], ['<iframe width="560" height="315" src="https://www.youtube.com/embed/phOW-CZJWT0" ?rel=0&autoplay=1 frameborder="0" allowfullscreen></iframe>'], ['<iframe width="560" height="315" src="https://www.youtube.com/embed/0hiUuL5uTKc" ?rel=0&autoplay=1 frameborder="0" allowfullscreen></iframe>']]; 
