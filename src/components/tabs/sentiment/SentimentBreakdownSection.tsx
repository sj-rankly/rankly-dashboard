'use client'

import { useState } from 'react'
import { UnifiedCard, UnifiedCardContent } from '@/components/ui/unified-card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { ChevronDown, ChevronRight, ArrowUpDown } from 'lucide-react'
import { useSkeletonLoading } from '@/components/ui/with-skeleton-loading'
import { SkeletonWrapper } from '@/components/ui/skeleton-wrapper'
import { UnifiedCardSkeleton } from '@/components/ui/unified-card-skeleton'

// Mock data for sentiment breakdown
const topicsData = [
  {
    id: 'ai-innovation',
    topic: 'AI Innovation',
    sentimentSplit: { positive: 65, negative: 20, neutral: 15 },
    prompts: [
      {
        id: 'ai-business',
        text: 'How is AI transforming business operations?',
        sentimentSplit: { positive: 70, negative: 15, neutral: 15 }
      },
      {
        id: 'ai-2024',
        text: 'What are the latest AI innovations in 2024?',
        sentimentSplit: { positive: 60, negative: 25, neutral: 15 }
      },
      {
        id: 'ai-customer',
        text: 'How can AI improve customer experience?',
        sentimentSplit: { positive: 80, negative: 10, neutral: 10 }
      }
    ]
  },
  {
    id: 'tech-leadership',
    topic: 'Technology Leadership',
    sentimentSplit: { positive: 55, negative: 30, neutral: 15 },
    prompts: [
      {
        id: 'tech-leader',
        text: 'What makes a great tech leader?',
        sentimentSplit: { positive: 50, negative: 35, neutral: 15 }
      },
      {
        id: 'tech-teams',
        text: 'How to build innovative technology teams?',
        sentimentSplit: { positive: 60, negative: 25, neutral: 15 }
      }
    ]
  },
  {
    id: 'product-excellence',
    topic: 'Product Excellence',
    sentimentSplit: { positive: 70, negative: 20, neutral: 10 },
    prompts: [
      {
        id: 'user-centric',
        text: 'How to build user-centric products?',
        sentimentSplit: { positive: 75, negative: 15, neutral: 10 }
      },
      {
        id: 'product-metrics',
        text: 'Key metrics for product success',
        sentimentSplit: { positive: 65, negative: 25, neutral: 10 }
      }
    ]
  },
  {
    id: 'competition',
    topic: 'Competition',
    sentimentSplit: { positive: 25, negative: 60, neutral: 15 },
    prompts: [
      {
        id: 'compete-large',
        text: 'How to compete with larger companies?',
        sentimentSplit: { positive: 20, negative: 70, neutral: 10 }
      },
      {
        id: 'startup-challenges',
        text: 'What are common startup challenges?',
        sentimentSplit: { positive: 30, negative: 50, neutral: 20 }
      }
    ]
  }
]

const personasData = [
  {
    id: 'tech-executive',
    topic: 'Tech Executive',
    sentimentSplit: { positive: 60, negative: 25, neutral: 15 },
    prompts: [
      {
        id: 'exec-strategy',
        text: 'How to develop technology strategy?',
        sentimentSplit: { positive: 65, negative: 20, neutral: 15 }
      },
      {
        id: 'exec-innovation',
        text: 'Leading digital transformation initiatives',
        sentimentSplit: { positive: 55, negative: 30, neutral: 15 }
      }
    ]
  },
  {
    id: 'product-manager',
    topic: 'Product Manager',
    sentimentSplit: { positive: 70, negative: 20, neutral: 10 },
    prompts: [
      {
        id: 'pm-strategy',
        text: 'Product roadmap planning and execution',
        sentimentSplit: { positive: 75, negative: 15, neutral: 10 }
      },
      {
        id: 'pm-metrics',
        text: 'Key product metrics and KPIs',
        sentimentSplit: { positive: 65, negative: 25, neutral: 10 }
      }
    ]
  },
  {
    id: 'startup-founder',
    topic: 'Startup Founder',
    sentimentSplit: { positive: 45, negative: 40, neutral: 15 },
    prompts: [
      {
        id: 'founder-funding',
        text: 'How to raise funding for your startup?',
        sentimentSplit: { positive: 40, negative: 45, neutral: 15 }
      },
      {
        id: 'founder-growth',
        text: 'Scaling startup operations and team',
        sentimentSplit: { positive: 50, negative: 35, neutral: 15 }
      }
    ]
  },
  {
    id: 'marketing-professional',
    topic: 'Marketing Professional',
    sentimentSplit: { positive: 55, negative: 30, neutral: 15 },
    prompts: [
      {
        id: 'marketing-digital',
        text: 'Digital marketing strategies and trends',
        sentimentSplit: { positive: 60, negative: 25, neutral: 15 }
      },
      {
        id: 'marketing-brand',
        text: 'Building brand awareness and recognition',
        sentimentSplit: { positive: 50, negative: 35, neutral: 15 }
      }
    ]
  }
]

interface SentimentBreakdownSectionProps {
  filterContext?: {
    selectedTopics: string[]
    selectedPersonas: string[]
    selectedPlatforms: string[]
  }
}

