import React from 'react'
import { useTool } from '@/components/ToolContext'
import NavBar from '@/components/NavBar'
import { auth } from '@/components/auth/firebase'
    // page to show after user has registered


export default function Verification() {

  const {authUser} = useTool()
  console.log(authUser)
  return (

    <div className="p-10">
      <NavBar authUser={authUser} />
        Verify your email please
    </div>
  )
}
