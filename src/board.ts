import { Cheese } from "./cheese"

export class Board {
    private _cheeses: Cheese[]

    constructor() {
        this._cheeses = []
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

    updateBoard(cheese: Cheese) {}
}
