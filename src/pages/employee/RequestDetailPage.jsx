import { PageTitle, Button, Surface, StatusPill, Notice } from '../../components/ProcurementUI.jsx'
import { tokens } from '../../styles/tokens.js'
import { StatusTimeline } from '../shared/RoleComponents.jsx'

function RequestDetailPage({ onNavigate, onAction }) {
  const request={id:'PR-ENG-0044',item:'Engineering test devices',category:'IT equipment',amount:'₦1,280,000',supplier:'TechHub Nigeria',date:'25 November 2026',status:'Pending approval',reason:'Replace shared test devices used by the Engineering team. Current equipment is slowing down release checks.'}
  return <>
    <PageTitle eyebrow={<button type="button" onClick={()=>onNavigate('employee','requests')} style={{padding:0,border:0,background:'transparent',color:tokens.muted,cursor:'pointer'}}>My requests / {request.id}</button>} title={request.item} description={request.id} actions={<Button variant="secondary" onClick={()=>onAction('Download request summary')}>Download summary</Button>} />
    <div className="workspace-grid-two" style={{display:'grid',gridTemplateColumns:'minmax(0,1.35fr) minmax(280px,.8fr)',gap:16,alignItems:'start'}}>
      <div style={{display:'grid',gap:14}}>
        <Surface><div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',gap:14}}><div><div style={{color:tokens.muted,fontSize:12}}>Request status</div><div style={{marginTop:8}}><StatusPill>{request.status}</StatusPill></div></div><div style={{textAlign:'right'}}><div style={{color:tokens.muted,fontSize:12}}>Estimated total</div><b style={{display:'block',marginTop:6,font:'700 22px Sora,sans-serif'}}>{request.amount}</b></div></div><div style={{height:1,margin:'18px 0',background:tokens.line}}/><div className="workspace-grid-two" style={{display:'grid',gridTemplateColumns:'repeat(2,minmax(0,1fr))',gap:18}}>{[['Category',request.category],['Supplier',request.supplier],['Date submitted',request.date],['Needed by','This month']].map(([label,value])=><div key={label}><span style={{display:'block',color:tokens.muted,fontSize:11}}>{label}</span><b style={{display:'block',marginTop:5,font:'500 13px Inter,sans-serif'}}>{value}</b></div>)}</div></Surface>
        <Surface><h2 style={{margin:'0 0 8px',font:'700 17px Sora,sans-serif'}}>Why this is needed</h2><p style={{margin:0,color:tokens.muted,font:'400 13px/1.65 Inter,sans-serif'}}>{request.reason}</p></Surface>
        <Surface><h2 style={{margin:'0 0 13px',font:'700 17px Sora,sans-serif'}}>Documents</h2><button type="button" onClick={()=>onAction('Attach a document')} style={{width:'100%',padding:14,border:`1px dashed ${tokens.line}`,borderRadius:15,background:'#fafaf8',color:tokens.muted,textAlign:'left',cursor:'pointer'}}>＋ Add a quote, invoice or receipt</button></Surface>
      </div>
      <Surface><h2 style={{margin:'0 0 18px',font:'700 17px Sora,sans-serif'}}>Approval progress</h2><StatusTimeline current={1} steps={[{title:'Submitted',detail:'Adaeze · Today at 9:31 AM'},{title:'Manager approval',detail:'Waiting for Kunle Adeyemi'},{title:'Finance review',detail:'Starts after manager approval'},{title:'Payment',detail:'You’ll be notified when payment is ready'}]} /><Notice tone="warning">This request is waiting for your manager. We’ll send you an update when it moves forward.</Notice><Button variant="secondary" style={{width:'100%',marginTop:13}} onClick={()=>onAction('Withdraw request')}>Withdraw request</Button></Surface>
      <Surface style={{gridColumn:'1 / -1',background:tokens.mintSoft,borderColor:tokens.mintSoft}}><div style={{display:'flex',justifyContent:'space-between',alignItems:'center',gap:16,flexWrap:'wrap'}}><div><h2 style={{margin:0,font:'700 16px Sora,sans-serif'}}>Have you completed this purchase?</h2><p style={{margin:'5px 0 0',color:tokens.muted,fontSize:12}}>Add the final receipt so Finance can reconcile the payment.</p></div><Button onClick={()=>onNavigate('employee','receipt')}>Add a receipt</Button></div></Surface>
    </div>
  </>
}
export default RequestDetailPage
