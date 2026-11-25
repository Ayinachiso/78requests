import { PageTitle, Metric, Surface, Button, Notice } from '../../components/ProcurementUI.jsx'
import { approvals, requestRows } from '../../data/roleDemoData.js'
import { RequestPreviewCard, SectionHeading, StatusTimeline } from '../shared/RoleComponents.jsx'

function ApproverHomePage({ onNavigate }) {
  return <>
    <PageTitle eyebrow="Tuesday, 25 November" title="Good morning, Kunle" description="Your team has a few requests waiting for your decision." actions={<Button variant="secondary" onClick={()=>onNavigate('approver','approvals')}>Open approvals</Button>} />
    <div className="workspace-grid-four" style={{display:'grid',gridTemplateColumns:'repeat(4,minmax(0,1fr))',gap:13,marginBottom:17}}><Metric label="To review" value="4" note="Waiting on your decision" icon="◷" tint="#FFF1C9"/><Metric label="Approved this month" value="18" note="Across your team" icon="✓"/><Metric label="Returned" value="2" note="Waiting for updates" icon="↩" tint="#f1f1ef"/><Metric label="Typical review time" value="1.4 days" note="For this month" icon="⌁" tint="#EAEAF2"/></div>
    <div className="workspace-grid-two" style={{display:'grid',gridTemplateColumns:'minmax(0,1.3fr) minmax(280px,.8fr)',gap:16,alignItems:'start'}}>
      <Surface><SectionHeading title="Needs your review" description="Requests are ordered by submission time." action={<Button variant="quiet" onClick={()=>onNavigate('approver','approvals')}>See all</Button>}/><div style={{display:'grid',gap:9}}>{approvals.slice(0,3).map((request)=><RequestPreviewCard key={request.id} request={request} onOpen={()=>onNavigate('approver','review-request')}/>)}</div></Surface>
      <Surface><SectionHeading title="Approval path" description="Your role in the Engineering workflow."/><StatusTimeline current={2} steps={[{title:'Employee submits',detail:'Request details and documents'},{title:'Team lead review',detail:'You check need, category and amount'},{title:'Finance review',detail:'Budget and supplier checks'},{title:'Payment',detail:'Finance completes the payout'}]}/></Surface>
      <Surface style={{gridColumn:'1 / -1',background:'#F4F4F1'}}><div style={{display:'flex',justifyContent:'space-between',alignItems:'center',gap:14,flexWrap:'wrap'}}><div><h2 style={{margin:0,font:'700 17px Sora,sans-serif'}}>Keep decisions moving</h2><p style={{margin:'6px 0 0',color:'#5A607A',font:'400 12px Inter,sans-serif'}}>Add a clear reason when you return or decline a request.</p></div><Notice>Approval actions are recorded in the audit log.</Notice></div></Surface>
      <Surface style={{gridColumn:'1 / -1'}}><SectionHeading title="Recently approved" description="Your latest decisions."/><div style={{display:'grid',gap:9}}>{requestRows.filter((request)=>['Approved','Paid','Completed'].includes(request.status)).slice(0,2).map(request=><RequestPreviewCard key={request.id} request={request} onOpen={()=>onNavigate('approver','my-requests')}/>)}</div></Surface>
    </div>
  </>
}
export default ApproverHomePage