export function SentimentBreakdownSection({ filterContext }: SentimentBreakdownSectionProps) {
  const [sortBy, setSortBy] = useState<'topics' | 'personas'>('topics')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc')
  const [expandedTopics, setExpandedTopics] = useState<Set<string>>(new Set())

  // Skeleton loading
  const { showSkeleton, isVisible } = useSkeletonLoading(filterContext)

  const handleSortChange = (newSortBy: 'topics' | 'personas') => {
    setSortBy(newSortBy)
    setExpandedTopics(new Set()) // Clear expanded topics when switching
  }

  const handleColumnSort = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
  }

  const toggleExpanded = (topicId: string) => {
    const newExpanded = new Set(expandedTopics)
    if (newExpanded.has(topicId)) {
      newExpanded.delete(topicId)
    } else {
      newExpanded.add(topicId)
    }
    setExpandedTopics(newExpanded)
  }

  const SentimentBar = ({ sentimentSplit }: { sentimentSplit: { positive: number; negative: number; neutral: number } }) => {
    const total = sentimentSplit.positive + sentimentSplit.negative + sentimentSplit.neutral
    const positiveWidth = (sentimentSplit.positive / total) * 100
    const negativeWidth = (sentimentSplit.negative / total) * 100
    const neutralWidth = (sentimentSplit.neutral / total) * 100

    return (
      <div className="relative flex h-6 bg-gray-200 rounded-full overflow-hidden">
        <div 
          className="bg-green-500 h-full flex items-center justify-center" 
          style={{ width: `${positiveWidth}%` }}
        >
          {sentimentSplit.positive > 10 && (
            <span className="text-xs font-medium text-white">
              {sentimentSplit.positive}%
            </span>
          )}
        </div>
        <div 
          className="bg-red-500 h-full flex items-center justify-center" 
          style={{ width: `${negativeWidth}%` }}
        >
          {sentimentSplit.negative > 10 && (
            <span className="text-xs font-medium text-white">
              {sentimentSplit.negative}%
            </span>
          )}
        </div>
        <div 
          className="bg-blue-500 h-full flex items-center justify-center" 
          style={{ width: `${neutralWidth}%` }}
        >
          {sentimentSplit.neutral > 10 && (
            <span className="text-xs font-medium text-white">
              {sentimentSplit.neutral}%
            </span>
          )}
        </div>
      </div>
    )
  }

  const getCurrentData = () => {
    return sortBy === 'topics' ? topicsData : personasData
  }

  const sortData = (data: any[]) => {
    return [...data].sort((a, b) => {
      const aValue = a.topic.toLowerCase()
      const bValue = b.topic.toLowerCase()
      
      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1
      } else {
        return aValue < bValue ? 1 : -1
      }
    })
  }

  return (
    <SkeletonWrapper
      show={showSkeleton}
      isVisible={isVisible}
      skeleton={<UnifiedCardSkeleton type="table" tableColumns={4} tableRows={6} />}
    >
      <UnifiedCard className="w-full">
      <UnifiedCardContent className="p-6">
        {/* Header Section */}
        <div className="space-y-4 mb-6">
          <div>
            <h2 className="text-foreground">Sentiment Breakdown</h2>
            <p className="body-text text-muted-foreground mt-1">Detailed analysis of sentiment drivers across different topics and user personas</p>
          </div>

          {/* Sort Controls */}
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium text-muted-foreground">Sort by:</span>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="body-text">
                  {sortBy === 'topics' ? 'Topics' : 'User Persona'}
                  <ChevronDown className="ml-2 h-3 w-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-full">
                <DropdownMenuItem onClick={() => handleSortChange('topics')}>Topics</DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleSortChange('personas')}>User Persona</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Single Table */}
        <Table>
          <TableHeader>
            <TableRow className="border-border/60">
              <TableHead className="caption text-muted-foreground py-2 px-3">
                <Button
                  variant="ghost"
                  onClick={handleColumnSort}
                  className="h-auto p-0 font-medium text-muted-foreground hover:text-foreground flex items-center gap-1"
                >
                  {sortBy === 'topics' ? 'Topic' : 'User Persona'}
                  <ArrowUpDown className="w-3 h-3" />
                </Button>
              </TableHead>
              <TableHead className="caption text-muted-foreground py-2 px-3">Sentiment</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortData(getCurrentData()).map((item) => (
              <>
                {/* Topic Row */}
                <TableRow key={item.id} className="border-border/60 hover:bg-muted/30 transition-colors">
                  <TableCell className="py-3 px-3">
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleExpanded(item.id)}
                        className="p-0 h-auto hover:bg-transparent"
                      >
                        {expandedTopics.has(item.id) ? (
                          <ChevronDown className="w-4 h-4" />
                        ) : (
                          <ChevronRight className="w-4 h-4" />
                        )}
                      </Button>
                      <span className="font-medium text-foreground">{item.topic}</span>
                    </div>
                  </TableCell>
                  <TableCell className="py-3 px-3">
                    <div className="w-32">
                      <SentimentBar sentimentSplit={item.sentimentSplit} />
                    </div>
                  </TableCell>
                </TableRow>

                {/* Expanded Prompts */}
                {expandedTopics.has(item.id) && item.prompts.map((prompt: any) => (
                  <TableRow key={prompt.id} className="border-border/60 hover:bg-muted/20 transition-colors bg-muted/10">
                    <TableCell className="py-2 px-3 pl-12">
                      <span className="text-sm text-muted-foreground">{prompt.text}</span>
                    </TableCell>
                    <TableCell className="py-2 px-3">
                      <div className="w-32">
                        <SentimentBar sentimentSplit={prompt.sentimentSplit} />
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </>
            ))}
          </TableBody>
        </Table>
      </UnifiedCardContent>
    </UnifiedCard>
    </SkeletonWrapper>
  )
}
