import React from 'react'
import { UnifiedCard, UnifiedCardContent } from '@/components/ui/unified-card'
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Info, Settings, ChevronDown } from 'lucide-react'
import { useState } from 'react'

// Mock data for Average Position
const chartData = [
  { name: 'Shopify', score: 1.7, logo: '🛍️' },
  { name: 'Fibr', score: 1.8, logo: '👁️' },
  { name: 'Chorus', score: 2.0, logo: '🛡️' },
  { name: 'Google', score: 2.0, logo: '🔵' },
  { name: 'Optimizely', score: 2.1, logo: '🟠' },
]

const rankings = [
  { rank: 1, name: 'Shopify', logo: '🛍️', score: '1.7', isOwner: false },
  { rank: 2, name: 'Fibr', logo: '👁️', score: '1.8', isOwner: true },
  { rank: 3, name: 'Chorus', logo: '🛡️', score: '2', isOwner: false },
  { rank: 4, name: 'Google', logo: '🔵', score: '2', isOwner: false },
  { rank: 5, name: 'Optimizely', logo: '🟠', score: '2.1', isOwner: false },
]

function UnifiedAveragePositionSection() {
  const [hoveredBar, setHoveredBar] = useState<{ name: string; score: string; logo: string; x: number; y: number } | null>(null)

  return (
    <div className="w-full space-y-4">
      {/* Header Section - Outside the box */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h2 className="text-xl font-semibold leading-none tracking-tight text-foreground">Average Position</h2>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Info className="w-4 h-4 text-muted-foreground cursor-help hover:text-foreground transition-colors" />
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-sm">Shows the average position where this brand appears in AI-generated answers.</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
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
            <DropdownMenuItem>Bar Chart</DropdownMenuItem>
            <DropdownMenuItem>Line Chart</DropdownMenuItem>
            <DropdownMenuItem>Donut Chart</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      
      <p className="text-sm text-muted-foreground">
        Shows the average position where your brand appears in AI-generated answers.
      </p>

      {/* Main Content Box */}
      <UnifiedCard className="w-full">
        <UnifiedCardContent className="p-4">
        {/* Container with full-height divider */}
        <div className="relative">
          {/* Full-height vertical divider touching top and bottom */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-border/60 transform -translate-x-1/2"></div>
          
          <div className="grid grid-cols-2 gap-8">
          
          {/* Left Section: Vertical Bar Chart */}
          <div className="space-y-6">
            {/* Title and Score Display */}
            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-foreground">Average Position</h3>
              <div className="text-2xl font-bold text-foreground">1.8</div>
            </div>

            {/* Contained Bar Chart */}
            <div className="relative h-48 bg-gray-50 dark:bg-gray-900/20 rounded-lg p-3">
              {/* Y-axis labels on the left */}
              <div className="absolute left-2 top-3 bottom-3 flex flex-col justify-between text-xs text-muted-foreground">
                <span>2.3</span>
                <span>1.7</span>
                <span>1.1</span>
                <span>0.6</span>
                <span>0</span>
              </div>
              
              {/* Chart bars area */}
              <div className="ml-10 h-full flex items-end justify-between relative">
                {chartData.map((bar) => (
                  <div 
                    key={bar.name} 
                    className="flex flex-col items-center justify-end gap-2 flex-1 relative"
                    onMouseEnter={(e) => {
                      const rect = e.currentTarget.getBoundingClientRect()
                      setHoveredBar({
                        name: bar.name,
                        score: bar.score.toString(),
                        logo: bar.logo,
                        x: rect.left + rect.width / 2,
                        y: rect.top - 10
                      })
                    }}
                    onMouseLeave={() => setHoveredBar(null)}
                  >
                    {/* Score label above bar */}
                    <div className="text-xs font-medium text-foreground">
                      {bar.score}
                    </div>
                    
                    {/* Vertical Bar */}
                    <div 
                      className="w-6 bg-foreground dark:bg-foreground rounded-t-sm transition-all duration-300 hover:opacity-80 cursor-pointer"
                      style={{ 
                        height: `${(bar.score / 2.3) * 120}px`,
                        minHeight: '4px'
                      }}
                    />
                    
                    {/* Logo below bar */}
                    <div className="w-6 h-6 flex items-center justify-center">
                      <span className="text-base">{bar.logo}</span>
                    </div>
                  </div>
                ))}

                {/* Hover Card */}
                {hoveredBar && (
                  <div 
                    className="fixed z-50 bg-neutral-900 dark:bg-neutral-800 border border-neutral-700 rounded-md px-2 py-1.5 shadow-lg flex items-center gap-2 pointer-events-none"
                    style={{
                      left: `${hoveredBar.x}px`,
                      top: `${hoveredBar.y}px`,
                      transform: 'translateX(-50%) translateY(-100%)'
                    }}
                  >
                    {/* Logo */}
                    <div className="w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-xs">
                      {hoveredBar.logo}
                    </div>
                    
                    {/* Brand name and score */}
                    <div className="flex items-center gap-2">
                      <span className="text-white font-medium text-sm">{hoveredBar.name}</span>
                      <span className="text-white font-medium text-sm">{hoveredBar.score}</span>
                    </div>
                    
                    {/* Pointer */}
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-3 border-r-3 border-t-3 border-transparent border-t-neutral-900 dark:border-t-neutral-800"></div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Section: Ranking Table */}
          <div className="space-y-6 pl-8">
            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-foreground">Average Position Rank</h3>
              <div className="text-2xl font-bold text-foreground">#2</div>
            </div>

            {/* Simple Table */}
            <div className="space-y-2">
              <Table>
                <TableHeader>
                  <TableRow className="border-border/60">
                    <TableHead className="text-xs font-medium text-muted-foreground py-3 px-0">
                      Asset
                    </TableHead>
                    <TableHead className="text-right text-xs font-medium text-muted-foreground py-3 px-0">
                      Average Position
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {rankings.slice(0, 5).map((item, index) => (
                    <TableRow 
                      key={item.rank} 
                      className={`
                        border-border/60 hover:bg-muted/30 transition-colors
                        ${index !== 4 ? 'border-b border-solid border-border/30' : ''}
                      `}
                    >
                      <TableCell className="py-3 px-0">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium text-muted-foreground w-6">
                            {item.rank}.
                          </span>
                          <span className="text-lg">{item.logo}</span>
                          <div className="flex items-center gap-2">
                            <span className={`text-sm font-medium ${item.isOwner ? 'text-primary' : 'text-foreground'}`}>
                              {item.name}
                            </span>
                            {item.isOwner && (
                              <Badge variant="outline" className="text-xs h-5 px-2 border-primary text-primary bg-primary/10">
                                Owned
                              </Badge>
                            )}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-right py-3 px-0">
                        <span className="text-sm font-medium text-foreground">
                          {item.score}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {/* Expand Button */}
            <div className="flex justify-end pt-2">
              <Button variant="ghost" size="sm" className="text-sm text-muted-foreground hover:text-foreground">
                Expand
              </Button>
            </div>
          </div>
        </div>
        </div>
        </UnifiedCardContent>
      </UnifiedCard>
    </div>
  )
}

export { UnifiedAveragePositionSection }
