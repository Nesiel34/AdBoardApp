import { DatePipe } from '@angular/common';
import { Component, inject, input, output } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import { EditAdDialogComponent } from '../../dialogs/edit-ad-dialog/edit-ad-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../dialogs/confirm-dialog/confirm-dialog.component';
import { MatIcon } from '@angular/material/icon';
import { IAd } from '../../interface/IAd.interface';
import { AdService } from '../../../shared/ad.service';

@Component({
  selector: 'app-ad-card',
  standalone: true,
  imports: [MatCardModule,DatePipe,MatButtonModule,MatIcon],
  templateUrl: './ad-card.component.html',
  styleUrl: './ad-card.component.scss'
})
export class AdCardComponent {

  ad = input.required<IAd>();
  updateAds = output();
  dialog: MatDialog = inject(MatDialog);
  adSerivce = inject(AdService);

  openEditDialog(): void {
    const dialogRef = this.dialog.open(EditAdDialogComponent, {
      data: this.ad(),
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        console.log(result);
        const editAd = {id:this.ad().id,...result};
        this.adSerivce.updateAd(this.ad().id,editAd).subscribe(()=>{
          this.updateAdsArray();
        })
      }
    });
  }

  openConfirmDialog(): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '350px',
      data:'Are you sure you want to delete this ad?',
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.adSerivce.deleteAd(this.ad().id,).subscribe(()=>{
          this.updateAdsArray();
        })
        console.log('User confirmed the action');

      } else {
        console.log('User canceled the action');
      }
    });
  }

  updateAdsArray(){
    this.adSerivce.getAllAds().subscribe(s=>{
      this.updateAds.emit();
    });
  }
}
