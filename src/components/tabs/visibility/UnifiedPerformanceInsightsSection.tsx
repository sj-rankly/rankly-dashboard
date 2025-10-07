'use client'

import { UnifiedCard, UnifiedCardContent } from '@/components/ui/unified-card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  TrendingUp, 
  TrendingDown, 
  AlertTriangle, 
  CheckCircle, 
  ArrowUp, 
  ArrowDown, 
  Info,
  Expand,
  ExternalLink,
  Target,
  Zap,
  Shield
} from 'lucide-react'
import { useSkeletonLoading } from '@/components/ui/with-skeleton-loading'
import { SkeletonWrapper } from '@/components/ui/skeleton-wrapper'
import { UnifiedCardSkeleton } from '@/components/ui/unified-card-skeleton'

interface UnifiedPerformanceInsightsSectionProps {
  filterContext?: {
    selectedTopics: string[]
    selectedPersonas: string[]
    selectedPlatforms: string[]
  }
}

export function UnifiedPerformanceInsightsSection({ filterContext }: UnifiedPerformanceInsightsSectionProps) {
  const { showSkeleton, isVisible } = useSkeletonLoading(filterContext)

  // Mock data for insights
  const whatsWorkingData = [
    {
      id: 1,
      insight: "Visibility Score increased by 8.2% this week",
      metric: "Visibility Score",
      impact: "High",
      trend: "up",
      value: "+8.2%",
      recommendation: "Continue current content strategy focusing on AI-generated answers",
      category: "Performance"
    },
    {
      id: 2,
      insight: "Citation Share growing consistently across platforms",
      metric: "Citation Share",
      impact: "High",
      trend: "up",
      value: "26.9%",
      recommendation: "Continue building authoritative content that gets referenced",
      category: "Authority"
    }
  ]

  const needsAttentionData = [
    {
      id: 1,
      insight: "Share of Voice declining in competitive segments",
      metric: "Share of Voice", 
      impact: "High",
      trend: "down",
      value: "-3.2%",
      recommendation: "Increase content volume in high-competition topics",
      category: "Competition"
    },
    {
      id: 2,
      insight: "Depth of Mention below optimal threshold",
      metric: "Depth of Mention",
      impact: "Medium", 
      trend: "down",
      value: "3.2%",
      recommendation: "Optimize content to appear earlier in AI responses",
      category: "Positioning"
    },
    {
      id: 3,
      insight: "Average Position slipping in key categories",
      metric: "Average Position",
      impact: "High",
      trend: "down",
      value: "1.8",
      recommendation: "Review SEO strategy for target keywords and improve content relevance",
      category: "SEO"
    },
    {
      id: 4,
      insight: "Topic coverage gaps in emerging areas",
      metric: "Topic Coverage",
      impact: "Medium",
      trend: "neutral",
      value: "67%",
      recommendation: "Expand content strategy to cover trending topics in your industry",
      category: "Strategy"
    }
  ]

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return <ArrowUp className="w-3 h-3 text-green-500" />
      case 'down':
        return <ArrowDown className="w-3 h-3 text-red-500" />
      default:
        return <div className="w-3 h-3 text-gray-400">-</div>
    }
  }

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'High':
        return 'bg-red-100 text-red-800 border-red-200'
      case 'Medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'Low':
        return 'bg-green-100 text-green-800 border-green-200'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Performance':
        return <TrendingUp className="w-4 h-4" />
      case 'Ranking':
        return <Target className="w-4 h-4" />
      case 'Content':
        return <Zap className="w-4 h-4" />
      case 'Authority':
        return <Shield className="w-4 h-4" />
      case 'Competition':
        return <AlertTriangle className="w-4 h-4" />
      case 'Positioning':
        return <Target className="w-4 h-4" />
      case 'SEO':
        return <TrendingUp className="w-4 h-4" />
      case 'Strategy':
        return <Info className="w-4 h-4" />
      default:
        return <Info className="w-4 h-4" />
    }
  }

  return (
    <SkeletonWrapper
      show={showSkeleton}
      isVisible={isVisible}
      skeleton={<UnifiedCardSkeleton type="table" tableColumns={3} tableRows={4} />}
    >
      <UnifiedCard>
      <UnifiedCardContent className="p-6">
        <div className="space-y-4 mb-6">
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-semibold leading-none tracking-tight text-foreground">Performance Insights</h2>
          </div>
          <p className="body-text text-muted-foreground mt-1">
            Actionable insights derived from your visibility metrics to guide strategic decisions
          </p>
        </div>

        <Tabs defaultValue="whats-working" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="whats-working" className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-500" />
              What's Working
            </TabsTrigger>
            <TabsTrigger value="needs-attention" className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-orange-500" />
              Needs Attention
            </TabsTrigger>
          </TabsList>

          <TabsContent value="whats-working" className="space-y-4">
            <div className="border rounded-lg">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-12"></TableHead>
                    <TableHead className="caption text-muted-foreground py-2 px-3">Insight</TableHead>
                    <TableHead className="caption text-muted-foreground py-2 px-3 w-24">Metric</TableHead>
                    <TableHead className="caption text-muted-foreground py-2 px-3 w-20">Impact</TableHead>
                    <TableHead className="caption text-muted-foreground py-2 px-3 w-20">Value</TableHead>
                    <TableHead className="caption text-muted-foreground py-2 px-3 w-16">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {whatsWorkingData.slice(0, 5).map((item, index) => (
                    <TableRow key={item.id} className="hover:bg-muted/50">
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {getCategoryIcon(item.category)}
                          {getTrendIcon(item.trend)}
                        </div>
                      </TableCell>
                      <TableCell className="py-3">
                        <div className="space-y-1">
                          <div className="font-medium text-sm text-foreground">{item.insight}</div>
                          <div className="text-xs text-muted-foreground">{item.recommendation}</div>
                        </div>
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">{item.metric}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className={`text-xs ${getImpactColor(item.impact)}`}>
                          {item.impact}
                        </Badge>
                      </TableCell>
                      <TableCell className="font-mono text-sm font-medium text-green-600">{item.value}</TableCell>
                      <TableCell>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-6 px-2 text-xs text-blue-600 hover:text-blue-700 hover:bg-blue-50">
                              View
                              <ExternalLink className="w-3 h-3 ml-1" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-2xl">
                            <DialogHeader>
                              <DialogTitle className="flex items-center gap-2">
                                {getCategoryIcon(item.category)}
                                {item.insight}
                              </DialogTitle>
                            </DialogHeader>
                            <div className="space-y-4">
                              <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                  <h4 className="font-medium text-sm">Metric Details</h4>
                                  <div className="text-sm text-muted-foreground">
                                    <div><strong>Metric:</strong> {item.metric}</div>
                                    <div><strong>Current Value:</strong> {item.value}</div>
                                    <div><strong>Impact Level:</strong> {item.impact}</div>
                                    <div><strong>Category:</strong> {item.category}</div>
                                  </div>
                                </div>
                                <div className="space-y-2">
                                  <h4 className="font-medium text-sm">Recommendation</h4>
                                  <p className="text-sm text-muted-foreground">{item.recommendation}</p>
                                </div>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {/* Expand Button */}
            <div className="flex justify-center">
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm" className="gap-2">
                    <Expand className="w-4 h-4" />
                    View All Insights
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>All "What's Working" Insights</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-12"></TableHead>
                          <TableHead>Insight</TableHead>
                          <TableHead className="w-24">Metric</TableHead>
                          <TableHead className="w-20">Impact</TableHead>
                          <TableHead className="w-20">Value</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {whatsWorkingData.map((item) => (
                          <TableRow key={item.id}>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                {getCategoryIcon(item.category)}
                                {getTrendIcon(item.trend)}
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="space-y-1">
                                <div className="font-medium text-sm">{item.insight}</div>
                                <div className="text-xs text-muted-foreground">{item.recommendation}</div>
                              </div>
                            </TableCell>
                            <TableCell className="text-sm">{item.metric}</TableCell>
                            <TableCell>
                              <Badge variant="outline" className={`text-xs ${getImpactColor(item.impact)}`}>
                                {item.impact}
                              </Badge>
                            </TableCell>
                            <TableCell className="font-mono text-sm font-medium text-green-600">{item.value}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </TabsContent>

          <TabsContent value="needs-attention" className="space-y-4">
            <div className="border rounded-lg">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-12"></TableHead>
                    <TableHead className="caption text-muted-foreground py-2 px-3">Insight</TableHead>
                    <TableHead className="caption text-muted-foreground py-2 px-3 w-24">Metric</TableHead>
                    <TableHead className="caption text-muted-foreground py-2 px-3 w-20">Impact</TableHead>
                    <TableHead className="caption text-muted-foreground py-2 px-3 w-20">Value</TableHead>
                    <TableHead className="caption text-muted-foreground py-2 px-3 w-16">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {needsAttentionData.slice(0, 5).map((item, index) => (
                    <TableRow key={item.id} className="hover:bg-muted/50">
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {getCategoryIcon(item.category)}
                          {getTrendIcon(item.trend)}
                        </div>
                      </TableCell>
                      <TableCell className="py-3">
                        <div className="space-y-1">
                          <div className="font-medium text-sm text-foreground">{item.insight}</div>
                          <div className="text-xs text-muted-foreground">{item.recommendation}</div>
                        </div>
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">{item.metric}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className={`text-xs ${getImpactColor(item.impact)}`}>
                          {item.impact}
                        </Badge>
                      </TableCell>
                      <TableCell className="font-mono text-sm font-medium text-red-600">{item.value}</TableCell>
                      <TableCell>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-6 px-2 text-xs text-blue-600 hover:text-blue-700 hover:bg-blue-50">
                              View
                              <ExternalLink className="w-3 h-3 ml-1" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-2xl">
                            <DialogHeader>
                              <DialogTitle className="flex items-center gap-2">
                                {getCategoryIcon(item.category)}
                                {item.insight}
                              </DialogTitle>
                            </DialogHeader>
                            <div className="space-y-4">
                              <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                  <h4 className="font-medium text-sm">Metric Details</h4>
                                  <div className="text-sm text-muted-foreground">
                                    <div><strong>Metric:</strong> {item.metric}</div>
                                    <div><strong>Current Value:</strong> {item.value}</div>
                                    <div><strong>Impact Level:</strong> {item.impact}</div>
                                    <div><strong>Category:</strong> {item.category}</div>
                                  </div>
                                </div>
                                <div className="space-y-2">
                                  <h4 className="font-medium text-sm">Action Required</h4>
                                  <p className="text-sm text-muted-foreground">{item.recommendation}</p>
                                </div>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {/* Expand Button */}
            <div className="flex justify-center">
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm" className="gap-2">
                    <Expand className="w-4 h-4" />
                    View All Issues
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>All "Needs Attention" Issues</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-12"></TableHead>
                          <TableHead>Insight</TableHead>
                          <TableHead className="w-24">Metric</TableHead>
                          <TableHead className="w-20">Impact</TableHead>
                          <TableHead className="w-20">Value</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {needsAttentionData.map((item) => (
                          <TableRow key={item.id}>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                {getCategoryIcon(item.category)}
                                {getTrendIcon(item.trend)}
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="space-y-1">
                                <div className="font-medium text-sm">{item.insight}</div>
                                <div className="text-xs text-muted-foreground">{item.recommendation}</div>
                              </div>
                            </TableCell>
                            <TableCell className="text-sm">{item.metric}</TableCell>
                            <TableCell>
                              <Badge variant="outline" className={`text-xs ${getImpactColor(item.impact)}`}>
                                {item.impact}
                              </Badge>
                            </TableCell>
                            <TableCell className="font-mono text-sm font-medium text-red-600">{item.value}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </TabsContent>
        </Tabs>
      </UnifiedCardContent>
    </UnifiedCard>
    </SkeletonWrapper>
  )
}
