export default function SimplePage() {
  return (
    <div style={{ padding: '40px' }}>
      <h1 style={{ fontSize: '32px', marginBottom: '20px' }}>Simple Test Page</h1>
      <p style={{ fontSize: '18px' }}>If you can see this, Next.js routing is working!</p>
      
      <div style={{ marginTop: '40px', padding: '20px', backgroundColor: '#f0f0f0', borderRadius: '8px' }}>
        <h2 style={{ fontSize: '24px', marginBottom: '10px' }}>Environment Check:</h2>
        <p>Node Environment: {process.env.NODE_ENV}</p>
        <p>Timestamp: {new Date().toISOString()}</p>
      </div>
    </div>
  )
}