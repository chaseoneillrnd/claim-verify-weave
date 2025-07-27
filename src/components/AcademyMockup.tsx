import { ClaimValidationPanel } from './ClaimValidationPanel';
import { ConversationMessageWithValidation } from './ConversationMessageWithValidation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  MessageCircle, 
  Users, 
  BarChart3, 
  Flag,
  Settings,
  Play,
  Pause,
  Download,
  Brain,
  FileText,
  CheckCircle
} from 'lucide-react';
import academyScreenshot from '@/assets/academy-screenshot.png';

export const AcademyMockup = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Brain className="h-6 w-6 text-socratic-blue" />
                <h1 className="text-xl font-bold">The Academy</h1>
              </div>
              <Badge variant="secondary">Session: AI Reasoning Research</Badge>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Button>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
              <Button size="sm">
                <Play className="h-4 w-4 mr-2" />
                Resume
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Main Conversation Area */}
          <div className="lg:col-span-2 space-y-6">
            {/* Current UI Preview */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageCircle className="h-5 w-5" />
                  Current Academy Interface
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="relative rounded-lg overflow-hidden border">
                  <img 
                    src={academyScreenshot} 
                    alt="Current Academy Interface" 
                    className="w-full h-auto"
                  />
                  <div className="absolute top-4 right-4">
                    <Badge className="bg-socratic-blue text-white">
                      Current UI
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Enhanced Message with Validation */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Flag className="h-5 w-5 text-validation-medium" />
                  Enhanced: Message with Claim Validation
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  Messages now include inline claim validation with confidence metrics and source tracking
                </p>
              </CardHeader>
              <CardContent>
                <ConversationMessageWithValidation />
              </CardContent>
            </Card>

            {/* Integration Overview */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Feature Integration Overview
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-3">
                    <h4 className="font-medium">New UI Components</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-validation-high" />
                        Claim validation panel
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-validation-high" />
                        Inline claim highlighting
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-validation-high" />
                        Confidence indicators
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-validation-high" />
                        Source tracking cards
                      </div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <h4 className="font-medium">MCP Integration</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-validation-high" />
                        validate_claim tool
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-validation-high" />
                        get_validation_status resource
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-validation-high" />
                        export_validation_report tool
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-validation-high" />
                        configure_validation_settings
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Sidebar - Validation Panel */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Flag className="h-5 w-5 text-validation-medium" />
                  New: Claim Validation Panel
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  Comprehensive validation interface with real-time confidence tracking
                </p>
              </CardHeader>
            </Card>

            <ClaimValidationPanel />

            {/* Export Preview */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Export Enhancement
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <p className="text-sm text-muted-foreground">
                    Session exports now include validation reports with:
                  </p>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-3 w-3 text-validation-high" />
                      Claim confidence metrics
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-3 w-3 text-validation-high" />
                      Source citations & credibility scores
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-3 w-3 text-validation-high" />
                      Validation timeline
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-3 w-3 text-validation-high" />
                      Research-ready PDF format
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="w-full mt-3">
                    <Download className="h-4 w-4 mr-2" />
                    Preview Export
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};