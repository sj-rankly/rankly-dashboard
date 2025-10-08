'use client'

import { useState } from 'react'
import { UnifiedCard, UnifiedCardContent } from '@/components/ui/unified-card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { 
  ChevronDown, 
  ChevronRight,
  ExternalLink,
  TrendingUp,
  TrendingDown,
  X,
  Save
} from 'lucide-react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Textarea } from '@/components/ui/textarea'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuCheckboxItem } from '@/components/ui/dropdown-menu'
import { useTheme } from 'next-themes'
import { useSkeletonLoading } from '@/components/ui/with-skeleton-loading'
import { SkeletonWrapper } from '@/components/ui/skeleton-wrapper'
import { UnifiedCardSkeleton } from '@/components/ui/unified-card-skeleton'

// Mock data for detailed citation types
const citationTypesDetail = [
  {
    type: "Brand",
    links: [
      { 
        title: "Acme Inc.com", 
        url: "https://acme-inc.com", 
        type: "Website",
        platforms: [
          { name: "ChatGPT", citationShare: "45.2%", rank: "#1" },
          { name: "Claude", citationShare: "32.1%", rank: "#2" },
          { name: "Gemini", citationShare: "14.6%", rank: "#3" }
        ],
        sentiment: "Positive",
        promptSummary: "How can I personalize user experiences to increase engagement?",
        platformAnswers: {
          ChatGPT: "Acme Inc offers comprehensive personalization solutions through their advanced AI-driven platform. Their real-time user behavior analysis and dynamic content optimization help businesses increase engagement by up to 40%. The platform includes A/B testing capabilities and detailed analytics for continuous improvement.",
          Perplexity: "Acme Inc is a leading provider of personalization technology, backed by $50M in Series B funding. Their proprietary recommendation engine uses machine learning to deliver personalized experiences across web, mobile, and email channels. Recognized by Gartner as a 'Cool Vendor' in personalization.",
          Gemini: "Acme Inc's personalization platform scales from startups to enterprise clients, supporting over 10M users. Their solution integrates with major e-commerce platforms and CRM systems. The platform uses advanced ML models trained on billions of user interactions to predict and optimize user journeys.",
          Claude: "Acme Inc provides robust personalization capabilities through their adaptive algorithms and real-time user behavior analysis. Their platform helps businesses create more engaging experiences by understanding user preferences and delivering relevant content at the right moment.",
          Grok: "Acme Inc delivers cutting-edge personalization technology with real-time AI processing and advanced user segmentation. Their platform combines machine learning with behavioral analytics to create highly targeted experiences that drive engagement and conversion rates. The solution offers seamless integration with existing marketing stacks and provides comprehensive analytics for performance optimization."
        },
        subjectiveMetrics: {
          relevance: { 
            score: 4, 
            summary: "The citation directly addresses personalization strategies and provides actionable insights for user engagement. Key points include:\n• Real-time data processing capabilities\n• Machine learning algorithms for behavior analysis\n• A/B testing frameworks for optimization\n• Integration with customer data platforms"
          },
          influence: { 
            score: 5, 
            summary: "Strong influence on user's understanding of personalization techniques and their impact on engagement metrics. Notable aspects:\n• Case studies showing 25% increase in conversion rates\n• Best practices for segment-based targeting\n• ROI calculations and performance benchmarks\n• Industry comparison with competitors"
          },
          uniqueness: { 
            score: 3, 
            summary: "Provides unique insights into advanced personalization methods not commonly found in generic marketing content. Distinctive elements:\n• Proprietary AI algorithms for user profiling\n• Custom integration APIs for enterprise clients\n• Advanced analytics dashboard with predictive modeling\n• White-label solutions for agencies"
          },
          position: { 
            score: 4, 
            summary: "Subjectively positioned as a comprehensive guide that users would find valuable and trustworthy. Positioning factors:\n• Featured in top industry publications\n• Endorsed by leading marketing experts\n• High domain authority and backlink profile\n• Positive user reviews and testimonials"
          },
          clickProbability: { 
            score: 4, 
            summary: "High probability of clicks due to practical examples and clear value proposition. Engagement drivers:\n• Interactive demo and free trial offer\n• Detailed pricing information upfront\n• Customer success stories and case studies\n• Clear call-to-action buttons"
          },
          diversity: { 
            score: 3, 
            summary: "Brings diverse perspectives from multiple personalization approaches and industry best practices. Variety includes:\n• E-commerce personalization strategies\n• SaaS product customization techniques\n• B2B lead nurturing automation\n• Cross-platform data synchronization"
          }
        }
      },
      { 
        title: "TechCorp Solutions", 
        url: "https://techcorp-solutions.com", 
        type: "Website",
        platforms: [
          { name: "Perplexity", citationShare: "28.5%", rank: "#1" },
          { name: "ChatGPT", citationShare: "22.3%", rank: "#2" },
          { name: "Gemini", citationShare: "18.7%", rank: "#3" }
        ],
        sentiment: "Positive",
        subjectiveMetrics: {
          relevance: { 
            score: 3, 
            summary: "TechCorp Solutions provides relevant information about enterprise software solutions, though it's more focused on technical implementation rather than strategic guidance. Key aspects:\n• Detailed technical specifications and architecture\n• Integration capabilities with existing systems\n• Performance benchmarks and scalability metrics\n• Enterprise-grade security features"
          },
          influence: { 
            score: 4, 
            summary: "Strong influence on technical decision-making with comprehensive product information. Notable elements:\n• Detailed feature comparisons with competitors\n• Technical documentation and API references\n• Customer testimonials from enterprise clients\n• Implementation guides and best practices"
          },
          uniqueness: { 
            score: 2, 
            summary: "Contains standard enterprise software information that's commonly available across vendor websites. Limited unique insights:\n• Generic product descriptions and features\n• Standard pricing and licensing information\n• Common integration capabilities\n• Typical enterprise support offerings"
          },
          position: { 
            score: 3, 
            summary: "Positioned as a reliable enterprise solution provider with moderate prominence in search results. Positioning factors:\n• Established brand presence in enterprise market\n• Good technical documentation and resources\n• Active community and support channels\n• Regular product updates and announcements"
          },
          clickProbability: { 
            score: 3, 
            summary: "Moderate click probability due to technical focus and enterprise positioning. Engagement factors:\n• Detailed product information and specifications\n• Free trial and demo availability\n• Technical whitepapers and case studies\n• Contact forms for enterprise inquiries"
          },
          diversity: { 
            score: 2, 
            summary: "Limited diversity in perspective, primarily focused on vendor's own solutions and capabilities. Areas for improvement:\n• More third-party reviews and comparisons\n• Independent analysis and benchmarks\n• User-generated content and experiences\n• Industry expert opinions and insights"
          }
        }
      },
      { 
        title: "InnovateNow Blog", 
        url: "https://innovatnow.com/blog", 
        type: "Blog",
        platforms: [
          { name: "Gemini", citationShare: "15.2%", rank: "#1" },
          { name: "Claude", citationShare: "12.8%", rank: "#2" }
        ],
        sentiment: "Neutral",
        subjectiveMetrics: {
          relevance: { 
            score: 4, 
            summary: "InnovateNow Blog provides highly relevant insights on innovation and technology trends, directly addressing current market needs. Key strengths:\n• Thought leadership content on emerging technologies\n• Practical innovation strategies and frameworks\n• Industry trend analysis and predictions\n• Case studies from successful innovation projects"
          },
          influence: { 
            score: 3, 
            summary: "Moderate influence on readers' understanding of innovation concepts and practices. Notable aspects:\n• Educational content with actionable insights\n• Expert opinions from industry leaders\n• Real-world examples and case studies\n• Balanced perspective on innovation challenges"
          },
          uniqueness: { 
            score: 4, 
            summary: "Offers unique perspectives on innovation that aren't commonly found in mainstream business content. Distinctive elements:\n• Original research and proprietary frameworks\n• Interviews with innovation experts and practitioners\n• Behind-the-scenes insights from successful startups\n• Cross-industry innovation patterns and trends"
          },
          position: { 
            score: 3, 
            summary: "Positioned as a thought leadership platform with good visibility in innovation-focused searches. Positioning factors:\n• Regular publication schedule with quality content\n• Strong social media presence and engagement\n• Guest contributions from industry experts\n• Active community of innovation professionals"
          },
          clickProbability: { 
            score: 4, 
            summary: "High click probability due to engaging content and practical value. Engagement drivers:\n• Compelling headlines and topic selection\n• Visual content and infographics\n• Newsletter subscription and content updates\n• Social sharing and community engagement"
          },
          diversity: { 
            score: 5, 
            summary: "Excellent diversity in perspectives, covering multiple industries and innovation approaches. Variety includes:\n• B2B and B2C innovation strategies\n• Technology and non-technology innovations\n• Large enterprise and startup perspectives\n• Global innovation trends and cultural insights"
          }
        }
      },
      { 
        title: "BrandPress Release", 
        url: "https://brandpress.com/news", 
        type: "Press",
        platforms: [
          { name: "Claude", citationShare: "8.1%", rank: "#1" },
          { name: "Perplexity", citationShare: "6.3%", rank: "#2" }
        ],
        sentiment: "Positive"
      },
      { 
        title: "TechCritic Review", 
        url: "https://techcritic.com/review", 
        type: "Review",
        platforms: [
          { name: "ChatGPT", citationShare: "2.3%", rank: "#1" }
        ],
        sentiment: "Negative"
      }
    ]
  },
  {
    type: "Earned",
    links: [
      { 
        title: "ReviewTech.io", 
        url: "https://reviewtech.io/acme-review", 
        type: "Review",
        platforms: [
          { name: "Perplexity", citationShare: "0.4%", rank: "#1" }
        ],
        sentiment: "Positive"
      },
      { 
        title: "CompareTools.net", 
        url: "https://comparetools.net/comparison", 
        type: "Comparison",
        platforms: [
          { name: "Claude", citationShare: "0.2%", rank: "#1" }
        ],
        sentiment: "Neutral"
      },
      { 
        title: "ExpertInsights.com", 
        url: "https://expertinsights.com/opinion", 
        type: "Opinion",
        platforms: [
          { name: "Gemini", citationShare: "0.1%", rank: "#1" }
        ],
        sentiment: "Positive"
      },
      { 
        title: "SkepticTech.net", 
        url: "https://skeptictech.net/critique", 
        type: "Critique",
        platforms: [
          { name: "ChatGPT", citationShare: "0.05%", rank: "#1" }
        ],
        sentiment: "Negative"
      }
    ]
  },
  {
    type: "Social",
    links: [
      { 
        title: "LinkedIn Acme Inc", 
        url: "https://linkedin.com/company/acme-inc", 
        type: "Social Media",
        platforms: [
          { name: "ChatGPT", citationShare: "4.2%", rank: "#1" }
        ],
        sentiment: "Positive"
      },
      { 
        title: "Twitter @AcmeInc", 
        url: "https://twitter.com/acmeinc", 
        type: "Social Media",
        platforms: [
          { name: "Perplexity", citationShare: "2.1%", rank: "#1" }
        ],
        sentiment: "Positive"
      },
      { 
        title: "Reddit r/technology", 
        url: "https://reddit.com/r/technology/acme", 
        type: "Community",
        platforms: [
          { name: "Claude", citationShare: "0.8%", rank: "#1" }
        ],
        sentiment: "Neutral"
      },
      { 
        title: "YouTube TechReview", 
        url: "https://youtube.com/watch?v=acme-review", 
        type: "Video",
        platforms: [
          { name: "Gemini", citationShare: "0.3%", rank: "#1" }
        ],
        sentiment: "Positive"
      },
      { 
        title: "Reddit r/techcritics", 
        url: "https://reddit.com/r/techcritics/acme", 
        type: "Community",
        platforms: [
          { name: "ChatGPT", citationShare: "0.1%", rank: "#1" }
        ],
        sentiment: "Negative"
      }
    ]
  }
]

