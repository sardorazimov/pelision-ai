import React from 'react'
import { Button } from '../../components/ui/button'
import {  SignOutButton, UserButton } from "@clerk/nextjs";

const Dashboard = () => {
  return (
    <div>Dashboard
      <Button>
        <UserButton />
        
      </Button>
    </div>
  )
}

export default Dashboard