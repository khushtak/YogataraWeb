
// Helper function to convert duration string to minutes
export function convertToMinutes(duration: string): number {
  const parts = duration.split(':');
  if (parts.length === 2) {
    return parseInt(parts[0]) + Math.round(parseInt(parts[1]) / 60);
  } else if (parts.length === 3) {
    return parseInt(parts[0]) * 60 + parseInt(parts[1]) + Math.round(parseInt(parts[2]) / 60);
  }
  return 0;
}

// Helper function to get the remaining time for a course
export function formatRemainingTime(course: any): string {
  // Calculate total minutes of content
  const totalMinutes = course.sections.reduce((acc: number, section: any) => {
    return acc + section.items.reduce((sectionAcc: number, item: any) => {
      if (item.type === 'video' && !item.completed) {
        return sectionAcc + convertToMinutes(item.duration);
      }
      return sectionAcc;
    }, 0);
  }, 0);
  
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  
  if (hours > 0) {
    return `${hours}h ${minutes}m`;
  }
  return `${minutes}m`;
}

// Helper functions for notes
export function saveNotesToLocalStorage(courseId: string, notes: Record<string, string>): void {
  try {
    localStorage.setItem(`course_${courseId}_notes`, JSON.stringify(notes));
  } catch (error) {
    console.error('Error saving notes to localStorage:', error);
  }
}

export function getNotesFromLocalStorage(courseId: string): Record<string, string> {
  try {
    const saved = localStorage.getItem(`course_${courseId}_notes`);
    return saved ? JSON.parse(saved) : {};
  } catch (error) {
    console.error('Error getting notes from localStorage:', error);
    return {};
  }
}
