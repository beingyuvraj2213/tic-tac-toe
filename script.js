let boxes = document.querySelectorAll(".box")
let resetBtn = document.querySelector("#reset")
let newBtn = document.querySelector("#newGame")
let winMsg = document.querySelector(".msg")
let turnO = true
let turn = document.querySelector(".turn")
let p1Name = ""
let p2Name = ""
let count = 0
let matchFinish = false

function disableBox() {
    for (let box of boxes) {
        box.disabled = true;
    }
}

disableBox()

function enableBox() {
    for (let box of boxes) {
        box.disabled = false;
    }
    turnO = true;
    matchFinish = false
    showTurn()
}

function boxNew() {
    for (let box of boxes) {
        box.innerHTML = ""
        box.style.backgroundColor = "white"
    }
    winMsg.classList.add("hide")
    count = 0
    enableBox()
}

function scrollToTop() {
    window.scrollTo(0, 0);
}

function showTurn() {
    if (matchFinish) {
        setTimeout(() => {
            turn.innerHTML = `<p id="whoseTurn">Game finished!<br>Checkout out the winner on top</p>`
        }, 1400)
    }
    else {
        if (turnO)
            turn.innerHTML = `<p id="whoseTurn">${p1Name}'s (O) Turn</p>`
        else
            turn.innerHTML = `<p id="whoseTurn">${p2Name}'s (X) Turn</p>`
    }
}

function getName() {
    p1Name = prompt("Enter Player 1 Name")
    p2Name = prompt("Enter Player 2 Name")
    document.querySelector(".battle").innerHTML = `<h3>Lets Begin The Battle<br><br>
    ${p1Name}   V/s   ${p2Name}<br>
    <pre>O    X</pre></h3>`
    boxNew()

    resetBtn.classList.remove("hide")

    const audio = new Audio();
    audio.src = "./Audio/matchStart.mp3"
    audio.play()
    showTurn()
}

newBtn.addEventListener(("click"), getName)

let winningPattern = [
    ['0', '1', '2'],
    ['3', '4', '5'],
    ['6', '7', '8'],
    ['0', '3', '6'],
    ['1', '4', '7'],
    ['2', '5', '8'],
    ['0', '4', '8'],
    ['2', '4', '6']
]

function checkWinner() {

    a: {
        showTurn();
        count++;
        for (let pattern of winningPattern) {
            let pos0 = boxes[pattern[0]];
            let pos1 = boxes[pattern[1]];
            let pos2 = boxes[pattern[2]];

            if (pos0.innerText != "" && pos1.innerText != "" && pos2.innerText != "") {
                if (pos0.innerText == pos1.innerText && pos1.innerText == pos2.innerText) {
                    if (pos0.innerText == 'O') {
                        disableBox()
                        const audio = new Audio();
                        audio.src = "./Audio/winSound.mp3"

                        setTimeout(() => {
                            boxes[pattern[0]].style.backgroundColor = "#6aca6f"
                        }, 500)
                        setTimeout(() => {
                            boxes[pattern[1]].style.backgroundColor = "#6aca6f"
                        }, 900)
                        setTimeout(() => {
                            boxes[pattern[2]].style.backgroundColor = "#6aca6f"
                        }, 1400)


                        setTimeout(() => {
                            winnerMsg(p1Name)
                            scrollToTop()
                        }, 2500)


                        audio.play()
                        matchFinish = true
                        showTurn()
                        break a;
                    }
                    else {
                        disableBox()
                        const audio = new Audio();
                        audio.src = "./Audio/winSound.mp3"

                        setTimeout(() => {
                            boxes[pattern[0]].style.backgroundColor = "#6aca6f"
                        }, 500)
                        setTimeout(() => {
                            boxes[pattern[1]].style.backgroundColor = "#6aca6f"
                        }, 900)
                        setTimeout(() => {
                            boxes[pattern[2]].style.backgroundColor = "#6aca6f"
                        }, 1400)

                        setTimeout(() => {
                            winnerMsg(p2Name)
                            scrollToTop()
                        }, 2500)


                        audio.play()
                        matchFinish = true
                        showTurn()
                        break a;
                    }
                }
            }
        }

        if (count == 9) {
            matchTie()
        }
    }
}


function matchTie() {
    winMsg.classList.remove("hide")
    winMsg.innerHTML = `<p id="msg">Match Tied<br>
Nobody Won!<br>
Lets Go for one more match
<br>
</p>`
    count = 0
    disableBox()
    scrollToTop()
    const audio = new Audio();
    audio.src = "./Audio/winSound.mp3"
    audio.play()
}


function winnerMsg(winner) {
    winMsg.classList.remove("hide")
    winMsg.innerHTML = `<p id="msg">Winner is ${winner}<br>
Congratulations!<br>
<br>
You won......
</p>`
    setTimeout(() => {
        winMsg.innerHTML += `<p id="sarcasm"><b>So many blessings from us 😉</b></p>`
    }, 2000)
}

boxes.forEach((box) => {
    box.addEventListener("click", () => {

        const audio = new Audio();
        audio.src = "./Audio/clickSound.mp3"
        audio.play()

        if (turnO) {
            box.innerText = "O"
            turnO = false
        }
        else {
            box.innerText = "X"
            turnO = true
        }
        box.disabled = true
        checkWinner()

    })
})

resetBtn.addEventListener(("click"), () => {
    {
        for (let box of boxes) {
            box.innerHTML = ""
            box.style.backgroundColor = "white"
        }
        enableBox()
        count = 0;
        winMsg.classList.add("hide")
        showTurn()
    }
})

