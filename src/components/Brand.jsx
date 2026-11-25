import brandMark from '../assets/icons/78-requests-mark-black.svg'
import brandWordmark from '../assets/icons/78-requests-logo-black.svg'

function BrandMark({ className = '' }) {
  return <img className={className} src={brandMark} alt="" aria-hidden="true" />
}

export function Brand({ className = '' }) {
  return (
    <a className={`requests-brand ${className}`} href="#" aria-label="78 Requests home">
      <img className="requests-wordmark" src={brandWordmark} alt="78 Requests" />
    </a>
  )
}

export default BrandMark
