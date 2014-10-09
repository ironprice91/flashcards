// Arrays for storing if the question is right or wrong
var correctAnswers = [0];
var wrongAnswers = [0];
var ratio = [];
// holding flash card views
var flashcards = [];

// Store answers into ratio and 
var storeAnswers = function(){
	var sumWrongAnswers = _.reduce((wrongAnswers), function(memo, num){ return memo + num; }, 0);
	var sumCorrectAnswers = _.reduce((correctAnswers), function(memo, num){ return memo + num; }, 0);
	(sumCorrectAnswers > sumWrongAnswers) ?	ratio.push(sumCorrectAnswers) && ratio.push(sumWrongAnswers) : ratio.push(sumWrongAnswers) && ratio.push(sumCorrectAnswers); 

};

// Render piechart with user data on questions function
var renderPiechart = function(){
	var data = {
	  series: ratio
	};
	var sum = function(a, b) { return a + b };

	Chartist.Pie('.ct-chart', data, {
	  labelInterpolationFnc: function(value) {
	    return Math.round(value / data.series.reduce(sum) * 100) + '%';
	  }
	});
};

// Renders the show results button
var showResults = function(){
	var resultsButton = $('.test-pie');
	resultsButton.fadeIn(200);
	resultsButton.fadeOut(200);
	resultsButton.fadeIn(200);
};

/*For future programming*/
$('.saved-stacks').on('click', function(){
	alert('shows starred stacks... at some point');
});	


// Render the piechart and run functions
$('.test-pie').one('click', function(){
	storeAnswers();
	$('.col-md-4').append('<div class="ct-chart ct-square pie-show pie-hide"></div>');
	renderPiechart();
	$('.show-results').removeClass('show-results');
	$('.pie-show').toggleClass('pie-hide');
	$('.review-header').append('<h1 class="ratio-results">You answered: ' + (correctAnswers.length-1) + '/' + flashcards.length + ' questions correctly!</h1>');
});

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
		}
	
	
		// append 1st item in flashcards array
		$('.container').append(flashcards[0]);
		for(var i = 1; i < newStack.cards.length; i++ ){
			$('.container').append(flashcards[i]);
			_.last(flashcards).attr('onsubmit', 'showResults()')
		}

		var index1 = flashcards.indexOf(flashcards[0]);
		if(index1 >= 0 && index1 < flashcards.length - 1){
			nextItem = flashcards[index1+1];
		}
		var remove;
		console.log(flashcards.indexOf(nextItem));
		$('.question-answer').each(function(element, index){
			var that = $(this);
			that.on('submit', function(e){
				e.preventDefault();
				var that = $(this);
				if($('.answer').eq(index1+1).val() === newStack.cards[index1].answer){
					$('.question').append('<i class="fa fa-check-circle-o"></i>');
					that.slideUp(300);
					remove = window.setTimeout(function(){that.remove();},1000);
					//$('.container').append(flashcards[flashcards.indexOf(nextItem)]);
					correctAnswers.push(1);
				} else {
					$('.question').append('<i class="fa fa-times"></i>');
					that.slideUp(300);
					wrongAnswers.push(1);
					//$('.container').append(flashcards[flashcards.indexOf(nextItem)]);
				}

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

	//Edit quiz in review section /*For Future work*/
	$('.edit-quiz').on('click', function(){
		$('.question-form2')
		.find('h3')
		.text(newStack.name);
		$('.flashcard-form').each(function(element, index){
			$(this).find('[name=question]')
			.val(newStack.cards.question)
			.find('[name=answer]')
			.val(newStack.cards.answer);
		});
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

$('.remove-question').on('click', function(){
	console.log('blah');
});

// Joyride tour
// Instance the tour

$(window).load(function() {
  $(".new-stack-toggle").joyride({
  	'tipLocation': 'bottom', 
  	 'tipContainer': body 
  });
});


////////////////
// TEST UNITS //
////////////////
// Flashcard my instance
var myQuestion = new Flashcard('What is the meaning of life?', '42');
var myTest = new Flashcard('Another question?', 'blah');
var myStack = new FlashcardStack('Test Stack', myQuestion);