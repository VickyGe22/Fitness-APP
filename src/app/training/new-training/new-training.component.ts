import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { TrainingService } from '../training.service';
import { ExerciseRecord } from '../exercise.model';
import { NgForm } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { Subscription } from 'rxjs';

import { map } from 'rxjs/operators';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit, OnDestroy {

  // 适用于存储Observable的类属性
  Exercise: Observable<ExerciseRecord[]> | undefined;

  // 适用于存储Subscription的类属性
  private exerciseSubscription: Subscription | undefined;

  // @Output() trainingStart = new EventEmitter<void>();
  
  constructor(private trainingService: TrainingService, private db: AngularFirestore) { }
  
  // ngOnInit() {
  //   // this.Exercise = this.trainingService.getAvailableExercise();
  //   this.Exercise = this.db.collection('availableExercise').snapshotChanges().pipe(map(docArray=>{
  //     docArray.map(doc => {
  //       return {
  //         id: doc.payload.doc.id,
  //         name: doc.payload.doc.data().name,
  //         duration: doc.payload.doc.data().duration,
  //         calories: doc.payload.doc.data().calories,
  //       };
  //     })
  //   }))
  //   this.exerciseSubscription = this.Exercise.subscribe(result => {
  //     console.log(result)
  //   });
  // }

  ngOnInit() {
    this.Exercise = this.db.collection('availableExercise').snapshotChanges().pipe(
      map(docArray => docArray.map(doc => {
        const data = doc.payload.doc.data() as any; // 使用as any进行类型断言
        return {
          id: doc.payload.doc.id,
          name: data.name, // 现在可以安全地访问这些属性了
          duration: data.duration,
          calories: data.calories,
        } as ExerciseRecord; // 确保返回的对象符合ExerciseRecord类型
      }))
    );

    if(this.Exercise) {
      this.exerciseSubscription = this.Exercise.subscribe(result => {
        console.log(result);
      });
    }
  }

  

  onStartTraining(form: NgForm) {
      this.trainingService.startTraining(form.value.exercise);//绑定表单用户输入的数据
  } //与Trainingservice绑定，前端用户选择好澳运动类型之后，调用trainingservice的starttraining抓取用户现在选择的哪种运动类型

  
  // ... 在ngOnDestroy中取消订阅
  ngOnDestroy() {
    if (this.exerciseSubscription) {
      this.exerciseSubscription.unsubscribe();
    }
  }



}
