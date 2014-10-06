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

// Toggle stack menu
$('.toggle-menu').on('click', function(){
	console.log('test');
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

// Taking values and making it into a new stack of cards
var stackSubmit = function(){
	var stackForm = $('.new-stack');
	var stackName = stackForm.find('[name=stack-name]').val();
	var newStack = new FlashcardStack(stackName);

	$('.custom-nav').append('<button class="btn btn-default toggle-stack">' + newStack.name + '</button>');

	// Clicking the stackname button function
	$('.toggle-stack').on('click', function(){
		console.log(newStack.cards);
	});

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