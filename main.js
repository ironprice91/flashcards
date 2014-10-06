// key: *** = needs editing
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

// on change generate new stack button
var stackSubmit = function(){
	var stackForm = $('.new-stack');
	var stackName = stackForm.find('[name=stack-name]').val();
	var newStack = new FlashcardStack(stackName);

	$('.custom-nav').append('<button class="btn btn-default toggle-stack">' + newStack.name + '</button>');

		var that = this;
	$('.flashcard-form').each(function(element, index){
		var questions = $(this);
		var question = questions.find('[name=question]').val();
		var answer = questions.find('[name=answer]').val();
		var cards = new Flashcard(question, answer);
		console.log(cards);
		newStack.cards.push(cards);
	});
	console.log(newStack);
};

$('.submit-stack').on('submit', function(event){
	console.log('test');
	event.preventDefault();
	stackSubmit();
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

/* Need a function to get input values and make them a stack with flashcards in them already */

////////////////
// TEST UNITS //
////////////////

// Flashcard my instance
var myQuestion = new Flashcard('What is the meaning of life?', '42');
var myStack = new FlashcardStack('', myQuestion);

