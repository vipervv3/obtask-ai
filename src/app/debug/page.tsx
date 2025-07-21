'use client'

export default function DebugPage() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  return (
    <div style={{ padding: '40px', fontFamily: 'monospace' }}>
      <h1>Debug Information</h1>
      
      <div style={{ marginTop: '20px', backgroundColor: '#f5f5f5', padding: '20px', borderRadius: '8px' }}>
        <h3>Environment Variables:</h3>
        <p>NEXT_PUBLIC_SUPABASE_URL: {supabaseUrl ? '✅ Set' : '❌ Missing'}</p>
        <p>NEXT_PUBLIC_SUPABASE_ANON_KEY: {supabaseKey ? '✅ Set' : '❌ Missing'}</p>
        
        {supabaseUrl && (
          <p>URL: {supabaseUrl}</p>
        )}
        
        {supabaseKey && (
          <p>Key: {supabaseKey.substring(0, 20)}...</p>
        )}
      </div>

      <div style={{ marginTop: '20px', backgroundColor: '#e8f4fd', padding: '20px', borderRadius: '8px' }}>
        <h3>Browser Info:</h3>
        <p>User Agent: {typeof window !== 'undefined' ? navigator.userAgent : 'Server Side'}</p>
        <p>Local Storage Available: {typeof window !== 'undefined' && window.localStorage ? '✅ Yes' : '❌ No'}</p>
        <p>Window Object: {typeof window !== 'undefined' ? '✅ Available' : '❌ Server Side'}</p>
      </div>

      <div style={{ marginTop: '20px', backgroundColor: '#fef3c7', padding: '20px', borderRadius: '8px' }}>
        <h3>Troubleshooting:</h3>
        <p>If environment variables are missing, check Vercel dashboard → Project Settings → Environment Variables</p>
        <p>If fetch error persists, the issue might be with the Supabase client configuration</p>
      </div>
    </div>
  )
}