import { Component, OnInit } from '@angular/core';

import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-solr-indexes',
  templateUrl: './solr-indexes.component.html',
  styleUrls: ['./solr-indexes.component.scss']
})
export class SolrIndexesComponent implements OnInit {

  columns: string[] = ['actions', 'name', 'baseUrl', 'adminUrl', 'fields'];
  dataSource = DATA;

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.columns, event.previousIndex, event.currentIndex);
  }

  constructor() { }

  ngOnInit(): void {
  }

}


export interface SolrIndexConfig {
  name: string;
  baseUrl: string;
  adminUrl: string;
  fields: string;
}

const DATA: SolrIndexConfig[] = [
  {name: 'Hydrogen', baseUrl: 'Hydrogen', adminUrl:'test', fields: 'H'},
  {name: 'Helium', baseUrl: 'Hydrogen', adminUrl:'test',  fields: 'He'}
];
