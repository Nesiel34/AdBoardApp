import { Component, inject, OnInit } from '@angular/core';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import { AdCardComponent } from '../ad-card/ad-card.component';
import { MatButtonModule } from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {MatTooltipModule} from '@angular/material/tooltip';
import { MatDialog } from '@angular/material/dialog';
import { EditAdDialogComponent } from '../../dialogs/edit-ad-dialog/edit-ad-dialog.component';
import { AdService } from '../../../shared/ad.service';
import { IAd } from '../../interface/IAd.interface';


@Component({
  selector: 'app-ads-list',
  standalone: true,
  imports: [AdCardComponent,ReactiveFormsModule,MatButtonModule,MatIcon,MatTooltipModule],
  templateUrl: './ads-list.component.html',
  styleUrl: './ads-list.component.scss'
})
export class AdsListComponent implements OnInit {


  dialog: MatDialog = inject(MatDialog);
  adService =  inject(AdService);

  searchTerm!:FormControl;
  filteredAds!:IAd[];


  ngOnInit(): void {
    this.searchTerm = new FormControl("");
    this.adService.getAllAds().subscribe(s=>{
      this.filteredAds = this.adService.ads();
    });
  }

  search(): void {
    this.filteredAds = this.adService.ads().filter((ad) =>
      ad.title.toLowerCase().includes(this.searchTerm.value.toLowerCase())
    );
  }

  updateFilterAds(){
    this.filteredAds = this.adService.ads();
  }

  addAd(){
   const dialogRef = this.dialog.open(EditAdDialogComponent, {
      data: {},
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        console.log(result);
        this.adService.createAd(result).subscribe(()=>{
          this.adService.getAllAds().subscribe(()=>{
            this.updateFilterAds();
          });
        })
      }
    });
  }



}
