import { useMemo, useState } from 'react'
import { ChoiceChip, DataTable, PageTitle, SearchInput, Surface, StatusPill } from '../../components/ProcurementUI.jsx'
import { approvals } from '../../data/roleDemoData.js'

function ApprovalsPage({ onNavigate }) {
  const [tab,setTab]=useState('Needs my decision')
  const [search,setSearch]=useState('')
  const rows=useMemo(()=>approvals.filter((row)=>`${row.id} ${row.item} ${row.requester} ${row.department}`.toLowerCase().includes(search.toLowerCase())),[search])
  const columns=[{key:'id',label:'Request',nowrap:true},{key:'item',label:'Item'},{key:'requester',label:'Requested by'},{key:'amount',label:'Amount',nowrap:true},{key:'submitted',label:'Submitted',nowrap:true},{key:'priority',label:'Status',render:()=><StatusPill>Pending approval</StatusPill>}]
  return <><PageTitle title="Approvals" description="Review requests assigned to you and keep purchasing on track."/><Surface><div className="workspace-toolbar-wrap" style={{display:'flex',justifyContent:'space-between',alignItems:'center',gap:14,flexWrap:'wrap',marginBottom:16}}><div style={{display:'flex',gap:7,flexWrap:'wrap'}}>{['Needs my decision','All approvals','Completed'].map(value=><ChoiceChip key={value} active={tab===value} onClick={()=>setTab(value)}>{value}</ChoiceChip>)}</div><SearchInput value={search} onChange={setSearch} placeholder="Search approvals"/></div><DataTable columns={columns} rows={tab==='Completed'?[]:rows} onRowClick={()=>onNavigate('approver','review-request')}/>{tab==='Completed'&&<div style={{padding:32,textAlign:'center',color:'#5A607A',font:'400 13px Inter,sans-serif'}}>Completed decisions will appear here.</div>}</Surface><div style={{marginTop:13,color:'#5A607A',font:'400 11px Inter,sans-serif'}}>4 requests are waiting for review</div></>
}
export default ApprovalsPage
