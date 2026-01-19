
// Helper function to load bookmarks from localStorage
export const loadBookmarks = (courseId: string) => {
  try {
    const storedData = localStorage.getItem(`bookmarks_${courseId}`);
    if (storedData) {
      return JSON.parse(storedData);
    }
  } catch (error) {
    console.error('Error loading bookmarks:', error);
  }
  return {
    bookmarkedIds: [],
    bookmarkedData: []
  };
};

// Helper function to save bookmarks to localStorage
export const saveBookmarks = (courseId: string, bookmarkedIds: string[], bookmarkedData: any[]) => {
  try {
    localStorage.setItem(`bookmarks_${courseId}`, JSON.stringify({
      bookmarkedIds,
      bookmarkedData
    }));
  } catch (error) {
    console.error('Error saving bookmarks:', error);
  }
};
