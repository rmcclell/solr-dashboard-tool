import { Component, OnInit } from '@angular/core';

import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import {MatTableDataSource} from '@angular/material/table';

export interface DashboardConfig {
  description: string;
  title: string;
  active: boolean;
  default: boolean;
  created: Date;
  modified: Date;
}

const DATA: DashboardConfig[] = [
  {active: true, default: true, title: 'Cats', description: 'Hydrogen', created: new Date(), modified: new Date() }
];

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  columns: string[] = ['actions', 'active', 'default', 'title', 'description', 'created', 'modified'];
  dataSource = new MatTableDataSource(DATA);

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.columns, event.previousIndex, event.currentIndex);
  }

  constructor() { }

  ngOnInit(): void {
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
