import { CHEESE_POSITION, Position } from "../src/cheeses"

// Type Guard Function
export function isValidType(input: string): input is Position {
    return CHEESE_POSITION.includes(input)
}
