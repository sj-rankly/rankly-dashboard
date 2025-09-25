# Rankly Dashboard

A modern, responsive dashboard for AI-powered brand visibility analytics built with Next.js, TypeScript, Tailwind CSS, and shadcn/ui.

## Features

- 🎨 **Modern UI**: Clean, professional design with dark/light theme support
- 📊 **Interactive Charts**: Built with Recharts for responsive data visualization
- 📱 **Responsive Design**: Works seamlessly across desktop, tablet, and mobile
- 🎯 **Type-Safe**: Full TypeScript support with comprehensive type definitions
- 🚀 **Performance**: Optimized with Next.js App Router and React 18
- 🎭 **Theme Support**: System-aware dark/light mode switching
- 📈 **Analytics**: Comprehensive visibility metrics and competitor analysis

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Charts**: Recharts
- **Icons**: Lucide React
- **Themes**: next-themes
- **Date Utilities**: date-fns

## Dashboard Components

### Layout Components
- **Sidebar**: Navigation with collapsible sections and theme toggle
- **TopNav**: Tabbed navigation for different dashboard sections
- **FilterBar**: Date picker, multi-select filters, and action buttons

### Metric Cards
- **Visibility Score**: Bar chart showing brand visibility across platforms
- **Share of Voice**: Donut chart displaying mention percentages
- **Average Position**: Bar chart showing ranking positions
- **Topic Rankings**: Comprehensive table of brand performance by topic

### Charts & Visualizations
- **Bar Charts**: For visibility scores and position rankings
- **Donut Charts**: For share of voice analysis
- **Ranking Tables**: Sortable competitor comparisons
- **Topic Tables**: Cross-platform brand performance

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd rankly-dashboard
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout with theme provider
│   ├── page.tsx           # Dashboard main page
│   └── globals.css        # Global styles
├── components/
│   ├── ui/                # shadcn/ui components
│   ├── layout/            # Layout components (Sidebar, TopNav, FilterBar)
│   ├── cards/             # Metric card components
│   ├── charts/            # Chart components (Recharts)
│   ├── tables/            # Table components
│   ├── Dashboard.tsx      # Main dashboard component
│   └── theme-provider.tsx # Theme provider wrapper
├── data/
│   └── mockData.ts        # Mock dashboard data
├── types/
│   └── dashboard.ts       # TypeScript interfaces
└── lib/
    └── utils.ts           # Utility functions
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript compiler

## Data Structure

The dashboard uses TypeScript interfaces for type safety:

- **Competitor**: Brand information with scores and trends
- **Metric**: Individual metric data with charts
- **TopicRanking**: Cross-topic brand performance
- **Platform/Topic/Persona**: Filter configurations
- **DashboardData**: Complete dashboard state

## Customization

### Adding New Metrics
1. Define new metric in `types/dashboard.ts`
2. Create chart component in `components/charts/`
3. Create metric card in `components/cards/`
4. Add to dashboard layout

### Styling
- Modify `tailwind.config.js` for theme customization
- Update CSS variables in `globals.css`
- Use shadcn/ui component variants

### Mock Data
Update `src/data/mockData.ts` to customize dashboard content and test different scenarios.

## Features in Detail

### Multi-Select Filters
- Platform filtering (ChatGPT, Perplexity, Gemini, Claude, Copilot)
- Topic filtering (Landing Pages, A/B Testing, CRO, Lead Generation)
- User Persona filtering (Marketers, Developers, Founders, Agencies)

### Interactive Charts
- Responsive design that adapts to container size
- Theme-aware colors that work in light/dark modes
- Tooltip support for detailed information
- Custom styling with CSS variables

### Theme Support
- System preference detection
- Manual theme switching
- Persistent theme selection
- Smooth transitions

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit changes: `git commit -m 'Add feature'`
4. Push to branch: `git push origin feature-name`
5. Submit a pull request

## License

This project is licensed under the MIT License.