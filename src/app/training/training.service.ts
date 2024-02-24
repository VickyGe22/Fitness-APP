// import { NumberFormatStyle } from "@angular/common";
import { ExerciseRecord } from "./exercise.model";
import { Subject } from "rxjs"; //创建对象保存用户选择的运动方式
import { BehaviorSubject } from "rxjs"; // Use BehaviorSubject instead of Subject

export class TrainingService{

    exerciseChanged = new Subject<ExerciseRecord | null>();

    private AvailableExercise: ExerciseRecord[] = [];
    

    // private AvailableExercise: ExerciseRecord[] = [
    //     { id:'1', name:'Crunches', duration:30, calories:8 },
    //     { id:'2', name:'Touch Toes', duration:180, calories:10 },
    //     { id:'3', name:'Side Lunges', duration:120, calories:6 },
    //     { id:'4', name:'Burpees', duration:60, calories:8 },
    // ]
    
    getAvailableExercise(){
        return this.AvailableExercise.slice() //与new-training绑定，用户能看到可以选择的运动类型
    }

    private runningExercise?: ExerciseRecord | null = null; //runningexercise表示用户选择的正在进行的运动，一个容器暂装数据
    

    startTraining(selectedID: string) {
        // 使用 find 方法，并且处理找不到匹配项的情况
        this.runningExercise = this.AvailableExercise.find(ex => ex.id === selectedID);
        if (this.runningExercise) {
            this.exerciseChanged.next({ ...this.runningExercise });
        }
    }

    getRunningExercise() {
        // 如果 runningExercise 有定义，则创建一个新对象，否则返回 null 或 undefined
        return this.runningExercise ? { ...this.runningExercise } : null;
    }


    private RPexercise = new BehaviorSubject<ExerciseRecord[]>([]); //把用户点击过的正在训练的数据记录在exercise里

    completeExercise() {
        if (this.runningExercise) {
            const newRPexercise = [...this.RPexercise.getValue(), {...this.runningExercise, date: new Date(), state: 'completed' as 'completed' }];
            this.RPexercise.next(newRPexercise);
        }
        this.runningExercise = null;
        this.exerciseChanged.next(null);
    } //current-Training调用，当计数结束自动退出
    
    cancelExercise(progress: number) {
        if (this.runningExercise) {
            const newRPexercise = [...this.RPexercise.getValue(), {
                ...this.runningExercise, 
                duration: this.runningExercise.duration * (progress / 100), 
                calories: this.runningExercise.calories * (progress / 100),
                date: new Date(), 
                state: 'cancelled' as 'cancelled'
            }];
            this.RPexercise.next(newRPexercise);
        }
        this.runningExercise = null;
        this.exerciseChanged.next(null);
        console.log(this.RPexercise)
    }  // current-Training调用，当用户result点yes的时候

    getRelatedCancelCompletEx(){
        return this.RPexercise.asObservable();
    }

}