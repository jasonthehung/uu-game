import { Position } from "../tools/typeChecking"
import { PIECES_POSITION } from "./config"
import { Piece } from "./pieces"

export class Board {
    // the pieces on the board or not
    private _state: Map<Position | null, Piece | null>
    private _round: number = 1

    constructor() {
        this._state = new Map<Position | null, Piece | null>()
        // this.initializeBoard()
    }
    // initializeBoard() {
    //     PIECES_POSITION.forEach((position) => {
    //         this._state.set(position as Position, null)
    //     })
    // }

    get state(): Map<Position | null, Piece | null> {
        return this._state
    }

    get round(): number {
        return this._round
    }

    set round(round: number) {
        this._round = round
    }

    async printBoard() {
        const P = []

        for (const position of PIECES_POSITION) {
            P.push(
                this._state.get(position as Position)?.belongTo?.icon ||
                    position
            )
        }

        console.log(
            `
        7   ${P[2]} ----------------- ${P[14]} ----------------- ${P[23]}
            |                    |                    |
        6   |     ${P[5]} ------------${P[13]}------------ ${P[20]}    |
            |     |              |              |     |
        5   |     |      ${P[8]}------${P[12]}------${P[17]}     |     |
            |     |      |                |     |     |
        4   ${P[1]} -- ${P[4]} --- ${P[7]}              ${P[16]} --- ${P[19]} -- ${P[22]}
            |     |      |                |     |     |
        3   |     |      ${P[6]}------${P[11]}------${P[15]}     |     |
            |     |              |              |     |
        2   |     ${P[3]} ----------- ${P[10]} ----------- ${P[18]}    |
            |                    |                    |
        1   ${P[0]} ----------------- ${P[9]} ----------------- ${P[21]}

            A      B      C       D       E      F     G
            `
        )
    }

    // @ TODO: 應該還要有狀態改變的參數
    async updateBoard(board: Board, response: Piece) {
        const position = response.position as Position

        if (!board.state.has(position)) {
            board.state.set(position, response)
        } else {
            throw new Error("Bug: Duplicate position !!!")
        }
        board.round++
    }

    // printBoard() {
    //     console.log(`
    //         A7 ----------------- D7 ----------------- G7
    //         |                    |                    |
    //         |     B6 ------------D6------------ F6    |
    //         |     |              |              |     |
    //         |     |      C5 ---- D5 ---- E5     |     |
    //         |     |      |                |     |     |
    //         A4 -- B4 --- C4              E4 --- F4 -- G4
    //         |     |      |                |     |     |
    //         |     |      C3 -----D3----- E3     |     |
    //         |     |              |              |     |
    //         |     B2 ----------- D2 ----------- F2    |
    //         |                    |                    |
    //         A1 ----------------- D1 ----------------- G1
    //         `)
    // }
}
