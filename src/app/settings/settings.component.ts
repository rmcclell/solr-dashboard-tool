import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';

import {PreferencesComponent} from './preferences/preferences.component';
import {SolrIndexesComponent} from './solr-indexes/solr-indexes.component';
import {DisplayComponent} from './display/display.component';

@Component({
  template: '',
  entryComponents: [
    PreferencesComponent,
    SolrIndexesComponent,
    DisplayComponent

  ]
})
export class SettingsEntryComponent {

  constructor(public dialog: MatDialog, private router: Router,
              private route: ActivatedRoute) {
    this.openDialog();
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(SettingsComponent, {
      width: '800px'
    });
    dialogRef.afterClosed().subscribe(result => {
      this.router.navigate(['../'], { relativeTo: this.route });
    });
  }
}

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
  entryComponents: [
    PreferencesComponent,
    SolrIndexesComponent,
    DisplayComponent

  ]
})
export class SettingsComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<SettingsComponent>
  ) {}

  ngOnInit(): void {

  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onOkClick(): void {
    this.dialogRef.close();
  }
}
