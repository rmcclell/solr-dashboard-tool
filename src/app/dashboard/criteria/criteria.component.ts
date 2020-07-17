import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { MatAutocompleteSelectedEvent, MatAutocomplete } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { startWith, map, mergeMap, tap, mergeAll } from 'rxjs/operators';
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

  constructor(private _httpClient: HttpClient, private fb: FormBuilder) {

      this.solrData = new SolrHttpIndex(this._httpClient);
    
      this.solrData.getData()
      .pipe(
         map(data => data.facet_counts.facet_fields ),
         map(data => Object.keys(data).map(k => { return new Object({ label: k, values: data[k] }) } ))
        )
        .subscribe(data => { this.criteria = data; console.log(this.criteria); return this.criteria; });

  }
  panelOpenState = true;
  solrData: SolrHttpIndex | null;
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true
  criteriaForm: FormGroup = this.fb.group({
    bodyType: [''],
    breed: [''],
    coat: [''],
    country: [''],
    id: [''],
    origin: [''],
    pattern: ['']
  });
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  filteredFruits: Observable<string[]>;
  criteria = [];
  fruits: string[] = ['Lemon'];
  allFruits: string[] = ['Apple', 'Lemon', 'Lime', 'Orange', 'Strawberry'];

  @ViewChild('fruitInput') fruitInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;

  ngOnInit(): void {
    
  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || '').trim()) {
      this.fruits.push(value.trim());
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }

    this.fruitCtrl.setValue(null);
  }

  remove(fruit: string): void {
    debugger;
    const index = this.fruits.indexOf(fruit);

    if (index >= 0) {
      this.fruits.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.fruits.push(event.option.viewValue);
    this.fruitInput.nativeElement.value = '';
    this.fruitCtrl.setValue(null);
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
