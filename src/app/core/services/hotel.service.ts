import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../environements/environment';
import { Observable } from 'rxjs';

export interface Hotel {
  id?: number;
  name: string;
  location: string;
  description: string;
  // autres champs...
}

@Injectable({
  providedIn: 'root'
})
export class HotelService {
  private baseUrl = `${environment.apiBaseUrl}/hotels`;

  constructor(private http: HttpClient) {}

  // POST /hotels
  createHotel(hotel: Hotel): Observable<Hotel> {
    return this.http.post<Hotel>(this.baseUrl, hotel);
  }

  // GET /hotels/{id}
  getHotel(id: number): Observable<Hotel> {
    return this.http.get<Hotel>(`${this.baseUrl}/${id}`);
  }

  // GET /hotels
  listHotels(limit = 10, sortBy?: string): Observable<Hotel[]> {
    let params = new HttpParams().set('limit', limit);
    if (sortBy) {
      params = params.set('sortBy', sortBy);
    }
    return this.http.get<Hotel[]>(this.baseUrl, { params });
  }

  // PUT /hotels/{id}
  updateHotel(id: number, hotel: Partial<Hotel>): Observable<Hotel> {
    return this.http.put<Hotel>(`${this.baseUrl}/${id}`, hotel);
  }

  // DELETE /hotels/{id}
  deleteHotel(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
