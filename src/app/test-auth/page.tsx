import Link from 'next/link'

export default function TestAuthPage() {
  return (
    <div style={{ padding: '40px' }}>
      <h1>Authentication Test Page</h1>
      <div style={{ marginTop: '20px' }}>
        <Link href="/auth/login" style={{ display: 'block', marginBottom: '10px', color: 'blue' }}>
          → Go to Login Page
        </Link>
        <Link href="/auth/signup" style={{ display: 'block', marginBottom: '10px', color: 'blue' }}>
          → Go to Signup Page  
        </Link>
        <Link href="/dashboard" style={{ display: 'block', marginBottom: '10px', color: 'blue' }}>
          → Go to Dashboard
        </Link>
      </div>
      
      <div style={{ marginTop: '40px', padding: '20px', backgroundColor: '#f0f0f0' }}>
        <h3>If any of these links show 404:</h3>
        <p>The auth routes might not be deployed yet. Wait 1-2 minutes for Vercel to finish deployment.</p>
      </div>
    </div>
  )
}