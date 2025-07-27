import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  BarChart3, 
  TrendingUp, 
  Target,
  CheckCircle,
  AlertTriangle,
  XCircle,
  Clock,
  Zap,
  Shield,
  Award,
  RefreshCw,
  Info
} from 'lucide-react';

interface ConfidenceMetric {
  claimId: string;
  claim: string;
  overallConfidence: number;
  sourceCount: number;
  targetSources: number;
  validationDepth: number;
  breakdown: {
    fullConfirmations: number;
    partialConfirmations: number;
    conflictingSources: number;
    credibilityScore: number;
  };
  trend: 'increasing' | 'decreasing' | 'stable';
  lastUpdate: string;
  status: 'high' | 'medium' | 'low' | 'pending';
}

const mockMetrics: ConfidenceMetric[] = [
  {
    claimId: '1',
    claim: 'Large language models exhibit emergent abilities at scale',
    overallConfidence: 85,
    sourceCount: 4,
    targetSources: 5,
    validationDepth: 2,
    breakdown: {
      fullConfirmations: 3,
      partialConfirmations: 1,
      conflictingSources: 0,
      credibilityScore: 92
    },
    trend: 'increasing',
    lastUpdate: '2 min ago',
    status: 'high'
  },
  {
    claimId: '2',
    claim: 'Socratic dialogue improves AI reasoning by 40%',
    overallConfidence: 45,
    sourceCount: 2,
    targetSources: 5,
    validationDepth: 1,
    breakdown: {
      fullConfirmations: 1,
      partialConfirmations: 1,
      conflictingSources: 0,
      credibilityScore: 78
    },
    trend: 'stable',
    lastUpdate: '5 min ago',
    status: 'medium'
  },
  {
    claimId: '3',
    claim: 'AI models require 10x more data each generation',
    overallConfidence: 25,
    sourceCount: 1,
    targetSources: 5,
    validationDepth: 1,
    breakdown: {
      fullConfirmations: 0,
      partialConfirmations: 1,
      conflictingSources: 0,
      credibilityScore: 65
    },
    trend: 'decreasing',
    lastUpdate: '8 min ago',
    status: 'low'
  }
];

