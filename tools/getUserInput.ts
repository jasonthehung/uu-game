import * as readline from "readline"
import { Position, Stage, isValidType } from "../tools/typeChecking"

export async function getUserInput(stage: Stage): Promise<Position> {
    let questionText: string

    switch (stage) {
        case "placing":
            questionText = "Place a cheese: "
            break
        case "selecting":
            questionText = "Select a cheese to move: "
            break
        default:
            questionText = "Select a spot to place your cheese: "
    }

    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    })

    try {
        const input = await new Promise<string>((resolve) => {
            rl.question(questionText, resolve)
        })

        if (isValidType(input)) {
            return input as Position
        } else {
            console.log("Invalid position, please try again.")
            return getUserInput(stage) // Recursively call the function on invalid input
        }
    } finally {
        rl.close() // Ensure readline is closed after input
    }
}
