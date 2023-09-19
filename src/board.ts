import { Position } from "../tools/typeChecking"
import { Cheese } from "./cheeses"
import { Player } from "./player"

export class Board {
    // the cheeses on the board or not
    private _state: Map<Position, Cheese | null>
    private _round: number = 1

    constructor() {
        this._state = new Map<Position, Cheese | null>()
        this.initializeBoard()
    }
    initializeBoard() {
        const CHEESE_POSITION = [
            "A1",
            "A4",
            "A7",
            "B2",
            "B4",
            "B6",
            "C3",
            "C4",
            "C5",
            "D1",
            "D2",
            "D3",
            "D5",
            "D6",
            "D7",
            "E3",
            "E4",
            "E5",
            "F2",
            "F4",
            "F6",
            "G1",
            "G4",
            "G7",
        ]
        CHEESE_POSITION.forEach((position) => {
            this._state.set(position as Position, null)
        })
    }

    get state(): Map<Position, Cheese | null> {
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
}
