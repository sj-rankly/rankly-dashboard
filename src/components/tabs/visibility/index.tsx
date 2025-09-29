// Visibility Tab Components
export { UnifiedVisibilitySection } from './UnifiedVisibilitySection'
export { UnifiedDepthOfMentionSection } from './UnifiedDepthOfMentionSection'
export { UnifiedAveragePositionSection } from './UnifiedAveragePositionSection'
export { UnifiedTopicRankingsSection } from './UnifiedTopicRankingsSection'
export { ShareOfVoiceCard } from './ShareOfVoiceCard'

// Visibility Tab Main Component
import { UnifiedVisibilitySection } from './UnifiedVisibilitySection'
import { UnifiedDepthOfMentionSection } from './UnifiedDepthOfMentionSection'
import { UnifiedAveragePositionSection } from './UnifiedAveragePositionSection'
import { UnifiedTopicRankingsSection } from './UnifiedTopicRankingsSection'
import { ShareOfVoiceCard } from './ShareOfVoiceCard'

export function VisibilityTab() {
  return (
    <div className="space-y-6">
      {/* Unified Visibility Score Section */}
      <UnifiedVisibilitySection />

      {/* Unified Depth of Mention Section */}
      <UnifiedDepthOfMentionSection />

      {/* Share of Voice Section - Full Width */}
      <ShareOfVoiceCard />

      {/* Unified Average Position Section */}
      <UnifiedAveragePositionSection />

      {/* Unified Topic Rankings Section */}
      <UnifiedTopicRankingsSection />
    </div>
  )
}
