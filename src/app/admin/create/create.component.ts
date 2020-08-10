import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

export interface Filter {
  operator: string;
  condition: number;
  fieldLabel: string;
  fieldName: string;
  criteria: string;
  filterType: string;
  from: string;
  to: string;
  value: string;
}

export interface Chart {
  dataSource: string;
  type: number;
  fieldLabel: string;
  fieldName: string;
  title: string;
  facetQuery: string;
  facetField: string;
  id: string;
  seriesData: string;
}

export interface UserCriteria {
  fieldLabel: string;
  fieldName: string;
}

const FILTER_DATA: Filter[] = [
  {condition: 1, operator: 'Hydrogen', fieldLabel: '1.0079', fieldName: 'H', criteria: '', filterType:'', from:'', to:'', value:''},
  {condition: 2, operator: 'Helium', fieldLabel: '4.0026', fieldName: 'He', criteria: '', filterType:'', from:'', to:'', value:''}
];

const CHART_DATA: Chart[] = [
  {type: 1, dataSource: 'Hydrogen', fieldLabel: '1.0079', fieldName: 'H', title: 'test', facetQuery:'', facetField:'', id:'', seriesData:''},
  {type: 2, dataSource: 'Helium', fieldLabel: '4.0026', fieldName: 'He', title: 'test2', facetQuery:'', facetField:'', id:'', seriesData:''}
];

const USER_CRITERIA_DATA: UserCriteria[] = [
  {fieldLabel: 'Hydrogen', fieldName: 'H'},
  {fieldLabel: 'Helium', fieldName: 'He'}
];

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'}
];

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  forthFormGroup: FormGroup;
  isEditable: boolean = true;

  displayedColumns1 = ['actions', 'condition', 'operator', 'fieldLabel', 'fieldName', 'criteria', 'filterType', 'from', 'to', 'value']
  displayedColumns2 = ['position', 'name', 'weight', 'symbol'];
  displayedColumns3 = ['actions', 'type', 'dataSource', 'fieldLabel', 'fieldName', 'title', 'facetQuery', 'facetField', 'id', 'seriesData'];
  displayedColumns4 = ['actions', 'fieldLabel', 'fieldName'];

  dataSource = FILTER_DATA;
  dataSource2 = ELEMENT_DATA;
  dataSource3 = CHART_DATA;
  dataSource4 = USER_CRITERIA_DATA;

  constructor(private _formBuilder: FormBuilder) {}

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    //this.secondFormGroup = this._formBuilder.group({
    //secondCtrl: ['', Validators.required]
    //});
    //this.thirdFormGroup = this._formBuilder.group({
    // thirdCtrl: ['', Validators.required]
    //});
    //this.forthFormGroup = this._formBuilder.group({
    // forthCtrl: ['', Validators.required]
    //});
  }

}
