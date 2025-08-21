(function () {
  const REFRESH_MS = 3000; // alle 3 Sekunden
  const $ = s => document.querySelector(s);
  const $btc = $('#btc');
  const $xrp = $('#xrp');
  const $cd  = $('#cd');

  // Formatierungen: BTC ohne Nachkommastellen, XRP genau 2
  const fmtBTC = new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 });
  const fmtXRP = new Intl.NumberFormat('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  let nextTs = Date.now() + REFRESH_MS;

  async function fetchPrices() {
    try {
      const url = 'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ripple&vs_currencies=usd,eur';
      const res = await fetch(url, { cache: 'no-store' });
      if (!res.ok) throw new Error('HTTP ' + res.status);
      const j = await res.json();

      const btc = j?.bitcoin?.usd;
      const xrp = j?.ripple?.eur;

      if (typeof btc === 'number') $btc.textContent = '$' + fmtBTC.format(btc);
      if (typeof xrp === 'number') $xrp.textContent = fmtXRP.format(xrp) + '€';
    } catch (e) {
      // Fehler ignorieren – alte Werte bleiben sichtbar
    } finally {
      nextTs = Date.now() + REFRESH_MS; // Countdown neu setzen
    }
  }

  // Countdown unten rechts (nur Zahl + "s")
  setInterval(() => {
    const msLeft = Math.max(0, nextTs - Date.now());
    const sLeft = Math.ceil(msLeft / 1000);
    $cd.textContent = sLeft + 's';
  }, 1000);

  // Regelmäßig neu laden
  setInterval(fetchPrices, REFRESH_MS);

  // Initialer Abruf
  fetchPrices();
})();
