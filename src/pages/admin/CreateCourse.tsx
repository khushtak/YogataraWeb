import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminLayout from '@/components/admin/AdminLayout';
import { Tabs, TabsContent } from '@/components/ui/tabs';
import { toast } from '@/components/ui/use-toast';

// Import custom components
import TabsNavigation from '@/components/admin/course/TabsNavigation';
import CourseHeader from '@/components/admin/course/CourseHeader';
import BasicInfoTab from '@/components/admin/course/BasicInfoTab';
import MediaTab from '@/components/admin/course/MediaTab';
import InstructorTab from '@/components/admin/course/InstructorTab';
import CurriculumTab from '@/components/admin/course/CurriculumTab';
import DetailsTab from '@/components/admin/course/DetailsTab';
import PricingTab from '@/components/admin/course/PricingTab';
import SettingsTab from '@/components/admin/course/SettingsTab';
import baseUrl from '@/config/Config';

const CreateCourse = () => {
  const navigate = useNavigate();

  // Basic course information state with all required properties
  const [courseDetails, setCourseDetails] = useState({
    title: '',
    shortDescription: '',
    longDescription: '',
    category: '',
    level: '',
    language: '',
    price: '',
    salePrice: '',
    duration: '',
    lectures: '',
    isFeatured: false,
    isBestseller: false,
    hasCertification: false,
    publishDate: null,
    status: 'draft',
    tags: [],
    promoUrl: '',
    dripContent: false,
    commentsEnabled: true
  });

  // Instructor information
  const [instructorDetails, setInstructorDetails] = useState({
    name: '',
    title: '',
    bio: '',
    image: null
  });

  // Course content sections with proper typing for items
  const [sections, setSections] = useState([
    {
      id: '1',
      title: 'Introduction',
      items: [
        {
          id: '1-1',
          type: 'video',
          title: 'Welcome to the Course',
          duration: '10:00',
          videoUrl: '',
          isPreview: true,
          description: '',
          questions: 0
        }
      ]
    }
  ]);

  // Course thumbnail
  const [thumbnail, setThumbnail] = useState(null);

  // Learning points, requirements, and target audience
  const [whatYouWillLearn, setWhatYouWillLearn] = useState(['']);
  const [requirements, setRequirements] = useState(['']);
  const [targetAudience, setTargetAudience] = useState(['']);

  // New tag input
  const [newTag, setNewTag] = useState('');

  const handleUploadPdf = async (sectionID: string, itemId: string, file: File) => {
    if (file) {
      const fileUrl = await uploadFile(file);
      if (fileUrl) {
        handleItemChange(sectionID, itemId, 'pdfUrl', fileUrl);
      }
    }
  };

  // Helper function to handle course detail changes
  const handleCourseDetailChange = (field, value) => {
    setCourseDetails({
      ...courseDetails,
      [field]: value
    });
    
  };

  // Helper function to handle instructor detail changes
  const handleInstructorDetailChange = (field, value) => {
    setInstructorDetails({
      ...instructorDetails,
      [field]: value
    });
  };

  // Helper function to add a section
  const handleAddSection = () => {
    setSections([
      ...sections,
      {
        id: `${sections.length + 1}`,
        title: `New Section ${sections.length + 1}`,
        items: []
      }
    ]);
  };

  // Helper function to update a section title
  const handleSectionTitleChange = (sectionId, newTitle) => {
    setSections(sections.map(section =>
      section.id === sectionId ? { ...section, title: newTitle } : section
    ));
  };

  // Helper function to add an item to a section
  const handleAddSectionItem = (sectionId, itemType) => {
    setSections(sections.map(section => {
      if (section.id === sectionId) {
        const newItem = {
          id: `${sectionId}-${section.items.length + 1}`,
          type: itemType,
          title: `New ${itemType === 'video' ? 'Video' : itemType === 'pdf' ? 'PDF' : 'Quiz'}`,
          duration: itemType === 'video' ? '00:00' : '',
          videoUrl: '',
          pdfUrl: '',
          isPreview: false,
          description: '',
          questions: itemType === 'quiz' ? 5 : 0
        };

        return {
          ...section,
          items: [...section.items, newItem]
        };
      }
      return section;
    }));
  };

  // Helper function to update an item
  const handleItemChange = (sectionId, itemId, field, value) => {
    setSections(sections.map(section => {
      if (section.id === sectionId) {
        const updatedItems = section.items.map(item => {
          if (item.id === itemId) {
            return { ...item, [field]: value };
          }
          return item;
        });

        return {
          ...section,
          items: updatedItems
        };
      }
      return section;
    }));
  };

  // Helper function to delete an item
  const handleDeleteItem = (sectionId, itemId) => {
    setSections(sections.map(section => {
      if (section.id === sectionId) {
        return {
          ...section,
          items: section.items.filter(item => item.id !== itemId)
        };
      }
      return section;
    }));
  };

  // Helper function to delete a section
  const handleDeleteSection = (sectionId) => {
    setSections(sections.filter(section => section.id !== sectionId));
  };

  // Helper function to add tag
  const handleAddTag = () => {
    if (newTag && !courseDetails.tags.includes(newTag)) {
      setCourseDetails({
        ...courseDetails,
        tags: [...courseDetails.tags, newTag]
      });
      setNewTag('');
    }
  };

  // Helper function to remove tag
  const handleRemoveTag = (tagToRemove) => {
    setCourseDetails({
      ...courseDetails,
      tags: courseDetails.tags.filter(tag => tag !== tagToRemove)
    });
  };

  // Handle thumbnail upload
  const handleThumbnailChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setThumbnail(file);
    }
  };

  // Handle instructor image upload
  const handleInstructorImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const instructorImage = await uploadFile(file);
      setInstructorDetails({
        ...instructorDetails,
        image: instructorImage
      });
    }
  };

  // Add or update list items (like whatYouWillLearn, requirements, targetAudience)
  const handleListItemChange = (listType, index, value) => {
    if (listType === 'whatYouWillLearn') {
      const updatedList = [...whatYouWillLearn];
      updatedList[index] = value;
      setWhatYouWillLearn(updatedList);
    } else if (listType === 'requirements') {
      const updatedList = [...requirements];
      updatedList[index] = value;
      setRequirements(updatedList);
    } else if (listType === 'targetAudience') {
      const updatedList = [...targetAudience];
      updatedList[index] = value;
      setTargetAudience(updatedList);
    }
  };

  // Add a new empty item to a list
  const handleAddListItem = (listType) => {
    if (listType === 'whatYouWillLearn') {
      setWhatYouWillLearn([...whatYouWillLearn, '']);
    } else if (listType === 'requirements') {
      setRequirements([...requirements, '']);
    } else if (listType === 'targetAudience') {
      setTargetAudience([...targetAudience, '']);
    }
  };

  // Remove an item from a list
  const handleRemoveListItem = (listType, index) => {
    if (listType === 'whatYouWillLearn') {
      const updatedList = whatYouWillLearn.filter((_, i) => i !== index);
      setWhatYouWillLearn(updatedList.length ? updatedList : ['']);
    } else if (listType === 'requirements') {
      const updatedList = requirements.filter((_, i) => i !== index);
      setRequirements(updatedList.length ? updatedList : ['']);
    } else if (listType === 'targetAudience') {
      const updatedList = targetAudience.filter((_, i) => i !== index);
      setTargetAudience(updatedList.length ? updatedList : ['']);
    }
  };



  // Save the course
 const handleSaveCourse = async () => {
  if (!courseDetails.title) {
    alert("Please enter a course title");
    return;
  }

  if (!courseDetails.category) {
    alert("Please select a category");
    return;
  }

  if (!thumbnail) {
    alert("Please upload a thumbnail");
    return;
  }

  const previewImage = await uploadFile(thumbnail);
  if (!previewImage) return;

  const courseData = {
    courseName: courseDetails.title,

    // ✅ SLUG IN courseId
    courseId: courseDetails.category, 

    courseImage: previewImage,
    courseShortDescription: courseDetails.shortDescription,
    courseDescription: courseDetails.longDescription,
    courseLanguage: courseDetails.language,
    courseDuration: courseDetails.duration,
    courseLevel: courseDetails.level,
    coursePrice: courseDetails.price,

    // optional: same slug again if needed
    courseCategory: courseDetails.category,

    courseInStructure: instructorDetails,
    tags: courseDetails.tags,
    whatYouWillLearn,
    requirements,
    videoes: sections,
  };

  await addCourse(courseData);
};



  const addCourse = async (courseData: {
    courseName: string;
    courseId: string;
    courseImage: any;
    courseShortDescription: string;
    courseDescription: string;
    courseLanguage: string;
    courseDuration: string;
    courseLevel: string;
    coursePrice: string;
    courseCategory: string;
    courseInStructure: any;
    tags: string[];
    whatYouWillLearn: string[];
    requirements: string[];
    videoes: any;
  }) => {
    try {
      const response = await fetch(`${baseUrl}/add-course`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(courseData),
      });
console.log('dd2',response);

      const data = await response.json();
console.log('dd',data);
      if (!response.ok) {
        throw new Error(data.message || "Failed to add course");
      }

      console.log("Course added successfully", data);
      // return data;
      navigate('/admin/courses');
    } catch (error) {
      console.error("Error adding course:", error);
    }
  };


  // Discard changes and go back
  const handleDiscard = () => {
    navigate('/admin/courses');
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



  // const uploadFiles = async () => {
  //   if (!pdfs || pdfs.length === 0) {
  //     alert("Please select files.");
  //     return;
  //   }

  //   try {
  //     const formData = new FormData();
  //     for (let i = 0; i < pdfs.length; i++) {
  //       formData.append("files", pdfs[i]); // Append each file
  //     }

  //     const response = await fetch("http://localhost:5000/api/upload-multiple-files", {
  //       method: "POST",
  //       body: formData,
  //     });

  //     const data = await response.json();
  //     if (data.success) {
  //       console.log("Files uploaded successfully:", data);
  //     } else {
  //       console.error("Upload failed");
  //     }
  //   } catch (error) {
  //     console.error("Error uploading files:", error);
  //   }
  // };

  return (
    <AdminLayout>
      <CourseHeader
        handleSaveCourse={handleSaveCourse}
        handleDiscard={handleDiscard}
      />

      <Tabs defaultValue="basic" className="space-y-8">
        <TabsNavigation />

        {/* Basic Information Tab */}
        <TabsContent value="basic" className="space-y-6">
          <BasicInfoTab
            courseDetails={courseDetails}
            handleCourseDetailChange={handleCourseDetailChange}
            newTag={newTag}
            setNewTag={setNewTag}
            handleAddTag={handleAddTag}
            handleRemoveTag={handleRemoveTag}
          />
        </TabsContent>

        {/* Media Tab */}
        <TabsContent value="media" className="space-y-6">
          <MediaTab
            courseDetails={courseDetails}
            handleCourseDetailChange={handleCourseDetailChange}
            thumbnail={thumbnail && URL.createObjectURL(thumbnail)}
            setThumbnail={setThumbnail}
            handleThumbnailChange={handleThumbnailChange}
          />
        </TabsContent>

        {/* Instructor Tab */}
        <TabsContent value="instructor" className="space-y-6">
          <InstructorTab
            instructorDetails={instructorDetails}
            handleInstructorDetailChange={handleInstructorDetailChange}
            handleInstructorImageChange={handleInstructorImageChange}
          />
        </TabsContent>

        {/* Curriculum Tab */}
        <TabsContent value="curriculum" className="space-y-6">
          <CurriculumTab
            sections={sections}
            setSections={setSections}
            handleAddSection={handleAddSection}
            handleSectionTitleChange={handleSectionTitleChange}
            handleAddSectionItem={handleAddSectionItem}
            handleItemChange={handleItemChange}
            handleDeleteItem={handleDeleteItem}
            handleDeleteSection={handleDeleteSection}
            handleUploadPdf={handleUploadPdf}
          />
        </TabsContent>

        {/* Details Tab */}
        <TabsContent value="details" className="space-y-6">
          <DetailsTab
            whatYouWillLearn={whatYouWillLearn}
            requirements={requirements}
            targetAudience={targetAudience}
            handleListItemChange={handleListItemChange}
            handleAddListItem={handleAddListItem}
            handleRemoveListItem={handleRemoveListItem}
          />
        </TabsContent>

        {/* Pricing Tab */}
        <TabsContent value="pricing" className="space-y-6">
          <PricingTab
            courseDetails={courseDetails}
            handleCourseDetailChange={handleCourseDetailChange}
          />
        </TabsContent>

        {/* Settings Tab */}
        <TabsContent value="settings" className="space-y-6">
          <SettingsTab
            courseDetails={courseDetails}
            handleCourseDetailChange={handleCourseDetailChange}
          />
        </TabsContent>
      </Tabs>
    </AdminLayout>
  );
};

export default CreateCourse;
