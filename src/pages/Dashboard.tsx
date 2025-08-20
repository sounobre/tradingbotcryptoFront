import { useEffect, useState } from 'react'
}


useEffect(()=>{ /* no-op */ },[])


return (
<div className="space-y-6">
<Card>
<form onSubmit={handleSubmit(ingestAndLoad)} className="grid md:grid-cols-7 gap-3">
<Input placeholder="BTCUSDT" {...register('symbol')} name="symbol" />
<Select className="" options={[
{label:'1m', value:'1m'},{label:'5m', value:'5m'},{label:'15m',value:'15m'},{label:'1h',value:'1h'}
]} value={watch('interval')} onChange={(v)=>((document.querySelector('[name="interval"]') as HTMLSelectElement).value=v)} />
<Input type="number" placeholder="limit" {...register('limit')} name="limit" />
<Select options={[{label:'EMA Cross',value:'ema_cross'},{label:'RSI+Boll',value:'rsi_boll'}]} value={watch('strategy')} onChange={(v)=>((document.querySelector('[name="strategy"]') as HTMLSelectElement).value=v)} />
<Input type="number" placeholder="fast" {...register('fast')} name="fast" />
<Input type="number" placeholder="slow" {...register('slow')} name="slow" />
<Button type="submit">1) Ingerir & Carregar</Button>
</form>
</Card>


<div className="grid md:grid-cols-3 gap-4">
<Card>
<div className="text-sm text-muted-foreground mb-1">Candles</div>
<div className="text-2xl font-bold">{candles.length}</div>
</Card>
<Card>
<div className="text-sm text-muted-foreground mb-1">Trades</div>
<div className="text-2xl font-bold">{result?.metrics.trades ?? 0}</div>
</Card>
<Card>
<div className="text-sm text-muted-foreground mb-1">Retorno</div>
<div className="text-2xl font-bold">{result ? result.metrics.totalReturnPct.toFixed(2)+'%' : '--'}</div>
</Card>
</div>


<Card>
<div className="flex items-center justify-between mb-3">
<h2 className="text-lg font-semibold">Preço + Sinais</h2>
<Button onClick={runBacktest} variant="outline">2) Rodar Backtest</Button>
</div>
<PriceChart candles={candles.map(c=>({openTime:c.openTime, close:c.close}))} trades={result?.trades?.map(t=>({ time:t.time, type:t.type }))} />
</Card>


{result && (
<Card>
<h3 className="text-lg font-semibold mb-2">Métricas</h3>
<div className="grid md:grid-cols-5 gap-3 text-sm">
<Metric label="Retorno Total" value={`${result.metrics.totalReturnPct.toFixed(2)}%`} />
<Metric label="Max DD" value={`${result.metrics.maxDrawdownPct.toFixed(2)}%`} />
<Metric label="Win Rate" value={`${result.metrics.winRatePct.toFixed(2)}%`} />
<Metric label="Profit Factor" value={result.metrics.profitFactor.toFixed(2)} />
<Metric label="Trades" value={String(result.metrics.trades)} />
</div>
</Card>
)}
</div>
)
}


function Metric({label,value}:{label:string;value:string}){
return <div className="bg-muted rounded p-3"><div className="text-muted-foreground">{label}</div><div className="text-xl font-semibold">{value}</div></div>
}