import {AfterViewInit, Component, OnInit, ViewChild, OnDestroy} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';

import { ExerciseRecord } from '../exercise.model';
import { TrainingService } from '../training.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-past-training',
  templateUrl: './past-training.component.html',
  styleUrls: ['./past-training.component.css']
})
export class PastTrainingComponent implements OnInit, AfterViewInit, OnDestroy {

  displayedColumns: string[] = ['id', 'name', 'date', 'duration', 'calories', 'state'];

  dataSource = new MatTableDataSource<ExerciseRecord>();

  private exChangedSubscription: Subscription | undefined; // 用于保存订阅的引用

  constructor(private trainingService: TrainingService){}

  ngOnInit(){
    // Subscribe to the historical exercises
    this.exChangedSubscription = this.trainingService.getRelatedCancelCompletEx().subscribe((RPexercises: ExerciseRecord[]) => {
        this.dataSource.data = RPexercises;
    });
  }

  @ViewChild(MatSort) sort: MatSort | undefined;

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;

  ngAfterViewInit() {
    this.dataSource.sort = this.sort !== undefined ? this.sort : null;
    this.dataSource.paginator = this.paginator !== undefined ? this.paginator : null;
  }

  ngOnDestroy(): void {
    if (this.exChangedSubscription) {
      this.exChangedSubscription.unsubscribe(); // 取消订阅
    }
  }

}

