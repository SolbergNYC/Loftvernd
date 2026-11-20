/* Loftvernd lead capture integration guide in README. */
(()=>{
  // Set to a verified form endpoint such as Formspree's https://formspree.io/f/YOUR_ID.
  // Leave empty until tested; the form then copies a formatted enquiry instead of sending it.
  const FORM_ENDPOINT = '';
  const form=document.getElementById('lead-form');
  if(!form)return;
  const feedback=document.getElementById('lead-feedback');
  const submit=form.querySelector('.lead-submit');
  const service=form.querySelector('[name=service]');
  const dispatch=(name,detail={})=>{
    window.dataLayer=window.dataLayer||[];
    window.dataLayer.push({event:name,...detail});
    window.dispatchEvent(new CustomEvent('loftvernd:'+name,{detail}));
  };
  document.querySelectorAll('a[data-cta]').forEach(link=>link.addEventListener('click',()=>{
    if(link.dataset.service){const opt=[...service.options].find(o=>o.value===link.dataset.service);if(opt)service.value=opt.value;}
    dispatch('cta_click',{page:location.pathname,placement:link.dataset.cta||'',service:link.dataset.service||''});
  }));
  if(FORM_ENDPOINT){submit.textContent='Senda fyrirspurn ↗';feedback.textContent='Upplýsingarnar verða sendar til Loftverndar þegar þú velur Senda fyrirspurn.';}
  form.addEventListener('submit',async event=>{
    event.preventDefault();
    if(!form.reportValidity())return;
    const fields=Object.fromEntries(new FormData(form));
    // Never include contact details in analytics events.
    dispatch('lead_attempt',{page:location.pathname,service:fields.service||''});
    feedback.className='lead-feedback';
    if(!FORM_ENDPOINT){
      const summary=['Fyrirspurn til Loftverndar','Nafn: '+fields.name,'Samband: '+fields.contact,'Svæði: '+fields.area,'Þjónusta: '+(fields.service||'Óákveðið'),'Upplýsingar: '+(fields.details||'Engar')].join('\n');
      try{await navigator.clipboard.writeText(summary);feedback.textContent='Fyrirspurnin hefur verið afrituð. Hún var EKKI send. Límdu hana í skilaboð til Loftverndar þegar samskiptaleið liggur fyrir.';feedback.classList.add('success');}
      catch(e){feedback.textContent='Ekki tókst að afrita. Fyrirspurnin var ekki send. Vinsamlegast reyndu aftur eða notaðu aðra samskiptaleið.';feedback.classList.add('error');}
      return;
    }
    submit.disabled=true;submit.textContent='Sendi…';
    try{
      const response=await fetch(FORM_ENDPOINT,{method:'POST',headers:{Accept:'application/json'},body:new FormData(form)});
      if(!response.ok)throw Error('Submission unsuccessful');
      dispatch('lead_submitted',{page:location.pathname,service:fields.service||''});
      feedback.textContent='Fyrirspurn móttekin. Takk fyrir!';feedback.classList.add('success');form.reset();
    }catch(e){feedback.textContent='Ekki tókst að senda fyrirspurnina. Reyndu aftur síðar.';feedback.classList.add('error');}
    finally{submit.disabled=false;submit.textContent='Senda fyrirspurn ↗';}
  });
})();
