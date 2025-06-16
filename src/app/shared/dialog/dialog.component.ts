import { Component, Input, Output, EventEmitter, Inject } from '@angular/core';
import { DialogData } from '../interfaces/dialog.interface';
import { MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';   


@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent {
  @Input() data: DialogData | undefined;
  @Output() close = new EventEmitter<void>();

  constructor(
    @Inject(MAT_DIALOG_DATA) public dialogData: DialogData,
    private dialogRef: MatDialogRef<DialogComponent>
  ) {}

  onAccept(): void {
    this.dialogRef.close(true);
    this.close.emit();
  }

  onClose(): void {
    this.dialogRef.close();
    this.close.emit();
  }
 
}
