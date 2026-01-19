import React, { useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Search, MailPlus, Filter, MoreHorizontal, Eye, UserCog, Send, Clock } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/components/ui/use-toast';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface Student {
  id: string;
  name: string;
  email: string;
  avatar: string;
  enrollmentDate: string;
  courses: {
    id: string;
    title: string;
    progress: number;
    lastActive: string;
  }[];
  status: 'active' | 'inactive';
}

const ManageStudents = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [selectedStudents, setSelectedStudents] = useState<string[]>([]);
  
  // Sample student data
  const sampleStudents: Student[] = [
    {
      id: '1',
      name: 'Priya Shah',
      email: 'priya.shah@example.com',
      avatar: 'https://randomuser.me/api/portraits/women/2.jpg',
      enrollmentDate: '2023-10-15',
      courses: [
        {
          id: '1',
          title: 'Vedic Astrology: Complete Chart Analysis',
          progress: 65,
          lastActive: '2 days ago'
        }
      ],
      status: 'active'
    },
    {
      id: '2',
      name: 'Rahul Verma',
      email: 'rahul.v@example.com',
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
      enrollmentDate: '2023-09-22',
      courses: [
        {
          id: '1',
          title: 'Vedic Astrology: Complete Chart Analysis',
          progress: 42,
          lastActive: '5 days ago'
        },
        {
          id: '3',
          title: 'Introduction to Tarot Reading',
          progress: 78,
          lastActive: '1 day ago'
        }
      ],
      status: 'active'
    },
    {
      id: '3',
      name: 'Ananya Patel',
      email: 'ananya.p@example.com',
      avatar: 'https://randomuser.me/api/portraits/women/58.jpg',
      enrollmentDate: '2023-11-05',
      courses: [
        {
          id: '2',
          title: 'Numerology: Unlock the Power of Numbers',
          progress: 92,
          lastActive: '3 hours ago'
        }
      ],
      status: 'active'
    },
    {
      id: '4',
      name: 'Vikram Singh',
      email: 'vikram.s@example.com',
      avatar: 'https://randomuser.me/api/portraits/men/44.jpg',
      enrollmentDate: '2023-08-18',
      courses: [
        {
          id: '1',
          title: 'Vedic Astrology: Complete Chart Analysis',
          progress: 100,
          lastActive: '2 weeks ago'
        },
        {
          id: '4',
          title: 'Vaastu Shastra for Modern Living',
          progress: 35,
          lastActive: '4 days ago'
        }
      ],
      status: 'inactive'
    },
    {
      id: '5',
      name: 'Meera Desai',
      email: 'meera.d@example.com',
      avatar: 'https://randomuser.me/api/portraits/women/65.jpg',
      enrollmentDate: '2023-12-01',
      courses: [
        {
          id: '3',
          title: 'Introduction to Tarot Reading',
          progress: 12,
          lastActive: '1 day ago'
        }
      ],
      status: 'active'
    }
  ];
  
  const filteredStudents = sampleStudents.filter(
    student => student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
              student.email.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const toggleStudentSelection = (studentId: string) => {
    if (selectedStudents.includes(studentId)) {
      setSelectedStudents(selectedStudents.filter(id => id !== studentId));
    } else {
      setSelectedStudents([...selectedStudents, studentId]);
    }
  };
  
  const selectAllStudents = () => {
    if (selectedStudents.length === filteredStudents.length) {
      setSelectedStudents([]);
    } else {
      setSelectedStudents(filteredStudents.map(student => student.id));
    }
  };
  
  const handleSendNotification = () => {
    toast({
      title: "Notification sent",
      description: `Sent to ${selectedStudents.length} student(s).`
    });
    setIsNotificationOpen(false);
    setSelectedStudents([]);
  };
  
  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold">Manage Students</h1>
        <Dialog open={isNotificationOpen} onOpenChange={setIsNotificationOpen}>
          <DialogTrigger asChild>
            <Button 
              className="flex items-center"
              disabled={selectedStudents.length === 0}
            >
              <MailPlus className="h-4 w-4 mr-2" />
              Send Notification
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Send Notification</DialogTitle>
              <DialogDescription>
                Send a notification to {selectedStudents.length} selected student(s).
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div>
                <Label htmlFor="notification-subject">Subject</Label>
                <Input id="notification-subject" placeholder="Enter notification subject" />
              </div>
              <div>
                <Label htmlFor="notification-message">Message</Label>
                <Textarea 
                  id="notification-message" 
                  placeholder="Enter your message here"
                  rows={5}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsNotificationOpen(false)}>Cancel</Button>
              <Button onClick={handleSendNotification}>Send</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      
      <div className="bg-card rounded-xl border border-border">
        <div className="p-4 border-b border-border">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="relative w-full max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search students..." 
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
        </div>
        
        <Tabs defaultValue="all" className="w-full">
          <div className="px-4 pt-2 border-b border-border">
            <TabsList className="mb-0">
              <TabsTrigger value="all">All Students</TabsTrigger>
              <TabsTrigger value="active">Active</TabsTrigger>
              <TabsTrigger value="inactive">Inactive</TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="all" className="pt-0 pb-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[40px]">
                    <input 
                      type="checkbox" 
                      className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                      checked={selectedStudents.length === filteredStudents.length && filteredStudents.length > 0}
                      onChange={selectAllStudents}
                    />
                  </TableHead>
                  <TableHead>Student</TableHead>
                  <TableHead>Course Enrollment</TableHead>
                  <TableHead>Progress</TableHead>
                  <TableHead>Last Active</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="w-[80px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredStudents.map((student) => (
                  <TableRow key={student.id}>
                    <TableCell>
                      <input 
                        type="checkbox" 
                        className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                        checked={selectedStudents.includes(student.id)}
                        onChange={() => toggleStudentSelection(student.id)}
                      />
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage src={student.avatar} />
                          <AvatarFallback>{student.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{student.name}</div>
                          <div className="text-sm text-muted-foreground">{student.email}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        {student.courses.map((course, index) => (
                          <div key={index} className="text-sm">
                            {course.title}
                          </div>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-3">
                        {student.courses.map((course, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <Progress value={course.progress} className="h-2 w-24" />
                            <span className="text-xs text-muted-foreground">{course.progress}%</span>
                          </div>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        {student.courses.map((course, index) => (
                          <div key={index} className="flex items-center text-sm">
                            <Clock className="h-3 w-3 mr-1 text-muted-foreground" />
                            {course.lastActive}
                          </div>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={student.status === 'active' ? 'default' : 'secondary'}>
                        {student.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem className="flex items-center">
                            <Eye className="h-4 w-4 mr-2" />
                            <span>View Details</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem className="flex items-center">
                            <UserCog className="h-4 w-4 mr-2" />
                            <span>Edit Profile</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem className="flex items-center">
                            <Send className="h-4 w-4 mr-2" />
                            <span>Send Message</span>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TabsContent>
          
          <TabsContent value="active" className="pt-0 pb-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[40px]">
                    <input 
                      type="checkbox" 
                      className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                      checked={selectedStudents.length === filteredStudents.filter(s => s.status === 'active').length && filteredStudents.filter(s => s.status === 'active').length > 0}
                      onChange={selectAllStudents}
                    />
                  </TableHead>
                  <TableHead>Student</TableHead>
                  <TableHead>Course Enrollment</TableHead>
                  <TableHead>Progress</TableHead>
                  <TableHead>Last Active</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="w-[80px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredStudents.filter(s => s.status === 'active').map((student) => (
                  <TableRow key={student.id}>
                    <TableCell>
                      <input 
                        type="checkbox" 
                        className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                        checked={selectedStudents.includes(student.id)}
                        onChange={() => toggleStudentSelection(student.id)}
                      />
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage src={student.avatar} />
                          <AvatarFallback>{student.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{student.name}</div>
                          <div className="text-sm text-muted-foreground">{student.email}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        {student.courses.map((course, index) => (
                          <div key={index} className="text-sm">
                            {course.title}
                          </div>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-3">
                        {student.courses.map((course, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <Progress value={course.progress} className="h-2 w-24" />
                            <span className="text-xs text-muted-foreground">{course.progress}%</span>
                          </div>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        {student.courses.map((course, index) => (
                          <div key={index} className="flex items-center text-sm">
                            <Clock className="h-3 w-3 mr-1 text-muted-foreground" />
                            {course.lastActive}
                          </div>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={student.status === 'active' ? 'default' : 'secondary'}>
                        {student.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem className="flex items-center">
                            <Eye className="h-4 w-4 mr-2" />
                            <span>View Details</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem className="flex items-center">
                            <UserCog className="h-4 w-4 mr-2" />
                            <span>Edit Profile</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem className="flex items-center">
                            <Send className="h-4 w-4 mr-2" />
                            <span>Send Message</span>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TabsContent>

          <TabsContent value="inactive" className="pt-0 pb-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[40px]">
                    <input 
                      type="checkbox" 
                      className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                      checked={selectedStudents.length === filteredStudents.filter(s => s.status === 'inactive').length && filteredStudents.filter(s => s.status === 'inactive').length > 0}
                      onChange={selectAllStudents}
                    />
                  </TableHead>
                  <TableHead>Student</TableHead>
                  <TableHead>Course Enrollment</TableHead>
                  <TableHead>Progress</TableHead>
                  <TableHead>Last Active</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="w-[80px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredStudents.filter(s => s.status === 'inactive').map((student) => (
                  <TableRow key={student.id}>
                    <TableCell>
                      <input 
                        type="checkbox" 
                        className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                        checked={selectedStudents.includes(student.id)}
                        onChange={() => toggleStudentSelection(student.id)}
                      />
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage src={student.avatar} />
                          <AvatarFallback>{student.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{student.name}</div>
                          <div className="text-sm text-muted-foreground">{student.email}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        {student.courses.map((course, index) => (
                          <div key={index} className="text-sm">
                            {course.title}
                          </div>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-3">
                        {student.courses.map((course, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <Progress value={course.progress} className="h-2 w-24" />
                            <span className="text-xs text-muted-foreground">{course.progress}%</span>
                          </div>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        {student.courses.map((course, index) => (
                          <div key={index} className="flex items-center text-sm">
                            <Clock className="h-3 w-3 mr-1 text-muted-foreground" />
                            {course.lastActive}
                          </div>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={student.status === 'active' ? 'default' : 'secondary'}>
                        {student.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem className="flex items-center">
                            <Eye className="h-4 w-4 mr-2" />
                            <span>View Details</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem className="flex items-center">
                            <UserCog className="h-4 w-4 mr-2" />
                            <span>Edit Profile</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem className="flex items-center">
                            <Send className="h-4 w-4 mr-2" />
                            <span>Send Message</span>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
};

export default ManageStudents;
