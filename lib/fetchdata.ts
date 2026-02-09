import { performLogout } from "@/lib/utils";
import { DashboardService } from "@/services/dashboard-service";
import { Attendee, Event, EventDetails } from "@/types/dashboard";
import { useCallback, useEffect, useState } from "react";
import { getErrorMessage } from "./utils/dashboard";

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
      setEvents(Array.isArray(data) ? data : []);
    } catch (err: unknown) {
      const errorMessage = getErrorMessage(err) || "Failed to fetch events";
      setError(errorMessage);
      console.error("Error fetching events:", err);

      // Check if error is Unauthorized (401)
      if (errorMessage.includes("Unauthorized")) {
        performLogout();
      }

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
      const errorMessage = getErrorMessage(err) || "Failed to fetch event details";
      setError(errorMessage);
      console.error("Error fetching event details:", err);

      // Check if error is Unauthorized (401)
      if (errorMessage.includes("Unauthorized")) {
        performLogout();
      }
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
      const errorMessage = getErrorMessage(err) || "Failed to fetch attendance records";
      setError(errorMessage);
      console.error("Error fetching attendance:", err);

      // Check if error is Unauthorized (401)
      if (errorMessage.includes("Unauthorized")) {
        performLogout();
      }

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
