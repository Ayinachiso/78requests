function Avatar({ name, size = 38, color = 'var(--status-info-bg)' }) {
  const initials = name.split(' ').map((part) => part[0]).slice(0, 2).join('').toUpperCase()
  return <span aria-hidden="true" style={{ display: 'inline-grid', flex: '0 0 auto', width: size, height: size, placeItems: 'center', borderRadius: size > 40 ? 16 : 13, background: color, color: 'var(--avatar-ink)', fontSize: Math.max(11, size * 0.31), fontWeight: 750 }}>{initials}</span>
}

export default Avatar
