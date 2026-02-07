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
  firstName: string;
  lastName: string;
  studentId: string;
  CSY: string;
  AM: boolean;
  PM: boolean;
  AMOut: boolean;
  PMOut: boolean;
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
