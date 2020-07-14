import {HttpClient} from '@angular/common/http';
import { Component, AfterViewInit, OnInit, ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';

import {merge, Observable, of as observableOf} from 'rxjs';
import {catchError, map, startWith, switchMap} from 'rxjs/operators';

import { Result } from './result';


@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})

export class ResultsComponent implements OnInit, AfterViewInit  {

  displayedColumns = ['id', 'breed','country','origin','bodyType','coat','pattern'];
  pageSize = 10;
  exampleDatabase: ExampleHttpDatabase | null;
  dataSource = [];

  resultsLength = 0;
  isLoadingResults = true;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private _httpClient: HttpClient) { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.exampleDatabase = new ExampleHttpDatabase(this._httpClient);

    // If the user changes the sort order, reset back to the first page.
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          return this.exampleDatabase!.getRepoIssues(
            this.sort.active, this.sort.direction, this.paginator.pageIndex, this.pageSize);
        }),
        map(data => {
          // Flip flag to show that loading has finished.
          this.isLoadingResults = false;
          this.resultsLength = data.response.numFound;

          return data.response.docs;
        }),
        catchError(() => {
          this.isLoadingResults = false;
          return observableOf([]);
        })
      ).subscribe(data => this.dataSource = data);
  }


  
}

export class ExampleHttpDatabase {
  constructor(private _httpClient: HttpClient) {}

  getRepoIssues(sort: string, order: string, page: number, pageSize: number): Observable<Result> {
    const href = 'http://localhost:8983/solr/cats/select';
    const requestUrl =
        `${href}?q=country%3A(%5B%22United%20States%22%20TO%20%22United%20States%22%5D)&omitHeader=true&facet=false&fl=id,breed,country,origin,bodyType,coat,pattern&page=${page + 1}&start=0&rows=${pageSize}&sort=${sort}%20${order}`;
        http://localhost:8983/solr/cats/select
    return this._httpClient.get<Result>(requestUrl);
  }
}
