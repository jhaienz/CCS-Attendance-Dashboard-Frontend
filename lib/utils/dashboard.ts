import { Attendee } from "@/types/dashboard";

// Helper to check if an attendee has valid data
export const isValidAttendee = (attendee: Attendee): boolean => {
  if (!attendee) return false;

  const hasValidLastName =
    !!attendee.lastName &&
    attendee.lastName.trim() !== "" &&
    attendee.lastName !== "Unknown";
  const hasValidFirstName =
    !!attendee.firstName &&
    attendee.firstName.trim() !== "" &&
    attendee.firstName !== "Unknown";
  const hasValidStudentId =
    !!attendee.studentId &&
    attendee.studentId.trim() !== "" &&
    attendee.studentId !== "Unknown";
  const hasValidCSY =
    !!attendee.CSY &&
    attendee.CSY.trim() !== "" &&
    attendee.CSY !== "Unknown";

  return (
    hasValidLastName ||
    hasValidFirstName ||
    hasValidStudentId ||
    hasValidCSY
  );
};

// Helper to get year level from CSY (e.g., "BSCS-2" becomes "2nd")
export const getYearLevel = (csy: string | undefined | null): string => {
  if (!csy || typeof csy !== "string") {
    return "Unknown";
  }
  const yearMatch = csy.match(/\d/);
  if (yearMatch) {
    const year = parseInt(yearMatch[0]);
    const yearSuffix = year === 1 ? "1st" : year === 2 ? "2nd" : year === 3 ? "3rd" : "4th";
    return yearSuffix;
  }
  return "Unknown";
};

// Helper to get course from CSY (e.g., "BSIT-2B" becomes "IT", "ACT-3A" becomes "ACT")
export const getCourse = (csy: string | undefined | null): string => {
  if (!csy || typeof csy !== "string") {
    return "Unknown";
  }
  // Check for ACT course (not prefixed with BS)
  if (csy.startsWith("ACT")) {
    return "ACT";
  }
  // Check for BS-prefixed courses (BSIT, BSCS, BSIS)
  const courseMatch = csy.match(/^BS([A-Z]{2})/);
  if (courseMatch) {
    return courseMatch[1]; // Returns "IT", "CS", or "IS"
  }
  return "Unknown";
};

// Helper to get simplified section (year-block part) from CSY (e.g., "BSIT 1B" becomes "1B", "ACT-3A" becomes "3A")
export const getSection = (csy: string | undefined | null): string => {
  if (!csy || typeof csy !== "string") {
    return "Unknown";
  }
  // Match patterns like "1B", "3A", "2C" with possible separators (space, hyphen, etc.)
  const sectionMatch = csy.match(/\d+[A-Z]/);
  if (sectionMatch) {
    return sectionMatch[0]; // Returns "1B", "3A", etc.
  }
  return "Unknown";
};

// Generic API error handler
export const getErrorMessage = (err: unknown): string => {
  if (typeof err === "object" && err !== null && "response" in err) {
    const apiError = err as { response?: { data?: { message?: string } } };
    return apiError.response?.data?.message || "An error occurred";
  }
  return "An error occurred";
};
