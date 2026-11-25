import { PageTitle, Surface } from '../../components/ProcurementUI.jsx'
import { updates } from '../../data/roleDemoData.js'
import { ActivityFeed } from '../shared/RoleComponents.jsx'
function ApproverUpdatesPage({ onNavigate }) { return <><PageTitle title="Updates" description="Recent changes to requests in your approval chain."/><Surface><ActivityFeed entries={updates} onOpen={()=>onNavigate('approver','review-request')}/></Surface></> }
export default ApproverUpdatesPage
