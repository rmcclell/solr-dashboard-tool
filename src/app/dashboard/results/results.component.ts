import {HttpClient} from '@angular/common/http';
import { Component, AfterViewInit, OnInit, ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';

import { saveAs } from 'file-saver';
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
  solrData: SolrHttpIndex | null;
  dataSource = [];

  resultsLength = 0;
  isLoadingResults = true;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private _httpClient: HttpClient) { }

  ngOnInit(): void {
    this.solrData = new SolrHttpIndex(this._httpClient);
  }

  ngAfterViewInit() {

    // If the user changes the sort order, reset back to the first page.
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          return this.solrData!.getData(
            this.sort.active, this.sort.direction, this.paginator.pageIndex, this.pageSize, this.displayedColumns.join(','));
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
  formatColumnHeader(header: string) {
    return header.split(/(?=[A-Z])/).join(' ');
  }
  exportResults() {
    this.solrData.getExport(this.sort.active, this.sort.direction, this.displayedColumns.join(',')).subscribe(function(data){
      var blob = new Blob([data], {type: "text/csv;charset=utf-8"});
      saveAs(blob, "export.csv");
    });
  }
}

export class SolrHttpIndex {
  constructor(private _httpClient: HttpClient) {}

  getExport(sort: string, order: string, fieldsList: string): Observable<any> {
    const href = 'http://localhost:8983/solr/cats/select';
    const requestUrl =
        `${href}?q=country%3A(%5B%22United%20States%22%20TO%20%22United%20States%22%5D)&wt=csv&indent=true&fl=${fieldsList}&sort=${sort}%20${order}&rows=1000`;
        http://localhost:8983/solr/cats/select
    return this._httpClient.get(requestUrl, { responseType: 'text' });
  }

  getData(sort: string, order: string, page: number, pageSize: number, fieldsList: string): Observable<Result> {
    const href = 'http://localhost:8983/solr/cats/select';
    const requestUrl =
        `${href}?q=country%3A(%5B%22United%20States%22%20TO%20%22United%20States%22%5D)&omitHeader=true&facet=false&fl=${fieldsList}&page=${page + 1}&start=0&rows=${pageSize}&sort=${sort}%20${order}`;
        http://localhost:8983/solr/cats/select
    return this._httpClient.get<Result>(requestUrl);
  }
}
