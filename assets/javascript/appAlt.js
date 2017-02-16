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

	timeCountDown: function(){
			clockCount = setInterval(gameTimer, 1000);
				function gameTimer() {
					if (counter === 0) {
						lossTally++;
						console.log(lossTally);
						clearInterval(clockCount);
						if (questionCounter < 7) {
							questionCounter++;
							gMarkUp();
							counter = 30;
						}
						// generateLossDueToTimeOut();
					}
					if (counter > 0) {
						counter--;
					}
					$("#timer").html(counter);
				}
	},

	// wait: function () {
	// 	if (questionCounter < songArr.length) {
	// 		questionCounter++;
	// 		gMarkUp();
	// 		counter = 30;
	// 		this.timeCountDown();
	// 	}
	// 	else {
	// 		this.finalScreen();
	// 	}
	// },

	finalScreen: function () {
			results = "<p class='text-center timer-p'>Time Remaining: <span id='timer'>" + counter + "</span></p>" + "<p class='text-center'>All done, here's how you did!" + "</p>" + "<p class='summary-correct'>Correct Answers: " + correctTally + "</p>" + "<p>Wrong Answers: " + incorrectTally + "</p>" + "<p>Unanswered: " + unansweredTally + "</p>" + "<p class='text-center reset-button-container'><a class='btn btn-primary btn-lg btn-block reset-button' href='#' role='button'>Reset The Quiz!</a></p>";
			$("#gameDiv").html(results);
	},

	generateLossDueToTimeOut: function () {
			unansweredTally++;
			gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>You ran out of time!  The correct answer was: " + correctAnswers[questionCounter] + "</p>" + "<img class='center-block img-wrong' src='img/x.png'>";
			$("#gameDiv").html(gameHTML);
			setTimeout(this.wait, 4000);  //  change to 4000 or other amount
	},
	win: function(){
		winTally++;
		console.log(winTally);
		// // function win (){
		// genDivs = $("<div>");
		// 		  genDivs.attr("id", "quizWin");
		// 		  genDivs.addClass("panel-body");
		// 		  $("#gameDivWin").append(genDivs);
		// correctP = '<p class="text-center">YES! ' + correctLyric[		questionCounter] + "is correct</p>";
		// 	$("#quizWin").html(correctP);
		// }
		
	},
	loss: function(){
		lossTally++;
		console.log(lossTally)
	},

};

//Event listeners
//==========================================================================================

$(document).ready(function(){
	game.landingPage();
});

$("#gameDiv").on("click", "#startBtn", function(){
	$("#startBtn").hide();
	gMarkUp();

	game.timeCountDown();
});

$("body").on("click", ".answer", function(){
	clickedAnswer = $(this).text();
	console.log(clickedAnswer);
	if(clickedAnswer === correctLyric[questionCounter]){
		game.win();
		$("#quiz").hide();
		console.log("correct");
	} else {
		game.loss();
		$("#quiz").hide();
		console.log("incorrect");	
	}
});

//Globals
//==========================================================================================
function gMarkUp (){
		//game div to nest p's of timer, song, and answers
		gameDiv = $("<div>");
				  gameDiv.attr("id", "quiz")
				  gameDiv.addClass("panel-body");
				  $("#gameDiv").append(gameDiv);
		//create el p for timer
		timerP = '<p class="text-center timer-p">Time Remaining: <span id="timer">30</span></p>';
				$("#quiz").html(timerP);
	
		//generated song onclick
		songP = $("<p>");
				 songP.attr("id", "song");
				 songP.addClass("text-center");
				 $("#quiz").append(songP);

			songSel = '<p class="text-center">' + songArr[questionCounter] + '</p>';
					  $("#song").html(songSel);
		//generated lyric onclick
		lyricP = $("<p>");
				 lyricP.attr("id", "lyric");
				 lyricP.addClass("text-center");
				 $("#quiz").append(lyricP);

			lyricSel = '<p class="text-center">' + lyricArr[questionCounter] + '</p>';
					  $("#lyric").html(lyricSel);
		//generated answers onclick
		answerP = $("<p>");
				 answerP.attr("id", "answers");
				 answerP.addClass("text-left answers-p");
				 $("#quiz").append(answerP);

			 answerSel = '<p class="first-answer answer">A. ' + answerArr[questionCounter][0] + "</p><p class='answer'>B. " + answerArr[questionCounter][1] + "</p><p class='answer'>C. " + answerArr[questionCounter][2] + "</p>";
			 			$("#answers").append(answerSel);
		// setTimeout(game.wait(), 4000);
	};
