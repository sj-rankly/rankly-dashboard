'use client'

import { Button } from '@/components/ui/button'
import { Sun, Moon, BarChart3, MessageSquare, Globe, HelpCircle } from 'lucide-react'
import { useTheme } from 'next-themes'

export function Sidebar() {
  const { theme, setTheme } = useTheme()

  const navItems = [
    {
      title: 'Answer Engine Analytics',
      icon: BarChart3,
      link: '#',
    },
    {
      title: 'Agent Analytics',
      icon: MessageSquare,
      link: '#',
    },
    {
      title: 'Actionables',
      icon: Globe,
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
          {navItems.map((item, index) => (
            <Button 
              key={index}
              variant="ghost"
              className="w-full justify-start h-10 px-3 font-medium text-sm hover:bg-accent hover:text-accent-foreground"
            >
              <item.icon className="mr-3 h-4 w-4" />
              {item.title}
            </Button>
          ))}
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
