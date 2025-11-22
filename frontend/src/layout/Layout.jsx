export default function Layout({ children }) {
  return (
    <div className="flex">
      <aside className="w-64 h-screen bg-gray-900 text-white p-6">
        <h1 className="text-xl font-bold mb-6">CreatorPulse</h1>
        <nav className="space-y-3">
          <a href="/" className="block">Dashboard</a>
          <a href="/upload" className="block">Upload</a>
          <a href="/insights" className="block">AI Insights</a>
        </nav>
      </aside>

      <main className="flex-1 p-6 bg-gray-100">{children}</main>
    </div>
  );
}
