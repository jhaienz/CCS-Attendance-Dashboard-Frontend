import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { getSection, isValidAttendee } from "@/lib/utils/dashboard";
import { Attendee } from "@/types/dashboard";
import { CheckCircle, Filter, Search, X } from "lucide-react";

interface AttendanceTableProps {
  attendees: Attendee[];
  onFilterClick?: () => void;
  searchTerm?: string;
  onSearchChange?: (value: string) => void;
  selectedCourse?: string;
  selectedYear?: string;
  selectedSection?: string;
  onCourseChange?: (value: string) => void;
  onYearChange?: (value: string) => void;
  onSectionChange?: (value: string) => void;
}

export function AttendanceTable({
  attendees,
  onFilterClick,
  searchTerm = "",
  onSearchChange,
  selectedCourse = "",
  selectedYear = "",
  selectedSection = "",
  onCourseChange,
  onYearChange,
  onSectionChange,
}: AttendanceTableProps) {
  console.log("Attendees received by table:", attendees);

  // Filter out invalid attendees with no meaningful data
  const validAttendees = attendees.filter(isValidAttendee);

  console.log("Valid attendees after filtering:", validAttendees);

  // Helper to get status indicator
  const getStatusIndicator = (isPresent: boolean) => {
    if (isPresent) {
      return (
        <div className="flex items-center gap-1 text-green">
          <CheckCircle className="h-4 w-4" />
        </div>
      );
    }
    return null;
  };

  // Check if there are any active filters
  const hasActiveFilters = selectedCourse || selectedYear || selectedSection;

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center justify-between gap-2">
          <span>Attendance Records</span>
          <div className="flex items-center gap-2">
            {onSearchChange && (
              <div className="relative w-64">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search by name or ID..."
                  value={searchTerm}
                  onChange={(e) => onSearchChange(e.target.value)}
                  className="pl-10 pr-4 py-2 text-sm"
                />
              </div>
            )}
            {onFilterClick && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onFilterClick}
                className="flex items-center gap-2 text-muted-foreground hover:text-green"
              >
                <Filter className="h-4 w-4" />
                <span>Filters</span>
              </Button>
            )}
          </div>
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          {validAttendees.length}{" "}
          {validAttendees.length === 1 ? "Student" : "Students"}
          {hasActiveFilters && (
            <span className="ml-2 text-muted-foreground">
              ({[
                selectedCourse && `Course: ${selectedCourse}`,
                selectedYear && `Year: ${selectedYear}`,
                selectedSection && `Section: ${getSection(selectedSection)}`,
              ].filter(Boolean).join(", ")})
            </span>
          )}
        </p>
        {/* Active Filters Display */}
        {hasActiveFilters && (
          <div className="flex flex-wrap gap-2 mt-2">
            {selectedCourse && (
              <div className="flex items-center gap-1 bg-secondary px-3 py-1 rounded-full text-sm">
                <span>Course: {selectedCourse}</span>
                {onCourseChange && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onCourseChange("")}
                    className="h-5 w-5 p-0 rounded-full"
                  >
                    <X className="h-3 w-3" />
                  </Button>
                )}
              </div>
            )}
            {selectedYear && (
              <div className="flex items-center gap-1 bg-secondary px-3 py-1 rounded-full text-sm">
                <span>Year: {selectedYear}</span>
                {onYearChange && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onYearChange("")}
                    className="h-5 w-5 p-0 rounded-full"
                  >
                    <X className="h-3 w-3" />
                  </Button>
                )}
              </div>
            )}
            {selectedSection && (
              <div className="flex items-center gap-1 bg-secondary px-3 py-1 rounded-full text-sm">
                <span>Section: {getSection(selectedSection)}</span>
                {onSectionChange && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onSectionChange("")}
                    className="h-5 w-5 p-0 rounded-full"
                  >
                    <X className="h-3 w-3" />
                  </Button>
                )}
              </div>
            )}
          </div>
        )}
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-180">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b bg-secondary/50">
                  <th className="text-left py-3 px-4 font-medium text-sm">
                    No.
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-sm">
                    Last Name
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-sm">
                    First Name
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-sm">
                    Student ID
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-sm">
                    CSY
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-sm">
                    AM IN
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-sm">
                    AM OUT
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-sm">
                    PM IN
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-sm">
                    PM OUT
                  </th>
                </tr>
              </thead>
              <tbody>
                {validAttendees.length > 0 ? (
                  validAttendees.map((attendee, index) => (
                    <tr
                      key={attendee.id}
                      className="border-b hover:bg-secondary/30 transition-colors"
                    >
                      <td className="py-3 px-4 text-sm">{index + 1}</td>
                      <td className="py-3 px-4 text-sm font-medium">
                        {attendee.lastName}
                      </td>
                      <td className="py-3 px-4 text-sm">
                        {attendee.firstName}
                      </td>
                      <td className="py-3 px-4 text-sm font-mono">
                        {attendee.studentId}
                      </td>
                      <td className="py-3 px-4 text-sm font-medium">
                        {attendee.CSY || "Unknown"}
                      </td>
                      <td className="py-3 px-4">
                        {getStatusIndicator(attendee.AM)}
                      </td>
                      <td className="py-3 px-4">
                        {getStatusIndicator(attendee.AMOut)}
                      </td>
                      <td className="py-3 px-4">
                        {getStatusIndicator(attendee.PM)}
                      </td>
                      <td className="py-3 px-4">
                        {getStatusIndicator(attendee.PMOut)}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={9}
                      className="py-12 px-4 text-center text-muted-foreground"
                    >
                      <p className="text-lg font-medium mb-2">
                        No Attendance Records
                      </p>
                      <p className="text-sm">
                        No students have been marked present yet.
                      </p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
