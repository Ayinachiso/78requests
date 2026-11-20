import { dashboardStyles } from '../styles/dashboardStyles.js'

function FilterChip({ children, selected, onClick }) {
  return <button type="button" aria-pressed={selected} onClick={onClick} style={{ ...dashboardStyles.chipButton, ...(selected ? dashboardStyles.chipSelected : {}) }}>{children}</button>
}

export default FilterChip
