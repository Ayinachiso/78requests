function BrandMark({ className = '' }) {
  return <img className={className} src="/images/78-requests-mark-black.svg" alt="" aria-hidden="true" />
}

export function Brand({ className = '' }) {
  return (
    <a className={`requests-brand ${className}`} href="#" aria-label="78 Requests home">
      <img className="requests-wordmark" src="/images/78-requests-logo-black.svg" alt="78 Requests" />
    </a>
  )
}

export default BrandMark
