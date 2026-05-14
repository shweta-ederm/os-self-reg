import { Component, inject, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { BookingService } from '../../services/booking.service';
import { ProviderService } from '../../services/provider.service';
import { AppointmentType } from '../../models/appointment.model';

interface CalendarDay {
  label: string;
  dayName: string;
  dayNum: number;
  monthName: string;
  date: string;
  isSelected: boolean;
}

interface TimeRow {
  time: string;
  slots: { date: string; available: boolean; selected: boolean }[];
}

@Component({
  selector: 'app-select-time',
  standalone: true,
  imports: [CommonModule],
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
            <span class="text-gray-400 line-through text-xs">Choose Provider</span>
          </div>
          <div class="w-12 h-0.5 bg-brand"></div>
          <div class="flex items-center gap-1.5">
            <div class="w-6 h-6 rounded-full bg-brand flex items-center justify-center">
              <span class="text-white text-xs font-bold">2</span>
            </div>
            <span class="font-semibold text-brand">Select Time</span>
          </div>
          <div class="w-12 h-0.5 bg-gray-200"></div>
          <div class="flex items-center gap-1.5 opacity-40">
            <div class="w-6 h-6 rounded-full border-2 border-gray-300 flex items-center justify-center">
              <span class="text-gray-500 text-xs font-bold">3</span>
            </div>
            <span class="text-gray-500">Confirm Details</span>
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
      <div class="max-w-5xl mx-auto flex gap-6">

        <!-- Left: Time selection -->
        <div class="flex-1">
          <div class="card p-6">
            <h1 class="text-lg font-bold text-gray-900 mb-1">Select Your Appointment Time</h1>
            <p class="text-sm text-gray-500 mb-6">Choose a convenient date and time with {{ booking().providerName }}</p>

            <!-- Appointment Type -->
            <div class="mb-6">
              <p class="text-sm font-medium text-gray-700 mb-2">Appointment Type</p>
              <div class="flex gap-2">
                <button (click)="setType('in-person')"
                  [class.bg-brand]="booking().appointmentType === 'in-person'"
                  [class.text-white]="booking().appointmentType === 'in-person'"
                  [class.border-brand]="booking().appointmentType === 'in-person'"
                  [class.text-gray-600]="booking().appointmentType !== 'in-person'"
                  [class.border-gray-300]="booking().appointmentType !== 'in-person'"
                  class="flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-medium transition-colors">
                  <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                  </svg>
                  In-Person
                </button>
                <button (click)="setType('virtual')"
                  [class.bg-brand]="booking().appointmentType === 'virtual'"
                  [class.text-white]="booking().appointmentType === 'virtual'"
                  [class.border-brand]="booking().appointmentType === 'virtual'"
                  [class.text-gray-600]="booking().appointmentType !== 'virtual'"
                  [class.border-gray-300]="booking().appointmentType !== 'virtual'"
                  class="flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-medium transition-colors">
                  <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"/>
                  </svg>
                  Virtual Visit
                </button>
              </div>
            </div>

            <!-- Date selector header -->
            <div class="mb-4">
              <p class="text-sm font-medium text-gray-700 mb-2">Select a Date</p>
              <div class="flex items-center justify-between border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-600 mb-3">
                <span>{{ selectedDateFull() }}</span>
                <svg class="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                </svg>
              </div>

              <p class="text-sm font-medium text-gray-700 mb-2">Select a Date</p>
              <!-- Day strip -->
              <div class="flex items-center gap-1">
                <button (click)="prevWeek()" class="text-gray-400 hover:text-brand p-1">
                  <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
                  </svg>
                </button>
                <div class="flex gap-1 flex-1 overflow-hidden">
                  @for (day of visibleDays(); track day.date) {
                    <button (click)="selectDate(day)"
                      [class.bg-brand]="day.isSelected"
                      [class.text-white]="day.isSelected"
                      [class.border-brand]="day.isSelected"
                      [class.border-gray-200]="!day.isSelected"
                      class="flex-1 border rounded-lg py-2 text-center transition-colors">
                      <p class="text-xs text-inherit opacity-70">{{ day.dayName }}</p>
                      <p class="text-sm font-bold">{{ day.dayNum }}</p>
                      <p class="text-xs text-inherit opacity-60">{{ day.monthName }}</p>
                    </button>
                  }
                </div>
                <button (click)="nextWeek()" class="text-gray-400 hover:text-brand p-1">
                  <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                  </svg>
                </button>
              </div>
            </div>

            <!-- Time grid -->
            <div class="mt-4">
              <div class="flex items-center justify-between mb-2">
                <p class="text-sm font-medium text-gray-700">Available Times</p>
                <button class="text-brand">
                  <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
                  </svg>
                </button>
              </div>

              <!-- Grid header -->
              <div class="grid grid-cols-6 gap-1 mb-1">
                <div class="text-xs text-gray-400 font-medium text-center">Time</div>
                @for (day of visibleDays(); track day.date) {
                  <div class="text-xs text-gray-500 font-medium text-center">
                    <span [class.text-brand]="day.isSelected" [class.font-bold]="day.isSelected">
                      {{ day.label }}
                    </span>
                  </div>
                }
              </div>

              <!-- Time rows -->
              <div class="space-y-0.5 max-h-96 overflow-y-auto pr-1">
                @for (row of timeRows(); track row.time) {
                  <div class="grid grid-cols-6 gap-1 items-center">
                    <div class="text-xs text-gray-400 text-right pr-2">{{ row.time }}</div>
                    @for (slot of row.slots; track slot.date) {
                      <div class="text-center">
                        @if (slot.selected) {
                          <button class="slot-selected w-full text-xs py-1 rounded" (click)="clearSlot()">
                            {{ row.time }}
                          </button>
                        } @else if (slot.available) {
                          <button class="slot-available w-full" (click)="pickSlot(slot.date, row.time)">
                            Book
                          </button>
                        } @else {
                          <span class="slot-unavailable w-full block text-center">—</span>
                        }
                      </div>
                    }
                  </div>
                }
              </div>
            </div>
          </div>
        </div>

        <!-- Right: Appointment summary -->
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
                <span>{{ booking().selectedDate ? formatDate(booking().selectedDate!) + ' at ' + booking().selectedTime : 'No time selected' }}</span>
              </div>
              @if (booking().location) {
                <div class="flex items-center gap-2 text-sm text-gray-600">
                  <svg class="w-4 h-4 text-gray-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                  </svg>
                  <span>{{ booking().location }}</span>
                </div>
              }
            </div>
            @if (booking().selectedTime) {
              <button (click)="continueToConfirm()"
                class="btn-brand w-full mt-4 text-sm">
                Continue to Confirmation
              </button>
            }
          </div>
        </div>
      </div>
    </div>
  `
})
export class SelectTimeComponent implements OnInit {
  private router = inject(Router);
  private bookingService = inject(BookingService);
  private providerService = inject(ProviderService);

  booking = this.bookingService.state;

  days = signal<CalendarDay[]>([]);
  weekOffset = signal(0);
  selectedDateStr = signal('');

  visibleDays = computed(() => {
    const all = this.days();
    const offset = this.weekOffset() * 5;
    return all.slice(offset, offset + 5).map(d => ({
      ...d,
      isSelected: d.date === this.selectedDateStr(),
      label: this.shortLabel(d)
    }));
  });

  selectedDateFull = computed(() => {
    const d = this.selectedDateStr();
    if (!d) return 'Mon, May 18, 2026';
    const dt = new Date(d + 'T00:00:00');
    return dt.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' });
  });

  timeRows = computed((): TimeRow[] => {
    const times = this.generateTimes();
    const vDays = this.visibleDays();
    const p = this.booking().providerId
      ? this.providerService.getById(this.booking().providerId!)
      : undefined;

    return times.map(time => ({
      time,
      slots: vDays.map(day => {
        const dayData = p?.availability.find(a => a.date === day.date);
        const slot = dayData?.slots.find(s => s.time === time);
        const isSelected = day.date === this.booking().selectedDate && time === this.booking().selectedTime;
        return {
          date: day.date,
          available: slot?.available ?? (Math.random() > 0.6),
          selected: isSelected
        };
      })
    }));
  });

  ngOnInit(): void {
    this.buildDays();
    if (this.booking().selectedDate) {
      this.selectedDateStr.set(this.booking().selectedDate!);
    } else {
      this.selectedDateStr.set(this.days()[0]?.date ?? '');
    }
  }

  buildDays(): void {
    const base = new Date('2026-05-14');
    const dayNames = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const result: CalendarDay[] = [];
    for (let i = 0; i < 14; i++) {
      const d = new Date(base);
      d.setDate(base.getDate() + i);
      const dateStr = d.toISOString().split('T')[0];
      result.push({
        label: '',
        dayName: dayNames[d.getDay() === 0 ? 6 : d.getDay() - 1],
        dayNum: d.getDate(),
        monthName: monthNames[d.getMonth()],
        date: dateStr,
        isSelected: false
      });
    }
    this.days.set(result);
  }

  shortLabel(d: CalendarDay): string {
    const today = new Date('2026-05-14');
    const dayDate = new Date(d.date + 'T00:00:00');
    const diff = Math.round((dayDate.getTime() - today.getTime()) / 86400000);
    if (diff === 0) return 'Today';
    if (diff === 1) return 'Tomorrow';
    return `${d.dayName} ${d.monthName} ${d.dayNum}`;
  }

  generateTimes(): string[] {
    const times: string[] = [];
    for (let h = 8; h <= 17; h++) {
      const ampm = h < 12 ? 'AM' : 'PM';
      const h12 = h > 12 ? h - 12 : h;
      times.push(`${h12}:00 ${ampm}`);
      if (h < 17) times.push(`${h12}:30 ${ampm}`);
    }
    return times;
  }

  selectDate(day: CalendarDay): void {
    this.selectedDateStr.set(day.date);
    this.bookingService.setDateTime(day.date, this.booking().selectedTime ?? '');
  }

  setType(type: AppointmentType): void {
    this.bookingService.setAppointmentType(type);
  }

  pickSlot(date: string, time: string): void {
    this.bookingService.setDateTime(date, time);
    this.selectedDateStr.set(date);
  }

  clearSlot(): void {
    this.bookingService.setDateTime(this.booking().selectedDate ?? '', '');
  }

  prevWeek(): void {
    if (this.weekOffset() > 0) this.weekOffset.update(n => n - 1);
  }

  nextWeek(): void {
    const maxOffset = Math.floor((this.days().length - 5) / 5);
    if (this.weekOffset() < maxOffset) this.weekOffset.update(n => n + 1);
  }

  formatDate(dateStr: string): string {
    const d = new Date(dateStr + 'T00:00:00');
    return d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' });
  }

  continueToConfirm(): void {
    this.router.navigate(['/booking/confirm']);
  }

  close(): void {
    this.router.navigate(['/']);
  }
}