export const ConfidenceMetricsVisualization = () => {
  const [selectedMetric, setSelectedMetric] = useState<ConfidenceMetric>(mockMetrics[0]);
  const [viewMode, setViewMode] = useState<'overview' | 'detailed'>('overview');

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 80) return 'text-validation-high';
    if (confidence >= 50) return 'text-validation-medium';
    return 'text-validation-low';
  };

  const getConfidenceBg = (confidence: number) => {
    if (confidence >= 80) return 'bg-validation-high';
    if (confidence >= 50) return 'bg-validation-medium';
    return 'bg-validation-low';
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'high': return <CheckCircle className="h-4 w-4 text-validation-high" />;
      case 'medium': return <AlertTriangle className="h-4 w-4 text-validation-medium" />;
      case 'low': return <XCircle className="h-4 w-4 text-validation-low" />;
      case 'pending': return <Clock className="h-4 w-4 text-muted-foreground" />;
      default: return null;
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'increasing': return <TrendingUp className="h-3 w-3 text-validation-high" />;
      case 'decreasing': return <TrendingUp className="h-3 w-3 text-validation-low transform rotate-180" />;
      case 'stable': return <Target className="h-3 w-3 text-muted-foreground" />;
      default: return null;
    }
  };

  const overallStats = {
    totalClaims: mockMetrics.length,
    averageConfidence: Math.round(mockMetrics.reduce((acc, m) => acc + m.overallConfidence, 0) / mockMetrics.length),
    highConfidence: mockMetrics.filter(m => m.overallConfidence >= 80).length,
    totalSources: mockMetrics.reduce((acc, m) => acc + m.sourceCount, 0)
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <BarChart3 className="h-6 w-6 text-socratic-blue" />
            Confidence Metrics
          </h2>
          <p className="text-muted-foreground">
            Real-time validation confidence with source-based scoring
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          <Button variant="outline" size="sm">
            <Target className="h-4 w-4 mr-2" />
            Recalibrate
          </Button>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Claims</p>
                <p className="text-2xl font-bold">{overallStats.totalClaims}</p>
              </div>
              <Target className="h-8 w-8 text-socratic-blue" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Avg Confidence</p>
                <p className={`text-2xl font-bold ${getConfidenceColor(overallStats.averageConfidence)}`}>
                  {overallStats.averageConfidence}%
                </p>
              </div>
              <BarChart3 className="h-8 w-8 text-socratic-blue" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">High Confidence</p>
                <p className="text-2xl font-bold text-validation-high">{overallStats.highConfidence}</p>
              </div>
              <Shield className="h-8 w-8 text-validation-high" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Sources</p>
                <p className="text-2xl font-bold">{overallStats.totalSources}</p>
              </div>
              <Award className="h-8 w-8 text-socratic-blue" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">Confidence Overview</TabsTrigger>
          <TabsTrigger value="breakdown">Source Breakdown</TabsTrigger>
          <TabsTrigger value="trends">Validation Trends</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Claims List with Metrics */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Claims Confidence</CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[400px]">
                  <div className="space-y-4">
                    {mockMetrics.map((metric) => (
                      <div
                        key={metric.claimId}
                        className={`p-4 rounded-lg border cursor-pointer transition-all ${
                          selectedMetric.claimId === metric.claimId 
                            ? 'border-socratic-blue bg-socratic-blue/5' 
                            : 'hover:border-socratic-blue/50'
                        }`}
                        onClick={() => setSelectedMetric(metric)}
                      >
                        <div className="flex items-start gap-3 mb-3">
                          {getStatusIcon(metric.status)}
                          <div className="flex-1">
                            <p className="text-sm font-medium mb-2">{metric.claim}</p>
                            <div className="flex items-center gap-2 mb-2">
                              <Badge className={`${getConfidenceBg(metric.overallConfidence)} text-white`}>
                                {metric.overallConfidence}%
                              </Badge>
                              <Badge variant="outline" className="text-xs">
                                {metric.sourceCount}/{metric.targetSources} sources
                              </Badge>
                              {getTrendIcon(metric.trend)}
                            </div>
                          </div>
                        </div>
                        
                        {/* Confidence Progress Bar */}
                        <div className="space-y-1">
                          <div className="flex justify-between text-xs">
                            <span>Confidence</span>
                            <span>{metric.overallConfidence}%</span>
                          </div>
                          <Progress 
                            value={metric.overallConfidence} 
                            className="h-2"
                          />
                        </div>

                        {/* Source Progress */}
                        <div className="space-y-1 mt-2">
                          <div className="flex justify-between text-xs">
                            <span>Sources</span>
                            <span>{metric.sourceCount}/{metric.targetSources}</span>
                          </div>
                          <Progress 
                            value={(metric.sourceCount / metric.targetSources) * 100} 
                            className="h-1"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>

            {/* Detailed Metrics */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Detailed Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {/* Selected Claim Header */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      {getStatusIcon(selectedMetric.status)}
                      <Badge className={`${getConfidenceBg(selectedMetric.overallConfidence)} text-white`}>
                        {selectedMetric.overallConfidence}% Confidence
                      </Badge>
                      {getTrendIcon(selectedMetric.trend)}
                    </div>
                    <p className="text-sm font-medium">{selectedMetric.claim}</p>
                    <p className="text-xs text-muted-foreground">
                      Last updated: {selectedMetric.lastUpdate} • Depth: {selectedMetric.validationDepth}
                    </p>
                  </div>

                  {/* Confidence Breakdown */}
                  <div className="space-y-4">
                    <h4 className="font-medium">Source Analysis</h4>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Full Confirmations</span>
                          <span className="font-medium">{selectedMetric.breakdown.fullConfirmations}</span>
                        </div>
                        <Progress value={(selectedMetric.breakdown.fullConfirmations / selectedMetric.sourceCount) * 100} className="h-2" />
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Partial Support</span>
                          <span className="font-medium">{selectedMetric.breakdown.partialConfirmations}</span>
                        </div>
                        <Progress value={(selectedMetric.breakdown.partialConfirmations / selectedMetric.sourceCount) * 100} className="h-2" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Source Credibility Score</span>
                        <span className="font-medium">{selectedMetric.breakdown.credibilityScore}%</span>
                      </div>
                      <Progress value={selectedMetric.breakdown.credibilityScore} className="h-2" />
                    </div>
                  </div>

                  {/* Confidence Formula */}
                  <div className="bg-muted/30 p-3 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Info className="h-4 w-4 text-socratic-blue" />
                      <span className="text-sm font-medium">Confidence Formula</span>
                    </div>
                    <div className="text-xs text-muted-foreground space-y-1">
                      <p>Base Score: (Full × 100 + Partial × 50) / Target Sources</p>
                      <p>Credibility Weight: Source credibility average</p>
                      <p>Final: (Base Score × Credibility Weight) / 100</p>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      <Zap className="h-3 w-3 mr-1" />
                      Deep Validate
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      <RefreshCw className="h-3 w-3 mr-1" />
                      Recalculate
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="breakdown">
          <Card>
            <CardContent className="pt-6">
              <div className="text-center text-muted-foreground py-8">
                <BarChart3 className="h-8 w-8 mx-auto mb-2 opacity-50" />
                <p>Source breakdown analysis will be displayed here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="trends">
          <Card>
            <CardContent className="pt-6">
              <div className="text-center text-muted-foreground py-8">
                <TrendingUp className="h-8 w-8 mx-auto mb-2 opacity-50" />
                <p>Validation trends and historical confidence data</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};