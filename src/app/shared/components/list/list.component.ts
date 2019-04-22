import { Component, OnInit } from '@angular/core';
import { DialogEditorComponent } from '../dialog-editor/dialog-editor.component';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  animal: string;


  constructor(public dialog: MatDialog) { }

  ngOnInit() {
  }

  openDialog(){
    const dialogRef = this.dialog.open(DialogEditorComponent, {
      width: '250px',
      data: {name: "teste", animal: "teste"}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.animal = result;
    });
  }

}
