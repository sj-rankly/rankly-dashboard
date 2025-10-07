import React from 'react'
import { UnifiedCard, UnifiedCardContent } from '@/components/ui/unified-card'
import { getDynamicFaviconUrl, handleFaviconError } from '@/lib/faviconUtils'
import { useSkeletonLoading } from '@/components/ui/with-skeleton-loading'
import { SkeletonWrapper } from '@/components/ui/skeleton-wrapper'
import { UnifiedCardSkeleton } from '@/components/ui/unified-card-skeleton'

// Mock data for persona rankings
const personaData = [
  {
    persona: 'Marketing Manager',
    status: 'Leader',
    statusColor: 'bg-green-500',
    rankings: [
      { rank: 1, name: 'Citibank' },
      { rank: 2, name: 'JPMorgan Chase' },
      { rank: 3, name: 'Wells Fargo' },
      { rank: 4, name: 'Bank of America' },
      { rank: 5, name: 'US Bank', isOwner: true },
      { rank: 6, name: 'NextGen Solutions' },
      { rank: 7, name: 'Future Systems' },
      { rank: 8, name: 'Digital Dynamics' },
      { rank: 9, name: 'CloudFirst Inc' },
      { rank: 10, name: 'AI Solutions Pro' },
    ]
  },
  {
    persona: 'Product Manager',
    status: 'Needs work',
    statusColor: 'bg-red-500',
    rankings: [
      { rank: 1, name: 'JPMorgan Chase' },
      { rank: 2, name: 'Bank of America' },
      { rank: 3, name: 'Wells Fargo' },
      { rank: 4, name: 'Citibank' },
      { rank: 5, name: 'NextGen Solutions' },
      { rank: 6, name: 'US Bank', isOwner: true },
      { rank: 7, name: 'Future Systems' },
      { rank: 8, name: 'Digital Dynamics' },
      { rank: 9, name: 'CloudFirst Inc' },
      { rank: 10, name: 'AI Solutions Pro' },
    ]
  },
]

interface UnifiedPersonaRankingsSectionProps {
  filterContext?: {
    selectedTopics: string[]
    selectedPersonas: string[]
    selectedPlatforms: string[]
  }
}

function UnifiedPersonaRankingsSection({ filterContext }: UnifiedPersonaRankingsSectionProps) {
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
          <h2 className="text-xl font-semibold leading-none tracking-tight text-foreground">Visibility Ranking by User Personas</h2>
          <p className="text-sm text-muted-foreground mt-2">
            Your brand&apos;s visibility ranking across different user personas
          </p>
        </div>
        
      </div>

      {/* Main Content Box */}
      <UnifiedCard className="w-full">
        <UnifiedCardContent className="p-6">
          <div className="space-y-4">
            {/* Table Header */}
            <div className="grid grid-cols-7 gap-4 items-center text-sm font-medium text-muted-foreground border-b border-border/60 pb-3">
              <div className="col-span-2">User Personas</div>
              <div className="col-span-1 text-center">#1</div>
              <div className="col-span-1 text-center">#2</div>
              <div className="col-span-1 text-center">#3</div>
              <div className="col-span-1 text-center">#4</div>
              <div className="col-span-1 text-center">#5</div>
            </div>

            {/* Persona Rows */}
            {personaData.map((persona, index) => (
              <div key={persona.persona} className="grid grid-cols-7 gap-4 items-center py-3 border-b border-border/30 last:border-b-0">
                {/* Persona Column */}
                <div className="col-span-2 flex items-center gap-3">
                  <span className="text-sm font-medium text-foreground">{persona.persona}</span>
                </div>

                {/* Ranking Columns */}
                {persona.rankings.slice(0, 5).map((ranking) => (
                  <div key={`${persona.persona}-${ranking.rank}`} className="col-span-1 flex justify-center">
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

export { UnifiedPersonaRankingsSection }

