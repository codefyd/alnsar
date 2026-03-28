// مجمع تحفيظ القرآن الكريم — منظومة الإدارة الرقمية
// يُحمَّل هذا الملف من staff.html

function pgEduKpi(){
  var t=D.eduKpi;
  mc('<div class="stitle"><i class="fas fa-chart-pie"></i> لوحة المشرف التعليمي</div><div class="kpi-grid">'
    +kpiCard('إجمالي الطلاب',t.إجمالي_الطلاب||0,'fa-users','')
    +kpiCard('عدد الحلق',t.عدد_الحلق||0,'fa-mosque','')
    +kpiCard('مجموع الأجزاء',t.مجموع_الحفظ||0,'fa-book-open','kpi-ac')
    +kpiCard('إنذارات مفتوحة',t.انذارات_تعليمية_مفتوحة||0,'fa-triangle-exclamation','kpi-er')
    +kpiCard('إنذارات مكتملة',t.انذارات_تعليمية_مكتملة||0,'fa-check-circle','kpi-ok')
    +'</div>');
}

function pgEduW(){
  var all=arr(D.eduWarnings);
  var open=all.filter(function(a){return!String(a['تاريخ_الإغلاق']||'');});
  var closed=all.filter(function(a){return String(a['تاريخ_الإغلاق']||'');});
  var copts=D.circles.map(function(h){return'<option>'+h+'</option>';}).join('');
  mc('<div class="stitle"><i class="fas fa-triangle-exclamation"></i> الإنذارات التعليمية (اطلاع)</div>'
    +'<div class="cc"><div class="stabs">'
    +'<button class="stab active" onclick="swST(this,\'ewO\')"><i class="fas fa-folder-open"></i> المفتوحة ('+open.length+')</button>'
    +'<button class="stab" onclick="swST(this,\'ewC\')"><i class="fas fa-check-circle"></i> المغلقة ('+closed.length+')</button>'
    +'</div>'
    +'<div class="spanel active" id="ewO">'
    +'<div style="padding:12px 18px 0"><div class="fb">'
    +'<select class="fi" onchange="filterEW(this.value,\'\')"><option value="">كل الحلق</option>'+copts+'</select>'
    +'<input class="fi" placeholder="بحث باسم…" oninput="filterEW(\'\',this.value)" style="min-width:140px">'
    +'</div></div>'
    +'<div class="cbody" id="ewOBody">'+buildEduWCards(open)+'</div></div>'
    +'<div class="spanel" id="ewC"><div class="cbody">'+buildEduWCards(closed,true)+'</div></div>'
    +'</div>');
  D._ewOpen=open;
}

function buildEduWCards(list,closed){
  if(!list.length)return'<div class="empty"><i class="fas fa-check-circle" style="color:var(--ok)"></i><h3>'+(closed?'لا توجد إنذارات مغلقة':'لا توجد إنذارات مفتوحة')+'</h3></div>';
  return list.map(function(a){
    var st=D.eduStudentMap[a['اسم_الطالب']]||{};
    var sPhone=a['رقم_جوال_الطالب']||st['رقم_الجوال']||'';
    var pPhone=a['رقم_جوال_ولي_الامر']||st['رقم_جوال_ولي_الامر']||'';
    var pName=a['اسم_ولي_الامر']||'';
    var btnS=sPhone?'<button class="wab sm" onclick="sendEduWa(\''+q(sPhone)+'\',\''+q(a['اسم_الطالب'])+'\',\''+q(pName)+'\',\''+q(a['سبب_الانذار']||'')+'\',true)"><i class="fab fa-whatsapp"></i> طالب</button>':'';
    var btnP=pPhone?'<button class="wab sm" onclick="sendEduWa(\''+q(pPhone)+'\',\''+q(a['اسم_الطالب'])+'\',\''+q(pName)+'\',\''+q(a['سبب_الانذار']||'')+'\',false)"><i class="fab fa-whatsapp"></i> ولي الأمر</button>':'';
    return'<div class="wcard"><div class="wico wi-e"><i class="fas fa-triangle-exclamation"></i></div>'
     +'<div class="wbody"><h4>'+q(a['اسم_الطالب']||'—')+' <span style="font-weight:400;font-size:11px;color:var(--ts)">· '+q(a['الحلقة']||'—')+'</span></h4>'
     +'<p>'+q(a['سبب_الانذار']||'—')+' · '+fmtDate(a['تاريخ_الإصدار'])
     +(closed?' · <strong style="color:var(--ok)">أُغلق '+fmtDate(a['تاريخ_الإغلاق'])+'</strong>':' · الإجراء: <strong>'+q(a['حالة_الإجراء']||'بانتظار الإدارة')+'</strong>')+'</p>'
     +'</div><div class="wacts">'+btnS+btnP+'</div></div>';
  }).join('');
}

