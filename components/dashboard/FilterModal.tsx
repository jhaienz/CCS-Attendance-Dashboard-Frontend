import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select } from '@/components/ui/select';
import { Filter, X } from 'lucide-react';
import { useEffect, useState } from 'react';

interface FilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  sections: string[];
  selectedSection: string;
  onSectionChange: (value: string) => void;
  years: string[];
  selectedYear: string;
  onYearChange: (value: string) => void;
  courses: string[];
  selectedCourse: string;
  onCourseChange: (value: string) => void;
}

export function FilterModal({
  isOpen,
  onClose,
  sections,
  selectedSection,
  onSectionChange,
  years,
  selectedYear,
  onYearChange,
  courses,
  selectedCourse,
  onCourseChange
}: FilterModalProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
    } else {
      setIsClosing(true);
      const timer = setTimeout(() => {
        setIsVisible(false);
        setIsClosing(false);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!isVisible) return null;

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${isClosing ? 'opacity-0' : 'opacity-100'
        }`}
      onClick={handleOverlayClick}
    >
      <div
        className={`bg-card rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-hidden transform transition-all duration-300 ${isClosing ? 'scale-95 opacity-0' : 'scale-100 opacity-100'
          }`}
      >
        <Card className="border-none">
          <CardHeader className="flex flex-row items-center justify-between pb-4">
            <CardTitle className="text-lg flex items-center gap-2">
              <Filter className="h-5 w-5 text-green" />
              Filter Controls
            </CardTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="h-8 w-8 p-0 rounded-full"
            >
              <X className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Course Filter */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Course</label>
                <Select
                  options={[
                    { value: '', label: 'All Courses' },
                    ...courses.map(course => ({ value: course, label: course }))
                  ]}
                  value={selectedCourse}
                  onChange={(e) => onCourseChange(e.target.value)}
                />
              </div>

              {/* Section Filter */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Section</label>
                <Select
                  options={[
                    { value: '', label: 'All Sections' },
                    ...sections.map(section => ({ value: section, label: section }))
                  ]}
                  value={selectedSection}
                  onChange={(e) => onSectionChange(e.target.value)}
                />
              </div>

              {/* Year Filter */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Year Level</label>
                <Select
                  options={[
                    { value: '', label: 'All Years' },
                    ...years.map(year => ({ value: year, label: year }))
                  ]}
                  value={selectedYear}
                  onChange={(e) => onYearChange(e.target.value)}
                />
              </div>

            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
