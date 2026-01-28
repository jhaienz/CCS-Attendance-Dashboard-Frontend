// TypeScript interfaces for CCS Attendance Dashboard
// These types are ready for backend integration

export interface Event {
  id: string;
  title: string;
  date: string;
  status: 'upcoming' | 'ongoing' | 'completed';
}

export interface YearLevel {
  year: '1st' | '2nd' | '3rd' | '4th';
  present: number;
  total: number;
}

export interface Attendee {
  id: string;
  name: string;
  yearLevel: '1st' | '2nd' | '3rd' | '4th';
  studentId: string;
}

export interface EventDetails {
  eventId: string;
  title: string;
  date: string;
  yearLevels: YearLevel[];
  totalPresent: number;
  totalEnrolled: number;
  attendees: Attendee[];
}