function filterEW(c,q2){
  var l=arr(D._ewOpen);
  if(c)l=l.filter(function(a){return a['الحلقة']===c;});
  if(q2)l=l.filter(function(a){return String(a['اسم_الطالب']||'').includes(q2);});
  var e=document.getElementById('ewOBody');if(e)e.innerHTML=buildEduWCards(l);
}

function sendEduWa(phone,sName,pName,reason,isStudent){
  var tpl=(D.templates||[]).find(function(t){return isStudent?t['نوع_القالب']==='انذار_تعليمي_للطالب':t['نوع_القالب']==='انذار_تعليمي_لولي_الامر';});
  var msg=buildMsg(tpl?tpl['نص_القالب']:'',{اسم_الطالب:sName,اسم_ولي_الطالب:pName,السبب:reason,تاريخ:hijri()});
  whatsapp(phone,msg);
}

function pgEduSt(){
  var list=arr(D.eduStudents);
  var copts=D.circles.map(function(h){return'<option>'+h+'</option>';}).join('');
  var rows=list.map(function(ط,i){
    return'<tr data-n="'+q(ط['اسم_الطالب']||'')+'" data-c="'+q(ط['الحلقة']||'')+'">'
     +'<td>'+(i+1)+'</td><td><strong>'+q(ط['اسم_الطالب']||'—')+'</strong></td>'
     +'<td>'+(ط['الحلقة']||'—')+'</td><td>'+(ط['المرحلة_الدراسية']||'—')+'</td>'
     +'<td>'+(ط['مجموع_الحفظ']||0)+' جزء</td>'
     +'<td>'+sBadge(ط['حالة_الطالب'])+'</td>'
     +'<td><button class="ob sm" onclick="issueEduWarn(\''+qj(ط)+'\')"><i class="fas fa-triangle-exclamation"></i> إنذار</button></td>'
     +'</tr>';
  }).join('');
  mc('<div class="stitle"><i class="fas fa-users"></i> الحلق والطلاب — إصدار الإنذارات</div>'
    +'<div class="cc"><div class="chdr"><h3>الطلاب ('+list.length+')</h3>'
    +'<div class="cacts">'
    +'<select class="fi" onchange="filterESt(this.value,\'\')"><option value="">كل الحلق</option>'+copts+'</select>'
    +'<input class="fi" placeholder="بحث باسم…" oninput="filterESt(\'\',this.value)" style="min-width:140px">'
    +'</div></div>'
    +'<div style="overflow-x:auto"><table class="dt" id="eStTbl">'
    +'<thead><tr><th>#</th><th>الاسم</th><th>الحلقة</th><th>المرحلة</th><th>الحفظ</th><th>الحالة</th><th>إنذار</th></tr></thead>'
    +'<tbody>'+rows+'</tbody></table></div></div>');
}

function filterESt(c,q2){document.querySelectorAll('#eStTbl tbody tr').forEach(function(r){r.style.display=(!c||r.dataset.c===c)&&(!q2||r.dataset.n.includes(q2))?'':'none';});}

