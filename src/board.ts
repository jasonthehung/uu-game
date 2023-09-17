import { Cheeses } from "./cheese"

export class Board {
    private _cheeses: Cheeses

    constructor() {
        this._cheeses = new Map()
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
