import { Attendee, Event, EventDetails } from "@/types/dashboard";
import api from "./axios-instance";
import { isValidAttendee } from "@/lib/utils/dashboard";

type ApiEvent = {
  _id?: string;
  eventTitle?: string;
  date?: string;
};

type ApiStudent = {
  _id?: string;
  firstName?: string;
  lastName?: string;
  studentId?: string;
  CSY?: string;
};

type ApiAttendanceRecord = {
  _id?: string;
  student?: ApiStudent | null;
  firstName?: string;
  lastName?: string;
  studentId?: string;
  CSY?: string;
  AM?: boolean;
  PM?: boolean;
  AMOut?: boolean;
  PMOut?: boolean;
};

export const DashboardService = {
  // Fetch all events
  getEvents: async (): Promise<Event[]> => {
    const response = await api.get("/event");
    // Debug log to check API response structure
    console.log("API Response for getEvents:", response);

    // Extract events from response (API returns { success: true, events: [...] })
    if (response.data.success && Array.isArray(response.data.events)) {
      // Map API event properties to our TypeScript interface
      return (response.data.events as ApiEvent[]).map((apiEvent) => ({
        id: apiEvent._id ?? "",
        title: apiEvent.eventTitle ?? "",
        date: apiEvent.date ?? "",
        status: "upcoming", // Default status
      }));
    }

    console.warn(
      "getEvents: API response structure unexpected, returning empty array",
    );
    return [];
  },

  // Fetch event details by ID
  getEventDetails: async (eventId: string): Promise<EventDetails> => {
    const response = await api.get(`/event/${eventId}`);
    return response.data;
  },

  // Fetch attendance records by event ID
  getAttendanceByEvent: async (eventId: string): Promise<Attendee[]> => {
    const response = await api.get(`/attendance/${eventId}`);
    console.log("API response for attendance:", response.data);
    const rawAttendance: ApiAttendanceRecord[] = Array.isArray(response.data)
      ? (response.data as ApiAttendanceRecord[])
      : Array.isArray(response.data?.attendance)
        ? (response.data.attendance as ApiAttendanceRecord[])
        : [];

    const mapped = rawAttendance.map((record, index): Attendee => {
      const student = record?.student ?? {};
      const studentId = student.studentId ?? record.studentId ?? null;
      const firstName = student.firstName ?? record.firstName ?? null;
      const lastName = student.lastName ?? record.lastName ?? null;
      const CSY = student.CSY ?? record.CSY ?? null;

      return {
        id: record._id ?? student._id ?? studentId ?? `attendance-${index}`,
        firstName,
        lastName,
        studentId,
        CSY,
        AM: Boolean(record.AM),
        PM: Boolean(record.PM),
        AMOut: Boolean(record.AMOut),
        PMOut: Boolean(record.PMOut),
      };
    });

    // Filter out invalid attendees with no meaningful data
    const filtered = mapped.filter(isValidAttendee);

    console.log("Mapped attendees:", mapped);
    console.log("Filtered attendees:", filtered);
    return filtered;
  },
};
