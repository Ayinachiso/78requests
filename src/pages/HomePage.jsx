import { useMemo, useState } from 'react'
import '../styles/employee.css'

const initialRequests = [
  { title: 'Payments squad reporting line', type: 'Chain of command', id: 'RQ-CC-0003', detail: 'Payments squad', status: 'Pending', note: 'With Chidi Eze' },
  { title: 'Cover while I am on leave', type: 'Delegation of authority', id: 'RQ-DA-0002', detail: 'Chidi Eze', status: 'Approved', note: 'Recorded' },
  { title: '27-inch monitor and arm', type: 'Procurement', id: 'PR-ENG-0058', detail: 'IT equipment Â· â‚¦600,000', status: 'Pending', note: 'Funmi Adeyemi is away' },
  { title: 'Figma team seat, one year', type: 'Procurement', id: 'PR-ENG-0057', detail: 'Software Â· â‚¦240,000', status: 'Returned', note: 'Needs your reply' },
  { title: 'USB-C docking station', type: 'Procurement', id: 'PR-ENG-0056', detail: 'IT equipment Â· â‚¦85,000', status: 'Pending', note: 'With Chidi Eze' },
  { title: 'Printer toner, 2 cartridges', type: 'Procurement', id: 'PR-ENG-0055', detail: 'Stationery Â· â‚¦45,000', status: 'Approved', note: 'With Finance' },
  { title: 'Wireless keyboard and mouse', type: 'Procurement', id: 'PR-ENG-0054', detail: 'IT equipment Â· â‚¦32,000', status: 'Paid', note: 'Add your receipt' },
  { title: 'Sprint planning lunch', type: 'Procurement', id: 'PR-ENG-0053', detail: 'Events & travel Â· â‚¦95,000', status: 'Paid', note: 'Receipt done' },
  { title: 'Annual antivirus licences', type: 'Procurement', id: 'PR-ENG-0052', detail: 'Software Â· â‚¦620,000', status: 'Rejected', note: '' },
]
const updatesSeed = [
  ['You sent Payments squad reporting line to Chidi Eze', 'Today, 9:20 AM', false],
  ['You sent USB-C docking station to Chidi Eze', 'Today, 9:05 AM', false],
  ['Finance paid Wireless keyboard and mouse. Add your receipt', 'Today, 8:52 AM Â· Paid', true],
  ['Kunle Adeyemi sent Figma team seat back with a question', 'Yesterday, 4:15 PM Â· Needs you', true],
  ['Funmi Adeyemi is away until 24 Nov. Your monitor request is waiting', 'Yesterday, 11:30 AM Â· Waiting', true],
  ['Chidi Eze approved Printer toner. Finance pays next', 'Wed, 18 Nov Â· Approved', false],
  ['Kunle Adeyemi rejected Annual antivirus licences', 'Mon, 2 Nov Â· Rejected', false],
]
const types = ['Procurement', 'Chain of command', 'Bank account opening', 'Delegation of authority']
const Icon = ({ name, size = 20 }) => {
  const paths = {
    home: <><path d="m3 10 9-7 9 7"/><path d="M5 9v11h14V9"/></>,
    send: <path d="m22 2-7 20-4-9-9-4Z M22 2 11 13"/>,
    bell: <><path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9"/><path d="M10 21h4"/></>,
    clock: <><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></>,
    check: <path d="m5 12 4 4L19 6"/>,
    x: <path d="m6 6 12 12M18 6 6 18"/>,
    plus: <path d="M12 5v14M5 12h14"/>,
    search: <><circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/></>,
    person: <><circle cx="12" cy="8" r="3"/><path d="M5 20c0-4 3-6 7-6s7 2 7 6"/></>,
    lock: <><rect x="5" y="10" width="14" height="11" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/></>,
    arrow: <><path d="M5 12h14M13 6l6 6-6 6"/></>,
    close: <path d="m6 6 12 12M18 6 6 18"/>,
  }
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name]}</svg>
}

