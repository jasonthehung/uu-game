export function playerRoundChecking(player1: boolean, player2: boolean) {
    if (player1 && !player2) {
        return "P1"
    } else if (!player1 && player2) {
        return "P2"
    } else {
        throw new Error("Invalid player round checking")
    }
}
