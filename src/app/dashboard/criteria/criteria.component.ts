import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { TitleCasePipe } from '@angular/common';
import { MatAutocompleteSelectedEvent, MatAutocomplete } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';


import { Criteria } from './criteria';

export interface Fruit {
  name: string;
}

export interface Item {
  label: string;
  values: any[];
}

@Component({
  selector: 'app-criteria',
  templateUrl: './criteria.component.html',
  styleUrls: ['./criteria.component.scss']
})
export class CriteriaComponent implements OnInit {

  constructor(private _httpClient: HttpClient, private fb: FormBuilder, private _titleCasePipe: TitleCasePipe) {

      this.solrData = new SolrHttpIndex(this._httpClient);
    
      this.solrData.getData()
      .pipe(
         map(data => data.facet_counts.facet_fields ),
         map(data => Object.keys(data).map(k => { return new Object({ label: k, values: data[k] }) } ))
        )
        .subscribe(data => {
          this.criteria = data;
          console.log(this.criteria);
          let formControlGroup = {}
          for(let x = 0; x < this.criteria.length; x++) {
            formControlGroup[this.criteria[x].label] = new FormControl([]);
            
          }

          this.criteriaForm = new FormGroup(formControlGroup);

          return this.criteria;
        });

  }
  panelOpenState = true;
  solrData: SolrHttpIndex | null;
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true
  criteriaForm: FormGroup;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  filteredFruits: Observable<string[]>;
  criteria = [];
  fruits: string[] = ['Lemon'];
  allFruits: string[] = ['Apple', 'Lemon', 'Lime', 'Orange', 'Strawberry'];

    @ViewChild('auto') matAutocomplete: MatAutocomplete;

  ngOnInit(): void {
  }

  add(event: MatChipInputEvent, field: string): void {
    const input = event.input;
    const value = event.value;
    const control = this.criteriaForm.controls[field];

    // Add item to criteria
    if ((value || '').trim()) {
      control.value.push(value.trim());
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }

    control.setValue(null);
  }

  formatLabel(header: string) {
    return this._titleCasePipe.transform(header.split(/(?=[A-Z])/).join(' '));
  }

  remove(val: string, field: string): void {
    const control = this.criteriaForm.controls[field];
    let index = control.value.indexOf(val, 0);
    if (index > -1) {
      control.value.splice(index, 1);
    }
    control.markAsDirty();
  }

  selected(event: MatAutocompleteSelectedEvent, field: string): void {
    const control = this.criteriaForm.controls[field];
    control.value.push(event.option.viewValue);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allFruits.filter(fruit => fruit.toLowerCase().indexOf(filterValue) === 0);
  }

}

export class SolrHttpIndex {
  constructor(private _httpClient: HttpClient) {}

  //http://localhost:8983/solr/cats/select?q=*:*&omitHeader=true&facet=true&json.nl=arrarr&facet.missing=true&rows=0&facet.field=id&facet.field=breed&facet.field=country&facet.field=origin&facet.field=bodyType&facet.field=coat&facet.field=pattern

  getData(): Observable<Criteria> {
    const href = 'http://localhost:8983/solr/cats/select';
    const requestUrl =
        `${href}?q=*:*&omitHeader=true&facet=true&json.nl=arrarr&facet.missing=true&rows=0&facet.field=id&facet.field=breed&facet.field=country&facet.field=origin&facet.field=bodyType&facet.field=coat&facet.field=pattern`;
        http://localhost:8983/solr/cats/select
    return this._httpClient.get<Criteria>(requestUrl);
  }
}
