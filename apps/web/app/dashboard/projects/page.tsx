'use client';

import { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Button,
  Progress,
  StatusBadge,
  SearchInput,
  AnimatedContainer,
  AnimatedItem,
  AnimatedPage,
} from '@devlaunch/ui';
import { generateProjects, type Project } from '@/lib/mock-data';
import { Plus, Grid3x3, List, Users } from 'lucide-react';

export default function ProjectsPage() {
  const [projects] = useState(() => generateProjects(20));
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProjects = projects.filter((project) =>
    project.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusBadgeStatus = (status: Project['status']) => {
    switch (status) {
      case 'active':
        return 'active' as const;
      case 'archived':
        return 'inactive' as const;
      case 'draft':
        return 'draft' as const;
      default:
        return 'info' as const;
    }
  };

  return (
    <AnimatedPage>
      <div className="container mx-auto px-4 py-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Projects</h1>
          <p className="text-muted-foreground">
            Manage and track your projects
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          New Project
        </Button>
      </div>

      <div className="mb-6 flex items-center justify-between gap-4">
        <SearchInput
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Search projects..."
          className="max-w-sm"
        />
        <div className="flex gap-2">
          <Button
            variant={viewMode === 'grid' ? 'default' : 'outline'}
            size="icon"
            onClick={() => setViewMode('grid')}
          >
            <Grid3x3 className="h-4 w-4" />
          </Button>
          <Button
            variant={viewMode === 'list' ? 'default' : 'outline'}
            size="icon"
            onClick={() => setViewMode('list')}
          >
            <List className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {viewMode === 'grid' ? (
        <AnimatedContainer stagger className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map((project) => (
            <AnimatedItem key={project.id}>
              <Card className="hover:shadow-md transition-shadow cursor-pointer h-full">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <CardTitle className="text-lg">{project.name}</CardTitle>
                  <StatusBadge
                    status={getStatusBadgeStatus(project.status)}
                    label={project.status}
                  />
                </div>
                <CardDescription>{project.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between text-sm mb-2">
                      <span className="text-muted-foreground">Progress</span>
                      <span className="font-medium">{project.progress}%</span>
                    </div>
                    <Progress value={project.progress} />
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center text-muted-foreground">
                      <Users className="mr-1 h-4 w-4" />
                      {project.members} members
                    </div>
                    <span className="text-muted-foreground">
                      {new Date(project.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
            </AnimatedItem>
          ))}
        </AnimatedContainer>
      ) : (
        <AnimatedContainer stagger className="space-y-4">
          {filteredProjects.map((project) => (
            <AnimatedItem key={project.id}>
              <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold">{project.name}</h3>
                      <StatusBadge
                        status={getStatusBadgeStatus(project.status)}
                        label={project.status}
                      />
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      {project.description}
                    </p>
                    <div className="flex items-center gap-6 text-sm text-muted-foreground">
                      <div className="flex items-center">
                        <Users className="mr-1 h-4 w-4" />
                        {project.members} members
                      </div>
                      <span>Owner: {project.owner}</span>
                      <span>Created {new Date(project.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <div className="ml-6 w-32">
                    <div className="text-sm text-muted-foreground mb-2">Progress</div>
                    <div className="flex items-center gap-2">
                      <Progress value={project.progress} className="flex-1" />
                      <span className="text-sm font-medium">{project.progress}%</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            </AnimatedItem>
          ))}
        </AnimatedContainer>
      )}
      </div>
    </AnimatedPage>
  );
}
