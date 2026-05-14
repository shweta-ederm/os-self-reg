import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ProviderService } from '../../services/provider.service';
import { BookingService } from '../../services/booking.service';
import { Provider, DaySlots } from '../../models/provider.model';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <!-- Header -->
    <header class="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div class="flex items-center h-14 px-4 gap-4">
        <img src="assets/logo.jpg" alt="Dermatology of Boca" class="h-8 object-contain">

        <div class="flex-1 flex items-center gap-2 max-w-2xl mx-4">
          <div class="flex items-center border border-gray-300 rounded-lg overflow-hidden flex-1">
            <div class="flex items-center px-3 border-r border-gray-300 min-w-0">
              <svg class="w-4 h-4 text-gray-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
              </svg>
              <input [(ngModel)]="locationQuery" placeholder="Miami, FL"
                class="ml-2 text-sm outline-none w-32 py-2" />
            </div>
            <div class="flex items-center px-3 flex-1">
              <svg class="w-4 h-4 text-gray-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
              </svg>
              <input [(ngModel)]="specialtyQuery" placeholder="Dermatology Consultation"
                class="ml-2 text-sm outline-none flex-1 py-2" />
            </div>
          </div>
          <button (click)="search()" class="bg-brand text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-brand-500 transition-colors whitespace-nowrap">
            Search
          </button>
        </div>

        <div class="flex items-center gap-3 ml-auto text-sm">
          <button class="flex items-center gap-1.5 text-gray-600 hover:text-brand px-3 py-1.5 rounded-lg border border-gray-200 hover:border-brand transition-colors">
            <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197"/>
            </svg>
            Connect
          </button>
          <select class="text-sm border border-gray-200 rounded-lg px-3 py-1.5 text-gray-600 outline-none hover:border-brand">
            <option>Language</option>
            <option>English</option>
            <option>Spanish</option>
            <option>Korean</option>
          </select>
          <select class="text-sm border border-gray-200 rounded-lg px-3 py-1.5 text-gray-600 outline-none hover:border-brand">
            <option>Availability</option>
            <option>Today</option>
            <option>This Week</option>
          </select>
          <button class="text-brand text-sm font-medium hover:underline">Load More</button>
          <a routerLink="/portal" class="flex items-center gap-1.5 text-gray-600 hover:text-brand text-sm">
            <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
            </svg>
            Log In
          </a>
        </div>
      </div>

      <!-- Filter row -->
      <div class="px-4 py-2 flex items-center gap-3 text-sm border-t border-gray-100">
        <span class="text-gray-500 text-xs">6 providers</span>
        <div class="flex items-center gap-1 border border-gray-200 rounded-lg overflow-hidden">
          <button [class.bg-brand]="viewMode==='list'" [class.text-white]="viewMode==='list'"
            [class.text-gray-600]="viewMode!=='list'"
            (click)="viewMode='list'"
            class="px-3 py-1.5 text-xs flex items-center gap-1 transition-colors">
            <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 10h16M4 14h16M4 18h16"/>
            </svg>
            List
          </button>
          <button [class.bg-brand]="viewMode==='map'" [class.text-white]="viewMode==='map'"
            [class.text-gray-600]="viewMode!=='map'"
            (click)="viewMode='map'"
            class="px-3 py-1.5 text-xs flex items-center gap-1 transition-colors">
            <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"/>
            </svg>
            Map
          </button>
        </div>
        <label class="flex items-center gap-2 cursor-pointer">
          <span class="text-gray-600">In-person only</span>
          <div class="relative">
            <input type="checkbox" [(ngModel)]="inPersonOnly" class="sr-only">
            <div [class]="inPersonOnly ? 'bg-brand' : 'bg-gray-300'" class="w-8 h-4 rounded-full transition-colors cursor-pointer" (click)="inPersonOnly=!inPersonOnly">
              <div [class]="inPersonOnly ? 'translate-x-4' : 'translate-x-0'" class="absolute top-0.5 left-0.5 w-3 h-3 bg-white rounded-full shadow transition-transform"></div>
            </div>
          </div>
        </label>
      </div>
    </header>

    <!-- Main content -->
    <div class="flex h-[calc(100vh-88px)]">

      <!-- Provider list -->
      <div class="w-[500px] shrink-0 overflow-y-auto bg-white border-r border-gray-200">
        @for (provider of providers(); track provider.id) {
          <div class="border-b border-gray-100 p-4 hover:bg-gray-50 transition-colors">
            <div class="flex gap-3">
              <!-- Photo -->
              <img [src]="provider.photo" [alt]="provider.name"
                class="w-16 h-16 rounded-full object-cover shrink-0 border-2 border-gray-100"
                onerror="this.src='https://ui-avatars.com/api/?name='+encodeURIComponent(this.alt)+'&background=7ba8a0&color=fff&size=64'">

              <div class="flex-1 min-w-0">
                <div class="flex items-start justify-between">
                  <div>
                    <a (click)="viewProvider(provider)" class="text-brand font-semibold text-sm hover:underline cursor-pointer">
                      {{ provider.name }}, {{ provider.credentials }}
                    </a>
                    <div class="flex items-center gap-1 mt-0.5">
                      <span class="stars text-xs">{{ getStars(provider.rating) }}</span>
                      <span class="text-yellow-500 text-xs font-medium">{{ provider.rating }}</span>
                      <span class="text-gray-400 text-xs">({{ provider.reviewCount }})</span>
                    </div>
                    <p class="text-xs text-gray-500 mt-0.5">{{ provider.specialty }}</p>
                  </div>
                  <div class="flex gap-1.5 shrink-0">
                    <button class="w-7 h-7 flex items-center justify-center border border-gray-200 rounded hover:border-brand hover:text-brand transition-colors">
                      <svg class="w-3.5 h-3.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
                      </svg>
                    </button>
                    <button class="w-7 h-7 flex items-center justify-center border border-gray-200 rounded hover:border-brand hover:text-brand transition-colors">
                      <svg class="w-3.5 h-3.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"/>
                      </svg>
                    </button>
                  </div>
                </div>

                <!-- Address -->
                <div class="flex items-center gap-1 mt-1">
                  <svg class="w-3 h-3 text-gray-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                  </svg>
                  <span class="text-xs text-gray-400">{{ provider.distance }}</span>
                  <span class="text-xs text-gray-300">·</span>
                  <span class="text-xs text-gray-400 truncate">{{ provider.city }}</span>
                </div>
              </div>
            </div>

            <!-- Availability -->
            <div class="mt-3">
              <div class="flex gap-1 overflow-x-auto pb-1">
                @for (day of provider.availability.slice(0,5); track day.date) {
                  <div class="shrink-0 min-w-[80px]">
                    <p class="text-xs text-gray-400 mb-1 text-center">{{ day.label }}</p>
                    <div class="flex flex-col gap-1">
                      @for (slot of getAvailableSlots(day).slice(0,2); track slot.time) {
                        <button (click)="bookSlot(provider, day.date, slot.time)"
                          class="slot-available text-center w-full">
                          {{ slot.time }}
                        </button>
                      }
                      @if (getAvailableSlots(day).length === 0) {
                        <span class="slot-unavailable text-center w-full">No times</span>
                      }
                    </div>
                  </div>
                }
              </div>
              <a (click)="viewProvider(provider)" class="text-xs text-brand hover:underline cursor-pointer mt-1 inline-block">
                More times available →
              </a>
            </div>

            <!-- View more -->
            <div class="mt-2">
              <a (click)="viewProvider(provider)" class="text-xs text-brand hover:underline cursor-pointer">
                View profile
              </a>
            </div>
          </div>
        }
      </div>

      <!-- Map panel -->
      <div class="flex-1 bg-gray-100 relative map-container">
        <iframe
          [src]="mapUrl"
          title="Provider locations map"
          class="w-full h-full border-0"
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade">
        </iframe>

        <!-- Map overlay: Provider pins legend -->
        <div class="absolute bottom-4 left-4 bg-white rounded-xl shadow-lg p-3 max-w-[200px]">
          <p class="text-xs font-semibold text-gray-700 mb-2">Provider Locations</p>
          @for (p of providers().slice(0,4); track p.id) {
            <div class="flex items-center gap-2 mb-1.5">
              <div class="w-5 h-5 rounded-full bg-brand text-white text-xs flex items-center justify-center shrink-0 font-bold">
                {{ p.id }}
              </div>
              <span class="text-xs text-gray-600 truncate">{{ p.name.split(' ').slice(1).join(' ') }}</span>
            </div>
          }
        </div>
      </div>
    </div>
  `
})
export class SearchComponent implements OnInit {
  private router = inject(Router);
  private providerService = inject(ProviderService);
  private bookingService = inject(BookingService);
  private sanitizer = inject(DomSanitizer);

  providers = signal<Provider[]>([]);
  locationQuery = 'Miami, FL';
  specialtyQuery = 'Dermatology Consultation';
  viewMode: 'list' | 'map' = 'list';
  inPersonOnly = false;

  mapUrl: SafeResourceUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
    'https://www.openstreetmap.org/export/embed.html?bbox=-80.28%2C26.24%2C-79.94%2C26.52&layer=mapnik'
  );

  ngOnInit(): void {
    this.providers.set(this.providerService.getAll());
  }

  search(): void {
    this.providers.set(this.providerService.search(this.locationQuery, this.specialtyQuery));
  }

  getStars(rating: number): string {
    const full = Math.floor(rating);
    return '★'.repeat(full) + (rating % 1 >= 0.5 ? '☆' : '');
  }

  getAvailableSlots(day: DaySlots) {
    return day.slots.filter(s => s.available);
  }

  viewProvider(provider: Provider): void {
    this.bookingService.setProvider(provider.id, provider.name, provider.photo, provider.specialty, provider.city);
    this.router.navigate(['/provider', provider.id]);
  }

  bookSlot(provider: Provider, date: string, time: string): void {
    this.bookingService.setProvider(provider.id, provider.name, provider.photo, provider.specialty, provider.city);
    this.bookingService.setDateTime(date, time);
    this.router.navigate(['/booking/time']);
  }
}
