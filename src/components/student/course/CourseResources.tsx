
import React from 'react';
import { Download, FileText } from 'lucide-react';
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from '@/components/ui/card';
import { ButtonCustom } from '@/components/ui/button-custom';

interface Module {
  title: string;
}

interface CourseResourcesProps {
  modules: Module[];
}

const CourseResources = ({ modules }: CourseResourcesProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Course Resources</CardTitle>
        <CardDescription>
          Downloadable resources to support your learning
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {modules.map((module, index) => (
          <div key={index} className="space-y-3">
            <h3 className="font-medium">{module.title}</h3>
            <div className="border rounded-lg divide-y">
              {[1, 2, 3].map((resource) => (
                <div key={resource} className="flex items-center justify-between p-4">
                  <div className="flex items-center">
                    <FileText className="h-5 w-5 text-blue-500 mr-3" />
                    <div>
                      <h4 className="font-medium">{module.title} - Resource {resource}</h4>
                      <p className="text-sm text-muted-foreground">PDF Document • 2.4MB</p>
                    </div>
                  </div>
                  <ButtonCustom variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </ButtonCustom>
                </div>
              ))}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default CourseResources;
