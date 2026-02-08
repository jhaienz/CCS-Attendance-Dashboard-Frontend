import { Attendee, Event, EventDetails } from "@/types/dashboard";
import api from "./axios-instance";

export const DashboardService = {
  // Fetch all events
  getEvents: async (): Promise<Event[]> => {
    const response = await api.get("/event");
    // Debug log to check API response structure
    console.log("API Response for getEvents:", response);

    // Extract events from response (API returns { success: true, events: [...] })
    if (response.data.success && Array.isArray(response.data.events)) {
      // Map API event properties to our TypeScript interface
      return response.data.events.map((apiEvent: any) => ({
        id: apiEvent._id,
        title: apiEvent.eventTitle,
        date: apiEvent.date,
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
    const rawAttendance = Array.isArray(response.data)
      ? response.data
      : Array.isArray(response.data?.attendance)
        ? response.data.attendance
        : [];

    const mapped = rawAttendance.map((record: any, index: number): Attendee => {
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
    const filtered = mapped.filter((attendee) => {
      if (!attendee) return false;

      const hasValidLastName =
        attendee.lastName &&
        attendee.lastName.trim() &&
        attendee.lastName !== "Unknown";
      const hasValidFirstName =
        attendee.firstName &&
        attendee.firstName.trim() &&
        attendee.firstName !== "Unknown";
      const hasValidStudentId =
        attendee.studentId &&
        attendee.studentId.trim() &&
        attendee.studentId !== "Unknown";
      const hasValidCSY =
        attendee.CSY && attendee.CSY.trim() && attendee.CSY !== "Unknown";

      return (
        hasValidLastName ||
        hasValidFirstName ||
        hasValidStudentId ||
        hasValidCSY
      );
    });

    console.log("Mapped attendees:", mapped);
    console.log("Filtered attendees:", filtered);
    return filtered;
  },
};
