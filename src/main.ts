import { isValidType } from "../tools/typeChecking"
import { Board } from "./board"
import { Position } from "./cheese"
import { Player } from "./player"
import * as readline from "readline"

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
})

class Main {
    private board: Board
    private player1: Player
    private player2: Player
    private remainingRounds: number

    constructor() {
        this.board = new Board()
        this.player1 = new Player("Player 1")
        this.player2 = new Player("Player 2")
        this.remainingRounds = 300
    }

    start() {
        this.board.printBoard()

        const playerOneInputs: Position[] = []
        const playerTwoInputs: Position[] = []

        function processInput(input: string) {
            if (input.toLowerCase() === "exit") {
                // If the user types "exit," close the readline interface
                rl.close()
            } else {
                if (isValidType(input.toUpperCase())) {
                    // Record the input and continue reading more input
                    playerOneInputs.push(input as Position)

                    rl.question(
                        'Enter another input (or type "exit" to quit): ',
                        processInput
                    )
                } else {
                    rl.question(
                        "Invalid input, please try again: ",
                        processInput
                    )
                }
            }
        }

        rl.question('Enter an input (or type "exit" to quit): ', processInput)

        // Add an event listener to handle close event if needed
        rl.on("close", () => {
            console.log("User inputs recorded:")
            playerOneInputs.forEach((input, index) => {
                console.log(`${index + 1}: ${input}`)
            })
            process.exit(0) // Optionally, exit the process gracefully
        })
    }
}

const main = new Main()

main.start()
