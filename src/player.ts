import { isValidType } from "../tools/typeChecking"
import { getUserInput } from "../tools/getUserInput"
import { Piece } from "./piece"
import { STAGE, ERROR_MESSAGE } from "./config"
import { Board } from "./board"
import { Rules } from "../tools/rulesChecking"

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
                console.log(ERROR_MESSAGE.INVALID_INPUT_TYPE)
                continue
            }
            const existingPiece = board.state.get(input)

            if (existingPiece != null) {
                console.log(ERROR_MESSAGE.SPOT_TAKEN)
                continue
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
    private async selectPiece(
        player: Player,
        board: Board,
        rules: Rules
    ): Promise<Piece> {
        while (true) {
            // 輸入並取得座標
            const input = await getUserInput(STAGE.SELECTING)

            // 透過座標去board物件中取得棋子
            // 檢查取得的棋子是否為null或是非本方棋子
            const selectedPiece = board.state.get(input)

            if (!isValidType(input)) {
                console.log(ERROR_MESSAGE.INVALID_INPUT_TYPE)
                continue
            }

            // 如果選擇的棋子是null或undefined，則印出錯誤訊息
            if (selectedPiece === null || selectedPiece === undefined) {
                console.log(ERROR_MESSAGE.SELECT_EMPTY_POSITION)
                continue
            }

            // 如果選擇的棋子不是本方棋子，則印出錯誤訊息
            if (!player.pieces.has(selectedPiece)) {
                console.log(ERROR_MESSAGE.SELECT_ANOTHER_PLAYER_PIECE)
                continue
            }

            if (!rules.isValidMove(board, selectedPiece)) {
                console.log(ERROR_MESSAGE.NO_WAY_TO_MOVE)
                continue
            }

            return selectedPiece
        }
    }

    // movePieceTo has already updated the board state
    private async movePieceTo(
        player: Player,
        board: Board,
        selectedPiece: Piece | null,
        rules: Rules
    ) {
        if (!selectedPiece) {
            throw new Error(
                "Variable 'selectedPiece' in 'movePieceTo' function is null"
            )
        }

        let newPosition = await getUserInput(STAGE.MOVING)

        while (true) {
            if (board.state.get(newPosition) != null) {
                console.log(ERROR_MESSAGE.PLACE_IS_ACCUPIED)
            } else if (!rules.isValidMove(board, selectedPiece, newPosition)) {
                console.log(ERROR_MESSAGE.INVALID_MOVE)
            } else {
                break // Input is valid, exit the loop
            }

            newPosition = await getUserInput(STAGE.MOVING)
        }

        const newPiece = new Piece(player, newPosition)

        // Update player's pieces and board state
        player.pieces.delete(selectedPiece)
        board.state.set(newPosition, newPiece)

        board.state.delete(selectedPiece.position)
        player.pieces.add(newPiece)

        return newPiece
    }

    async movePiece(player: Player, board: Board, rules: Rules) {
        const piece = await this.selectPiece(player, board, rules)
        const newPiece = await this.movePieceTo(player, board, piece, rules)

        await board.printBoard()

        // TODO
        const isLined = await board.lineCheck(newPiece)
        if (isLined) {
            // remove oppenent's piece from board
            await this.removePiece(player, board)
        }
    }

    private async removePiece(player: Player, board: Board) {
        let input = await getUserInput(STAGE.REMOVE)
        let piece = board.state.get(input)

        while (true) {
            if (!piece) {
                console.log("輸入的座標沒有棋子")
            } else if (piece.belongTo?.name === player.name) {
                console.log("不能吃自己的棋子")
            } else {
                break
            }

            input = await getUserInput(STAGE.REMOVE)
            piece = board.state.get(input)
        }

        board.state.delete(input)
        piece.belongTo?.pieces.delete(piece)
    }
}
