import * as readline from "readline"
import { Position } from "../tools/typeChecking"
import { Stage } from "../src/config"

export async function getUserInput(stage: Stage): Promise<Position> {
    let questionText: string

    switch (stage) {
        case "placing":
            questionText = "Place a piece: "
            break
        case "selecting":
            questionText = "Select a piece to move: "
            break
        case "moving":
            questionText = "Select a spot that you want to move to: "
            break
        default:
            questionText = "Invalid stage"
    }

    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    })

    let input: string = ""

    while (input.trim() === "") {
        input = await new Promise<string>((resolve) => {
            rl.question(questionText, resolve)
        })

        if (input.trim() === "") {
            console.log("Invalid input. Please provide a non-empty value.")
        }
    }

    rl.close()

    return input.trim() as Position
}
