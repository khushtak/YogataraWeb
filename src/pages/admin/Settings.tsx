
import React, { useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Slider } from '@/components/ui/slider';
import { toast } from "sonner";
import { Checkbox } from '@/components/ui/checkbox';
import { 
  User, 
  Bell, 
  Shield, 
  Globe, 
  Mail, 
  CreditCard, 
  Lock, 
  FileText, 
  Terminal, 
  Percent,
  Upload,
  BookOpen
} from 'lucide-react';

const Settings = () => {
  // Profile settings state
  const [profileForm, setProfileForm] = useState({
    name: 'Admin User',
    email: 'admin@learnsync.com',
    bio: 'Administrator of LearnSync learning platform.'
  });

  // Notification settings state
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    pushNotifications: true,
    newEnrollment: true,
    courseCompletion: true,
    marketingEmails: false,
    weeklyDigest: true
  });

  // Security settings state
  const [securitySettings, setSecuritySettings] = useState({
    twoFactorAuth: false,
    passwordExpiration: 90,
    sessionTimeout: 30
  });

  // System settings state
  const [systemSettings, setSystemSettings] = useState({
    maintenanceMode: false,
    debugMode: false,
    cacheLifetime: 24,
    uploadSizeLimit: 10,
    apiThrottling: 60
  });

  // Course settings state
  const [courseSettings, setCourseSettings] = useState({
    autoApproveReviews: false,
    defaultCourseVisibility: 'public',
    allowInstructorCustomization: true,
    enableCourseRatings: true,
    enableProgressTracking: true
  });

  // Handle profile form update
  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Profile updated successfully");
  };

  // Handle notification settings update
  const handleNotificationUpdate = () => {
    toast.success("Notification preferences updated");
  };

  // Handle security settings update
  const handleSecurityUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Security settings updated");
  };

  // Handle system settings update
  const handleSystemUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("System settings updated");
  };

  // Handle course settings update
  const handleCourseSettingsUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Course settings updated");
  };

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold">Settings</h1>
      </div>

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="flex h-auto flex-wrap space-x-2 bg-muted p-1">
          <TabsTrigger value="profile" className="flex items-center gap-2">
            <User className="h-4 w-4" />
            <span>Profile</span>
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center gap-2">
            <Bell className="h-4 w-4" />
            <span>Notifications</span>
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            <span>Security</span>
          </TabsTrigger>
          <TabsTrigger value="system" className="flex items-center gap-2">
            <Terminal className="h-4 w-4" />
            <span>System</span>
          </TabsTrigger>
          <TabsTrigger value="courses" className="flex items-center gap-2">
            <BookOpen className="h-4 w-4" />
            <span>Courses</span>
          </TabsTrigger>
        </TabsList>

        {/* Profile Settings */}
        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle>Profile Settings</CardTitle>
              <CardDescription>Update your personal information and public profile.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleProfileUpdate} className="space-y-6">
                <div className="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4 items-start">
                  <div className="flex flex-col items-center space-y-2">
                    <Avatar className="h-24 w-24">
                      <AvatarImage src="https://randomuser.me/api/portraits/men/42.jpg" />
                      <AvatarFallback>AD</AvatarFallback>
                    </Avatar>
                    <Button variant="outline" size="sm" className="flex items-center gap-2">
                      <Upload className="h-4 w-4" />
                      <span>Upload</span>
                    </Button>
                  </div>
                  <div className="space-y-4 flex-1">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input 
                          id="name" 
                          value={profileForm.name} 
                          onChange={(e) => setProfileForm({...profileForm, name: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input 
                          id="email" 
                          type="email" 
                          value={profileForm.email} 
                          onChange={(e) => setProfileForm({...profileForm, email: e.target.value})}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="bio">Bio</Label>
                      <textarea 
                        id="bio" 
                        rows={4} 
                        className="w-full p-2 border border-border rounded-md"
                        value={profileForm.bio} 
                        onChange={(e) => setProfileForm({...profileForm, bio: e.target.value})}
                      />
                    </div>
                  </div>
                </div>
                <div className="flex justify-end">
                  <Button type="submit">Save Profile</Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notification Settings */}
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle className='text-lg font-medium'>Notification Preferences</CardTitle>
              <CardDescription>Control how you receive notifications and alerts from the platform.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="font-medium text-lg">Email Notifications</h4>
                    <p className="text-sm text-muted-foreground">Receive emails about important updates</p>
                  </div>
                  <Switch 
                    checked={notificationSettings.emailNotifications} 
                    onCheckedChange={(checked) => setNotificationSettings({...notificationSettings, emailNotifications: checked})}
                  />
                </div>
                <Separator />
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="font-medium text-lg">Push Notifications</h4>
                    <p className="text-sm text-muted-foreground">Get browser notifications for important events</p>
                  </div>
                  <Switch 
                    checked={notificationSettings.pushNotifications} 
                    onCheckedChange={(checked) => setNotificationSettings({...notificationSettings, pushNotifications: checked})}
                  />
                </div>
                <Separator />
                <h4 className="font-medium text-lg pt-2">Notification Types</h4>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="new-enrollment" 
                      checked={notificationSettings.newEnrollment}
                      onCheckedChange={(checked) => 
                        setNotificationSettings({
                          ...notificationSettings, 
                          newEnrollment: checked as boolean
                        })
                      }
                    />
                    <label htmlFor="new-enrollment" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                      New Course Enrollments
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="course-completion" 
                      checked={notificationSettings.courseCompletion}
                      onCheckedChange={(checked) => 
                        setNotificationSettings({
                          ...notificationSettings, 
                          courseCompletion: checked as boolean
                        })
                      }
                    />
                    <label htmlFor="course-completion" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                      Course Completions
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="marketing-emails" 
                      checked={notificationSettings.marketingEmails}
                      onCheckedChange={(checked) => 
                        setNotificationSettings({
                          ...notificationSettings, 
                          marketingEmails: checked as boolean
                        })
                      }
                    />
                    <label htmlFor="marketing-emails" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                      Marketing and Promotional Emails
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="weekly-digest" 
                      checked={notificationSettings.weeklyDigest}
                      onCheckedChange={(checked) => 
                        setNotificationSettings({
                          ...notificationSettings, 
                          weeklyDigest: checked as boolean
                        })
                      }
                    />
                    <label htmlFor="weekly-digest" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                      Weekly Platform Digest
                    </label>
                  </div>
                </div>
              </div>
              <div className="flex justify-end">
                <Button onClick={handleNotificationUpdate}>Save Preferences</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security Settings */}
        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle className='text-xl'>Security Settings</CardTitle>
              <CardDescription>Manage your account security settings and password.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSecurityUpdate} className="space-y-6">
                <div className="space-y-4">
                  <h4 className="font-medium text-lg">Two-Factor Authentication</h4>
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm text-muted-foreground">Add an extra layer of security to your account</p>
                    </div>
                    <Switch 
                      checked={securitySettings.twoFactorAuth} 
                      onCheckedChange={(checked) => setSecuritySettings({...securitySettings, twoFactorAuth: checked})}
                    />
                  </div>
                </div>
                <Separator />
                <div className="space-y-4">
                  <h4 className="font-medium text-lg">Password Settings</h4>
                  <div className="space-y-2">
                    <Label htmlFor="current-password">Current Password</Label>
                    <Input id="current-password" type="password" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="new-password">New Password</Label>
                    <Input id="new-password" type="password" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">Confirm New Password</Label>
                    <Input id="confirm-password" type="password" />
                  </div>
                </div>
                <Separator />
                <div className="space-y-4">
                  <h4 className="font-medium text-lg">Password Expiration</h4>
                  <div className="space-y-2">
                    <Label htmlFor="password-expiration">Days until password expires ({securitySettings.passwordExpiration} days)</Label>
                    <Slider 
                      id="password-expiration"
                      min={30} 
                      max={180} 
                      step={30} 
                      value={[securitySettings.passwordExpiration]}
                      onValueChange={(value) => setSecuritySettings({...securitySettings, passwordExpiration: value[0]})}
                    />
                  </div>
                </div>
                <Separator />
                <div className="space-y-4">
                  <h4 className="font-medium text-lg">Session Timeout</h4>
                  <div className="space-y-2">
                    <Label htmlFor="session-timeout">Minutes until session timeout ({securitySettings.sessionTimeout} minutes)</Label>
                    <Slider 
                      id="session-timeout"
                      min={5} 
                      max={60} 
                      step={5} 
                      value={[securitySettings.sessionTimeout]}
                      onValueChange={(value) => setSecuritySettings({...securitySettings, sessionTimeout: value[0]})}
                    />
                  </div>
                </div>
                <div className="flex justify-end">
                  <Button type="submit">Save Security Settings</Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        {/* System Settings */}
        <TabsContent value="system">
          <Card>
            <CardHeader>
              <CardTitle className='text-xl'>System Settings</CardTitle>
              <CardDescription>Configure technical aspects of the platform.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSystemUpdate} className="space-y-6">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="font-medium text-lg">Maintenance Mode</h4>
                      <p className="text-sm text-muted-foreground">When enabled, only admins can access the site</p>
                    </div>
                    <Switch 
                      checked={systemSettings.maintenanceMode} 
                      onCheckedChange={(checked) => setSystemSettings({...systemSettings, maintenanceMode: checked})}
                    />
                  </div>
                  <Separator />
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="font-medium text-lg">Debug Mode</h4>
                      <p className="text-sm text-muted-foreground">Display detailed error messages and logs</p>
                    </div>
                    <Switch 
                      checked={systemSettings.debugMode} 
                      onCheckedChange={(checked) => setSystemSettings({...systemSettings, debugMode: checked})}
                    />
                  </div>
                  <Separator />
                  <div className="space-y-2">
                    <Label htmlFor="cache-lifetime">Cache Lifetime (hours)</Label>
                    <div className="flex items-center gap-4">
                      <Slider 
                        id="cache-lifetime"
                        className="flex-grow" 
                        min={1} 
                        max={48} 
                        step={1} 
                        value={[systemSettings.cacheLifetime]}
                        onValueChange={(value) => setSystemSettings({...systemSettings, cacheLifetime: value[0]})}
                      />
                      <span className="font-medium w-8 text-center">{systemSettings.cacheLifetime}</span>
                    </div>
                  </div>
                  <Separator />
                  <div className="space-y-2">
                    <Label htmlFor="upload-size">Max Upload Size (MB)</Label>
                    <div className="flex items-center gap-4">
                      <Slider 
                        id="upload-size"
                        className="flex-grow" 
                        min={2} 
                        max={100} 
                        step={1} 
                        value={[systemSettings.uploadSizeLimit]}
                        onValueChange={(value) => setSystemSettings({...systemSettings, uploadSizeLimit: value[0]})}
                      />
                      <span className="font-medium w-8 text-center">{systemSettings.uploadSizeLimit}</span>
                    </div>
                  </div>
                  <Separator />
                  <div className="space-y-2">
                    <Label htmlFor="api-throttling">API Rate Limit (requests per minute)</Label>
                    <div className="flex items-center gap-4">
                      <Slider 
                        id="api-throttling"
                        className="flex-grow" 
                        min={10} 
                        max={200} 
                        step={10} 
                        value={[systemSettings.apiThrottling]}
                        onValueChange={(value) => setSystemSettings({...systemSettings, apiThrottling: value[0]})}
                      />
                      <span className="font-medium w-8 text-center">{systemSettings.apiThrottling}</span>
                    </div>
                  </div>
                </div>
                <div className="flex justify-end">
                  <Button type="submit">Save System Settings</Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Course Settings */}
        <TabsContent value="courses">
          <Card>
            <CardHeader>
              <CardTitle className='text-xl'>Course Settings</CardTitle>
              <CardDescription>Configure course-related behaviors and defaults.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleCourseSettingsUpdate} className="space-y-6">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="font-medium text-lg">Auto-approve Reviews</h4>
                      <p className="text-sm text-muted-foreground">When enabled, course reviews are published without moderation</p>
                    </div>
                    <Switch 
                      checked={courseSettings.autoApproveReviews} 
                      onCheckedChange={(checked) => setCourseSettings({...courseSettings, autoApproveReviews: checked})}
                    />
                  </div>
                  <Separator />
                  <div className="space-y-2">
                    <Label htmlFor="default-visibility">Default Course Visibility</Label>
                    <select 
                      id="default-visibility" 
                      className="w-full p-2 border border-border rounded-md bg-background"
                      value={courseSettings.defaultCourseVisibility}
                      onChange={(e) => setCourseSettings({...courseSettings, defaultCourseVisibility: e.target.value})}
                    >
                      <option value="public">Public</option>
                      <option value="private">Private</option>
                      <option value="draft">Draft</option>
                    </select>
                  </div>
                  <Separator />
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="font-medium text-lg">Allow Instructor Customization</h4>
                      <p className="text-sm text-muted-foreground">Let instructors customize their course appearance</p>
                    </div>
                    <Switch 
                      checked={courseSettings.allowInstructorCustomization} 
                      onCheckedChange={(checked) => setCourseSettings({...courseSettings, allowInstructorCustomization: checked})}
                    />
                  </div>
                  <Separator />
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="font-medium text-lg">Enable Course Ratings</h4>
                      <p className="text-sm text-muted-foreground">Allow students to rate and review courses</p>
                    </div>
                    <Switch 
                      checked={courseSettings.enableCourseRatings} 
                      onCheckedChange={(checked) => setCourseSettings({...courseSettings, enableCourseRatings: checked})}
                    />
                  </div>
                  <Separator />
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="font-medium text-lg">Enable Progress Tracking</h4>
                      <p className="text-sm text-muted-foreground">Track and display student progress through courses</p>
                    </div>
                    <Switch 
                      checked={courseSettings.enableProgressTracking} 
                      onCheckedChange={(checked) => setCourseSettings({...courseSettings, enableProgressTracking: checked})}
                    />
                  </div>
                </div>
                <div className="flex justify-end">
                  <Button type="submit">Save Course Settings</Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </AdminLayout>
  );
};

export default Settings;
