export type AppointmentType = 'in-person' | 'virtual';

export interface BookingState {
  providerId: string;
  providerName: string;
  providerPhoto: string;
  providerSpecialty: string;
  appointmentType: AppointmentType;
  selectedDate: string;
  selectedTime: string;
  location: string;
  patientInfo: PatientInfo;
}

export interface PatientInfo {
  fullName: string;
  dateOfBirth: string;
  email: string;
  phone: string;
  insurance: string;
  reasonForVisit: string;
  sendReminders: boolean;
}

export interface PatientAppointment {
  id: string;
  month: string;
  day: string;
  dayOfWeek: string;
  time: string;
  doctor: string;
  specialty: string;
  location?: string;
  visitType?: string;
  reason: string;
  photo: string;
  isPast: boolean;
}
