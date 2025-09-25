'use client'

import { UnifiedCard, UnifiedCardContent, UnifiedCardHeader, UnifiedCardTitle, UnifiedCardDescription } from '@/components/ui/unified-card'
import { Button } from '@/components/ui/button'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { Info, ArrowUp, ArrowDown, Minus } from 'lucide-react'
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts'

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
  return (
    <UnifiedCard>
      <UnifiedCardHeader>
        <div className="flex items-center gap-2">
          <UnifiedCardTitle>Share of Voice</UnifiedCardTitle>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Info className="w-4 h-4 text-gray-400 cursor-help" />
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-sm">Mentions of your brand in AI-generated answers in relation to competitors</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <UnifiedCardDescription>
          Mentions of your brand in AI-generated answers in relation to competitors
        </UnifiedCardDescription>
      </UnifiedCardHeader>

      <UnifiedCardContent>
        <div className="grid grid-cols-2 gap-8 items-start">
          {/* Left side - Donut Chart */}
          <div className="space-y-4">
            <div className="flex items-baseline gap-3">
              <span className="text-4xl font-bold text-foreground">1.9%</span>
              <div className="flex items-center gap-1 text-gray-500">
                <Minus className="w-4 h-4" />
                <span className="text-sm font-medium">0.0%</span>
              </div>
            </div>
            
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Right side - Rankings */}
          <div className="border-l border-gray-200 pl-6">
            <div className="space-y-4">
              <div>
                <h4 className="text-lg font-semibold text-foreground">Share of Voice Rank</h4>
                <div className="text-3xl font-bold text-foreground mt-2">#16</div>
              </div>
              
              <div className="space-y-3">
                {rankings.map((item) => (
                  <div key={item.rank} className="flex items-center justify-between py-2">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-sm font-semibold">
                        {item.rank}
                      </div>
                      <div className="text-xl">{item.logo}</div>
                      <div className="flex flex-col">
                        <span className={`text-sm font-medium ${item.isOwned ? 'text-primary' : 'text-foreground'}`}>
                          {item.name}
                        </span>
                        {item.isOwned && (
                          <span className="text-xs text-muted-foreground">Owned</span>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-foreground">{item.score}</span>
                      <div className={`flex items-center gap-1 ${getTrendColor(item.trend)}`}>
                        {getTrendIcon(item.trend)}
                        <span className="text-xs">{item.change}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Expand button */}
              <div className="flex justify-end mt-6">
                  <Button variant="ghost" size="sm" className="text-sm text-muted-foreground hover:text-foreground">
                  Expand
                </Button>
              </div>
            </div>
          </div>
        </div>
      </UnifiedCardContent>
    </UnifiedCard>
  )
}
