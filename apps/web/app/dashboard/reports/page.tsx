'use client';

import { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Button,
  StatusBadge,
  SearchInput,
  AnimatedContainer,
  AnimatedItem,
  AnimatedPage,
} from '@devlaunch/ui';
import { generateReports, type Report } from '@/lib/mock-data';
import { Plus, Download, Trash2, FileText } from 'lucide-react';

export default function ReportsPage() {
  const [reports, setReports] = useState(() => generateReports(15));
  const [searchQuery, setSearchQuery] = useState('');

  const filteredReports = reports.filter((report) =>
    report.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusBadgeStatus = (status: Report['status']) => {
    switch (status) {
      case 'completed':
        return 'success' as const;
      case 'processing':
        return 'warning' as const;
      case 'failed':
        return 'error' as const;
      default:
        return 'info' as const;
    }
  };

  const getTypeColor = (type: Report['type']) => {
    switch (type) {
      case 'sales':
        return 'text-green-600';
      case 'users':
        return 'text-blue-600';
      case 'performance':
        return 'text-purple-600';
      case 'analytics':
        return 'text-orange-600';
      default:
        return 'text-gray-600';
    }
  };

  const deleteReport = (id: string) => {
    setReports((prev) => prev.filter((r) => r.id !== id));
  };

  return (
    <AnimatedPage>
      <div className="container mx-auto px-4 py-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Reports</h1>
          <p className="text-muted-foreground">
            Generate and download reports
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Generate Report
        </Button>
      </div>

      <div className="mb-6">
        <SearchInput
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Search reports..."
          className="max-w-sm"
        />
      </div>

      <AnimatedContainer stagger className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredReports.map((report) => (
          <AnimatedItem key={report.id}>
            <Card className="hover:shadow-md transition-shadow h-full">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <FileText className={`h-5 w-5 ${getTypeColor(report.type)}`} />
                  <CardTitle className="text-lg">{report.name}</CardTitle>
                </div>
                <StatusBadge
                  status={getStatusBadgeStatus(report.status)}
                  label={report.status}
                />
              </div>
              <CardDescription>
                {report.type.charAt(0).toUpperCase() + report.type.slice(1)} Report
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Generated</span>
                  <span>{new Date(report.generatedAt).toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Size</span>
                  <span>{report.size}</span>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1"
                    disabled={report.status !== 'completed'}
                  >
                    <Download className="mr-2 h-4 w-4" />
                    Download
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => deleteReport(report.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
          </AnimatedItem>
        ))}
      </AnimatedContainer>
      </div>
    </AnimatedPage>
  );
}
