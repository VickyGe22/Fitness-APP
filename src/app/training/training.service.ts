// import { NumberFormatStyle } from "@angular/common";
// import { Subject } from "rxjs"; //创建对象保存用户选择的运动方式


import { Injectable } from "@angular/core";
import { BehaviorSubject, Subscription } from "rxjs"; // Use BehaviorSubject instead of Subject
import { map, take } from 'rxjs/operators';
import { Store } from "@ngrx/store";


import { AngularFirestore } from '@angular/fire/compat/firestore';

import { ExerciseRecord } from "./exercise.model";

import * as fromTraining from '../training/training.reducer';
import * as Training from './training.actions';


@Injectable()


export class TrainingService {

    constructor(private db: AngularFirestore, private store: Store<fromTraining.State>){}


    // private availableExercise: ExerciseRecord[] = [];
    availableExercisesChanged = new BehaviorSubject<ExerciseRecord[]>([]);
    
    private fbSubs: Subscription[]=[];

    fetchAvailableExercise(){
        // return this.AvailableExercise.slice() //与new-training绑定，用户能看到可以选择的运动类型
        
        this.fbSubs.push(this.db.collection('availableExercise').snapshotChanges().pipe(
            map(docArray => docArray.map(doc => {
              const data = doc.payload.doc.data() as any; // 使用as any进行类型断言
              return {
                id: doc.payload.doc.id,
                name: data.name, // 现在可以安全地访问这些属性了
                duration: data.duration,
                calories: data.calories,
              } as ExerciseRecord; // 确保返回的对象符合ExerciseRecord类型
            }))
          ).subscribe((exercise: ExerciseRecord[]) => {
                // this.availableExercise = exercise;
                // this.availableExercisesChanged.next([...this.availableExercise]);
                this.store.dispatch(new Training.SetAvaTR(exercise))
            }
            // , error =>{
            //     console.log(error)
            // }在订阅后添加，如果出现错误，用户将看不见error
            ));
    } //通过这种方式，exercise始终只存最新的数据
    

    private runningExercise?: ExerciseRecord | null = null; //runningexercise表示用户选择的正在进行的运动，一个容器暂装数据
    exerciseChanged = new BehaviorSubject<ExerciseRecord | null>(null);


    startTraining(selectedID: string) {
        // this.db.doc('availableExercise/'+ selectedID).update({lastSelected: new Date()});选择一个单独文档，添加并更新里面的数据

        // 使用 find 方法，并且处理找不到匹配项的情况
        // this.runningExercise = this.availableExercise.find(ex => ex.id === selectedID);
        // if (this.runningExercise) {
        //     this.exerciseChanged.next({ ...this.runningExercise });
        // }

        this.store.dispatch(new Training.StartTR(selectedID))
    }

    getRunningExercise() {
        // 如果 runningExercise 有定义，则创建一个新对象，否则返回 null 或 undefined
        return this.runningExercise ? { ...this.runningExercise } : null;
    }


    completeExercise() {
        if (this.runningExercise) {
            const completedExercise = {
                ...this.runningExercise, 
                duration: this.runningExercise.duration, 
                calories: this.runningExercise.calories,
                date: new Date(), 
                state: 'completed' as 'completed'
            };
            this.addDataToDataBase(completedExercise);
            // this.runningExercise = null;
            // this.exerciseChanged.next(null);
            this.store.dispatch(new Training.StopFinnTR())
        }

        // this.store.select(fromTraining.getActiveTraining).pipe(take(1)).subscribe(ex => {
        //     this.addDataToDataBase({
        //         ...ex,
        //         date: new Date(),
        //         state: 'completed',
        //     });
        //     this.store.dispatch(new Training.StopFinnTR);
        //   });
    }
    
    cancelExercise(progress: number) {
        if (this.runningExercise) {
            const cancelledExercise = {
                ...this.runningExercise, 
                duration: this.runningExercise.duration * (progress / 100), 
                calories: this.runningExercise.calories * (progress / 100),
                date: new Date(), 
                state: 'cancelled' as 'cancelled'
            };
            this.addDataToDataBase(cancelledExercise);
            // this.runningExercise = null;
            // this.exerciseChanged.next(null);
            this.store.dispatch(new Training.StopFinnTR());

            // this.store.select(fromTraining.getActiveTraining).pipe(take(1)).subscribe(ex => {
            //     this.addDataToDataBase({
            //         ...ex,
            //         duration: ex.duration * (progress / 100),
            //         calories: ex.calories * (progress / 100),
            //         date: new Date(),
            //         state: 'completed',
            //     });
        }
    }

    finishedExercisesChanged = new BehaviorSubject<ExerciseRecord[]>([])

    fetchCancelCompletEx(){
        // return this.RPexercise.asObservable();
        this.fbSubs.push(this.db.collection<ExerciseRecord>('finnishedExercise').valueChanges().subscribe(exercises => {
            // this.finishedExercisesChanged.next(exercises);
            this.store.dispatch(new Training.SetFinnTR(exercises))

          }));
    }

    cancelSubscriptions(){
        this.fbSubs.forEach(sub => sub.unsubscribe());
    }

    private addDataToDataBase(exercise: ExerciseRecord){
        this.db.collection('finnishedExercise').add(exercise);
    }//当用户取消或者完成健身后，保留并储存其数据到数据库中


}

   
   
    // private RPexercise = new BehaviorSubject<ExerciseRecord[]>([]); //把用户点击过的正在训练的数据记录在exercise里

    // private AvailableExercise: ExerciseRecord[] = [
    //     { id:'1', name:'Crunches', duration:30, calories:8 },
    //     { id:'2', name:'Touch Toes', duration:180, calories:10 },
    //     { id:'3', name:'Side Lunges', duration:120, calories:6 },
    //     { id:'4', name:'Burpees', duration:60, calories:8 },
    // ]
    


// completeExercise() {
//     if (this.runningExercise) {
//         const newRPexercise = [...this.RPexercise.getValue(), {...this.runningExercise, date: new Date(), state: 'completed' as 'completed' }];
//         this.RPexercise.next(newRPexercise);
//     }
//     this.runningExercise = null;
//     this.exerciseChanged.next(null);
// } //current-Training调用，当计数结束自动退出

// cancelExercise(progress: number) {
//     if (this.runningExercise) {
//         const newRPexercise = [...this.RPexercise.getValue(), {
//             ...this.runningExercise, 
//             duration: this.runningExercise.duration * (progress / 100), 
//             calories: this.runningExercise.calories * (progress / 100),
//             date: new Date(), 
//             state: 'cancelled' as 'cancelled'
//         }];
//         this.RPexercise.next(newRPexercise);
//     }
//     this.runningExercise = null;
//     this.exerciseChanged.next(null);
//     console.log(this.RPexercise)
// }  // current-Training调用，当用户result点yes的时候
