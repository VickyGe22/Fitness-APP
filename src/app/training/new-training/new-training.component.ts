import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { TrainingService } from '../training.service';
import { ExerciseRecord } from '../exercise.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit {

  Exercise: ExerciseRecord[] = [];

  // @Output() trainingStart = new EventEmitter<void>();
  
  constructor(private trainingService: TrainingService) { }
  
  ngOnInit() {
    this.Exercise = this.trainingService.getAvailableExercise();
    
  }

  onStartTraining(form: NgForm) {
      this.trainingService.startTraining(form.value.exercise);//绑定表单用户输入的数据
  } //与Trainingservice绑定，前端用户选择好澳运动类型之后，调用trainingservice的starttraining抓取用户现在选择的哪种运动类型

}
