'use client'

import { useState, useEffect } from 'react'
import { Sidebar } from './layout/Sidebar'
import { TopNav } from './layout/TopNav'
import { 
  VisibilityTab, 
  PromptsTab, 
  SentimentTab, 
  CitationsTab
} from './tabs'
import { mockDashboardData } from '@/data/mockData'
import { useFilters } from '@/contexts/FilterContext'
import { useSkeletonLoader } from '@/hooks/useSkeletonLoader'
import { SkeletonWrapper } from '@/components/ui/skeleton-wrapper'
import { SidebarSkeleton } from '@/components/layout/SidebarSkeleton'
import { TopNavSkeleton } from '@/components/layout/TopNavSkeleton'

interface DashboardProps {
  initialTab?: string
}

export function Dashboard({ initialTab }: DashboardProps) {
  const [activeTab, setActiveTab] = useState(initialTab || 'visibility')
  const [dashboardData, setDashboardData] = useState(mockDashboardData)
  const [isPromptBuilderFullScreen, setIsPromptBuilderFullScreen] = useState(false)
  const { selectedTopics, selectedPersonas, selectedPlatforms } = useFilters()
  
  // Global skeleton loading state
  const [isGlobalLoading, setIsGlobalLoading] = useState(false)
  const { showSkeleton: showGlobalSkeleton, isVisible: isGlobalVisible, setLoading: setGlobalLoading } = useSkeletonLoader({
    threshold: 300,
    debounceDelay: 250
  })

  // Simulate global loading when filters change
  useEffect(() => {
    if (selectedTopics.length > 0 || selectedPersonas.length > 0 || selectedPlatforms.length > 0) {
      setIsGlobalLoading(true)
      const timer = setTimeout(() => {
        setIsGlobalLoading(false)
      }, 1200) // Simulate 1.2s loading time for global state changes
      
      return () => clearTimeout(timer)
    }
  }, [selectedTopics, selectedPersonas, selectedPlatforms])

  useEffect(() => {
    setGlobalLoading(isGlobalLoading)
  }, [isGlobalLoading, setGlobalLoading])

  const handleTogglePromptBuilderFullScreen = (isFullScreen: boolean) => {
    setIsPromptBuilderFullScreen(isFullScreen)
  }

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
    const filterContext = {
      selectedTopics,
      selectedPersonas,
      selectedPlatforms
    }

    switch (activeTab) {
      case 'visibility':
        return <VisibilityTab filterContext={filterContext} />
      
      case 'prompts':
        return <PromptsTab onToggleFullScreen={handleTogglePromptBuilderFullScreen} filterContext={filterContext} />
      
      case 'sentiment':
        return <SentimentTab filterContext={filterContext} />
      
      case 'citations':
        return <CitationsTab filterContext={filterContext} />
      
      default:
        return null
    }
  }

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar - hidden when Prompt Builder is full screen */}
      {!isPromptBuilderFullScreen && (
        <div className="flex-shrink-0">
          <Sidebar />
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Navigation - hidden when Prompt Builder is full screen */}
        {!isPromptBuilderFullScreen && (
          <TopNav activeTab={activeTab} onTabChange={setActiveTab} />
        )}

        {/* Content Area */}
        <main className={`flex-1 overflow-auto ${isPromptBuilderFullScreen ? 'bg-background' : 'bg-gray-50 dark:bg-neutral-950'}`}>
          <div className={isPromptBuilderFullScreen ? '' : 'px-2 py-4'}>
            {renderTabContent()}
          </div>
        </main>
      </div>
    </div>
  )
}

