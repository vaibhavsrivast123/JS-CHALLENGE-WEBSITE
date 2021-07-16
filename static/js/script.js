function ageInDays() {
  var birthYear=prompt('What year were you born ... Good Friend?');
  var ageInDays=(2021-birthYear)*365;
  var h1=document.createElement('h1');
  var textAnswer=document.createTextNode('You are' + ageInDays + 'days old');
  h1.setAttribute('id','ageInDays');
  h1.appendChild(textAnswer);
  document.getElementById('flex-box-result').appendChild(h1);
  console.log(ageInDays);

}

function reset() {
  document.getElementById('ageInDays').remove(); 
}

function generateCat()
{
  var image=document.createElement('img');
  var div=document.getElementById('flex-cat-gen');
  image.src="http://thecatapi.com/api/images/get?format=src&type=gif";
  div.appendChild(image);
}
function rpsGame(yourChoice)
{
  console.log(yourChoice);
  var humanChoice,botChoice;
  humanChoice=yourChoice.id;
  botChoice=numberToChoice(randToRpsInt());
  console.log('Computer choice',botChoice);
  results=decideWinner(humanChoice, botChoice);
  console.log(results);
  message=finalMessage(results);
  console.log(message);
  rpsFrontEnd(yourChoice.id,botChoice,message);
}
function randToRpsInt()
{
  return Math.floor(Math.random()*3);
}

function numberToChoice(number)
{
  return ['rock','paper','scissors'][number];
}

function decideWinner(yourChoice,computerChoice)
{
  var rpsDatabase = {
    'rock': {'scissors':1,'rock':0.5,'paper':0},
    'paper': {'rock':1,'paper':0.5,'scissors':0},
    'scissors': {'paper':1,'scissors':0.5,'rock':0}
    
  };

  var yourScore=rpsDatabase[yourChoice][computerChoice];
  var computerScore=rpsDatabase[computerChoice][yourChoice];

  return [yourScore,computerScore];
}

function finalMessage([yourScore,computerScore])
{
  if(yourScore==0)
  {
    return{message:'You lost!',color:'red'};

  }
  else if(yourScore==0.5)
  {
     return {'messsage':'You tied!',color:'yellow'};
  }
  else{
    return {'messsage':'You won!',color:'green'};
  }
}

function rpsFrontEnd(humanImageChoice,botImageChoice,finalMessage)
{
  var imagesDatabase= {
    'rock':document.getElementById('rock').src,
    'paper':document.getElementById('paper').src,
    'scissors':document.getElementById('scissors').src,
  }
  document.getElementById('rock').remove();
  document.getElementById('paper').remove(); 
  document.getElementById('scissors').remove();

  var humanDiv=document.createElement('div');
  var botDiv=document.createElement('div');
  var messageDiv=document.createElement('div');

  humanDiv.innerHTML="<img src='" + imagesDatabase[humanImageChoice] + "' height=150 width=150 style='box-shadow: 0px 10px 50px rgba(37,50,233,1);'>"
  botDiv.innerHTML="<img src='" + imagesDatabase[botImageChoice] + "' height=150 width=150 style='box-shadow: 0px 10px 50px rgba(243,38,24,1);'>"
  messageDiv.innerHTML="<h1 style='color:" + finalMessage['color'] +"; font-size: 60px; padding: 30px;'>" + finalMessage['message'] + "</h1>" 

  document.getElementById('flex-box-rps-div').appendChild(humanDiv);
  document.getElementById('flex-box-rps-div').appendChild(messageDiv);
  document.getElementById('flex-box-rps-div').appendChild(botDiv);

}

var all_buttons = document.getElementsByTagName('button');
var copyAllButtons = [];
for(let i = 0; i < all_buttons.length; i++){
    copyAllButtons.push(all_buttons[i].classList[1]);
}

function buttonColorChange(ButtonThorn){
    if(ButtonThorn.value == 'red'){
        buttonsRed();
    }
    else if(ButtonThorn.value == 'green'){
        buttonsGreen();
    }
    else if(ButtonThorn.value == 'blue'){
      buttonsBlue();
  }
  else if(ButtonThorn.value == 'yellow'){
    buttonsYellow();
}
    else if(ButtonThorn.value == 'reset'){
        buttonsColorReset();
    }
    else if (ButtonThorn.value == 'random'){
        randomColors();
    }
}

function buttonsRed(){
    for(let i = 0; i < all_buttons.length; i++){
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add('btn-danger');
    }
}
function buttonsYellow(){
  for(let i = 0; i < all_buttons.length; i++){
      all_buttons[i].classList.remove(all_buttons[i].classList[1]);
      all_buttons[i].classList.add('btn-warning');
  }
}
function buttonsBlue(){
  for(let i = 0; i < all_buttons.length; i++){
      all_buttons[i].classList.remove(all_buttons[i].classList[1]);
      all_buttons[i].classList.add('btn-primary');
  }
}

function buttonsGreen(){
    for(let i = 0; i < all_buttons.length; i++){
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add('btn-success');
    }
}

function buttonColorsReset(){
    for(let i = 0; i < all_buttons.length; i++){
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add(copyAllButtons[i]);
    }
}

