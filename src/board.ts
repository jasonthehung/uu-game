import { Position } from "../tools/typeChecking"
import { CHEESE_POSITION } from "./config"
import { Cheese } from "./cheeses"

export class Board {
    // the cheeses on the board or not
    private _state: Map<Position | null, Cheese | null>
    private _round: number = 1

    constructor() {
        this._state = new Map<Position | null, Cheese | null>()
        // this.initializeBoard()
    }
    // initializeBoard() {
    //     CHEESE_POSITION.forEach((position) => {
    //         this._state.set(position as Position, null)
    //     })
    // }

    get state(): Map<Position | null, Cheese | null> {
        return this._state
    }

    get round(): number {
        return this._round
    }

    set round(round: number) {
        this._round = round
    }

    printBoard() {
        console.log(`
            A7 ----------------- D7 ----------------- G7
            |                    |                    |
            |     B6 ------------D6------------ F6    |
            |     |              |              |     |
            |     |      C5 ---- D5 ---- E5     |     |
            |     |      |                |     |     |
            A4 -- B4 --- C4              E4 --- F4 -- G4   
            |     |      |                |     |     |
            |     |      C3------D3------E3     |     |
            |     |              |              |     |
            |     B2 ----------- D2 ----------- F2    |
            |                    |                    |
            A1 ----------------- D1 ----------------- G1
            `)
    }

    printBoardA() {
        const P = []

        for (const position of CHEESE_POSITION) {
            P.push(
                this._state.get(position as Position)?.belongTo?.icon ||
                    position
            )
        }

        console.log(`
            ${P[2]} ----------------- ${P[14]} ----------------- ${P[23]}
            |                    |                    |
            |     ${P[5]} ------------${P[13]}------------ ${P[20]}    |
            |     |              |              |     |
            |     |      ${P[7]} ---- ${P[12]} ---- ${P[17]}     |     |
            |     |      |                |     |     |
            ${P[1]} -- ${P[4]} --- ${P[11]}              ${P[16]} --- ${P[19]} -- ${P[22]}
            |     |      |                |     |     |
            |     |      ${P[6]}------${P[10]}------${P[15]}     |     |
            |     |              |              |     |
            |     ${P[3]} ----------- ${P[9]} ----------- ${P[18]}    |
            |                    |                    |
            ${P[0]} ----------------- ${P[8]} ----------------- ${P[21]}
            `)
    }
}
