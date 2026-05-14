import { Component, Input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { PatientAppointment } from '../../models/appointment.model';

@Component({
  selector: 'app-appt-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="bg-white rounded-xl border border-gray-100 shadow-sm mb-4 p-5">
      <div class="flex gap-5">
        <!-- Date block -->
        <div class="text-center shrink-0 w-16">
          <p class="text-xs font-bold text-brand uppercase">{{ appt.month }}</p>
          <p class="text-3xl font-bold text-gray-900 leading-none">{{ appt.day }}</p>
          <p class="text-xs text-gray-400">{{ appt.dayOfWeek }}</p>
          <div class="flex items-center gap-0.5 mt-1 justify-center">
            <svg class="w-3 h-3 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
            <span class="text-xs text-gray-500">{{ appt.time }}</span>
          </div>
        </div>

        <!-- Content -->
        <div class="flex-1">
          <div class="flex items-start gap-3 mb-3 flex-wrap">
            <div class="flex items-center gap-3">
              <img [src]="appt.photo" [alt]="appt.doctor"
                class="w-10 h-10 rounded-full object-cover border border-gray-100">
              <div>
                <p class="font-semibold text-gray-900 text-sm">{{ appt.doctor }}</p>
                <p class="text-xs text-brand">{{ appt.specialty }}</p>
              </div>
            </div>

            @if (appt.location) {
              <div class="ml-4">
                <p class="text-xs text-gray-400 uppercase tracking-wide mb-0.5">LOCATION</p>
                <div class="flex items-center gap-1">
                  <svg class="w-3.5 h-3.5 text-brand shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                  </svg>
                  <p class="text-sm font-medium text-gray-700">{{ appt.location }}</p>
                </div>
              </div>
            }

            @if (appt.visitType) {
              <div class="ml-4">
                <p class="text-xs text-gray-400 uppercase tracking-wide mb-0.5">VISIT TYPE</p>
                <div class="flex items-center gap-1">
                  <svg class="w-3.5 h-3.5 text-brand shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"/>
                  </svg>
                  <p class="text-sm font-medium text-gray-700">{{ appt.visitType }}</p>
                </div>
              </div>
            }

            <div class="ml-4">
              <p class="text-xs text-gray-400 uppercase tracking-wide mb-0.5">REASON</p>
              <p class="text-sm font-medium text-gray-700">{{ appt.reason }}</p>
            </div>
          </div>

          <!-- Action buttons -->
          <div class="flex items-center gap-2 flex-wrap">
            <button class="bg-brand text-white text-xs px-3 py-1.5 rounded-lg flex items-center gap-1 hover:bg-brand-500 transition-colors">
              <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
              </svg>
              Add to Calendar
            </button>
            <button class="border border-brand text-brand text-xs px-3 py-1.5 rounded-lg flex items-center gap-1 hover:bg-brand-50 transition-colors">
              <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
              </svg>
              Get Directions
            </button>
            <button class="border border-brand text-brand text-xs px-3 py-1.5 rounded-lg flex items-center gap-1 hover:bg-brand-50 transition-colors">
              <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"/>
              </svg>
              Print Confirmation
            </button>

            @if (!appt.isPast) {
              <div class="ml-auto flex gap-2">
                <button class="text-xs px-3 py-1.5 border border-gray-200 rounded-lg text-gray-600 hover:border-brand hover:text-brand flex items-center gap-1 transition-colors">
                  <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
                  </svg>
                  Reschedule
                </button>
                <button class="text-xs px-3 py-1.5 border border-red-200 rounded-lg text-red-500 hover:bg-red-50 flex items-center gap-1 transition-colors">
                  <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                  </svg>
                  Cancel
                </button>
              </div>
            }
          </div>
        </div>
      </div>
    </div>
  `
})
export class AppointmentCardComponent {
  @Input() appt!: PatientAppointment;
}

@Component({
  selector: 'app-patient-portal',
  standalone: true,
  imports: [CommonModule, RouterLink, AppointmentCardComponent],
  template: `
    <!-- Header -->
    <header class="bg-white border-b border-gray-200">
      <div class="flex items-center justify-between h-14 px-6">
        <img src="assets/logo.jpg" alt="Dermatology of Boca" class="h-8 object-contain">
        <div class="flex items-center gap-3">
          <a [routerLink]="['/']"
            class="bg-brand text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-brand-500 transition-colors flex items-center gap-2">
            <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
            </svg>
            Schedule Appointment
          </a>
          <button class="text-sm text-gray-600 hover:text-brand font-medium">Sign Out</button>
        </div>
      </div>
    </header>

    <div class="max-w-4xl mx-auto px-4 py-6">

      <!-- Patient info card -->
      <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-5 mb-6">
        <div class="flex items-center gap-4 mb-4">
          <div class="w-12 h-12 rounded-full bg-gray-400 flex items-center justify-center shrink-0">
            <span class="text-white font-bold text-lg">SJ</span>
          </div>
          <div>
            <h1 class="text-lg font-bold text-gray-900">Sarah Johnson</h1>
            <p class="text-sm text-gray-500">MRN: 5753958 | Dermatology of Boca</p>
          </div>
        </div>
        <div class="grid grid-cols-4 gap-4 pt-4 border-t border-gray-100">
          <div>
            <p class="text-xs text-gray-400 uppercase tracking-wide font-medium mb-1">DOB</p>
            <p class="text-sm font-medium text-gray-800">08/14/1984</p>
          </div>
          <div>
            <p class="text-xs text-gray-400 uppercase tracking-wide font-medium mb-1">SEX</p>
            <p class="text-sm font-medium text-gray-800">Female</p>
          </div>
          <div>
            <p class="text-xs text-gray-400 uppercase tracking-wide font-medium mb-1">CONTACT</p>
            <p class="text-sm font-medium text-gray-800">(305) 555-7890</p>
          </div>
          <div>
            <p class="text-xs text-gray-400 uppercase tracking-wide font-medium mb-1">EMAIL</p>
            <p class="text-sm font-medium text-gray-800">patient&#64;example.com</p>
          </div>
        </div>
      </div>

      <!-- Tabs -->
      <div class="flex border-b border-gray-200 mb-6">
        <button (click)="activeTab.set('upcoming')"
          [class.border-b-2]="activeTab() === 'upcoming'"
          [class.border-brand]="activeTab() === 'upcoming'"
          [class.text-brand]="activeTab() === 'upcoming'"
          [class.text-gray-500]="activeTab() !== 'upcoming'"
          class="px-4 py-3 text-sm font-medium transition-colors -mb-px">
          Upcoming Appointments ({{ upcoming.length }})
        </button>
        <button (click)="activeTab.set('past')"
          [class.border-b-2]="activeTab() === 'past'"
          [class.border-brand]="activeTab() === 'past'"
          [class.text-brand]="activeTab() === 'past'"
          [class.text-gray-500]="activeTab() !== 'past'"
          class="px-4 py-3 text-sm font-medium transition-colors -mb-px ml-2">
          Past Appointments ({{ past.length }})
        </button>
      </div>

      <!-- Appointments -->
      @if (activeTab() === 'upcoming') {
        @for (appt of upcoming; track appt.id) {
          <app-appt-card [appt]="appt"></app-appt-card>
        }
      } @else {
        @for (appt of past; track appt.id) {
          <app-appt-card [appt]="appt"></app-appt-card>
        }
      }

      <!-- Insurance notice -->
      <div class="mt-6 bg-gray-50 border border-gray-200 rounded-xl p-4 flex items-start gap-3">
        <div class="w-8 h-8 bg-gray-200 rounded-lg flex items-center justify-center shrink-0">
          <svg class="w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
          </svg>
        </div>
        <div>
          <p class="text-sm font-semibold text-gray-800">Need to update insurance or contact information?</p>
          <p class="text-sm text-gray-500 mt-0.5">Please contact our practice office directly. This portal is for managing appointments only.</p>
        </div>
      </div>
    </div>
  `
})
export class PatientPortalComponent {
  activeTab = signal<'upcoming' | 'past'>('upcoming');

  upcoming: PatientAppointment[] = [
    {
      id: '1', month: 'MAY', day: '5', dayOfWeek: 'Tuesday', time: '2:30 PM',
      doctor: 'Dr. Sarah Chen', specialty: 'Dermatology',
      location: 'Downtown Miami', reason: 'Annual Skin Check',
      photo: 'https://randomuser.me/api/portraits/women/28.jpg', isPast: false
    },
    {
      id: '2', month: 'MAY', day: '12', dayOfWeek: 'Tuesday', time: '10:00 AM',
      doctor: 'Dr. Michael Rodriguez', specialty: 'Dermatology',
      visitType: 'Virtual Visit', reason: 'Follow-up Consultation',
      photo: 'https://randomuser.me/api/portraits/men/33.jpg', isPast: false
    }
  ];

  past: PatientAppointment[] = [
    {
      id: '3', month: 'APR', day: '14', dayOfWeek: 'Monday', time: '9:00 AM',
      doctor: 'Dr. Sarah Mitchell', specialty: 'Dermatology',
      location: 'Miami, FL', reason: 'Skin Checkup',
      photo: 'https://randomuser.me/api/portraits/women/44.jpg', isPast: true
    },
    {
      id: '4', month: 'MAR', day: '3', dayOfWeek: 'Tuesday', time: '11:30 AM',
      doctor: 'Dr. Jennifer Park', specialty: 'Cosmetic Dermatology',
      location: 'Miami, FL', reason: 'Cosmetic Consultation',
      photo: 'https://randomuser.me/api/portraits/women/51.jpg', isPast: true
    }
  ];
}
