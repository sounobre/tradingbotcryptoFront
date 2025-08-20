import { Input } from '@/components/ui/Input'


export default function SettingsPage(){
return (
<div className="space-y-2">
<h2 className="text-xl font-semibold">Configurações</h2>
<p className="text-sm text-muted-foreground">Defina variáveis no arquivo `.env` do Vite: <code>VITE_API_URL</code>. Padrão: http://localhost:8080</p>
<Input defaultValue={import.meta.env.VITE_API_URL || 'http://localhost:8080'} readOnly />
</div>
)
}