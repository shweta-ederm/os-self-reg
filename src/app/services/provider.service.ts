import { Injectable } from '@angular/core';
import { Provider } from '../models/provider.model';

@Injectable({ providedIn: 'root' })
export class ProviderService {

  private providers: Provider[] = [
    {
      id: '1',
      name: 'Dr. Sarah Mitchell',
      credentials: 'MD, FAAD',
      specialty: 'Dermatologist',
      rating: 4.8,
      reviewCount: 214,
      city: 'Miami, FL',
      distance: '1.2 mi',
      address: '1250 NW 12th Ave, Suite 100, Miami, FL 33136',
      phone: '(305) 555-0101',
      photo: 'https://randomuser.me/api/portraits/women/44.jpg',
      nextAvailable: 'Today',
      about: 'Dr. Mitchell specializes in medical and cosmetic dermatology, offering the latest treatments for skin conditions and aging concerns.',
      specialties: ['Acne & Acne Scars', 'Laser Treatments', 'Chemical Peels', 'Skin Rejuvenation'],
      insurances: ['Aetna', 'Blue Cross Blue Shield', 'UnitedHealthcare'],
      languages: ['English'],
      lat: 25.790654,
      lng: -80.199501,
      availability: [
        { label: 'Today', date: '2026-05-14', slots: [
          { time: '10:00 AM', available: true }, { time: '10:30 AM', available: false },
          { time: '2:00 PM', available: true }, { time: '3:30 PM', available: false }
        ]},
        { label: 'Tomorrow', date: '2026-05-15', slots: [
          { time: '8:00 AM', available: true }, { time: '9:00 AM', available: true },
          { time: '11:00 AM', available: true }, { time: '2:00 PM', available: false }
        ]},
        { label: 'Wed May 16', date: '2026-05-16', slots: [
          { time: '9:30 AM', available: true }, { time: '1:00 PM', available: true }
        ]},
        { label: 'Thu May 17', date: '2026-05-17', slots: [
          { time: '10:00 AM', available: false }, { time: '4:00 PM', available: true }
        ]},
        { label: 'Mon May 18', date: '2026-05-18', slots: [
          { time: '8:30 AM', available: true }, { time: '11:30 AM', available: true }
        ]}
      ],
      reviews: [
        { author: 'Amelia K', rating: 5, text: 'Dr. Mitchell is absolutely wonderful! Very professional and caring.', timeAgo: '2 weeks ago' },
        { author: 'Susan B', rating: 5, text: 'Best dermatologist in Miami. Highly recommend!', timeAgo: '1 month ago' }
      ]
    },
    {
      id: '2',
      name: 'Dr. Sally Rodriguez',
      credentials: 'MD, FAAD',
      specialty: 'Dermatologist',
      rating: 4.6,
      reviewCount: 178,
      city: 'Boca Raton, FL',
      distance: '0.8 mi',
      address: '7050 W Palmetto Park Rd, Boca Raton, FL 33433',
      phone: '(561) 555-0202',
      photo: 'https://randomuser.me/api/portraits/women/65.jpg',
      nextAvailable: 'Tomorrow',
      about: 'Dr. Rodriguez is a board-certified dermatologist specializing in skin cancer screening and cosmetic procedures.',
      specialties: ['Skin Cancer Screening', 'Mohs Surgery', 'Cosmetic Dermatology', 'Botox & Fillers'],
      insurances: ['Aetna', 'Blue Cross Blue Shield', 'Cigna'],
      languages: ['English', 'Spanish'],
      lat: 26.368,
      lng: -80.128,
      availability: [
        { label: 'Today', date: '2026-05-14', slots: [
          { time: '9:00 AM', available: false }, { time: '3:00 PM', available: true }
        ]},
        { label: 'Tomorrow', date: '2026-05-15', slots: [
          { time: '8:00 AM', available: true }, { time: '10:00 AM', available: true }
        ]},
        { label: 'Wed May 16', date: '2026-05-16', slots: [
          { time: '1:00 PM', available: true }, { time: '2:30 PM', available: true }
        ]},
        { label: 'Thu May 17', date: '2026-05-17', slots: [
          { time: '9:00 AM', available: true }
        ]},
        { label: 'Mon May 18', date: '2026-05-18', slots: [
          { time: '11:00 AM', available: false }
        ]}
      ],
      reviews: [
        { author: 'Maria L', rating: 5, text: 'Dr. Rodriguez is thorough and kind. My skin has never looked better!', timeAgo: '3 weeks ago' }
      ]
    },
    {
      id: '3',
      name: 'Dr. Jared Chen',
      credentials: 'MD, FAOCD',
      specialty: 'Dermatologist',
      subspecialty: 'Osteopathic Dermatologist',
      rating: 4.7,
      reviewCount: 203,
      city: 'Boca Raton, FL',
      distance: '1.5 mi',
      address: '855 Meadows Rd, Suite 3, Boca Raton, FL 33486',
      phone: '(561) 555-0303',
      photo: 'https://randomuser.me/api/portraits/men/32.jpg',
      nextAvailable: 'Wed May 16',
      about: 'Dr. Chen brings a holistic approach to dermatology, combining traditional and osteopathic techniques for comprehensive skin care.',
      specialties: ['Eczema & Psoriasis', 'Acne Treatment', 'Rosacea', 'Cosmetic Dermatology'],
      insurances: ['Aetna', 'Blue Cross Blue Shield', 'Medicare'],
      languages: ['English', 'Mandarin'],
      lat: 26.358,
      lng: -80.118,
      availability: [
        { label: 'Today', date: '2026-05-14', slots: [
          { time: '11:00 AM', available: false }
        ]},
        { label: 'Tomorrow', date: '2026-05-15', slots: [
          { time: '9:00 AM', available: false }, { time: '2:00 PM', available: false }
        ]},
        { label: 'Wed May 16', date: '2026-05-16', slots: [
          { time: '10:00 AM', available: true }, { time: '3:00 PM', available: true }
        ]},
        { label: 'Thu May 17', date: '2026-05-17', slots: [
          { time: '8:30 AM', available: true }
        ]},
        { label: 'Mon May 18', date: '2026-05-18', slots: [
          { time: '9:00 AM', available: true }, { time: '1:30 PM', available: true }
        ]}
      ],
      reviews: [
        { author: 'James T', rating: 5, text: 'Dr. Chen took the time to explain everything. Great bedside manner!', timeAgo: '1 week ago' }
      ]
    },
    {
      id: '4',
      name: 'Dr. Robert Williams',
      credentials: 'MD',
      specialty: 'Dermatologist',
      rating: 4.3,
      reviewCount: 156,
      city: 'Boca Raton, FL',
      distance: '2.1 mi',
      address: '1515 N Flagler Dr, Suite 400, Boca Raton, FL 33432',
      phone: '(561) 555-0404',
      photo: 'https://randomuser.me/api/portraits/men/55.jpg',
      nextAvailable: 'Today',
      about: 'Dr. Williams is an experienced dermatologist with over 20 years of practice, specializing in skin conditions across all ages.',
      specialties: ['Pediatric Dermatology', 'Skin Cancer', 'Wart Removal', 'General Dermatology'],
      insurances: ['Aetna', 'Medicare', 'Medicaid', 'Cigna'],
      languages: ['English'],
      lat: 26.375,
      lng: -80.095,
      availability: [
        { label: 'Today', date: '2026-05-14', slots: [
          { time: '1:00 PM', available: true }, { time: '4:00 PM', available: true }
        ]},
        { label: 'Tomorrow', date: '2026-05-15', slots: [
          { time: '10:30 AM', available: true }
        ]},
        { label: 'Wed May 16', date: '2026-05-16', slots: [
          { time: '9:00 AM', available: true }, { time: '2:00 PM', available: false }
        ]},
        { label: 'Thu May 17', date: '2026-05-17', slots: [
          { time: '11:00 AM', available: true }
        ]},
        { label: 'Mon May 18', date: '2026-05-18', slots: [
          { time: '3:00 PM', available: true }
        ]}
      ],
      reviews: [
        { author: 'Karen M', rating: 4, text: 'Very knowledgeable doctor. Wait times can be long but worth it.', timeAgo: '1 month ago' }
      ]
    },
    {
      id: '5',
      name: 'Dr. Jennifer Park',
      credentials: 'MD, FAAD',
      specialty: 'Cosmetic Dermatologist',
      rating: 4.9,
      reviewCount: 312,
      city: 'Miami, FL',
      distance: '2.3 mi',
      address: '1050 NW 14th St, Suite 200, Miami, FL 33136',
      phone: '(305) 555-0505',
      photo: 'https://randomuser.me/api/portraits/women/51.jpg',
      nextAvailable: 'Friday at 8:00 PM',
      about: 'Dr. Park specializes in cosmetic dermatology and anti-aging treatments, offering the latest in injectables, lasers, and skincare rejuvenation.',
      specialties: ['Botox & Fillers', 'Laser Treatments', 'Chemical Peels', 'Skin Rejuvenation'],
      insurances: ['Aetna', 'Blue Cross Blue Shield', 'UnitedHealthcare'],
      languages: ['English', 'Korean'],
      lat: 25.788,
      lng: -80.212,
      availability: [
        { label: 'Today', date: '2026-05-14', slots: [
          { time: '10:00 AM', available: false }
        ]},
        { label: 'Tomorrow', date: '2026-05-15', slots: [
          { time: '9:00 AM', available: false }, { time: '2:00 PM', available: false }
        ]},
        { label: 'Wed May 16', date: '2026-05-16', slots: [
          { time: '11:00 AM', available: false }
        ]},
        { label: 'Thu May 17', date: '2026-05-17', slots: [
          { time: '3:00 PM', available: false }
        ]},
        { label: 'Mon May 18', date: '2026-05-18', slots: [
          { time: '8:00 PM', available: true }
        ]}
      ],
      reviews: [
        { author: 'Amelia K', rating: 5, text: 'Dr. Park has an amazing eye for aesthetics. My results look so natural!', timeAgo: '2 weeks ago' },
        { author: 'Susan B', rating: 5, text: 'Best cosmetic dermatologist in the area. Professional and skilled.', timeAgo: '1 month ago' }
      ]
    },
    {
      id: '6',
      name: 'Dr. Michael Thompson',
      credentials: 'MD, FAAD',
      specialty: 'Dermatologist',
      rating: 4.7,
      reviewCount: 189,
      city: 'Boca Raton, FL',
      distance: '3.0 mi',
      address: '9970 N Central Park Blvd, Boca Raton, FL 33428',
      phone: '(561) 555-0606',
      photo: 'https://randomuser.me/api/portraits/men/41.jpg',
      nextAvailable: 'Tomorrow',
      about: 'Dr. Thompson is a board-certified dermatologist offering comprehensive care including skin cancer screenings and cosmetic treatments.',
      specialties: ['Skin Cancer', 'Cosmetic Dermatology', 'Eczema', 'Psoriasis'],
      insurances: ['Aetna', 'Blue Cross Blue Shield', 'Cigna', 'Medicare'],
      languages: ['English'],
      lat: 26.340,
      lng: -80.145,
      availability: [
        { label: 'Today', date: '2026-05-14', slots: [
          { time: '2:30 PM', available: false }
        ]},
        { label: 'Tomorrow', date: '2026-05-15', slots: [
          { time: '9:00 AM', available: true }, { time: '1:00 PM', available: true }
        ]},
        { label: 'Wed May 16', date: '2026-05-16', slots: [
          { time: '10:00 AM', available: true }
        ]},
        { label: 'Thu May 17', date: '2026-05-17', slots: [
          { time: '8:00 AM', available: true }, { time: '3:00 PM', available: false }
        ]},
        { label: 'Mon May 18', date: '2026-05-18', slots: [
          { time: '11:00 AM', available: true }
        ]}
      ],
      reviews: [
        { author: 'David R', rating: 5, text: 'Excellent doctor. Very thorough and explains everything clearly.', timeAgo: '3 weeks ago' }
      ]
    }
  ];

  getAll(): Provider[] {
    return this.providers;
  }

  getById(id: string): Provider | undefined {
    return this.providers.find(p => p.id === id);
  }

  search(location: string, specialty: string): Provider[] {
    return this.providers;
  }
}
