
import React from 'react';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import { FileText, Download } from 'lucide-react';
import { ButtonCustom } from '@/components/ui/button-custom';

interface ResourceType {
  name: string;
  type: string;
}

interface AssignmentInstructionsProps {
  assignment: {
    description: string;
    instructions: string;
    resources?: ResourceType[];
  };
}

const AssignmentInstructions = ({ assignment }: AssignmentInstructionsProps) => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Assignment Description</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-6">{assignment.description}</p>

          <div className="space-y-4">
            <h3 className="text-muted-foreground">Instructions</h3>
            <h3 className="text-lg font-medium">✅ General Guidelines</h3>
            <p>Read each question carefully before selecting your answer.</p>

            <p>Each question has one correct answer from the four options (A, B, C, D).</p>

            <p>Do not rush. Take your time to think before answering.</p>

            <p>You are encouraged to use your class notes or astrology books if this is an open-book session.</p>

            <p>If you're unsure about an answer, make your best guess — there’s no negative marking.</p>

            <p>This quiz is meant to be a learning experience, not just a test — so enjoy the process!</p>
            <h3 className="text-lg font-medium">🎯 Scoring & Feedback</h3>
            <p>
              You will receive your score and explanations after the quiz (if enabled by your teacher).
            </p>

            <p>Try to understand why an answer is right or wrong to deepen your learning.</p>
          </div>
          {/* <div className="justify-end flex">
            <ButtonCustom>Start</ButtonCustom>
          </div> */}

        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Resources</CardTitle>
          <p className="text-sm text-muted-foreground">Materials to help you complete this assignment</p>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {assignment.resources?.map((resource, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center">
                  <FileText className="h-5 w-5 text-blue-500 mr-3" />
                  <div>
                    <h4 className="font-medium">{resource.name}</h4>
                    <p className="text-xs text-muted-foreground">{resource.type} document</p>
                  </div>
                </div>
                <ButtonCustom variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </ButtonCustom>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AssignmentInstructions;
