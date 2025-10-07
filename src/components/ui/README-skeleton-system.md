# Rankly Skeleton Loader System

A comprehensive skeleton loading system designed for the Rankly dashboard that provides smooth loading experiences with latency-based auto-triggering.

## 🎯 Features

- **Auto-Trigger on Latency**: Only shows when loading takes >300ms (configurable)
- **Debounced Transitions**: Prevents flash of skeleton on fast loads
- **Dark-Mode First**: Matches Rankly's minimal, grid-based aesthetic
- **Smooth Animations**: Fade in/out transitions with shimmer effects
- **Comprehensive Coverage**: Cards, tables, charts, modals, and layout components

## 🚀 Quick Start

### Basic Usage

```tsx
import { useSkeletonLoader } from '@/hooks/useSkeletonLoader'
import { SkeletonWrapper } from '@/components/ui/skeleton-wrapper'
import { UnifiedCardSkeleton } from '@/components/ui/unified-card-skeleton'

function MyComponent() {
  const { showSkeleton, isVisible, setLoading } = useSkeletonLoader({
    threshold: 300,        // Show after 300ms
    debounceDelay: 250     // Hide after 250ms delay
  })

  // Trigger loading
  useEffect(() => {
    setLoading(true)
    fetchData().then(() => setLoading(false))
  }, [])

  return (
    <SkeletonWrapper
      show={showSkeleton}
      isVisible={isVisible}
      skeleton={<UnifiedCardSkeleton type="mixed" />}
    >
      <MyActualContent />
    </SkeletonWrapper>
  )
}
```

### With Data Dependency

```tsx
import { useSkeletonWithData } from '@/hooks/useSkeletonLoader'

function MyComponent() {
  const { data, showSkeleton, isVisible } = useSkeletonWithData(
    myData, // null/undefined triggers loading
    { threshold: 300 }
  )

  return (
    <SkeletonWrapper
      show={showSkeleton}
      isVisible={isVisible}
      skeleton={<UnifiedCardSkeleton type="chart" />}
    >
      <Chart data={data} />
    </SkeletonWrapper>
  )
}
```

### With Async Operations

```tsx
import { useSkeletonWithAsync } from '@/hooks/useSkeletonLoader'

function MyComponent() {
  const { data, error, showSkeleton, isVisible } = useSkeletonWithAsync(
    () => fetchMyData(),
    [dependency1, dependency2], // Re-fetch when these change
    { threshold: 300 }
  )

  return (
    <SkeletonWrapper
      show={showSkeleton}
      isVisible={isVisible}
      skeleton={<UnifiedCardSkeleton type="table" />}
    >
      <Table data={data} />
    </SkeletonWrapper>
  )
}
```

## 🎨 Skeleton Components

### UnifiedCardSkeleton
Perfect for dashboard cards with mixed content.

```tsx
<UnifiedCardSkeleton 
  type="mixed"           // 'metric' | 'chart' | 'table' | 'mixed'
  chartType="bar"        // 'bar' | 'line' | 'donut'
  tableColumns={4}       // Number of table columns
  tableRows={5}          // Number of table rows
  showHeader={true}      // Show header skeleton
  showFooter={false}     // Show footer skeleton
/>
```

### Specialized Skeletons

```tsx
// For metric cards
<MetricCardSkeleton />

// For table rows
<TableRowSkeleton columns={4} />

// For charts
<ChartSkeleton type="line" />

// For sidebar
<SidebarSkeleton />

// For modals
<ModalSkeleton type="subjective-impression" />
```

## ⚙️ Configuration Options

### useSkeletonLoader Options

```tsx
const options = {
  threshold: 300,        // Minimum delay before showing (ms)
  debounceDelay: 250,    // Delay before hiding (ms)
  showOnMount: false     // Show immediately on mount
}
```

### Behavior Rules

1. **Auto-Trigger**: Skeleton appears only when loading > threshold
2. **No Flash**: Debounced hiding prevents flicker on fast loads
3. **Smooth Transitions**: 200ms fade in/out animations
4. **Invisible When Not Needed**: No skeleton shown for fast operations

