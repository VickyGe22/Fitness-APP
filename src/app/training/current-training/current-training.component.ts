import { Component, OnInit  } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { StopTrainingComponent } from './stop-training.component';

import { TrainingService } from '../training.service';

import { take } from 'rxjs';
import { Store } from '@ngrx/store';

import * as fromTraining from '../training.reducer';



@Component({
  selector: 'app-current-training',
  templateUrl: './current-training.component.html',
  styleUrls: ['./current-training.component.css']
})
export class CurrentTrainingComponent implements OnInit {
  
  progress = 0;
  timer: number | undefined;
  // @Output() trainingExit = new EventEmitter<void>();

  constructor(private dialog: MatDialog, private trainingService: TrainingService, private store: Store<fromTraining.State>) { }
  
  ngOnInit() {
    this.ContinueTimer();
  }

  ContinueTimer() {
    // const currentExercise = this.trainingService.getRunningExercise();
  
    // // 确保currentExercise不是null
    // if (currentExercise) {
    //   // 计算每一步的时间间隔
    //   const step = currentExercise.duration / 100 * 1000;
    //   this.timer = setInterval(() => {
    //     this.progress += 5;
    //     if (this.progress >= 100) {
    //       this.trainingService.completeExercise();
    //       clearInterval(this.timer);
    //     }
    //   }, step);
    // } else {
    //   // 如果currentExercise是null，可能需要处理这种情况，例如显示错误消息
    //   console.error('No running exercise found.');
    // }

    this.store.select(fromTraining.getActiveTraining).pipe(take(1)).subscribe((ex) => {
      if (ex) {
        const step = ex.duration / 100 * 1000;
        this.timer = setInterval(() => {
          this.progress = this.progress + 1;
          if (this.progress >= 100) {
          this.trainingService.completeExercise();
          clearInterval(this.timer);
          }
        }, step);
      }
    });
  }

  onStop() {
    clearInterval(this.timer);
    
    const DialogRef = this.dialog.open(StopTrainingComponent, 
      {data: {
        progress: this.progress
        }
      }
    );

    DialogRef.afterClosed().subscribe(result => { // 订阅对话关闭情况，根据result的赋值结果执行下一步
      if (result) {
        // this.trainingExit.emit();
        this.trainingService.cancelExercise(this.progress)
      }else {
        this.ContinueTimer();
      }
    });
  }

}
