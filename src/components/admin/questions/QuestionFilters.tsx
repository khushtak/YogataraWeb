
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Filter } from 'lucide-react';
import BasicFilters from './BasicFilters';
import AdvancedFilters from './AdvancedFilters';

interface Course {
  id: number;
  title: string;
  sections: { id: number; title: string }[];
}

interface QuestionFiltersProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectedCourse: string;
  setSelectedCourse: (course: string) => void;
  selectedSection: string;
  setSelectedSection: (section: string) => void;
  filtersExpanded: boolean;
  setFiltersExpanded: (expanded: boolean) => void;
  courses: Course[];
}

const QuestionFilters: React.FC<QuestionFiltersProps> = ({
  searchTerm,
  setSearchTerm,
  selectedCourse,
  setSelectedCourse,
  selectedSection,
  setSelectedSection,
  filtersExpanded,
  setFiltersExpanded,
  courses,
}) => {
  return (
    <Card className="mb-6">
      <CardContent className="pt-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium">Filters</h3>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => setFiltersExpanded(!filtersExpanded)}
          >
            {/* <Filter className="mr-2 h-4 w-4" /> 
            {filtersExpanded ? 'Less filters' : 'More filters'} */}
          </Button>
        </div>
        
        <BasicFilters
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedCourse={selectedCourse}
          setSelectedCourse={setSelectedCourse}
          selectedSection={selectedSection}
          setSelectedSection={setSelectedSection}
          courses={courses}
        />
        
        {filtersExpanded && <AdvancedFilters />}
      </CardContent>
    </Card>
  );
};

export default QuestionFilters;
