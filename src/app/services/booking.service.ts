import { Injectable, signal } from '@angular/core';
import { BookingState, PatientInfo, AppointmentType } from '../models/appointment.model';

@Injectable({ providedIn: 'root' })
export class BookingService {

  private _state = signal<Partial<BookingState>>({
    appointmentType: 'in-person',
    patientInfo: {
      fullName: '',
      dateOfBirth: '',
      email: '',
      phone: '',
      insurance: '',
      reasonForVisit: '',
      sendReminders: true,
    }
  });

  readonly state = this._state.asReadonly();

  setProvider(id: string, name: string, photo: string, specialty: string, location: string): void {
    this._state.update(s => ({ ...s, providerId: id, providerName: name, providerPhoto: photo, providerSpecialty: specialty, location }));
  }

  setAppointmentType(type: AppointmentType): void {
    this._state.update(s => ({ ...s, appointmentType: type }));
  }

  setDateTime(date: string, time: string): void {
    this._state.update(s => ({ ...s, selectedDate: date, selectedTime: time }));
  }

  setPatientInfo(info: PatientInfo): void {
    this._state.update(s => ({ ...s, patientInfo: info }));
  }

  reset(): void {
    this._state.set({
      appointmentType: 'in-person',
      patientInfo: {
        fullName: '',
        dateOfBirth: '',
        email: '',
        phone: '',
        insurance: '',
        reasonForVisit: '',
        sendReminders: true,
      }
    });
  }
}
