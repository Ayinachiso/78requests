import { DataTable, PageTitle, StatusPill, Surface } from '../../components/ProcurementUI.jsx'
import { requestRows } from '../../data/roleDemoData.js'

function MyRequestsPage({ onNavigate }) {
  const mine=requestRows.filter((row)=>row.requester==='Adaeze Okafor')
  const columns=[{key:'id',label:'Request',nowrap:true},{key:'item',label:'Item'},{key:'amount',label:'Amount',nowrap:true},{key:'date',label:'Submitted',nowrap:true},{key:'status',label:'Status',render:(row)=><StatusPill>{row.status}</StatusPill>}]
  return <><PageTitle title="My requests" description="Track requests you have submitted as an employee."/><Surface><DataTable columns={columns} rows={mine} onRowClick={()=>onNavigate('approver','review-request')}/></Surface></>
}
export default MyRequestsPage
