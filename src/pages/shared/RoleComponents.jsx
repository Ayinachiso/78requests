import { Button, StatusPill, Surface } from '../../components/ProcurementUI.jsx'
import { tokens } from '../../styles/tokens.js'

export function Toolbar({ children, style = {} }) {
  return <div style={{ display:'flex',alignItems:'center',justifyContent:'space-between',gap:12,flexWrap:'wrap',marginBottom:16,...style }}>{children}</div>
}

export function SectionHeading({ title, description, action }) {
  return <div style={{ display:'flex',alignItems:'flex-start',justifyContent:'space-between',gap:12,marginBottom:16 }}><div><h2 style={{margin:0,color:tokens.ink,font:'700 18px Sora,sans-serif',letterSpacing:'-.03em'}}>{title}</h2>{description&&<p style={{margin:'5px 0 0',color:tokens.muted,font:'400 12px/1.5 Inter,sans-serif'}}>{description}</p>}</div>{action}</div>
}

export function ActivityFeed({ entries, onOpen }) {
  return <div>{entries.map((entry,index)=><button key={`${entry.title}-${entry.time}`} type="button" onClick={()=>onOpen?.(entry)} style={{width:'100%',display:'flex',alignItems:'flex-start',gap:12,padding:'14px 0',border:0,borderTop:index?`1px solid ${tokens.line}`:0,background:'transparent',color:tokens.ink,textAlign:'left',cursor:'pointer'}}><span aria-hidden="true" style={{width:36,height:36,flex:'0 0 auto',display:'grid',placeItems:'center',borderRadius:13,background:entry.tone==='warning'?tokens.warnBg:entry.tone==='success'?tokens.mintSoft:'#f2f2ef',color:entry.tone==='warning'?tokens.warnText:tokens.teal}}>{entry.tone==='warning'?'!':entry.tone==='success'?'✓':'↗'}</span><span style={{flex:1,minWidth:0}}><b style={{display:'block',font:'600 13px/1.4 Inter,sans-serif'}}>{entry.title}</b><span style={{display:'block',marginTop:3,color:tokens.muted,font:'400 11px/1.45 Inter,sans-serif'}}>{entry.detail}</span></span><time style={{color:tokens.muted,font:'400 10px Inter,sans-serif',whiteSpace:'nowrap'}}>{entry.time}</time></button>)}</div>
}

export function StatusTimeline({ steps, current = 0 }) {
  return <div style={{display:'grid',gap:0}}>{steps.map((step,index)=><div key={step.title} style={{display:'grid',gridTemplateColumns:'24px 1fr',gap:12,minHeight:58}}><span style={{position:'relative',display:'grid',placeItems:'center',width:22,height:22,borderRadius:'50%',background:index<current?tokens.teal:index===current?tokens.mint:'#f0f0ed',color:index<current?'var(--on-inverse)':tokens.ink,font:'700 11px Inter,sans-serif'}}>{index<current?'✓':index+1}{index<steps.length-1&&<span aria-hidden="true" style={{position:'absolute',top:22,width:1,height:36,background:tokens.line}}/>}</span><div style={{paddingBottom:15}}><b style={{display:'block',font:'600 12px/1.4 Inter,sans-serif'}}>{step.title}</b><span style={{display:'block',marginTop:3,color:tokens.muted,font:'400 11px/1.5 Inter,sans-serif'}}>{step.detail}</span></div></div>)}</div>
}

export function RequestPreviewCard({ request, onOpen }) {
  return <button type="button" onClick={()=>onOpen?.(request)} style={{width:'100%',display:'grid',gridTemplateColumns:'1fr auto',gap:8,padding:16,border:`1px solid ${tokens.line}`,borderRadius:18,background:tokens.surface,color:tokens.ink,textAlign:'left',cursor:'pointer'}}><span style={{minWidth:0}}><b style={{display:'block',overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap',font:'600 13px Inter,sans-serif'}}>{request.item}</b><span style={{display:'block',marginTop:5,color:tokens.muted,font:'400 11px Inter,sans-serif'}}>{request.id} · {request.department}</span></span><span style={{display:'grid',justifyItems:'end',gap:7}}><b style={{font:'700 13px Sora,sans-serif'}}>{request.amount}</b><StatusPill>{request.status}</StatusPill></span></button>
}

export function Banner({ title, text, action, tone = 'mint' }) {
  const background = tone==='warning'?tokens.warnBg:tone==='danger'?tokens.errorBg:tokens.mint
  const color = tone==='warning'?tokens.warnText:tone==='danger'?tokens.errorText:tokens.ink
  return <Surface style={{display:'flex',alignItems:'center',justifyContent:'space-between',gap:18,background,borderColor:background,padding:20}}><div style={{minWidth:0,color}}><h2 style={{margin:0,font:'700 18px Sora,sans-serif'}}>{title}</h2><p style={{margin:'6px 0 0',font:'400 12px/1.5 Inter,sans-serif'}}>{text}</p></div>{action&&<Button variant="primary" onClick={action.onClick}>{action.label}</Button>}</Surface>
}

export function Money({ children }) { return <span style={{fontVariantNumeric:'tabular-nums',whiteSpace:'nowrap'}}>{children}</span> }
