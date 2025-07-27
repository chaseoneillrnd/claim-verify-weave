import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  CheckCircle, 
  AlertTriangle, 
  XCircle, 
  Clock, 
  ExternalLink, 
  RefreshCw,
  Flag,
  Download,
  Settings
} from 'lucide-react';

interface ClaimValidation {
  id: string;
  claim: string;
  confidence: number;
  status: 'high' | 'medium' | 'low' | 'pending';
  sources: Source[];
  validationDepth: number;
  lastUpdated: string;
  messageId: string;
}

interface Source {
  id: string;
  title: string;
  url: string;
  domain: string;
  confirmationType: 'full' | 'partial' | 'conflicting' | 'unrelated';
  credibilityScore: number;
  summary: string;
  datePublished?: string;
  publicationType: 'peer-reviewed' | 'academic' | 'news' | 'government' | 'other';
}

// Mock data for demonstration
const mockValidations: ClaimValidation[] = [
  {
    id: '1',
    claim: 'Large language models exhibit emergent abilities at scale',
    confidence: 85,
    status: 'high',
    sources: [
      {
        id: '1',
        title: 'Emergent Abilities of Large Language Models',
        url: 'https://arxiv.org/abs/2206.07682',
        domain: 'arxiv.org',
        confirmationType: 'full',
        credibilityScore: 95,
        summary: 'This paper demonstrates how certain abilities emerge in language models only at sufficient scale.',
        datePublished: '2022-06-15',
        publicationType: 'peer-reviewed'
      },
      {
        id: '2',
        title: 'Beyond Scale: The Diversity of Emergent Abilities',
        url: 'https://openai.com/research/gpt-4',
        domain: 'openai.com',
        confirmationType: 'partial',
        credibilityScore: 88,
        summary: 'GPT-4 technical report showing emergent capabilities in various domains.',
        datePublished: '2023-03-14',
        publicationType: 'academic'
      }
    ],
    validationDepth: 2,
    lastUpdated: '2025-01-27T10:30:00Z',
    messageId: 'msg_123'
  },
  {
    id: '2',
    claim: 'Socratic dialogue improves AI reasoning by 40%',
    confidence: 45,
    status: 'medium',
    sources: [
      {
        id: '3',
        title: 'Socratic Method in AI Training',
        url: 'https://example.edu/paper',
        domain: 'example.edu',
        confirmationType: 'partial',
        credibilityScore: 70,
        summary: 'Study shows modest improvements in reasoning tasks using Socratic approaches.',
        publicationType: 'academic'
      }
    ],
    validationDepth: 1,
    lastUpdated: '2025-01-27T10:15:00Z',
    messageId: 'msg_124'
  }
];

