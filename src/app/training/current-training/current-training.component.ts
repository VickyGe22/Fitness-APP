import { Component, OnInit  } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { StopTrainingComponent } from './stop-training.component';

import { TrainingService } from '../training.service';

@Component({
  selector: 'app-current-training',
  templateUrl: './current-training.component.html',
  styleUrls: ['./current-training.component.css']
})
export class CurrentTrainingComponent implements OnInit {
  
  progress = 0;
  timer: number | undefined;
  // @Output() trainingExit = new EventEmitter<void>();

  constructor(private dialog: MatDialog, private trainingService: TrainingService) { }
  
  ngOnInit() {
    this.ContinueTimer();
  }

  ContinueTimer() {
    const currentExercise = this.trainingService.getRunningExercise();
  
    // 确保currentExercise不是null
    if (currentExercise) {
      // 计算每一步的时间间隔
      const step = currentExercise.duration / 100 * 1000;
      this.timer = setInterval(() => {
        this.progress += 5;
        if (this.progress >= 100) {
          this.trainingService.completeExercise();
        }
      }, step);
    } else {
      // 如果currentExercise是null，可能需要处理这种情况，例如显示错误消息
      console.error('No running exercise found.');
    }
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
