
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AdminLayout from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Check,
  ChevronDown,
  ChevronUp,
  Edit2,
  Link,
  Loader2,
  Plus,
  Save,
  Trash2,
  Upload,
  Video,
  X
} from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { toast } from '@/components/ui/use-toast';
import baseUrl from '@/config/Config';
// import { coursesData } from '@/data/coursesData';

interface CourseSectionItem {
  id: string;
  type: 'video' | 'pdf' | 'quiz';
  title: string;
  videoUrl?: string;
  duration?: string;
  isPreview: boolean;
  completed?: boolean;
}

interface CourseSection {
  id: string;
  title: string;
  items: CourseSectionItem[];
}

const EditCourse = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const [coursesData, setCoursesData] = useState([])

  const [activeTab, setActiveTab] = useState("basic-info");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [courseThumbnail, setCourseThumbnail] = useState<string | null>(null);
  const [instructorImage, setInstructorImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Basic Info State
  const [courseTitle, setCourseTitle] = useState('');
  const [courseShortDesc, setCourseShortDesc] = useState('');
  const [courseLongDesc, setCourseLongDesc] = useState('');
  const [courseCategory, setCourseCategory] = useState('');
  const [courseLevel, setCourseLevel] = useState('');
  const [coursePrice, setCoursePrice] = useState('');
  const [courseLanguage, setCourseLanguage] = useState('');

  // Instructor Info State
  const [instructorName, setInstructorName] = useState('');
  const [instructorTitle, setInstructorTitle] = useState('');
  const [instructorBio, setInstructorBio] = useState('');

  // Course Content State
  const [sections, setSections] = useState<CourseSection[]>([]);

  // What You'll Learn State
  const [learningPoints, setLearningPoints] = useState<string[]>(['']);

  // Requirements State
  const [requirements, setRequirements] = useState<string[]>(['']);

  // Target Audience State
  const [targetAudience, setTargetAudience] = useState<string[]>(['']);

  const formatCourses = (courses: any[]) => {
    return courses.map((course, index) => ({
      id: course.courseId || (index + 1).toString(),
      title: course.courseName || "Untitled Course",
      description: course.courseShortDescription || course.courseDescription || "No description available",
      longDescription: course.whatYouWillLearn?.join(" ") || "Detailed course information not available.",
      instructor: course.courseInStructure?.[0]?.name || "Unknown Instructor",
      instructorTitle: course.courseInStructure?.[0]?.title || "Instructor",
      instructorBio: course.courseInStructure?.[0]?.bio || "No bio available",
      thumbnail: course.courseImage || "https://via.placeholder.com/300",
      instructorImage: course.courseInStructure?.[0]?.image || "https://via.placeholder.com/100",
      rating: (Math.random() * 2 + 3).toFixed(1), // Random rating between 3.0 - 5.0
      students: Math.floor(Math.random() * 2000) + 500, // Random students between 500 - 2500
      duration: course.courseDuration || "N/A",
      lectures: course.videoes?.reduce((sum, vid) => sum + (vid.items?.length || 0), 0) || 0,
      price: parseFloat(course.coursePrice) || 0,
      originalPrice: parseFloat(course.coursePrice) * 1.2 || 0, // Assuming a 20% discount
      category: course.courseCategory || "General",
      level: course.courseLevel || "All Levels",
      lastUpdated: new Date().toLocaleDateString(),
      progress: Math.floor(Math.random() * 100), // Random progress %
      featured: Math.random() < 0.3, // 30% chance to be featured
      language: course.courseLanguage || "English",
      bestseller: Math.random() < 0.2, // 20% chance to be bestseller
      certification: true,
      whatYouWillLearn: course.whatYouWillLearn,
      requirements: course.requirements,
      sections: course.videoes?.map((section) => ({
        title: section.title || "Untitled Section",
        items: section.items?.map((item) => ({
          type: item.type || "video",
          title: item.title || "Untitled Lecture",
          videoUrl: item.videoUrl || "",
          duration: item.duration || "N/A",
          isPreview: item.isPreview || false,
          completed: false, // Default as false
        })),
      })) || [],
    }));
  };


  const getAllCourses = async () => {
    try {
      const response = await fetch(`${baseUrl}/get-courses`);
      if (!response.ok) {
        throw new Error("Failed to fetch courses");
      }
      const data = await response.json();
      // console.log("Raw API response:", data);

      const formattedCourses = formatCourses(data);
      // console.log("Formatted Courses:", formattedCourses);

      setCoursesData(formattedCourses);
    } catch (error) {
      console.error("Error retrieving courses:", error);
    }
  };


  useEffect(() => {
    getAllCourses();
  }, []);

  useEffect(() => {
    if (!id || coursesData.length === 0) return;

    // console.log("Searching for course with ID:", id);
    // console.log("Available Courses:", coursesData);

    const course = coursesData.find((c) => c.id === id);

    if (course) {
      // console.log("Course found:", course);
      setCourseTitle(course.title);
      setCourseShortDesc(course.description);
      setCourseLongDesc(course.longDescription);
      setCourseCategory(course.category.toLowerCase().replace(" ", "-"));
      setCourseLevel(course.level.toLowerCase().replace(" ", "-"));
      setCoursePrice(course.price.toString());
      setCourseLanguage(course.language.toLowerCase());

      setCourseThumbnail(course.thumbnail);
      setInstructorName(course.instructor);
      setInstructorTitle(course.instructorTitle);
      setInstructorBio(course.instructorBio);
      setInstructorImage(course.instructorImage);

      if (course.sections) {
        setSections(
          course.sections.map((section) => ({
            id: Math.random().toString(36).substring(2, 9),
            title: section.title,
            items: section.items.map((item) => ({
              id: Math.random().toString(36).substring(2, 9),
              type: item.type as "video" | "pdf" | "quiz",
              title: item.title,
              duration: item.duration,
              isPreview: item.isPreview,
              videoUrl:
                item.type === "video"
                  ? item.videoUrl
                  : undefined,
            })),
          }))
        );
      }

      if (course.whatYouWillLearn) setLearningPoints(course.whatYouWillLearn);
      if (course.requirements) setRequirements(course.requirements);
      if (course.targetAudience) setTargetAudience(course.targetAudience);

      setIsLoading(false);
    } else {
      console.error("Course not found for ID:", id);
      toast({
        title: "Course not found",
        description: "The requested course doesn't exist or couldn't be loaded.",
        variant: "destructive",
      });
      navigate("/admin/courses");
    }
  }, [id, coursesData, navigate]);



  const handleAddSection = () => {
    setSections([
      ...sections,
      {
        id: Date.now().toString(),
        title: `New Section`,
        items: []
      }
    ]);
  };

  const handleSectionTitleChange = (sectionId: string, newTitle: string) => {
    setSections(
      sections.map(section =>
        section.id === sectionId
          ? { ...section, title: newTitle }
          : section
      )
    );
  };

  const handleDeleteSection = (sectionId: string) => {
    setSections(sections.filter(section => section.id !== sectionId));
  };

  const handleMoveSectionUp = (index: number) => {
    if (index === 0) return;
    const newSections = [...sections];
    [newSections[index - 1], newSections[index]] = [newSections[index], newSections[index - 1]];
    setSections(newSections);
  };

  const handleMoveSectionDown = (index: number) => {
    if (index === sections.length - 1) return;
    const newSections = [...sections];
    [newSections[index], newSections[index + 1]] = [newSections[index + 1], newSections[index]];
    setSections(newSections);
  };

  const handleAddContentItem = (sectionId: string, type: 'video' | 'pdf' | 'quiz') => {
    setSections(
      sections.map(section =>
        section.id === sectionId
          ? {
            ...section,
            items: [
              ...section.items,
              {
                id: Date.now().toString(),
                type,
                title: `New ${type.charAt(0).toUpperCase() + type.slice(1)}`,
                isPreview: false
              }
            ]
          }
          : section
      )
    );
  };

  const handleContentItemChange = (
    sectionId: string,
    itemId: string,
    field: keyof CourseSectionItem,
    value: string | boolean
  ) => {
    setSections(
      sections.map(section =>
        section.id === sectionId
          ? {
            ...section,
            items: section.items.map(item =>
              item.id === itemId
                ? { ...item, [field]: value }
                : item
            )
          }
          : section
      )
    );
  };

  const handleDeleteContentItem = (sectionId: string, itemId: string) => {
    setSections(
      sections.map(section =>
        section.id === sectionId
          ? {
            ...section,
            items: section.items.filter(item => item.id !== itemId)
          }
          : section
      )
    );
  };

  const handleMoveItemUp = (sectionId: string, index: number) => {
    if (index === 0) return;
    const section = sections.find(s => s.id === sectionId);
    if (!section) return;

    const newItems = [...section.items];
    [newItems[index - 1], newItems[index]] = [newItems[index], newItems[index - 1]];

    setSections(
      sections.map(s =>
        s.id === sectionId
          ? { ...s, items: newItems }
          : s
      )
    );
  };

  const handleMoveItemDown = (sectionId: string, index: number) => {
    const section = sections.find(s => s.id === sectionId);
    if (!section || index === section.items.length - 1) return;

    const newItems = [...section.items];
    [newItems[index], newItems[index + 1]] = [newItems[index + 1], newItems[index]];

    setSections(
      sections.map(s =>
        s.id === sectionId
          ? { ...s, items: newItems }
          : s
      )
    );
  };

  const handleAddLearningPoint = () => {
    setLearningPoints([...learningPoints, '']);
  };

  const handleLearningPointChange = (index: number, value: string) => {
    const newPoints = [...learningPoints];
    newPoints[index] = value;
    setLearningPoints(newPoints);
  };

  const handleDeleteLearningPoint = (index: number) => {
    setLearningPoints(learningPoints.filter((_, i) => i !== index));
  };

  const handleAddRequirement = () => {
    setRequirements([...requirements, '']);
  };

  const handleRequirementChange = (index: number, value: string) => {
    const newRequirements = [...requirements];
    newRequirements[index] = value;
    setRequirements(newRequirements);
  };

  const handleDeleteRequirement = (index: number) => {
    setRequirements(requirements.filter((_, i) => i !== index));
  };

  const handleAddTargetAudience = () => {
    setTargetAudience([...targetAudience, '']);
  };

  const handleTargetAudienceChange = (index: number, value: string) => {
    const newTargetAudience = [...targetAudience];
    newTargetAudience[index] = value;
    setTargetAudience(newTargetAudience);
  };

  const handleDeleteTargetAudience = (index: number) => {
    setTargetAudience(targetAudience.filter((_, i) => i !== index));
  };

  const handleThumbnailUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const thumbnailUrl = await uploadFile(file);
      if (thumbnailUrl) {
        setCourseThumbnail(thumbnailUrl);
      }
      // const reader = new FileReader();
      // reader.onload = () => {
      //   setCourseThumbnail(reader.result as string);
      // };
      // reader.readAsDataURL(file);
    }
  };

  const handleInstructorImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const instructorImageUrl = await uploadFile(file);
      if (instructorImageUrl) {
        setInstructorImage(instructorImageUrl);
      }
      // const reader = new FileReader();
      // reader.onload = () => {
      //   setInstructorImage(reader.result as string);
      // };
      // reader.readAsDataURL(file);
    }
  };

  const uploadFile = async (file: File): Promise<string | null> => {
    if (!file) {
      alert("Please select a valid file.");
      return null;
    }

    // Allowed file types (must match backend's configuration)
    const allowedTypes = ["image/jpeg", "image/png", "image/jpg", "image/gif", "video/mp4", "video/avi", "video/mkv", "video/mov", "application/pdf"];

    if (!allowedTypes.includes(file.type)) {
      alert("Invalid file type. Only images, videos, and PDFs are allowed.");
      return null;
    }

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch(`${baseUrl}/upload-file`, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (response.ok && data.success) {
        console.log("File uploaded successfully:", data.fileUrl);
        return data.fileUrl; // ✅ Return Cloudinary URL
      } else {
        console.error("Upload failed:", data.message);
        alert(data.message || "File upload failed. Please try again.");
        return null;
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("An error occurred while uploading the file.");
      return null;
    }
  };

  const handleSubmit = async () => {
    // Validation
    if (!courseTitle.trim()) {
      toast({
        title: "Missing information",
        description: "Course title is required",
        variant: "destructive",
      });
      setActiveTab("basic-info");
      return;
    }

    if (!courseCategory) {
      toast({
        title: "Missing information",
        description: "Please select a course category",
        variant: "destructive",
      });
      setActiveTab("basic-info");
      return;
    }

    if (!instructorName.trim()) {
      toast({
        title: "Missing information",
        description: "Instructor name is required",
        variant: "destructive",
      });
      setActiveTab("instructor");
      return;
    }

    if (sections.some((section) => section.items.length === 0)) {
      toast({
        title: "Missing content",
        description: "All sections must have at least one content item",
        variant: "destructive",
      });
      setActiveTab("content");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(`${baseUrl}/update-course/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          courseName: courseTitle,
          courseCategory,
          courseLanguage,
          courseLevel,
          coursePrice,
          courseShortDescription: courseShortDesc,
          courseDescription: courseLongDesc,
          courseImage: courseThumbnail,
          courseInStructure: [
            {
              name: instructorName,
              title: instructorTitle,
              bio: instructorBio,
              image: instructorImage,
            },
          ],
          whatYouWillLearn: learningPoints,
          requirements,
          videoes: sections.map((section) => ({
            title: section.title,
            items: section.items.map((item) => ({
              type: item.type,
              title: item.title,
              duration: item.duration,
              videoUrl: item.videoUrl,
              isPreview: item.isPreview,
            })),
          })),
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update course");
      }

      toast({
        title: "Course updated successfully",
        description: "Your changes have been saved",
      });

      navigate("/admin/courses");
    } catch (error) {
      toast({
        title: "Error updating course",
        description: error.message || "There was a problem updating your course. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };


  if (isLoading) {
    return (
      <AdminLayout>
        <div className="flex flex-col items-center justify-center min-h-[60vh]">
          <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
          <p className="text-muted-foreground">Loading course data...</p>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold">Edit Course</h1>
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            onClick={() => navigate('/admin/courses')}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </>
            )}
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="basic-info">Basic Info</TabsTrigger>
          <TabsTrigger value="instructor">Instructor</TabsTrigger>
          <TabsTrigger value="content">Content</TabsTrigger>
          <TabsTrigger value="learning">What You'll Learn</TabsTrigger>
          <TabsTrigger value="requirements">Requirements & Audience</TabsTrigger>
        </TabsList>

        {/* Basic Info Tab */}
        <TabsContent value="basic-info" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Course Information</CardTitle>
              <CardDescription>Edit the basic details about your course</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="title">Course Title</Label>
                  <Input
                    id="title"
                    placeholder="Enter course title"
                    value={courseTitle}
                    onChange={(e) => setCourseTitle(e.target.value)}
                  />
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="short-description">Short Description</Label>
                  <Textarea
                    id="short-description"
                    placeholder="Enter a short description visible in course listings"
                    value={courseShortDesc}
                    onChange={(e) => setCourseShortDesc(e.target.value)}
                  />
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="long-description">Detailed Description</Label>
                  <Textarea
                    id="long-description"
                    placeholder="Enter a detailed description of your course"
                    rows={6}
                    value={courseLongDesc}
                    onChange={(e) => setCourseLongDesc(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select value={courseCategory} onValueChange={setCourseCategory}>
                    <SelectTrigger id="category">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="vedic-astrology">Vedic Astrology</SelectItem>
                      <SelectItem value="numerology">Numerology</SelectItem>
                      <SelectItem value="tarot">Tarot Reading</SelectItem>
                      <SelectItem value="palmistry">Palmistry</SelectItem>
                      <SelectItem value="vaastu">Vaastu Shastra</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="level">Level</Label>
                  <Select value={courseLevel} onValueChange={setCourseLevel}>
                    <SelectTrigger id="level">
                      <SelectValue placeholder="Select level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="beginner">Beginner</SelectItem>
                      <SelectItem value="intermediate">Intermediate</SelectItem>
                      <SelectItem value="advanced">Advanced</SelectItem>
                      <SelectItem value="all-levels">All Levels</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="price">Price</Label>
                  <Input
                    id="price"
                    type="number"
                    placeholder="99.99"
                    value={coursePrice}
                    onChange={(e) => setCoursePrice(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="language">Language</Label>
                  <Select value={courseLanguage} onValueChange={setCourseLanguage}>
                    <SelectTrigger id="language">
                      <SelectValue placeholder="Select language" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="english">English</SelectItem>
                      <SelectItem value="hindi">Hindi</SelectItem>
                      <SelectItem value="sanskrit">Sanskrit</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Course Thumbnail</Label>
                <div className="flex flex-col gap-4">
                  {courseThumbnail ? (
                    <div className="relative w-full max-w-md">
                      <img
                        src={courseThumbnail}
                        alt="Course thumbnail"
                        className="object-cover w-full h-48 rounded-md"
                      />
                      <Button
                        variant="destructive"
                        size="sm"
                        className="absolute top-2 right-2"
                        onClick={() => setCourseThumbnail(null)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center w-full">
                      <label
                        htmlFor="thumbnail-upload"
                        className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-border rounded-lg cursor-pointer bg-background hover:bg-muted/50 transition-colors"
                      >
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                          <p className="text-sm text-muted-foreground">
                            <span className="font-medium">Click to upload</span> or drag and drop
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">
                            PNG, JPG or WEBP (max. 2MB)
                          </p>
                        </div>
                        <input
                          id="thumbnail-upload"
                          type="file"
                          className="hidden"
                          accept="image/*"
                          onChange={handleThumbnailUpload}
                        />
                      </label>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Instructor Tab */}
        <TabsContent value="instructor" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Instructor Information</CardTitle>
              <CardDescription>Edit information about the course instructor</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="instructor-name">Instructor Name</Label>
                  <Input
                    id="instructor-name"
                    placeholder="Enter name"
                    value={instructorName}
                    onChange={(e) => setInstructorName(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="instructor-title">Title/Credentials</Label>
                  <Input
                    id="instructor-title"
                    placeholder="e.g. Jyotish Acharya, Vedic Scholar"
                    value={instructorTitle}
                    onChange={(e) => setInstructorTitle(e.target.value)}
                  />
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="instructor-bio">Biography</Label>
                  <Textarea
                    id="instructor-bio"
                    placeholder="Enter instructor biography"
                    rows={4}
                    value={instructorBio}
                    onChange={(e) => setInstructorBio(e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Instructor Photo</Label>
                <div className="flex flex-col gap-4">
                  {instructorImage ? (
                    <div className="relative w-40 h-40">
                      <img
                        src={instructorImage}
                        alt="Instructor"
                        className="object-cover w-40 h-40 rounded-full"
                      />
                      <Button
                        variant="destructive"
                        size="sm"
                        className="absolute top-0 right-0"
                        onClick={() => setInstructorImage(null)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center">
                      <label
                        htmlFor="instructor-upload"
                        className="flex flex-col items-center justify-center w-40 h-40 border-2 border-dashed border-border rounded-full cursor-pointer bg-background hover:bg-muted/50 transition-colors"
                      >
                        <div className="flex flex-col items-center justify-center">
                          <Upload className="h-6 w-6 text-muted-foreground mb-2" />
                          <p className="text-xs text-muted-foreground text-center">
                            Upload photo
                          </p>
                        </div>
                        <input
                          id="instructor-upload"
                          type="file"
                          className="hidden"
                          accept="image/*"
                          onChange={handleInstructorImageUpload}
                        />
                      </label>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Content Tab */}
        <TabsContent value="content" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Course Content</CardTitle>
              <CardDescription>Edit your course sections and lectures</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <Button onClick={handleAddSection} className="w-full">
                <Plus className="mr-2 h-4 w-4" /> Add New Section
              </Button>

              <Accordion type="multiple" className="w-full">
                {sections.map((section, sectionIndex) => (
                  <AccordionItem key={section.id} value={section.id} className="border border-border rounded-md px-4 mb-4">
                    <div className="flex items-center justify-between py-4">
                      <div className="flex-1 mr-4">
                        <Input
                          value={section.title}
                          onChange={(e) => handleSectionTitleChange(section.id, e.target.value)}
                          placeholder="Section Title"
                          className="font-medium"
                        />
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          disabled={sectionIndex === 0}
                          onClick={() => handleMoveSectionUp(sectionIndex)}
                        >
                          <ChevronUp className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          disabled={sectionIndex === sections.length - 1}
                          onClick={() => handleMoveSectionDown(sectionIndex)}
                        >
                          <ChevronDown className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          disabled={sections.length <= 1}
                          onClick={() => handleDeleteSection(section.id)}
                        >
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                        <AccordionTrigger />
                      </div>
                    </div>
                    <AccordionContent className="pb-4 pt-0">
                      <div className="space-y-4">
                        <div className="flex flex-wrap gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleAddContentItem(section.id, 'video')}
                          >
                            <Video className="mr-2 h-4 w-4" /> Add Video
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleAddContentItem(section.id, 'pdf')}
                          >
                            <Upload className="mr-2 h-4 w-4" /> Add PDF
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleAddContentItem(section.id, 'quiz')}
                          >
                            <Plus className="mr-2 h-4 w-4" /> Add Quiz
                          </Button>
                        </div>

                        {section.items.length === 0 ? (
                          <div className="text-center py-4 text-muted-foreground">
                            No content items yet. Add a video, PDF or quiz to get started.
                          </div>
                        ) : (
                          <div className="space-y-3 mt-4">
                            {section.items.map((item, itemIndex) => (
                              <div
                                key={item.id}
                                className="flex flex-col gap-3 p-3 border border-border rounded-md"
                              >
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center">
                                    {item.type === 'video' && <Video className="h-4 w-4 mr-2 text-blue-500" />}
                                    {item.type === 'pdf' && <Upload className="h-4 w-4 mr-2 text-red-500" />}
                                    {item.type === 'quiz' && <Check className="h-4 w-4 mr-2 text-green-500" />}
                                    <span className="font-medium">{item.title}</span>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      disabled={itemIndex === 0}
                                      onClick={() => handleMoveItemUp(section.id, itemIndex)}
                                    >
                                      <ChevronUp className="h-4 w-4" />
                                    </Button>
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      disabled={itemIndex === section.items.length - 1}
                                      onClick={() => handleMoveItemDown(section.id, itemIndex)}
                                    >
                                      <ChevronDown className="h-4 w-4" />
                                    </Button>
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      onClick={() => handleDeleteContentItem(section.id, item.id)}
                                    >
                                      <Trash2 className="h-4 w-4 text-destructive" />
                                    </Button>
                                  </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                  <div>
                                    <Label htmlFor={`item-title-${item.id}`}>Title</Label>
                                    <Input
                                      id={`item-title-${item.id}`}
                                      value={item.title}
                                      onChange={(e) => handleContentItemChange(section.id, item.id, 'title', e.target.value)}
                                      placeholder={`${item.type.charAt(0).toUpperCase() + item.type.slice(1)} Title`}
                                    />
                                  </div>

                                  {item.type === 'video' && (
                                    <div>
                                      <Label htmlFor={`item-video-${item.id}`}>Video URL</Label>
                                      <div className="flex">
                                        <div className="relative flex-1">
                                          <Link className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                          <Input
                                            id={`item-video-${item.id}`}
                                            value={item.videoUrl || ''}
                                            onChange={(e) => handleContentItemChange(section.id, item.id, 'videoUrl', e.target.value)}
                                            placeholder="Paste video URL (YouTube, Vimeo, etc.)"
                                            className="pl-10"
                                          />
                                        </div>
                                      </div>
                                    </div>
                                  )}

                                  {item.type === 'video' && (
                                    <div>
                                      <Label htmlFor={`item-duration-${item.id}`}>Duration</Label>
                                      <Input
                                        id={`item-duration-${item.id}`}
                                        value={item.duration || ''}
                                        onChange={(e) => handleContentItemChange(section.id, item.id, 'duration', e.target.value)}
                                        placeholder="e.g. 10:30"
                                      />
                                    </div>
                                  )}

                                  <div className="flex items-center space-x-2 md:col-span-2">
                                    <input
                                      type="checkbox"
                                      id={`item-preview-${item.id}`}
                                      checked={item.isPreview}
                                      onChange={(e) => handleContentItemChange(section.id, item.id, 'isPreview', e.target.checked)}
                                      className="h-4 w-4 rounded border-gray-300"
                                    />
                                    <Label htmlFor={`item-preview-${item.id}`} className="text-sm">
                                      Make this a free preview item
                                    </Label>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        </TabsContent>

        {/* What You'll Learn Tab */}
        <TabsContent value="learning" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>What You'll Learn</CardTitle>
              <CardDescription>Edit key learning points that students will gain from your course</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {learningPoints.map((point, index) => (
                <div key={index} className="flex items-center gap-2">
                  <Input
                    value={point}
                    onChange={(e) => handleLearningPointChange(index, e.target.value)}
                    placeholder="Enter a learning outcome"
                    className="flex-1"
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDeleteLearningPoint(index)}
                    disabled={learningPoints.length <= 1}
                  >
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </div>
              ))}

              <Button variant="outline" onClick={handleAddLearningPoint}>
                <Plus className="mr-2 h-4 w-4" /> Add Learning Point
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Requirements & Audience Tab */}
        <TabsContent value="requirements" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Requirements</CardTitle>
              <CardDescription>Edit any prerequisites or requirements for taking this course</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {requirements.map((requirement, index) => (
                <div key={index} className="flex items-center gap-2">
                  <Input
                    value={requirement}
                    onChange={(e) => handleRequirementChange(index, e.target.value)}
                    placeholder="Enter a requirement"
                    className="flex-1"
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDeleteRequirement(index)}
                    disabled={requirements.length <= 1}
                  >
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </div>
              ))}

              <Button variant="outline" onClick={handleAddRequirement}>
                <Plus className="mr-2 h-4 w-4" /> Add Requirement
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Target Audience</CardTitle>
              <CardDescription>Edit who this course is for</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {targetAudience.map((audience, index) => (
                <div key={index} className="flex items-center gap-2">
                  <Input
                    value={audience}
                    onChange={(e) => handleTargetAudienceChange(index, e.target.value)}
                    placeholder="Enter target audience"
                    className="flex-1"
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDeleteTargetAudience(index)}
                    disabled={targetAudience.length <= 1}
                  >
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </div>
              ))}

              <Button variant="outline" onClick={handleAddTargetAudience}>
                <Plus className="mr-2 h-4 w-4" /> Add Target Audience
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </AdminLayout>
  );
};

export default EditCourse;
