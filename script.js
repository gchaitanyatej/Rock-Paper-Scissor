const choices = ['rock', 'paper', 'scissors'];
let playerScore = parseInt(localStorage.getItem('playerScore')) || 0;
let computerScore = parseInt(localStorage.getItem('computerScore')) || 0;

const buttons = document.querySelectorAll('.choice');
const playerScoreBox = document.getElementById('playerScore');
const computerScoreBox = document.getElementById('computerScore');
const resultDiv = document.getElementById('result');
const nextButton = document.getElementById('next');
const restartButton = document.getElementById('restart');
const rulesButton = document.getElementById('rules-btn');
const modal = document.getElementById('rules-modal');
const winMessageModal = document.getElementById('win-message-modal');
const closeModal = document.querySelector('.close');
const playAgainButton = document.getElementById('play-again');

updateScoreDisplay();

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const playerChoice = button.id;
        const computerChoice = getComputerChoice();
        const winner = determineWinner(playerChoice, computerChoice);
        displayResult(winner, playerChoice, computerChoice);
        updateScores(winner);
    });
});

function getComputerChoice() {
    const randomIndex = Math.floor(Math.random() * 3);
    return choices[randomIndex];
}

function determineWinner(player, computer) {
    if (player === computer) {
        return 'tie';
    }
    if (
        (player === 'rock' && computer === 'scissors') ||
        (player === 'paper' && computer === 'rock') ||
        (player === 'scissors' && computer === 'paper')
    ) {
        return 'player';
    } else {
        return 'computer';
    }
}

function displayResult(winner, playerChoice, computerChoice) {
    if (winner === 'tie') {
        resultDiv.textContent = `It's a tie! You both chose ${playerChoice}.`;
    } else if (winner === 'player') {
        resultDiv.textContent = `You win! ${playerChoice} beats ${computerChoice}.`;
        resultDiv.classList.add('celebration');
        nextButton.style.display = 'inline-block';
    } else {
        resultDiv.textContent = `You lose! ${computerChoice} beats ${playerChoice}.`;
        resultDiv.classList.remove('celebration');
    }
}

function updateScores(winner) {
    if (winner === 'player') {
        playerScore++;
    } else if (winner === 'computer') {
        computerScore++;
    }
    localStorage.setItem('playerScore', playerScore);
    localStorage.setItem('computerScore', computerScore);
    updateScoreDisplay();
}

function updateScoreDisplay() {
    playerScoreBox.textContent = `Player: ${playerScore}`;
    computerScoreBox.textContent = `Computer: ${computerScore}`;
}

restartButton.addEventListener('click', () => {
    playerScore = 0;
    computerScore = 0;
    localStorage.setItem('playerScore', playerScore);
    localStorage.setItem('computerScore', computerScore);
    updateScoreDisplay();
    resultDiv.textContent = 'Make your move!';
    resultDiv.classList.remove('celebration');
    nextButton.style.display = 'none';
});

nextButton.addEventListener('click', () => {
    winMessageModal.style.display = 'block';
});

// Rules modal
rulesButton.addEventListener('click', () => {
    modal.style.display = 'block';
});

closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
});

window.addEventListener('click', (event) => {
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});

playAgainButton.addEventListener('click', () => {
    winMessageModal.style.display = 'none';
    window.location.reload();
});
