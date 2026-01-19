
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ButtonCustom } from '@/components/ui/button-custom';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Shield, Key, Bell, Download } from 'lucide-react';

const PrivacyTab = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className='text-xl'>Privacy & Security</CardTitle>
        <CardDescription>Manage your privacy settings and security preferences</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <div className="flex items-center">
                <h4 className="font-medium text-lg">Profile Visibility</h4>
                <Badge variant="outline" className="ml-2 bg-green-500/10 text-green-500 border-green-500/20">Public</Badge>
              </div>
              <p className="text-sm text-muted-foreground">Control who can see your profile information</p>
            </div>
            <ButtonCustom variant="outline" size="sm">
              Change
            </ButtonCustom>
          </div>
          <Separator />
          
          <div className="space-y-2">
            <h4 className="font-medium text-lg">Security Options</h4>
            <div className="grid gap-4 md:grid-cols-3">
              <div className="p-4 border border-border rounded-lg space-y-2">
                <div className="flex items-center text-amber-500">
                  <Shield className="h-5 w-5 mr-2" />
                  <h5 className="font-medium">2FA</h5>
                </div>
                <p className="text-sm text-muted-foreground">Two-factor authentication</p>
                <Badge variant="outline" className="bg-red-500/10 text-red-500 border-red-500/20">Not Enabled</Badge>
              </div>
              
              <div className="p-4 border border-border rounded-lg space-y-2">
                <div className="flex items-center text-green-500">
                  <Key className="h-5 w-5 mr-2" />
                  <h5 className="font-medium">Password</h5>
                </div>
                <p className="text-sm text-muted-foreground">Account password</p>
                <Badge variant="outline" className="bg-amber-500/10 text-amber-500 border-amber-500/20">3 Months Old</Badge>
              </div>
              
              <div className="p-4 border border-border rounded-lg space-y-2">
                <div className="flex items-center text-blue-500">
                  <Bell className="h-5 w-5 mr-2" />
                  <h5 className="font-medium">Login Alerts</h5>
                </div>
                <p className="text-sm text-muted-foreground">New login notifications</p>
                <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20">Enabled</Badge>
              </div>
            </div>
          </div>
          <Separator />
          
          <div className="space-y-3">
            <h4 className="font-medium text-lg">Data & Privacy</h4>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <h5 className="text-sm font-medium">Learning Data Collection</h5>
                <p className="text-sm text-muted-foreground">Allow collection of data to personalize your learning experience</p>
              </div>
              <div className="flex items-center space-x-2">
                <label className="cursor-pointer flex items-center">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="relative w-11 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                </label>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <h5 className="text-sm font-medium">Share Progress with Instructors</h5>
                <p className="text-sm text-muted-foreground">Allow instructors to see your progress in their courses</p>
              </div>
              <div className="flex items-center space-x-2">
                <label className="cursor-pointer flex items-center">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="relative w-11 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                </label>
              </div>
            </div>
          </div>
          <Separator />
          
          <div>
            <ButtonCustom variant="outline" className="flex items-center text-muted-foreground">
              <Download className="h-4 w-4 mr-2" />
              Download My Data
            </ButtonCustom>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PrivacyTab;
