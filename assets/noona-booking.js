/* Loftvernd / Noona integration. Paste your real Noona business booking URL below.
   For embedded booking, paste Noona HQ's official embed snippet into
   index.html, between NOONA EMBED START and NOONA EMBED END.
   Do not invent the script/embed URL; use code provided by Noona HQ. */
window.LOFTVERND_NOONA_BOOKING_URL = '';
(()=>{
  const link = window.LOFTVERND_NOONA_BOOKING_URL;
  const selected = document.getElementById('selected-package');
  const book = document.querySelector('.noona-book-link');
  const preview = document.querySelector('.preview-warning');
  const iframeSlot = document.getElementById('noona-embed-slot');
  const packages = { 'Loftvernd Essential':'Essential — 29.890 kr.', 'Loftvernd Complete':'Complete — 64.900 kr.', 'Loftvernd Complete Plus':'Complete Plus — 89.900 kr.' };
  const live = typeof link==='string' && /^https:\/\//i.test(link.trim());
  if(live){
    book.href = link.trim();book.textContent='Opna bókun í Noona ↗';book.target='_blank';book.rel='noopener noreferrer';book.removeAttribute('aria-disabled');
    if(preview)preview.textContent='Veldu þjónustu og fylgdu bókunarferlinu í Noona. Veldu rétta þjónustuleið í Noona áður en þú staðfestir.';
  }
  if(iframeSlot && iframeSlot.children.length){
    book.style.display='none';
    if(preview)preview.textContent='Bókaðu í Noona hér á síðunni. Veldu rétta þjónustuleið áður en þú staðfestir.';
  }
  document.querySelectorAll('a[data-service]').forEach(a=>a.addEventListener('click',()=>{
    const name=a.getAttribute('data-service');
    if(selected && packages[name])selected.textContent='Valin þjónusta: '+packages[name]+'. Veldu sömu þjónustuleið í Noona þegar bókun opnar.';
  }));
  if(!live)book.addEventListener('click',event=>event.preventDefault());
})();
