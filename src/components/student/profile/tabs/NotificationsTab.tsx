
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ButtonCustom } from '@/components/ui/button-custom';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';

const NotificationsTab = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className='text-lg'>Notification Settings</CardTitle>
        <CardDescription>Control how and when you receive notifications</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <h4 className="font-medium text-lg">Course Updates</h4>
              <p className="text-sm text-muted-foreground">Notifications about new content in your enrolled courses</p>
            </div>
            <Switch defaultChecked id="course-updates" />
          </div>
          <Separator />
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <h4 className="font-medium text-lg">Assignment Reminders</h4>
              <p className="text-sm text-muted-foreground">Notifications about upcoming assignments and deadlines</p>
            </div>
            <Switch defaultChecked id="assignment-reminders" />
          </div>
          <Separator />
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <h4 className="font-medium text-lg">Feedback & Grades</h4>
              <p className="text-sm text-muted-foreground">Notifications when you receive feedback or grades</p>
            </div>
            <Switch defaultChecked id="feedback-grades" />
          </div>
          <Separator />
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <h4 className="font-medium text-lg">Promotional Emails</h4>
              <p className="text-sm text-muted-foreground">Announcements about new courses and promotions</p>
            </div>
            <Switch id="promotional-emails" />
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <ButtonCustom className="ml-auto">Save Preferences</ButtonCustom>
      </CardFooter>
    </Card>
  );
};

export default NotificationsTab;
