export interface year_month{
    Year:Date,
    Month: Number,
    Day: Number
}

export interface matrixObj{
    checked: boolean;
    day:number
}

export interface habit_tracker_object{
    id:Number,
    matrix: matrixObj[][];
}