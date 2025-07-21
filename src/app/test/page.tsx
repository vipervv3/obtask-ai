'use client'

import { useEffect, useState } from 'react'

export default function TestPage() {
  const [connected, setConnected] = useState<boolean | null>(null)
  const [tables, setTables] = useState<string[]>([])
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function testConnection() {
      try {
        // Import supabase dynamically to avoid build errors
        const { supabase } = await import('@/lib/supabase')
        
        // Test basic connection
        const { data, error } = await supabase
          .from('projects')
          .select('count')
          .limit(1)

        if (error) {
          setError(error.message)
          setConnected(false)
        } else {
          setConnected(true)
          
          // Try to get some basic data
          const { data: projectsData } = await supabase
            .from('projects')
            .select('*')
            .limit(5)
          
          if (projectsData) {
            console.log('Found projects:', projectsData)
          }
        }
      } catch (err) {
        setError(String(err))
        setConnected(false)
      }
    }

    testConnection()
  }, [])

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Supabase Connection Test</h1>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Connection Status</h2>
          
          {connected === null && (
            <p className="text-gray-600">Testing connection...</p>
          )}
          
          {connected === true && (
            <div>
              <p className="text-green-600 font-semibold mb-4">✅ Connected to Supabase!</p>
              
              <h3 className="font-semibold mb-2">Available Tables:</h3>
              <ul className="list-disc list-inside text-gray-700">
                {tables.map(table => (
                  <li key={table}>{table}</li>
                ))}
              </ul>
            </div>
          )}
          
          {connected === false && (
            <div>
              <p className="text-red-600 font-semibold">❌ Connection failed</p>
              {error && <p className="text-red-500 mt-2">Error: {error}</p>}
            </div>
          )}
        </div>

        <div className="mt-8 bg-blue-50 p-6 rounded-lg">
          <h3 className="font-semibold mb-2">Next Steps:</h3>
          <ol className="list-decimal list-inside space-y-2 text-gray-700">
            <li>Deploy to Vercel</li>
            <li>Add environment variables in Vercel dashboard</li>
            <li>Build authentication with Supabase Auth</li>
            <li>Create project management features</li>
          </ol>
        </div>
      </div>
    </div>
  )
}