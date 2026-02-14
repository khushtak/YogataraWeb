import React, { useEffect, useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Search, Send, X, Filter, Copy, BellRing, CheckCircle, Users, MailPlus, MessageSquare } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from '@/components/ui/use-toast';
import { format } from 'date-fns';
import baseUrl from '@/config/Config';
import { RiDeleteBin5Line } from "react-icons/ri";
interface Notification {
  id: string;
  title: string;
  message: string;
  recipients: string;
  recipientCount: number;
  date: Date;
  status: 'sent' | 'scheduled' | 'draft';
  type: 'course' | 'announcement' | 'reminder';
}

const ManageNotifications = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isCreateNotificationOpen, setIsCreateNotificationOpen] = useState(false);

  const [notifications, setNotifications] = useState([]);

  const [notificationTitle, setNotificationTitle] = useState('');
  const [notificationMessage, setNotificationMessage] = useState('');
  const [notificationRecipients, setNotificationRecipients] = useState('');
  const [notificationStatus, setNotificationStatus] = useState('sent');
  const [notificationType, setNotificationType] = useState('course');

  useEffect(() => {
    getAllNotifications();
  }, [isCreateNotificationOpen])


  const getAllNotifications = async () => {
    try {
      const response = await fetch(`${baseUrl}/get-all-notifications`);
      if (!response.ok) {
        throw new Error("Failed to fetch notifications");
      }
      const data = await response.json();

      // Formatting the data
      const formattedData = data.map((item, index) => ({
        id: item._id,
        title: item.title,
        message: item.message,
        recipients: item.recipients,
        recipientCount: 2845, // Assuming a static count, replace with actual if available
        date: new Date(item.createdAt), // Convert to Date object
        status: item.status,
        type: item.type,
      }));

      // console.log(formattedData);
      setNotifications(formattedData);
      return formattedData;
    } catch (error) {
      console.error("Error fetching notifications:", error);
      return null;
    }
  };



  const filteredNotifications = notifications.filter(
    notification => notification.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      notification.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
      notification.recipients.toLowerCase().includes(searchTerm.toLowerCase())
  );

 const handleCreateNotification = async () => {
  try {

    /* 2️⃣ Get all FCM tokens */
    const tokenRes = await fetch(`${baseUrl}/get-all-fcm-tokens`);
    console.log('dada0',tokenRes);
    
    const tokens: string[] = await tokenRes.json();

    if (!tokens || tokens.length === 0) {
      toast({
        title: "No users",
        description: "No FCM tokens found",
      });
      return;
    }

    /* 3️⃣ Send push notification */
    await fetch(`${baseUrl}/send-push-notification`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        tokens,
        title: notificationTitle,
        body: notificationMessage,
      }),
    });

    toast({
      title: "Notification Sent 🔔",
      description: "The notification was sent successfully.",
    });

    setIsCreateNotificationOpen(false);
    getAllNotifications();

  } catch (err) {
    toast({
      variant: "destructive",
      title: "Error",
      description: "Failed to send notification",
    });
  }
};


  const handleDeleteNotification = async (id: string) => {
    try {
      const response = await fetch(`${baseUrl}/delete-notification/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete notification");
      }

      toast({
        title: "Notification deleted",
        description: "The notification has been successfully deleted.",
      });

      // Optionally, update the UI by removing the deleted notification
      setNotifications((prevNotifications) =>
        prevNotifications.filter((notification) => notification.id !== id)
      );
    } catch (error) {
      console.error("Error deleting notification:", error);
      toast({
        title: "Error",
        description: "Failed to delete notification.",
        variant: "destructive",
      });
    }
  };



  const getNotificationTypeIcon = (type: string) => {
    console.log('dsada',type);
    
    switch (type) {
      case 'Announcement':
        return <BellRing className="h-4 w-4 text-blue-500" />;
      case 'Reminder':
        return <CheckCircle className="h-4 w-4 text-amber-500" />;
      case 'Course Update':
        return <MessageSquare className="h-4 w-4 text-green-500" />;
      default:
        return <BellRing className="h-4 w-4" />;
    }
  };

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold">Manage Notifications</h1>
        <Dialog open={isCreateNotificationOpen} onOpenChange={setIsCreateNotificationOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center">
              <MailPlus className="h-4 w-4 mr-2" />
              Create Notification
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Create Notification</DialogTitle>
              <DialogDescription>
                Create a new notification to send to your students.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-4">
                <div>
                  <Label htmlFor="notification-title">Notification Title</Label>
                  <Input
                    id="notification-title"
                    placeholder="Enter notification title"
                    value={notificationTitle}
                    onChange={(e) => setNotificationTitle(e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="notification-message">Message</Label>
                  <Textarea
                    id="notification-message"
                    placeholder="Enter your message here"
                    rows={4}
                    value={notificationMessage}
                    onChange={(e) => setNotificationMessage(e.target.value)}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
               
                  <div>
                    <Label htmlFor="notification-recipients">Recipients</Label>
                    <Select onValueChange={setNotificationRecipients}>
                      <SelectTrigger id="notification-recipients">
                        <SelectValue placeholder="Select recipients" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="All">All Students</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsCreateNotificationOpen(false)}>Cancel</Button>
              <Button onClick={handleCreateNotification}>Create Notification</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="bg-card rounded-xl border border-border">
        {/* <div className="p-4 border-b border-border">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="relative w-full max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search notifications..." 
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" className="h-10">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
            </div>
          </div>
        </div> */}

        <Tabs defaultValue="all" className="w-full">
          {/* <div className="px-4 pt-2 border-b border-border">
            <TabsList className="mb-0">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="sent">Sent</TabsTrigger>
              <TabsTrigger value="scheduled">Scheduled</TabsTrigger>
              <TabsTrigger value="draft">Drafts</TabsTrigger>
            </TabsList>
          </div> */}

          <TabsContent value="all" className="pt-0 pb-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Type</TableHead>
                  <TableHead>Title & Message</TableHead>
                  <TableHead>Recipients</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="w-[100px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredNotifications.map((notification) => (
                  <TableRow key={notification.id}>
                    <TableCell>
                      <div className="flex items-center">
                        {getNotificationTypeIcon(notification.type)}
                        <span className="ml-2 text-xs capitalize">{notification.type}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{notification.title}</div>
                        <div className="text-sm text-muted-foreground truncate max-w-xs">
                          {notification.message}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <div className="text-sm">{notification.recipients} students</div>
                          {/* <div className="text-xs text-muted-foreground">
                            {notification.recipientCount} recipients
                          </div> */}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{format(notification.date, 'MMM dd, yyyy')}</TableCell>
                    <TableCell>
                      <Badge variant={
                        notification.status === 'Sent' ? 'default' :
                          notification.status === 'scheduled' ? 'secondary' : 'outline'
                      }>
                        {notification.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        {notification.status === 'Draft' && (
                          <Button variant="ghost" size="icon" title="Send now">
                            <Send className="h-4 w-4 text-muted-foreground" />
                          </Button>
                        )}
                       
                        <Button variant="ghost" size="icon" title="Delete" onClick={() => handleDeleteNotification(notification.id)}>
                          <RiDeleteBin5Line className="h-6 w-6 text-muted-foreground text-red-800" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TabsContent>

          {/* Other tab contents would follow similar pattern */}
        </Tabs>
      </div>
    </AdminLayout>
  );
};

export default ManageNotifications;
