var questions = 
[
	{
		question: "What percent of the population can't snap their fingers?", 
		options: ["one fifth", "one tenth", "one third", "one half"], 
		correct_option: "3", 
		blurb: "Supposedly one third of people can't snap their fingers."
	},
	{
		question: "Both emus and kangaroos cannot do what?", 
		options: ["spit", "walk backwards", "roll their eyes", "play poker"], 
		correct_option: "2", 
		blurb: "Emus and kangaroos cannot walk backwards."
	},
	{
		question: "The katydid bug hears through holes in its what?", 
		options: ["hind legs", "nose", "butt", "head"], 
		correct_option: "1", 
		blurb: "The katydid bug hears through holes in its hind legs"},
	{
		question: "About how many people in the US are either in jail, on probation, or on parole?", 
		options: ["1 in 5", "1 in 100", "1 in 20", "1 in 30"], 
		correct_option: "4", 
		blurb: "About 1 in 30, which is insane!"},
	{
		question: "what percentage of millionaires drive used cars?", 
		options: ["50%", "80%", "60%", "75%"], 
		correct_option: "2", 
		blurb: "About 80% of millionaires drive used cars"},
	{
		question: "How much does it cost to make a $1 bill in the US?", 
		options: ["a dollar", "25 cents", "$1 and 5 cents", "3 cents"], 
		correct_option: 4, 
		blurb: "It costs 3 cents to make a $1 bill in the US."},
	{
		question: "What was Adolf Hitler's favorite movie?", 
		options: ["Citizen Kane", "A Bug's Life", "King Kong", "Eraserhead"], 
		correct_option: 3, 
		blurb: "Hitler's favorite movie was King Kong."},
	{
		question: "How many steps will the average person take in a day?", 
		options: ["25 thousand", "18 thousand", "15 thousand", "12 thousand"], 
		correct_option: 2, 
		blurb: "the average person is measured to take about 18 thousand steps in a single day."}
	];

var game_state = "intro";
var question_count = 0;
var question_results = [];
var question_selected = {};
var answer_selected = false;
var selected_answer = 0;
var correct_answer = 0;

function on_load()
{
	$("#question").hide();
	$("#result").hide();
	$("#answer-input").hide();
	$("#result-input").hide();
	$("#result-blurb").text("Get ready to start the quiz and FILL. THAT. QUESTIONNAIRE!");
	$("#main-button").text("GOOOOO");
}

function populate_text(form)
{
	$("#question-input").empty();
	$("#question-input").text(form.question);
	$("#box-1").text(form.options[0]);
	$("#box-2").text(form.options[1]);
	$("#box-3").text(form.options[2]);
	$("#box-4").text(form.options[3]);
	$("#main-button").text("Check Answer");

}

var advance_quiz = $("#main-button").on("click", function advance_question()
{
	switch(game_state)
	{
		case "intro":
			$("#result-blurb").hide();
			$("#question").show();
			$("#answer-input").show();
			question_selected = questions[question_count];
			populate_text(question_selected);
			game_state = "question";
		break;

		case "question":
			if(answer_selected)
			{
				answer_selected = false;
				$("#answer-input").hide();
				$("#result").show();
				$("#result-input").show();
				$("#result-input").empty();
				$("#result-blurb").show();
				$("#result-blurb").empty();
				$("#result-blurb").text(question_selected.blurb);
				$("#main-button").text("Continue?");
				if (selected_answer == question_selected.correct_option) {
					$("#result-input").text("correctly!");
					question_results.push(true);
				}
				else
				{
					$("#result-input").text("INcorrectly!");
					question_results.push(false);
				}
				question_count++;
				if (question_results.length != questions.length)
				{
					game_state = "result";
				}
				else
				{
					var correct_count = 0;
					for(count = 0; count < question_results.length; count++)
					{
						if(question_results[count])
						{
							correct_count++;
						}
					}
					$("#question").hide();
					$("#answer-input").hide();
					$("#result-input").text(correct_count + " questions correctly.");
					$("#result-blurb").text("Would you like to try again?");
					$("#main-button").text("retry");
					game_state = "endgame";
				}
			}
			else
			{
				selected_answer = 1;
				answer_selected = true;
				advance_question();
			}
		break;

		case "result":
			$("#result-blurb").hide();
			$("#question").show();
			$("#answer-input").show();
			$("#result").hide();
			$("#result-input").hide();
			question_selected = questions[question_count];
			populate_text(question_selected);
			game_state = "question";
		break;

		case "endgame":
			location.reload();
		break;
	}
});

var button_select = $(".answer-box").on("click", function select_button() {
	selected_answer = $(this).attr("value");
	answer_selected = true;
});