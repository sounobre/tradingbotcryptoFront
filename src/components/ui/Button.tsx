import React from 'react'


export function Button({ className = '', variant = 'default', ...props }: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'default'|'outline'|'destructive' }) {
const base = 'px-3 py-2 rounded text-sm transition border'
const map = {
default: 'bg-primary text-white border-primary/80 hover:opacity-90',
outline: 'bg-transparent border-border hover:bg-muted',
destructive: 'bg-destructive text-white border-destructive/80 hover:opacity-90'
}
return <button className={`${base} ${map[variant]} ${className}`} {...props} />
}