function HomePage({ onSignOut, email }) {
  const [page, setPage] = useState('Home')
  const [panel, setPanel] = useState('')
  const [selectedType, setSelectedType] = useState('')
  const [requests, setRequests] = useState(initialRequests)
  const [status, setStatus] = useState('All')
  const [kind, setKind] = useState('All types')
  const [query, setQuery] = useState('')
  const [banner, setBanner] = useState(true)
  const [updates, setUpdates] = useState(updatesSeed)
  const [requestName, setRequestName] = useState('')
  const [category, setCategory] = useState('Stationery')
  const [amount, setAmount] = useState('0')
  const [reason, setReason] = useState('')
  const visibleRequests = useMemo(() => requests.filter((r) => (status === 'All' || r.status === status) && (kind === 'All types' || r.type === kind) && r.title.toLowerCase().includes(query.toLowerCase())), [requests, status, kind, query])
  const stats = [['Pending', '3', 'clock'], ['Needs you', '2', 'bell'], ['Approved', '4', 'check'], ['Rejected', '1', 'x']]
  const openRequest = (req) => { setRequestName(req.title); setPanel('detail') }
  const beginRequest = () => { setPanel('types'); setSelectedType('') }
  const submitRequest = (event) => {
    event.preventDefault()
    if (!requestName.trim()) return
    const item = { title: requestName, type: selectedType || 'Procurement', id: `PR-ENG-${String(59 + requests.length - initialRequests.length).padStart(4, '0')}`, detail: selectedType === 'Procurement' ? `${category} Â· â‚¦${Number(amount || 0).toLocaleString()}` : 'Engineering', status: 'Pending', note: 'Just submitted' }
    setRequests((old) => [item, ...old])
    setUpdates((old) => [[`You sent ${requestName} for approval`, 'Just now', true], ...old])
    setPanel(''); setPage('Requests'); setRequestName(''); setReason('')
  }
  const markRead = () => setUpdates((old) => old.map((u) => [u[0], u[1], false]))
  return <main className="employee-app">
    <header className="employee-topbar">
      <a className="employee-brand" href="#home" onClick={(e) => { e.preventDefault(); setPage('Home') }}><img src="/images/78-requests-mark-black.svg" alt=""/><span>Requests</span></a>
      <div className="top-actions"><button className="icon-button top-bell" onClick={() => setPanel(panel === 'updates-pop' ? '' : 'updates-pop')} aria-label="Open updates"><Icon name="bell"/><i>3</i></button><button className="avatar" onClick={() => setPanel(panel === 'profile' ? '' : 'profile')} aria-label="Account menu">AO</button></div>
    </header>
    <aside className="employee-rail" aria-label="Main navigation">
      {[['Home','home'],['Requests','send'],['Updates','bell']].map(([label, icon]) => <button key={label} className={`rail-link ${page === label ? 'active' : ''}`} onClick={() => { setPage(label); setPanel('') }} aria-label={label}><Icon name={icon}/><span>{label}</span>{label === 'Updates' && <b>3</b>}</button>)}
      <button className="accessibility-button" aria-label="Accessibility"><Icon name="person" size={25}/></button>
    </aside>
    <div className="employee-main">
      {page === 'Home' && <>
        <section className="hero-card"><div className="employee-eyebrow">Engineering Â· Engineer</div><h1>Good morning, Adaeze</h1><p>2 requests need something from you. The rest are moving.</p><button className="black-button" onClick={beginRequest}><Icon name="plus"/>Make a request</button></section>
        {banner && <section className="install-banner"><span className="install-plus"><Icon name="plus"/></span><div><strong>Add 78 Requests to your home screen</strong><p>1. iPhone: tap Share, then "Add to Home Screen"<br/>2. Android: tap the menu, then "Install app"</p></div><button className="pill-button" onClick={() => setBanner(false)}>Got it</button></section>}
        <div className="stat-grid">{stats.map(([name, count, icon]) => <button key={name} className="stat-card" onClick={() => {setPage('Requests');setStatus(name === 'Needs you' ? 'Returned' : name)}}><span className="stat-icon"><Icon name={icon}/></span><span>{name}</span><b>{count}</b></button>)}</div>
        <section className="recent-card"><div className="section-heading"><h2>Recent requests</h2><button className="outline-button" onClick={() => setPage('Requests')}>See all</button></div><RequestRows rows={requests.slice(0,5)} onSelect={openRequest}/></section>
      </>}
      {page === 'Requests' && <>
        <div className="page-heading"><div><h1>Requests</h1><span className="mint-rule"/><p>Everything youâ€™ve asked for, and where it is now.</p></div><button className="black-button" onClick={beginRequest}><Icon name="plus"/>Make a request</button></div>
        <div className="stat-grid request-stats">{[['All requests',String(requests.length),'list'],...stats.slice(0,3)].map(([label,count,icon])=><button className={`stat-card ${status === (label === 'All requests' ? 'All' : label === 'Needs you' ? 'Returned' : label) ? 'selected' : ''}`} key={label} onClick={()=>setStatus(label === 'All requests' ? 'All' : label === 'Needs you' ? 'Returned' : label)}><span className="stat-icon"><Icon name={icon === 'list' ? 'send' : icon}/></span><span>{label}</span><b>{count}</b></button>)}</div>
        <div className="filter-line"><label className="search-box"><Icon name="search"/><input value={query} onChange={(e)=>setQuery(e.target.value)} placeholder="Search your requests"/></label>{['All','Pending','Needs you','Approved','Rejected','Cancelled'].map(x=><button key={x} onClick={()=>setStatus(x === 'Needs you' ? 'Returned' : x)} className={`filter-pill ${status === (x === 'Needs you' ? 'Returned' : x) ? 'chosen' : ''}`}>{x}</button>)}</div>
        <div className="type-filters">{['All types',...types].map(x=><button key={x} className={kind===x?'chosen':''} onClick={()=>setKind(x)}>{x}</button>)}</div>
        <section className="request-list"><RequestRows rows={visibleRequests} onSelect={openRequest}/>{visibleRequests.length===0&&<p className="empty-state">No requests match those filters.</p>}</section>
      </>}
      {page === 'Updates' && <>
        <div className="page-heading"><div><h1>Updates</h1><span className="mint-rule"/><p>What has happened to your requests.</p></div><button className="soft-button" onClick={markRead}>Mark all read</button></div>
        <section className="updates-list">{updates.map(([text,time,unread],i)=><button className="update-row" key={`${text}-${i}`} onClick={()=>openRequest(requests.find(r=>text.includes(r.title)) || requests[0])}><span className={`read-dot ${unread?'unread':''}`}/><span className="update-copy"><strong>{text}</strong><small>{time}</small></span><Icon name="arrow" size={17}/></button>)}</section>
      </>}
    </div>
    {panel === 'types' && <><button className="scrim" aria-label="Close request form" onClick={()=>setPanel('')}/><section className="side-panel type-panel"><PanelClose onClick={()=>setPanel('')}/><h2>What kind of request?</h2><p className="panel-intro">The type decides the form and who approves.</p>{types.map((t,i)=><button className="type-card" key={t} onClick={()=>{setSelectedType(t);setPanel('form')}}><strong>{t}</strong><span>{['Buy something for work. The money is paid back into your own Bank78 account.','Set up or change who reports to whom, for example for a new product team.','Open a company bank account. The people you choose must approve it first.','Let someone approve on your behalf for a set time.'][i]}</span><small><b>{i===0?'â— Pays the requester':'â— Recorded as approved'}</b>{i===0?'Depends on category and amount':`${i===3?'2':'3'} approvers`}</small></button>)}</section></>}
    {panel === 'form' && <><button className="scrim" aria-label="Close request form" onClick={()=>setPanel('')}/><section className="side-panel request-panel"><PanelClose onClick={()=>setPanel('')}/><h2>Make a request</h2><div className="form-type-row"><span className="type-tag dark-tag">{selectedType}</span><button className="outline-button" onClick={()=>setPanel('types')}>Change type</button></div><form onSubmit={submitRequest}><label className="field-label">What do you need?<input autoFocus required value={requestName} onChange={(e)=>setRequestName(e.target.value)} placeholder="e.g. Laptop charger"/></label>{selectedType==='Procurement'&&<div className="two-fields"><label className="field-label">Category<select value={category} onChange={(e)=>setCategory(e.target.value)}>{['Stationery','IT equipment','Software','Events & travel','Other'].map(c=><option key={c}>{c}</option>)}</select></label><label className="field-label">Amount (â‚¦)<input type="number" min="0" value={amount} onChange={(e)=>setAmount(e.target.value)}/></label></div>}<label className="field-label">Why do you need it?<textarea value={reason} onChange={(e)=>setReason(e.target.value)}/></label><label className="quote-upload">+ &nbsp;Add a quote <small>Optional</small><input type="file"/></label><div className="where-label">Where it goes</div><div className="approval-card"><span className="step-dot">1</span><div><b>Chidi Eze</b><small>Team Lead</small></div><span className="step-dot completed">âœ“</span><div><b>{selectedType==='Procurement'?'Finance Officer':'People Operations'}</b><small>{selectedType==='Procurement'?'Pays from Bank78':'Recorded after approval'}</small></div></div><p className="privacy-note"><Icon name="lock" size={13}/> &nbsp;Paid only to you, into your own Bank78 account â€¢â€¢â€¢â€¢ 2291. Not to a team lead or anyone else.</p><p className="routing-note">For {category}, anything over â‚¦100,000 also goes to the Staff Engineer and Head of Engineering.</p><button className="black-button send-request" type="submit"><Icon name="send"/>Send request</button></form></section></>}
    {panel === 'detail' && <><button className="scrim" aria-label="Close request details" onClick={()=>setPanel('')}/><section className="side-panel detail-panel"><PanelClose onClick={()=>setPanel('')}/><h2>{requestName}</h2>{(()=>{const r=requests.find(x=>x.title===requestName);return r&&<><span className={`status-tag ${r.status.toLowerCase()}`}>{r.status}</span><p className="panel-intro">{r.id} Â· {r.type}</p><div className="approval-card"><span className="step-dot">1</span><div><b>Chidi Eze</b><small>Team Lead Â· {r.note}</small></div></div><p className="panel-intro">Your request is moving through the approval process. Youâ€™ll receive an update when its status changes.</p>{r.status==='Returned'&&<label className="field-label">Reply to the approver<textarea placeholder="Write your reply"/></label>}</>})()}</section></>}
    {panel === 'updates-pop' && <div className="updates-pop"><div className="pop-heading"><b>Updates</b><button onClick={markRead}>Mark all read</button></div>{updates.slice(0,4).map(([text,time,unread],i)=><button className="pop-update" key={i} onClick={()=>{setPage('Updates');setPanel('')}}><span className={unread?'unread':''}><Icon name="bell" size={16}/></span><div><b>{text}</b><small>{time.split(' Â· ')[0]}</small></div></button>)}<button className="pop-see" onClick={()=>{setPage('Updates');setPanel('')}}>See all updates</button></div>}
    {panel === 'profile' && <div className="profile-pop"><b>Adaeze Ogunleye</b><small>{email}</small><button onClick={()=>{setPanel('');onSignOut()}}>Sign out</button></div>}
  </main>
}
function PanelClose({onClick}) { return <button className="panel-close" aria-label="Close" onClick={onClick}><Icon name="close"/></button> }
function RequestRows({rows,onSelect}) { return <div className="request-rows">{rows.map((r)=><button key={r.id} className={`request-row ${r.status==='Returned'||r.status==='Paid'?'highlight':''}`} onClick={()=>onSelect(r)}><span className="request-info"><strong>{r.title}</strong><span><em className={`type-tag ${r.type==='Procurement'?'dark-tag':''}`}>{r.type}</em><small>{r.id} Â· {r.detail}</small></span></span><span className="row-end"><em className={`status-tag ${r.status.toLowerCase()}`}>â— &nbsp;{r.status}</em><small>{r.note}</small></span><Icon name="arrow" size={16}/></button>)}</div> }
export default HomePage
