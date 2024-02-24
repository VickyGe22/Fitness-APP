import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';

import { ExerciseRecord } from '../exercise.model';
import { TrainingService } from '../training.service';

@Component({
  selector: 'app-past-training',
  templateUrl: './past-training.component.html',
  styleUrls: ['./past-training.component.css']
})
export class PastTrainingComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['id', 'name', 'date', 'duration', 'calories', 'state'];

  dataSource = new MatTableDataSource<ExerciseRecord>();

  constructor(private trainingService: TrainingService){}

  ngOnInit(){
    this.dataSource.data = this.trainingService.getRelatedCancelCompletEx();
  }

  @ViewChild(MatSort) sort: MatSort | undefined;

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;

  ngAfterViewInit() {
    this.dataSource.sort = this.sort !== undefined ? this.sort : null;
    this.dataSource.paginator = this.paginator !== undefined ? this.paginator : null;
  }
}

