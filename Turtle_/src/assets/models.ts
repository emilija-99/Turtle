export interface year_month {
  Year: Date;
  Month: number;
  Day: number;
}

export type CheckedState = true | false | 'disabled';
export interface matrixObj {
  checked: CheckedState;
  day: number;
}

export interface habit_tracker_object {
  id: number;
  matrix: matrixObj[][];
}

export interface monthDays{

}
