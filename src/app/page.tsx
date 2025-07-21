export default function Home() {
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
            <h2 className="text-2xl font-semibold mb-4">Quick Test</h2>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <p className="text-gray-700">
                ✅ Next.js 14 App Router<br />
                ✅ TypeScript configured<br />
                ✅ Tailwind CSS ready<br />
                ✅ Clean project structure
              </p>
            </div>
          </div>

          <div className="mt-8 space-x-4">
            <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition">
              Get Started
            </button>
            <button className="bg-gray-200 text-gray-800 px-6 py-3 rounded-lg hover:bg-gray-300 transition">
              Learn More
            </button>
          </div>
        </div>
      </div>
    </main>
  )
}