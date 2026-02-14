import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Clock, File, FileText, LinkIcon, MessageSquare, Plus, Trash2, Video, Loader2 } from 'lucide-react';
import baseUrl from '@/config/Config';

interface SectionItem {
  id: string;
  type: string;
  title: string;
  duration: string;
  videoId?: string;
  isPreview: boolean;
  description: string;
  questions?: number;
}

interface Section {
  id: string;
  title: string;
  items: SectionItem[];
}

interface CurriculumTabProps {
  sections: Section[];
  setSections: React.Dispatch<React.SetStateAction<Section[]>>;
  handleAddSection: () => void;
  handleSectionTitleChange: (sectionId: string, newTitle: string) => void;
  handleAddSectionItem: (sectionId: string, itemType: string) => void;
  handleItemChange: (sectionId: string, itemId: string, field: string, value: any) => void;
  handleDeleteItem: (sectionId: string, itemId: string) => void;
  handleDeleteSection: (sectionId: string) => void;
  handleUploadPdf: (sectionId: string, itemId: string, file: File) => void;
}

const CurriculumTab: React.FC<CurriculumTabProps> = ({
  sections,
  handleAddSection,
  handleSectionTitleChange,
  handleAddSectionItem,
  handleItemChange,
  handleDeleteItem,
  handleDeleteSection,
  handleUploadPdf
}) => {

  // const [videoFile, setVideoFile] = useState<File | null>(null);
  const [videoUrl, setVideoUrl] = useState<string>('');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadingItemId, setUploadingItemId] = useState<string | null>(null);

  const handleUpload = async (file: File, sectionId: string, itemId: string) => {
    try {
      setIsUploading(true);
      setUploadingItemId(itemId);
      // console.log('Uploading video...');
      const formData = new FormData();
      formData.append('video', file);

      const response = await fetch(`${baseUrl}/upload-bunny-video`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      // console.log('Upload successful:', data);
      setVideoUrl(data.videoId);
      handleItemChange(sectionId, itemId, 'videoId', data.videoId);
      return data;
    } catch (error) {
      console.error('Upload failed:', error);
      throw error;
    } finally {
      setIsUploading(false);
      setUploadingItemId(null);
    }
  };


  return (
    <Card>
      <CardContent className="pt-6">
        <div className="grid gap-6">
          {sections.map((section) => (
            <div
              key={section.id}
              className="border border-border rounded-lg p-4 relative"
            >
              {isUploading && uploadingItemId && section.items.some(item => item.id === uploadingItemId) && (
                <div className="absolute inset-0 bg-black/5 backdrop-blur-sm flex items-center justify-center">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
              )}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2 flex-1">
                  <Input
                    value={section.title}
                    onChange={(e) => handleSectionTitleChange(section.id, e.target.value)}
                    placeholder="Section Title"
                    className="text-lg font-medium border-none p-0 h-auto focus-visible:ring-0"
                  />
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleDeleteSection(section.id)}
                  disabled={sections.length === 1}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>

              <div className="space-y-4">
                {section.items.map((item) => (
                  <div
                    key={item.id}
                    className="bg-card border border-border rounded-md p-4"
                  >
                    <div className="flex flex-col gap-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          {item.type === 'video' ? (
                            <Video className="h-5 w-5 text-primary" />
                          ) : item.type === 'pdf' ? (
                            <FileText className="h-5 w-5 text-primary" />
                          ) : (
                            <MessageSquare className="h-5 w-5 text-primary" />
                          )}
                          <Input
                            value={item.title}
                            onChange={(e) => handleItemChange(section.id, item.id, 'title', e.target.value)}
                            placeholder={`${item.type === 'video' ? 'Video' : item.type === 'pdf' ? 'PDF' : 'Quiz'} Title`}
                            className="border-none p-0 h-auto focus-visible:ring-0"
                          />
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteItem(section.id, item.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>

                      {item.type === 'video' && (
                        <div className="grid gap-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* <div className="flex items-center gap-2">
                              <Clock className="h-4 w-4 text-muted-foreground" />
                              <Input
                                value={item.duration}
                                onChange={(e) => handleItemChange(section.id, item.id, 'duration', e.target.value)}
                                placeholder="Duration (e.g., 10:30)"
                              />
                            </div> */}
                            <div className="p-4">
                              <input
                                type="file"
                                accept="video/*"
                                onChange={(e) => {
                                  const file = e.target.files?.[0];
                                  if (file) handleUpload(file, section.id, item.id);
                                }}
                              />
                              {/* <button onClick={handleUpload} className="mt-2 bg-blue-500 text-white px-4 py-2 rounded">
                                Upload
                              </button> */}

                              {/* {item.videoUrl && (
                                <div className="mt-4">
                                  <h2 className="text-lg font-bold">Preview:</h2>
                                  <iframe
                                    src={`https://iframe.mediadelivery.net/embed/409626/${item.videoUrl.split('/').pop()}`}
                                    loading="lazy"
                                    style={{
                                      border: 'none',
                                      position: 'absolute',
                                      top: 0,
                                      left: 0,
                                      width: '100%',
                                      height: '100%'
                                    }}
                                    allow="accelerometer;gyroscope;autoplay;encrypted-media;picture-in-picture;"
                                    allowFullScreen={true}
                                  ></iframe>
                                  <div style={{
                                    position: 'relative',
                                    paddingBottom: '56.25%',
                                    height: 0,
                                    overflow: 'hidden',
                                    maxWidth: '100%',
                                    background: '#000'
                                  }}>
                                  </div>
                                </div>
                              )} */}
                            </div>
                            {/* <div className="flex items-center gap-2">
                              <LinkIcon className="h-4 w-4 text-muted-foreground" />
                              <Input
                                value={item.videoUrl}
                                onChange={(e) => handleItemChange(section.id, item.id, 'videoUrl', e.target.value)}
                                placeholder="Video URL"
                              />
                            </div> */}
                          </div>
                          <div className="flex items-center">
                            <Switch
                              id={`preview-${item.id}`}
                              checked={item.isPreview}
                              onCheckedChange={(checked) => handleItemChange(section.id, item.id, 'isPreview', checked)}
                            />
                            <Label htmlFor={`preview-${item.id}`} className="ml-2">
                              Make available as free preview
                            </Label>
                          </div>
                        </div>
                      )}

                      {item.type === 'pdf' && (
                        <div className="flex items-center gap-2">
                          <File className="h-4 w-4 text-muted-foreground" />
                          <Input
                            // value={item.videoUrl}
                            type="file"
                            accept=".pdf"
                            placeholder="Upload PDF"
                            onChange={(e) => handleUploadPdf(section.id, item.id, e.target.files[0])}
                          />
                        </div>
                      )}

                      {item.type === 'quiz' && (
                        <div className="grid gap-4">
                          <div className="flex items-center gap-2">
                            <Label htmlFor={`questions-${item.id}`}>Number of Questions:</Label>
                            <Input
                              id={`questions-${item.id}`}
                              type="number"
                              min="1"
                              value={item.questions || 0}
                              onChange={(e) => handleItemChange(section.id, item.id, 'questions', parseInt(e.target.value) || 0)}
                              className="w-24"
                            />
                          </div>
                          <p className="text-sm text-muted-foreground">
                            You'll be able to add detailed questions once you save the course.
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                ))}

                <div className="flex flex-wrap gap-2 mt-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleAddSectionItem(section.id, 'video')}
                    className="flex items-center"
                  >
                    <Video className="h-4 w-4 mr-2" />
                    Add Video
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleAddSectionItem(section.id, 'pdf')}
                    className="flex items-center"
                  >
                    <FileText className="h-4 w-4 mr-2" />
                    Add PDF
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleAddSectionItem(section.id, 'quiz')}
                    className="flex items-center"
                  >
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Add Quiz
                  </Button>
                </div>
              </div>
            </div>
          ))}

          <Button
            variant="outline"
            onClick={handleAddSection}
            className="flex items-center"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add New Section
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default CurriculumTab;
