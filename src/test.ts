import * as readline from "readline"

async function getUserInput() {
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

async function main() {
    const input1 = await getUserInput()
    console.log(`User input 1: ${input1}`)

    const input2 = await getUserInput()
    console.log(`User input 2: ${input2}`)

    const input3 = await getUserInput()
    console.log(`User input 3: ${input3}`)
}

main().catch((error) => {
    console.error(error)
})
