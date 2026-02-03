'use client';

import { AttendeeListCard } from '@/components/dashboard/AttendeeListCard';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { EventHeader } from '@/components/dashboard/EventHeader';
import { TotalAttendanceCard } from '@/components/dashboard/TotalAttendanceCard';
import { YearLevelCard } from '@/components/dashboard/YearLevelCard';
import { useEventDetails, useEvents } from '@/lib/fetchdata';
import { useState } from 'react';

export default function DashboardPage() {
  // State management
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);
  const [selectedYearLevel, setSelectedYearLevel] = useState<string | null>(null);

  // Fetch events and event details
  const { events, loading: eventsLoading, error: eventsError } = useEvents();
  const { eventDetails, loading: eventDetailsLoading, error: eventDetailsError } =
    useEventDetails(selectedEventId);

  // Handle year level click
  const handleYearLevelClick = (year: string) => {
    setSelectedYearLevel(year === selectedYearLevel ? null : year);
  };

  // Handle event selection
  const handleEventSelect = (eventId: string) => {
    setSelectedEventId(eventId);
    setSelectedYearLevel(null);
  };

  // Filter attendees by selected year level
  const filteredAttendees = selectedYearLevel && eventDetails?.attendees
    ? eventDetails.attendees.filter(attendee => attendee.yearLevel === selectedYearLevel)
    : eventDetails?.attendees || [];

  // Show loading state
  if (eventsLoading) {
    return (
      <DashboardLayout
        events={[]}
        selectedEventId={null}
        onEventSelect={handleEventSelect}
      >
        <div className="flex items-center justify-center h-full">
          <div className="text-center">
            <div className="w-8 h-8 border-4 border-green border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading events...</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  // Show error state
  if (eventsError) {
    return (
      <DashboardLayout
        events={[]}
        selectedEventId={null}
        onEventSelect={handleEventSelect}
      >
        <div className="flex items-center justify-center h-full">
          <div className="text-center">
            <h2 className="text-xl font-bold text-destructive mb-2">Error Loading Events</h2>
            <p className="text-muted-foreground">{eventsError}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 text-green hover:underline"
            >
              Try Again
            </button>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  // Show empty state if no event is selected
  if (!selectedEventId) {
    return (
      <DashboardLayout
        events={events}
        selectedEventId={null}
        onEventSelect={handleEventSelect}
      >
        <div className="flex items-center justify-center h-full">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-muted-foreground mb-2">No Event Selected</h2>
            <p className="text-muted-foreground">Please select an event from the sidebar</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  // Show event details loading state
  if (eventDetailsLoading) {
    return (
      <DashboardLayout
        events={events}
        selectedEventId={selectedEventId}
        onEventSelect={handleEventSelect}
      >
        <div className="flex items-center justify-center h-full">
          <div className="text-center">
            <div className="w-8 h-8 border-4 border-green border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading event details...</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  // Show event details error state
  if (eventDetailsError) {
    return (
      <DashboardLayout
        events={events}
        selectedEventId={selectedEventId}
        onEventSelect={handleEventSelect}
      >
        <div className="flex items-center justify-center h-full">
          <div className="text-center">
            <h2 className="text-xl font-bold text-destructive mb-2">Error Loading Event Details</h2>
            <p className="text-muted-foreground">{eventDetailsError}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 text-green hover:underline"
            >
              Try Again
            </button>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  // Show event details if available
  if (eventDetails) {
    return (
      <DashboardLayout
        events={events}
        selectedEventId={selectedEventId}
        onEventSelect={handleEventSelect}
      >
        <div className="p-6 space-y-6">
          {/* Event Header */}
          <EventHeader title={eventDetails.title} date={eventDetails.date} />

          {/* Main Grid Layout */}
          <div className="grid grid-cols-12 gap-6">
            {/* Year Level Cards and Total Attendance */}
            <div className="col-span-5 grid grid-cols-2 gap-4">
              {eventDetails.yearLevels.map((yearLevel) => (
                <YearLevelCard
                  key={yearLevel.year}
                  yearLevel={yearLevel}
                  isSelected={selectedYearLevel === yearLevel.year}
                  onClick={() => handleYearLevelClick(yearLevel.year)}
                />
              ))}

              {/* Total Attendance Card */}
              <div className="col-span-2">
                <TotalAttendanceCard
                  totalPresent={eventDetails.totalPresent}
                  totalEnrolled={eventDetails.totalEnrolled}
                />
              </div>
            </div>

            {/* Attendee List - Right Side */}
            <div className="col-span-7">
              <AttendeeListCard
                attendees={filteredAttendees}
                selectedYearLevel={selectedYearLevel}
              />
            </div>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  // Fallback to empty state
  return (
    <DashboardLayout
      events={events}
      selectedEventId={null}
      onEventSelect={handleEventSelect}
    >
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-muted-foreground mb-2">No Event Selected</h2>
          <p className="text-muted-foreground">Please select an event from the sidebar</p>
        </div>
      </div>
    </DashboardLayout>
  );
}
