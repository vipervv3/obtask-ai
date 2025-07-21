'use client'

import { useState } from 'react'

export default function DBTestPage() {
  const [result, setResult] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const testSupabase = async () => {
    setLoading(true)
    setError(null)
    setResult(null)

    try {
      const { createClient } = await import('@supabase/supabase-js')
      
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
      const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

      if (!supabaseUrl || !supabaseKey) {
        throw new Error('Missing Supabase environment variables')
      }

      const supabase = createClient(supabaseUrl, supabaseKey)

      // Test 1: Try a simple auth check first
      console.log('Testing auth...')
      const { data: { user } } = await supabase.auth.getUser()
      console.log('Current user:', user)

      // Test 2: Try to select from projects WITHOUT joins
      console.log('Testing projects table...')
      const { data, error, count } = await supabase
        .from('projects')
        .select('id, name, description, status, created_at', { count: 'exact' })
        .limit(3)

      if (error) {
        // If RLS error, try with users table which might have simpler policies
        console.log('Projects failed, trying users table...')
        const { data: usersData, error: usersError } = await supabase
          .from('users')
          .select('id, email, name')
          .limit(1)
        
        if (usersError) {
          throw new Error(`Both queries failed. Projects: ${error.message}, Users: ${usersError.message}`)
        }
        
        setResult({
          success: true,
          message: 'Connected but projects table has RLS issues. Users table works.',
          users: usersData,
          supabaseUrl: supabaseUrl
        })
      } else {
        setResult({
          success: true,
          projectsCount: count,
          projects: data,
          supabaseUrl: supabaseUrl,
          user: user
        })
      }

    } catch (err: any) {
      console.error('Test error:', err)
      setError(err.message || String(err))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ padding: '40px', maxWidth: '800px', margin: '0 auto' }}>
      <h1 style={{ fontSize: '32px', marginBottom: '20px' }}>Supabase Connection Test</h1>
      
      <button 
        onClick={testSupabase}
        disabled={loading}
        style={{
          padding: '10px 20px',
          fontSize: '16px',
          backgroundColor: loading ? '#ccc' : '#3b82f6',
          color: 'white',
          border: 'none',
          borderRadius: '6px',
          cursor: loading ? 'not-allowed' : 'pointer'
        }}
      >
        {loading ? 'Testing...' : 'Test Supabase Connection'}
      </button>

      {error && (
        <div style={{ 
          marginTop: '20px', 
          padding: '20px', 
          backgroundColor: '#fee', 
          borderRadius: '8px',
          border: '1px solid #fcc'
        }}>
          <h3 style={{ color: '#c00', marginBottom: '10px' }}>Error:</h3>
          <pre style={{ whiteSpace: 'pre-wrap' }}>{error}</pre>
        </div>
      )}

      {result && result.success && (
        <div style={{ 
          marginTop: '20px', 
          padding: '20px', 
          backgroundColor: '#efe', 
          borderRadius: '8px',
          border: '1px solid #cfc'
        }}>
          <h3 style={{ color: '#080', marginBottom: '10px' }}>✅ Success!</h3>
          <p>Connected to: {result.supabaseUrl}</p>
          <p>Found {result.projectsCount} projects in database</p>
          
          {result.projects && result.projects.length > 0 && (
            <div style={{ marginTop: '10px' }}>
              <h4>Sample Projects:</h4>
              <ul>
                {result.projects.map((p: any) => (
                  <li key={p.id}>{p.name || p.id}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      <div style={{ 
        marginTop: '40px', 
        padding: '20px', 
        backgroundColor: '#f5f5f5', 
        borderRadius: '8px' 
      }}>
        <h3>Debug Info:</h3>
        <p>Supabase URL: {process.env.NEXT_PUBLIC_SUPABASE_URL ? '✅ Set' : '❌ Not set'}</p>
        <p>Supabase Key: {process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? '✅ Set' : '❌ Not set'}</p>
      </div>
    </div>
  )
}