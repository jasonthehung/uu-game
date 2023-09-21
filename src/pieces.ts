import { Position } from "../tools/typeChecking"
import { Player } from "./player"

export class Piece {
    // the player who owns this piece
    private _belongTo: Player | null
    // the position of this piece
    private _position: Position | null
    // is this piece eliminated?
    private _eliminated: Boolean

    constructor(player?: Player, position?: Position) {
        this._belongTo = player || null
        this._position = position || null
        this._eliminated = false
    }

    get position(): Position | null {
        return this._position
    }

    get belongTo(): Player | null {
        return this._belongTo
    }
}

export const validMovesChecker = new Map<Piece, Piece[]>()
