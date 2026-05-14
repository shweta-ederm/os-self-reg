import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ProviderService } from '../../services/provider.service';
import { BookingService } from '../../services/booking.service';
import { Provider } from '../../models/provider.model';

@Component({
  selector: 'app-provider-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
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

        <!-- Step indicator -->
        <div class="ml-auto flex items-center gap-2 text-sm">
          <div class="flex items-center gap-1.5">
            <div class="w-6 h-6 rounded-full bg-brand flex items-center justify-center">
              <span class="text-white text-xs font-bold">1</span>
            </div>
            <span class="font-medium text-brand">Choose Provider</span>
          </div>
          <div class="w-16 h-0.5 bg-gray-200"></div>
          <div class="flex items-center gap-1.5 opacity-40">
            <div class="w-6 h-6 rounded-full border-2 border-gray-300 flex items-center justify-center">
              <span class="text-gray-500 text-xs font-bold">2</span>
            </div>
            <span class="text-gray-500">Select Time</span>
          </div>
          <div class="w-16 h-0.5 bg-gray-200"></div>
          <div class="flex items-center gap-1.5 opacity-40">
            <div class="w-6 h-6 rounded-full border-2 border-gray-300 flex items-center justify-center">
              <span class="text-gray-500 text-xs font-bold">3</span>
            </div>
            <span class="text-gray-500">Confirm Details</span>
          </div>
          <div class="w-16 h-0.5 bg-gray-200"></div>
          <div class="flex items-center gap-1.5 opacity-40">
            <div class="w-6 h-6 rounded-full border-2 border-gray-300 flex items-center justify-center">
              <span class="text-gray-500 text-xs font-bold">4</span>
            </div>
            <span class="text-gray-500">Complete</span>
          </div>
        </div>
      </div>
    </header>

    @if (provider()) {
      <div class="max-w-5xl mx-auto px-4 py-6">
        <!-- Back link -->
        <a (click)="close()" class="text-sm text-gray-500 hover:text-brand flex items-center gap-1 mb-6 cursor-pointer">
          <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
          </svg>
          Back to search results
        </a>

        <div class="grid grid-cols-3 gap-6">

          <!-- Left: Main content -->
          <div class="col-span-2 space-y-6">

            <!-- Provider header card -->
            <div class="card p-6">
              <div class="flex gap-4">
                <img [src]="provider()!.photo" [alt]="provider()!.name"
                  class="w-20 h-20 rounded-full object-cover border-2 border-gray-100 shrink-0">
                <div class="flex-1">
                  <div class="flex items-start justify-between">
                    <div>
                      <h1 class="text-xl font-bold text-gray-900">{{ provider()!.name }}, {{ provider()!.credentials }}</h1>
                      <p class="text-brand font-medium text-sm mt-0.5">{{ provider()!.specialty }}</p>
                    </div>
                    <button class="w-8 h-8 flex items-center justify-center border border-gray-200 rounded-full hover:border-brand hover:text-brand transition-colors">
                      <svg class="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
                      </svg>
                    </button>
                  </div>

                  <div class="flex items-center gap-3 mt-2 text-sm">
                    <div class="flex items-center gap-1">
                      <span class="text-yellow-400 text-sm">{{ getStars(provider()!.rating) }}</span>
                      <span class="font-semibold text-gray-700">{{ provider()!.rating }}</span>
                      <span class="text-gray-400">({{ provider()!.reviewCount }} reviews)</span>
                    </div>
                    <span class="text-gray-300">|</span>
                    <div class="flex items-center gap-1 text-gray-500">
                      <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                      </svg>
                      {{ provider()!.city }}
                    </div>
                    <span class="text-gray-300">|</span>
                    <span class="text-gray-500">{{ provider()!.distance }}</span>
                  </div>
                  <p class="text-xs text-brand mt-1">First available: {{ provider()!.nextAvailable }}</p>
                </div>
              </div>

              <!-- Top review quote -->
              @if (provider()!.reviews[0]) {
                <div class="mt-4 bg-brand-50 border border-brand-100 rounded-lg p-3">
                  <div class="flex items-start gap-2">
                    <span class="text-yellow-400 text-sm">★★★★★</span>
                    <div>
                      <p class="text-sm text-gray-700 italic">"{{ provider()!.reviews[0].text }}"</p>
                      <p class="text-xs text-gray-400 mt-1">– {{ provider()!.reviews[0].author }}, {{ provider()!.reviews[0].timeAgo }}</p>
                    </div>
                  </div>
                </div>
              }
            </div>

            <!-- About -->
            <div class="card p-6">
              <h2 class="font-semibold text-gray-900 mb-2">About {{ provider()!.name.split(' ')[1] }}</h2>
              <p class="text-sm text-gray-600 leading-relaxed">{{ provider()!.about }}</p>
            </div>

            <!-- Book Appointment -->
            <div class="card p-6">
              <h2 class="font-semibold text-gray-900 mb-4">Book Appointment</h2>

              <div class="mb-4">
                <p class="text-sm text-gray-500 mb-2">Select Date</p>
                <div class="relative">
                  <input type="text" [value]="selectedDateLabel" readonly
                    class="input-field pr-10 cursor-pointer" (click)="showCalendar = !showCalendar">
                  <svg class="absolute right-3 top-2.5 w-4 h-4 text-gray-400 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                  </svg>
                </div>
              </div>

              <!-- Date strip -->
              <div class="flex gap-2 overflow-x-auto pb-1 mb-4">
                @for (day of provider()!.availability; track day.date) {
                  <button (click)="selectDay(day.date)"
                    [class.bg-brand]="selectedDate === day.date"
                    [class.text-white]="selectedDate === day.date"
                    [class.border-brand]="selectedDate === day.date"
                    [class.border-gray-200]="selectedDate !== day.date"
                    class="shrink-0 border rounded-lg px-3 py-2 text-center min-w-[68px] transition-colors">
                    <p class="text-xs font-medium">{{ day.label.split(' ')[0] }}</p>
                    <p class="text-sm font-bold">{{ day.label.split(' ')[1] || '' }}</p>
                    <p class="text-xs text-gray-400">{{ getAvailableCount(day) }} avail</p>
                  </button>
                }
              </div>

              <!-- Time slots for selected day -->
              @if (selectedDaySlots().length > 0) {
                <div class="grid grid-cols-3 gap-2">
                  @for (slot of selectedDaySlots(); track slot.time) {
                    <button (click)="bookTime(slot.time)"
                      [class]="slot.available ? 'slot-available text-center' : 'slot-unavailable text-center'"
                      [disabled]="!slot.available">
                      {{ slot.time }}
                    </button>
                  }
                </div>
              } @else {
                <p class="text-sm text-gray-400 text-center py-4">Select a date to view available times</p>
              }

              <button (click)="bookNow()" class="btn-brand w-full mt-4">
                Book Appointment
              </button>
            </div>

            <!-- Office Locations -->
            <div class="card p-6">
              <h2 class="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <svg class="w-4 h-4 text-brand" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-2 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
                </svg>
                Office Locations
              </h2>
              <div>
                <p class="font-medium text-sm text-gray-800">{{ provider()!.name.split(' ').slice(1).join(' ') }} Dermatology</p>
                <div class="flex items-start gap-1.5 mt-1">
                  <svg class="w-3.5 h-3.5 text-gray-400 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                  </svg>
                  <p class="text-xs text-gray-500">{{ provider()!.address }}</p>
                </div>
                <div class="flex items-center gap-1.5 mt-1">
                  <svg class="w-3.5 h-3.5 text-gray-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                  </svg>
                  <p class="text-xs text-gray-500">{{ provider()!.phone }}</p>
                </div>
              </div>
            </div>

            <!-- Patient Reviews -->
            <div class="card p-6">
              <h2 class="font-semibold text-gray-900 mb-4">Patient Reviews</h2>
              <div class="flex gap-6 mb-4">
                <div class="text-center">
                  <p class="text-4xl font-bold text-gray-900">{{ provider()!.rating }}</p>
                  <div class="flex justify-center mt-1">
                    <span class="text-yellow-400">{{ getStars(provider()!.rating) }}</span>
                  </div>
                  <p class="text-xs text-gray-400 mt-1">{{ provider()!.reviewCount }} reviews</p>
                </div>
                <div class="flex-1">
                  @for (n of [5,4,3,2,1]; track n) {
                    <div class="flex items-center gap-2 mb-1">
                      <span class="text-xs text-gray-500 w-3">{{ n }}</span>
                      <div class="flex-1 bg-gray-100 rounded-full h-2">
                        <div [style.width]="getRatingBarWidth(n, provider()!.rating, provider()!.reviewCount)"
                          class="bg-yellow-400 h-2 rounded-full"></div>
                      </div>
                    </div>
                  }
                </div>
              </div>
              @for (review of provider()!.reviews; track review.author) {
                <div class="border-t border-gray-100 pt-3 mt-3">
                  <div class="flex items-center gap-2 mb-1">
                    <span class="text-yellow-400 text-xs">{{ getStars(review.rating) }}</span>
                    <span class="text-xs text-gray-500">{{ review.timeAgo }}</span>
                  </div>
                  <p class="font-medium text-sm text-gray-800">{{ review.author }}</p>
                  <p class="text-sm text-gray-600 mt-1">{{ review.text }}</p>
                </div>
              }
            </div>

            <!-- Similar Providers -->
            <div class="card p-6">
              <h2 class="font-semibold text-gray-900 mb-4">Similar Providers</h2>
              @for (p of similar(); track p.id) {
                <div class="flex items-center gap-3 py-2 border-b border-gray-50 last:border-0">
                  <img [src]="p.photo" [alt]="p.name"
                    class="w-10 h-10 rounded-full object-cover">
                  <div class="flex-1">
                    <a (click)="navigateTo(p)" class="text-sm font-medium text-brand hover:underline cursor-pointer">
                      {{ p.name }}, {{ p.credentials }}
                    </a>
                    <div class="flex items-center gap-1">
                      <span class="text-yellow-400 text-xs">{{ getStars(p.rating) }}</span>
                      <span class="text-xs text-gray-400">{{ p.rating }}</span>
                    </div>
                  </div>
                </div>
              }
            </div>
          </div>

          <!-- Right sidebar -->
          <div class="space-y-4">

            <!-- Specialties -->
            <div class="card p-4">
              <h3 class="font-semibold text-sm text-gray-900 mb-3">Specialties</h3>
              <div class="flex flex-wrap gap-1.5">
                @for (s of provider()!.specialties; track s) {
                  <span class="bg-brand-50 text-brand text-xs px-2 py-1 rounded-full border border-brand-100">{{ s }}</span>
                }
              </div>
            </div>

            <!-- Accepted Insurance -->
            <div class="card p-4">
              <h3 class="font-semibold text-sm text-gray-900 mb-3 flex items-center gap-1">
                <svg class="w-4 h-4 text-brand" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
                </svg>
                Accepted Insurance
              </h3>
              <ul class="space-y-1">
                @for (ins of provider()!.insurances; track ins) {
                  <li class="text-sm text-gray-600 flex items-center gap-1.5">
                    <span class="w-1.5 h-1.5 bg-brand rounded-full"></span>
                    {{ ins }}
                  </li>
                }
              </ul>
            </div>

            <!-- Languages -->
            <div class="card p-4">
              <h3 class="font-semibold text-sm text-gray-900 mb-3">Languages Spoken</h3>
              <div class="flex flex-wrap gap-1.5">
                @for (lang of provider()!.languages; track lang) {
                  <span class="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full">{{ lang }}</span>
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    } @else {
      <div class="flex items-center justify-center h-64">
        <p class="text-gray-400">Provider not found.</p>
      </div>
    }
  `
})
export class ProviderDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private providerService = inject(ProviderService);
  private bookingService = inject(BookingService);

  provider = signal<Provider | undefined>(undefined);
  similar = signal<Provider[]>([]);
  selectedDate = '';
  selectedDateLabel = 'Select a date';
  showCalendar = false;

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')!;
    const p = this.providerService.getById(id);
    this.provider.set(p);
    if (p) {
      this.bookingService.setProvider(p.id, p.name, p.photo, p.specialty, p.city);
      this.similar.set(this.providerService.getAll().filter(x => x.id !== id).slice(0, 3));
    }
  }

  getStars(rating: number): string {
    return '★'.repeat(Math.floor(rating));
  }

  getAvailableCount(day: any): number {
    return day.slots.filter((s: any) => s.available).length;
  }

  selectedDaySlots() {
    const p = this.provider();
    if (!p || !this.selectedDate) return [];
    return p.availability.find(d => d.date === this.selectedDate)?.slots ?? [];
  }

  selectDay(date: string): void {
    this.selectedDate = date;
    const p = this.provider();
    if (p) {
      const day = p.availability.find(d => d.date === date);
      this.selectedDateLabel = day?.label ?? date;
    }
  }

  bookTime(time: string): void {
    this.bookingService.setDateTime(this.selectedDate, time);
    this.router.navigate(['/booking/time']);
  }

  bookNow(): void {
    this.router.navigate(['/booking/time']);
  }

  navigateTo(p: Provider): void {
    this.bookingService.setProvider(p.id, p.name, p.photo, p.specialty, p.city);
    this.router.navigate(['/provider', p.id]);
  }

  close(): void {
    this.router.navigate(['/']);
  }

  getRatingBarWidth(star: number, rating: number, total: number): string {
    const map: Record<number, number> = { 5: 70, 4: 20, 3: 7, 2: 2, 1: 1 };
    return `${map[star] ?? 0}%`;
  }
}
