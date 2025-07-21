'use client'

import { useState } from 'react'

export default function TablesPage() {
  const [tables, setTables] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchTables = async () => {
    setLoading(true)
    setError(null)

    try {
      const { createClient } = await import('@supabase/supabase-js')
      const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
      )

      // Use a direct SQL query to get tables
      const { data, error } = await supabase
        .rpc('get_tables', {})
        .select('*')

      if (error) {
        // If RPC doesn't exist, show a different message
        setError('Cannot list tables directly. Your database tables likely include: users, projects, tasks, meetings, etc.')
        
        // Try a different approach - test known tables
        const knownTables = ['users', 'projects', 'tasks', 'meetings', 'project_members']
        const tableInfo = []
        
        for (const tableName of knownTables) {
          try {
            const { count } = await supabase
              .from(tableName)
              .select('*', { count: 'exact', head: true })
            
            tableInfo.push({ name: tableName, accessible: true, count })
          } catch (err) {
            tableInfo.push({ name: tableName, accessible: false, error: 'Cannot access' })
          }
        }
        
        setTables(tableInfo)
      } else {
        setTables(data || [])
      }
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ padding: '40px', maxWidth: '800px', margin: '0 auto' }}>
      <h1 style={{ fontSize: '32px', marginBottom: '20px' }}>Database Tables</h1>
      
      <button 
        onClick={fetchTables}
        disabled={loading}
        style={{
          padding: '10px 20px',
          fontSize: '16px',
          backgroundColor: loading ? '#ccc' : '#3b82f6',
          color: 'white',
          border: 'none',
          borderRadius: '6px',
          cursor: loading ? 'not-allowed' : 'pointer',
          marginBottom: '20px'
        }}
      >
        {loading ? 'Loading...' : 'Check Tables'}
      </button>

      {error && (
        <div style={{ 
          padding: '20px', 
          backgroundColor: '#fef3c7', 
          borderRadius: '8px',
          marginBottom: '20px'
        }}>
          <p>{error}</p>
        </div>
      )}

      {tables.length > 0 && (
        <div style={{ 
          padding: '20px', 
          backgroundColor: '#f5f5f5', 
          borderRadius: '8px' 
        }}>
          <h3 style={{ marginBottom: '15px' }}>Known Tables:</h3>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #ddd' }}>
                <th style={{ padding: '10px', textAlign: 'left' }}>Table Name</th>
                <th style={{ padding: '10px', textAlign: 'left' }}>Status</th>
                <th style={{ padding: '10px', textAlign: 'left' }}>Row Count</th>
              </tr>
            </thead>
            <tbody>
              {tables.map((table, idx) => (
                <tr key={idx} style={{ borderBottom: '1px solid #eee' }}>
                  <td style={{ padding: '10px' }}>{table.name}</td>
                  <td style={{ padding: '10px' }}>
                    {table.accessible ? '✅ Accessible' : '❌ ' + table.error}
                  </td>
                  <td style={{ padding: '10px' }}>
                    {table.count !== undefined ? table.count : '-'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div style={{ 
        marginTop: '40px', 
        padding: '20px', 
        backgroundColor: '#e0f2fe', 
        borderRadius: '8px' 
      }}>
        <h3>About the RLS Error:</h3>
        <p>The "infinite recursion" error means your Supabase Row Level Security (RLS) policies have a circular reference.</p>
        <p style={{ marginTop: '10px' }}>This typically happens when:</p>
        <ul style={{ marginLeft: '20px', marginTop: '10px' }}>
          <li>project_members policy checks projects</li>
          <li>projects policy checks project_members</li>
          <li>They reference each other in a loop</li>
        </ul>
        <p style={{ marginTop: '10px' }}>
          <strong>Solution:</strong> We'll need to either fix the RLS policies or use authentication to query as a logged-in user.
        </p>
      </div>
    </div>
  )
}