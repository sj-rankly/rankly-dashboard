// Visibility Tab Components
export { UnifiedVisibilitySection } from './UnifiedVisibilitySection'
export { UnifiedDepthOfMentionSection } from './UnifiedDepthOfMentionSection'
export { UnifiedAveragePositionSection } from './UnifiedAveragePositionSection'
export { UnifiedTopicRankingsSection } from './UnifiedTopicRankingsSection'
export { UnifiedPersonaRankingsSection } from './UnifiedPersonaRankingsSection'
export { UnifiedPerformanceInsightsSection } from './UnifiedPerformanceInsightsSection'

// Visibility Tab Main Component
import { UnifiedVisibilitySection } from './UnifiedVisibilitySection'
import { UnifiedDepthOfMentionSection } from './UnifiedDepthOfMentionSection'
import { UnifiedAveragePositionSection } from './UnifiedAveragePositionSection'
import { UnifiedTopicRankingsSection } from './UnifiedTopicRankingsSection'
import { UnifiedPersonaRankingsSection } from './UnifiedPersonaRankingsSection'
import { UnifiedPerformanceInsightsSection } from './UnifiedPerformanceInsightsSection'

interface VisibilityTabProps {
  filterContext?: {
    selectedTopics: string[]
    selectedPersonas: string[]
    selectedPlatforms: string[]
  }
}

export function VisibilityTab({ filterContext }: VisibilityTabProps) {
  return (
    <div className="space-y-6">
      {/* Unified Visibility Score Section */}
      <UnifiedVisibilitySection filterContext={filterContext} />

      {/* Unified Depth of Mention Section */}
      <UnifiedDepthOfMentionSection filterContext={filterContext} />

      {/* Unified Average Position Section */}
      <UnifiedAveragePositionSection filterContext={filterContext} />

      {/* Unified Topic Rankings Section */}
      <UnifiedTopicRankingsSection filterContext={filterContext} />

      {/* Unified Persona Rankings Section */}
      <UnifiedPersonaRankingsSection filterContext={filterContext} />

      {/* Unified Performance Insights Section */}
      <UnifiedPerformanceInsightsSection filterContext={filterContext} />
    </div>
  )
}
