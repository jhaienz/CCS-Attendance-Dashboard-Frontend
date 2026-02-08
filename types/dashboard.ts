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
  firstName: string | undefined | null;
  lastName: string | undefined | null;
  studentId: string | undefined | null;
  CSY: string | undefined | null;
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
