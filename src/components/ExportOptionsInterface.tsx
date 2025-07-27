import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { 
  Download, 
  FileText,
  FileImage,
  FileSpreadsheet,
  BookOpen,
  Settings,
  Eye,
  Copy,
  Share,
  Calendar,
  User,
  Tag,
  CheckCircle,
  AlertTriangle,
  XCircle,
  BarChart3,
  Clock,
  Globe
} from 'lucide-react';

interface ExportOptions {
  format: 'pdf' | 'markdown' | 'csv' | 'json' | 'latex';
  includeDialogue: boolean;
  includeValidations: boolean;
  includeAnalysis: boolean;
  includeSources: boolean;
  includeMetrics: boolean;
  includeTimestamps: boolean;
  confidenceThreshold: number;
  customTitle: string;
  customDescription: string;
  authorName: string;
  organizationName: string;
  template: 'research' | 'academic' | 'executive' | 'technical';
}

const mockExportData = {
  sessionTitle: "AI Reasoning Research Session",
  totalMessages: 45,
  totalClaims: 8,
  validatedClaims: 5,
  averageConfidence: 72,
  sessionDuration: "2h 34m",
  participantCount: 3,
  analysisCount: 12,
  sourceCount: 23
};

export const ExportOptionsInterface = () => {
  const [exportOptions, setExportOptions] = useState<ExportOptions>({
    format: 'pdf',
    includeDialogue: true,
    includeValidations: true,
    includeAnalysis: true,
    includeSources: true,
    includeMetrics: true,
    includeTimestamps: true,
    confidenceThreshold: 50,
    customTitle: mockExportData.sessionTitle,
    customDescription: 'Comprehensive analysis of AI reasoning capabilities through Socratic dialogue.',
    authorName: '',
    organizationName: '',
    template: 'research'
  });

  const [isGenerating, setIsGenerating] = useState(false);
  const [previewVisible, setPreviewVisible] = useState(false);

  const handleExportOptionChange = (key: keyof ExportOptions, value: any) => {
    setExportOptions(prev => ({ ...prev, [key]: value }));
  };

  const getFormatIcon = (format: string) => {
    switch (format) {
      case 'pdf': return <FileText className="h-4 w-4" />;
      case 'markdown': return <FileText className="h-4 w-4" />;
      case 'csv': return <FileSpreadsheet className="h-4 w-4" />;
      case 'json': return <FileText className="h-4 w-4" />;
      case 'latex': return <BookOpen className="h-4 w-4" />;
      default: return <FileText className="h-4 w-4" />;
    }
  };

  const generateExport = async () => {
    setIsGenerating(true);
    // Simulate export generation
    await new Promise(resolve => setTimeout(resolve, 3000));
    setIsGenerating(false);
  };

  const estimatedFileSize = () => {
    let baseSize = 0.5; // Base size in MB
    if (exportOptions.includeDialogue) baseSize += 2.0;
    if (exportOptions.includeValidations) baseSize += 1.5;
    if (exportOptions.includeAnalysis) baseSize += 1.0;
    if (exportOptions.includeSources) baseSize += 0.8;
    if (exportOptions.includeMetrics) baseSize += 0.3;
    return baseSize.toFixed(1);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Download className="h-6 w-6 text-socratic-blue" />
            Export Options
          </h2>
          <p className="text-muted-foreground">
            Generate comprehensive reports with validation data and analysis
          </p>
        </div>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => setPreviewVisible(!previewVisible)}
          >
            <Eye className="h-4 w-4 mr-2" />
            {previewVisible ? 'Hide' : 'Show'} Preview
          </Button>
          <Button 
            onClick={generateExport}
            disabled={isGenerating}
            size="sm"
          >
            {isGenerating ? (
              <>
                <Clock className="h-4 w-4 mr-2 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Download className="h-4 w-4 mr-2" />
                Export Report
              </>
            )}
          </Button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Export Configuration */}
        <div className="lg:col-span-2 space-y-6">
          <Tabs defaultValue="format" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="format">Format</TabsTrigger>
              <TabsTrigger value="content">Content</TabsTrigger>
              <TabsTrigger value="metadata">Metadata</TabsTrigger>
              <TabsTrigger value="templates">Templates</TabsTrigger>
            </TabsList>

            <TabsContent value="format" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Export Format</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Format Selection */}
                  <div className="grid grid-cols-2 gap-3">
                    {['pdf', 'markdown', 'csv', 'json', 'latex'].map(format => (
                      <div
                        key={format}
                        className={`p-3 rounded-lg border cursor-pointer transition-all ${
                          exportOptions.format === format 
                            ? 'border-socratic-blue bg-socratic-blue/5' 
                            : 'hover:border-socratic-blue/50'
                        }`}
                        onClick={() => handleExportOptionChange('format', format)}
                      >
                        <div className="flex items-center gap-2">
                          {getFormatIcon(format)}
                          <span className="font-medium capitalize">{format}</span>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">
                          {format === 'pdf' && 'Research-ready PDF with charts'}
                          {format === 'markdown' && 'Plain text with formatting'}
                          {format === 'csv' && 'Spreadsheet data format'}
                          {format === 'json' && 'Structured data format'}
                          {format === 'latex' && 'Academic paper format'}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Format-specific options */}
                  {exportOptions.format === 'pdf' && (
                    <div className="space-y-3 p-3 bg-muted/30 rounded-lg">
                      <Label className="text-sm font-medium">PDF Options</Label>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <Checkbox checked={true} />
                          <Label className="text-sm">Include charts and visualizations</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox checked={true} />
                          <Label className="text-sm">Generate table of contents</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox checked={false} />
                          <Label className="text-sm">Include appendices</Label>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="content" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Content Selection</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Main Content Options */}
                  <div className="space-y-3">
                    {[
                      { key: 'includeDialogue', label: 'Conversation Dialogue', desc: 'Full message history and exchanges' },
                      { key: 'includeValidations', label: 'Claim Validations', desc: 'Validation results and confidence metrics' },
                      { key: 'includeAnalysis', label: 'AI Analysis', desc: 'Real-time analysis snapshots' },
                      { key: 'includeSources', label: 'Source Citations', desc: 'Academic sources and references' },
                      { key: 'includeMetrics', label: 'Performance Metrics', desc: 'Session statistics and analytics' },
                      { key: 'includeTimestamps', label: 'Timestamps', desc: 'Message timing and duration data' }
                    ].map(option => (
                      <div key={option.key} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center space-x-3">
                          <Checkbox 
                            checked={exportOptions[option.key as keyof ExportOptions] as boolean}
                            onCheckedChange={(checked) => handleExportOptionChange(option.key as keyof ExportOptions, checked)}
                          />
                          <div>
                            <Label className="font-medium">{option.label}</Label>
                            <p className="text-xs text-muted-foreground">{option.desc}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Confidence Threshold */}
                  <Separator />
                  <div className="space-y-2">
                    <Label>Minimum Confidence Threshold</Label>
                    <Select 
                      value={exportOptions.confidenceThreshold.toString()}
                      onValueChange={(value) => handleExportOptionChange('confidenceThreshold', parseInt(value))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="0">Include all claims (0%)</SelectItem>
                        <SelectItem value="25">Low confidence (25%+)</SelectItem>
                        <SelectItem value="50">Medium confidence (50%+)</SelectItem>
                        <SelectItem value="75">High confidence (75%+)</SelectItem>
                        <SelectItem value="90">Very high confidence (90%+)</SelectItem>
                      </SelectContent>
                    </Select>
                    <p className="text-xs text-muted-foreground">
                      Only include claims above this confidence level
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="metadata" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Document Metadata</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="space-y-2">
                      <Label>Report Title</Label>
                      <Input 
                        value={exportOptions.customTitle}
                        onChange={(e) => handleExportOptionChange('customTitle', e.target.value)}
                        placeholder="Enter report title..."
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Description</Label>
                      <Textarea 
                        value={exportOptions.customDescription}
                        onChange={(e) => handleExportOptionChange('customDescription', e.target.value)}
                        placeholder="Brief description of the session..."
                        rows={3}
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-2">
                        <Label>Author Name</Label>
                        <Input 
                          value={exportOptions.authorName}
                          onChange={(e) => handleExportOptionChange('authorName', e.target.value)}
                          placeholder="Your name"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Organization</Label>
                        <Input 
                          value={exportOptions.organizationName}
                          onChange={(e) => handleExportOptionChange('organizationName', e.target.value)}
                          placeholder="Institution/Company"
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="templates" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Report Templates</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-3">
                    {[
                      { id: 'research', name: 'Research Report', desc: 'Comprehensive academic-style report with methodology and findings' },
                      { id: 'academic', name: 'Academic Paper', desc: 'Formal paper format with abstract, introduction, and conclusions' },
                      { id: 'executive', name: 'Executive Summary', desc: 'Concise overview focusing on key insights and recommendations' },
                      { id: 'technical', name: 'Technical Documentation', desc: 'Detailed technical analysis with implementation details' }
                    ].map(template => (
                      <div
                        key={template.id}
                        className={`p-3 rounded-lg border cursor-pointer transition-all ${
                          exportOptions.template === template.id 
                            ? 'border-socratic-blue bg-socratic-blue/5' 
                            : 'hover:border-socratic-blue/50'
                        }`}
                        onClick={() => handleExportOptionChange('template', template.id)}
                      >
                        <div className="flex items-center gap-2 mb-1">
                          <BookOpen className="h-4 w-4" />
                          <span className="font-medium">{template.name}</span>
                        </div>
                        <p className="text-xs text-muted-foreground">{template.desc}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Export Preview & Summary */}
        <div className="space-y-6">
          {/* Export Summary */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <BarChart3 className="h-4 w-4" />
                Export Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Format</span>
                  <Badge variant="outline" className="uppercase">
                    {exportOptions.format}
                  </Badge>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Template</span>
                  <span className="capitalize font-medium">{exportOptions.template}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Estimated Size</span>
                  <span className="font-medium">{estimatedFileSize()} MB</span>
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <h4 className="text-sm font-medium">Content Included</h4>
                <div className="space-y-1">
                  {exportOptions.includeDialogue && <div className="flex items-center gap-2 text-xs"><CheckCircle className="h-3 w-3 text-validation-high" />Dialogue ({mockExportData.totalMessages} messages)</div>}
                  {exportOptions.includeValidations && <div className="flex items-center gap-2 text-xs"><CheckCircle className="h-3 w-3 text-validation-high" />Validations ({mockExportData.validatedClaims} claims)</div>}
                  {exportOptions.includeAnalysis && <div className="flex items-center gap-2 text-xs"><CheckCircle className="h-3 w-3 text-validation-high" />Analysis ({mockExportData.analysisCount} snapshots)</div>}
                  {exportOptions.includeSources && <div className="flex items-center gap-2 text-xs"><CheckCircle className="h-3 w-3 text-validation-high" />Sources ({mockExportData.sourceCount} citations)</div>}
                  {exportOptions.includeMetrics && <div className="flex items-center gap-2 text-xs"><CheckCircle className="h-3 w-3 text-validation-high" />Metrics & Stats</div>}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" size="sm" className="w-full">
                <Copy className="h-4 w-4 mr-2" />
                Save Export Template
              </Button>
              <Button variant="outline" size="sm" className="w-full">
                <Share className="h-4 w-4 mr-2" />
                Schedule Export
              </Button>
              <Button variant="outline" size="sm" className="w-full">
                <Globe className="h-4 w-4 mr-2" />
                Generate Public Link
              </Button>
            </CardContent>
          </Card>

          {/* Export Preview */}
          {previewVisible && (
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Export Preview</CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[300px]">
                  <div className="space-y-3 text-xs">
                    <div className="border-b pb-2">
                      <h3 className="font-medium">{exportOptions.customTitle}</h3>
                      <p className="text-muted-foreground">{exportOptions.customDescription}</p>
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-medium">1. Executive Summary</h4>
                      <p className="text-muted-foreground">Session overview, key findings...</p>
                      
                      {exportOptions.includeValidations && (
                        <>
                          <h4 className="font-medium">2. Claim Validation Results</h4>
                          <p className="text-muted-foreground">Confidence metrics, source analysis...</p>
                        </>
                      )}
                      
                      {exportOptions.includeDialogue && (
                        <>
                          <h4 className="font-medium">3. Conversation Transcript</h4>
                          <p className="text-muted-foreground">Full dialogue with timestamps...</p>
                        </>
                      )}
                      
                      {exportOptions.includeAnalysis && (
                        <>
                          <h4 className="font-medium">4. AI Analysis</h4>
                          <p className="text-muted-foreground">Real-time insights and patterns...</p>
                        </>
                      )}
                      
                      {exportOptions.includeSources && (
                        <>
                          <h4 className="font-medium">5. References & Sources</h4>
                          <p className="text-muted-foreground">Academic citations and links...</p>
                        </>
                      )}
                    </div>
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};