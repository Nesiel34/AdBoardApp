import { Component, inject, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input'
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogClose } from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-edit-ad-dialog',
  standalone: true,
  imports: [MatFormFieldModule,MatInput,ReactiveFormsModule,MatButtonModule,MatDialogClose],
  templateUrl: './edit-ad-dialog.component.html',
  styleUrl: './edit-ad-dialog.component.scss',

})
export class EditAdDialogComponent implements OnInit {

  formBuilder = inject(FormBuilder);
  formEditAd!:FormGroup;


  constructor(
    public dialogRef: MatDialogRef<EditAdDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.formEditAd = this.formBuilder.group({
      title:this.data.title,
      description:this.data.description,
      location:this.data.location
    })
  }

  ngOnInit(): void {

  }

  onSave(): void {
    this.dialogRef.close( this.formEditAd.value);
  }

}
