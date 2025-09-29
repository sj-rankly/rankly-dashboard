import React from 'react'
import { UnifiedCard, UnifiedCardContent } from '@/components/ui/unified-card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { ChevronRight, Settings, ChevronDown } from 'lucide-react'

// Mock data for topic rankings
const topicData = [
  {
    topic: 'Conversion Rate Optimization',
    status: 'Needs work',
    statusColor: 'bg-red-500',
    rankings: [
      { rank: 1, logo: '🎯', name: 'Fibr' },
      { rank: 2, logo: '🟣', name: 'VWO' },
      { rank: 3, logo: '🔴', name: 'Dynamic Yield' },
      { rank: 4, logo: '💡', name: 'Intellimize' },
      { rank: 5, logo: '🔵', name: 'Optimizely' },
      { rank: 6, logo: '🟠', name: 'Adobe' },
      { rank: 7, logo: '🟢', name: 'HubSpot' },
      { rank: 8, logo: '⚫', name: 'Google' },
      { rank: 9, logo: '🟡', name: 'Unbounce' },
      { rank: 10, logo: '🔵', name: 'Instapage' },
    ]
  },
  {
    topic: 'Personalization',
    status: 'Leader',
    statusColor: 'bg-green-500',
    rankings: [
      { rank: 1, logo: '🎯', name: 'Fibr' },
      { rank: 2, logo: '🔴', name: 'Dynamic Yield' },
      { rank: 3, logo: '🟣', name: 'VWO' },
      { rank: 4, logo: '🔵', name: 'Google' },
      { rank: 5, logo: '💡', name: 'Intellimize' },
      { rank: 6, logo: '🟠', name: 'Optimizely' },
      { rank: 7, logo: '🟢', name: 'HubSpot' },
      { rank: 8, logo: '⚫', name: 'Adobe' },
      { rank: 9, logo: '🟡', name: 'Unbounce' },
      { rank: 10, logo: '🔵', name: 'Instapage' },
    ]
  },
  {
    topic: 'A/B Testing',
    status: 'Strong',
    statusColor: 'bg-blue-500',
    rankings: [
      { rank: 1, logo: '🟣', name: 'VWO' },
      { rank: 2, logo: '🎯', name: 'Fibr' },
      { rank: 3, logo: '🔵', name: 'Optimizely' },
      { rank: 4, logo: '🔴', name: 'Dynamic Yield' },
      { rank: 5, logo: '💡', name: 'Intellimize' },
      { rank: 6, logo: '🟠', name: 'Adobe' },
      { rank: 7, logo: '🟢', name: 'HubSpot' },
      { rank: 8, logo: '⚫', name: 'Google' },
      { rank: 9, logo: '🟡', name: 'Unbounce' },
      { rank: 10, logo: '🔵', name: 'Instapage' },
    ]
  }
]

function UnifiedTopicRankingsSection() {
  return (
    <div className="w-full space-y-4">
      {/* Header Section - Outside the box */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold leading-none tracking-tight text-foreground">Visibility Rankings By Topic</h2>
          <p className="text-sm text-muted-foreground mt-2">
            Fibr&apos;s visibility rankings compared to AI-CRO Technology brands by topic
          </p>
        </div>
        
        {/* Chart Config Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="text-sm">
              <Settings className="mr-2 h-4 w-4" />
              Chart Config
              <ChevronDown className="ml-2 h-3 w-3" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Table View</DropdownMenuItem>
            <DropdownMenuItem>Grid View</DropdownMenuItem>
            <DropdownMenuItem>List View</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Main Content Box */}
      <UnifiedCard className="w-full">
        <UnifiedCardContent className="p-4">
          <div className="space-y-4">
            {/* Table Header */}
            <div className="grid grid-cols-12 gap-4 items-center text-sm font-medium text-muted-foreground border-b border-border/60 pb-3">
              <div className="col-span-2">Topics</div>
              <div className="col-span-1 text-center">#1</div>
              <div className="col-span-1 text-center">#2</div>
              <div className="col-span-1 text-center">#3</div>
              <div className="col-span-1 text-center">#4</div>
              <div className="col-span-1 text-center">#5</div>
              <div className="col-span-1 text-center">#6</div>
              <div className="col-span-1 text-center">#7</div>
              <div className="col-span-1 text-center">#8</div>
              <div className="col-span-1 text-center">#9</div>
              <div className="col-span-1 text-center">#10</div>
            </div>

            {/* Topic Rows */}
            {topicData.map((topic, index) => (
              <div key={topic.topic} className="grid grid-cols-12 gap-4 items-center py-3 border-b border-border/30 last:border-b-0">
                {/* Topic Column */}
                <div className="col-span-2 flex items-center gap-3">
                  <ChevronRight className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm font-medium text-foreground">{topic.topic}</span>
                  <Badge 
                    variant="outline" 
                    className={`text-xs px-2 py-1 text-white ${topic.statusColor} border-0`}
                  >
                    {topic.status}
                  </Badge>
                </div>

                {/* Ranking Columns */}
                {topic.rankings.map((ranking) => (
                  <div key={`${topic.topic}-${ranking.rank}`} className="col-span-1 flex justify-center">
                    <div className="w-8 h-8 flex items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-full">
                      <span className="text-sm">{ranking.logo}</span>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </UnifiedCardContent>
      </UnifiedCard>
    </div>
  )
}

export { UnifiedTopicRankingsSection }
