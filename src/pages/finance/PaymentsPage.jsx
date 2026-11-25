import { useMemo, useState } from 'react'
import { Button, ChoiceChip, DataTable, PageTitle, SearchInput, StatusPill, Surface } from '../../components/ProcurementUI.jsx'
import { paymentRows } from '../../data/roleDemoData.js'

function PaymentsPage({ onNavigate }) {
  const [filter,setFilter]=useState('All payments')
  const [search,setSearch]=useState('')
  const rows=useMemo(()=>paymentRows.filter((row)=>filter==='All payments'||(filter==='Ready to pay'?row.status==='Awaiting Payment':row.status==='Paid')).filter((row)=>`${row.id} ${row.item} ${row.payee}`.toLowerCase().includes(search.toLowerCase())),[filter,search])
  const columns=[{key:'id',label:'Request',nowrap:true},{key:'item',label:'Item'},{key:'payee',label:'Payee'},{key:'amount',label:'Amount',nowrap:true},{key:'status',label:'Status',render:(row)=><StatusPill>{row.status}</StatusPill>},{key:'action',label:'',render:(row)=><Button variant="secondary" style={{minHeight:36,padding:'0 12px',fontSize:11}} onClick={(event)=>{event.stopPropagation();onNavigate('finance',row.status==='Paid'?'breakdown':'pay-out')}}>{row.status==='Paid'?'Breakdown':'Pay out'}</Button>}]
  return <><PageTitle title="Payments" description="Pay approved requests using the Bank78 payout account." actions={<Button variant="secondary" onClick={()=>onNavigate('finance','own-requests')}>My requests</Button>}/><Surface><div style={{display:'flex',alignItems:'center',justifyContent:'space-between',gap:12,flexWrap:'wrap',marginBottom:16}}><div style={{display:'flex',gap:7,flexWrap:'wrap'}}>{['All payments','Ready to pay','Paid'].map(value=><ChoiceChip key={value} active={filter===value} onClick={()=>setFilter(value)}>{value}</ChoiceChip>)}</div><SearchInput value={search} onChange={setSearch} placeholder="Search payments"/></div><DataTable columns={columns} rows={rows} onRowClick={(row)=>onNavigate('finance',row.status==='Paid'?'breakdown':'pay-out')}/></Surface><div style={{marginTop:13,color:'#5A607A',font:'400 11px Inter,sans-serif'}}>Payments are sent through the connected Bank78 account.</div></>
}
export default PaymentsPage
