const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api'

export async function api<T>(path: string, opts?: RequestInit): Promise<T> {
const res = await fetch(`${API_URL}${path}`, {
headers: { 'Content-Type': 'application/json' },
...opts
})
if (!res.ok) throw new Error(await res.text())
return res.json() as Promise<T>
}