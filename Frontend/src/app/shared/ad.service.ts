import { inject, Injectable, signal } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { IAd } from '../ads/interface/IAd.interface';

@Injectable({
  providedIn: 'root'
})
export class AdService {


  http = inject(HttpClient);
  ads = signal<IAd[]>([] as IAd[]);

  getAllAds(): Observable<IAd[]> {
    return this.http.get<IAd[]>(`${environment.apiUrl}/ads`).pipe(tap(t=>{
        this.ads.set(t);
    }));
  }

  createAd(ad: Partial<IAd>): Observable<IAd> {
    return this.http.post<IAd>(`${environment.apiUrl}/ads`, ad);
  }

  updateAd(id: number, ad: IAd): Observable<void> {
    return this.http.put<void>(`${environment.apiUrl}/ads/${id}`, ad);
  }

  deleteAd(id: number): Observable<void> {
    return this.http.delete<void>(`${environment.apiUrl}/ads/${id}`);
  }
}
