import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { BookingService } from '../../services/booking.service';

@Component({
  selector: 'app-complete',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <!-- Minimal header -->
    <header class="bg-white border-b border-gray-200">
      <div class="flex items-center h-14 px-4">
        <img src="assets/logo.jpg" alt="Dermatology of Boca" class="h-8 object-contain">
      </div>
    </header>

    <div class="min-h-screen bg-gray-50 py-12 px-4">
      <div class="max-w-2xl mx-auto">

        <!-- Success icon -->
        <div class="flex justify-center mb-6">
          <div class="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
            <svg class="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"/>
            </svg>
          </div>
        </div>

        <div class="text-center mb-8">
          <h1 class="text-2xl font-bold text-gray-900">Appointment Confirmed!</h1>
          <p class="text-gray-500 mt-2">Your dermatology appointment has been successfully scheduled</p>
        </div>

        <!-- Appointment details card -->
        <div class="card p-6 mb-6">
          <!-- Provider -->
          <div class="flex items-center gap-4 pb-5 border-b border-gray-100">
            <img [src]="booking().providerPhoto || 'https://ui-avatars.com/api/?name=Doctor&background=7ba8a0&color=fff'"
              alt="Provider" class="w-14 h-14 rounded-full object-cover border-2 border-gray-100">
            <div>
              <p class="font-bold text-gray-900">{{ booking().providerName }}, <span class="font-normal text-gray-600">{{ booking().providerSpecialty }}</span></p>
              <p class="text-sm text-gray-500">{{ booking().providerSpecialty }}</p>
            </div>
          </div>

          <!-- Details -->
          <div class="py-4 border-b border-gray-100 space-y-4">
            <div class="flex items-center gap-3">
              <div class="w-8 h-8 bg-gray-50 rounded-lg flex items-center justify-center">
                <svg class="w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                </svg>
              </div>
              <div>
                <p class="text-xs text-gray-400">Date &amp; Time</p>
                <p class="font-semibold text-gray-900">{{ formatDateTime() }}</p>
              </div>
            </div>

            <div class="flex items-center gap-3">
              <div class="w-8 h-8 bg-gray-50 rounded-lg flex items-center justify-center">
                <svg class="w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-2 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
                </svg>
              </div>
              <div>
                <p class="text-xs text-gray-400">Location</p>
                <p class="font-semibold text-gray-900">{{ booking().location }}</p>
              </div>
            </div>

            <div class="flex items-center gap-3">
              <div class="w-8 h-8 bg-gray-50 rounded-lg flex items-center justify-center">
                <svg class="w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              </div>
              <div>
                <p class="text-xs text-gray-400">Expected Co-Pay</p>
                <p class="font-semibold text-gray-900">$25</p>
              </div>
            </div>
          </div>

          <!-- Confirmation sent -->
          <div class="mt-4 bg-brand-50 border border-brand-100 rounded-lg p-3 flex items-center gap-3">
            <svg class="w-5 h-5 text-brand shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
            </svg>
            <div>
              <p class="text-sm font-semibold text-brand">Confirmation Sent</p>
              <p class="text-xs text-gray-500">We've sent confirmation details to {{ booking().patientInfo?.email || 'your email' }}</p>
            </div>
          </div>
        </div>

        <!-- Action buttons -->
        <div class="flex gap-3 justify-center mb-8">
          <button class="btn-brand flex items-center gap-2 px-5 py-2.5">
            <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
            </svg>
            Add to Calendar
          </button>
          <button class="btn-brand-outline flex items-center gap-2 px-5 py-2.5">
            <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"/>
            </svg>
            Print Confirmation
          </button>
          <button class="btn-brand-outline flex items-center gap-2 px-5 py-2.5">
            <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
            </svg>
            Get Directions
          </button>
        </div>

        <hr class="border-gray-200 mb-4">

        <p class="text-center text-sm text-gray-500">
          Need to make changes?
          <a [routerLink]="['/booking/time']" class="text-brand hover:underline">Reschedule</a>
          or
          <a href="#" class="text-brand hover:underline">cancel your appointment</a>
        </p>
      </div>
    </div>
  `
})
export class CompleteComponent {
  private router = inject(Router);
  private bookingService = inject(BookingService);

  booking = this.bookingService.state;

  formatDateTime(): string {
    const s = this.booking();
    if (!s.selectedDate) return 'Date TBD';
    const d = new Date(s.selectedDate + 'T00:00:00');
    const dateStr = d.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });
    return `${dateStr} at ${s.selectedTime}`;
  }
}
