import * as readline from "readline"

export async function getUserInput(isMovingStage: boolean): Promise<string> {
    const questionText = isMovingStage
        ? "Select a cheese to move: "
        : "Select a spot to place your cheese: "

    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    })

    return new Promise<string>((resolve) => {
        rl.question(questionText, (input) => {
            rl.close()
            resolve(input)
        })
    })
}
