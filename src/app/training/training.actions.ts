import { Action } from '@ngrx/store';
import { ExerciseRecord } from './exercise.model';

export const SET_AVAILABLE_TR = '[Training] Set Available Training';
export const SET_FINNISHED_TR = '[Training] Set Finnished Training';
export const START_TR = '[Training] Start Training';
export const STOP_TR = '[Training] Stop Training';

export class SetAvaTR implements Action {
  readonly type = SET_AVAILABLE_TR;
  constructor(public payload: ExerciseRecord[]){}

}

export class SetFinnTR implements Action {
  readonly type = SET_FINNISHED_TR;
  constructor(public payload: ExerciseRecord[]){}
}

export class StartTR implements Action {
  readonly type = START_TR;
  constructor(public payload: string){}
}

export class StopFinnTR implements Action {
  readonly type = STOP_TR;
}

export type TRActions = SetAvaTR | SetFinnTR | StartTR | StopFinnTR ;
