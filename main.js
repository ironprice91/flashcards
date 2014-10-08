// array for the pie chart
// Find uniq values(1) in correct answer and put into array
// put it as the value of series below
$('.saved-stacks').on('click', function(){
	$('.pie-show').removeClass('pie-hide');
});

 var data = {
  series: [5,2]
};
var sum = function(a, b) { return a + b };

Chartist.Pie('.ct-chart', data, {
  labelInterpolationFnc: function(value) {
    return Math.round(value / data.series.reduce(sum) * 100) + '%';
  }
});
/***END JS FOR PIECHART**/

var correctAnswers = [];
var wrongAnswers = [];
_.uniq(correctAnswers);

// jQuery form tooltip
$('[data-toggle="tooltip"]').tooltip({'placement': 'right'});

// Adding a new question field
$('.add-new-question').on('click', function(){

	var newQuestion = $('#flashcard-form').clone();
	newQuestion
	.attr('id', '')
	.addClass('flashcard-form');

	$('.stack-form').append(newQuestion);

});



// Toggle stack menu
$('.toggle-menu').on('click', function(){
	$('.sidebar').toggleClass('sidebar-show');
});

//////////////////////
// FLASHCARD CLASS //
//////////////////////
var Flashcard = function(question, answer){
	this.question = question;
	this.answer = answer;
};

Flashcard.prototype.render = function(stack){
	$('.review-show').show();
	$('.start-quiz').show();
	var reviewSection = $('#answer-section').clone();
	reviewSection
	.attr('id', '')
	.addClass('answer-section')
	.find('h2')
	.text(this.question);
	reviewSection
	.find('h4')
	.text(this.answer);
	$('.review-section').append(reviewSection);
};


////////////////////////////
// FLASHCARD STACK CLASS //
////////////////////////////
var FlashcardStack = function(name, cards){
	this.name = name;
	this.cards = [];
};

FlashcardStack.prototype.renderCards = function() {
	var i = 0;
	for(i; i < this.cards.length; i++){
		this.cards[i].render();	
	}
};


// function to store the flashcard arguement
FlashcardStack.prototype.store = function(flashcard){
	var cardStack = this.cards;
	cardStack.push(flashcard);
	console.log(cardStack);
};

// Hacky way to hide the review section on start quiz
$('.start-quiz').on('click', function(){
	$('.review-show').hide();
	$('.answer-section').hide();
});

// holding flash card views
var flashcards = [];

// Taking values and making it into a new stack of cards
function stackSubmit(){
	var stackForm = $('.new-stack');
	var stackName = stackForm.find('[name=stack-name]').val();
	var newStack = new FlashcardStack(stackName);


	$('.sidebar').append('<button class="btn btn-default toggle-stack">' + newStack.name + '</button>');

	// Clicking the stackname button GO! function
	$('.start-quiz').on('click', function(){
		var i = 0;
		for(i;i<newStack.cards.length;i++){
			var newFlashCard = $('#flashcard-section').clone();
			newFlashCard
			.attr('id', '')
			.addClass('row')
			.addClass('flashcard-section')
			.find('h1')
			.text(newStack.cards[i].question);
			flashcards.push(newFlashCard);
			$('.container').append(newFlashCard);
				if($('.question-answer').eq(i+1)){
					$('.question-answer').eq(i+i).hide();
			}
		}


//Moving to each question attempt on refactoring code below /*****/

/*		$('.question-answer').each(function(element, index){
			var that = $(this);
			that.on('submit', function(event){
				event.preventDefault();
				console.log(newStack.cards[0].answer);
				if($('.answer').eq(1).val() === newStack.cards[0].answer){
					$('.question').append('<i class="fa fa-check-circle-o"></i>');
					that.slideUp(300);
					console.log(that.eq(1));
					$('.question-answer').eq(2).show(300);
				} else {
					$('.question').append('<i class="fa fa-times"></i>');
					that.slideUp(300);
					$('.question-answer').eq(2).show(300);
				}
			});
		});*/


		/*********/
		// Checking if the answer is correct
		$('.question-answer').each(function(element, index){
			var questionAnswer = $(this);
			questionAnswer.on('submit', function(event){
				event.preventDefault();
				$('.answer').each(function(element, index){
					console.log(this);
					var answer = $(this);
					$('.question').each(function(element,index){
						var question = $(this);
					// Checking answer section
						for(var i = 0; i < newStack.cards.length; i++){
							if(answer.eq(i).val() === newStack.cards[i].answer){
								question.eq(i).append('<i class="fa fa-check-circle-o"></i>');
								questionAnswer.eq(i).slideUp(300);
								correctAnswers.push(1);
								if(null === null){
									for(var i = 0; i < newStack.cards.length; i++){
										//$('.container').append($('.question-answer').eq(i).show());
										for(var q = 1; q <= newStack.cards.length; q++){
											$('.question-answer').eq(q+1).show();
											//$('.question').eq(q+1).slideDown(300);					
											$('.answer').eq(q+1).show();
										}
								}
							} 
						} else {
							wrongAnswers.push(1);
						}
					}
				});
			});
		});
	});
});


	$('.flashcard-form').each(function(element, index){
		var questions = $(this);
		var question = questions.find('[name=question]').val();
		var answer = questions.find('[name=answer]').val();
		var cards = new Flashcard(question, answer);
		console.log(cards);
		newStack.cards.push(cards);
	});
	console.log(newStack);

	// Render review section on click of the stack
	$('.toggle-stack').on('click', function(){
		newStack.renderCards();
	});

};


// Submit stack function and remove field values
$('.new-stack').on('submit', function(event){
	event.preventDefault();
	stackSubmit();
	var stackForm = $('.new-stack');
	$('.modal-backdrop, .question-form').hide();
	var stackName = stackForm.find('[name=stack-name]').val('');
	$('.flashcard-form').each(function(element, index){
		var questions = $(this);
		var question = questions.find('[name=question]').val('');
		var answer = questions.find('[name=answer]').val('');
	});
});

// oop form submit
/*FlashcardStack.prototype.onSubmit = function() {

	var stackForm = $('.new-stack');
	var stackName = stackForm.find('[name=stack-name]').val();
	var newStack = new FlashcardStack(stackName);

	$('.custom-nav').append('<button class="btn btn-default toggle-stack">' + newStack.name + '</button>');

	$('.flashcard-form').each(function(element, index){
		var questions = $(this);
		var question = questions.find('[name=question]').val();
		var answer = questions.find('[name=answer]').val();
		var cards = new Flashcard(question, answer);
		console.log(cards);
		newStack.cards.push(cards);
	});
	$('.submit-stack').on('submit', newStack.onSubmit.bind(this));
};*/


////////////////
// TEST UNITS //
////////////////

// Flashcard my instance
var myQuestion = new Flashcard('What is the meaning of life?', '42');
var myTest = new Flashcard('Another question?', 'blah');
var myStack = new FlashcardStack('Test Stack', myQuestion);