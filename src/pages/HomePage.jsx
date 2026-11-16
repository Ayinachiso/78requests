import Button from '../components/Button.jsx'
import { pageStyles } from '../styles/pageStyles.js'

function HomePage() {
  return (
    <main style={pageStyles.main}>
      <h1 style={pageStyles.heading}>Procurement workspace</h1>
      <p style={pageStyles.intro}>
        Your shared frontend workspace is ready. Procurement screens can be added here.
      </p>
      <Button onClick={() => {}}>Get started</Button>
    </main>
  )
}

export default HomePage
