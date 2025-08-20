import type { Config } from 'tailwindcss'


export default {
darkMode: ['class'],
content: ['./index.html', './src/**/*.{ts,tsx}'],
theme: {
extend: {
colors: {
background: 'hsl(0 0% 100%)',
foreground: 'hsl(222.2 84% 4.9%)',
muted: 'hsl(210 40% 96%)',
border: 'hsl(214.3 31.8% 91.4%)',
card: 'hsl(0 0% 100%)',
primary: 'hsl(221.2 83.2% 53.3%)',
destructive: 'hsl(0 84.2% 60.2%)'
}
}
},
plugins: []
} satisfies Config