
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Download, Upload, RefreshCw } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import DataService from '@/services/dataService';


const AdminDataManager: React.FC = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const handleExportData = (dataType: string) => {
    setLoading(true);
    
    // This simulates exporting data
    setTimeout(() => {
      let data;
      
      switch (dataType) {
        case 'questions':
          data = DataService.getQuestions();
          break;
        case 'courses':
          data = DataService.getCoursesList();
          break;
        case 'categories':
          data = DataService.getCategories();
          break;
        default:
          data = {};
      }
      
      // Create a Blob with the data and trigger a download
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${dataType}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      toast({
        title: "Data Exported",
        description: `${dataType} data has been exported successfully.`
      });
      
      setLoading(false);
    }, 1000);
  };
  
  const handleImportData = (dataType: string) => {
    // This would open a file dialog and import data
    // In a real app, this would validate and process the imported data
    toast({
      title: "Import Feature",
      description: `The import feature for ${dataType} would be implemented with actual backend integration.`
    });
  };
  
  const handleRefreshData = (dataType: string) => {
    setLoading(true);
    
    // This simulates refreshing data from the server
    setTimeout(() => {
      toast({
        title: "Data Refreshed",
        description: `${dataType} data has been refreshed from the server.`
      });
      
      setLoading(false);
    }, 1000);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Data Management</CardTitle>
        <CardDescription>
          Export, import, and refresh application data. This demonstrates the use of the DataService.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="questions">
          <TabsList className="mb-4">
            <TabsTrigger value="questions">Questions</TabsTrigger>
            <TabsTrigger value="courses">Courses</TabsTrigger>
            <TabsTrigger value="categories">Categories</TabsTrigger>
          </TabsList>
          
          {['questions', 'courses', 'categories'].map(dataType => (
            <TabsContent key={dataType} value={dataType} className="space-y-4">
              <div className="flex flex-wrap gap-2">
                <Button
                  variant="outline"
                  onClick={() => handleExportData(dataType)}
                  disabled={loading}
                >
                  <Download className="mr-2 h-4 w-4" />
                  Export {dataType}
                </Button>
                
                <Button
                  variant="outline"
                  onClick={() => handleImportData(dataType)}
                  disabled={loading}
                >
                  <Upload className="mr-2 h-4 w-4" />
                  Import {dataType}
                </Button>
                
                <Button
                  variant="outline"
                  onClick={() => handleRefreshData(dataType)}
                  disabled={loading}
                >
                  <RefreshCw className={`mr-2 h-4 w-4 ${loading ? "animate-spin" : ""}`} />
                  Refresh {dataType}
                </Button>
              </div>
              
              <p className="text-sm text-muted-foreground mt-4">
                These actions demonstrate how to use the DataService to manage {dataType} data.
                In a production environment, these would connect to actual API endpoints.
              </p>
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default AdminDataManager;
