
import React from 'react';
import { PlayCircle, FileText, Book } from 'lucide-react';

interface ContentTypeIconProps {
  type: string;
  className?: string;
}

const ContentTypeIcon = ({ type, className = "h-5 w-5 text-muted-foreground" }: ContentTypeIconProps) => {
  switch (type) {
    case 'video':
      return <PlayCircle className={className} />;
    case 'pdf':
      return <FileText className={className} />;
    case 'quiz':
      return <Book className={className} />;
    default:
      return <FileText className={className} />;
  }
};

export default ContentTypeIcon;
