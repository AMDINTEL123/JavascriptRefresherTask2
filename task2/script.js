document.addEventListener('DOMContentLoaded', () => {
    const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
    const gameBoard = document.getElementById('game-board');
    let cards = [];
    let flippedCards = [];
    let matchedCount = 0;

    // Duplicate letters to create pairs and shuffle them
    const shuffledLetters = [...letters, ...letters].sort(() => Math.random() - 0.5);

    // Create card elements
    shuffledLetters.forEach(letter => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.letter = letter;

        const front = document.createElement('div');
        front.classList.add('front');
        front.textContent = '';

        const back = document.createElement('div');
        back.classList.add('back');
        back.textContent = letter;

        card.appendChild(front);
        card.appendChild(back);

        card.addEventListener('click', () => flipCard(card));
        cards.push(card);
        gameBoard.appendChild(card);
    });

    function flipCard(card) {
        if (flippedCards.length < 2 && !card.classList.contains('flipped') && !card.classList.contains('matched')) {
            card.classList.add('flipped');
            flippedCards.push(card);

            if (flippedCards.length === 2) {
                checkMatch();
            }
        }
    }

    function checkMatch() {
        const [card1, card2] = flippedCards;

        if (card1.dataset.letter === card2.dataset.letter) {
            card1.classList.add('matched');
            card2.classList.add('matched');
            matchedCount += 2;
            flippedCards = [];

            if (matchedCount === cards.length) {
                alert('You win!');
            }
        } else {
            setTimeout(() => {
                card1.classList.remove('flipped');
                card2.classList.remove('flipped');
                flippedCards = [];
            }, 1000);
        }
    }
});