import * as readline from "readline"
import { Position, isValidType } from "../tools/typeChecking"

export async function getUserInput(isMovingStage: boolean): Promise<Position> {
    const questionText = isMovingStage
        ? "Select a cheese to move: "
        : "Select a spot to place your cheese: "

    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    })

    return new Promise<Position>((resolve) => {
        rl.question(questionText, (input) => {
            if (isValidType(input)) {
                rl.close()
                resolve(input as Position)
            } else {
                console.log("Invalid position, please try again.")
                rl.close()
                resolve(getUserInput(isMovingStage))
            }
        })
    })
}
