'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Calendar } from '@/components/ui/calendar'
import { UnifiedCard, UnifiedCardContent } from '@/components/ui/unified-card'
import { Settings, ChevronDown, ArrowUp, ArrowDown, Expand, Calendar as CalendarIcon } from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, PieChart, Pie, Cell, Label, LineChart, Line, Tooltip as RechartsTooltip } from 'recharts'
import { format } from 'date-fns'
import { getDynamicFaviconUrl, handleFaviconError } from '@/lib/faviconUtils'
import { useSkeletonLoading } from '@/components/ui/with-skeleton-loading'
import { SkeletonWrapper } from '@/components/ui/skeleton-wrapper'
import { UnifiedCardSkeleton } from '@/components/ui/unified-card-skeleton'

// Mock data for Sentiment Analysis
const sentimentData = [
  { 
    name: 'JPMorgan Chase', 
    positive: 68.4, 
    negative: 24.7, 
    neutral: 6.9,
    total: 89,
    color: '#3B82F6',
    isOwner: false
  },
  { 
    name: 'Bank of America', 
    positive: 62.3, 
    negative: 28.9, 
    neutral: 8.8,
    total: 85,
    color: '#EF4444',
    isOwner: false
  },
  { 
    name: 'Wells Fargo', 
    positive: 71.2, 
    negative: 20.5, 
    neutral: 8.3,
    total: 94,
    color: '#8B5CF6',
    isOwner: false
  },
  { 
    name: 'Citibank', 
    positive: 58.7, 
    negative: 32.1, 
    neutral: 9.2,
    total: 78,
    color: '#06B6D4',
    isOwner: false
  },
  { 
    name: 'US Bank', 
    positive: 61.2, 
    negative: 28.8, 
    neutral: 10.0,
    total: 82,
    color: '#10B981',
    isOwner: true
  }
]

// Generate rankings based on selected sentiment
const getRankingsForSentiment = (sentiment: string) => {
  const sentimentKey = sentiment === 'positive' ? 'positive' : sentiment === 'negative' ? 'negative' : 'neutral'
  const sortedData = [...sentimentData].sort((a, b) => b[sentimentKey] - a[sentimentKey])
  return sortedData.map((item, index) => ({
    rank: index + 1,
    name: item.name,
    total: item[sentimentKey].toString(),
    rankChange: Math.floor(Math.random() * 3) - 1, // Random change for demo
    isOwner: item.isOwner
  }))
}

const getAllRankingsForSentiment = (sentiment: string) => {
  // For demo purposes, we'll use the same data but sorted by the selected sentiment
  return getRankingsForSentiment(sentiment)
}

const rankings = [
  { rank: 1, name: 'SmartAI', total: '94', rankChange: 1, isOwner: false },
  { rank: 2, name: 'DataFlow', total: '89', rankChange: -1, isOwner: false },
  { rank: 3, name: 'CloudSync', total: '85', rankChange: 0, isOwner: false },
  { rank: 4, name: 'InnovateTech', total: '82', rankChange: 1, isOwner: true },
  { rank: 5, name: 'TechCorp', total: '78', rankChange: -1, isOwner: false }
]

const allRankings = [
  { rank: 1, name: 'SmartAI', total: '94', rankChange: 1, isOwner: false },
  { rank: 2, name: 'DataFlow', total: '89', rankChange: -1, isOwner: false },
  { rank: 3, name: 'CloudSync', total: '85', rankChange: 0, isOwner: false },
  { rank: 4, name: 'InnovateTech', total: '82', rankChange: 1, isOwner: true },
  { rank: 5, name: 'TechCorp', total: '78', rankChange: -1, isOwner: false },
  { rank: 6, name: 'NextGen Solutions', total: '72', rankChange: 0, isOwner: false },
  { rank: 7, name: 'Future Systems', total: '68', rankChange: 1, isOwner: false },
  { rank: 8, name: 'Digital Dynamics', total: '65', rankChange: -1, isOwner: false },
  { rank: 9, name: 'CloudFirst Inc', total: '62', rankChange: 0, isOwner: false },
  { rank: 10, name: 'AI Solutions Pro', total: '58', rankChange: 1, isOwner: false },
  { rank: 11, name: 'TechVision Corp', total: '55', rankChange: -1, isOwner: false },
  { rank: 12, name: 'Digital Edge', total: '52', rankChange: 0, isOwner: false },
  { rank: 13, name: 'NextWave Technologies', total: '48', rankChange: 1, isOwner: false },
  { rank: 14, name: 'Innovation Labs', total: '45', rankChange: -1, isOwner: false },
  { rank: 15, name: 'Quantum Systems', total: '42', rankChange: 0, isOwner: false }
]

