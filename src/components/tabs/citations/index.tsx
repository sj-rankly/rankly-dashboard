// Citations Tab Components
export { CitationShareSection } from './CitationShareSection'
export { CitationTypesSection } from './CitationTypesSection'
export { CitationTypesDetailSection } from './CitationTypesDetailSection'
export { UnifiedPerformanceInsightsSection } from '../visibility/UnifiedPerformanceInsightsSection'

// Citations Tab Main Component
import { CitationShareSection } from './CitationShareSection'
import { CitationTypesSection } from './CitationTypesSection'
import { CitationTypesDetailSection } from './CitationTypesDetailSection'
import { UnifiedPerformanceInsightsSection } from '../visibility/UnifiedPerformanceInsightsSection'

interface CitationsTabProps {
  filterContext?: {
    selectedTopics: string[]
    selectedPersonas: string[]
    selectedPlatforms: string[]
  }
}

export function CitationsTab({ filterContext }: CitationsTabProps) {
  return (
    <div className="space-y-6">
      <CitationShareSection filterContext={filterContext} />
      <CitationTypesSection filterContext={filterContext} />
      <CitationTypesDetailSection filterContext={filterContext} />
      
      {/* Performance Insights Section */}
      <UnifiedPerformanceInsightsSection filterContext={filterContext} />
    </div>
  )
}
