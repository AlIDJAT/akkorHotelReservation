import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HotelService, Hotel } from '../../../core/services/hotel.service';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-hotel-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule
  ],
  templateUrl: './hotel-form.component.html',
  styleUrls: ['./hotel-form.component.scss']
})
export class HotelFormComponent implements OnInit {
  hotelForm = new FormGroup({
    name: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    location: new FormControl('', Validators.required),
  });
  hotelId: number | null = null;
  isEditMode = false;
  isLoading = false;

  constructor(
    private route: ActivatedRoute,
    private hotelService: HotelService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    // Si l'id est présent et différent de 'new', on est en mode édition
    if (idParam && idParam !== 'new') {
      this.hotelId = Number(idParam);
      this.isEditMode = true;
      this.loadHotel(this.hotelId);
    }
  }

  loadHotel(id: number): void {
    this.isLoading = true;
    this.hotelService.getHotel(id).subscribe({
      next: (hotel) => {
        this.hotelForm.setValue({
          name: hotel.name,
          description: hotel.description || '',
          location: hotel.location || '',
        });
        this.isLoading = false;
      },
      error: err => {
        console.error('Error loading hotel', err);
        this.isLoading = false;
      }
    });
  }

  onSubmit(): void {
    if (this.hotelForm.valid) {
      const hotel: Hotel = {
        name: this.hotelForm.value.name!,
        description: this.hotelForm.value.description!,
        location: this.hotelForm.value.location!,
      };

      if (this.isEditMode && this.hotelId) {
        // Mode édition : PUT /hotels/:id
        this.hotelService.updateHotel(this.hotelId, hotel).subscribe({
          next: updatedHotel => {
            this.snackBar.open('Hotel updated successfully!', 'Close', { duration: 3000 });
            this.router.navigate(['/hotels']);
          },
          error: err => {
            console.error('Error updating hotel', err);
            this.snackBar.open('Error updating hotel', 'Close', { duration: 3000 });
          }
        });
      } else {
        // Mode création : POST /hotels
        this.hotelService.createHotel(hotel).subscribe({
          next: createdHotel => {
            this.snackBar.open('Hotel created successfully!', 'Close', { duration: 3000 });
            this.router.navigate(['/hotels']);
          },
          error: err => {
            console.error('Error creating hotel', err);
            this.snackBar.open('Error creating hotel', 'Close', { duration: 3000 });
          }
        });
      }
    }
  }
}
