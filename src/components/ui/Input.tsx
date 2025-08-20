import React from 'react'
export const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(({className='', ...props}, ref) => (
<input ref={ref} className={`px-3 py-2 border border-border rounded w-full ${className}`} {...props} />
))