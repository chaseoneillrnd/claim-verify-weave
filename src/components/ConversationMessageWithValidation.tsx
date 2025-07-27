import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  Flag, 
  CheckCircle, 
  AlertTriangle, 
  XCircle, 
  ExternalLink,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

interface ValidationIndicator {
  id: string;
  claim: string;
  confidence: number;
  status: 'high' | 'medium' | 'low' | 'pending';
  sourceCount: number;
  isExpanded?: boolean;
}

interface ConversationMessage {
  id: string;
  content: string;
  sender: string;
  timestamp: string;
  validatedClaims?: ValidationIndicator[];
}

// Mock message data
const mockMessage: ConversationMessage = {
  id: 'msg_123',
  content: `I believe that large language models exhibit emergent abilities at scale, which fundamentally changes how we should approach AI development. These emergent capabilities aren't just incremental improvements - they represent qualitative shifts in what these models can accomplish.

Furthermore, research suggests that Socratic dialogue methods can improve AI reasoning performance by approximately 40%, making them particularly valuable for educational and research applications. This approach aligns with classical philosophical traditions while leveraging modern AI capabilities.

The key insight is that scale alone isn't sufficient - we need structured approaches to unlock the full potential of these systems.`,
  sender: 'Claude',
  timestamp: '2025-01-27T10:30:00Z',
  validatedClaims: [
    {
      id: '1',
      claim: 'Large language models exhibit emergent abilities at scale',
      confidence: 85,
      status: 'high',
      sourceCount: 4,
      isExpanded: false
    },
    {
      id: '2', 
      claim: 'Socratic dialogue improves AI reasoning by 40%',
      confidence: 45,
      status: 'medium',
      sourceCount: 2,
      isExpanded: false
    }
  ]
};

export const ConversationMessageWithValidation = () => {
  const [message, setMessage] = useState(mockMessage);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'high': return <CheckCircle className="h-3 w-3 text-validation-high" />;
      case 'medium': return <AlertTriangle className="h-3 w-3 text-validation-medium" />;
      case 'low': return <XCircle className="h-3 w-3 text-validation-low" />;
      default: return null;
    }
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 80) return 'validation-high';
    if (confidence >= 50) return 'validation-medium';
    return 'validation-low';
  };

  const highlightClaims = (content: string, claims: ValidationIndicator[]) => {
    let highlightedContent = content;
    
    claims.forEach((claim, index) => {
      const claimText = claim.claim;
      const confidenceColor = getConfidenceColor(claim.confidence);
      
      // Simple highlighting - in real implementation, this would be more sophisticated
      highlightedContent = highlightedContent.replace(
        claimText,
        `<span class="relative inline-block">
          <span class="bg-${confidenceColor}/20 border-b-2 border-${confidenceColor} px-1 py-0.5 rounded cursor-pointer hover:bg-${confidenceColor}/30 transition-colors" data-claim-id="${claim.id}">
            ${claimText}
          </span>
          <span class="absolute -top-1 -right-1 h-2 w-2 bg-${confidenceColor} rounded-full"></span>
        </span>`
      );
    });
    
    return highlightedContent;
  };

  const toggleClaimExpanded = (claimId: string) => {
    setMessage(prev => ({
      ...prev,
      validatedClaims: prev.validatedClaims?.map(claim =>
        claim.id === claimId ? { ...claim, isExpanded: !claim.isExpanded } : claim
      )
    }));
  };

  return (
    <Card className="w-full max-w-4xl">
      <CardContent className="p-6">
        {/* Message Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 bg-socratic-blue rounded-full flex items-center justify-center text-sm font-medium text-white">
              C
            </div>
            <div>
              <div className="font-medium">{message.sender}</div>
              <div className="text-xs text-muted-foreground">
                {new Date(message.timestamp).toLocaleTimeString()}
              </div>
            </div>
          </div>
          
          {/* Validation Summary */}
          {message.validatedClaims && message.validatedClaims.length > 0 && (
            <div className="flex items-center gap-2">
              <Flag className="h-4 w-4 text-muted-foreground" />
              <Badge variant="outline" className="text-xs">
                {message.validatedClaims.length} claims validated
              </Badge>
            </div>
          )}
        </div>

        {/* Message Content */}
        <div className="prose prose-sm max-w-none mb-4">
          <div 
            dangerouslySetInnerHTML={{
              __html: message.validatedClaims 
                ? highlightClaims(message.content, message.validatedClaims)
                : message.content
            }}
            className="whitespace-pre-wrap text-sm leading-relaxed"
          />
        </div>

        {/* Validation Details */}
        {message.validatedClaims && message.validatedClaims.length > 0 && (
          <>
            <Separator className="my-4" />
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm font-medium">
                <Flag className="h-4 w-4" />
                Claim Validation Results
              </div>
              
              <div className="space-y-2">
                {message.validatedClaims.map((claim) => (
                  <div key={claim.id} className="border rounded-lg p-3 space-y-2">
                    <div 
                      className="flex items-center justify-between cursor-pointer"
                      onClick={() => toggleClaimExpanded(claim.id)}
                    >
                      <div className="flex items-center gap-2 flex-1">
                        {getStatusIcon(claim.status)}
                        <span className="text-sm font-medium truncate">
                          {claim.claim}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge 
                          variant="secondary"
                          className={`text-xs text-${getConfidenceColor(claim.confidence)}-foreground bg-${getConfidenceColor(claim.confidence)}`}
                        >
                          {claim.confidence}%
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          {claim.sourceCount} sources
                        </span>
                        {claim.isExpanded ? 
                          <ChevronUp className="h-4 w-4" /> : 
                          <ChevronDown className="h-4 w-4" />
                        }
                      </div>
                    </div>
                    
                    {claim.isExpanded && (
                      <div className="pt-2 border-t space-y-2">
                        <div className="text-xs text-muted-foreground">
                          Validation based on {claim.sourceCount} academic sources including peer-reviewed papers and institutional reports.
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" className="text-xs h-7">
                            <ExternalLink className="h-3 w-3 mr-1" />
                            View Sources
                          </Button>
                          <Button variant="outline" size="sm" className="text-xs h-7">
                            Re-validate
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
              
              <div className="flex justify-between items-center pt-2">
                <Button variant="ghost" size="sm" className="text-xs">
                  Flag Additional Claims
                </Button>
                <Button variant="outline" size="sm" className="text-xs">
                  Export Validation Report
                </Button>
              </div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};