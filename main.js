// jQuery form tooltip
$('[data-toggle="tooltip"]').tooltip({'placement': 'right'});

// Adding a new question field
$('.add-new-question').on('click', function(){
	var newQuestion = $('#flashcard-form').clone();
	newQuestion
	.attr('id', '')
	.addClass('flashcard-form');

	$('#flashcard-form').append(newQuestion);
	console.log(newQuestion);
});

//////////////////////
// FLASHCARD CLASS //
//////////////////////
var Flashcard = function(question, answer){
	this.question = question;
	this.answer = answer;
};

Flashcard.prototype.render = function(stack){
	$('body').append('<h1>'+ this.question + '</h1>');
	$('body').append('<h3>'+ this.answer + '</h3>');
};


////////////////////////////
// FLASHCARD STACK CLASS //
////////////////////////////
var FlashcardStack = function(name, cards){
	this.name = name;
	this.cards = [];
};

// function to store the flashcard arguement
FlashcardStack.prototype.store = function(flashcard){
	var cardStack = this.cards;
	cardStack.push(flashcard);
	$('.submit-stack').on('submit', this.formSubmit.bind(this));
	console.log(cardStack);
};

FlashcardStack.prototype.formSubmit = function() {
	var stackName = form.find('[name=stack-name]').val();
	// var questions = $('.flashcard-form');
	$('.flashcard-form').each(function(element, index){
		var myStack = this;
		var form = $('.new-stack');
		var questions = $(element);
		var question = questions.find('[name=question]').val();
		var answer = questions.find('[name=answer]').val();
		var cards = new Flashcard(question, answer);
		console.log(cards);
		var stack = new FlashcardStack(stackName, myStack.store(cards) );

	});
	
	/*var stackName = questions.find('[name=stack-name]').val();
	var question = questions.find('[name=question]').val();*/
	
	// var cards = new Flashcard(question, answer);
		

};

/* Need a function to get input values and make them a stack with flashcards in them already */

////////////////
// TEST UNITS //
////////////////

// Flashcard my instance
var myQuestion = new Flashcard('What is the meaning of life?', '42');
var myStack = new FlashcardStack('', myQuestion);

