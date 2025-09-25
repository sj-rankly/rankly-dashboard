'use client'

import { Button } from '@/components/ui/button'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Sun, Moon, BarChart3, MessageSquare, Globe, MapPin, Heart, Settings, HelpCircle } from 'lucide-react'
import { useTheme } from 'next-themes'

export function Sidebar() {
  const { theme, setTheme } = useTheme()

  const navItems = [
    {
      title: 'Overview',
      icon: BarChart3,
      link: '#',
    },
    {
      title: 'Answer Engine Insights',
      icon: MessageSquare,
      subItems: [
        { title: 'Visibility', link: '#' },
        { title: 'Sentiment', link: '#' },
        { title: 'Competitive Edge', link: '#' },
      ],
    },
    {
      title: 'Prompt Volumes',
      icon: MessageSquare,
      link: '#',
    },
    {
      title: 'Content Gaps',
      icon: Globe,
      link: '#',
    },
    {
      title: 'Alerts',
      icon: Heart,
      link: '#',
    },
    {
      title: 'Settings',
      icon: Settings,
      link: '#',
    },
  ]

  return (
    <aside className="w-64 bg-background border-r border-border flex flex-col h-full">
      {/* Header */}
      <div className="p-6">
        <h1 className="text-2xl font-bold tracking-tight">Rankly</h1>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto p-4">
        <div className="space-y-1">
          <Accordion type="multiple" className="w-full">
            {navItems.map((item, index) => (
              <div key={index}>
                {item.link ? (
                  <Button 
                    variant="ghost" 
                    className="w-full justify-start h-10 px-3 font-medium text-sm hover:bg-accent hover:text-accent-foreground"
                  >
                    <item.icon className="mr-3 h-4 w-4" />
                    {item.title}
                  </Button>
                ) : (
                  <AccordionItem value={`item-${index}`} className="border-b-0">
                    <AccordionTrigger className="text-sm font-medium py-2 px-3 hover:no-underline hover:bg-accent rounded-md data-[state=open]:bg-accent">
                      <div className="flex items-center">
                        <item.icon className="mr-3 h-4 w-4" />
                        {item.title}
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="pb-1 pl-4 mt-1">
                      <div className="space-y-1">
                        {item.subItems?.map((subItem, subIndex) => (
                          <Button 
                            key={subIndex} 
                            variant="ghost" 
                            className="w-full justify-start h-8 px-6 text-sm text-muted-foreground hover:text-foreground"
                          >
                            {subItem.title}
                          </Button>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                )}
              </div>
            ))}
          </Accordion>
        </div>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-border/60 space-y-4">
        <Button variant="ghost" className="w-full justify-start h-10 px-3 text-sm font-medium">
          <HelpCircle className="mr-3 h-4 w-4" />
          Contact us
        </Button>
        
        {/* Theme Toggle */}
        <div className="flex items-center justify-center">
          <div className="flex items-center bg-muted/50 rounded-full p-0.5">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme('light')}
              className={`h-7 w-7 rounded-full transition-all ${
                theme === 'light' 
                  ? 'bg-background text-foreground shadow-sm' 
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Sun className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme('dark')}
              className={`h-7 w-7 rounded-full transition-all ${
                theme === 'dark' 
                  ? 'bg-background text-foreground shadow-sm' 
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Moon className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </aside>
  )
}
