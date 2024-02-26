import { Action } from "@ngrx/store";
import { START_LOADING, STOP_LOADING, UIActions } from "./training.actions";
import { ExerciseRecord } from "./exercise.model";

as 

export interface TrainingState {
    availableExercises: ExerciseRecord[];
    finnishedExercises: ExerciseRecord[];
}

export interface State extends fromRoot

const initialState = {
    isLoading: false
};

export function uiReducer(state: State = initialState, action: Action): State {
    switch (action.type) {
        case START_LOADING:
            return {
                isLoading: true
            };
        case STOP_LOADING:
            return{
                isLoading: false
            }
        default:
            return state
    }
}

export const getIsLoading = (state: State) => state.isLoading;