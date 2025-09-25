'use client'

import { UnifiedCard, UnifiedCardContent, UnifiedCardHeader, UnifiedCardTitle, UnifiedCardDescription } from '@/components/ui/unified-card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { Info } from 'lucide-react'

const chartData = [
  { name: 'Optimizely', score: 65.3, logo: '🔵' },
  { name: 'Intellimize', score: 52.7, logo: '💡' },
  { name: 'VWO', score: 41.2, logo: '〰️' },
  { name: 'Dynamic Yield', score: 35.8, logo: '⚙️' },
  { name: 'Fibr', score: 24.0, logo: '🎯' },
]

const rankings = [
  { rank: 1, name: 'Optimizely', logo: '🔵', score: '65.3%', delta: -1.2, isOwner: false },
  { rank: 2, name: 'Intellimize', logo: '💡', score: '52.7%', delta: 0, isOwner: false },
  { rank: 3, name: 'VWO', logo: '〰️', score: '41.2%', delta: -2.1, isOwner: false },
  { rank: 4, name: 'Dynamic Yield', logo: '⚙️', score: '35.8%', delta: -0.8, isOwner: false },
  { rank: 5, name: 'Unbounce', logo: '🚀', score: '28.4%', delta: 1.3, isOwner: false },
  { rank: 6, name: 'Fibr', logo: '🎯', score: '24.0%', delta: 0, isOwner: true },
]

export function UnifiedVisibilitySection() {
  return (
    <UnifiedCard className="w-full">
      <UnifiedCardHeader>
        <div className="flex items-center gap-2">
          <UnifiedCardTitle>Visibility Score Analysis</UnifiedCardTitle>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Info className="w-4 h-4 text-muted-foreground cursor-help hover:text-foreground transition-colors" />
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-sm">Comprehensive analysis of brand visibility across AI-generated answers</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <UnifiedCardDescription>
          How often your brand appears in AI-generated answers compared to competitors
        </UnifiedCardDescription>
      </UnifiedCardHeader>

      <UnifiedCardContent>
        {/* 50%-50% Split Grid with 16px gap and vertical divider */}
        <div className="grid grid-cols-2 gap-6 w-full relative">
          
          {/* Left Section: Bar Chart */}
          <div className="space-y-4 pr-6">
            {/* Current Score Display */}
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-muted-foreground">Current Score</h3>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold text-foreground">24.0%</span>
                <span className="text-sm text-muted-foreground">–</span>
              </div>
            </div>

            {/* Bar Chart with Standardized Spacing */}
            <div className="relative">
              <div className="flex items-end justify-between h-32 pb-4 border-b border-border/30">
                {chartData.map((bar, index) => (
                  <TooltipProvider key={bar.name}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div className="flex flex-col items-center cursor-pointer group">
                          {/* Standardized 24px width bars with 32px gaps */}
                          <div
                            className="w-6 bg-foreground dark:bg-foreground rounded-t-md transition-all group-hover:opacity-80"
                            style={{ 
                              height: `${(bar.score / 65.3) * 100}px`,
                              marginBottom: '8px' // Consistent 8px margin
                            }}
                          />
                          {/* Vertically centered brand icons */}
                          <div className="text-2xl mb-2">{bar.logo}</div>
                          <div className="text-xs text-muted-foreground text-center max-w-16 leading-tight">
                            {bar.name}
                          </div>
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="text-xs">{bar.name}: {bar.score}%</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                ))}
              </div>

              {/* Y-axis labels with standardized styling */}
              <div className="flex justify-between text-xs text-muted-foreground mt-2">
                <span>0%</span>
                <span>65%</span>
              </div>
            </div>
          </div>

          {/* Right Section: Ranking Table */}
          <div className="space-y-4 pl-6 relative border-l border-border/60">
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-muted-foreground">Current Rank</h3>
              <div className="text-3xl font-bold text-foreground">#6</div>
            </div>

            {/* Standardized Ranking Table */}
            <div className="space-y-2 h-32 flex flex-col">
              <h4 className="text-sm font-medium text-foreground">Competitor Rankings</h4>
              <div className="border border-border/60 rounded-lg overflow-hidden flex-1">
                <Table>
                  <TableHeader>
                    <TableRow className="border-border/60">
                      <TableHead className="text-xs font-medium text-muted-foreground py-3 px-5">
                        Asset
                      </TableHead>
                      <TableHead className="text-right text-xs font-medium text-muted-foreground py-3 px-5">
                        Score
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {rankings.slice(0, 4).map((item, index) => (
                      <TableRow 
                        key={item.rank} 
                        className={`
                          border-border/60 hover:bg-muted/30 transition-colors
                          ${index !== 3 ? 'border-b border-solid border-border/30' : ''}
                        `}
                      >
                        <TableCell className="py-2 px-4">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-medium text-muted-foreground min-w-3">
                              {item.rank}.
                            </span>
                            <span className="text-sm">{item.logo}</span>
                            <div className="flex items-center gap-2">
                              <span className={`text-xs font-medium ${item.isOwner ? 'text-primary' : 'text-foreground'}`}>
                                {item.name}
                              </span>
                              {item.isOwner && (
                                <Badge variant="outline" className="text-xs h-4 px-1.5 border-primary text-primary">
                                  Owned
                                </Badge>
                              )}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="text-right py-2 px-4">
                          <div className="flex items-center justify-end gap-1">
                            <span className="text-xs font-medium text-foreground">
                              {item.score}
                            </span>
                            {item.delta !== 0 && (
                              <span className={`text-xs font-medium ${
                                item.delta > 0 
                                  ? 'text-green-600 dark:text-green-500' 
                                  : 'text-red-600 dark:text-red-500'
                              }`}>
                                {item.delta > 0 ? `+${item.delta}%` : `${item.delta}%`}
                              </span>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>

            {/* Expand Button */}
            <div className="flex justify-end pt-1">
              <Button variant="ghost" size="sm" className="text-xs text-muted-foreground hover:text-foreground h-6 px-2">
                Expand
              </Button>
            </div>
          </div>
        </div>
      </UnifiedCardContent>
    </UnifiedCard>
  )
}
