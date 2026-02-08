import { DashboardService } from "@/services/dashboard-service";
import { Attendee, Event, EventDetails } from "@/types/dashboard";
import { useCallback, useEffect, useState } from "react";

type ApiErrorResponse = {
  response?: {
    data?: {
      message?: string;
    };
  };
};

const getErrorMessage = (err: unknown): string | undefined => {
  if (typeof err === "object" && err !== null && "response" in err) {
    return (err as ApiErrorResponse).response?.data?.message;
  }
  return undefined;
};

// Hook to fetch events list
export const useEvents = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchEvents = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await DashboardService.getEvents();

      // Debug log to verify data type
      console.log("Fetched events data:", data);
      console.log("Data type:", typeof data);
      console.log("Is array:", Array.isArray(data));

      // Ensure we always set an array state
      setEvents(Array.isArray(data) ? data : []);
    } catch (err: unknown) {
      setError(getErrorMessage(err) || "Failed to fetch events");
      console.error("Error fetching events:", err);
      setEvents([]); // Set empty array on error
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  return { events, loading, error, refetch: fetchEvents };
};

// Hook to fetch event details
export const useEventDetails = (eventId: string | null) => {
  const [eventDetails, setEventDetails] = useState<EventDetails | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchEventDetails = useCallback(async () => {
    if (!eventId) return;

    try {
      setLoading(true);
      setError(null);
      const data = await DashboardService.getEventDetails(eventId);
      setEventDetails(data);
    } catch (err: unknown) {
      setError(getErrorMessage(err) || "Failed to fetch event details");
      console.error("Error fetching event details:", err);
    } finally {
      setLoading(false);
    }
  }, [eventId]);

  useEffect(() => {
    if (eventId) {
      fetchEventDetails();
    } else {
      setEventDetails(null);
    }
  }, [eventId, fetchEventDetails]);

  return { eventDetails, loading, error, refetch: fetchEventDetails };
};

// Hook to fetch attendance records for an event
export const useAttendanceByEvent = (eventId: string | null) => {
  const [attendance, setAttendance] = useState<Attendee[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchAttendance = useCallback(async () => {
    if (!eventId) return;

    try {
      setLoading(true);
      setError(null);
      const data = await DashboardService.getAttendanceByEvent(eventId);
      setAttendance(data);
    } catch (err: unknown) {
      setError(getErrorMessage(err) || "Failed to fetch attendance records");
      console.error("Error fetching attendance:", err);
      setAttendance([]); // Set empty array on error
    } finally {
      setLoading(false);
    }
  }, [eventId]);

  useEffect(() => {
    if (eventId) {
      fetchAttendance();
    } else {
      setAttendance([]);
    }
  }, [eventId, fetchAttendance]);

  return { attendance, loading, error, refetch: fetchAttendance };
};
