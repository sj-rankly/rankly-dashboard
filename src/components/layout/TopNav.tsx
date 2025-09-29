import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { Settings, Download, Filter, Globe, ChevronDown, Calendar } from 'lucide-react'

interface TopNavProps {
  activeTab: string
  onTabChange: (tab: string) => void
}

export function TopNav({ activeTab, onTabChange }: TopNavProps) {
  const tabs = [
    { id: 'visibility', label: 'Visibility' },
    { id: 'prompts', label: 'Prompts' },
    { id: 'clusters', label: 'Clusters' },
    { id: 'sentiment', label: 'Sentiment' },
    { id: 'citations', label: 'Citations' },
  ]

  return (
    <div className="relative">
      {/* Export and Settings - Extreme Top Right */}
      <div className="absolute top-2 right-6 flex space-x-2 z-20">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="sm" className="text-sm text-gray-600 hover:text-gray-900">
                <Settings className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Settings</TooltipContent>
          </Tooltip>
        </TooltipProvider>
        
        <Button variant="outline" size="sm" className="text-sm">
          <Download className="mr-1 h-4 w-4" />
          Export 32 Answers
        </Button>
      </div>

      {/* Navigation Tabs - Left aligned after sidebar */}
      <div className="pl-4 pt-4">
        <Tabs value={activeTab} onValueChange={onTabChange}>
          <TabsList className="bg-transparent p-0 h-auto border-0 flex space-x-0">
            {tabs.map((tab) => (
              <TabsTrigger 
                key={tab.id} 
                value={tab.id} 
                className="relative px-4 py-2 text-sm font-medium rounded-none border-0 bg-transparent hover:text-gray-900 text-gray-600 data-[state=active]:bg-transparent data-[state=active]:text-gray-900 data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-gray-900 transition-colors"
              >
                {tab.label}
                {tab.hasBeta && (
                  <Badge variant="outline" className="ml-2 text-xs bg-blue-100 text-blue-600 border-blue-200">
                    Beta
                  </Badge>
                )}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>

      {/* Filter Row - Below tabs */}
      <div className="px-4 py-3 mt-2">
        <div className="flex justify-between items-center w-full">
          {/* Extreme Left - Today dropdown close to sidebar */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="text-sm justify-between w-28">
                <Calendar className="mr-2 h-4 w-4" />
                Today
                <ChevronDown className="ml-2 h-3 w-3" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuItem>Today</DropdownMenuItem>
              <DropdownMenuItem>Yesterday</DropdownMenuItem>
              <DropdownMenuItem>Last 7 days</DropdownMenuItem>
              <DropdownMenuItem>Last 30 days</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Extreme Right - Filter controls */}
          <div className="flex space-x-3">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="text-sm">
                  <Filter className="mr-2 h-4 w-4" />
                  # Topics
                  <ChevronDown className="ml-2 h-3 w-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>All Topics</DropdownMenuItem>
                <DropdownMenuItem>Marketing</DropdownMenuItem>
                <DropdownMenuItem>Sales</DropdownMenuItem>
                <DropdownMenuItem>Support</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="text-sm">
                  <Globe className="mr-2 h-4 w-4" />
                  Platforms
                  <ChevronDown className="ml-2 h-3 w-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>All Platforms</DropdownMenuItem>
                <DropdownMenuItem>ChatGPT</DropdownMenuItem>
                <DropdownMenuItem>Claude</DropdownMenuItem>
                <DropdownMenuItem>Perplexity</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Button variant="outline" size="sm" className="text-sm">
              <Settings className="mr-2 h-4 w-4" />
              Chart Config
            </Button>
          </div>
        </div>
      </div>

      {/* Section Divider */}
      <div className="border-b border-gray-200"></div>
    </div>
  )
}