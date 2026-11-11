window.VALMA.dashboard=function(){
 const d=VALMA.data, now=new Date(), year=now.getFullYear(), month=now.getMonth();
 const monthName=new Intl.DateTimeFormat('es-ES',{month:'long',year:'numeric'}).format(now);
 const first=new Date(year,month,1), offset=(first.getDay()+6)%7, days=new Date(year,month+1,0).getDate();
 const start=new Date(year,month,1-offset), weeks=Math.ceil((offset+days)/7);
 const esc=s=>String(s||'').replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
 const projects=d.proyectos||[], pieces=d.piezas||[], ots=d.ordenesTrabajo||d.tareas||[];
 const states=a=>a.reduce((o,x)=>{const s=String(x.estado||'').toUpperCase();o[s]=(o[s]||0)+1;return o},{});
 const ps=states(projects), os=states(ots);
 const metric=(obj,keys)=>keys.map(k=>`<span>${k}: <b>${obj[k]||0}</b></span>`).join('');
 const cards=[
  {title:'PROYECTOS',color:'red',count:projects.length,sub:metric(ps,['EN PROCESO','EN COLA','EN ESPERA']),view:'proyectos'},
  {title:'PIEZAS',color:'orange',count:pieces.length,sub:'Referencias registradas',view:'piezas'},
  {title:'ÓRDENES DE TRABAJO',color:'green',count:ots.length,sub:metric(os,['EN COLA','EN PROCESO','EN ESPERA','TERMINADO']),view:'ordenes'}
 ];
 const eventList=[];
 projects.forEach(x=>{if(x.fechaInicio){eventList.push({name:x.nombre||x.codigo,start:x.fechaInicio,end:x.fechaFin||x.fechaInicio,type:'project',id:x.id,state:x.estado});}});
 ots.filter(x=>!x.proyectoId).forEach(x=>{if(x.fechaInicio){eventList.push({name:x.titulo||x.nombre||x.codigo,start:x.fechaInicio,end:x.fechaFin||x.fechaInicio,type:'ot',id:x.id,state:x.estado});}});
 const weeksHtml=Array.from({length:weeks},(_,w)=>{
  const weekStart=new Date(start);weekStart.setDate(start.getDate()+w*7);
  const cells=Array.from({length:7},(_,i)=>{const dt=new Date(weekStart);dt.setDate(weekStart.getDate()+i);const inMonth=dt.getMonth()===month;const iso=`${dt.getFullYear()}-${String(dt.getMonth()+1).padStart(2,'0')}-${String(dt.getDate()).padStart(2,'0')}`;return `<div class="cal-day ${inMonth?'':'outside'} ${dt.toDateString()===now.toDateString()?'today':''}"><span>${dt.getDate()}</span><div class="cal-day-events">${eventList.filter(e=>e.start===iso).map(e=>`<button class="cal-event ${e.type}" title="${esc(e.name)} · ${esc(e.state)}" onclick="VALMA.nav.go('${e.type==='project'?'proyectos':'ordenes'}',{id:${e.id}})">${esc(e.name)}</button>`).join('')}</div></div>`;}).join('');
  return `<div class="calendar-week">${cells}</div>`;
 }).join('');
 return `<div class="page-title"><div><h1>Dashboard</h1><p>Resumen y acceso directo a las áreas de fábrica</p></div></div>
 <div class="dashboard-layout">
  <section class="card dashboard-departments" onclick="VALMA.nav.go('departamentos')"><div class="section-heading"><h2>DEPARTAMENTOS</h2><span>Acceder →</span></div>
   <div class="department-status"><button onclick="event.stopPropagation();VALMA.nav.go('departamentos',{d:'FÁBRICA'})"><b>FÁBRICA</b><span class="status-ok">● Sin incidencias</span></button><button onclick="event.stopPropagation();VALMA.nav.go('departamentos',{d:'MATRICERÍA'})"><b>MATRICERÍA</b><span class="status-ok">● Sin incidencias</span></button><button onclick="event.stopPropagation();VALMA.nav.go('departamentos',{d:'CALIDAD'})"><b>CALIDAD</b><span class="status-ok">● Sin incidencias</span></button></div>
  </section>
  <div class="dashboard-cards">${cards.map(c=>`<button class="card dashboard-card" onclick="VALMA.nav.go('${c.view}')"><span class="dashboard-card-title ${c.color}">${c.title}</span><strong>${c.count}</strong><span class="dashboard-card-sub">${c.sub||''}</span></button>`).join('')}</div>
 </div>
 <section class="card calendar dashboard-calendar"><div class="calendar-head"><div><h2>CALENDARIO GENERAL</h2><strong class="calendar-month">${monthName.charAt(0).toUpperCase()+monthName.slice(1)}</strong></div><span class="muted">Vista mensual</span></div>
 <div class="calendar-grid"><div class="calendar-week calendar-labels">${['LUN','MAR','MIÉ','JUE','VIE','SÁB','DOM'].map(x=>`<div>${x}</div>`).join('')}</div>${weeksHtml}</div>
 <div class="calendar-legend"><span><i class="legend-project"></i> Proyecto</span><span><i class="legend-ot"></i> OT independiente</span><small>Las OT vinculadas a proyectos no se muestran por separado.</small></div>
 </section>`;
};
