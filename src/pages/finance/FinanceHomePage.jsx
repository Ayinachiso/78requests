import { PageTitle, Metric, Surface, Button, Notice } from '../../components/ProcurementUI.jsx'
import { paymentRows } from '../../data/roleDemoData.js'
import { SectionHeading, RequestPreviewCard } from '../shared/RoleComponents.jsx'

function FinanceHomePage({ onNavigate }) {
  return <><PageTitle eyebrow="Tuesday, 25 November" title="Good morning, Bola" description="Review approved requests and keep payments moving." actions={<Button onClick={()=>onNavigate('finance','payments')}>View payment queue</Button>}/>
    <div className="workspace-grid-four" style={{display:'grid',gridTemplateColumns:'repeat(4,minmax(0,1fr))',gap:13,marginBottom:17}}><Metric label="To pay" value="3" note="Approved and ready" icon="◷" tint="#FFF1C9"/><Metric label="Paid this month" value="₦4.82m" note="Across 22 requests" icon="✓"/><Metric label="Awaiting receipt" value="2" note="Reconcile after payout" icon="▤" tint="#EAEAF2"/><Metric label="Bank78 account" value="Active" note="Last checked today" icon="⌁"/></div>
    <div className="workspace-grid-two" style={{display:'grid',gridTemplateColumns:'minmax(0,1.25fr) minmax(280px,.8fr)',gap:16,alignItems:'start'}}><Surface><SectionHeading title="Ready for payment" description="The approved requests waiting in your queue." action={<Button variant="quiet" onClick={()=>onNavigate('finance','payments')}>See all</Button>}/><div style={{display:'grid',gap:9}}>{paymentRows.filter((row)=>row.status==='Awaiting Payment').map((row)=><RequestPreviewCard key={row.id} request={{...row,department:row.payee}} onOpen={()=>onNavigate('finance','pay-out')}/>)}</div></Surface>
      <Surface style={{background:'#F4F4F1'}}><SectionHeading title="Payment checklist" description="Confirm these details before paying."/><div style={{display:'grid',gap:12}}>{['Request approved by the right people','Payee and bank details match the invoice','Amount matches the approved request','Receipt is attached after payment'].map((item,index)=><div key={item} style={{display:'flex',alignItems:'center',gap:10,font:'400 12px/1.45 Inter,sans-serif'}}><span style={{width:23,height:23,display:'grid',placeItems:'center',borderRadius:8,background:index<2?'#B2F1E7':'#fff',fontSize:11}}>{index<2?'✓':index+1}</span>{item}</div>)}</div><div style={{marginTop:16}}><Notice>Bank78 payouts are available for approved requests only.</Notice></div></Surface>
      <Surface style={{gridColumn:'1 / -1'}}><SectionHeading title="Recently paid" description="Payments completed by Finance."/><div style={{display:'grid',gap:9}}>{paymentRows.filter((row)=>row.status==='Paid').map((row)=><RequestPreviewCard key={row.id} request={{...row,department:row.payee}} onOpen={()=>onNavigate('finance','breakdown')}/>)}</div></Surface>
    </div>
  </>
}
export default FinanceHomePage