//Global variables
//==========================================================================================

var genDivs;
var input;
var item;
var startScreen;
var results;
var timerP;
var songP;
var answerP;
var gMarkUp; //variable to create markup during event listener click
var counter = 30;
var questionCounter = 0;
var clickedAnswer;
var clockCount;
var winTally = 0;
var lossTally = 0;
var unansweredTally = 0;
// var clickSound = () //add a user click sound

//Global quiz arrays....
//==========================================================================================

var songArr = ['"Feel Me Flow"-Naughty By Nature', '"Can I Kick It?" — A Tribe Called Quest', 'Passing Me By" — The Pharcyde', '"Electric Relaxation"— A Tribe Called Quest', '"A Children\'s Story" — Slick Rick', '"It Takes Two"— Rob Base and DJ EZ Rock', '"This Is How We Do It"- Montell Jordan' ];
var lyricArr = ["So here we go now, Holla if ya hear me though, come ____________", "Can I kick it? (____________)", "My ____, my ____, my ____, you do not know me but I know you very well", "Relax yourself girl, ______ _____ _____", "___ ___ ___, Once upon a time not long ago, When people wore _____ and lived life ____, When laws were stern and justice stood, And people were behavin' like they ____ __ good", "I wanna ____ right now, I'm ____ ____ and I came to get down, I'm not internationally known, But I'm known to ____ the microphone", "This is ___ we do it, It's _____ _______, and I feel alright, The party is here on the ______ _______" ];
var answerArr = [["and feel me flow","and hear me grow, ", "and see me tho, ", "and be me yo, "], ["yes, you can", "no, we ain't ready", "yes, we will!"], ["love, love, love", "babe, babe, babe", "dear, dear, dear"], ["peace and calm", "please settle down", "please can you"], ["Maybe so yo, somethin, hoodies, are too","How bout no, nothin, fast, sort ta", "Here we go, pajamas, slow; stern, ought ta"], ["rock, Rob Base, rock", "sleep, on fire, drop", "eat, so hype, hold"], ["where, Tuesday night, school site", "when, Saturday night, East side", "how, Friday night, West side"]];
var correctLyric = ["A. and feel me flow", "A. yes, you can", "C. dear, dear, dear", "C. please can you", "C. Here we go, pajamas, slow; stern, ought ta", "A. rock, Rob Base, rock", "C. how, Friday night, West side"];
var videoArr = [['<iframe width="560" height="315" src="https://www.youtube.com/embed/4ZSWeliCq4s?list=RD4ZSWeliCq4s" ?rel=0&autoplay=1 frameborder="0" allowfullscreen></iframe>'], ['<iframe width="560" height="315" src="https://www.youtube.com/embed/71ubKHzujy8" ?rel=0&autoplay=1 frameborder="0" allowfullscreen></iframe>'], ['<iframe width="560" height="315" src="https://www.youtube.com/embed/QjsPG0Kspxo" ?rel=0&autoplay=1 frameborder="0" allowfullscreen></iframe>'], ['<iframe width="560" height="315" src="https://www.youtube.com/embed/WHRnvjCkTsw" ?rel=0&autoplay=1 frameborder="0" allowfullscreen></iframe>'], ['<iframe width="560" height="315" src="https://www.youtube.com/embed/HjNTu8jdukA" ?rel=0&autoplay=1 frameborder="0" allowfullscreen></iframe>'], ['<iframe width="560" height="315" src="https://www.youtube.com/embed/phOW-CZJWT0" ?rel=0&autoplay=1 frameborder="0" allowfullscreen></iframe>'], ['<iframe width="560" height="315" src="https://www.youtube.com/embed/0hiUuL5uTKc" ?rel=0&autoplay=1 frameborder="0" allowfullscreen></iframe>']]; 
