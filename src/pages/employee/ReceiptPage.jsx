import { useState } from 'react'
import { Button, Field, PageTitle, Surface, Notice } from '../../components/ProcurementUI.jsx'

function ReceiptPage({ onNavigate }) {
  const [submitted,setSubmitted]=useState(false)
  return <>
    <PageTitle eyebrow={<button type="button" onClick={()=>onNavigate('employee','request-detail')} style={{padding:0,border:0,background:'transparent',color:'#5A607A',cursor:'pointer'}}>Request details / Add receipt</button>} title="Add a receipt" description="Attach the final payment document for PR-ENG-0041." />
    {submitted?<Surface style={{maxWidth:620,margin:'24px auto',textAlign:'center',padding:32}}><h2 style={{margin:0,font:'700 23px Sora,sans-serif'}}>Receipt sent to Finance</h2><p style={{margin:'9px 0 20px',color:'#5A607A',font:'400 13px/1.6 Inter,sans-serif'}}>Your receipt is attached to PR-ENG-0041. Finance will review it during reconciliation.</p><Button onClick={()=>onNavigate('employee','request-detail')}>Back to request</Button></Surface>:<Surface style={{maxWidth:700}}><Notice>Accepted files: PDF, JPG or PNG. Upload a clear image of the final receipt.</Notice><div style={{display:'grid',gap:15,marginTop:18}}><Field as="select" label="Request" options={['PR-ENG-0041 · Cloud service renewal']} /><label style={{display:'grid',gap:8,color:'#141414',font:'600 12px Inter,sans-serif'}}>Receipt file<input type="file" accept=".pdf,.jpg,.jpeg,.png" onChange={()=>{}} style={{padding:14,border:'1px dashed #E6E2D9',borderRadius:14,background:'#fafaf8'}} /><span style={{color:'#5A607A',fontWeight:400}}>Maximum file size: 10 MB</span></label><Field label="Amount paid (₦)" type="number" placeholder="Enter the total paid" /><Field as="textarea" label="Note for Finance" placeholder="Add any useful details about this payment" style={{minHeight:90,padding:12}} /></div><div style={{display:'flex',justifyContent:'flex-end',gap:9,marginTop:20}}><Button variant="secondary" onClick={()=>onNavigate('employee','request-detail')}>Cancel</Button><Button onClick={()=>setSubmitted(true)}>Send receipt</Button></div></Surface>}
  </>
}
export default ReceiptPage