function randomColors(){
    var choices = ['btn-primary','btn-danger', 'btn-success', 'btn-warning'];
    for(let i = 0; i < all_buttons.length; i++)
    {
        let random = Math.floor(Math.random() * 4);
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add(choices[random]);
    }
}
let blackJackGame={
  'you':{'scoreSpan':'#your-blackjack-result','div':'#your-box','score':0},
  'dealer':{'scoreSpan':'#dealer-blackjack-result','div':'#dealer-box','score':0},
  'cards':['2','3','4','5','6','7','8','9','10','K','J','Q','A'],
  'cardsMap' : {'2' : 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8' : 8, '9': 9, '10' : 10, 'K': 10, 'J': 10, 'Q': 10, 'A': [1,11]},
  'wins': 0,
  'draws': 0,
  'losses': 0,
  'isStand': false,
    'turnsOver': false,
    
};
const yo=blackJackGame['you'];
const deal=blackJackGame['dealer'];
const hitSound=new Audio('static/sounds/swish.m4a');
const winSound = new Audio('static/sounds/cash.mp3');
const lossSound = new Audio('static/sounds/aww.mp3');


document.querySelector('#blackjack-deal-button').addEventListener('click',blackjackDeal);
document.querySelector('#blackjack-stand-button').addEventListener('click',dealerLogic);
document.querySelector('#blackjack-hit-button').addEventListener('click',blackJackHit);
function blackJackHit() {
  if (blackJackGame['isStand'] === false)
    {
  let card=randomCard();
  console.log(card);
  showCard(card,yo);
  updateScore(card, yo);
  showScore(yo);
    }

}

function showCard(card , activePlayer) 
{
  if(activePlayer['score'] <= 21)
    {
  let cardImage =document.createElement('img');
  cardImage.src='static/images/randomCard().png';
  document.querySelector(activePlayer['div']).appendChild(cardImage);
  hitSound.play();
    }
}

function blackjackDeal()
{
 if(blackJackGame['turnsOver']===true)
 {
   blackJackGame['isStand']=false;
  let yourImages=document.querySelector('#your-box').querySelectorAll('img');
  let dealerImages=document.querySelector('#dealer-box').querySelectorAll('img');

  for (i=0 ;i<yourImages.length; i++)
    {
      yourImages[i].remove();
    }
    for(i=0;i<dealerImages.length;i++)
    {
      dealerImages[i].remove();
    }
    yo['score'] = 0;
        deal['score'] = 0;
        
    
        document.querySelector('#your-blackjack-result').textContent = 0;
        document.querySelector('#dealer-blackjack-result').textContent = 0;

        document.querySelector('#your-blackjack-result').style.color = '#ffffff';
        document.querySelector('#dealer-blackjack-result').style.color = '#ffffff';

        document.querySelector('#your-blackjack-result').textContent = "Let's Play";
        document.querySelector('#dealer-blackjack-result').style.color = "black";
        blackJackGame['turnsOver']=true;
  }
}

function randomCard()
{
  let randomIndex=Math.floor(Math.random()*13);
  return blackJackGame['cards'][randomIndex];
}
function updateScore(card, activePlayer){
  //for ace
  if (card == 'A'){
      console.log(blackJackGame['cardsMap'][card][1]);
      if(activePlayer['score'] + blackJackGame['cardsMap'][card][1] <= 21)
      {
          activePlayer['score'] += blackJackGame['cardsMap'][card][1];
      }
      else
      {
          activePlayer['score'] += blackJackGame['cardsMap'][card][0];
      }
  }
  else{
      activePlayer['score'] += blackJackGame['cardsMap'][card];
  }
}

function showScore(activePlayer){
  if(activePlayer['score'] > 21){
      document.querySelector(activePlayer['scoreSpan']).textContent = 'BUST!';
      document.querySelector(activePlayer['scoreSpan']).style.color = 'red';      
  }
  else
  {
      document.querySelector(activePlayer['scoreSpan']).textContent = activePlayer['score']; 
  }
}

function dealerLogic() {
  blackJackGame['isStand']=true;
  let card=randomCard();
  showCard(card,deal);
  updateScore(card,deal);
  showScore(deal);
  
  if (deal['score']>15)
  {   blackJackGame['turnsOver']=true;
    let winner=computeWinner();
    showResult(winner);
    console.log(blackJackGame['turnsOver']);
  }
}

function computeWinner(){
  let winner;
  if (yo['score'] <= 21)
  {
      if (yo['score'] > deal['score'] || deal['score'] > 21)
      {
          blackJackGame['wins']++;
          winner = yo;
          console.log('Its a win');
      }
      else if (yo['score'] < deal['score'])
      {
          blackJackGame['losses']++;
          winner = deal;
          console.log('Its a loss');
      }
      else if (yo['score'] == deal['score'])
      {
          blackJackGame['draw']++;
          console.log('Its a draw');
      }
  }
  else if (yo['score'] > 21 && deal['score'] <=21)
  {
      blackJackGame['losses']++;
      winner = deal;
  }
  else if (yo['score'] > 21 && deal['score'] > 21)
  {
      blackJackGame['draw']++;
      console.log('Draw');
  }
  return winner;
}
function showResult(winner)
{
    let message, messageColor;

    if(blackJackGame['turnsOver'] === true)
    {
        if (winner === yo)
        {
            document.querySelector('#wins').textContent = blackJackGame['wins'];
            message = 'You Won!';
            messageColor = 'green';
            winSound.play();
        }
        else if (winner === deal)
        {
            document.querySelector('#losses').textContent = blackJackGame['losses'];
            message = 'You lost!';
            messageColor = 'red';
            lossSound.play();
        }
        else
        {
            document.querySelector('#draws').textContent = blackJackGame['draws'];
            message = 'Draw';
            messageColor = 'black';
        }
    
        document.querySelector('#blackjack-result').textContent = message;
        document.querySelector('#blackjack-result').style.color = messageColor;
    }


}
