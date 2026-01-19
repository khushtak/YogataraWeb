
import React from 'react';
import { Save, X } from 'lucide-react';

interface NotesPanelProps {
  currentNote: string;
  setCurrentNote: (note: string) => void;
  saveNotes: () => void;
  toggleNotes: () => void;
}

const NotesPanel: React.FC<NotesPanelProps> = ({
  currentNote,
  setCurrentNote,
  saveNotes,
  toggleNotes
}) => {
  return (
    <div className="fixed bottom-10 right-10 w-80 bg-white shadow-lg rounded-md z-50 border border-border overflow-hidden animate-fade-in">
      <div className="bg-primary text-primary-foreground p-3 flex justify-between items-center">
        <h3 className="text-sm font-medium">Lecture Notes</h3>
        <div className="flex items-center space-x-1">
          <button 
            onClick={saveNotes}
            className="p-1 rounded hover:bg-primary-foreground/10"
            title="Save notes"
          >
            <Save className="h-4 w-4" />
          </button>
          <button 
            onClick={toggleNotes}
            className="p-1 rounded hover:bg-primary-foreground/10"
            title="Close notes"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
      <div className="p-3">
        <textarea
          className="w-full h-40 resize-none p-2 text-sm border border-border rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
          placeholder="Take notes for this lecture..."
          value={currentNote}
          onChange={(e) => setCurrentNote(e.target.value)}
        />
        <div className="mt-2 text-xs text-muted-foreground">
          <p>Notes are saved per lecture and stored locally in your browser.</p>
        </div>
      </div>
    </div>
  );
};

export default NotesPanel;
