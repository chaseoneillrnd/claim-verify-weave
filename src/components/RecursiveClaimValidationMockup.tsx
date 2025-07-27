import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Target, 
  BarChart3, 
  Download, 
  Brain,
  Zap,
  CheckCircle,
  Settings,
  HelpCircle
} from 'lucide-react';

import { ClaimIdentificationInterface } from './ClaimIdentificationInterface';
import { ConfidenceMetricsVisualization } from './ConfidenceMetricsVisualization';
import { ExportOptionsInterface } from './ExportOptionsInterface';

export const RecursiveClaimValidationMockup = () => {
  const [activeFeature, setActiveFeature] = useState('identification');

  const features = [
    {
      id: 'identification',
      name: 'Claim Identification',
      icon: Target,
      description: 'AI-powered detection and manual flagging of claims',
      stats: { claims: 8, autoDetected: 6, manual: 2 }
    },
    {
      id: 'metrics',
      name: 'Confidence Metrics',
      icon: BarChart3,
      description: 'Real-time validation confidence with source analysis',
      stats: { avgConfidence: 72, validated: 5, sources: 23 }
    },
    {
      id: 'export',
      name: 'Export Options',
      icon: Download,
      description: 'Comprehensive reports with validation data',
      stats: { formats: 5, templates: 4, ready: true }
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-card">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 bg-socratic-blue rounded-lg flex items-center justify-center">
                  <Brain className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold">Recursive Claim Validation</h1>
                  <p className="text-muted-foreground">Enhanced feature mockup for The Academy</p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Badge variant="outline" className="text-sm">
                <Zap className="h-3 w-3 mr-1" />
                Feature Mockup
              </Badge>
              <Button variant="outline" size="sm">
                <HelpCircle className="h-4 w-4 mr-2" />
                About This Feature
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Feature Overview Cards */}
      <div className="container mx-auto px-4 py-6">
        <div className="grid gap-4 md:grid-cols-3 mb-8">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <Card 
                key={feature.id}
                className={`cursor-pointer transition-all hover:shadow-md ${
                  activeFeature === feature.id ? 'ring-2 ring-socratic-blue' : ''
                }`}
                onClick={() => setActiveFeature(feature.id)}
              >
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center gap-2">
                    <Icon className="h-5 w-5 text-socratic-blue" />
                    {feature.name}
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-4 text-sm">
                    {feature.id === 'identification' && (
                      <>
                        <div className="flex items-center gap-1">
                          <CheckCircle className="h-3 w-3 text-validation-high" />
                          <span>{feature.stats.claims} claims</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Zap className="h-3 w-3 text-socratic-blue" />
                          <span>{feature.stats.autoDetected} auto</span>
                        </div>
                      </>
                    )}
                    {feature.id === 'metrics' && (
                      <>
                        <div className="flex items-center gap-1">
                          <BarChart3 className="h-3 w-3 text-validation-medium" />
                          <span>{feature.stats.avgConfidence}% avg</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <CheckCircle className="h-3 w-3 text-validation-high" />
                          <span>{feature.stats.sources} sources</span>
                        </div>
                      </>
                    )}
                    {feature.id === 'export' && (
                      <>
                        <div className="flex items-center gap-1">
                          <Download className="h-3 w-3 text-socratic-blue" />
                          <span>{feature.stats.formats} formats</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <CheckCircle className="h-3 w-3 text-validation-high" />
                          <span>Ready</span>
                        </div>
                      </>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Feature Interfaces */}
        <div className="space-y-8">
          {activeFeature === 'identification' && <ClaimIdentificationInterface />}
          {activeFeature === 'metrics' && <ConfidenceMetricsVisualization />}
          {activeFeature === 'export' && <ExportOptionsInterface />}
        </div>

        {/* Integration Notes */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              Integration with The Academy
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-3">
                <h4 className="font-medium">UI Integration Points</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-3 w-3 text-validation-high" />
                    New validation panel in conversation sidebar
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-3 w-3 text-validation-high" />
                    Inline claim highlighting in messages
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-3 w-3 text-validation-high" />
                    Enhanced export options with validation data
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-3 w-3 text-validation-high" />
                    Real-time confidence indicators
                  </div>
                </div>
              </div>
              <div className="space-y-3">
                <h4 className="font-medium">MCP Tool Extensions</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-3 w-3 text-validation-high" />
                    <code className="text-xs bg-muted px-1 rounded">validate_claim</code> tool
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-3 w-3 text-validation-high" />
                    <code className="text-xs bg-muted px-1 rounded">get_validation_status</code> resource
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-3 w-3 text-validation-high" />
                    <code className="text-xs bg-muted px-1 rounded">export_validation_report</code> tool
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-3 w-3 text-validation-high" />
                    <code className="text-xs bg-muted px-1 rounded">configure_validation</code> settings
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};