import { Position } from "../tools/typeChecking"
import { Player } from "./player"

export class Piece {
    // the player who owns this piece
    private _belongTo: Player | null
    // the position of this piece
    private _position: Position | null

    constructor(player?: Player, position?: Position) {
        this._belongTo = player || null
        this._position = position || null
    }

    get position(): Position | null {
        return this._position
    }

    set position(position: Position | null) {
        this._position = position
    }

    get belongTo(): Player | null {
        return this._belongTo
    }

    set belongTo(player: Player | null) {
        this._belongTo = player
    }
}
