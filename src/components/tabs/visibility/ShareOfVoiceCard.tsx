'use client'

import { UnifiedCard, UnifiedCardContent } from '@/components/ui/unified-card'
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Info, ArrowUp, ArrowDown, Minus, Settings, ChevronDown } from 'lucide-react'
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts'
import { useState } from 'react'

const pieData = [
  { name: 'Optimizely', value: 10.6, color: '#3B82F6' },
  { name: 'Intellimize', value: 10.2, color: '#06B6D4' },
  { name: 'VWO', value: 7.5, color: '#8B5CF6' },
  { name: 'Dynamic Yield', value: 5.7, color: '#EF4444' },
  { name: 'Fibr', value: 1.9, color: '#10B981' },
  { name: 'Others', value: 64.1, color: '#9CA3AF' },
]

const rankings = [
  { rank: 1, name: 'Optimizely', logo: '🔵', score: '10.6%', trend: 'down', change: '-0.3%' },
  { rank: 2, name: 'Intellimize', logo: '🟦', score: '10.2%', trend: 'down', change: '-0.1%' },
  { rank: 3, name: 'VWO', logo: '〰️', score: '7.5%', trend: 'down', change: '-0.2%' },
  { rank: 4, name: 'Dynamic Yield', logo: '🔴', score: '5.7%', trend: 'down', change: '-0.1%' },
  { rank: 16, name: 'Fibr', logo: '🎯', score: '1.9%', trend: 'stable', change: '0.0%', isOwned: true },
]

const getTrendIcon = (trend: string) => {
  switch (trend) {
    case 'up':
      return <ArrowUp className="w-3 h-3 text-green-600" />
    case 'down':
      return <ArrowDown className="w-3 h-3 text-red-600" />
    case 'stable':
      return <Minus className="w-3 h-3 text-gray-500" />
    default:
      return null
  }
}

const getTrendColor = (trend: string) => {
  switch (trend) {
    case 'up':
      return 'text-green-600'
    case 'down':
      return 'text-red-600'
    case 'stable':
      return 'text-gray-500'
    default:
      return 'text-gray-500'
  }
}

export function ShareOfVoiceCard() {
  const [hoveredSegment, setHoveredSegment] = useState<{ name: string; value: string; color: string; x: number; y: number } | null>(null)

  return (
    <div className="w-full space-y-4">
      {/* Header Section - Outside the box */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h2 className="text-xl font-semibold leading-none tracking-tight text-foreground">Share of Voice</h2>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Info className="w-4 h-4 text-muted-foreground cursor-help hover:text-foreground transition-colors" />
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-sm">Mentions of your brand in AI-generated answers in relation to competitors</p>
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
            <DropdownMenuItem>Donut Chart</DropdownMenuItem>
            <DropdownMenuItem>Bar Chart</DropdownMenuItem>
            <DropdownMenuItem>Line Chart</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      
      <p className="text-sm text-muted-foreground">
        Mentions of your brand in AI-generated answers in relation to competitors
      </p>

      {/* Main Content Box */}
      <UnifiedCard className="w-full">
        <UnifiedCardContent className="p-4">
        {/* Container with full-height divider */}
        <div className="relative">
          {/* Full-height vertical divider touching top and bottom */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-border/60 transform -translate-x-1/2"></div>
          
          <div className="grid grid-cols-2 gap-8">
          
          {/* Left Section: Donut Chart */}
          <div className="space-y-6">
            {/* Title and Score Display */}
            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-foreground">Share of Voice</h3>
              <div className="text-2xl font-bold text-foreground">1.9%</div>
            </div>

            {/* Contained Donut Chart */}
            <div className="relative h-48 bg-gray-50 dark:bg-gray-900/20 rounded-lg p-3">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={70}
                    paddingAngle={1}
                    dataKey="value"
                    onMouseEnter={(data, index, event) => {
                      const target = event.target as HTMLElement
                      const rect = target.getBoundingClientRect()
                      setHoveredSegment({
                        name: data.name,
                        value: `${data.value}%`,
                        color: data.color,
                        x: rect.left + rect.width / 2,
                        y: rect.top - 10
                      })
                    }}
                    onMouseLeave={() => setHoveredSegment(null)}
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>

              {/* Hover Card */}
              {hoveredSegment && (
                <div 
                  className="fixed z-50 bg-neutral-900 dark:bg-neutral-800 border border-neutral-700 rounded-md px-2 py-1.5 shadow-lg flex items-center gap-2 pointer-events-none"
                  style={{
                    left: `${hoveredSegment.x}px`,
                    top: `${hoveredSegment.y}px`,
                    transform: 'translateX(-50%) translateY(-100%)'
                  }}
                >
                  {/* Color indicator */}
                  <div 
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: hoveredSegment.color }}
                  ></div>
                  
                  {/* Brand name and score */}
                  <div className="flex items-center gap-2">
                    <span className="text-white font-medium text-sm">{hoveredSegment.name}</span>
                    <span className="text-white font-medium text-sm">{hoveredSegment.value}</span>
                  </div>
                  
                  {/* Pointer */}
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-3 border-r-3 border-t-3 border-transparent border-t-neutral-900 dark:border-t-neutral-800"></div>
                </div>
              )}
            </div>
          </div>

          {/* Right Section: Ranking Table */}
          <div className="space-y-6 pl-8">
            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-foreground">Share of Voice Rank</h3>
              <div className="text-2xl font-bold text-foreground">#16</div>
            </div>

            {/* Standardized Table */}
            <div className="space-y-2">
              <Table>
                <TableHeader>
                  <TableRow className="border-border/60">
                    <TableHead className="text-xs font-medium text-muted-foreground py-3 px-3">
                      Asset
                    </TableHead>
                    <TableHead className="text-right text-xs font-medium text-muted-foreground py-3 px-3">
                      Share of Voice
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
                      <TableCell className="py-3 px-3">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium text-muted-foreground w-6">
                            {item.rank}.
                          </span>
                          <span className="text-lg">{item.logo}</span>
                          <div className="flex items-center gap-2">
                            <span className={`text-sm font-medium ${item.isOwned ? 'text-primary' : 'text-foreground'}`}>
                              {item.name}
                            </span>
                            {item.isOwned && (
                              <Badge variant="outline" className="text-xs h-5 px-2 border-primary text-primary bg-primary/10">
                                Owned
                              </Badge>
                            )}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-right py-3 px-3">
                        <div className="flex items-center justify-end gap-2">
                          <span className="text-sm font-medium text-foreground">{item.score}</span>
                          <div className={`flex items-center gap-1 ${getTrendColor(item.trend)}`}>
                            {getTrendIcon(item.trend)}
                            <span className="text-xs">{item.change}</span>
                          </div>
                        </div>
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
