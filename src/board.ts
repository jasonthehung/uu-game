import { Cheese, Position } from "./cheese"
import { Player } from "./player"

export class Board {
    private _cheeses: Map<Position, Cheese>

    constructor() {
        this._cheeses = new Map<Position, Cheese>([
            ["A1", new Cheese("A1")],
            ["A4", new Cheese("A4")],
            ["A7", new Cheese("A7")],
            ["B2", new Cheese("B2")],
            ["B4", new Cheese("B4")],
            ["B6", new Cheese("B6")],
            ["C3", new Cheese("C3")],
            ["C4", new Cheese("C4")],
            ["C5", new Cheese("C5")],
            ["D1", new Cheese("D1")],
            ["D2", new Cheese("D2")],
            ["D3", new Cheese("D3")],
            ["D5", new Cheese("D5")],
            ["D6", new Cheese("D6")],
            ["D7", new Cheese("D7")],
            ["E3", new Cheese("E3")],
            ["E4", new Cheese("E4")],
            ["E5", new Cheese("E5")],
            ["F2", new Cheese("F2")],
            ["F4", new Cheese("F4")],
            ["F6", new Cheese("F6")],
            ["G1", new Cheese("G1")],
            ["G4", new Cheese("G4")],
            ["G7", new Cheese("G7")],
        ])
    }

    public getCheese(value: string): Cheese {
        return this._cheeses.get(value as Position)!
    }

    printBoard() {
        const A1 = this._cheeses.get("A1")?.getPosition
        const A4 = this._cheeses.get("A4")?.getPosition
        const A7 = this._cheeses.get("A7")?.getPosition
        const B2 = this._cheeses.get("B2")?.getPosition
        const B4 = this._cheeses.get("B4")?.getPosition
        const B6 = this._cheeses.get("B6")?.getPosition
        const C3 = this._cheeses.get("C3")?.getPosition
        const C4 = this._cheeses.get("C4")?.getPosition
        const C5 = this._cheeses.get("C5")?.getPosition
        const D1 = this._cheeses.get("D1")?.getPosition
        const D2 = this._cheeses.get("D2")?.getPosition
        const D3 = this._cheeses.get("D3")?.getPosition
        const D5 = this._cheeses.get("D5")?.getPosition
        const D6 = this._cheeses.get("D6")?.getPosition
        const D7 = this._cheeses.get("D7")?.getPosition
        const E3 = this._cheeses.get("E3")?.getPosition
        const E4 = this._cheeses.get("E4")?.getPosition
        const E5 = this._cheeses.get("E5")?.getPosition
        const F2 = this._cheeses.get("F2")?.getPosition
        const F4 = this._cheeses.get("F4")?.getPosition
        const F6 = this._cheeses.get("F6")?.getPosition
        const G1 = this._cheeses.get("G1")?.getPosition
        const G4 = this._cheeses.get("G4")?.getPosition
        const G7 = this._cheeses.get("G7")?.getPosition

        console.log(`
            ${A1} ----------------- D7 ----------------- G7
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

    updateBoard(position: string, player: Player) {}
}
