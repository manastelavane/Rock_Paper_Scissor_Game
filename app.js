// const confetti=require('./confetti');
let namep="";
let pScore=0;
let cScore=0;
let flag=1;
const game = () => {
  pScore = 0;
  cScore = 0;
  //Start the Game
  const startGame = () => {
    const playBtn = document.querySelector(".intro button");
    const introScreen = document.querySelector(".intro");
    const match = document.querySelector(".match");
    playBtn.addEventListener("click", () => {
      introScreen.classList.add("fadeOut");
      namep=document.getElementById('namep').value;
      namep=namep.charAt(0).toUpperCase()+namep.slice(1);
      if(namep==""){
        namep="Player";
      }
      document.getElementById('changep').innerHTML=namep;
      match.classList.add("fadeIn");
    });
  };
  //Play Match
  const playMatch = () => {
    const options = document.querySelectorAll(".options button");
    const playerHand = document.querySelector(".player-hand");
    const computerHand = document.querySelector(".computer-hand");
    const hands = document.querySelectorAll(".hands img");

    hands.forEach(hand => {
      hand.addEventListener("animationend", function() {
        this.style.animation = "";
      });
    });
    //Computer Options
    const computerOptions = ["rock", "paper", "scissors"];

    options.forEach(option => {
      option.addEventListener("click", function() {
        //Computer Choice
        const computerNumber = Math.floor(Math.random() * 3);
        const computerChoice = computerOptions[computerNumber];

        setTimeout(() => {
          //Here is where we call compare hands
          compareHands(this.textContent, computerChoice);
          //Update Images
          playerHand.src = `./${this.textContent}.png`;
          computerHand.src = `./${computerChoice}.png`;
        }, 2000);
        //Animation
        playerHand.style.animation = "shakePlayer 2s ease";
        computerHand.style.animation = "shakeComputer 2s ease";
        // console.log("hi");
      });
    });
  };
  
  const updateScore = () => {
    const playerScore = document.querySelector(".player-score p");
    const computerScore = document.querySelector(".computer-score p");
    playerScore.textContent = pScore;
    computerScore.textContent = cScore;
    if(pScore==4 || cScore==4){
      const match = document.querySelector(".match");
      const congrats = document.querySelector(".congrats");
      const score = document.querySelector(".score");
      if(pScore==4){
        document.getElementsByClassName("congo1")[0].textContent="Congratulations!!";
        document.getElementsByClassName("congo2")[0].textContent="You Won.";
      }else{
        document.getElementsByClassName("congo1")[0].textContent="Better Luck Next Time!";
        document.getElementsByClassName("congo2")[0].textContent="You Loss.";
      }
      match.classList.remove("fadeIn");
      congrats.classList.add("fadeIn");
      score.classList.add("fadeOut");
      const startc=()=>{
        setTimeout(function(){
            confetti.start();
        },100);
      };
      startc();
      const restart = document.querySelector(".restart");
      restart.addEventListener("click", () => {
        const match = document.querySelector(".match");
        const congrats = document.querySelector(".congrats");
        const score = document.querySelector(".score");
        const winner = document.querySelector(".winner");
        function stopc(){
          confetti.stop();
        }
        congrats.classList.remove("fadeIn");
        match.classList.add("fadeIn");
        score.classList.remove("fadeOut");
        playerScore.textContent = 0;
        computerScore.textContent = 0;
        pScore=0;
        cScore=0;
        flag=0;
        winner.textContent="Choose an option";
        stopc();
        
      });
    }
  };

  const compareHands = (playerChoice, computerChoice) => {
    //Update Text
    const winner = document.querySelector(".winner");
    //Checking for a tie
    if (playerChoice === computerChoice) {
      winner.textContent = "It is a tie";
      return;
    }
    //Check for Rock
    if (playerChoice === "rock") {
      if (computerChoice === "scissors") {
        winner.textContent = namep+" Wins";
        pScore++;
        updateScore();
        return;
      } else {
        winner.textContent = "Computer Wins";
        cScore++;
        updateScore();
        return;
      }
    }
    //Check for Paper
    if (playerChoice === "paper") {
      if (computerChoice === "scissors") {
        winner.textContent = "Computer Wins";
        cScore++;
        updateScore();
        return;
      } else {
        winner.textContent = namep+" Wins";;
        pScore++;
        updateScore();
        return;
      }
    }
    //Check for Scissors
    if (playerChoice === "scissors") {
      if (computerChoice === "rock") {
        winner.textContent = "Computer Wins";
        cScore++;
        updateScore();
        return;
      } else {
        winner.textContent = namep+" Wins";;
        pScore++;
        updateScore();
        return;
      }
    }
  };

  //Is call all the inner function
  if(flag==1){
    startGame();
  }
  playMatch();
};

//start the game function
game();
