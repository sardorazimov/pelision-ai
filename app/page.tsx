import { Sign } from 'crypto'
import React from 'react'
import { SignInButton } from "@clerk/nextjs";
import { Button } from '../components/ui/button';

const page = () => {
  return (
    <div className='flex w-full h-screen mt-20 items-center justify-center flex-col gap-4'>
      Hello World
      <Button className=''>
          <SignInButton  />
      </Button>
    
    </div>
  )
}

export default page