async function issueEduWarn(sdStr){
  var ط=JSON.parse(decodeURIComponent(sdStr));
  // الأسباب = قائمة الأسباب المخصصة (منفصلة عن إجراءات المتابعة)
  var procs=arr(D.eduReasons).length ? arr(D.eduReasons) : arr(D.eduProcs);
  if(!procs.length){
    var rp=await api('جلب_الاجراءات',{});
    var allProcs=arr(rp.إجراءات);
    D.eduReasons=allProcs.filter(function(x){return x['نوع_الاجراء']==='سبب_تعليمي';}).map(function(x){return x['اسم_الاجراء'];}).filter(Boolean);
    D.eduProcs=allProcs.filter(function(x){return x['نوع_الاجراء']==='تعليمي';}).map(function(x){return x['اسم_الاجراء'];}).filter(Boolean);
    procs=D.eduReasons.length ? D.eduReasons : D.eduProcs;
  }
  var opts=procs.map(function(r){return'<option>'+r+'</option>';}).join('');
  var res=await Swal.fire({
    title:'إصدار إنذار تعليمي',
    html:'<div style="direction:rtl;text-align:right;display:grid;gap:10px">'
     +'<div style="font-size:13px;color:var(--ts)">الطالب: <strong>'+q(ط['اسم_الطالب']||'—')+'</strong> · الحلقة: <strong>'+q(ط['الحلقة']||'—')+'</strong></div>'
     +'<div><label style="font-size:12px;font-weight:600;display:block;margin-bottom:5px">سبب الإنذار (من قائمة الإجراءات)</label>'
     +'<select id="ewSel" class="swal2-select" style="font-family:Tajawal;width:100%;margin:0"><option value="">-- اختر --</option>'+opts+'</select></div>'
     +'<div><label style="font-size:12px;font-weight:600;display:block;margin-bottom:5px">ملاحظة إضافية (اختياري)</label>'
     +'<textarea id="ewNote" class="swal2-textarea" style="font-family:Tajawal;direction:rtl;height:80px;width:100%;margin:0"></textarea></div>'
     +'</div>',
    showCancelButton:true,confirmButtonText:'إصدار',cancelButtonText:'إلغاء',confirmButtonColor:'#1a3c5e',customClass:{popup:'swal-rtl'},
    preConfirm:function(){var b=val('ewSel'),n=val('ewNote').trim();if(!b)return Swal.showValidationMessage('اختر سبب الإنذار');return n?b+' — '+n:b;}
  });
  if(!res.isConfirmed||!res.value)return;
  spin(true,'جارٍ إصدار الإنذار…');
  var r=await api('إصدار_إنذار_تعليمي',{اسم_الطالب:ط['اسم_الطالب'],رقم_الطالب:ط['رقم_الطالب']||'',الحلقة:ط['الحلقة'],المرحلة_الدراسية:ط['المرحلة_الدراسية']||'',سبب_الانذار:res.value,اسم_المشرف:D.user['الاسم'],رقم_جوال_الطالب:ط['رقم_الجوال']||''});
  spin(false);
  if(r.نجاح){
    Swal.fire({icon:'success',title:'تم إصدار الإنذار',text:r.رقم_الانذار,timer:2000,showConfirmButton:false});
    D.eduWarnings.push({رقم_الانذار:r.رقم_الانذار,اسم_الطالب:ط['اسم_الطالب'],الحلقة:ط['الحلقة'],سبب_الانذار:res.value,حالة_الإجراء:'بانتظار الإدارة',تاريخ_الإصدار:new Date().toISOString(),تاريخ_الإغلاق:''});
    updateEduBadge();saveCache();
  }else{Swal.fire({icon:'error',title:'خطأ',text:r.خطأ||'حدث خطأ',confirmButtonColor:'#1a3c5e'});}
}
