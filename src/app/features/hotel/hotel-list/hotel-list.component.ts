import { Component, OnInit } from '@angular/core';
import { Hotel, HotelService } from '../../../core/services/hotel.service';
import { AuthService } from '../../../core/services/auth.service';
import { CommonModule } from '@angular/common';
import { MatCardActions, MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';

@Component({
  selector: 'app-hotel-list',
  templateUrl: './hotel-list.component.html',
  standalone: true,
    imports: [
      CommonModule,
      MatCardModule,
      MatCardActions,
      MatButtonModule
    ],
  styleUrls: ['./hotel-list.component.scss']
})
export class HotelListComponent implements OnInit {
  hotels: Hotel[] = [];
  isLoading = false;

  constructor(
    private hotelService: HotelService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadHotels();
  }

  loadHotels(): void {
    this.isLoading = true;
    this.hotelService.listHotels(50, 'name').subscribe({
      next: (data) => {
        this.hotels = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error fetching hotels', err);
        this.isLoading = false;
      }
    });
  }

  isAdmin(): boolean {
    return this.authService.isAdmin();
  }

  onDeleteHotel(hotelId: number): void {
    if (confirm('Are you sure you want to delete this hotel?')) {
      this.hotelService.deleteHotel(hotelId).subscribe({
        next: () => {
          // On retire l'hôtel de la liste, côté front
          this.hotels = this.hotels.filter(h => h.id !== hotelId);
        },
        error: err => {
          console.error('Error deleting hotel', err);
        }
      });
    }
  }

  onEditHotel(hotelId: number): void {
    // Si hotelId == 0 => création, sinon édition
    if (hotelId === 0) {
      // Naviguer vers /hotels/new
      this.router.navigate(['/hotels', 'new']);
    } else {
      // Naviguer vers /hotels/:id/edit
      this.router.navigate(['/hotels', hotelId, 'edit']);
    }
  }

  onReserveHotel(hotelId: number): void {
    // Logique de réservation (pas encore définie)
    // Par exemple, ouvrir un petit dialogue ou un formulaire
    console.log(`Reserve hotel ID = ${hotelId}`);
  }
}
