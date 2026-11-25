import { PageTitle, Surface } from '../../components/ProcurementUI.jsx'
import { updates } from '../../data/roleDemoData.js'
import { ActivityFeed } from '../shared/RoleComponents.jsx'
function FinanceUpdatesPage({ onNavigate }) { return <><PageTitle title="Updates" description="Recent approvals, payouts and receipt activity."/><Surface><ActivityFeed entries={updates} onOpen={()=>onNavigate('finance','breakdown')}/></Surface></> }
export default FinanceUpdatesPage
