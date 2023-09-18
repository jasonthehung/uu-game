import { Player } from "./player"

export class Cheese {
    // the player who owns this cheese
    private _belongTo: Player | null
    // the position of this cheese
    private _position: Position | null
    // is this cheese eliminated?
    private _eliminated: Boolean

    constructor() {
        this._belongTo = null
        this._position = null
        this._eliminated = false
    }

    get getPosition(): Position | null {
        return this._position
    }
}

export const validMovesChecker = new Map<Cheese, Cheese[]>()

export const CHEESE_POSITION = [
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

export type Position =
    | "A1"
    | "A4"
    | "A7"
    | "B2"
    | "B4"
    | "B6"
    | "C3"
    | "C4"
    | "C5"
    | "D1"
    | "D2"
    | "D3"
    | "D5"
    | "D6"
    | "D7"
    | "E3"
    | "E4"
    | "E5"
    | "F2"
    | "F4"
    | "F6"
    | "G1"
    | "G4"
    | "G7"
