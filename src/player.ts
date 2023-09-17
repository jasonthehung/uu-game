import * as readline from "readline"
import { CHEESE_POSITION, Cheese, Position } from "./cheese"
import { isValidType } from "../tools/typeChecking"

export class Player {
    // player's name
    private _name: string
    // player's score
    private _score: number
    // how many moves the player has made
    private _moves: number
    // is the player movable in this round?
    private _movable: boolean
    // how many cheeses the player has left
    private _remainingCheeses: number
    // how many cheeses the player has to place
    private _remainingCheesesToPlace: number

    private _cheeese: Set<Cheese>

    constructor(name: string, movable: boolean) {
        this._name = name
        this._score = 0
        this._moves = 0
        this._movable = movable
        this._remainingCheeses = 9
        this._remainingCheesesToPlace = 9
        this._cheeese = new Set<Cheese>()

        // // Create the readline interface
        // this.rl = readline.createInterface({
        //     input: process.stdin,
        //     output: process.stdout,
        // })
    }

    // get remainingCheesesToPlace
    get getRemainingCheesesToPlace(): number {
        return this._remainingCheesesToPlace
    }

    set remainingCheesesToPlace(value: number) {
        this._remainingCheesesToPlace = value
    }

    get getPlayerName(): string {
        return this._name
    }

    get getPlayerMovable() {
        return this._movable
    }

    set setPlayerMovable(value: boolean) {
        this._movable = value
    }

    decRemainingCheesesToPlace() {
        this._remainingCheesesToPlace--
    }

    // private processInput(input: string): string | null {
    //     let output = null

    //     if (input.toLowerCase() === "exit" || !this._movable) {
    //         // stop reading input
    //         this.rl.close()
    //     } else {
    //         // return true or false
    //         if (isValidType(input.toUpperCase())) {
    //             console.log(`You entered: ${input}`)
    //             output = input.toUpperCase()

    //             this._movable = false

    //             // stop reading input
    //             // this.rl.close()
    //         } else {
    //             console.log("Invalid input, please try again.")

    //             // start over reading input
    //             this.getUserInput()
    //         }
    //     }
    //     return output
    // }

    // getUserInput() {
    //     this.rl.question(
    //         'Place your cheese (or type "exit" to quit): ',
    //         this.processInput
    //     )
    // }

    // async getUserInput(): Promise<string | null> {
    //     return new Promise<string | null>((resolve) => {
    //         this.rl.question(
    //             'Place your cheese (or type "exit" to quit): ',
    //             (input) => {
    //                 if (input.toLowerCase() === "exit" || !this._movable) {
    //                     // Stop reading input
    //                     this.rl.close()
    //                     resolve(null) // Resolve with null when the input indicates quitting
    //                 } else {
    //                     if (this.isValidType(input.toUpperCase())) {
    //                         console.log(`You entered: ${input}`)
    //                         this._movable = false

    //                         // Stop reading input and resolve with the valid input
    //                         this.rl.close()
    //                         resolve(input.toUpperCase())
    //                     } else {
    //                         console.log("Invalid input, please try again.")

    //                         // Start over reading input by recursively calling getUserInput
    //                         this.getUserInput().then(resolve)
    //                     }
    //                 }
    //             }
    //         )
    //     })
    // }
}
