import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { BookingService } from '../../services/booking.service';
import { PatientInfo } from '../../models/appointment.model';

@Component({
  selector: 'app-confirm-details',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <!-- Step header -->
    <header class="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div class="flex items-center h-14 px-4">
        <button (click)="close()" class="text-gray-400 hover:text-gray-600 mr-3">
          <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>
        <img src="assets/logo.jpg" alt="Dermatology of Boca" class="h-8 object-contain">

        <!-- Steps -->
        <div class="ml-auto flex items-center gap-2 text-sm">
          <div class="flex items-center gap-1.5">
            <div class="w-6 h-6 rounded-full bg-brand flex items-center justify-center">
              <svg class="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"/>
              </svg>
            </div>
            <span class="text-gray-400 text-xs line-through">Choose Provider</span>
          </div>
          <div class="w-12 h-0.5 bg-brand"></div>
          <div class="flex items-center gap-1.5">
            <div class="w-6 h-6 rounded-full bg-brand flex items-center justify-center">
              <svg class="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"/>
              </svg>
            </div>
            <span class="text-gray-400 text-xs line-through">Select Time</span>
          </div>
          <div class="w-12 h-0.5 bg-brand"></div>
          <div class="flex items-center gap-1.5">
            <div class="w-6 h-6 rounded-full bg-brand flex items-center justify-center">
              <span class="text-white text-xs font-bold">3</span>
            </div>
            <span class="font-semibold text-brand">Confirm Details</span>
          </div>
          <div class="w-12 h-0.5 bg-gray-200"></div>
          <div class="flex items-center gap-1.5 opacity-40">
            <div class="w-6 h-6 rounded-full border-2 border-gray-300 flex items-center justify-center">
              <span class="text-gray-500 text-xs font-bold">4</span>
            </div>
            <span class="text-gray-500">Complete</span>
          </div>
        </div>
      </div>
    </header>

    <div class="min-h-screen bg-gray-50 py-6 px-4">
      <div class="max-w-4xl mx-auto flex gap-6">

        <!-- Left: Form -->
        <div class="flex-1">
          <div class="card p-6">
            <h1 class="text-lg font-bold text-gray-900 mb-6">Confirm Your Appointment</h1>

            <!-- Expected Co-Pay -->
            <div class="bg-brand-50 border border-brand-100 rounded-lg p-4 mb-6 flex items-start gap-3">
              <svg class="w-5 h-5 text-brand shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
              <div>
                <p class="font-semibold text-brand text-sm">Expected Co-Pay</p>
                <p class="text-sm text-gray-600 mt-0.5">
                  Based on your insurance, your estimated co-pay is <strong class="text-brand">$25</strong>. Final costs will be confirmed at your visit.
                </p>
              </div>
            </div>

            <!-- Patient Information -->
            <div class="mb-6">
              <h2 class="font-semibold text-gray-800 mb-4">Patient Information</h2>
              <div class="grid grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  <input [(ngModel)]="patientInfo.fullName" placeholder="John Doe" class="input-field">
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
                  <input [(ngModel)]="patientInfo.dateOfBirth" type="date" placeholder="mm/dd/yyyy" class="input-field">
                </div>
              </div>
            </div>

            <!-- Contact Information -->
            <div class="mb-6">
              <h2 class="font-semibold text-gray-800 mb-4">Contact Information</h2>
              <div class="grid grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                  <div class="relative">
                    <svg class="absolute left-3 top-2.5 w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                    </svg>
                    <input [(ngModel)]="patientInfo.email" type="email" placeholder="john@example.com" class="input-field pl-10">
                  </div>
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                  <div class="relative">
                    <svg class="absolute left-3 top-2.5 w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                    </svg>
                    <input [(ngModel)]="patientInfo.phone" placeholder="(555) 123-4567" class="input-field pl-10">
                  </div>
                </div>
              </div>
            </div>

            <!-- Insurance -->
            <div class="mb-6">
              <label class="block text-sm font-medium text-gray-700 mb-1">Insurance Provider</label>
              <select [(ngModel)]="patientInfo.insurance" class="input-field">
                <option value="">Select insurance provider</option>
                <option>Aetna</option>
                <option>Blue Cross Blue Shield</option>
                <option>Cigna</option>
                <option>UnitedHealthcare</option>
                <option>Medicare</option>
                <option>Medicaid</option>
                <option>Self-Pay</option>
              </select>
            </div>

            <!-- Reason for Visit -->
            <div class="mb-6">
              <label class="block text-sm font-medium text-brand mb-1">Reason for Visit <span class="text-gray-400 font-normal">(Optional)</span></label>
              <textarea [(ngModel)]="patientInfo.reasonForVisit"
                placeholder="Brief description of your skin concern or reason for the visit"
                rows="3" class="input-field resize-none"></textarea>
            </div>

            <!-- Reminders checkbox -->
            <div class="mb-6">
              <label class="flex items-start gap-3 cursor-pointer">
                <input type="checkbox" [(ngModel)]="patientInfo.sendReminders"
                  class="mt-0.5 w-4 h-4 accent-brand">
                <span class="text-sm text-gray-700">
                  Send me appointment reminders
                  <span class="font-semibold">24 hours</span> and then
                  <span class="font-semibold">6 hours</span> before the appointment time via text.
                </span>
              </label>
            </div>

            <!-- HIPAA notice -->
            <div class="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-6 flex items-start gap-3">
              <div class="w-5 h-5 rounded-full border-2 border-brand shrink-0 flex items-center justify-center mt-0.5">
                <span class="text-brand text-xs font-bold">i</span>
              </div>
              <div>
                <p class="font-semibold text-gray-800 text-sm">HIPAA Compliance Notice</p>
                <p class="text-sm text-gray-500 mt-0.5">Your information is protected under HIPAA regulations. We will never share your data without your consent.</p>
              </div>
            </div>

            <!-- Confirm button -->
            <button (click)="confirmAppointment()"
              class="btn-brand w-full py-3 text-base">
              Confirm Appointment
            </button>
          </div>
        </div>

        <!-- Right: Summary -->
        <div class="w-72 shrink-0">
          <div class="card p-4 sticky top-24">
            <h3 class="font-semibold text-sm text-gray-900 mb-3">Appointment Summary</h3>
            <div class="flex items-center gap-3 pb-3 border-b border-gray-100">
              <img [src]="booking().providerPhoto || 'https://ui-avatars.com/api/?name=Doctor&background=7ba8a0&color=fff'"
                alt="Provider" class="w-12 h-12 rounded-full object-cover">
              <div>
                <p class="font-semibold text-sm text-gray-900">{{ booking().providerName }}</p>
                <p class="text-xs text-brand">{{ booking().providerSpecialty }}</p>
              </div>
            </div>
            <div class="pt-3 space-y-2">
              <div class="flex items-center gap-2 text-sm text-gray-600">
                <svg class="w-4 h-4 text-gray-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                </svg>
                <span>{{ formatDateTime() }}</span>
                <button class="ml-auto text-gray-400 hover:text-brand" (click)="editTime()">
                  <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                  </svg>
                </button>
              </div>
              <div class="flex items-center gap-2 text-sm text-gray-600">
                <svg class="w-4 h-4 text-gray-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                </svg>
                <span>{{ booking().location }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class ConfirmDetailsComponent {
  private router = inject(Router);
  private bookingService = inject(BookingService);

  booking = this.bookingService.state;

  patientInfo: PatientInfo = {
    fullName: '',
    dateOfBirth: '',
    email: '',
    phone: '',
    insurance: '',
    reasonForVisit: '',
    sendReminders: true,
  };

  formatDateTime(): string {
    const s = this.booking();
    if (!s.selectedDate) return 'No time selected';
    const d = new Date(s.selectedDate + 'T00:00:00');
    const dateStr = d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' });
    return `${dateStr} at ${s.selectedTime}`;
  }

  confirmAppointment(): void {
    this.bookingService.setPatientInfo(this.patientInfo);
    this.router.navigate(['/booking/complete']);
  }

  editTime(): void {
    this.router.navigate(['/booking/time']);
  }

  close(): void {
    this.router.navigate(['/']);
  }
}
