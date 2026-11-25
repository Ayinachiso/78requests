function AdminHomePage({ onSignOut, email }) {
  return (
    <main className="workspace-page">
      <header className="workspace-header">
        <a className="brand" href="#home" aria-label="78 Requests home">
          <img className="workspace-wordmark" src="/images/78-requests-logo-black.svg" alt="78 Requests" />
        </a>
        <div className="workspace-user">
          <span className="user-email">{email}</span>
          <button className="text-button" type="button" onClick={onSignOut}>Sign out</button>
        </div>
      </header>
      <section className="welcome-card">
        <span className="eyebrow">SUPER ADMIN WORKSPACE</span>
        <h1>Welcome back.</h1>
        <p>Your sign-in is complete. Your procurement workspace is ready.</p>
        <div className="workspace-placeholder" aria-label="Workspace dashboard preview">
          <span className="placeholder-icon" aria-hidden="true">✓</span>
          <div><strong>You’re signed in</strong><span>Dashboard content can be connected here.</span></div>
        </div>
      </section>
    </main>
  )
}

export default AdminHomePage
