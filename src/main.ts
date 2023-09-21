import { Board } from "./board"
import { Piece } from "./pieces"
import { Player } from "./player"
import { Rules } from "../tools/rules"

class Main {
    private _board: Board
    private _rules: Rules
    private _player1: Player
    private _player2: Player

    constructor() {
        this._board = new Board()
        this._rules = new Rules()
        this._player1 = new Player("Player 1", false, "⚫️")
        this._player2 = new Player("Player 2", true, "⚪️")
    }

    // start the game
    async start() {
        // print the board
        this._board.printBoard()

        // assign the player object to p1, p2 variable
        let p1 = this._player1
        let p2 = this._player2

        // 雙方放置棋子，直到雙方都放置了 9 個棋子
        while (p1.pieces.size < 4 || p2.pieces.size < 4) {
            // 決定當前要放置棋子的玩家是誰
            const currentPlayer = p1.moved ? p2 : p1
            // 開始放置棋子
            const response = await currentPlayer.placeCheese(
                currentPlayer,
                this._board,
                false
            )
            // 回合交換
            p1.moved = !p1.moved
            p2.moved = !p2.moved

            // 更新棋盤
            await this._board.updateBoard(this._board, response)
            // 印出棋盤
            await this._board.printBoard()
        }

        // Moving stage
        console.log(
            "============================= [ Moving stage ] ============================="
        )

        // 開始移動棋子
        // 結束條件：
        // 1. 其中一方棋子數量少於 3 個
        // 2. 其中一方無法移動棋子
        while (p1.pieces.size >= 3 && p2.pieces.size >= 3) {
            const currentPlayer = p1.moved ? p2 : p1
            console.log(
                `Round [${this._board.round}]: ${currentPlayer.name}'s turn`
            )

            // 選擇要移動的棋子
            const seletedCheese = await currentPlayer.selectCheese(
                currentPlayer,
                this._board
            )

            // 選擇要移動到的位置
            await currentPlayer.moveCheeseTo(
                currentPlayer,
                this._board,
                (seletedCheese as Piece) || null,
                this._rules.movingRules
            )

            // 回合交換
            p1.moved = !p1.moved
            p2.moved = !p2.moved

            // 更新棋盤
            // await this.board.updateBoard(this.board, response)
            // 印出棋盤
            await this._board.printBoard()
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
