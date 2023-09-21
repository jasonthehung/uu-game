import { Position, isValidType } from "../tools/typeChecking"
import { getUserInput } from "../tools/getUserInput"
import { Piece } from "./piece"
import { STAGE, ERROR_MESSAGE } from "./config"
import { Board } from "./board"

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
    // total pieces that the player has
    private _pieces: Set<Piece> = new Set<Piece>()

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

    get pieces(): Set<Piece> {
        return this._pieces
    }

    // @ TODO
    // * 1. 把規則補上 "_rules"
    async movePieceTo(
        player: Player,
        board: Board,
        selectedCheese: Piece | null,
        rules: Map<Position, Position[]>
    ) {
        if (selectedCheese === null) {
            throw new Error(
                "Variable 'selectedCheese' in 'moveCheeseTo' function is null"
            )
        }
        // 1. 選擇要移動的棋子 (只能是自己的棋子)
        // 2. 選擇要移動到的位置 (只能是空的位置和合法的位置)
        let isValid = false
        while (!isValid) {
            const thePlaceWantToMoveTo = await getUserInput(STAGE.MOVING)
            if (board.state.get(thePlaceWantToMoveTo) != null) {
                console.log(
                    "The place is accupied, please choice another place."
                )
            } else {
                // 檢查要移動到的位置是否符合規則
                if (
                    thePlaceWantToMoveTo in rules.get(selectedCheese.position!)!
                ) {
                    // // 移動棋子
                    // player.pieces.delete(selectedCheese)
                    // player.pieces.add(
                    //     new Piece(player.name, thePlaceWantToMoveTo)
                    // )
                    // player.moves++
                }

                isValid = true
            }
        }
    }

    // 3. 移動棋子
    // 4. 檢查是否有連成一線，若有，則可以選擇對方的一枚棋子移除
    // 5. 若有移除對方的棋子，則對方棋子數量減一
    // * 應該是在外面
    // 6. 若對方棋子數量少於 3 個，則遊戲結束
    // 7. 若對方無法移動棋子，則遊戲結束

    /**
     *
     * @param player
     * @param board
     * @returns
     */
    async placePiece(player: Player, board: Board): Promise<Piece> {
        while (true) {
            const input = await getUserInput(STAGE.PLACING)

            if (!isValidType(input)) {
                console.log("Invalid input type, please try again.")
                continue
            }
            const existingPiece = board.state.get(input)

            if (existingPiece != null) {
                console.log("Spot already taken, please choose another spot.")
                continue // Restart the loop to ask for input again
            }

            try {
                const piece = new Piece(player, input)
                player.pieces.add(piece)
                player.moves++
                player.moved = false

                return piece
            } catch (error) {
                console.error("Error creating a new piece:", error)
                continue
            }
        }
    }

    /**
     * Select a piece for the player to move.
     * @param player The player selecting the piece.
     * @param board The game board.
     * @returns The selected piece, or null if not found.
     */
    async selectPiece(player: Player, board: Board): Promise<Piece> {
        while (true) {
            // 輸入並取得座標
            const input = await getUserInput(STAGE.SELECTING)

            // 透過座標去board物件中取得棋子
            // 檢查取得的棋子是否為null或是非本方棋子
            const selectedPiece = board.state.get(input)

            // 如果選擇的棋子是null或undefined，則印出錯誤訊息
            if (selectedPiece === null || selectedPiece === undefined) {
                console.log(ERROR_MESSAGE.SELECT_EMPTY_POSITION)
                continue
            }

            if (!player.pieces.has(selectedPiece)) {
                console.log(ERROR_MESSAGE.SELECT_ANOTHER_PLAYER_PIECE)
                continue
            }

            return selectedPiece
        }
    }
}
