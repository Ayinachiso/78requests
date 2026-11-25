import { PageTitle, Metric, Surface, Button } from '../../components/ProcurementUI.jsx'
import { tokens } from '../../styles/tokens.js'
import { requestRows, updates } from '../../data/roleDemoData.js'
import { RequestPreviewCard, SectionHeading, ActivityFeed } from '../shared/RoleComponents.jsx'

function EmployeeHomePage({ onNavigate }) {
  const mine = requestRows.filter((request) => request.requester === 'Adaeze Okafor')
  return <>
    <PageTitle eyebrow="Tuesday, 25 November" title="Good morning, Adaeze" description="Everything you have requested, all in one place." actions={<Button onClick={()=>onNavigate('employee','make-request')} icon="＋">Make a request</Button>} />
    <div className="workspace-grid-four" style={{display:'grid',gridTemplateColumns:'repeat(4,minmax(0,1fr))',gap:13,marginBottom:17}}>
      <Metric label="All requests" value="8" note="Across your work" icon="▤" />
      <Metric label="In progress" value="2" note="Moving through approval" icon="◷" />
      <Metric label="Approved" value="4" note="Ready or paid" icon="✓" />
      <Metric label="Needs your update" value="1" note="Add the missing details" tint="#FFF1C9" icon="!" />
    </div>
    <div className="workspace-grid-two" style={{display:'grid',gridTemplateColumns:'minmax(0,1.35fr) minmax(280px,.85fr)',gap:16,alignItems:'start'}}>
      <Surface><SectionHeading title="Recent requests" description="Track the latest changes to your requests." action={<Button variant="quiet" onClick={()=>onNavigate('employee','requests')}>See all</Button>} />
        <div style={{display:'grid',gap:9}}>{mine.slice(0,3).map(request=><RequestPreviewCard key={request.id} request={request} onOpen={()=>onNavigate('employee','request-detail')} />)}</div>
      </Surface>
      <Surface><SectionHeading title="Updates" description="The latest activity on your requests." action={<Button variant="quiet" onClick={()=>onNavigate('employee','updates')}>View all</Button>} />
        <ActivityFeed entries={updates.slice(0,3)} onOpen={()=>onNavigate('employee','request-detail')} />
      </Surface>
      <Surface style={{gridColumn:'1 / -1',background:tokens.mintSoft,borderColor:tokens.mintSoft}}><div style={{display:'flex',alignItems:'center',justifyContent:'space-between',gap:20,flexWrap:'wrap'}}><div><div style={{display:'inline-flex',padding:'5px 9px',marginBottom:10,borderRadius:999,background:'#fff',color:tokens.teal,font:'600 10px Inter,sans-serif'}}>Procurement made clearer</div><h2 style={{margin:0,font:'700 20px Sora,sans-serif'}}>Need something for work?</h2><p style={{margin:'7px 0 0',color:tokens.muted,font:'400 13px/1.5 Inter,sans-serif'}}>Tell us what you need and follow each step from your workspace.</p></div><Button onClick={()=>onNavigate('employee','make-request')}>Start a request</Button></div></Surface>
    </div>
    <p style={{marginTop:16,color:tokens.muted,font:'400 11px Inter,sans-serif'}}>Sample workspace view · This page will show your live requests after the backend is connected.</p>
  </>
}

export default EmployeeHomePage
