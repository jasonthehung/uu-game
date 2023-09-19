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
        this.player1 = new Player("Player 1", false, "¢")
        this.player2 = new Player("Player 2", true, "ß")
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
            const response = await this.getPlayerMove(currentPlayer, this.board)
            p1.moved = !p1.moved
            p2.moved = !p2.moved
            this.board.round++

            // @ TODO
            await this.updateBoard(this.board, currentPlayer, response)
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

    // @ TODO
    async updateBoard(board: Board, player: Player, response: Cheese) {
        board.round++

        if (!board.state.has(response.position as Position)) {
            board.state.set(response.position as Position, response)
        } else {
            throw new Error("Bug: Duplicate position !!!")
        }
    }

    async getPlayerMove(player: Player, board: Board) {
        console.log(`Round [${board.round}]: ${player.name}'s turn`)

        let response: Cheese | null = null
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
                    response = new Cheese(player, input)
                    player.cheeses.add(response)
                    player.moves++
                    isValid = true
                }
            }
        }

        player.moved = false

        return response as Cheese
    }
}

const main = new Main()

main.start()
