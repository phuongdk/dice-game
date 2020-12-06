/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he wishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/
var setWinningScores,scores,roundScores,activePlayer,gameActive,previousDiceRoll,dice,dicetwo;
var playerOne = prompt("Enter player 1's name","Player 1");
var playerTwo = prompt("Enter player 2's name","Player 2");
initializeVar();

	//Click event roll dice
	document.querySelector('.btn-roll').addEventListener('click',function(){

	//If game is playing	
	if(gameActive) {
	//Preserve previousroll number
	if (typeof dice !== 'undefined') {
		previousDiceRoll = dice;
	}
	//Generate random numbers
	dice = Math.floor(Math.random()*6 + 1);
	//Update UI
	document.getElementById('diceone').style.display = 'block';
	document.getElementById('diceone').src = 'dice-' + dice + '.png';
	if (document.getElementById('dicetwo_toggle').checked === true) {
		dicetwo = Math.floor(Math.random()*6 + 1);
		document.getElementById('dicetwo').style.display = 'block';
		document.getElementById('dicetwo').src = 'dice-' + dicetwo + '.png';
	}
	console.log(dice + " - " + dicetwo);
	// If roll two dice six in a row	
	if (previousDiceRoll == 6 && dice == 6) {
		document.querySelector('.player-notification-'+activePlayer).innerHTML = 'You roll TWO DICE SIX IN A ROW - LOSE SCORE';
		document.querySelector('.player-notification-'+activePlayer).style.display = 'block';
		document.getElementById('score-' + activePlayer).innerHTML = 0;
		nextPlayer();
		document.querySelector('.player-notification-'+activePlayer).style.display = 'none';
	}

	//If dice !=1 then update score
	else if (dice !==1 && dicetwo !==1 ) {
		roundScores += dice + dicetwo;
		document.getElementById('current-' + activePlayer).innerHTML = '<em>'+roundScores+'</em>';	
	} 

	//If dice = 1 then switch player
	else {
		document.querySelector('.player-notification-'+activePlayer).innerHTML = 'You roll DICE 1 - NEXT PLAYER\'S TURN';
		document.querySelector('.player-notification-'+activePlayer).style.display = 'block';
		nextPlayer();
		document.querySelector('.player-notification-'+activePlayer).style.display = 'none';
	}
}
});

	//Click event hold score
	document.querySelector('.btn-hold').addEventListener('click',function(){

		if(gameActive) {
	//load current score to player score
	scores[activePlayer] += roundScores;
	document.getElementById('score-' + activePlayer).innerHTML = scores[activePlayer];

	//remove player notification
	var x = document.querySelectorAll('.player-notification');
	for(i=0;i<x.length;i++) {
		x[i].style.display = 'none';
	}

	//check if player won the game
	if(scores[activePlayer] >= setWinningScores) {
		document.getElementById("name-"+activePlayer).innerHTML = 'WINNER!';
		document.querySelector('.player-'+activePlayer+'-panel').classList.add('winner');
		document.querySelector('.player-'+activePlayer+'-panel').classList.remove('active');
		document.getElementById('diceone').style.display = 'none';
		document.getElementById('dicetwo').style.display = 'none';
		gameActive = false;
	}

	//switch player
	else {
		nextPlayer();	
	}	
}
});
	//New game button event
	document.querySelector('.btn-new').addEventListener('click',initializeVar);
	//Select box event
	document.getElementsByTagName('select')[0].onchange = initializeVar;
	//Dice Two toggle event
	document.getElementById('dicetwo_toggle').onchange = initializeVar;
	//Show rules event
	document.getElementById('btn-rule').addEventListener('click',function(){
		document.getElementById('overlay').classList.add('show');
	});
	//Close rules event
	document.getElementById('btn-close').addEventListener('click',function(){
		document.getElementById('overlay').classList.remove('show');
	});
	function initializeVar() {
		scores = [0,0];
		roundScores = 0;
		activePlayer = 0;
		gameActive = true;
		dicetwo = 0;
		setWinningScores = document.getElementsByTagName('select')[0].value;
		document.getElementById("score-0").innerHTML = 0;
		document.getElementById("score-1").innerHTML = 0;
		document.getElementById("current-0").innerHTML = 0;
		document.getElementById("current-1").innerHTML = 0;
		if(playerOne !== '' && playerOne !== null){document.getElementById("name-0").innerHTML = playerOne;}
		else{document.getElementById("name-0").innerHTML = "Player 1";} 
		if(playerTwo !== '' && playerTwo !== null){document.getElementById("name-1").innerHTML = playerTwo;}
		else{document.getElementById("name-1").innerHTML = "Player 2";} 
		document.getElementById('diceone').style.display = 'none';
		document.getElementById('dicetwo').style.display = 'none';
		document.querySelector('.player-0-panel').classList.remove('winner');
		document.querySelector('.player-1-panel').classList.remove('winner');
		document.querySelector('.player-0-panel').classList.remove('active');
		document.querySelector('.player-1-panel').classList.remove('active');
		document.querySelector('.player-0-panel').classList.add('active');
		document.querySelector('.player-notification').style.display = 'none';
	}

	function nextPlayer() {
		roundScores = 0;
		document.getElementById('current-' + activePlayer).innerHTML = '<em>'+roundScores+'</em>';	
		document.getElementById('diceone').style.display = 'none';
		document.getElementById('dicetwo').style.display = 'none';
		document.querySelector('.player-'+activePlayer+'-panel').classList.remove('active');
		activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
		document.querySelector('.player-'+activePlayer+'-panel').classList.add('active');
	}

	function showRules() {
		document.getElementById('overlay').classList.toggle('show');
	}
