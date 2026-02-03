import { Attendee, Event, EventDetails, YearLevel } from "@/types/dashboard";
import api from "./axios-instance";

export const DashboardService = {
  // Fetch all events
  getEvents: async (): Promise<Event[]> => {
    const response = await api.get("/event");
    // Debug log to check API response structure
    console.log('API Response for getEvents:', response);

    // Extract events from response (API returns { success: true, events: [...] })
    if (response.data.success && Array.isArray(response.data.events)) {
      // Map API event properties to our TypeScript interface
      return response.data.events.map((apiEvent: any) => ({
        id: apiEvent._id,
        title: apiEvent.eventTitle,
        date: apiEvent.date,
        status: 'upcoming' // Default status
      }));
    }

    console.warn('getEvents: API response structure unexpected, returning empty array');
    return [];
  },

  // Fetch event details by ID
  getEventDetails: async (eventId: string): Promise<EventDetails> => {
    const response = await api.get(`/event/${eventId}`);
    return response.data;
  },
};
