import React, { useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import {
  User,
  Bell,
  Shield,
  Terminal,
  BookOpen,
  Upload,
} from "lucide-react";

const Settings = () => {
  const [profileForm, setProfileForm] = useState({
    name: "Admin User",
    email: "admin@learnsync.com",
    bio: "Administrator of LearnSync learning platform.",
  });

  const handleSave = (msg: string) => toast.success(msg);

  return (
    <AdminLayout>
      <h1 className="text-2xl font-bold mb-6 text-foreground">Settings</h1>

      <Tabs defaultValue="profile" className="space-y-6">
        {/* ================= TABS ================= */}
        <TabsList
          className="
            bg-muted/40 backdrop-blur
            border border-border
            rounded-lg p-1 flex gap-1
          "
        >
          {[
            { v: "profile", i: User, t: "Profile" },
            { v: "notifications", i: Bell, t: "Notifications" },
            { v: "security", i: Shield, t: "Security" },
            { v: "system", i: Terminal, t: "System" },
            { v: "courses", i: BookOpen, t: "Courses" },
          ].map(({ v, i: Icon, t }) => (
            <TabsTrigger
              key={v}
              value={v}
              className="
                data-[state=active]:bg-background
                data-[state=active]:shadow
                flex gap-2 px-4 py-2
              "
            >
              <Icon className="h-4 w-4" /> {t}
            </TabsTrigger>
          ))}
        </TabsList>

        {/* ================= PROFILE ================= */}
        <TabsContent value="profile">
          <Card className="bg-background/60 backdrop-blur border-border">
            <CardHeader>
              <CardTitle>Profile Settings</CardTitle>
              <CardDescription>
                Update your personal information.
              </CardDescription>
            </CardHeader>

            <CardContent>
              <div className="flex gap-6 flex-col md:flex-row">
                <div className="flex flex-col items-center gap-3">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src="https://randomuser.me/api/portraits/men/42.jpg" />
                    <AvatarFallback>AD</AvatarFallback>
                  </Avatar>
                  <Button variant="outline" size="sm">
                    <Upload className="h-4 w-4 mr-2" /> Upload
                  </Button>
                </div>

                <div className="flex-1 space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label>Full Name</Label>
                      <Input
                        value={profileForm.name}
                        onChange={(e) =>
                          setProfileForm({ ...profileForm, name: e.target.value })
                        }
                      />
                    </div>
                    <div>
                      <Label>Email</Label>
                      <Input
                        type="email"
                        value={profileForm.email}
                        onChange={(e) =>
                          setProfileForm({
                            ...profileForm,
                            email: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>

                  {/* 🔥 FIXED TEXTAREA */}
                  <div>
                    <Label>Bio</Label>
                    <textarea
                      rows={4}
                      value={profileForm.bio}
                      onChange={(e) =>
                        setProfileForm({ ...profileForm, bio: e.target.value })
                      }
                      className="
                        w-full rounded-md p-3
                        bg-background text-foreground
                        border border-border
                        focus:outline-none focus:ring-2 focus:ring-primary
                      "
                    />
                  </div>

                  <div className="flex justify-end">
                    <Button onClick={() => handleSave("Profile updated")}>
                      Save Profile
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ================= NOTIFICATIONS ================= */}
        <TabsContent value="notifications">
          <Card className="bg-background/60 backdrop-blur border-border">
            <CardHeader>
              <CardTitle>Notifications</CardTitle>
              <CardDescription>
                Manage notification preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                "Email Notifications",
                "Push Notifications",
                "Weekly Digest",
              ].map((t) => (
                <div key={t} className="flex justify-between items-center">
                  <span>{t}</span>
                  <Switch defaultChecked />
                </div>
              ))}
              <Button onClick={() => handleSave("Notifications updated")}>
                Save Preferences
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ================= SECURITY ================= */}
        <TabsContent value="security">
          <Card className="bg-background/60 backdrop-blur border-border">
            <CardHeader>
              <CardTitle>Security</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex justify-between">
                <span>Two Factor Authentication</span>
                <Switch />
              </div>
              <Separator />
              <div>
                <Label>Password Expiry (days)</Label>
                <Slider defaultValue={[90]} max={180} step={30} />
              </div>
              <Button onClick={() => handleSave("Security updated")}>
                Save Security
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ================= SYSTEM ================= */}
        <TabsContent value="system">
          <Card className="bg-background/60 backdrop-blur border-border">
            <CardHeader>
              <CardTitle>System</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span>Maintenance Mode</span>
                <Switch />
              </div>
              <Button onClick={() => handleSave("System updated")}>
                Save System
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ================= COURSES ================= */}
        <TabsContent value="courses">
          <Card className="bg-background/60 backdrop-blur border-border">
            <CardHeader>
              <CardTitle>Courses</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span>Enable Ratings</span>
                <Switch defaultChecked />
              </div>
              <Button onClick={() => handleSave("Course settings updated")}>
                Save Courses
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </AdminLayout>
  );
};

export default Settings;
