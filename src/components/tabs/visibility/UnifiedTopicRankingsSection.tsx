import React from 'react'
import { UnifiedCard, UnifiedCardContent } from '@/components/ui/unified-card'
import { getDynamicFaviconUrl, handleFaviconError } from '@/lib/faviconUtils'
import { useSkeletonLoading } from '@/components/ui/with-skeleton-loading'
import { SkeletonWrapper } from '@/components/ui/skeleton-wrapper'
import { UnifiedCardSkeleton } from '@/components/ui/unified-card-skeleton'

// Mock data for topic rankings
const topicData = [
  {
    topic: 'Conversion Rate Optimization',
    status: 'Needs work',
    statusColor: 'bg-red-500',
    rankings: [
      { rank: 1, name: 'JPMorgan Chase' },
      { rank: 2, name: 'Bank of America' },
      { rank: 3, name: 'Wells Fargo' },
      { rank: 4, name: 'Citibank' },
      { rank: 5, name: 'US Bank', isOwner: true },
      { rank: 6, name: 'NextGen Solutions' },
      { rank: 7, name: 'Future Systems' },
      { rank: 8, name: 'Digital Dynamics' },
      { rank: 9, name: 'CloudFirst Inc' },
      { rank: 10, name: 'AI Solutions Pro' },
    ]
  },
  {
    topic: 'Personalization',
    status: 'Leader',
    statusColor: 'bg-green-500',
    rankings: [
      { rank: 1, name: 'TechVision Corp' },
      { rank: 2, name: 'JPMorgan Chase' },
      { rank: 3, name: 'Bank of America' },
      { rank: 4, name: 'Wells Fargo' },
      { rank: 5, name: 'Citibank' },
      { rank: 6, name: 'US Bank' },
      { rank: 7, name: 'NextGen Solutions' },
      { rank: 8, name: 'Future Systems' },
      { rank: 9, name: 'Digital Dynamics' },
      { rank: 10, name: 'CloudFirst Inc' },
    ]
  },
]

interface UnifiedTopicRankingsSectionProps {
  filterContext?: {
    selectedTopics: string[]
    selectedPersonas: string[]
    selectedPlatforms: string[]
  }
}

function UnifiedTopicRankingsSection({ filterContext }: UnifiedTopicRankingsSectionProps) {
  const { showSkeleton, isVisible } = useSkeletonLoading(filterContext)

  return (
    <SkeletonWrapper
      show={showSkeleton}
      isVisible={isVisible}
      skeleton={<UnifiedCardSkeleton type="table" tableColumns={3} tableRows={4} />}
    >
      <div className="w-full space-y-4">
      {/* Header Section - Outside the box */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold leading-none tracking-tight text-foreground">Visibility Ranking by Topic</h2>
          <p className="text-sm text-muted-foreground mt-2">
            Your brand&apos;s visibility ranking across different topics
          </p>
        </div>
        
      </div>

      {/* Main Content Box */}
      <UnifiedCard className="w-full">
        <UnifiedCardContent className="p-6">
          <div className="space-y-4">
            {/* Table Header */}
            <div className="grid grid-cols-7 gap-4 items-center text-sm font-medium text-muted-foreground border-b border-border/60 pb-3">
              <div className="col-span-2">Topics</div>
              <div className="col-span-1 text-center">#1</div>
              <div className="col-span-1 text-center">#2</div>
              <div className="col-span-1 text-center">#3</div>
              <div className="col-span-1 text-center">#4</div>
              <div className="col-span-1 text-center">#5</div>
            </div>

            {/* Topic Rows */}
            {topicData.map((topic, index) => (
              <div key={topic.topic} className="grid grid-cols-7 gap-4 items-center py-3 border-b border-border/30 last:border-b-0">
                {/* Topic Column */}
                <div className="col-span-2 flex items-center gap-3">
                  <span className="text-sm font-medium text-foreground">{topic.topic}</span>
                </div>

                {/* Ranking Columns */}
                {topic.rankings.slice(0, 5).map((ranking) => (
                  <div key={`${topic.topic}-${ranking.rank}`} className="col-span-1 flex justify-center">
                    <div className="w-20 h-8 flex items-center justify-center rounded-full px-2">
                      <div className="flex items-center gap-1">
                        <img
                          src={getDynamicFaviconUrl(ranking.name)}
                          alt={ranking.name}
                          className="w-3 h-3 rounded-sm"
                          onError={handleFaviconError}
                        />
                        <span 
                          className="text-xs font-medium truncate" 
                          style={{color: ranking.isOwner ? '#2563EB' : 'inherit'}}
                        >
                          {ranking.name}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </UnifiedCardContent>
      </UnifiedCard>
    </div>
    </SkeletonWrapper>
  )
}

export { UnifiedTopicRankingsSection }
