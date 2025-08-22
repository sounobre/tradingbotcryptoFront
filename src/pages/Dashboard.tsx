import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Input } from '@/components/ui/Input'
import { Select } from '@/components/ui/Select'
import PriceChart from '@/components/charts/PriceChart'
import { api } from '@/services/api'

type Candle = { openTime: string; close: number }

type BacktestResult = {
  metrics: {
    totalReturnPct: number
    maxDrawdownPct: number
    winRatePct: number
    profitFactor: number
    trades: number
  }
  trades: { time: string; type: 'BUY' | 'SELL' }[]
}

type FormValues = {
  symbol: string
  interval: string
  limit: number
  strategy: string
  fast: number
  slow: number
}

export default function Dashboard() {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    getValues,
  } = useForm<FormValues>({
    defaultValues: {
      symbol: 'BTCUSDT',
      interval: '1m',
      limit: 500,
      strategy: 'ema_cross',
      fast: 9,
      slow: 21,
    },
  })

  useEffect(() => {
    register('interval')
    register('strategy')
  }, [register])

  const [candles, setCandles] = useState<Candle[]>([])
  const [result, setResult] = useState<BacktestResult | null>(null)

  async function ingestAndLoad(values: FormValues) {
    try {
      await api('/ingest', {
        method: 'POST',
        body: JSON.stringify({
          symbol: values.symbol,
          interval: values.interval,
          limit: Number(values.limit),
        }),
      })
    } catch (err) {
      console.error('Falha ao ingerir dados', err)
    }

    try {
      const data = await api<Candle[]>(
        `/candles?symbol=${values.symbol}&interval=${values.interval}&limit=${values.limit}`,
      )
      setCandles(data)
      setResult(null)
    } catch (err) {
      console.error('Falha ao carregar candles', err)
    }
  }

  async function runBacktest() {
    const values = getValues()
    const res = await api<BacktestResult>('/backtests', {
      method: 'POST',
      body: JSON.stringify({
        symbol: values.symbol,
        interval: values.interval,
        strategy: values.strategy,
        fast: Number(values.fast),
        slow: Number(values.slow),
      }),
    })
    setResult(res)
  }

  return (
    <div className="space-y-6">
      <Card>
        <form
          onSubmit={handleSubmit(ingestAndLoad)}
          className="grid md:grid-cols-7 gap-3"
        >
          <Input placeholder="BTCUSDT" {...register('symbol')} />
          <Select
            options={[
              { label: '1m', value: '1m' },
              { label: '5m', value: '5m' },
              { label: '15m', value: '15m' },
              { label: '1h', value: '1h' },
            ]}
            value={watch('interval')}
            onChange={(v) => setValue('interval', v)}
          />
          <Input
            type="number"
            placeholder="limit"
            {...register('limit', { valueAsNumber: true })}
          />
          <Select
            options={[
              { label: 'EMA Cross', value: 'ema_cross' },
              { label: 'RSI+Boll', value: 'rsi_boll' },
            ]}
            value={watch('strategy')}
            onChange={(v) => setValue('strategy', v)}
          />
          <Input
            type="number"
            placeholder="fast"
            {...register('fast', { valueAsNumber: true })}
          />
          <Input
            type="number"
            placeholder="slow"
            {...register('slow', { valueAsNumber: true })}
          />
          <Button type="submit">1) Ingerir &amp; Carregar</Button>
        </form>
      </Card>

      <div className="grid md:grid-cols-3 gap-4">
        <Card>
          <div className="text-sm text-muted-foreground mb-1">Candles</div>
          <div className="text-2xl font-bold">{candles.length}</div>
        </Card>
        <Card>
          <div className="text-sm text-muted-foreground mb-1">Trades</div>
          <div className="text-2xl font-bold">
            {result?.metrics.trades ?? 0}
          </div>
        </Card>
        <Card>
          <div className="text-sm text-muted-foreground mb-1">Retorno</div>
          <div className="text-2xl font-bold">
            {result
              ? `${result.metrics.totalReturnPct.toFixed(2)}%`
              : '--'}
          </div>
        </Card>
      </div>

      <Card>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-semibold">Preço + Sinais</h2>
          <Button onClick={runBacktest} variant="outline">
            2) Rodar Backtest
          </Button>
        </div>
        <PriceChart
          candles={candles.map((c) => ({
            openTime: c.openTime,
            close: c.close,
          }))}
          trades={result?.trades?.map((t) => ({
            time: t.time,
            type: t.type,
          }))}
        />
      </Card>

      {result && (
        <Card>
          <h3 className="text-lg font-semibold mb-2">Métricas</h3>
          <div className="grid md:grid-cols-5 gap-3 text-sm">
            <Metric
              label="Retorno Total"
              value={`${result.metrics.totalReturnPct.toFixed(2)}%`}
            />
            <Metric
              label="Max DD"
              value={`${result.metrics.maxDrawdownPct.toFixed(2)}%`}
            />
            <Metric
              label="Win Rate"
              value={`${result.metrics.winRatePct.toFixed(2)}%`}
            />
            <Metric
              label="Profit Factor"
              value={result.metrics.profitFactor.toFixed(2)}
            />
            <Metric
              label="Trades"
              value={String(result.metrics.trades)}
            />
          </div>
        </Card>
      )}
    </div>
  )
}

function Metric({
  label,
  value,
}: {
  label: string
  value: string
}) {
  return (
    <div className="bg-muted rounded p-3">
      <div className="text-muted-foreground">{label}</div>
      <div className="text-xl font-semibold">{value}</div>
    </div>
  )
}

