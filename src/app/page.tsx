'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import Link from 'next/link'

export default function Home() {
  const router = useRouter()
  const supabase = createClientComponentClient()

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        router.push('/dashboard')
      }
    }
    
    checkUser()
  }, [router])

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Welcome to Obtask AI
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            AI-Powered Project Management Platform
          </p>
          
          <div className="mt-10">
            <h2 className="text-2xl font-semibold mb-4">System Status</h2>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <p className="text-gray-700">
                ✅ Next.js 14 App Router<br />
                ✅ TypeScript configured<br />
                ✅ Tailwind CSS ready<br />
                ✅ Supabase connected<br />
                ✅ Authentication ready
              </p>
            </div>
          </div>

          <div className="mt-8 space-x-4">
            <Link 
              href="/auth/login"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition inline-block"
            >
              Sign In
            </Link>
            <Link 
              href="/auth/signup"
              className="bg-gray-200 text-gray-800 px-6 py-3 rounded-lg hover:bg-gray-300 transition inline-block"
            >
              Create Account
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}