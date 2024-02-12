export const C = {
    MAX_BLOCKS: 35,
    BLOCK_SIZE: 3,
}

export const timeslot_number_length = 5

export const timeslot_number2time = new Map<number, string>([
    [1, "2:00-3:20"],
    [2, "3:30-4:50"],
    [3, "5:00-6:20"],
    [4, "6:30-7:50"],
    [5, "8:00-9:20"],
])