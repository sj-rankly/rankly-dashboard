'use client'

import { UnifiedCard, UnifiedCardContent } from '@/components/ui/unified-card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Settings, ChevronDown, Calendar as CalendarIcon, ArrowUp, ArrowDown, Expand } from 'lucide-react'
import { useState, useEffect } from 'react'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Label, Pie, PieChart, Sector, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip as RechartsTooltip, LabelList } from 'recharts'
import { PieSectorDataItem } from 'recharts/types/polar/Pie'
import { getDynamicFaviconUrl, handleFaviconError } from '@/lib/faviconUtils'
import { useSkeletonLoading } from '@/components/ui/with-skeleton-loading'
import { SkeletonWrapper } from '@/components/ui/skeleton-wrapper'
import { UnifiedCardSkeleton } from '@/components/ui/unified-card-skeleton'

const citationData = [
  {
    name: 'US Bank',
    brand: 91.9,
    social: 7.4,
    earned: 0.7,
    total: 100,
    color: '#3B82F6',
    isOwner: true,
    comparisonBrand: 88.2,
    comparisonSocial: 10.6,
    comparisonEarned: 1.2,
    comparisonTotal: 100
  },
  {
    name: 'Citibank',
    brand: 85.2,
    social: 12.8,
    earned: 2.0,
    total: 100,
    color: '#10B981',
    isOwner: false,
    comparisonBrand: 82.1,
    comparisonSocial: 15.4,
    comparisonEarned: 2.5,
    comparisonTotal: 100
  },
  {
    name: 'JPMorgan Chase',
    brand: 45.1,
    social: 35.7,
    earned: 19.2,
    total: 100,
    color: '#8B5CF6',
    isOwner: false,
    comparisonBrand: 42.8,
    comparisonSocial: 38.2,
    comparisonEarned: 19.0,
    comparisonTotal: 100
  },
  {
    name: 'Bank of America',
    brand: 38.5,
    social: 45.2,
    earned: 16.3,
    total: 100,
    color: '#F59E0B',
    isOwner: false,
    comparisonBrand: 35.1,
    comparisonSocial: 48.7,
    comparisonEarned: 16.2,
    comparisonTotal: 100
  },
  {
    name: 'Wells Fargo',
    brand: 22.8,
    social: 52.1,
    earned: 25.1,
    total: 100,
    color: '#EF4444',
    isOwner: false,
    comparisonBrand: 20.3,
    comparisonSocial: 55.4,
    comparisonEarned: 24.3,
    comparisonTotal: 100
  }
]

// Mock trend data for line charts
const trendData = [
  { 
    month: 'Jan 1', 
    'US Bank': { brand: 2.5, social: 1.2, earned: 0.8 },
    'Citibank': { brand: 8.5, social: 3.8, earned: 2.1 },
    'JPMorgan Chase': { brand: 15.2, social: 7.4, earned: 4.2 },
    'Bank of America': { brand: 22.8, social: 12.1, earned: 6.5 },
    'Wells Fargo': { brand: 28.5, social: 18.3, earned: 9.2 }
  },
  { 
    month: 'Jan 8', 
    'US Bank': { brand: 2.8, social: 1.4, earned: 0.9 },
    'Citibank': { brand: 9.1, social: 4.2, earned: 2.3 },
    'JPMorgan Chase': { brand: 16.0, social: 7.8, earned: 4.5 },
    'Bank of America': { brand: 23.6, social: 12.7, earned: 6.8 },
    'Wells Fargo': { brand: 29.2, social: 18.9, earned: 9.6 }
  },
  { 
    month: 'Jan 15', 
    'US Bank': { brand: 3.1, social: 1.6, earned: 1.0 },
    'Citibank': { brand: 9.7, social: 4.6, earned: 2.5 },
    'JPMorgan Chase': { brand: 16.8, social: 8.2, earned: 4.8 },
    'Bank of America': { brand: 24.4, social: 13.3, earned: 7.1 },
    'Wells Fargo': { brand: 29.9, social: 19.5, earned: 10.0 }
  },
  { 
    month: 'Jan 22', 
    'US Bank': { brand: 3.4, social: 1.8, earned: 1.1 },
    'Citibank': { brand: 10.3, social: 5.0, earned: 2.7 },
    'JPMorgan Chase': { brand: 17.6, social: 8.6, earned: 5.1 },
    'Bank of America': { brand: 25.2, social: 13.9, earned: 7.4 },
    'Wells Fargo': { brand: 30.6, social: 20.1, earned: 10.4 }
  },
  { 
    month: 'Jan 29', 
    'US Bank': { brand: 3.7, social: 2.0, earned: 1.2 },
    'Citibank': { brand: 10.9, social: 5.4, earned: 2.9 },
    'JPMorgan Chase': { brand: 18.4, social: 9.0, earned: 5.4 },
    'Bank of America': { brand: 26.0, social: 14.5, earned: 7.7 },
    'Wells Fargo': { brand: 31.3, social: 20.7, earned: 10.8 }
  },
  { 
    month: 'Feb 5', 
    'US Bank': { brand: 4.0, social: 2.2, earned: 1.3 },
    'Citibank': { brand: 11.5, social: 5.8, earned: 3.1 },
    'JPMorgan Chase': { brand: 19.2, social: 9.4, earned: 5.7 },
    'Bank of America': { brand: 26.8, social: 15.1, earned: 8.0 },
    'Wells Fargo': { brand: 32.0, social: 21.3, earned: 11.2 }
  }
]

