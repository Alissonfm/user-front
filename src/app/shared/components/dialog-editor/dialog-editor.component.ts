import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material';

@Component({
  selector: 'app-dialog-editor',
  templateUrl: './dialog-editor.component.html',
  styleUrls: ['./dialog-editor.component.css']
})
export class DialogEditorComponent {

  constructor(
    public dialogRef: MatDialogRef<DialogEditorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}

/*
@Component({
  selector: 'app-dialog-editor',
  templateUrl: './dialog-editor.component.html',
  styleUrls: ['./dialog-editor.component.css']
})
export class DialogEditorComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
*/