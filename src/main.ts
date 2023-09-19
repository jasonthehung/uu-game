import { Position, isValidType } from "../tools/typeChecking"
import { getUserInput } from "../tools/getUserInput"
import { playerRoundChecking } from "../tools/playerRoundChecking"
import { Board } from "./board"
import { Cheese } from "./cheeses"
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
        this.player1 = new Player("Player 1", true, "¢")
        this.player2 = new Player("Player 2", false, "ß")
        this.round = 1
        this.playerOneInputs = []
        this.playerTwoInputs = []
    }

    // start the game
    async start() {
        // print the board
        this.board.printBoard()

        // assign the player object to p1, p2 variable
        let p1 = this.player1
        let p2 = this.player2

        // p1 and p2 place their cheeses before the game starts
        while (p1.cheeses.size < 9 || p2.cheeses.size < 9) {
            const player = playerRoundChecking(p1.moved, p2.moved)
            let isValid = false

            switch (player) {
                case "P1":
                    console.log(`Round [${this.round}]: ${p1.name}'s turn`)

                    while (!isValid) {
                        const input = await getUserInput()

                        if (!isValidType(input)) {
                            console.log("Invalid input type, please try again.")
                        } else {
                            if (this.board.state.get(input) !== null) {
                                console.log(
                                    "You have already placed a cheese here, please try again."
                                )
                            } else {
                                p1.cheeses.add(new Cheese(input))
                                // 紀錄玩家的總步數
                                p1.moves = p1.moves + 1

                                isValid = true
                            }
                        }
                    }

                    p1.moved = false
                    p2.moved = true
                    break

                case "P2":
                    console.log(`Round [${this.round}]: ${p2.name}'s turn`)

                    while (!isValid) {
                        const input = await getUserInput()

                        if (!isValidType(input)) {
                            console.log("Invalid input type, please try again.")
                        } else {
                            // add Cheese to player's cheese set
                            p2.cheeses.add(new Cheese(input))
                            // 紀錄玩家的總步數
                            p2.moves = p2.moves + 1

                            isValid = true
                        }
                    }

                    p1.moved = true
                    p2.moved = false
                    break
            }

            this.round++
        }

        console.log(this.player1.cheeses)

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
