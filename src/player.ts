import { isValidType } from "../tools/typeChecking"
import { getUserInput } from "../tools/getUserInput"
import { Board } from "./board"
import { Cheese } from "./cheeses"

export class Player {
    // player's name
    public _name: string
    // player's score
    private _score: number = 0
    // how many moves the player has made
    private _moves: number = 0
    // is the player movable in this round?
    private _moved: boolean
    // player's icon
    private _icon: string
    // total cheeses that the player has
    private _cheeese: Set<Cheese> = new Set<Cheese>()

    constructor(name: string, moved: boolean, icon: string) {
        this._name = name
        this._moved = moved
        this._icon = icon
    }

    get name(): string {
        return this._name
    }

    set name(name: string) {
        this._name = name
    }

    get score(): number {
        return this._score
    }

    set score(score: number) {
        this._score = score
    }

    get moves(): number {
        return this._moves
    }

    set moves(moves: number) {
        this._moves = moves
    }

    get moved(): boolean {
        return this._moved
    }

    set moved(moved: boolean) {
        this._moved = moved
    }

    get icon(): string {
        return this._icon
    }

    set icon(icon: string) {
        this._icon = icon
    }

    get cheeses(): Set<Cheese> {
        return this._cheeese
    }

    // @ TODO
    async moveCheese(player: Player, board: Board) {
        // 1. 選擇要移動的棋子 (只能是自己的棋子)
        // 2. 選擇要移動到的位置 (只能是空的位置)
        // 3. 移動棋子
        // 4. 檢查是否有連成一線，若有，則可以選擇對方的一枚棋子移除
        // 5. 若有移除對方的棋子，則對方棋子數量減一
        // * 應該是在外面
        // 6. 若對方棋子數量少於 3 個，則遊戲結束
        // 7. 若對方無法移動棋子，則遊戲結束
    }

    async placeCheese(player: Player, board: Board, isMovingStage: boolean) {
        console.log(`Round [${board.round}]: ${player.name}'s turn`)

        let response: Cheese | null = null
        let isValid = false

        while (!isValid) {
            const input = await getUserInput(isMovingStage)

            if (!isValidType(input)) {
                console.log("Invalid input type, please try again.")
            } else {
                const existingCheese = board.state.get(input)

                // use `!=` instead of `!==` because `existingCheese` can be null or undefined
                if (existingCheese != null) {
                    console.log(
                        "Spot already taken, please choose another spot."
                    )
                } else {
                    response = new Cheese(player, input)
                    player.cheeses.add(response)
                    player.moves++
                    isValid = true
                }
            }
        }

        player.moved = false

        return response as Cheese
    }

    // @ 2023.09.20 [under testing]
    async selectCheese(player: Player, board: Board, isMovingStage: boolean) {
        // get user input (the position of the cheese that the player wants to move)
        const input = await getUserInput(isMovingStage)

        // 從board.state中找到player選擇的棋子
        const selectedCheese = board.state.get(input)
        if (selectedCheese != null) {
            if (selectedCheese.belongTo !== player) {
                console.log(
                    "You can only move your own cheese. Please select again."
                )
                await this.selectCheese(player, board, isMovingStage)
            }
        } else {
            console.log(
                "There is no cheese at this position. Please try again."
            )
        }

        return selectedCheese as Cheese
    }
}