// Mock trend data for line chart
const trendData = [
  { month: 'Jan', 'JPMorgan Chase': 68.4, 'Bank of America': 62.3, 'Wells Fargo': 71.2, 'Citibank': 58.7, 'US Bank': 61.2 },
  { month: 'Feb', 'JPMorgan Chase': 65.8, 'Bank of America': 64.1, 'Wells Fargo': 69.5, 'Citibank': 61.2, 'US Bank': 63.8 },
  { month: 'Mar', 'JPMorgan Chase': 70.2, 'Bank of America': 66.7, 'Wells Fargo': 73.1, 'Citibank': 59.8, 'US Bank': 65.4 },
  { month: 'Apr', 'JPMorgan Chase': 67.9, 'Bank of America': 63.5, 'Wells Fargo': 70.8, 'Citibank': 60.3, 'US Bank': 62.7 },
  { month: 'May', 'JPMorgan Chase': 69.6, 'Bank of America': 65.2, 'Wells Fargo': 72.4, 'Citibank': 58.9, 'US Bank': 64.1 },
  { month: 'Jun', 'JPMorgan Chase': 68.4, 'Bank of America': 62.3, 'Wells Fargo': 71.2, 'Citibank': 58.7, 'US Bank': 61.2 }
]

const CHART_COLORS = ['#3B82F6', '#EF4444', '#8B5CF6', '#06B6D4', '#10B981', '#F59E0B', '#EC4899', '#14B8A6', '#84CC16', '#F97316']

interface UnifiedSentimentSectionProps {
  filterContext?: {
    selectedTopics: string[]
    selectedPersonas: string[]
    selectedPlatforms: string[]
  }
}

