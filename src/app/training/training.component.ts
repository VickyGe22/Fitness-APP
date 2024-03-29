import { Component, OnInit } from '@angular/core';
import { TrainingService } from './training.service';

import { Store } from '@ngrx/store';

import * as fromTraining from './training.reducer';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.css']
})
export class TrainingComponent implements OnInit {

  onGoingTraining$: Observable<boolean> | undefined;

  // exerciseSubscription: Subscription | undefined;

  constructor(private trainingService: TrainingService, private store: Store<fromTraining.State>) { }

  ngOnInit() {
    // this.exerciseSubscription = this.trainingService.exerciseChanged.subscribe(
    //   exercise => {
    //     if(exercise){
    //       this.onGoingTraining = true;
    //     }else{
    //       this.onGoingTraining = false;
    //     }
    //   }
    // )
    this.onGoingTraining$ = this.store.select(fromTraining.getIsTraining)
    console.log(this.onGoingTraining$)
  }



}