const chartData = [
  { name: 'Brand', score: 91.9, color: '#3B82F6', comparisonScore: 88.2 },
  { name: 'Earned', score: 0.7, color: '#8B5CF6', comparisonScore: 1.2 },
  { name: 'Social', score: 7.4, color: '#10B981', comparisonScore: 10.6 },
]

const allRankings = [
  { rank: 1, name: 'Brand', isOwner: false, rankChange: 1 },
  { rank: 2, name: 'Social', isOwner: false, rankChange: -1 },
  { rank: 3, name: 'Earned', isOwner: false, rankChange: 0 },
]

// Show top 3 by default, but include owned brand if it's not in top 3
const getDisplayRankings = () => {
  const top3 = allRankings.slice(0, 3)
  const ownedBrand = allRankings.find(item => item.isOwner)
  
  // If owned brand is not in top 3, replace the last item with owned brand
  if (ownedBrand && ownedBrand.rank > 3) {
    return [...top3.slice(0, 2), ownedBrand]
  }
  
  return top3
}

const rankings = getDisplayRankings()

interface CitationTypesSectionProps {
  filterContext?: {
    selectedTopics: string[]
    selectedPersonas: string[]
    selectedPlatforms: string[]
  }
}

export function CitationTypesSection({ filterContext }: CitationTypesSectionProps) {
  const [hoveredBar, setHoveredBar] = useState<{ name: string; score: string; x: number; y: number } | null>(null)
  const [chartType, setChartType] = useState('bar')
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
  const [comparisonDate, setComparisonDate] = useState<Date | undefined>(undefined)
  const [activePlatform, setActivePlatform] = useState(chartData[0].name)
  const [showExpandedRankings, setShowExpandedRankings] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)
  const [selectedCitationType, setSelectedCitationType] = useState('earned')

  // Skeleton loading
  const { showSkeleton, isVisible } = useSkeletonLoading(filterContext)

  // Auto-switch chart type based on date selection
  useEffect(() => {
    if (comparisonDate) {
      // Range mode - use line chart for trend view
      setChartType('line')
    } else {
      // Single date mode - use bar chart for brand share view
      setChartType('bar')
    }
  }, [comparisonDate])

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: date.getFullYear() !== new Date().getFullYear() ? 'numeric' : undefined
    })
  }

  const getDateLabel = () => {
    if (!selectedDate) return 'Select Date'
    return formatDate(selectedDate)
  }

  const getComparisonLabel = () => {
    if (!selectedDate || !comparisonDate) return ''
    
    const selectedTime = selectedDate.getTime()
    const comparisonTime = comparisonDate.getTime()
    const oneDay = 1000 * 60 * 60 * 24

    const daysDiff = Math.round(Math.abs((selectedTime - comparisonTime) / oneDay))
    
    if (daysDiff === 1) return 'vs Yesterday'
    if (daysDiff === 7) return 'vs Last Week'
    if (daysDiff === 30) return 'vs Last Month'
    return `vs ${formatDate(comparisonDate)}`
  }

  const showComparison = !!comparisonDate

  const getCitationTypeLabel = (type: string) => {
    switch (type) {
      case 'brand': return 'Brand'
      case 'social': return 'Social'
      case 'earned': return 'Earned'
      default: return 'Brand'
    }
  }

  const getRankingsForCitationType = (citationType: string) => {
    const sortedData = [...citationData].sort((a, b) => b[citationType] - a[citationType])
    return sortedData.map((item, index) => ({
      rank: index + 1,
      name: item.name,
      total: item[citationType].toFixed(1),
      rankChange: Math.floor(Math.random() * 3) - 1,
      isOwner: item.isOwner
    }))
  }

  const CitationBar = ({ citationSplit }: { citationSplit: { brand: number; social: number; earned: number } }) => {
    const total = citationSplit.brand + citationSplit.social + citationSplit.earned
    const brandWidth = (citationSplit.brand / total) * 100
    const socialWidth = (citationSplit.social / total) * 100
    const earnedWidth = (citationSplit.earned / total) * 100

    return (
      <div className="relative flex h-6 bg-gray-200 rounded-full overflow-hidden">
        <div 
          className="bg-blue-500 h-full flex items-center justify-center" 
          style={{ width: `${brandWidth}%` }}
        >
          {citationSplit.brand > 10 && (
            <span className="text-xs font-medium text-white">
              {citationSplit.brand}%
            </span>
          )}
        </div>
        <div 
          className="bg-orange-500 h-full flex items-center justify-center" 
          style={{ width: `${socialWidth}%` }}
        >
          {citationSplit.social > 10 && (
            <span className="text-xs font-medium text-white">
              {citationSplit.social}%
            </span>
          )}
        </div>
        <div 
          className="bg-red-500 h-full flex items-center justify-center" 
          style={{ width: `${earnedWidth}%` }}
        >
          {citationSplit.earned > 10 && (
            <span className="text-xs font-medium text-white">
              {citationSplit.earned}%
            </span>
          )}
        </div>
      </div>
    )
  }

  return (
    <SkeletonWrapper
      show={showSkeleton}
      isVisible={isVisible}
      skeleton={
        <UnifiedCardSkeleton 
          type="mixed" 
          chartType={chartType === 'line' ? 'line' : 'bar'}
          tableColumns={4}
          tableRows={5}
        />
      }
    >
      <div className="w-full">
        {/* Unified Section Container */}
        <UnifiedCard className="w-full">
        <UnifiedCardContent className="p-6">
          {/* Header Section - Inside the box */}
          <div className="space-y-4 mb-6">
        <div>
              <h2 className="text-foreground">Citation Types</h2>
              <p className="body-text text-muted-foreground mt-1">Citation breakdown by type in the selected period</p>
            </div>

            {/* Calendar Row */}
            <div className="flex items-center gap-2">
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" size="sm" className="body-text justify-between w-32">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {getDateLabel()}
                  <ChevronDown className="ml-2 h-3 w-3" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>

            {selectedDate && (
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" size="sm" className="body-text w-40">
                    <div className="flex items-center justify-between w-full">
                      <div className="flex items-center">
                        <CalendarIcon className="mr-2 h-4 w-4 flex-shrink-0" />
                        <span className="truncate">
                          {comparisonDate ? formatDate(comparisonDate) : 'Compare with'}
                        </span>
                      </div>
                      <ChevronDown className="ml-2 h-3 w-3 flex-shrink-0" />
                    </div>
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={comparisonDate}
                    onSelect={setComparisonDate}
                    initialFocus
                    disabled={(date) => date >= selectedDate}
                  />
                </PopoverContent>
              </Popover>
            )}
            </div>
        </div>
        
          {/* Main content with split sections */}
          <div className="relative">
            {/* Vertical Divider */}
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-border/60 transform -translate-x-1/2 hidden lg:block"></div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Left Split - Chart */}
              <div className="space-y-4 relative">
                {/* Top Row - Citation Type Buttons and Chart Config Button */}
                <div className="flex justify-end items-center gap-2">
                  {/* Citation Type Selection Buttons */}
                  <div className="inline-flex rounded-lg overflow-hidden border border-gray-300">
                    {(['brand', 'social', 'earned'] as const).map((type, index) => (
                      <Button
                        key={type}
                        variant="outline"
                        size="sm"
                        onClick={() => setSelectedCitationType(type)}
                        disabled={chartType === 'bar'}
                        className={`
                          body-text rounded-none border-0 text-xs font-medium px-3 py-1
                          ${index === 0 ? 'rounded-l-lg' : ''}
                          ${index === 2 ? 'rounded-r-lg' : ''}
                          ${chartType === 'bar' ? 'opacity-60 cursor-default' : 'cursor-pointer'}
                          ${index > 0 ? 'border-l border-gray-300' : ''}
                          ${(chartType === 'donut' || chartType === 'line') && selectedCitationType === type 
                            ? 'bg-black text-white hover:bg-black' 
                            : 'bg-white text-gray-600 hover:bg-gray-50'
                          }
                        `}
                      >
                        {getCitationTypeLabel(type)}
                      </Button>
                    ))}
                  </div>

                  {/* Chart Config Button */}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        disabled={!!comparisonDate}
                        className="body-text disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <Settings className="mr-2 h-4 w-4" /> Chart Config <ChevronDown className="ml-2 h-3 w-3" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-full">
                      <DropdownMenuItem onClick={() => setChartType('bar')}>Bar Chart</DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setChartType('donut')}>Donut Chart</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                {/* Chart */}
                <div className="relative h-64 bg-gray-50 dark:bg-gray-900/20 rounded-lg p-4">
                  {chartType === 'bar' && (
                    <div className="h-full flex items-end justify-between relative">
                      {citationData.map((brand, index) => (
                        <div
                          key={brand.name}
                          className="flex flex-col items-center justify-end gap-2 flex-1 relative"
                          onMouseEnter={(e) => {
                            const rect = e.currentTarget.getBoundingClientRect()
                            setHoveredBar({
                              index,
                              x: rect.left + rect.width / 2,
                              y: rect.top,
                              name: brand.name
                            })
                          }}
                          onMouseLeave={() => setHoveredBar(null)}
                        >
                          {/* Bars container */}
                          <div className="flex items-end gap-1">
                            {/* Current period stacked bar */}
                            <div 
                              className="flex flex-col items-center cursor-pointer transition-opacity"
                              style={{ opacity: hoveredBar === null || hoveredBar.index === index ? 1 : 0.5 }}
                            >
                              {/* Earned Citations (Red - Top) */}
                              <div
                                className="w-3 rounded-t-sm transition-all"
                                style={{
                                  height: `${(brand.earned / 100) * 120}px`,
                                  minHeight: '2px',
                                  backgroundColor: '#EF4444',
                                  filter: hoveredBar?.index === index ? 'brightness(1.2)' : 'none'
                                }}
                              />
                              {/* Social Citations (Orange - Middle) */}
                              <div
                                className="w-3 transition-all"
                                style={{
                                  height: `${(brand.social / 100) * 120}px`,
                                  minHeight: '2px',
                                  backgroundColor: '#F59E0B',
                                  filter: hoveredBar?.index === index ? 'brightness(1.2)' : 'none'
                                }}
                              />
                              {/* Brand Citations (Blue - Bottom) */}
                              <div
                                className="w-3 rounded-b-sm transition-all"
                                style={{
                                  height: `${(brand.brand / 100) * 120}px`,
                                  minHeight: '4px',
                                  backgroundColor: '#3B82F6',
                                  filter: hoveredBar?.index === index ? 'brightness(1.2)' : 'none'
                                }}
                              />
                            </div>

                            {/* Comparison period stacked bar - Only show when comparison is enabled */}
                            {showComparison && (
                              <div 
                                className="flex flex-col items-center cursor-pointer transition-opacity"
                                style={{ opacity: hoveredBar === null || hoveredBar.index === index ? 0.6 : 0.3 }}
                              >
                                {/* Earned Citations (Red - Top) */}
                                <div
                                  className="w-3 rounded-t-sm transition-all"
                                  style={{
                                    height: `${(brand.comparisonEarned / 100) * 120}px`,
                                    minHeight: '2px',
                                    backgroundColor: '#EF4444',
                                    filter: 'brightness(1.4) saturate(0.8)'
                                  }}
                                />
                                {/* Social Citations (Orange - Middle) */}
                                <div
                                  className="w-3 transition-all"
                                  style={{
                                    height: `${(brand.comparisonSocial / 100) * 120}px`,
                                    minHeight: '2px',
                                    backgroundColor: '#F59E0B',
                                    filter: 'brightness(1.4) saturate(0.8)'
                                  }}
                                />
                                {/* Brand Citations (Blue - Bottom) */}
                                <div
                                  className="w-3 rounded-b-sm transition-all"
                    style={{
                                    height: `${(brand.comparisonBrand / 100) * 120}px`,
                                    minHeight: '4px',
                                    backgroundColor: '#3B82F6',
                                    filter: 'brightness(1.4) saturate(0.8)'
                                  }}
                                />
                              </div>
                            )}
                          </div>

                          {/* Type name below bars */}
                          <div className="w-16 h-6 flex items-center justify-center">
                            <img 
                              src={getDynamicFaviconUrl(brand.name)} 
                              alt={brand.name}
                              className="w-4 h-4 rounded-sm"
                              onError={handleFaviconError}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {chartType === 'donut' && (
                    <div className="h-full flex items-center justify-center relative">
                      <div className="w-48 h-48">
                        <PieChart width={192} height={192}>
                          {/* Current period (outer ring) */}
                          <Pie
                            data={citationData}
                            dataKey={selectedCitationType}
                            nameKey="name"
                            innerRadius={showComparison ? 55 : 40}
                            outerRadius={80}
                            strokeWidth={2}
                            onMouseEnter={(data, index) => {
                              setActiveIndex(index)
                              setActivePlatform(data.name)
                            }}
                            onMouseLeave={() => {
                              setActiveIndex(-1)
                            }}
                          >
                            {citationData.map((entry, index) => (
                              <Cell 
                                key={`cell-${index}`} 
                                fill={entry.color}
                                stroke={activeIndex === index ? '#fff' : 'none'}
                                strokeWidth={activeIndex === index ? 2 : 0}
                                style={{
                                  filter: activeIndex === index ? 'brightness(1.1)' : 'none'
                                }}
                              />
                            ))}
                            <Label
                              content={({ viewBox }) => {
                                if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                                  const activeData = citationData[activeIndex] || citationData[0]
                                  return (
                                    <text
                                      x={viewBox.cx}
                                      y={viewBox.cy}
                                      textAnchor="middle"
                                      dominantBaseline="middle"
                                      className="fill-foreground"
                                    >
                                      <tspan
                                        x={viewBox.cx}
                                        y={viewBox.cy}
                                        className="fill-foreground text-lg font-bold"
                                      >
                                        {activeData[selectedCitationType]}%
                                      </tspan>
                                      <tspan
                                        x={viewBox.cx}
                                        y={(viewBox.cy || 0) + 16}
                                        className="fill-muted-foreground text-xs"
                                      >
                                        {activeData.name}
                                      </tspan>
                                    </text>
                                  )
                                }
                              }}
                            />
                          </Pie>

                          {/* Comparison period (inner ring) - Only show when comparison is enabled */}
                          {showComparison && (
                            <Pie
                              data={citationData}
                              dataKey={`comparison${selectedCitationType.charAt(0).toUpperCase() + selectedCitationType.slice(1)}`}
                              nameKey="name"
                              innerRadius={25}
                              outerRadius={45}
                              strokeWidth={2}
                            >
                              {citationData.map((entry, index) => (
                                <Cell key={`comparison-cell-${index}`} fill={entry.color} opacity={0.7} />
                              ))}
                            </Pie>
                          )}
                        </PieChart>
            </div>

            {/* Legend */}
                      <div className="ml-4 space-y-1">
                        {citationData.map((item, index) => (
                          <div 
                            key={item.name} 
                            className="flex items-center gap-2 cursor-pointer"
                            onClick={() => setActivePlatform(item.name)}
                          >
                            <div 
                              className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: item.color }}
                            />
                            <img
                              src={getDynamicFaviconUrl(item.name)}
                              alt={item.name}
                              className="w-4 h-4 rounded-sm"
                              onError={handleFaviconError}
                            />
                            <span className="caption text-foreground">{item.name}</span>
                            <span className="caption text-muted-foreground">
                              {showComparison ? (
                                <div className="flex flex-col">
                                  <span>{item[selectedCitationType]}%</span>
                                  <span className="text-[10px] opacity-70">
                                    {item[`comparison${selectedCitationType.charAt(0).toUpperCase() + selectedCitationType.slice(1)}`]}%
                                  </span>
                                </div>
                              ) : (
                                item[selectedCitationType] + '%'
                              )}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {chartType === 'line' && (
                    <div className="h-full w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart
                          data={trendData.map(item => ({
                            month: item.month,
                            'US Bank': item['US Bank'][selectedCitationType],
                            'Citibank': item['Citibank'][selectedCitationType],
                            'JPMorgan Chase': item['JPMorgan Chase'][selectedCitationType],
                            'Bank of America': item['Bank of America'][selectedCitationType],
                            'Wells Fargo': item['Wells Fargo'][selectedCitationType]
                          }))}
                          margin={{
                            top: 20,
                            left: 12,
                            right: 12,
                          }}
                        >
                          <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                          <XAxis
                            dataKey="month"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            tickFormatter={(value) => value.slice(0, 6)}
                            tick={{ fontSize: 12 }}
                          />
                          <YAxis 
                            domain={[0, 35]}
                            tick={{ fontSize: 12 }}
                            tickLine={false}
                            axisLine={false}
                          />
                          <RechartsTooltip
                            contentStyle={{
                              backgroundColor: 'hsl(var(--card))',
                              border: '1px solid hsl(var(--border))',
                              borderRadius: '8px',
                              fontSize: '12px',
                              color: 'hsl(var(--foreground))',
                              boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                            }}
                          />
                          <Line
                            dataKey="US Bank"
                            type="monotone"
                            stroke="#10B981"
                            strokeWidth={2}
                            dot={{ r: 3 }}
                            activeDot={{ r: 5 }}
                          />
                          <Line
                            dataKey="Citibank"
                            type="monotone"
                            stroke="#3B82F6"
                            strokeWidth={2}
                            dot={{ r: 3 }}
                            activeDot={{ r: 5 }}
                          />
                          <Line
                            dataKey="JPMorgan Chase"
                            type="monotone"
                            stroke="#EF4444"
                            strokeWidth={2}
                            dot={{ r: 3 }}
                            activeDot={{ r: 5 }}
                          />
                          <Line
                            dataKey="Bank of America"
                            type="monotone"
                            stroke="#8B5CF6"
                            strokeWidth={2}
                            dot={{ r: 3 }}
                            activeDot={{ r: 5 }}
                          />
                          <Line
                            dataKey="Wells Fargo"
                            type="monotone"
                            stroke="#06B6D4"
                            strokeWidth={3}
                            dot={{ r: 4 }}
                            activeDot={{ r: 6 }}
                          >
                            <LabelList
                              position="top"
                              offset={12}
                              className="fill-foreground"
                              fontSize={12}
                            />
                          </Line>
                        </LineChart>
                      </ResponsiveContainer>
                      
                      {/* Line Chart Legend */}
                      <div className="mt-4 flex flex-wrap gap-4 justify-center">
                        {citationData.map((item, index) => (
                          <div 
                            key={item.name} 
                            className="flex items-center gap-2 cursor-pointer"
                            onClick={() => setActivePlatform(item.name)}
                          >
                            <div 
                              className="w-3 h-3 rounded-full" 
                              style={{ backgroundColor: item.color }}
                            />
                            <img
                              src={getDynamicFaviconUrl(item.name)}
                              alt={item.name}
                              className="w-4 h-4 rounded-sm"
                              onError={handleFaviconError}
                            />
                            <span className="caption text-foreground">{item.name}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Hover Card */}
                  {hoveredBar && chartType === 'bar' && (
                    <div 
                      className="fixed z-50 bg-neutral-900 dark:bg-neutral-800 border border-neutral-700 rounded-md px-3 py-2 shadow-lg pointer-events-none min-w-[200px]"
                      style={{
                        left: `${hoveredBar.x}px`,
                        top: `${hoveredBar.y}px`,
                        transform: 'translateX(-50%) translateY(-100%)'
                      }}
                    >
                      {/* Platform info */}
                      <div className="space-y-1">
                        <div className="text-white font-semibold text-sm">{hoveredBar.name}</div>
                        <div className="flex justify-between items-center text-xs">
                          <span className="text-gray-300">Brand:</span>
                          <span className="text-gray-300 font-medium">
                            {citationData[hoveredBar.index]?.brand}% 
                            {showComparison && (
                              <span className="text-gray-400 text-[10px] ml-1">
                                {citationData[hoveredBar.index]?.comparisonBrand}%
                              </span>
                            )}
                          </span>
                        </div>
                        <div className="flex justify-between items-center text-xs">
                          <span className="text-gray-300">Social:</span>
                          <span className="text-gray-300 font-medium">
                            {citationData[hoveredBar.index]?.social}%
                            {showComparison && (
                              <span className="text-gray-400 text-[10px] ml-1">
                                {citationData[hoveredBar.index]?.comparisonSocial}%
                              </span>
                            )}
                          </span>
                        </div>
                        <div className="flex justify-between items-center text-xs">
                          <span className="text-gray-300">Earned:</span>
                          <span className="text-gray-300 font-medium">
                            {citationData[hoveredBar.index]?.earned}%
                            {showComparison && (
                              <span className="text-gray-400 text-[10px] ml-1">
                                {citationData[hoveredBar.index]?.comparisonEarned}%
                              </span>
                            )}
                          </span>
                        </div>
                      </div>

                      {/* Pointer */}
                      <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-3 border-r-3 border-t-3 border-transparent border-t-neutral-900 dark:border-t-neutral-800"></div>
                    </div>
                  )}
                </div>
              </div>

              {/* Right Split - Ranking Table */}
              <div className="space-y-4 relative">
                {/* Top Row - Group buttons aligned with left-side buttons */}
                <div className="flex justify-between items-center">
                  {/* Left side - Rank text */}
                  <div className="space-y-2 pl-8">
                    <h3 className="text-foreground">Citation Types Rank</h3>
                    <div className="text-xl font-semibold text-foreground">#{getRankingsForCitationType(selectedCitationType).find(item => item.isOwner)?.rank || 1}</div>
                  </div>

                  {/* Right side - Group buttons aligned with left-side buttons */}
                  <div className="inline-flex rounded-lg overflow-hidden border border-gray-300 -mt-2">
                    {(['brand', 'social', 'earned'] as const).map((type, index) => (
                      <Button
                        key={type}
                        variant="outline"
                        size="sm"
                        onClick={() => setSelectedCitationType(type)}
                        className={`
                          body-text rounded-none border-0 text-xs font-medium px-3 py-1
                          ${index === 0 ? 'rounded-l-lg' : ''}
                          ${index === 2 ? 'rounded-r-lg' : ''}
                          ${index > 0 ? 'border-l border-gray-300' : ''}
                          ${selectedCitationType === type 
                            ? 'bg-black text-white hover:bg-black' 
                            : 'bg-white text-gray-600 hover:bg-gray-50'
                          }
                        `}
                      >
                        {getCitationTypeLabel(type)}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Simple Table */}
                <div className="space-y-2 pb-8 relative pl-8">
                  <Table className="w-full">
                    <TableHeader>
                      <TableRow className="border-border/60">
                        <TableHead className="caption text-muted-foreground py-2 px-3 w-auto">
                          Company
                        </TableHead>
                        <TableHead className="text-right caption text-muted-foreground py-2 px-3 w-16">
                          Citation Share
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {getRankingsForCitationType(selectedCitationType).map((item) => (
                        <TableRow 
                          key={item.rank} 
                          className="border-border/60 hover:bg-muted/30 transition-colors"
                        >
                          <TableCell className="py-3 px-3 w-auto">
                            <div className="flex items-center gap-3">
                              <div className="flex items-center gap-2">
                                <img
                                  src={getDynamicFaviconUrl(item.name)}
                                  alt={item.name}
                                  className="w-4 h-4 rounded-sm"
                                  onError={handleFaviconError}
                                />
                                <span 
                                  className="body-text font-medium" 
                                  style={{color: item.isOwner ? '#2563EB' : 'inherit'}}
                                >
                                  {item.name}
                                </span>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell className="text-right py-3 px-3 w-16">
                            <div className="flex items-center justify-end gap-2">
                              <span className="body-text text-foreground">
                                #{item.rank}
                              </span>
                              {showComparison && (
                                <Badge 
                                  variant="outline" 
                                  className={`caption h-4 px-1 flex items-center gap-1 ${
                                    item.rankChange > 0 
                                      ? 'border-green-500 text-green-500 bg-green-500/10' 
                                      : item.rankChange < 0
                                      ? 'border-red-500 text-red-500 bg-red-500/10'
                                      : 'border-gray-500 text-gray-500 bg-gray-500/10'
                                  }`}
                                >
                                  {item.rankChange > 0 ? (
                                    <ArrowUp className="w-3 h-3" />
                                  ) : item.rankChange < 0 ? (
                                    <ArrowDown className="w-3 h-3" />
                                  ) : (
                                    <span className="w-3 h-3 flex items-center justify-center">—</span>
                                  )}
                                  <span>{Math.abs(item.rankChange)}</span>
                                </Badge>
                              )}
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
          </div>

                {/* Expand Button - Bottom Right */}
                <div className="absolute bottom-2 right-2">
                  <Dialog open={showExpandedRankings} onOpenChange={setShowExpandedRankings}>
                    <DialogTrigger asChild>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="body-text bg-background border-border shadow-md hover:bg-muted h-6 px-2"
                      >
                        <Expand className="mr-1 h-3 w-3" />
                        Expand
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle className="text-foreground">All Citation Types Rankings</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <Table>
                          <TableHeader>
                            <TableRow className="border-border/60">
                              <TableHead className="caption text-muted-foreground py-2 px-3">
                                Company
                              </TableHead>
                              <TableHead className="text-right caption text-muted-foreground py-2 px-3">
                                Rank
                              </TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {getRankingsForCitationType(selectedCitationType).map((item) => (
                              <TableRow 
                                key={item.rank} 
                                className="border-border/60 hover:bg-muted/30 transition-colors"
                              >
                                <TableCell className="py-3 px-3">
                                  <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2">
                    <img
                      src={getDynamicFaviconUrl(item.name)}
                      alt={item.name}
                      className="w-4 h-4 rounded-sm"
                      onError={handleFaviconError}
                    />
                    <span 
                      className="body-text font-medium" 
                      style={{color: item.isOwner ? '#2563EB' : 'inherit'}}
                    >
                      {item.name}
                    </span>
                  </div>
                                  </div>
                                </TableCell>
                                <TableCell className="text-right py-3 px-3">
                                  <div className="flex items-center justify-end gap-2">
                                    <span 
                                      className="body-text font-medium" 
                                      style={{color: item.isOwner ? '#2563EB' : 'inherit'}}
                                    >
                                      #{item.rank}
                                    </span>
                                    {showComparison && (
                                      <Badge 
                                        variant="outline" 
                                        className={`caption h-4 px-1 flex items-center gap-1 ${
                                          item.rankChange > 0 
                                            ? 'border-green-500 text-green-500 bg-green-500/10' 
                                            : item.rankChange < 0
                                            ? 'border-red-500 text-red-500 bg-red-500/10'
                                            : 'border-gray-500 text-gray-500 bg-gray-500/10'
                                        }`}
                                      >
                                        {item.rankChange > 0 ? (
                                          <ArrowUp className="w-3 h-3" />
                                        ) : item.rankChange < 0 ? (
                                          <ArrowDown className="w-3 h-3" />
                                        ) : (
                                          <span className="w-3 h-3 flex items-center justify-center">—</span>
                                        )}
                                        <span>{Math.abs(item.rankChange)}</span>
                                      </Badge>
                                    )}
                  </div>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                  </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
          </div>
        </div>
        </UnifiedCardContent>
      </UnifiedCard>
    </div>
    </SkeletonWrapper>
  )
}
