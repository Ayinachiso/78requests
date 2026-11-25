import { useState } from 'react'
import { Button, Field, Notice, PageTitle, Surface } from '../../components/ProcurementUI.jsx'
import { tokens } from '../../styles/tokens.js'

function PayOutPage({ onNavigate }) {
  const [step,setStep]=useState(1)
  const [reference,setReference]=useState('')
  const [error,setError]=useState('')
  const [submitting,setSubmitting]=useState(false)
  function next(){if(step===1&&!reference.trim()){setError('Enter the Bank78 transaction reference.');return}setError('');if(step<2){setStep(step+1);return}setSubmitting(true);window.setTimeout(()=>{setSubmitting(false);onNavigate('finance','after-payment')},450)}
  return <><PageTitle eyebrow={<button type="button" onClick={()=>onNavigate('finance','payments')} style={{padding:0,border:0,background:'transparent',color:tokens.muted,cursor:'pointer'}}>Payments / Payout</button>} title="Pay out" description="Review the recipient and payment details before sending funds."/>
    <div className="workspace-grid-two" style={{display:'grid',gridTemplateColumns:'minmax(0,1.25fr) minmax(280px,.8fr)',gap:16,alignItems:'start'}}>
      <Surface><div style={{display:'flex',gap:7,marginBottom:20}}>{['Confirm payee','Payment reference'].map((label,index)=><div key={label} style={{flex:1,paddingBottom:9,borderBottom:`3px solid ${step===index+1?tokens.teal:index+1<step?tokens.mint:tokens.line}`,font:'600 11px Inter,sans-serif',color:step===index+1?tokens.ink:tokens.muted}}>{index+1<step?'✓ ':`${index+1} `}{label}</div>)}</div>
        {step===1?<><div style={{padding:17,borderRadius:18,background:tokens.mintSoft}}><div style={{color:tokens.muted,fontSize:11}}>Paying request</div><h2 style={{margin:'5px 0 0',font:'700 18px Sora,sans-serif'}}>PR-ENG-0041 · Cloud service renewal</h2><p style={{margin:'6px 0 0',color:tokens.muted,font:'400 12px Inter,sans-serif'}}>Approved today by Kunle Adeyemi</p></div><div style={{display:'grid',gap:13,marginTop:17}}><Field label="Payee" value="CloudWorks Nigeria Ltd" readOnly/><Field label="Account number" value="•••• •••• 2841" readOnly/><Field label="Bank" value="Bank78" readOnly/><Field label="Amount" value="₦470,000" readOnly/></div><Notice tone="warning">Check the supplier and amount against the approved invoice before continuing.</Notice></>:<div style={{display:'grid',gap:15}}><Notice>A payment reference helps the team reconcile this transaction later.</Notice><Field label="Bank78 transaction reference" placeholder="e.g. B78-2026-004817" value={reference} onChange={(event)=>setReference(event.target.value)} error={error}/><Field as="textarea" label="Note (optional)" placeholder="Add details for the audit trail" style={{minHeight:80,padding:12}}/></div>}
        <div style={{display:'flex',justifyContent:'space-between',gap:10,marginTop:22}}><Button variant="secondary" onClick={()=>step===1?onNavigate('finance','payments'):setStep(1)}>Back</Button><Button onClick={next} disabled={submitting}>{submitting?'Sending…':step===2?'Confirm and pay':'Continue'}</Button></div>
      </Surface>
      <Surface><h2 style={{margin:'0 0 15px',font:'700 17px Sora,sans-serif'}}>Bank78 payout account</h2><div style={{padding:17,borderRadius:18,background:'#141414',color:'#fff'}}><div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}><b style={{font:'700 13px Sora,sans-serif'}}>78 Requests</b><span style={{padding:'4px 8px',borderRadius:99,background:tokens.mint,color:tokens.ink,fontSize:10,fontWeight:700}}>Connected</span></div><div style={{marginTop:28,color:'#c7cbc8',fontSize:11}}>Available balance</div><div style={{marginTop:5,font:'700 23px Sora,sans-serif'}}>₦12,450,000.00</div><div style={{marginTop:16,fontSize:11,letterSpacing:'.08em'}}>•••• •••• •••• 1408</div></div><p style={{margin:'13px 0 0',color:tokens.muted,font:'400 11px/1.55 Inter,sans-serif'}}>Only authorised Finance Officers can make a payout. The action is recorded in the workspace audit log.</p></Surface>
    </div>
  </>
}
export default PayOutPage
