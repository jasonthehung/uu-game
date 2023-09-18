import * as readline from "readline"
import { CHEESE_POSITION, Cheese } from "./cheeses"

import { isValidType } from "../tools/typeChecking"

export class Player {
    // player's name
    private _name: string
    // player's score
    private _score: number = 0
    // how many moves the player has made
    private _moves: number = 0
    // is the player movable in this round?
    private _moved: boolean
    // player's icon
    private _icon: string = "◼︎"
    // total cheeses that the player has
    private _cheeese: Set<Cheese> = new Set<Cheese>()

    constructor(name: string, moved: boolean) {
        this._name = name
        this._moved = moved
    }

    // * Getter
    // get the player's name
    get getPlayerName(): string {
        return this._name
    }

    // # Setter
    // set the player's name
    set setPlayerName(name: string) {
        this._name = name
    }

    // * Getter
    // get the player's score
    get getPlayerScore(): number {
        return this._score
    }

    // # Setter
    // set the player's score
    set setPlayerScore(score: number) {
        this._score = score
    }

    // * Getter
    // get the player's moves
    get getPlayerMoves(): number {
        return this._moves
    }

    // # Setter
    // set the player's moves
    set setPlayerMoves(moves: number) {
        this._moves = moves
    }

    // * Getter
    // get the player's movable status
    get getPlayerMovable(): boolean {
        return this._moved
    }

    // # Setter
    // set the player's movable status
    set setPlayerMovable(moved: boolean) {
        this._moved = moved
    }

    // * Getter
    // get the player's cheeses set
    get getCheeese(): Set<Cheese> {
        return this._cheeese
    }

    // # Setter
    // set the player's cheeses set
    set setCheeese(cheese: Cheese) {
        this._cheeese.add(cheese)
    }
}
