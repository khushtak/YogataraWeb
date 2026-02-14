
import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Edit, Trash2, ArrowUpDown, ImageIcon } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Question } from '@/utils/data/types';

interface QuestionsTableProps {
  questions: Question[];
  onDelete: (id: number) => void;
}

const QuestionsTable: React.FC<QuestionsTableProps> = ({ questions, onDelete }) => {
  const [selectedQuestions, setSelectedQuestions] = useState<number[]>([]);
  const [confirmDeleteId, setConfirmDeleteId] = useState<number | null>(null);
  
  const handleSelectQuestion = (id: number, checked: boolean) => {
    if (checked) {
      setSelectedQuestions(prev => [...prev, id]);
    } else {
      setSelectedQuestions(prev => prev.filter(qId => qId !== id));
    }
  };
  
  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedQuestions(questions.map(q => q.id));
    } else {
      setSelectedQuestions([]);
    }
  };
  
  const handleDeleteClick = (id: number) => {
    setConfirmDeleteId(id);
  };
  
  const handleConfirmDelete = () => {
    if (confirmDeleteId) {
      onDelete(confirmDeleteId);
      setConfirmDeleteId(null);
    }
  };
  
  const handleCancelDelete = () => {
    setConfirmDeleteId(null);
  };
  
  const handleEditQuestion = (id: number) => {
    // Would typically open edit dialog here
    // console.log(`Editing question ${id}`);
  };

  const allSelected = questions.length > 0 && selectedQuestions.length === questions.length;

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50px]">
              <Checkbox 
                checked={allSelected}
                onCheckedChange={handleSelectAll}
              />
            </TableHead>
            <TableHead className="w-[400px]">Question</TableHead>
            <TableHead>
              Type <ArrowUpDown className="ml-2 h-4 w-4 inline" />
            </TableHead>
            <TableHead>
              Difficulty <ArrowUpDown className="ml-2 h-4 w-4 inline" />
            </TableHead>
            <TableHead>
              Category <ArrowUpDown className="ml-2 h-4 w-4 inline" />
            </TableHead>
            <TableHead>Course/Section</TableHead>
            {/* <TableHead>Used In</TableHead> */}
            <TableHead className="text-center">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {questions.length === 0 ? (
            <TableRow>
              <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                No questions found. Try adjusting your filters or add new questions.
              </TableCell>
            </TableRow>
          ) : (
            questions.map((question) => (
              <TableRow key={question.id}>
                <TableCell>
                  <Checkbox 
                    checked={selectedQuestions.includes(question.id)}
                    onCheckedChange={(checked) => 
                      handleSelectQuestion(question.id, checked === true)
                    }
                  />
                </TableCell>
                <TableCell className="font-medium">
                  <div className="flex items-center gap-2">
                    {question.hasImage && (
                      <ImageIcon className="h-4 w-4 text-blue-500" />
                    )}
                    {question.question}
                  </div>
                </TableCell>
                <TableCell>{question.type}</TableCell>
                <TableCell>{question.difficulty}</TableCell>
                <TableCell>{question.category}</TableCell>
                <TableCell className="text-sm">{question.course} / {question.section}</TableCell>
                {/* <TableCell>{question.usedIn} tests</TableCell> */}
                <TableCell className="text-right">
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={() => handleEditQuestion(question.id)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={() => handleDeleteClick(question.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
      
      <AlertDialog open={confirmDeleteId !== null} onOpenChange={handleCancelDelete}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete this question
              and remove it from any tests where it's being used.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmDelete}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default QuestionsTable;
