import { useMemo, useState } from 'react'
import { Button, ChoiceChip, DataTable, PageTitle, SearchInput, StatusPill, Surface } from '../../components/ProcurementUI.jsx'
import { requestRows } from '../../data/roleDemoData.js'

function EmployeeRequestsPage({ onNavigate }) {
  const [search,setSearch]=useState('')
  const [filter,setFilter]=useState('All')
  const rows=useMemo(()=>requestRows.filter((request)=>request.requester==='Adaeze Okafor').filter((request)=>filter==='All'||request.status===filter).filter((request)=>`${request.id} ${request.item} ${request.status}`.toLowerCase().includes(search.toLowerCase())),[search,filter])
  const columns=[{key:'id',label:'Request ID',nowrap:true},{key:'item',label:'Item'},{key:'date',label:'Submitted',nowrap:true},{key:'amount',label:'Amount',nowrap:true},{key:'status',label:'Status',render:(row)=><StatusPill>{row.status}</StatusPill>}]
  return <>
    <PageTitle title="My requests" description="View and track the requests you have submitted." actions={<Button onClick={()=>onNavigate('employee','make-request')} icon="＋">Make a request</Button>} />
    <Surface>
      <div className="workspace-toolbar-wrap" style={{display:'flex',alignItems:'center',justifyContent:'space-between',gap:14,flexWrap:'wrap',marginBottom:16}}><div style={{display:'flex',gap:7,flexWrap:'wrap'}}>{['All','Pending approval','Paid','Draft'].map((value)=><ChoiceChip key={value} active={filter===value} onClick={()=>setFilter(value)}>{value}</ChoiceChip>)}</div><SearchInput value={search} onChange={setSearch} placeholder="Search your requests" /></div>
      <DataTable columns={columns} rows={rows} onRowClick={()=>onNavigate('employee','request-detail')} />
    </Surface>
    <div style={{marginTop:14,color:'#5A607A',font:'400 11px Inter,sans-serif'}}>Showing {rows.length} sample requests</div>
  </>
}
export default EmployeeRequestsPage
