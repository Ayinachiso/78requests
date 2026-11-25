import { PageTitle, Surface } from '../../components/ProcurementUI.jsx'
import { updates } from '../../data/roleDemoData.js'
import { ActivityFeed } from '../shared/RoleComponents.jsx'

function EmployeeUpdatesPage({ onNavigate }) { return <><PageTitle title="Updates" description="A timeline of what has changed on your requests." /><Surface><ActivityFeed entries={updates} onOpen={()=>onNavigate('employee','request-detail')} /></Surface></> }
export default EmployeeUpdatesPage
