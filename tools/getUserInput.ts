import * as readline from "readline"

export async function getUserInput() {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    })

    return new Promise<string>((resolve) => {
        rl.question('Enter an input (or type "exit" to quit): ', (input) => {
            resolve(input)
            rl.close()
        })
    })
}
