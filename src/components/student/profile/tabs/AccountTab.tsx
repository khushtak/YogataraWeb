
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ButtonCustom } from '@/components/ui/button-custom';
import { Separator } from '@/components/ui/separator';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';

interface AccountTabProps {
  userData: {
    email: string;
    timezone: string;
  };
}

const AccountTab = ({ userData }: AccountTabProps) => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Account Settings</CardTitle>
          <CardDescription>Manage your account details and preferences</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Email Address</h3>
            <div className="flex items-center justify-between">
              <p className="text-muted-foreground">{userData.email}</p>
              <ButtonCustom variant="outline" size="sm">Change Email</ButtonCustom>
            </div>
            <Separator />
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Password</h3>
            <div className="flex items-center justify-between">
              <p className="text-muted-foreground">Last changed 3 months ago</p>
              <ButtonCustom variant="outline" size="sm">Change Password</ButtonCustom>
            </div>
            <Separator />
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Two-Factor Authentication</h3>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground">Protect your account with 2FA</p>
                <p className="text-sm text-red-500">Not enabled</p>
              </div>
              <ButtonCustom variant="outline" size="sm">Setup 2FA</ButtonCustom>
            </div>
            <Separator />
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Account Deletion</h3>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground">Permanently delete your account and all data</p>
                <p className="text-sm text-red-500">This action cannot be undone</p>
              </div>
              <ButtonCustom variant="destructive" size="sm">Delete Account</ButtonCustom>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Learning Preferences</CardTitle>
          <CardDescription>Customize your learning experience</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="timezone">Timezone</Label>
              <select 
                id="timezone"
                className="w-full px-3 py-2 bg-background border border-border rounded-md"
                defaultValue={userData.timezone}
              >
                <option value="Pacific Time (PT)">Pacific Time (PT)</option>
                <option value="Mountain Time (MT)">Mountain Time (MT)</option>
                <option value="Central Time (CT)">Central Time (CT)</option>
                <option value="Eastern Time (ET)">Eastern Time (ET)</option>
              </select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="language">Preferred Language</Label>
              <select 
                id="language"
                className="w-full px-3 py-2 bg-background border border-border rounded-md"
              >
                <option value="en">English</option>
                <option value="es">Spanish</option>
                <option value="fr">French</option>
                <option value="de">German</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AccountTab;
