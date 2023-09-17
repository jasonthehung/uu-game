import * as readline from "readline"

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
})

function getUserInputs() {
    const inputs: string[] = []

    function processInput(input: string) {
        if (input.toLowerCase() === "exit") {
            // If the user types "exit," close the readline interface
            rl.close()
        } else {
            // Record the input and continue reading more input
            inputs.push(input)
            rl.question(
                'Enter another input (or type "exit" to quit): ',
                processInput
            )
        }
    }

    rl.question('Enter an input (or type "exit" to quit): ', processInput)

    // Add an event listener to handle close event if needed
    rl.on("close", () => {
        console.log("User inputs recorded:")
        inputs.forEach((input, index) => {
            console.log(`${index + 1}: ${input}`)
        })
        process.exit(0) // Optionally, exit the process gracefully
    })
}

function main() {
    getUserInputs()
}

main()
