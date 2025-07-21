'use client'

import { useState } from 'react'

export default function AuthTestPage() {
  const [result, setResult] = useState<string>('')
  const [loading, setLoading] = useState(false)

  const testSupabaseAuth = async () => {
    setLoading(true)
    setResult('')

    try {
      // Test 1: Check environment variables
      const url = process.env.NEXT_PUBLIC_SUPABASE_URL
      const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
      
      setResult(prev => prev + `Environment check:\n`)
      setResult(prev => prev + `URL: ${url ? 'Set' : 'Missing'}\n`)
      setResult(prev => prev + `Key: ${key ? 'Set' : 'Missing'}\n\n`)

      if (!url || !key) {
        setResult(prev => prev + 'ERROR: Missing environment variables\n')
        return
      }

      // Test 2: Import Supabase
      setResult(prev => prev + 'Importing Supabase...\n')
      const { createClient } = await import('@supabase/supabase-js')
      setResult(prev => prev + 'Supabase imported successfully\n')

      // Test 3: Create client
      setResult(prev => prev + 'Creating Supabase client...\n')
      const supabase = createClient(url, key)
      setResult(prev => prev + 'Client created successfully\n')

      // Test 4: Try a simple auth call
      setResult(prev => prev + 'Testing auth.getSession()...\n')
      const { data, error } = await supabase.auth.getSession()
      
      if (error) {
        setResult(prev => prev + `Auth error: ${error.message}\n`)
      } else {
        setResult(prev => prev + 'Auth session check successful\n')
        setResult(prev => prev + `Session: ${data.session ? 'Active' : 'None'}\n`)
      }

      // Test 5: Try signup with test data
      setResult(prev => prev + '\nTesting signup...\n')
      const signupResult = await supabase.auth.signUp({
        email: 'test@example.com',
        password: 'testpassword123'
      })

      if (signupResult.error) {
        setResult(prev => prev + `Signup error: ${signupResult.error.message}\n`)
      } else {
        setResult(prev => prev + 'Signup call successful\n')
        setResult(prev => prev + `User: ${signupResult.data.user ? 'Created' : 'Not created'}\n`)
      }

    } catch (err: any) {
      setResult(prev => prev + `\nCaught error: ${err.message}\n`)
      setResult(prev => prev + `Error stack: ${err.stack}\n`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ padding: '40px', fontFamily: 'monospace' }}>
      <h1>Supabase Auth Test</h1>
      
      <button 
        onClick={testSupabaseAuth}
        disabled={loading}
        style={{
          padding: '10px 20px',
          backgroundColor: loading ? '#ccc' : '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: loading ? 'not-allowed' : 'pointer',
          marginBottom: '20px'
        }}
      >
        {loading ? 'Testing...' : 'Run Auth Test'}
      </button>

      <pre style={{ 
        backgroundColor: '#f5f5f5', 
        padding: '20px', 
        borderRadius: '8px',
        whiteSpace: 'pre-wrap',
        overflow: 'auto',
        maxHeight: '500px'
      }}>
        {result || 'Click "Run Auth Test" to start testing...'}
      </pre>
    </div>
  )
}