'use client'
import React, { useState } from 'react'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'

type Props = {
    children: React.ReactNode;
}

function QueryProvider({children}: Props) {
    const [queryClient]= useState(()=>new QueryClient())
  return (
    <QueryClientProvider client= {queryClient}>
        {children}
    </QueryClientProvider>
  )
}

export default QueryProvider