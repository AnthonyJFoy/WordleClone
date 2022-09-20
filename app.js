
const tileDisplay = document.querySelector('.tile-container') // takes the tile-container class and puts it in a constant variable
const keyboard = document.querySelector('.key-container')
const messageDisplay = document.querySelector('.message-container')

const randomNumberGenerator = Math.floor(Math.random() * 50);
console.log('random number is ',randomNumberGenerator)
const wordleWords = [
    'ABUSE',
    'ADULT',
    'AGENT',
    'ANGER',
    'APPLE',
    'AWARD',
    'BASIS',
    'BEACH',
    'BIRTH',
    'BLOCK',
    'BLOOD',
    'BOARD',
    'BRAIN',
    'BREAD',
    'BREAK',
    'BROWN',
    'BUYER',
    'CAUSE',
    'CHAIN',
    'CHAIR',
    'CHEST',
    'CHIEF',
    'CHILD',
    'CHINA',
    'CLAIM',
    'CLASS',
    'CLOCK',
    'COACH',
    'COAST',
    'COURT',
    'COVER',
    'CREAM',
    'CRIME',
    'CROSS',
    'CROWD',
    'CROWN',
    'CYCLE',
    'DANCE',
    'DEATH',
    'DEPTH',
    'DOUBT',
    'DRAFT',
    'DRAMA',
    'DREAM',
    'DRESS',
    'DRINK',
    'DRIVE',
    'EARTH',
    'ENEMY',
    'ENTRY',
    'ERROR',
    'EVENT',
    'FAITH',
    'FAULT',
    'FIELD',
    'FIGHT',
    'FINAL',
    'FLOOR'
]

const wordle = wordleWords[randomNumberGenerator]
console.log(wordle) // show wordle for testing purposes
let score = 0

const keys = [ // Array of keys
    'Q',
    'W',
    'E',
    'R',
    'T',
    'Y',
    'U',
    'I',
    'O',
    'P',
    'A',
    'S',
    'D',
    'F',
    'G',
    'H',
    'J',
    'K',
    'L',
    'ENTER',
    'Z',
    'X',
    'C',
    'V',
    'B',
    'N',
    'M',
    '<<',
]
const guessRows = [
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', '']
]

let currentRow = 0
let currentTile = 0
let isGameOver = false

guessRows.forEach((guessRow, guessRowIndex) => { // forEach method states what to do with each array in the variable declared. E.g. guessRows variable.
    const rowElement = document.createElement('div')  // create a div element
    rowElement.setAttribute('id', 'guessRow-' + guessRowIndex) // Give the div an id attribute
    guessRow.forEach((guess, guessIndex) => {
        const tileElement = document.createElement('div')
        tileElement.setAttribute('id', 'guessRow-' + guessRowIndex + '-tile' + guessIndex)
        tileElement.classList.add('tile') // adds the class 'tile' to each tileElement to return the CSS styling
        rowElement.append(tileElement)
    })
    tileDisplay.append(rowElement) // put the row element into the tile display
})

keys.forEach(key => {
    const buttonElement = document.createElement('button') // created variable for buttonElement
    buttonElement.textContent = key // added text to each key
    buttonElement.setAttribute('id', key)
    buttonElement.addEventListener('click', () => handleClick(key))
    keyboard.append(buttonElement) // put in keyboard
})

const handleClick = (letter) => {
    console.log('clicked', letter) // when clicking on tile will tell the console in F12 which letter is clicked
    if (letter === '<<') { // if chosen letter is << or ENTER do these, if not then addLetter(letter)
        deleteLetter() // function below, calls this if << is pressed.
        console.log('guessRows', guessRows)
        return
    }
    if (letter === 'ENTER') {
        checkRow()
        console.log('guessRows', guessRows)
        return
    }
    addLetter(letter) // runs the function below when clicked on
    console.log('guessRows', guessRows)
}

const addLetter = (letter) => {
    if (currentTile < 5 && currentRow < 6) { // if current tile less than 6 and current row less than 6 do this. Keep board strict, can't action if outside of board.
        const tile = document.getElementById('guessRow-' + currentRow + '-tile' + currentTile)
        tile.textContent = letter
        guessRows[currentRow][currentTile] = letter
        tile.setAttribute('data', letter)
        currentTile++
        console.log('guessRows', guessRows)
    }

}

const deleteLetter = () => {
    if (currentTile > 0) { // only function if current tile is greater than 0.
        currentTile-- // select previous tile
        const tile = document.getElementById('guessRow-' + currentRow + '-tile' + currentTile) // select the correct tile element
        tile.textContent = '' // make tile content empty string
        guessRows[currentRow][currentTile] = '' // make empty string
        tile.setAttribute('data', '')
    }

}

const checkRow = () => {
    const guess = guessRows[currentRow].join('')

    if (currentTile > 4) {
        flipTile()
        if (wordle == guess) {
            showMessage('Nailed It!')
            isGameOver = true
            return
        } else {
            if (currentRow >=5) {
                isGameOver = true
                showMessage('Game Over')
                return
            }
            if (currentRow < 5) {
                currentRow++
                currentTile = 0
            }
        }
    }
}

const showMessage = (message) => {
    const messageElement = document.createElement('p') // creates a <p> paragraph
    messageElement.textContent = message // put the message in the <p>
    messageDisplay.append(messageElement) // put the message in the message-container
    setTimeout(() => messageDisplay.removeChild(messageElement), 3000) // removes message after 3000 mili seconds
}

const addColorToKey = (keyLetter, color) => {
    const key = document.getElementById(keyLetter)
    key.classList.add(color)
}

const flipTile = () => {
    const rowTiles = document.querySelector('#guessRow-' + currentRow).childNodes
    let checkWordle = wordle
    const guess = []

    rowTiles.forEach(tile => {
        guess.push({letter: tile.getAttribute('data'), color: 'grey-overlay'})
    })

    guess.forEach((guess, index) => {
        if (guess.letter == wordle[index]) {
            guess.color = 'green-overlay'
            checkWordle = checkWordle.replace(guess.letter, '')
        }
    })

    guess.forEach(guess => {
        if (checkWordle.includes(guess.letter)) {
            guess.color = 'yellow-overlay'
            checkWordle = checkWordle.replace(guess.letter, '')
        }
    })

    rowTiles.forEach((tile, index) => {
        setTimeout(() => {
            tile.classList.add('flip')
            tile.classList.add(guess[index].color)
            addColorToKey(guess[index].letter, guess[index].color)
        }, 500 * index)
    })
}

