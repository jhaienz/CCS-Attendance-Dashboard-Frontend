'use client';

import { AttendeeListCard } from '@/components/dashboard/AttendeeListCard';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { EventHeader } from '@/components/dashboard/EventHeader';
import { TotalAttendanceCard } from '@/components/dashboard/TotalAttendanceCard';
import { YearLevelCard } from '@/components/dashboard/YearLevelCard';
import { useState } from 'react';

export default function DashboardPage() {
  // State management
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);
  const [selectedYearLevel, setSelectedYearLevel] = useState<string | null>(null);




  const eventDetails = {
    title: "Sample Event",
    date: "2024-01-01",
    yearLevels: [
      { year: "Freshman" },
      { year: "Sophomore" },
      { year: "Junior" },
      { year: "Senior" },
    ],
    totalPresent: 100,
    totalEnrolled: 150,
  };
  const handleYearLevelClick = (year: string) => {
    console.log('Year level clicked:', year);
  };

  // Handle event selection
  const handleEventSelect = (eventId: string) => {
    console.log('Event selected:', eventId);
  };

  // Show empty state if no event is selected
  if (false) {
    return (
      <DashboardLayout
        events={[]}
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

  return (
    <DashboardLayout
      events={[]}
      selectedEventId={null}
      onEventSelect={handleEventSelect}
    >
      <div className="p-6 space-y-6">
        {/* Event Header */}
        <EventHeader title="Sample Event" date="2024-01-01" />

        {/* Main Grid Layout */}
        <div className="grid grid-cols-12 gap-6">
          {/* Year Level Cards and Total Attendance */}
          <div className="col-span-5 grid grid-cols-2 gap-4">
            {eventDetails.yearLevels.map((yearLevel: any) => (
              <YearLevelCard
                key={yearLevel.year}
                yearLevel={yearLevel.year}
                isSelected={false}
                onClick={() => handleYearLevelClick(yearLevel.year)}
              />
            ))}

            {/* Total Attendance Card */}
            <div className="col-span-2">
              <TotalAttendanceCard
                // Sample data
                totalPresent={100}
                totalEnrolled={150}
              />
            </div>
          </div>

          {/* Attendee List - Right Side */}
          <div className="col-span-7">
            <AttendeeListCard
              attendees={[]}
              selectedYearLevel={null}
            />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
