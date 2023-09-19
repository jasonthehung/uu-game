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
    private playerOneInputs: Position[]
    private playerTwoInputs: Position[]

    constructor() {
        this.board = new Board()
        this.player1 = new Player("Player 1", true, "¢")
        this.player2 = new Player("Player 2", false, "ß")
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

        while (p1.cheeses.size < 9 || p2.cheeses.size < 9) {
            const currentPlayer = p1.moved ? p2 : p1
            await this.getPlayerMove(currentPlayer, this.board)
            p1.moved = !p1.moved
            p2.moved = !p2.moved
            this.board.round++
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

    async getPlayerMove(player: Player, board: Board) {
        console.log(`Round [${board.round}]: ${player.name}'s turn`)

        let isValid = false

        while (!isValid) {
            const input = await getUserInput()

            if (!isValidType(input)) {
                console.log("Invalid input type, please try again.")
            } else {
                const existingCheese = board.state.get(input)

                if (existingCheese !== null) {
                    console.log(
                        "You have already placed a cheese here, please try again."
                    )
                } else {
                    player.cheeses.add(new Cheese(input))
                    player.moves++
                    isValid = true
                }
            }
        }

        player.moved = false
    }
}

const main = new Main()

main.start()
