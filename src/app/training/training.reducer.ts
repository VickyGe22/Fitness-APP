// import { Action } from "@ngrx/store";
import { TRActions, SET_AVAILABLE_TR, SET_FINNISHED_TR, STOP_TR, START_TR } from "./training.actions";
import { ExerciseRecord } from "./exercise.model";
// import { TrainingService } from "./training.service";

import * as fromRoot from '../app.reducer';
import { createFeatureSelector, createSelector } from "@ngrx/store";

export interface TrainingState {
    availableExercises: ExerciseRecord[];
    finnishedExercises: ExerciseRecord[];
    activeTraining: ExerciseRecord[];
}

export interface State extends fromRoot.State {
    training: TrainingState;
}

const initialState: TrainingState = {
    availableExercises: [],
    finnishedExercises: [],
    activeTraining: []
};

export function TRReducer(state = initialState, action: TRActions) {
    switch (action.type) {
        case SET_AVAILABLE_TR:
            return {
                ...state, //防止旧数据丢失
                availableExercises: action.payload
            };
        case SET_FINNISHED_TR:
            return{
                ...state,
                finnishedExercises: action.payload
            }
        case START_TR:
            return{
                ...state,
                activeTraining: {...state.activeTraining.find(ex => ex.id === action.payload)}
            }
        case STOP_TR:
            return{
                ...state,
                activeTraining: null
            }
        default:
            return state
    }
}

// export const getAvaTraining = (state: TrainingState) => state.availableExercises;
// export const getFinnTraining = (state: TrainingState) => state.finnishedExercises;
// export const getActiveTraining = (state: TrainingState) => state.activeTraining;
// export const getisTraining = (state: TrainingState) => state.activeTraining != null;

export const getTrainingState = createFeatureSelector<TrainingState>('training');

export const getAvailableExercises = createSelector(getTrainingState, (state: TrainingState) => state.availableExercises);
export const getFinishedExercises = createSelector(getTrainingState, (state: TrainingState) => state.finnishedExercises);
export const getActiveTraining = createSelector(getTrainingState, (state: TrainingState) => state.activeTraining);
export const getIsTraining = createSelector(getTrainingState, (state: TrainingState) => state.activeTraining != null);

