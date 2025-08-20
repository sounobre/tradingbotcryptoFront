import React from 'react'
export function Select({ options, value, onChange, className=''}:{ options:{label:string,value:string}[], value?:string, onChange?:(v:string)=>void, className?:string }){
return (
<select value={value} onChange={(e)=>onChange?.(e.target.value)} className={`px-3 py-2 border border-border rounded w-full ${className}`}>
{options.map(o=> <option key={o.value} value={o.value}>{o.label}</option>)}
</select>
)
}