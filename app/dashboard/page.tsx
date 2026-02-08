'use client';

import { AttendanceTable } from '@/components/dashboard/AttendanceTable';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { EventHeader } from '@/components/dashboard/EventHeader';
import { FilterModal } from '@/components/dashboard/FilterModal';
import { TotalAttendanceCard } from '@/components/dashboard/TotalAttendanceCard';
import { YearLevelCard } from '@/components/dashboard/YearLevelCard';
import { useAttendanceByEvent, useEventDetails, useEvents } from '@/lib/fetchdata';
import { useState } from 'react';

export default function DashboardPage() {
  // State management
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);
  const [selectedYearLevel, setSelectedYearLevel] = useState<string | null>(null);
  const [selectedSection, setSelectedSection] = useState<string>('');
  const [selectedYear, setSelectedYear] = useState<string>('');
  const [selectedCourse, setSelectedCourse] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [isFilterModalOpen, setIsFilterModalOpen] = useState<boolean>(false);

  // Fetch events and attendance data
  const { events, loading: eventsLoading, error: eventsError } = useEvents();
  const { eventDetails, loading: eventDetailsLoading, error: eventDetailsError } =
    useEventDetails(selectedEventId);
  const { attendance } = useAttendanceByEvent(selectedEventId);

  // Handle year level click
  const handleYearLevelClick = (year: string) => {
    setSelectedYearLevel(year === selectedYearLevel ? null : year);
  };

  // Handle event selection
  const handleEventSelect = (eventId: string) => {
    setSelectedEventId(eventId);
    setSelectedYearLevel(null);
    setSelectedSection('');
    setSelectedYear('');
    setSelectedCourse('');
    setSearchTerm('');
  };

  // Helper to get year level from CSY (e.g., "BSCS-2" becomes "2nd")
  const getYearLevel = (csy: string | undefined | null): string => {
    if (!csy || typeof csy !== 'string') {
      return 'Unknown';
    }
    const yearMatch = csy.match(/\d/);
    if (yearMatch) {
      const year = parseInt(yearMatch[0]);
      const yearSuffix = year === 1 ? '1st' : year === 2 ? '2nd' : year === 3 ? '3rd' : '4th';
      return yearSuffix;
    }
    return 'Unknown';
  };

  // Helper to get course from CSY (e.g., "BSIT-2B" becomes "IT", "ACT-3A" becomes "ACT")
  const getCourse = (csy: string | undefined | null): string => {
    if (!csy || typeof csy !== 'string') {
      return 'Unknown';
    }
    // Check for ACT course (not prefixed with BS)
    if (csy.startsWith('ACT')) {
      return 'ACT';
    }
    // Check for BS-prefixed courses (BSIT, BSCS, BSIS)
    const courseMatch = csy.match(/^BS([A-Z]{2})/);
    if (courseMatch) {
      return courseMatch[1]; // Returns "IT", "CS", or "IS"
    }
    return 'Unknown';
  };

  // Get unique values for filters
  const sections = attendance ? Array.from(new Set(attendance.map(attendee => attendee.CSY || ''))).filter(Boolean).sort() : [];
  const years = attendance ? Array.from(new Set(attendance.map(attendee => getYearLevel(attendee.CSY)))).sort() : [];
  const courses = attendance ? Array.from(new Set(attendance.map(attendee => getCourse(attendee.CSY)))).sort() : [];

  // Filter attendees - first remove invalid records, then apply other filters
  const filteredAttendees = attendance ? attendance.filter(attendee => {
    // First filter out invalid attendees
    const hasValidLastName = attendee.lastName && attendee.lastName.trim() && attendee.lastName !== 'Unknown';
    const hasValidFirstName = attendee.firstName && attendee.firstName.trim() && attendee.firstName !== 'Unknown';
    const hasValidStudentId = attendee.studentId && attendee.studentId.trim() && attendee.studentId !== 'Unknown';
    const hasValidCSY = attendee.CSY && attendee.CSY.trim() && attendee.CSY !== 'Unknown';

    if (!(hasValidLastName || hasValidFirstName || hasValidStudentId || hasValidCSY)) {
      return false;
    }

    // Then apply other filters
    const year = getYearLevel(attendee.CSY);
    const course = getCourse(attendee.CSY);
    const searchLower = searchTerm.toLowerCase();

    // Safe property access with fallback to empty string
    const lastName = (attendee.lastName || '').toLowerCase();
    const firstName = (attendee.firstName || '').toLowerCase();
    const studentId = (attendee.studentId || '').toLowerCase();

    return (
      (!selectedSection || attendee.CSY === selectedSection) &&
      (!selectedYear || year === selectedYear) &&
      (!selectedCourse || course === selectedCourse) &&
      (lastName.includes(searchLower) ||
        firstName.includes(searchLower) ||
        studentId.includes(searchLower))
    );
  }) : [];



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

  // Calculate year level statistics from attendance data
  const calculateYearLevelStats = () => {
    const yearLevels: { [key: string]: { present: number; total: number } } = {
      '1st': { present: 0, total: 0 },
      '2nd': { present: 0, total: 0 },
      '3rd': { present: 0, total: 0 },
      '4th': { present: 0, total: 0 },
    };

    // Calculate present and total for each year level
    attendance.forEach(attendee => {
      // Skip invalid attendees
      const hasValidLastName = attendee.lastName && attendee.lastName.trim() && attendee.lastName !== 'Unknown';
      const hasValidFirstName = attendee.firstName && attendee.firstName.trim() && attendee.firstName !== 'Unknown';
      const hasValidStudentId = attendee.studentId && attendee.studentId.trim() && attendee.studentId !== 'Unknown';
      const hasValidCSY = attendee.CSY && attendee.CSY.trim() && attendee.CSY !== 'Unknown';

      if (!(hasValidLastName || hasValidFirstName || hasValidStudentId || hasValidCSY)) {
        return;
      }

      const yearLevel = getYearLevel(attendee.CSY);
      if (yearLevels[yearLevel]) {
        yearLevels[yearLevel].total++;
        if (attendee.AM || attendee.PM) {
          yearLevels[yearLevel].present++;
        }
      }
    });

    return Object.keys(yearLevels).map(year => ({
      year: year as '1st' | '2nd' | '3rd' | '4th',
      present: yearLevels[year].present,
      total: yearLevels[year].total,
    }));
  };

  // Show event details if available
  if (eventDetails) {
    const yearLevelStats = calculateYearLevelStats();
    const totalPresent = yearLevelStats.reduce((sum, year) => sum + year.present, 0);
    const totalEnrolled = yearLevelStats.reduce((sum, year) => sum + year.total, 0);

    return (
      <DashboardLayout
        events={events}
        selectedEventId={selectedEventId}
        onEventSelect={handleEventSelect}
      >
        <div className="p-6 space-y-6">
          {/* Event Header */}
          <EventHeader
            title={eventDetails.title}
            date={eventDetails.date}
          />

          {/* Filter Modal */}
          <FilterModal
            isOpen={isFilterModalOpen}
            onClose={() => setIsFilterModalOpen(false)}
            sections={sections}
            selectedSection={selectedSection}
            onSectionChange={setSelectedSection}
            years={years}
            selectedYear={selectedYear}
            onYearChange={setSelectedYear}
            courses={courses}
            selectedCourse={selectedCourse}
            onCourseChange={setSelectedCourse}
          />

          {/* Main Grid Layout */}
          <div className="grid grid-cols-12 gap-6">
            {/* Year Level Cards and Total Attendance */}
            <div className="col-span-7 grid grid-cols-2 gap-4">
              {yearLevelStats.map((yearLevel) => (
                <YearLevelCard
                  key={yearLevel.year}
                  yearLevel={yearLevel}
                  isSelected={selectedYearLevel === yearLevel.year}
                  onClick={() => handleYearLevelClick(yearLevel.year)}
                />
              ))}

            </div>
            {/* Total Attendance Card */}
            <div className="col-span-5">
              <TotalAttendanceCard
                totalPresent={totalPresent}
                totalEnrolled={totalEnrolled}
              />
            </div>


            {/* Statistics Cards */}
            {/* <div className="col-span-12">
              <StatisticsCards
                totalBySection={totalBySection}
                totalByYear={totalByYear}
                totalByCourse={totalByCourse}
              />
            </div> */}

            {/* Attendance Table move sa bottom */}
            <div className="col-span-12">
              <AttendanceTable
                attendees={filteredAttendees}
                onFilterClick={() => setIsFilterModalOpen(true)}
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
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
