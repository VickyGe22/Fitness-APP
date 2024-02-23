// import { NumberFormatStyle } from "@angular/common";
import { ExerciseRecord } from "./exercise.model";
import { Subject } from "rxjs"; //创建对象保存用户选择的运动方式

export class TrainingService{

    exerciseChanged = new Subject<ExerciseRecord>();

    private AvailableExercise: ExerciseRecord[] = [
        { id:'crunch', name:'Crunches', duration:30, calories:8 },
        { id:'touch-toes', name:'Touch Toes', duration:180, calories:10 },
        { id:'side-lunges', name:'Side Lunges', duration:120, calories:6 },
        { id:'burpees', name:'Burpees', duration:60, calories:8 },
    ]
    

    private runningExercise?: ExerciseRecord; //runningexercise表示用户选择的正在进行的运动

    getAvailableExercise(){
        return this.AvailableExercise.slice() //与new-training绑定，用户能看到可以选择的运动类型
    }

    startTraining(selectedID: string) {
        // 使用 find 方法，并且处理找不到匹配项的情况
        const exercise = this.AvailableExercise.find(ex => ex.id === selectedID);
        if (exercise) {
            this.runningExercise = exercise;
            this.exerciseChanged.next({ ...exercise });
        } else {
            // 可能需要处理错误或者提醒用户没有找到运动
        }
    }

    getRunningExercise() {
        // 如果 runningExercise 有定义，则创建一个新对象，否则返回 null 或 undefined
        return this.runningExercise ? { ...this.runningExercise } : null;
    }


    private exercise: ExerciseRecord[]=[];

    completeExercise(){
        this.exercise.push({...this.runningExercise, date: new Date(), state: 'completed'});
        this.runningExercise = null;
        this.exerciseChanged.next(null);
    }


    cancelExercise(progress: number){
        this.exercise.push({...this.runningExercise, duration: this.runningExercise.duration * (progress/100), calories: this.runningExercise.calories * (progress/100),date: new Date(), state: 'cancelled'});
        this.runningExercise = null;
        this.exerciseChanged.next(null);
    }

}