export const ClaimValidationPanel = () => {
  const [selectedClaim, setSelectedClaim] = useState<ClaimValidation | null>(null);
  const [isValidating, setIsValidating] = useState(false);

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 80) return 'validation-high';
    if (confidence >= 50) return 'validation-medium';
    return 'validation-low';
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'high': return <CheckCircle className="h-4 w-4 text-validation-high" />;
      case 'medium': return <AlertTriangle className="h-4 w-4 text-validation-medium" />;
      case 'low': return <XCircle className="h-4 w-4 text-validation-low" />;
      case 'pending': return <Clock className="h-4 w-4 text-validation-pending-foreground" />;
      default: return null;
    }
  };

  const getConfirmationIcon = (type: string) => {
    switch (type) {
      case 'full': return <CheckCircle className="h-3 w-3 text-validation-high" />;
      case 'partial': return <AlertTriangle className="h-3 w-3 text-validation-medium" />;
      case 'conflicting': return <XCircle className="h-3 w-3 text-validation-low" />;
      default: return <Clock className="h-3 w-3 text-muted-foreground" />;
    }
  };

  return (
    <div className="w-full space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h3 className="text-lg font-semibold">Claim Validation</h3>
          <p className="text-sm text-muted-foreground">
            Recursive validation of key claims with confidence metrics
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Settings className="h-4 w-4 mr-2" />
            Configure
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      <Tabs defaultValue="active" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="active">Active Claims ({mockValidations.length})</TabsTrigger>
          <TabsTrigger value="history">Validation History</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="space-y-4">
          <div className="grid gap-4 lg:grid-cols-2">
            {/* Claims List */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <Flag className="h-4 w-4" />
                  Flagged Claims
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[400px]">
                  <div className="space-y-3">
                    {mockValidations.map((validation) => (
                      <div
                        key={validation.id}
                        className={`p-3 rounded-lg border cursor-pointer transition-colors hover:bg-muted/50 ${
                          selectedClaim?.id === validation.id ? 'border-primary bg-muted' : ''
                        }`}
                        onClick={() => setSelectedClaim(validation)}
                      >
                        <div className="flex items-start gap-3">
                          <div className="flex-shrink-0 mt-1">
                            {getStatusIcon(validation.status)}
                          </div>
                          <div className="flex-1 space-y-2">
                            <p className="text-sm font-medium leading-tight">
                              {validation.claim}
                            </p>
                            <div className="flex items-center gap-2">
                              <Badge 
                                variant="secondary" 
                                className={`text-${getConfidenceColor(validation.confidence)}-foreground bg-${getConfidenceColor(validation.confidence)}`}
                              >
                                {validation.confidence}% confident
                              </Badge>
                              <span className="text-xs text-muted-foreground">
                                {validation.sources.length} sources
                              </span>
                            </div>
                            <Progress 
                              value={validation.confidence} 
                              className="h-1"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
                <div className="mt-4 pt-4 border-t">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full"
                    onClick={() => setIsValidating(true)}
                    disabled={isValidating}
                  >
                    {isValidating ? (
                      <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                    ) : (
                      <RefreshCw className="h-4 w-4 mr-2" />
                    )}
                    {isValidating ? 'Validating...' : 'Validate All Claims'}
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Claim Details */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">
                  {selectedClaim ? 'Validation Details' : 'Select a Claim'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {selectedClaim ? (
                  <div className="space-y-4">
                    {/* Claim Summary */}
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        {getStatusIcon(selectedClaim.status)}
                        <Badge 
                          variant="secondary"
                          className={`text-${getConfidenceColor(selectedClaim.confidence)}-foreground bg-${getConfidenceColor(selectedClaim.confidence)}`}
                        >
                          {selectedClaim.confidence}% Confidence
                        </Badge>
                      </div>
                      <p className="text-sm font-medium">
                        {selectedClaim.claim}
                      </p>
                      <div className="text-xs text-muted-foreground">
                        Validation depth: {selectedClaim.validationDepth} | 
                        Last updated: {new Date(selectedClaim.lastUpdated).toLocaleTimeString()}
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs">
                        <span>Validation Progress</span>
                        <span>{selectedClaim.sources.length}/5 sources</span>
                      </div>
                      <Progress value={(selectedClaim.sources.length / 5) * 100} className="h-2" />
                    </div>

                    {/* Sources */}
                    <div className="space-y-2">
                      <h4 className="text-sm font-medium">Sources ({selectedClaim.sources.length})</h4>
                      <ScrollArea className="h-[200px]">
                        <div className="space-y-2">
                          {selectedClaim.sources.map((source) => (
                            <div key={source.id} className="p-2 border rounded-md text-xs space-y-1">
                              <div className="flex items-center gap-2">
                                {getConfirmationIcon(source.confirmationType)}
                                <span className="font-medium truncate flex-1">
                                  {source.title}
                                </span>
                                <Badge variant="outline" className="text-xs">
                                  {source.credibilityScore}%
                                </Badge>
                              </div>
                              <p className="text-muted-foreground line-clamp-2">
                                {source.summary}
                              </p>
                              <div className="flex items-center justify-between">
                                <span className="text-muted-foreground">
                                  {source.domain} • {source.publicationType}
                                </span>
                                <Button variant="ghost" size="sm" className="h-6 p-1">
                                  <ExternalLink className="h-3 w-3" />
                                </Button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </ScrollArea>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="flex-1">
                        <RefreshCw className="h-3 w-3 mr-1" />
                        Re-validate
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1">
                        <Flag className="h-3 w-3 mr-1" />
                        Mark Resolved
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="text-center text-muted-foreground py-8">
                    <Flag className="h-8 w-8 mx-auto mb-2 opacity-50" />
                    <p>Select a claim to view validation details</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="history">
          <Card>
            <CardContent className="pt-6">
              <div className="text-center text-muted-foreground py-8">
                <Clock className="h-8 w-8 mx-auto mb-2 opacity-50" />
                <p>Validation history will appear here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings">
          <Card>
            <CardContent className="pt-6">
              <div className="text-center text-muted-foreground py-8">
                <Settings className="h-8 w-8 mx-auto mb-2 opacity-50" />
                <p>Validation settings and configuration</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};