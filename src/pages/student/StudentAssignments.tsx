import React, { useEffect, useState } from 'react';
import StudentLayout from '@/components/student/StudentLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { ButtonCustom } from '@/components/ui/button-custom';
import {
  Search,
  Filter,
  Clock,
  Calendar,
  FileText,
  CheckCircle2
} from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Link } from 'react-router-dom';
import { formatDate, getTimeRemaining } from '@/utils/data/assignmentsDataUtils';

/* ===============================
   🔮 YOGTARA STATIC ASSIGNMENTS
=============================== */

const UPCOMING_ASSIGNMENTS = [
  {
    id: 'a1',
    title: 'Birth Chart Analysis',
    course: 'Vedic Astrology Basics',
    description:
      'Prepare a complete Janam Kundli analysis using Lagna and Grahas.',
    dueDate: '2026-02-11T05:29:00Z',
    type: 'Assignment',
    points: 100,
  },
  {
    id: 'a2',
    title: '12 Zodiac Signs Report',
    course: 'Western Astrology',
    description:
      'Write detailed traits and career paths for all 12 zodiac signs.',
    dueDate: '2026-02-15T05:29:00Z',
    type: 'Exercise',
    points: 80,
  },
  {
    id: 'a3',
    title: 'Planetary Effects Test',
    course: 'Navagraha Deep Study',
    description:
      'MCQ test on effects of planets in different houses.',
    dueDate: '2026-02-18T05:29:00Z',
    type: 'Test',
    points: 60,
  },
];

const COMPLETED_ASSIGNMENTS = [
  {
    id: 'c1',
    title: 'Introduction to Astrology Quiz',
    course: 'Astrology Foundation',
    submittedDate: '2026-01-20T10:00:00Z',
    grade: '90/100',
    feedback: 'Strong understanding of astrology fundamentals.',
  },
  {
    id: 'c2',
    title: 'Moon Sign Case Study',
    course: 'Chandra Kundli Analysis',
    submittedDate: '2026-01-18T14:30:00Z',
    grade: '85/100',
    feedback: 'Good interpretation of emotional patterns.',
  },
];

const StudentAssignments = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [upcoming, setUpcoming] = useState([]);
  const [completed, setCompleted] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
    setUpcoming(UPCOMING_ASSIGNMENTS);
    setCompleted(COMPLETED_ASSIGNMENTS);
  }, []);

  const filteredUpcoming = upcoming.filter(
    (a) =>
      a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.course.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredCompleted = completed.filter(
    (a) =>
      a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.course.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <StudentLayout>
      <div className="max-w-5xl mx-auto space-y-8">

        {/* ================= HEADER ================= */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">

          {/* LEFT */}
          <div>
            <h1 className="text-3xl font-bold">Yogtara Assignments</h1>
            <p className="text-muted-foreground">
              Astrology courses ke assignments aur tests
            </p>
          </div>

          {/* RIGHT ACTIONS */}
          <div className="flex flex-wrap items-center gap-3">

            {/* SEARCH */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                className="pl-9 pr-4 py-2 border rounded-md text-sm w-64"
                placeholder="Search astrology assignments..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* FILTER */}
            <ButtonCustom variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </ButtonCustom>

            {/* ✅ GRADES BUTTON */}
            <Link to="/student/grades">
              <ButtonCustom>
                <CheckCircle2 className="h-4 w-4 mr-2" />
                View Grades
              </ButtonCustom>
            </Link>
          </div>
        </div>

        {/* ================= TABS ================= */}
        <Tabs defaultValue="upcoming">
          <TabsList>
            <TabsTrigger value="upcoming">
              Upcoming ({filteredUpcoming.length})
            </TabsTrigger>
            <TabsTrigger value="completed">
              Completed ({filteredCompleted.length})
            </TabsTrigger>
          </TabsList>

          {/* ================= UPCOMING ================= */}
          <TabsContent value="upcoming" className="space-y-4 mt-6">
            {filteredUpcoming.map((a) => (
              <Card key={a.id} className="rounded-xl border shadow-sm">
                <CardContent className="p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-6">

                  <div className="space-y-3">
                    <div className="flex gap-2">
                      <Badge variant="outline">{a.course}</Badge>
                      <Badge className="bg-primary/10 text-primary">
                        {a.type}
                      </Badge>
                    </div>

                    <h3 className="text-xl font-semibold">{a.title}</h3>
                    <p className="text-muted-foreground text-sm max-w-xl">
                      {a.description}
                    </p>

                    <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        {formatDate(a.dueDate)}
                      </span>
                      <span className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        {getTimeRemaining(a.dueDate)}
                      </span>
                      <span className="flex items-center">
                        <FileText className="h-4 w-4 mr-1" />
                        {a.points} points
                      </span>
                    </div>
                  </div>

                  <Link to={`/student/assignments/${a.id}`}>
                    <ButtonCustom className="px-6">
                      Start Assignment
                    </ButtonCustom>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          {/* ================= COMPLETED ================= */}
          <TabsContent value="completed" className="space-y-4 mt-6">
            {filteredCompleted.map((a) => (
              <Card key={a.id} className="rounded-xl border shadow-sm">
                <CardContent className="p-6 flex flex-col md:flex-row md:justify-between gap-6">

                  <div className="space-y-3">
                    <div className="flex gap-2">
                      <Badge variant="outline">{a.course}</Badge>
                      <Badge className="bg-green-100 text-green-700">
                        Completed
                      </Badge>
                    </div>

                    <h3 className="text-xl font-semibold">{a.title}</h3>

                    <div className="text-sm text-muted-foreground space-y-1">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        Submitted: {formatDate(a.submittedDate)}
                      </div>
                      <div className="flex items-center">
                        <FileText className="h-4 w-4 mr-1" />
                        Grade: {a.grade}
                      </div>
                    </div>

                    <Separator />
                    <p className="text-sm text-muted-foreground">
                      {a.feedback}
                    </p>
                  </div>

                  <Link to={`/student/assignments/${a.id}/submission`}>
                    <ButtonCustom variant="outline">
                      Attempt Again
                    </ButtonCustom>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </StudentLayout>
  );
};

export default StudentAssignments;
