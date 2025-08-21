(function(){
  const $=s=>document.querySelector(s);
  const fmtUSD=new Intl.NumberFormat('en-US',{style:'currency',currency:'USD'});
  const fmtEUR=new Intl.NumberFormat('de-DE',{style:'currency',currency:'EUR'});

  async function fetchData(){
    try{
      const res=await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ripple&vs_currencies=usd,eur',{cache:'no-store'});
      const j=await res.json();
      $('#btcPrice').textContent=fmtUSD.format(j.bitcoin.usd);
      $('#xrpPrice').textContent=fmtEUR.format(j.ripple.eur);
      $('#lastUpdate').textContent=new Date().toLocaleTimeString();
    }catch(e){
      console.error(e);
    }
  }

  $('#refresh').onclick=fetchData;
  fetchData();
  setInterval(fetchData,30000);
})();