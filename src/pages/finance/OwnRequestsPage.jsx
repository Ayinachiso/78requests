import { DataTable, PageTitle, StatusPill, Surface } from '../../components/ProcurementUI.jsx'
import { requestRows } from '../../data/roleDemoData.js'

function OwnRequestsPage({ onNavigate }) { const rows=requestRows.filter((row)=>row.requester==='Bola Adewale'||row.requester==='Adaeze Okafor').slice(0,3);const columns=[{key:'id',label:'Request',nowrap:true},{key:'item',label:'Item'},{key:'date',label:'Submitted',nowrap:true},{key:'amount',label:'Amount',nowrap:true},{key:'status',label:'Status',render:(row)=><StatusPill>{row.status}</StatusPill>}];return <><PageTitle title="Own requests" description="Track purchases you requested separately from payments you process."/><Surface><DataTable columns={columns} rows={rows} onRowClick={()=>onNavigate('finance','breakdown')}/></Surface></> }
export default OwnRequestsPage
