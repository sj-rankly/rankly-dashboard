import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts'
import { ChartDataPoint } from '@/types/dashboard'

interface ShareOfVoiceDonutProps {
  data: ChartDataPoint[]
}

const COLORS = [
  'hsl(var(--chart-1))',
  'hsl(var(--chart-2))', 
  'hsl(var(--chart-3))',
  'hsl(var(--chart-4))',
  'hsl(var(--chart-5))'
]

export function ShareOfVoiceDonut({ data }: ShareOfVoiceDonutProps) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart margin={{ top: 5, right: 5, left: 5, bottom: 15 }}>
        <Pie
          data={data}
          cx="50%"
          cy="45%"
          innerRadius={30}
          outerRadius={45}
          paddingAngle={2}
          dataKey="value"
          strokeWidth={2}
          stroke="hsl(var(--background))"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip
          contentStyle={{
            backgroundColor: 'hsl(var(--card))',
            border: '1px solid hsl(var(--border))',
            borderRadius: '8px',
            fontSize: '12px',
            color: 'hsl(var(--foreground))',
            boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
          }}
        />
        <Legend 
          wrapperStyle={{ fontSize: '9px', color: 'hsl(var(--muted-foreground))' }}
          iconType="circle"
          iconSize={6}
          layout="horizontal"
          verticalAlign="bottom"
          height={15}
        />
      </PieChart>
    </ResponsiveContainer>
  )
}
