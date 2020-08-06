import { Component, OnInit } from '@angular/core';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';


@Component({
  selector: 'app-preferences',
  templateUrl: './preferences.component.html',
  styleUrls: ['./preferences.component.scss']
})
export class PreferencesComponent implements OnInit {

  constructor() { }

  columns: string[] = ['actions', 'key', 'value'];
  dataSource = DATA;

  ngOnInit(): void {
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.columns, event.previousIndex, event.currentIndex);
  }

}


export interface PreferenceConfig {
  key: string;
  value: any;
}

const DATA: PreferenceConfig[] = [
  {key: '1', value: 'Hydrogen'},
  {key: '2', value: 'Helium'}
];
