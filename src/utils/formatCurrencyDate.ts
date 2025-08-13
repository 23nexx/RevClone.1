export const fmtMoney = (v:number) =>
  new Intl.NumberFormat('pt-PT', { style:'currency', currency:'EUR' }).format(v);

export const fmtDate = (iso:string) =>
  new Date(iso).toLocaleString('pt-PT', { dateStyle:'short', timeStyle:'short' });
