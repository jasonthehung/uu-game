import { Stage } from "../tools/typeChecking"

export const CHEESE_POSITION = [
    "A1",
    "A4",
    "A7",
    "B2",
    "B4",
    "B6",
    "C3",
    "C4",
    "C5",
    "D1",
    "D2",
    "D3",
    "D5",
    "D6",
    "D7",
    "E3",
    "E4",
    "E5",
    "F2",
    "F4",
    "F6",
    "G1",
    "G4",
    "G7",
]

export const STAGE: { [key: string]: Stage } = {
    PLACING: "placing",
    SELECTING: "selecting",
    MOVING: "moving",
}
