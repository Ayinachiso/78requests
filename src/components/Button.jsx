import { buttonStyles } from '../styles/componentStyles.js'

function Button({ children, variant = 'primary', type = 'button', ...props }) {
  return (
    <button type={type} style={buttonStyles[variant]} {...props}>
      {children}
    </button>
  )
}

export default Button
