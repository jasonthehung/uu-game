import { PIECES_POSITION } from "../src/config"

// Type Guard Function
export function isValidType(input: Position): input is Position {
    return PIECES_POSITION.includes(input)
}

export type Position =
    | "A1"
    | "A4"
    | "A7"
    | "B2"
    | "B4"
    | "B6"
    | "C3"
    | "C4"
    | "C5"
    | "D1"
    | "D2"
    | "D3"
    | "D5"
    | "D6"
    | "D7"
    | "E3"
    | "E4"
    | "E5"
    | "F2"
    | "F4"
    | "F6"
    | "G1"
    | "G4"
    | "G7"
