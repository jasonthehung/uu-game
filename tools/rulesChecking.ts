import { Board } from "../src/board"
import { Piece } from "../src/piece"
import { Position } from "./typeChecking"

export class Rules {
    private _movingRules = new Map<Position, Position[]>()

    constructor() {
        this._movingRules.set("A1", ["A4", "D1"])
        this._movingRules.set("A4", ["A1", "A7", "B4"])
        this._movingRules.set("A7", ["A4", "D7"])
        this._movingRules.set("B2", ["B4", "D2"])
        this._movingRules.set("B4", ["A4", "B2", "B6", "C4"])
        this._movingRules.set("B6", ["B4", "D6"])
        this._movingRules.set("C3", ["C4", "D3"])
        this._movingRules.set("C4", ["B4", "C3", "C5"])
        this._movingRules.set("C5", ["C4", "D5"])
        this._movingRules.set("D1", ["A1", "D2", "G1"])
        this._movingRules.set("D2", ["B2", "D1", "D3", "F2"])
        this._movingRules.set("D3", ["C3", "D2", "E3"])
        this._movingRules.set("D5", ["C5", "D6", "E5"])
        this._movingRules.set("D6", ["B6", "D5", "D7", "F6"])
        this._movingRules.set("D7", ["A7", "D6", "G7"])
        this._movingRules.set("E3", ["D3", "E4"])
        this._movingRules.set("E4", ["E3", "E5", "F4"])
        this._movingRules.set("E5", ["D5", "E4"])
        this._movingRules.set("F2", ["D2", "F4"])
        this._movingRules.set("F4", ["E4", "F2", "F6", "G4"])
        this._movingRules.set("F6", ["D6", "F4"])
        this._movingRules.set("G1", ["D1", "G4"])
        this._movingRules.set("G4", ["F4", "G1", "G7"])
        this._movingRules.set("G7", ["D7", "G4"])
    }

    get movingRules(): Map<Position, Position[]> {
        return this._movingRules
    }

    isValidMove(
        board: Board,
        selectedPiece: Piece,
        moveTo?: Position
    ): boolean {
        const arr = this._movingRules.get(selectedPiece.position!) || []

        // Check if there's at least one valid move in arr
        const hasValidMove = arr.some((position) => !board.state.has(position))

        return moveTo ? arr.includes(moveTo) && hasValidMove : hasValidMove
    }
}
