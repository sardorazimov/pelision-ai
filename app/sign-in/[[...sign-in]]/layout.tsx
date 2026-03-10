import React from 'react'

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className='flex items-center justify-center h-screen bg-gradient-to-t from-[#1e1e1e] to-[#111111] via-pink-800'>
        {children}
    </main>
  )
}

export default AuthLayout