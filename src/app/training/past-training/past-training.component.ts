import {AfterViewInit, Component, OnInit, ViewChild, OnDestroy} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';

import { ExerciseRecord } from '../exercise.model';
import { TrainingService } from '../training.service';

// import { Subscription } from 'rxjs';

import { Store } from '@ngrx/store';
import * as fromTraining from '../training.reducer';

import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';



@Component({
  selector: 'app-past-training',
  templateUrl: './past-training.component.html',
  styleUrls: ['./past-training.component.css']
})

export class PastTrainingComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['id', 'name', 'duration', 'calories', 'date', 'state'];

  dataSource = new MatTableDataSource<ExerciseRecord>();

  // private exChangedSubscription: Subscription | undefined; // 用于保存订阅的引用

  constructor(private trainingService: TrainingService, private store: Store<fromTraining.State>){}

  ngOnInit(){
    // Subscribe to the historical exercises
    // this.exChangedSubscription = this.trainingService.fetchCancelCompletEx().subscribe((RPexercises: ExerciseRecord[]) => {
    //     this.dataSource.data = RPexercises;
    // });
    // this.exChangedSubscription = this.trainingService.finishedExercisesChanged.subscribe((exercises: ExerciseRecord[]) =>{
    //     this.dataSource.data = exercises
    // })
    this.store.select(fromTraining.getFinishedExercises).subscribe((exercises: ExerciseRecord[]) =>{
        this.dataSource.data = exercises
    })
    this.trainingService.fetchCancelCompletEx();
  }

  @ViewChild(MatSort) sort: MatSort | undefined;

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;

  ngAfterViewInit() {
    this.dataSource.sort = this.sort !== undefined ? this.sort : null;
    this.dataSource.paginator = this.paginator !== undefined ? this.paginator : null;
  }


  doSearch(event: Event){
    const input = event.target as HTMLInputElement; // 明确地将 event.target 断言为 HTMLInputElement
    const value = input.value; // 现在可以安全地访问 value
    this.dataSource.filter = value.trim().toLowerCase(); //trim处理空白
  }

  //   // Export management
  exportToPdf(jsonData: any[], fileName: string): void {
    // 创建一个新的 jsPDF 实例
    const doc = new jsPDF();
  
    // 为了简化，我们将仅将 JSON 数据的键用作列名
    const columns = Object.keys(jsonData[0]);
    const rows = jsonData.map(obj => columns.map(column => obj[column]));
  
    // 使用 autoTable 添加表格
    autoTable(doc, {
      head: [columns],
      body: rows,
    });
  
    // 保存 PDF 文档
    doc.save(fileName + '.pdf');
  }

  // ngOnDestroy() {
  //   if (this.exChangedSubscription) {
  //     this.exChangedSubscription.unsubscribe(); // 取消订阅
  //   }
  // }


}