export function UnifiedSentimentSection({ filterContext }: UnifiedSentimentSectionProps) {
  const [chartType, setChartType] = useState<'bar' | 'donut' | 'line'>('bar')
  const [selectedSentiment, setSelectedSentiment] = useState<'positive' | 'negative' | 'neutral'>('positive')
  const [selectedRankingSentiment, setSelectedRankingSentiment] = useState<'positive' | 'negative' | 'neutral'>('positive')
  const [isExpanded, setIsExpanded] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)
  const [selectedDate, setSelectedDate] = useState<Date>(new Date())
  const [comparisonDate, setComparisonDate] = useState<Date | undefined>(undefined)
  const [hoveredBar, setHoveredBar] = useState<number | null>(null)

  // Skeleton loading
  const { showSkeleton, isVisible } = useSkeletonLoading(filterContext)

  // Auto-switch chart type based on comparison date
  useEffect(() => {
    if (comparisonDate) {
      setChartType('line')
    } else {
      setChartType('bar')
    }
  }, [comparisonDate])

  // Sync right section with left section when in donut chart mode
  useEffect(() => {
    if (chartType === 'donut') {
      setSelectedRankingSentiment(selectedSentiment)
    }
  }, [chartType, selectedSentiment])

  const getSentimentLabel = (sentiment: string) => {
    switch (sentiment) {
      case 'positive': return 'Positive'
      case 'negative': return 'Negative'
      case 'neutral': return 'Neutral'
      default: return 'Positive'
    }
  }

  const getDonutData = () => {
    // Get sentiment-specific color schemes
    const getSentimentColors = (sentiment: string) => {
      switch (sentiment) {
        case 'positive':
          return ['#10B981', '#34D399', '#6EE7B7', '#A7F3D0', '#D1FAE5'] // Green shades (dark to light)
        case 'negative':
          return ['#EF4444', '#F87171', '#FCA5A5', '#FECACA', '#FEE2E2'] // Red shades (dark to light)
        case 'neutral':
          return ['#3B82F6', '#60A5FA', '#93C5FD', '#BFDBFE', '#DBEAFE'] // Blue shades (dark to light)
        default:
          return ['#3B82F6', '#EF4444', '#8B5CF6', '#06B6D4', '#10B981']
      }
    }

    // Sort data by value (highest first) to assign appropriate color intensities
    const sortedData = [...sentimentData].sort((a, b) => b[selectedSentiment] - a[selectedSentiment])
    const colors = getSentimentColors(selectedSentiment)
    
    return sentimentData.map((item) => {
      const sortedIndex = sortedData.findIndex(sortedItem => sortedItem.name === item.name)
      return {
        name: item.name,
        value: item[selectedSentiment],
        fill: colors[sortedIndex] || colors[colors.length - 1]
      }
    })
  }

  const showComparison = !!comparisonDate

  const getDateLabel = (date: Date) => {
    const today = new Date()
    const yesterday = new Date(today)
    yesterday.setDate(yesterday.getDate() - 1)
    
    if (date.toDateString() === today.toDateString()) return 'Today'
    if (date.toDateString() === yesterday.toDateString()) return 'Yesterday'
    return format(date, 'MMM d, yyyy')
  }

  return (
    <SkeletonWrapper
      show={showSkeleton}
      isVisible={isVisible}
      skeleton={
        <UnifiedCardSkeleton 
          type="mixed" 
          chartType={chartType === 'line' ? 'line' : chartType === 'donut' ? 'donut' : 'bar'}
          tableColumns={4}
          tableRows={5}
        />
      }
    >
      <div className="w-full">
        <UnifiedCard className="w-full">
        <UnifiedCardContent className="p-6">
          {/* Header Section - Inside the box */}
          <div className="space-y-4 mb-6">
            <div>
              <h2 className="text-foreground">Sentiment Analysis</h2>
              <p className="body-text text-muted-foreground mt-1">How positively AI responses reference your brand across different sentiment categories</p>
            </div>

            {/* Calendar Row - Date and Comparison Selectors */}
            <div className="flex items-center gap-3">
              {/* Primary Date Selector */}
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" size="sm" className="body-text">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {getDateLabel(selectedDate)}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={(date) => date && setSelectedDate(date)}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>

              {/* Comparison Date Selector */}
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" size="sm" className="body-text">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {comparisonDate ? getDateLabel(comparisonDate) : 'Compare with'}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={comparisonDate}
                    onSelect={(date) => setComparisonDate(date)}
                    initialFocus
                  />
                  {comparisonDate && (
                    <div className="p-3 border-t">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setComparisonDate(undefined)}
                        className="w-full"
                      >
                        Clear Comparison
                      </Button>
                    </div>
                  )}
                </PopoverContent>
              </Popover>
            </div>
          </div>

          {/* Main content with split sections */}
          <div className="relative">
            {/* Vertical Divider */}
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-border/60 transform -translate-x-1/2 hidden lg:block"></div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left Split - Chart */}
            <div className="space-y-4 relative">
              {/* Top Row - Chart Config and Sentiment Selection */}
              <div className="flex justify-end items-center gap-3">
                {/* Sentiment Selection Buttons - Always visible to explain bar sections */}
                <div className="inline-flex rounded-lg overflow-hidden border border-gray-300">
                  {(['positive', 'negative', 'neutral'] as const).map((sentiment, index) => (
                    <Button
                      key={sentiment}
                      variant={selectedSentiment === sentiment ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setSelectedSentiment(sentiment)}
                      className={`
                        body-text rounded-none border-0 text-xs font-medium
                        ${index === 0 ? 'rounded-l-lg' : ''}
                        ${index === 2 ? 'rounded-r-lg' : ''}
                        cursor-pointer
                        ${index > 0 ? 'border-l border-gray-300' : ''}
                        ${selectedSentiment === sentiment 
                          ? 'bg-black text-white hover:bg-black' 
                          : 'bg-white text-gray-600 hover:bg-gray-50'
                        }
                      `}
                    >
                      {getSentimentLabel(sentiment)}
                    </Button>
                  ))}
                </div>

                {/* Chart Config Dropdown - Top right of left split */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="body-text"
                      disabled={!!comparisonDate}
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
                <div className="relative h-48 bg-gray-50 dark:bg-gray-900/20 rounded-lg p-3">
                  {chartType === 'line' ? (
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={trendData}>
                        <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                        <XAxis 
                          dataKey="month" 
                          tick={{ fontSize: 12 }}
                          tickLine={false}
                          axisLine={false}
                        />
                        <YAxis 
                          domain={[50, 80]}
                          tick={{ fontSize: 12 }}
                          tickLine={false}
                          axisLine={false}
                        />
                        <RechartsTooltip />
                        {sentimentData.map((bank, index) => (
                          <Line
                            key={bank.name}
                            type="monotone"
                            dataKey={bank.name}
                            stroke={bank.color}
                            strokeWidth={2}
                            dot={{ r: 4 }}
                            activeDot={{ r: 6 }}
                          />
                        ))}
                      </LineChart>
                    </ResponsiveContainer>
                  ) : chartType === 'bar' ? (
                    <div className="h-full flex items-end justify-between relative">
                      {sentimentData.map((brand, index) => (
                        <div
                          key={brand.name}
                          className="flex flex-col items-center justify-end gap-2 flex-1 relative"
                          onMouseEnter={() => setHoveredBar(index)}
                          onMouseLeave={() => setHoveredBar(null)}
                        >
                          {/* Tooltip - Show on hover */}
                          {hoveredBar === index && (
                            <div className="absolute bottom-full mb-2 bg-gray-900 text-white text-xs rounded-lg px-3 py-2 shadow-lg z-10 whitespace-nowrap">
                              <div className="font-semibold mb-1">{brand.name}</div>
                              <div className="space-y-1">
                                <div className="flex items-center gap-2">
                                  <div className="w-2 h-2 rounded-full bg-[#10B981]"></div>
                                  <span>Positive: {brand.positive.toFixed(1)}%</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <div className="w-2 h-2 rounded-full bg-[#EF4444]"></div>
                                  <span>Negative: {brand.negative.toFixed(1)}%</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <div className="w-2 h-2 rounded-full bg-[#6B7280]"></div>
                                  <span>Neutral: {brand.neutral.toFixed(1)}%</span>
                                </div>
                              </div>
                              {/* Arrow pointing down */}
                              <div className="absolute left-1/2 -translate-x-1/2 bottom-[-6px] w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px] border-t-gray-900"></div>
                            </div>
                          )}
                          
                          {/* Stacked bar */}
                          <div 
                            className="flex flex-col items-center cursor-pointer transition-opacity"
                            style={{ opacity: hoveredBar === null || hoveredBar === index ? 1 : 0.5 }}
                          >
                            {/* Neutral (Gray - Top) */}
                            <div
                              className="w-4 rounded-t-sm transition-all"
                              style={{
                                height: `${(brand.neutral / 100) * 120}px`,
                                minHeight: '2px',
                                backgroundColor: '#6B7280',
                                filter: hoveredBar === index ? 'brightness(1.2)' : 'none'
                              }}
                            />
                            {/* Negative (Red - Middle) */}
                            <div
                              className="w-4 transition-all"
                              style={{
                                height: `${(brand.negative / 100) * 120}px`,
                                minHeight: '2px',
                                backgroundColor: '#EF4444',
                                filter: hoveredBar === index ? 'brightness(1.2)' : 'none'
                              }}
                            />
                            {/* Positive (Green - Bottom) */}
                            <div
                              className="w-4 rounded-b-sm transition-all"
                              style={{
                                height: `${(brand.positive / 100) * 120}px`,
                                minHeight: '4px',
                                backgroundColor: '#10B981',
                                filter: hoveredBar === index ? 'brightness(1.2)' : 'none'
                              }}
                            />
                          </div>
                          
                          {/* X-axis labels */}
                          <div className="w-16 h-6 flex items-center justify-center mt-2">
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
                  ) : (
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={getDonutData()}
                          cx="50%"
                          cy="50%"
                          innerRadius={50}
                          outerRadius={75}
                          paddingAngle={2}
                          dataKey="value"
                          onMouseEnter={(data, index) => {
                            setActiveIndex(index)
                          }}
                          onMouseLeave={() => {
                            setActiveIndex(-1)
                          }}
                        >
                          {getDonutData().map((entry, index) => (
                            <Cell 
                              key={`cell-${index}`} 
                              fill={entry.fill}
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
                                const activeData = getDonutData()[activeIndex] || getDonutData()[0]
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
                                      {activeData.value}
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
                      </PieChart>
                    </ResponsiveContainer>
                  )}
                  
                  {/* Donut Chart Legend */}
                  {chartType === 'donut' && (
                    <div className="flex flex-wrap justify-center gap-4 mt-4">
                      {sentimentData.map((item) => (
                        <div key={item.name} className="flex items-center gap-2">
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
                          <span className="text-sm text-foreground">{item.name}</span>
                        </div>
                      ))}
                    </div>
                  )}
                  
                  {/* Line Chart Legend */}
                  {chartType === 'line' && (
                    <div className="flex flex-wrap justify-center gap-4 mt-4">
                      {sentimentData.map((item) => (
                        <div key={item.name} className="flex items-center gap-2">
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
                          <span className="text-sm text-foreground">{item.name}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

            </div>

            {/* Right Split - Rankings */}
            <div className="space-y-4 pl-8 relative">
                {/* Top Row - Button Group aligned with Chart Config */}
                <div className="flex justify-end items-center">
                  <div className="inline-flex rounded-lg overflow-hidden border border-gray-300">
                    {(['positive', 'negative', 'neutral'] as const).map((sentiment, index) => (
                      <Button
                        key={sentiment}
                        variant={selectedRankingSentiment === sentiment ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => {
                          if (chartType === 'donut') {
                            // Sync with left section when in donut chart mode
                            setSelectedSentiment(sentiment)
                            setSelectedRankingSentiment(sentiment)
                          } else {
                            // Independent when in bar chart mode
                            setSelectedRankingSentiment(sentiment)
                          }
                        }}
                        className={`
                          body-text rounded-none border-0 text-xs font-medium
                          ${index === 0 ? 'rounded-l-lg' : ''}
                          ${index === 2 ? 'rounded-r-lg' : ''}
                          cursor-pointer
                          ${index > 0 ? 'border-l border-gray-300' : ''}
                          ${selectedRankingSentiment === sentiment 
                            ? 'bg-black text-white hover:bg-black' 
                            : 'bg-white text-gray-600 hover:bg-gray-50'
                          }
                        `}
                      >
                        {getSentimentLabel(sentiment)}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Right side header */}
                <div className="space-y-2">
                  <h3 className="text-foreground font-medium">Sentiment Rankings</h3>
                  <div className="text-xl font-semibold text-foreground">
                    #{getRankingsForSentiment(selectedRankingSentiment).find(item => item.isOwner)?.rank || 4}
                  </div>
                </div>

                {/* Rankings Table */}
                <div className="relative pb-8">
                  <Table className="w-full">
                    <TableHeader>
                      <TableRow className="border-border/60">
                        <TableHead className="caption text-muted-foreground py-2 px-3 w-auto">Company</TableHead>
                        <TableHead className="text-right caption text-muted-foreground py-2 px-3 w-16">
                          {chartType === 'donut' ? `${getSentimentLabel(selectedRankingSentiment)} Score` : 'Total'}
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {getRankingsForSentiment(selectedRankingSentiment).map((item) => (
                        <TableRow key={item.rank} className="border-border/60 hover:bg-muted/30 transition-colors">
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
                                  style={{ color: item.isOwner ? '#2563EB' : 'inherit' }}
                                >
                                  {item.name}
                                </span>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell className="text-right py-3 px-3 w-16">
                            <div className="flex items-center justify-end gap-2">
                              <span 
                                className="body-text font-medium"
                                style={{ color: item.isOwner ? '#2563EB' : 'inherit' }}
                              >
                                {item.total}
                              </span>
                              {showComparison && item.rankChange !== 0 && (
                                <Badge
                                  variant="outline"
                                  className={`caption h-4 px-1 flex items-center gap-1 ${
                                    item.rankChange > 0
                                      ? 'border-green-500 text-green-500 bg-green-500/10'
                                      : 'border-red-500 text-red-500 bg-red-500/10'
                                  }`}
                                >
                                  {item.rankChange > 0 ? (
                                    <ArrowUp className="w-3 h-3" />
                                  ) : (
                                    <ArrowDown className="w-3 h-3" />
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

                  {/* Expand Button */}
                  <div className="absolute bottom-2 right-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setIsExpanded(true)}
                      className="body-text bg-background border-border shadow-md hover:bg-muted h-6 px-2"
                    >
                      <Expand className="mr-1 h-3 w-3" /> Expand
                    </Button>
                  </div>
                </div>
            </div>
            </div>
          </div>
        </UnifiedCardContent>
      </UnifiedCard>

      {/* Expanded Modal */}
      <Dialog open={isExpanded} onOpenChange={setIsExpanded}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>All Sentiment Rankings</DialogTitle>
          </DialogHeader>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Brand</TableHead>
                <TableHead className="text-right">{getSentimentLabel(selectedRankingSentiment)} Score</TableHead>
                <TableHead className="text-center">Change</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {getAllRankingsForSentiment(selectedRankingSentiment).map((item) => (
                <TableRow key={item.rank}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <img
                        src={getDynamicFaviconUrl(item.name)}
                        alt={item.name}
                        className="w-4 h-4 rounded-sm"
                        onError={handleFaviconError}
                      />
                      <span 
                        className={item.isOwner ? 'font-bold text-[#2563EB]' : 'text-foreground'}
                      >
                        {item.name}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <span className={item.isOwner ? 'font-bold text-[#2563EB]' : 'text-foreground'}>
                      {item.total}
                    </span>
                  </TableCell>
                  <TableCell className="text-center">
                    {item.rankChange !== 0 && (
                      <span className="text-xs">
                        {item.rankChange > 0 ? (
                          <ArrowUp className="h-3 w-3 text-green-500" />
                        ) : (
                          <ArrowDown className="h-3 w-3 text-red-500" />
                        )}
                      </span>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </DialogContent>
      </Dialog>
    </div>
    </SkeletonWrapper>
  )
}
