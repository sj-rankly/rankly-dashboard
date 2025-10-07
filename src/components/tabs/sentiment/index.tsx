// Sentiment Tab Components
export { SentimentAnalysisSection } from './SentimentAnalysisSection'
export { SentimentTopicsTable } from './SentimentTopicsTable'
export { UnifiedSentimentSection } from './UnifiedSentimentSection'
export { SentimentBreakdownSection } from './SentimentBreakdownSection'
export { UnifiedPerformanceInsightsSection } from '../visibility/UnifiedPerformanceInsightsSection'

// Sentiment Tab Main Component
import { UnifiedSentimentSection } from './UnifiedSentimentSection'
import { SentimentBreakdownSection } from './SentimentBreakdownSection'
import { UnifiedPerformanceInsightsSection } from '../visibility/UnifiedPerformanceInsightsSection'

interface SentimentTabProps {
  filterContext?: {
    selectedTopics: string[]
    selectedPersonas: string[]
    selectedPlatforms: string[]
  }
}

export function SentimentTab({ filterContext }: SentimentTabProps) {
  return (
    <div className="space-y-6">
      <UnifiedSentimentSection filterContext={filterContext} />
      
      {/* Sentiment Breakdown Section */}
      <SentimentBreakdownSection filterContext={filterContext} />
      
      {/* Performance Insights Section */}
      <UnifiedPerformanceInsightsSection filterContext={filterContext} />
    </div>
  )
}
