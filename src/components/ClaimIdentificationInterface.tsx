import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  Flag, 
  Brain,
  Target,
  Zap,
  Settings,
  Plus,
  X,
  Eye,
  EyeOff,
  Lightbulb,
  Search
} from 'lucide-react';

interface DetectedClaim {
  id: string;
  text: string;
  confidence: number;
  type: 'factual' | 'statistical' | 'causal' | 'predictive';
  context: string;
  isSelected: boolean;
  autoDetected: boolean;
}

const mockDetectedClaims: DetectedClaim[] = [
  {
    id: '1',
    text: 'Large language models exhibit emergent abilities at scale',
    confidence: 95,
    type: 'factual',
    context: '...that large language models exhibit emergent abilities at scale, which fundamentally changes...',
    isSelected: true,
    autoDetected: true
  },
  {
    id: '2',
    text: 'Socratic dialogue improves AI reasoning by 40%',
    confidence: 75,
    type: 'statistical',
    context: '...research suggests that Socratic dialogue methods can improve AI reasoning performance by approximately 40%...',
    isSelected: true,
    autoDetected: true
  },
  {
    id: '3',
    text: 'Scale alone isn\'t sufficient for AI development',
    confidence: 60,
    type: 'causal',
    context: '...scale alone isn\'t sufficient - we need structured approaches to unlock the full potential...',
    isSelected: false,
    autoDetected: true
  }
];

export const ClaimIdentificationInterface = () => {
  const [detectedClaims, setDetectedClaims] = useState(mockDetectedClaims);
  const [autoDetection, setAutoDetection] = useState(true);
  const [sensitivity, setSensitivity] = useState([75]);
  const [customClaim, setCustomClaim] = useState('');
  const [selectedTypes, setSelectedTypes] = useState(['factual', 'statistical']);

  const toggleClaimSelection = (claimId: string) => {
    setDetectedClaims(prev => prev.map(claim => 
      claim.id === claimId ? { ...claim, isSelected: !claim.isSelected } : claim
    ));
  };

  const addCustomClaim = () => {
    if (customClaim.trim()) {
      const newClaim: DetectedClaim = {
        id: Date.now().toString(),
        text: customClaim,
        confidence: 50,
        type: 'factual',
        context: 'Manually added claim',
        isSelected: true,
        autoDetected: false
      };
      setDetectedClaims(prev => [...prev, newClaim]);
      setCustomClaim('');
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'factual': return 'bg-blue-100 text-blue-800';
      case 'statistical': return 'bg-green-100 text-green-800';
      case 'causal': return 'bg-purple-100 text-purple-800';
      case 'predictive': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const selectedClaims = detectedClaims.filter(claim => claim.isSelected);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Target className="h-6 w-6 text-socratic-blue" />
            Claim Identification
          </h2>
          <p className="text-muted-foreground">
            Detect and flag key claims for validation with AI-powered analysis
          </p>
        </div>
        <Badge variant="outline" className="text-sm">
          {selectedClaims.length} claims selected for validation
        </Badge>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Detection Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              Detection Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Auto-Detection Toggle */}
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <label className="text-sm font-medium">Auto-Detection</label>
                <p className="text-xs text-muted-foreground">
                  Automatically identify claims in real-time
                </p>
              </div>
              <Switch 
                checked={autoDetection} 
                onCheckedChange={setAutoDetection}
              />
            </div>

            {/* Sensitivity Slider */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium">Detection Sensitivity</label>
                <Badge variant="outline">{sensitivity[0]}%</Badge>
              </div>
              <Slider
                value={sensitivity}
                onValueChange={setSensitivity}
                max={100}
                min={10}
                step={5}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Conservative</span>
                <span>Aggressive</span>
              </div>
            </div>

            {/* Claim Types */}
            <div className="space-y-3">
              <label className="text-sm font-medium">Claim Types to Detect</label>
              <div className="grid grid-cols-2 gap-2">
                {['factual', 'statistical', 'causal', 'predictive'].map(type => (
                  <div key={type} className="flex items-center space-x-2">
                    <Switch 
                      checked={selectedTypes.includes(type)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setSelectedTypes(prev => [...prev, type]);
                        } else {
                          setSelectedTypes(prev => prev.filter(t => t !== type));
                        }
                      }}
                    />
                    <label className="text-sm capitalize">{type}</label>
                  </div>
                ))}
              </div>
            </div>

            {/* Manual Claim Addition */}
            <Separator />
            <div className="space-y-3">
              <label className="text-sm font-medium flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Add Custom Claim
              </label>
              <Textarea
                placeholder="Enter a claim to validate manually..."
                value={customClaim}
                onChange={(e) => setCustomClaim(e.target.value)}
                rows={3}
              />
              <Button 
                onClick={addCustomClaim} 
                disabled={!customClaim.trim()}
                size="sm"
                className="w-full"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Claim
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Detected Claims */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="h-5 w-5" />
              Detected Claims
              <Badge variant="secondary">{detectedClaims.length}</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[400px]">
              <div className="space-y-3">
                {detectedClaims.map((claim) => (
                  <div
                    key={claim.id}
                    className={`p-4 rounded-lg border transition-all ${
                      claim.isSelected 
                        ? 'border-socratic-blue bg-socratic-blue/5' 
                        : 'border-border hover:border-socratic-blue/50'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Switch
                          checked={claim.isSelected}
                          onCheckedChange={() => toggleClaimSelection(claim.id)}
                        />
                        <Badge className={getTypeColor(claim.type)}>
                          {claim.type}
                        </Badge>
                        {claim.autoDetected && (
                          <Badge variant="outline" className="text-xs">
                            <Zap className="h-3 w-3 mr-1" />
                            Auto
                          </Badge>
                        )}
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {claim.confidence}% confidence
                      </Badge>
                    </div>
                    
                    <p className="text-sm font-medium mb-2">{claim.text}</p>
                    
                    <div className="text-xs text-muted-foreground bg-muted/30 p-2 rounded">
                      <strong>Context:</strong> {claim.context}
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>

            {selectedClaims.length > 0 && (
              <div className="mt-4 pt-4 border-t">
                <Button className="w-full">
                  <Flag className="h-4 w-4 mr-2" />
                  Start Validation ({selectedClaims.length} claims)
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="outline" size="sm">
                <Search className="h-4 w-4 mr-2" />
                Re-scan Current Session
              </Button>
              <Button variant="outline" size="sm">
                <Lightbulb className="h-4 w-4 mr-2" />
                Suggest Claims
              </Button>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Eye className="h-4 w-4" />
              Live detection: {autoDetection ? 'Enabled' : 'Disabled'}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};