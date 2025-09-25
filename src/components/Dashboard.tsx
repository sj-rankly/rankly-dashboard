'use client'

import { useState } from 'react'
import { Sidebar } from './layout/Sidebar'
import { TopNav } from './layout/TopNav'
import { UnifiedVisibilitySection } from './sections/UnifiedVisibilitySection'
import { ShareOfVoiceCard } from './cards/ShareOfVoiceCard'
import { mockDashboardData } from '@/data/mockData'

export function Dashboard() {
  const [activeTab, setActiveTab] = useState('visibility')
  const [dashboardData, setDashboardData] = useState(mockDashboardData)

  const handlePlatformChange = (platformId: string, enabled: boolean) => {
    setDashboardData(prev => ({
      ...prev,
      filters: {
        ...prev.filters,
        platforms: prev.filters.platforms.map(p => 
          p.id === platformId ? { ...p, enabled } : p
        )
      }
    }))
  }

  const handleTopicChange = (topicId: string, enabled: boolean) => {
    setDashboardData(prev => ({
      ...prev,
      filters: {
        ...prev.filters,
        topics: prev.filters.topics.map(t => 
          t.id === topicId ? { ...t, enabled } : t
        )
      }
    }))
  }

  const handlePersonaChange = (personaId: string, enabled: boolean) => {
    setDashboardData(prev => ({
      ...prev,
      filters: {
        ...prev.filters,
        personas: prev.filters.personas.map(p => 
          p.id === personaId ? { ...p, enabled } : p
        )
      }
    }))
  }

  const handleDateRangeChange = (from: Date, to: Date) => {
    // Handle date range change
    console.log('Date range changed:', { from, to })
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case 'visibility':
        return (
          <div className="space-y-6">
            {/* Unified Visibility Score Section */}
            <UnifiedVisibilitySection />

            {/* Share of Voice Section - Full Width */}
            <ShareOfVoiceCard />
          </div>
        )
      
      case 'prompts':
        return (
          <div className="flex items-center justify-center h-96 text-muted-foreground">
            <div className="text-center space-y-3">
              <h3 className="text-2xl font-semibold tracking-tight">Prompts Analysis</h3>
              <p className="text-base leading-7">Prompt performance metrics and insights will be displayed here.</p>
            </div>
          </div>
        )
      
      case 'platforms':
        return (
          <div className="flex items-center justify-center h-96 text-muted-foreground">
            <div className="text-center space-y-3">
              <h3 className="text-2xl font-semibold tracking-tight">Platform Analysis</h3>
              <p className="text-base leading-7">Platform-specific performance data will be displayed here.</p>
            </div>
          </div>
        )
      
      case 'regions':
        return (
          <div className="flex items-center justify-center h-96 text-muted-foreground">
            <div className="text-center space-y-3">
              <h3 className="text-2xl font-semibold tracking-tight">Regional Analysis</h3>
              <p className="text-base leading-7">Geographic performance insights will be displayed here.</p>
            </div>
          </div>
        )
      
      case 'sentiment':
        return (
          <div className="flex items-center justify-center h-96 text-muted-foreground">
            <div className="text-center space-y-3">
              <h3 className="text-2xl font-semibold tracking-tight">Sentiment Analysis</h3>
              <p className="text-base leading-7">Sentiment metrics and tone analysis will be displayed here.</p>
            </div>
          </div>
        )
      
      case 'analytics':
        return (
          <div className="flex items-center justify-center h-96 text-muted-foreground">
            <div className="text-center space-y-3">
              <h3 className="text-2xl font-semibold tracking-tight">Advanced Analytics</h3>
              <p className="text-base leading-7">Detailed analytics and custom reports will be displayed here.</p>
            </div>
          </div>
        )
      
      default:
        return null
    }
  }

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <div className="flex-shrink-0">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Navigation with integrated filters */}
        <TopNav activeTab={activeTab} onTabChange={setActiveTab} />

        {/* Content Area */}
        <main className="flex-1 overflow-auto bg-gray-50 dark:bg-neutral-950">
          <div className="px-4 py-6">
            {renderTabContent()}
          </div>
        </main>
      </div>
    </div>
  )
}
