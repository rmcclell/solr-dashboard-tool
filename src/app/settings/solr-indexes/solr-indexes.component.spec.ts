import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SolrIndexesComponent } from './solr-indexes.component';

describe('SolrIndexesComponent', () => {
  let component: SolrIndexesComponent;
  let fixture: ComponentFixture<SolrIndexesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SolrIndexesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SolrIndexesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