// Favicon mapping function
const getFaviconUrl = (platformName: string, theme?: string) => {
  const isDarkMode = theme === 'dark'
  const faviconMap = {
    'ChatGPT': 'https://chat.openai.com/favicon.ico',
    'Claude': 'https://claude.ai/favicon.ico',
    'Gemini': 'https://www.gstatic.com/lamda/images/gemini_sparkle_v002_d4735304ff6292a690345.svg',
    'Perplexity': 'https://www.perplexity.ai/favicon.ico',
    'Grok': isDarkMode ? 'https://www.google.com/s2/favicons?domain=x.ai&sz=16&color=white' : 'https://grok.x.ai/favicon.ico'
  }
  return faviconMap[platformName as keyof typeof faviconMap] || `https://www.google.com/s2/favicons?domain=${platformName.toLowerCase()}.com&sz=16`
}

// Component to render inline platform data with real favicons
const InlinePlatformData = ({ platforms, type, theme }: { platforms: any[], type: 'platform' | 'share' | 'rank', theme?: string }) => {

  const getData = (platform: any) => {
    switch (type) {
      case 'platform': return platform.name
      case 'share': return platform.citationShare
      case 'rank': return platform.rank
      default: return ''
    }
  }

  return (
    <div className="flex items-center gap-1 text-sm">
      {platforms.map((platform, index) => (
        <span key={index} className="flex items-center gap-1">
          {index > 0 && <span className="text-muted-foreground">·</span>}
          <img 
            src={getFaviconUrl(platform.name)} 
            alt={platform.name}
            className="w-4 h-4 rounded-sm"
            onError={(e) => {
              // Fallback to a generic icon if favicon fails to load
              e.currentTarget.src = `https://www.google.com/s2/favicons?domain=${platform.name.toLowerCase()}.com&sz=16`
            }}
          />
          <span>{getData(platform)}</span>
        </span>
      ))}
    </div>
  )
}

