import { DashboardService } from "@/services/dashboard-service";
import { Attendee, Event, EventDetails, YearLevel } from "@/types/dashboard";
import { useEffect, useState } from "react";

// Hook to fetch events list
export const useEvents = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await DashboardService.getEvents();

      // Debug log to verify data type
      console.log('Fetched events data:', data);
      console.log('Data type:', typeof data);
      console.log('Is array:', Array.isArray(data));

      // Ensure we always set an array state
      setEvents(Array.isArray(data) ? data : []);
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to fetch events");
      console.error("Error fetching events:", err);
      setEvents([]); // Set empty array on error
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return { events, loading, error, refetch: fetchEvents };
};

// Hook to fetch event details
export const useEventDetails = (eventId: string | null) => {
  const [eventDetails, setEventDetails] = useState<EventDetails | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchEventDetails = async () => {
    if (!eventId) return;

    try {
      setLoading(true);
      setError(null);
      const data = await DashboardService.getEventDetails(eventId);
      setEventDetails(data);
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to fetch event details");
      console.error("Error fetching event details:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (eventId) {
      fetchEventDetails();
    } else {
      setEventDetails(null);
    }
  }, [eventId]);

  return { eventDetails, loading, error, refetch: fetchEventDetails };
};

// Hook to fetch attendees
export const useAttendees = (eventId: string | null) => {
  const [attendees, setAttendees] = useState<Attendee[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchAttendees = async () => {
    if (!eventId) return;

    try {
      setLoading(true);
      setError(null);
      const data = await DashboardService.getAttendees(eventId);
      setAttendees(data);
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to fetch attendees");
      console.error("Error fetching attendees:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (eventId) {
      fetchAttendees();
    } else {
      setAttendees([]);
    }
  }, [eventId]);

  return { attendees, loading, error, refetch: fetchAttendees };
};

// Hook to fetch year-level attendance
export const useYearLevelAttendance = (eventId: string | null) => {
  const [yearLevels, setYearLevels] = useState<YearLevel[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchYearLevelAttendance = async () => {
    if (!eventId) return;

    try {
      setLoading(true);
      setError(null);
      const data = await DashboardService.getYearLevelAttendance(eventId);
      setYearLevels(data);
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to fetch year-level attendance");
      console.error("Error fetching year-level attendance:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (eventId) {
      fetchYearLevelAttendance();
    } else {
      setYearLevels([]);
    }
  }, [eventId]);

  return { yearLevels, loading, error, refetch: fetchYearLevelAttendance };
};

// Hook to fetch total attendance
export const useTotalAttendance = (eventId: string | null) => {
  const [totalAttendance, setTotalAttendance] = useState<{
    totalPresent: number;
    totalEnrolled: number;
  } | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTotalAttendance = async () => {
    if (!eventId) return;

    try {
      setLoading(true);
      setError(null);
      const data = await DashboardService.getTotalAttendance(eventId);
      setTotalAttendance(data);
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to fetch total attendance");
      console.error("Error fetching total attendance:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (eventId) {
      fetchTotalAttendance();
    } else {
      setTotalAttendance(null);
    }
  }, [eventId]);

  return { totalAttendance, loading, error, refetch: fetchTotalAttendance };
};
