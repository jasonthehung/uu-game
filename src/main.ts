import { isValidType } from "../tools/typeChecking"
import { getUserInput } from "../tools/getUserInput"
import { playerRoundChecking } from "../tools/playerRoundChecking"
import { Board } from "./board"
import { Cheese, Position } from "./cheeses"
import { Player } from "./player"
import * as readline from "readline"

class Main {
    private board: Board
    private player1: Player
    private player2: Player
    private round: number
    private playerOneInputs: Position[]
    private playerTwoInputs: Position[]

    constructor() {
        this.board = new Board()
        this.player1 = new Player("Player 1", true)
        this.player2 = new Player("Player 2", false)
        this.round = 1
        this.playerOneInputs = []
        this.playerTwoInputs = []
    }

    // start the game
    async start() {
        // print the board
        this.board.printBoard()

        // p1 and p2 place their cheeses before the game starts
        while (
            this.player1.getRemainingCheesesToPlace > 0 ||
            this.player2.getRemainingCheesesToPlace > 0
        ) {
            const response = playerRoundChecking(
                this.player1.getPlayerMovable,
                this.player2.getPlayerMovable
            )
            let isValid = false

            switch (response) {
                case "P1":
                    console.log(
                        `Round ${this.round}: ${this.player1.getPlayerName}'s turn`
                    )

                    while (!isValid) {
                        const input = await getUserInput()

                        if (!isValidType(input)) {
                            console.log("Invalid input type, please try again.")
                        } else {
                            // update cheese object
                            // update player object

                            isValid = true
                        }
                    }

                    this.player1.setPlayerMovable = false
                    this.player2.setPlayerMovable = true
                    this.player1.decrementCheesesToPlace()
                    break

                case "P2":
                    console.log(
                        `Round ${this.round}: ${this.player2.getPlayerName}'s turn`
                    )

                    while (!isValid) {
                        const input = await getUserInput()

                        if (!isValidType(input)) {
                            console.log("Invalid input type, please try again.")
                        } else {
                            isValid = true
                        }
                    }

                    this.player1.setPlayerMovable = true
                    this.player2.setPlayerMovable = false
                    this.player2.decRemainingCheesesToPlace()
                    break
            }

            this.round++
        }

        // // Add an event listener to handle close event if needed
        // rl.on("close", () => {
        //     console.log("User inputs recorded:")
        //     this.playerOneInputs.forEach((input, index) => {
        //         console.log(`${index + 1}: ${input}`)
        //     })
        //     process.exit(0) // Optionally, exit the process gracefully
        // })
    }
}

const main = new Main()

main.start()