## 🎯 Integration Examples

### Dashboard Sections

```tsx
// Visibility Section
<SkeletonWrapper
  show={showSkeleton}
  isVisible={isVisible}
  skeleton={<UnifiedCardSkeleton type="mixed" chartType="bar" />}
>
  <UnifiedVisibilitySection />
</SkeletonWrapper>

// Citations Table
<SkeletonWrapper
  show={showSkeleton}
  isVisible={isVisible}
  skeleton={<UnifiedCardSkeleton type="table" tableColumns={5} />}
>
  <CitationTypesDetailSection />
</SkeletonWrapper>
```

### Layout Components

```tsx
// Sidebar
<SkeletonWrapper
  show={showSkeleton}
  isVisible={isVisible}
  skeleton={<SidebarSkeleton />}
>
  <Sidebar />
</SkeletonWrapper>

// Top Navigation
<SkeletonWrapper
  show={showSkeleton}
  isVisible={isVisible}
  skeleton={<TopNavSkeleton />}
>
  <TopNav />
</SkeletonWrapper>
```

### Modal Content

```tsx
// Subjective Impressions Modal
<SkeletonWrapper
  show={showSkeleton}
  isVisible={isVisible}
  skeleton={<ModalSkeleton type="subjective-impression" />}
>
  <SubjectiveImpressionsContent />
</SkeletonWrapper>
```

## 🎨 Styling

The skeleton system uses Rankly's design tokens:

- **Background**: `bg-muted/30 dark:bg-muted/20`
- **Shimmer**: `via-white/10 dark:via-white/5`
- **Animation**: 2s infinite shimmer effect
- **Transitions**: 200ms ease-in-out

## 🔧 Advanced Usage

### Custom Skeleton Components

```tsx
function CustomSkeleton() {
  return (
    <div className="space-y-4">
      <SkeletonShimmer className="h-6 w-32" />
      <SkeletonShimmer className="h-4 w-full" />
      <SkeletonShimmer className="h-4 w-3/4" />
    </div>
  )
}
```

### Manual Control

```tsx
const { show, hide, setLoading } = useSkeletonLoader()

// Manual show/hide
const handleButtonClick = () => {
  show()
  setTimeout(() => hide(), 2000)
}

// Manual loading state
const handleAsyncOperation = async () => {
  setLoading(true)
  await doSomething()
  setLoading(false)
}
```

## 📊 Performance Considerations

- **Threshold Tuning**: Adjust based on your API response times
- **Debounce Timing**: Balance between responsiveness and avoiding flash
- **Component Reuse**: Use consistent skeleton patterns across sections
- **Memory Management**: Skeletons are lightweight and don't impact performance

## 🎯 Best Practices

1. **Consistent Timing**: Use same threshold across related components
2. **Appropriate Skeletons**: Match skeleton structure to actual content
3. **Error Handling**: Handle loading errors gracefully
4. **Accessibility**: Skeletons provide visual feedback for screen readers
5. **Testing**: Test with various network conditions and data sizes

## 🔍 Debugging

Enable skeleton debugging:

```tsx
const { showSkeleton, isVisible, setLoading } = useSkeletonLoader({
  threshold: 300,
  debounceDelay: 250
})

// Debug logging
useEffect(() => {
  console.log('Skeleton state:', { showSkeleton, isVisible })
}, [showSkeleton, isVisible])
```

## 🚀 Migration Guide

### From Basic Loading States

```tsx
// Before
{isLoading ? <div>Loading...</div> : <Content />}

// After
<SkeletonWrapper
  show={showSkeleton}
  isVisible={isVisible}
  skeleton={<UnifiedCardSkeleton />}
>
  <Content />
</SkeletonWrapper>
```

### From Spinner Components

```tsx
// Before
{isLoading && <Spinner />}

// After
<SkeletonWrapper
  show={showSkeleton}
  isVisible={isVisible}
  skeleton={<UnifiedCardSkeleton />}
>
  <Content />
</SkeletonWrapper>
```

The skeleton system provides a more polished, professional loading experience that matches Rankly's design language and improves perceived performance.
