import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, ReferenceDot } from 'recharts'


type Candle = { openTime: string; close: number }


type Trade = { time: string; type: 'BUY'|'SELL' }


export default function PriceChart({ candles, trades }:{ candles: Candle[]; trades?: Trade[] }){
return (
<div className="h-80">
<ResponsiveContainer width="100%" height="100%">
<LineChart data={candles} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
<XAxis dataKey="openTime" hide/>
<YAxis domain={['auto','auto']} width={60}/>
<Tooltip />
<Line type="monotone" dataKey="close" dot={false} />
{trades?.map((t,i)=> (
<ReferenceDot key={i} x={t.time} y={candles.find(c=>c.openTime===t.time)?.close} r={4} label={t.type==='BUY'?'B':'S'} />
))}
</LineChart>
</ResponsiveContainer>
</div>
)
}