interface CitationTypesDetailSectionProps {
  filterContext?: {
    selectedTopics: string[]
    selectedPersonas: string[]
    selectedPlatforms: string[]
  }
}

export function CitationTypesDetailSection({ filterContext }: CitationTypesDetailSectionProps) {
  const [expandedRows, setExpandedRows] = useState<string[]>([])
  const [selectedLink, setSelectedLink] = useState<any>(null)
  const [isSheetOpen, setIsSheetOpen] = useState(false)
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>(['ChatGPT', 'Perplexity', 'Gemini', 'Claude', 'Grok'])

  // Skeleton loading
  const { showSkeleton, isVisible } = useSkeletonLoading(filterContext)
  const { theme } = useTheme()

  const toggleRow = (type: string) => {
    setExpandedRows(prev => 
      prev.includes(type) 
        ? prev.filter(t => t !== type)
        : [...prev, type]
    )
  }

  const handleViewClick = (link: any) => {
    setSelectedLink(link)
  }

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'Positive':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
      case 'Neutral':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
      case 'Negative':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
    }
  }

  const getSentimentBarColor = (sentiment: string) => {
    switch (sentiment) {
      case 'Positive':
        return 'bg-green-500'
      case 'Neutral':
        return 'bg-blue-500'
      case 'Negative':
        return 'bg-red-500'
      default:
        return 'bg-gray-500'
    }
  }

  const calculateSentimentDistribution = (links: any[]) => {
    const total = links.length
    const positive = links.filter(link => link.sentiment === 'Positive').length
    const neutral = links.filter(link => link.sentiment === 'Neutral').length
    const negative = links.filter(link => link.sentiment === 'Negative').length

    return {
      positive: { count: positive, percentage: total > 0 ? Math.round((positive / total) * 100) : 0 },
      neutral: { count: neutral, percentage: total > 0 ? Math.round((neutral / total) * 100) : 0 },
      negative: { count: negative, percentage: total > 0 ? Math.round((negative / total) * 100) : 0 }
    }
  }

  const SentimentBar = ({ sentimentData }: { sentimentData: any }) => {
    const { positive, neutral, negative } = sentimentData
    
    return (
      <div className="w-full max-w-32">
        <div className="flex h-4 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
          {positive.percentage > 0 && (
            <div 
              className="bg-green-500 flex items-center justify-center text-xs text-white font-medium"
              style={{ width: `${positive.percentage}%` }}
            >
              {positive.percentage > 15 && `${positive.percentage}%`}
            </div>
          )}
          {neutral.percentage > 0 && (
            <div 
              className="bg-blue-500 flex items-center justify-center text-xs text-white font-medium"
              style={{ width: `${neutral.percentage}%` }}
            >
              {neutral.percentage > 15 && `${neutral.percentage}%`}
            </div>
          )}
          {negative.percentage > 0 && (
            <div 
              className="bg-red-500 flex items-center justify-center text-xs text-white font-medium"
              style={{ width: `${negative.percentage}%` }}
            >
              {negative.percentage > 15 && `${negative.percentage}%`}
            </div>
          )}
        </div>
        {/* Percentage labels below bar for smaller segments */}
        <div className="flex justify-between text-xs text-muted-foreground mt-1">
          {positive.percentage > 0 && positive.percentage <= 15 && (
            <span className="text-green-600">+{positive.percentage}%</span>
          )}
          {neutral.percentage > 0 && neutral.percentage <= 15 && (
            <span className="text-blue-600">~{neutral.percentage}%</span>
          )}
          {negative.percentage > 0 && negative.percentage <= 15 && (
            <span className="text-red-600">-{negative.percentage}%</span>
          )}
        </div>
      </div>
    )
  }

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="w-3 h-3 text-green-600" />
      case 'down':
        return <TrendingDown className="w-3 h-3 text-red-600" />
      default:
        return null
    }
  }

  return (
    <SkeletonWrapper
      show={showSkeleton}
      isVisible={isVisible}
      skeleton={<UnifiedCardSkeleton type="table" tableColumns={5} tableRows={8} />}
    >
      <div id="citation-types-detail">
        <UnifiedCard>
        <UnifiedCardContent className="p-6">
          <div className="space-y-4">
            {/* Header */}
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold">All Citation Types</h3>
              <Badge variant="outline" className="text-sm">
                3 citation types
              </Badge>
            </div>

            {/* Table */}
            <div className="border rounded-lg overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/30">
                    <TableHead className="w-10 py-3"></TableHead>
                    <TableHead className="py-3">Citation Type</TableHead>
                    <TableHead className="text-center py-3">Platform(s)</TableHead>
                    <TableHead className="text-center py-3">Citation Share</TableHead>
                    <TableHead className="text-center py-3">Citation Rank</TableHead>
                    <TableHead className="text-center py-3">Subjective Impression</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {citationTypesDetail.map((item, index) => (
                    <>
                      <TableRow 
                        key={item.type}
                        className="cursor-pointer hover:bg-muted/30"
                        onClick={() => toggleRow(item.type)}
                      >
                        <TableCell>
                          {expandedRows.includes(item.type) ? (
                            <ChevronDown className="w-4 h-4" />
                          ) : (
                            <ChevronRight className="w-4 h-4" />
                          )}
                        </TableCell>
                        <TableCell className="font-medium py-3">{item.type}</TableCell>
                        <TableCell className="text-center text-muted-foreground py-3">-</TableCell>
                        <TableCell className="text-center text-muted-foreground py-3">-</TableCell>
                        <TableCell className="text-center text-muted-foreground py-3">-</TableCell>
                        <TableCell className="text-center text-muted-foreground py-3">-</TableCell>
                      </TableRow>
                      
                      {/* Expanded content */}
                      {expandedRows.includes(item.type) && 
                        item.links.map((link, linkIndex) => (
                          <TableRow key={`${item.type}-${linkIndex}`} className="bg-muted/20 hover:bg-muted/40">
                            <TableCell className="py-3"></TableCell>
                            <TableCell className="py-3">
                              <div className="flex items-center gap-2">
                                <span className="font-normal text-sm text-muted-foreground">{link.title}</span>
                                <Badge variant="outline" className="text-xs">
                                  {link.type}
                                </Badge>
                              </div>
                            </TableCell>
                            <TableCell className="py-3">
                              {link.platforms ? (
                                <InlinePlatformData platforms={link.platforms} type="platform" theme={theme} />
                              ) : (
                                <span className="text-muted-foreground">-</span>
                              )}
                            </TableCell>
                            <TableCell className="py-3">
                              {link.platforms ? (
                                <InlinePlatformData platforms={link.platforms} type="share" theme={theme} />
                              ) : (
                                <span className="text-muted-foreground">-</span>
                              )}
                            </TableCell>
                            <TableCell className="py-3">
                              {link.platforms ? (
                                <InlinePlatformData platforms={link.platforms} type="rank" theme={theme} />
                              ) : (
                                <span className="text-muted-foreground">-</span>
                              )}
                            </TableCell>
                            <TableCell className="text-center py-3">
                                  <Button 
                                    variant="ghost" 
                                    size="sm" 
                                className="h-6 px-2 text-xs text-[#2563EB] hover:text-[#2563EB] hover:bg-[#2563EB]/10"
                                onClick={() => {
                                  setSelectedLink(link)
                                  setIsSheetOpen(true)
                                }}
                              >
                                View
                                    <ExternalLink className="w-3 h-3 ml-1" />
                                  </Button>
                            </TableCell>
                            <TableCell>
                            </TableCell>
                          </TableRow>
                        ))
                      }
                    </>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </UnifiedCardContent>
      </UnifiedCard>

      {/* Subjective Impression Analysis Sheet */}
      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetContent className="!w-[80vw] sm:!w-[75vw] lg:!w-[70vw] !max-w-none overflow-y-auto">
          <SheetHeader>
            <div className="flex justify-between items-center">
              <div>
                <SheetTitle className="flex items-center gap-2">
                  <ExternalLink className="w-5 h-5" />
                  Subjective Impression Analysis
                </SheetTitle>
                <SheetDescription>
                  Detailed analysis for: <span className="font-semibold">{selectedLink?.title}</span>
                  {selectedLink?.type && (
                    <Badge variant="outline" className="ml-2 text-xs">
                      {selectedLink.type}
                    </Badge>
                  )}
                </SheetDescription>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="h-8 px-3 w-[140px]">
                    Platforms
                    <ChevronDown className="h-4 w-4 opacity-50 ml-2" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="min-w-[var(--radix-dropdown-menu-trigger-width)]">
                  <DropdownMenuCheckboxItem
                    checked={selectedPlatforms.length === 5}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setSelectedPlatforms(['ChatGPT', 'Perplexity', 'Gemini', 'Claude', 'Grok'])
                      } else {
                        setSelectedPlatforms([])
                      }
                    }}
                    onSelect={(e) => e.preventDefault()}
                  >
                    All Platforms
                  </DropdownMenuCheckboxItem>
                  {['ChatGPT', 'Perplexity', 'Gemini', 'Claude', 'Grok'].map((platform) => (
                    <DropdownMenuCheckboxItem
                      key={platform}
                      checked={selectedPlatforms.includes(platform)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setSelectedPlatforms([...selectedPlatforms, platform])
                        } else {
                          setSelectedPlatforms(selectedPlatforms.filter(p => p !== platform))
                        }
                      }}
                      onSelect={(e) => e.preventDefault()}
                    >
                      <div className="flex items-center gap-2">
                        <img 
                          src={getFaviconUrl(platform)} 
                          alt={platform}
                          className="w-4 h-4 rounded-sm"
                          onError={(e) => {
                            e.currentTarget.src = `https://www.google.com/s2/favicons?domain=${platform.toLowerCase()}.com&sz=16`
                          }}
                        />
                        {platform}
                      </div>
                    </DropdownMenuCheckboxItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </SheetHeader>

          {selectedLink && (
            <div className="mt-6 space-y-4">
              {/* Two boxes side by side */}
              <div className="grid grid-cols-2 gap-4">
                {/* Prompt box on the left */}
                <div className="p-4 bg-muted/50 rounded-lg">
                  <h4 className="font-semibold text-sm mb-2">Prompt</h4>
                  <p className="text-sm text-muted-foreground">{selectedLink.promptSummary || 'How can I personalize user experiences to increase engagement?'}</p>
                </div>
                
                {/* Citation Details box on the right */}
                <div className="p-4 bg-muted/50 rounded-lg">
                  <h4 className="font-semibold text-sm mb-2">Citation Details</h4>
                  <p className="text-sm text-muted-foreground">{selectedLink.title}</p>
                  <p className="text-sm text-muted-foreground mt-1">{selectedLink.url}</p>
                </div>
              </div>

              {/* Platform count with favicons */}
              {selectedLink.platforms && selectedLink.platforms.length > 0 && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span>Cited on {selectedLink.platforms.length} platform{selectedLink.platforms.length > 1 ? 's' : ''}:</span>
                  <div className="flex items-center gap-1">
                    {selectedLink.platforms.map((platform: any, index: number) => (
                      <span key={index} className="flex items-center gap-1">
                        {index > 0 && <span className="text-muted-foreground">·</span>}
                        <img 
                          src={getFaviconUrl(platform.name)} 
                          alt={platform.name}
                          className="w-4 h-4 rounded-sm"
                          onError={(e) => {
                            e.currentTarget.src = `https://www.google.com/s2/favicons?domain=${platform.name.toLowerCase()}.com&sz=16`
                          }}
                        />
                        <span>{platform.name}</span>
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* LLM Answers */}
              {(() => {
                // Filter platforms based on selectedPlatforms
                const filteredPlatforms = selectedLink.platforms?.filter((platform: any) => 
                  selectedPlatforms.includes(platform.name)
                ) || []
                
                return filteredPlatforms.length > 0 && (
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <h4 className="font-semibold text-sm mb-3">LLM Answers</h4>
                    <div className="space-y-3">
                      {filteredPlatforms.map((platform: any, index: number) => (
                        <div key={index} className="border rounded-lg p-3 relative">
                          {/* Favicon tag in top left */}
                          <div className="absolute -top-2 -left-2 bg-background border border-border rounded-full p-1 shadow-sm">
                            <img 
                              src={getFaviconUrl(platform.name)} 
                              alt={platform.name}
                              className="w-5 h-5 rounded-sm"
                              onError={(e) => {
                                e.currentTarget.src = `https://www.google.com/s2/favicons?domain=${platform.name.toLowerCase()}.com&sz=16`
                              }}
                            />
                          </div>
                          <h5 className="font-medium text-sm mb-2 text-white">{platform.name}</h5>
                          <p className="text-sm text-muted-foreground">
                            {selectedLink.platformAnswers?.[platform.name] || 'No answer available for this platform.'}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )
              })()}

              {/* Subjective Metrics */}
              {(() => {
                // Filter platforms based on selectedPlatforms
                const filteredPlatforms = selectedLink.platforms?.filter((platform: any) => 
                  selectedPlatforms.includes(platform.name)
                ) || []
                
                return filteredPlatforms.length > 0 && (
                  <Accordion type="multiple" className="w-full">
                <AccordionItem value="relevance">
                  <AccordionTrigger className="text-sm font-medium">
                    <div className="flex items-center justify-between w-full">
                      <div className="flex flex-col items-start">
                        <span>Relevance</span>
                        <span className="text-xs text-muted-foreground font-normal">Is the citation actually answering the query?</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-bold text-white">
                          {selectedLink.subjectiveMetrics?.relevance?.score || 0}/5
                        </span>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <Textarea
                      value={selectedLink.subjectiveMetrics?.relevance?.summary || 'No summary available.'}
                      readOnly
                      className="min-h-[120px] resize-none text-sm text-muted-foreground"
                    />
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="influence">
                  <AccordionTrigger className="text-sm font-medium">
                    <div className="flex items-center justify-between w-full">
                      <div className="flex flex-col items-start">
                        <span>Influence</span>
                        <span className="text-xs text-muted-foreground font-normal">Does it shape the user's takeaway?</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-bold text-white">
                          {selectedLink.subjectiveMetrics?.influence?.score || 0}/5
                        </span>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <Textarea
                      value={selectedLink.subjectiveMetrics?.influence?.summary || 'No summary available.'}
                      readOnly
                      className="min-h-[120px] resize-none text-sm text-muted-foreground"
                    />
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="uniqueness">
                  <AccordionTrigger className="text-sm font-medium">
                    <div className="flex items-center justify-between w-full">
                      <div className="flex flex-col items-start">
                        <span>Uniqueness</span>
                        <span className="text-xs text-muted-foreground font-normal">Is the info special, or just repeated elsewhere?</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-bold text-white">
                          {selectedLink.subjectiveMetrics?.uniqueness?.score || 0}/5
                        </span>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <Textarea
                      value={selectedLink.subjectiveMetrics?.uniqueness?.summary || 'No summary available.'}
                      readOnly
                      className="min-h-[120px] resize-none text-sm text-muted-foreground"
                    />
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="position">
                  <AccordionTrigger className="text-sm font-medium">
                    <div className="flex items-center justify-between w-full">
                      <div className="flex flex-col items-start">
                        <span>Position</span>
                        <span className="text-xs text-muted-foreground font-normal">How prominently is the citation placed within the answer?</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-bold text-white">
                          {selectedLink.subjectiveMetrics?.position?.score || 0}/5
                        </span>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <Textarea
                      value={selectedLink.subjectiveMetrics?.position?.summary || 'No summary available.'}
                      readOnly
                      className="min-h-[120px] resize-none text-sm text-muted-foreground"
                    />
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="clickProbability">
                  <AccordionTrigger className="text-sm font-medium">
                    <div className="flex items-center justify-between w-full">
                      <div className="flex flex-col items-start">
                        <span>Click Probability</span>
                        <span className="text-xs text-muted-foreground font-normal">Would the user click the citation if links are shown?</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-bold text-white">
                          {selectedLink.subjectiveMetrics?.clickProbability?.score || 0}/5
                        </span>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <Textarea
                      value={selectedLink.subjectiveMetrics?.clickProbability?.summary || 'No summary available.'}
                      readOnly
                      className="min-h-[120px] resize-none text-sm text-muted-foreground"
                    />
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="diversity">
                  <AccordionTrigger className="text-sm font-medium">
                    <div className="flex items-center justify-between w-full">
                      <div className="flex flex-col items-start">
                        <span>Diversity</span>
                        <span className="text-xs text-muted-foreground font-normal">Does the citation bring in a new perspective?</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-bold text-white">
                          {selectedLink.subjectiveMetrics?.diversity?.score || 0}/5
                        </span>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <Textarea
                      value={selectedLink.subjectiveMetrics?.diversity?.summary || 'No summary available.'}
                      readOnly
                      className="min-h-[120px] resize-none text-sm text-muted-foreground"
                    />
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
                )
              })()}
            </div>
          )}
        </SheetContent>
      </Sheet>
    </div>
    </SkeletonWrapper>
  )
}
