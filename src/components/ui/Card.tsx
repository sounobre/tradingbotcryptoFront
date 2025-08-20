import React from 'react'
export function Card({ className = '', ...props }: React.HTMLAttributes<HTMLDivElement>) {
return <div className={`bg-card border border-border rounded-xl p-4 ${className}`} {...props} />
}