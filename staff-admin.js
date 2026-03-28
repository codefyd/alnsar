// مجمع تحفيظ القرآن الكريم — منظومة الإدارة الرقمية
// يُحمَّل هذا الملف من staff.html

function pgAdminKpi(){
  var t=D.kpi;
  mc('<div class="stitle"><i class="fas fa-chart-pie"></i> لوحة تقارير المشرف الإداري</div>'
    +'<div class="kpi-grid">'
    +kpiCard('إجمالي الطلاب',t.إجمالي_الطلاب||0,'fa-users','')
    +kpiCard('المنتظمون',t.طلاب_منتظمون||0,'fa-user-check','kpi-ok')
    +kpiCard('الموقوفون',t.طلاب_موقوفون||0,'fa-user-slash','kpi-er')
    +kpiCard('طلبات جديدة',t.طلبات_جديدة||0,'fa-inbox','kpi-wa')
    +kpiCard('قائمة الانتظار',t.طلبات_انتظار||0,'fa-hourglass-half','')
    +'</div>'
    +'<div class="stitle mt-2"><i class="fas fa-user-clock"></i> إنذارات التأخر</div><div class="kpi-grid">'
    +kpiCard('مستحقة',t.إنذارات_اداري_تأخر_مستحقة||0,'fa-clock','kpi-er')
    +kpiCard('مكتملة',t.ارشيف_تأخر||0,'fa-check','kpi-ok')
    +'</div><div class="stitle mt-2"><i class="fas fa-calendar-xmark"></i> إنذارات الغياب</div><div class="kpi-grid">'
    +kpiCard('مستحقة',t.إنذارات_اداري_غياب_مستحقة||0,'fa-calendar-xmark','kpi-er')
    +kpiCard('مكتملة',t.ارشيف_غياب||0,'fa-check','kpi-ok')
    +'</div><div class="stitle mt-2"><i class="fas fa-calendar-minus"></i> إنذارات الغياب بعذر</div><div class="kpi-grid">'
    +kpiCard('مستحقة',t.إنذارات_اداري_عذر_مستحقة||0,'fa-calendar-minus','kpi-wa')
    +kpiCard('مكتملة',t.ارشيف_عذر||0,'fa-check','kpi-ok')
    +'</div><div class="stitle mt-2"><i class="fas fa-book-open"></i> الإنذارات التعليمية</div><div class="kpi-grid">'
    +kpiCard('مفتوحة',t.انذ_تعليمية_مفتوحة||0,'fa-triangle-exclamation','kpi-er')
    +'</div>');
}

function pgAdminSt(){
  D.studentsPage=1; D.selStudents=new Set();
  var copts=D.circles.map(function(h){return'<option>'+h+'</option>';}).join('');
  var sopts=D.statuses.map(function(h){return'<option>'+h+'</option>';}).join('');
  mc('<div class="stitle"><i class="fas fa-users"></i> إدارة الطلاب</div>'
    +'<div class="cc"><div class="chdr"><h3>الطلاب ('+D.studentsTotal+')</h3>'
    +'<div class="cacts">'
    +'<button class="ob sm" onclick="exportCSV()"><i class="fas fa-file-csv"></i> CSV</button>'
    +'<button class="ob sm" onclick="bulkEdit()"><i class="fas fa-pen-to-square"></i> جماعي</button>'
    +'</div></div>'
    +'<div class="cbody" style="padding:12px 16px 0"><div class="fb">'
    +'<input class="fi" id="fN" placeholder="بحث بالاسم أو الهوية…" oninput="reloadSt()" style="flex:1;min-width:160px">'
    +'<select class="fi" id="fC" onchange="reloadSt()"><option value="">كل الحلق</option>'+copts+'</select>'
    +'<select class="fi" id="fS" onchange="reloadSt()"><option value="">كل الحالات</option>'+sopts+'</select>'
    +'<input class="fi" id="fHn" type="number" min="0" max="30" placeholder="حفظ >" oninput="reloadSt()" style="width:90px">'
    +'<input class="fi" id="fHx" type="number" min="0" max="30" placeholder="حفظ <" oninput="reloadSt()" style="width:90px">'
    +'</div></div>'
    +'<div style="overflow-x:auto"><table class="dt"><thead><tr>'
    +'<th><input type="checkbox" id="selAll" onchange="toggleSelAll(this)"></th>'
    +'<th>الاسم</th><th>الهوية</th><th>الحلقة</th><th>الحفظ</th><th>الحالة</th><th>إجراء</th>'
    +'</tr></thead><tbody id="stBody">'+buildStRows(D.students)+'</tbody></table></div>'
    +'<div class="cbody"><div class="pgbar">'
    +'<span id="pgI">الصفحة 1 من '+D.studentsPages+' · إجمالي '+D.studentsTotal+'</span>'
    +'<div class="pgbtns" id="pgB">'+buildPgBtns(1,D.studentsPages)+'</div>'
    +'</div></div></div>');
}

function buildStRows(list){
  if(!list.length)return'<tr><td colspan="7" style="text-align:center;padding:18px;color:var(--ts)">لا توجد نتائج</td></tr>';
  return list.map(function(ط){
    return'<tr><td><input type="checkbox" class="sc" value="'+q(ط['رقم_الطالب']||'')+'" onchange="toggleSel(this)"></td>'
     +'<td><a href="#" onclick="openStDetail(\''+qj(ط)+'\');return false" style="color:var(--pl);font-weight:700;text-decoration:none">'+q(ط['اسم_الطالب']||'—')+'</a></td>'
     +'<td style="font-size:11.5px;color:var(--ts)">'+q(ط['رقم_الهوية']||'—')+'</td>'
     +'<td>'+(ط['الحلقة']||'—')+'</td>'
     +'<td><strong>'+(ط['مجموع_الحفظ']||0)+'</strong> جزء</td>'
     +'<td>'+sBadge(ط['حالة_الطالب'])+'</td>'
     +'<td><button class="ob sm" onclick="openStDetail(\''+qj(ط)+'\')"><i class="fas fa-eye"></i></button></td>'
     +'</tr>';
  }).join('');
}

async function reloadSt(){
  var data={بحث:val('fN'),الحلقة:val('fC'),حالة_الطالب:val('fS'),حجم_الصفحة:PG,الصفحة:D.studentsPage};
  var mn=val('fHn'),mx=val('fHx');
  if(mn)data.حفظ_اكثر_من=mn; if(mx)data.حفظ_اقل_من=mx;
  spin(true);var r=await api('جلب_الطلاب',data);spin(false);
  D.students=arr(r.طلاب);
  document.getElementById('stBody').innerHTML=buildStRows(D.students);
  document.getElementById('pgI').textContent='الصفحة '+D.studentsPage+' من '+r.عدد_الصفحات+' · إجمالي '+r.المجموع;
  document.getElementById('pgB').innerHTML=buildPgBtns(D.studentsPage,r.عدد_الصفحات||1);
}

function buildPgBtns(cur,total){
  var h='';
  function b(p){h+='<button class="pgbtn '+(p===cur?'active':'')+'" onclick="goPg('+p+')">'+p+'</button>';}
  if(total<=6){for(var i=1;i<=total;i++)b(i);}
  else{b(1);if(cur>3)h+='<span class="pgbtn" style="cursor:default">…</span>';for(var j=Math.max(2,cur-1);j<=Math.min(total-1,cur+1);j++)b(j);if(cur<total-2)h+='<span class="pgbtn" style="cursor:default">…</span>';b(total);}
  return h;
}

async function goPg(p){D.studentsPage=p;await reloadSt();}

function toggleSelAll(cb){document.querySelectorAll('.sc').forEach(function(c){c.checked=cb.checked;toggleSel(c);});}

function toggleSel(cb){if(cb.checked)D.selStudents.add(cb.value);else D.selStudents.delete(cb.value);}

async function exportCSV(){spin(true,'جارٍ التصدير…');var r=await api('تصدير_الطلاب_csv',{});spin(false);if(r.csv){var b=new Blob(['\uFEFF'+r.csv],{type:'text/csv;charset=utf-8'});var a=document.createElement('a');a.href=URL.createObjectURL(b);a.download='students_'+Date.now()+'.csv';a.click();}}

async function bulkEdit(){
  var ids=Array.from(D.selStudents);
  if(!ids.length){Swal.fire({icon:'info',title:'لم تختر طلاباً',confirmButtonColor:'#1a3c5e',customClass:{popup:'swal-rtl'}});return;}
  var co=D.circles.map(function(h){return'<option>'+h+'</option>';}).join('');
  var so=D.statuses.map(function(h){return'<option>'+h+'</option>';}).join('');
  var res=await Swal.fire({title:'تعديل جماعي ('+ids.length+')',html:'<div style="direction:rtl;display:grid;gap:10px;text-align:right"><div><label style="font-size:12px;font-weight:600">الحلقة</label><select id="bC" class="swal2-select" style="font-family:Tajawal"><option value="">-- لا تغيير --</option>'+co+'</select></div><div><label style="font-size:12px;font-weight:600">الحالة</label><select id="bS" class="swal2-select" style="font-family:Tajawal"><option value="">-- لا تغيير --</option>'+so+'</select></div><div><label style="font-size:12px;font-weight:600">مجموع الحفظ</label><input id="bH" type="number" min="0" max="30" class="swal2-input" style="font-family:Tajawal"></div></div>',confirmButtonText:'تطبيق',cancelButtonText:'إلغاء',showCancelButton:true,confirmButtonColor:'#1a3c5e',customClass:{popup:'swal-rtl'},preConfirm:function(){var t={},c=val('bC'),s=val('bS'),h=val('bH');if(c)t['الحلقة']=c;if(s)t['حالة_الطالب']=s;if(h)t['مجموع_الحفظ']=h;if(!Object.keys(t).length)return Swal.showValidationMessage('عدّل حقلاً واحداً على الأقل');return t;}});
  if(!res.isConfirmed||!res.value)return;
  spin(true,'جارٍ التعديل…');var r=await api('تعديل_جماعي_طلاب',{أرقام_الطلاب:ids,تعديلات:res.value});spin(false);
  if(r.نجاح){Swal.fire({icon:'success',title:r.رسالة,timer:2000,timerProgressBar:true,showConfirmButton:false});reloadSt();}
}

async function openStDetail(sdStr){
  var ط=JSON.parse(decodeURIComponent(sdStr));
  var co=D.circles.map(function(h){return'<option value="'+h+'" '+(h===ط['الحلقة']?'selected':'')+'>'+h+'</option>';}).join('');
  var so=D.statuses.map(function(h){return'<option value="'+h+'" '+(h===ط['حالة_الطالب']?'selected':'')+'>'+h+'</option>';}).join('');
  var go=(GRADES[ط['المرحلة_الدراسية']]||[]).map(function(g){return'<option '+(g===ط['الصف_الدراسي']?'selected':'')+'>'+g+'</option>';}).join('');
  var res=await Swal.fire({title:'تعديل: '+q(ط['اسم_الطالب']),width:'640px',html:'<div style="direction:rtl;display:grid;grid-template-columns:1fr 1fr;gap:10px;text-align:right">'+sField('الاسم الكامل','sd_name',ط['اسم_الطالب'],'text',true)+sField('رقم الهوية','sd_id',ط['رقم_الهوية'],'text',true)+sField('رقم الجوال','sd_phone',ط['رقم_الجوال'],'text',false)+sField('الحي/العنوان','sd_addr',ط['الحي_العنوان'],'text',false)+'<div><label style="font-size:12px;font-weight:600;display:block;margin-bottom:4px">الحلقة</label><select id="sd_circle" class="swal2-select" style="font-family:Tajawal;width:100%;margin:0"><option value="">—</option>'+co+'</select></div><div><label style="font-size:12px;font-weight:600;display:block;margin-bottom:4px">الحالة</label><select id="sd_status" class="swal2-select" style="font-family:Tajawal;width:100%;margin:0"><option value="">—</option>'+so+'</select></div><div><label style="font-size:12px;font-weight:600;display:block;margin-bottom:4px">المرحلة</label><select id="sd_stage" class="swal2-select" style="font-family:Tajawal;width:100%;margin:0">'+['ابتدائي','متوسط','ثانوي','جامعي'].map(function(s){return'<option '+(s===ط['المرحلة_الدراسية']?'selected':'')+'>'+s+'</option>';}).join('')+'</select></div><div><label style="font-size:12px;font-weight:600;display:block;margin-bottom:4px">الصف</label><select id="sd_grade" class="swal2-select" style="font-family:Tajawal;width:100%;margin:0"><option value="">—</option>'+go+'</select></div>'+sField('مجموع الحفظ','sd_hifz',ط['مجموع_الحفظ']||0,'number',false)+sField('جوال ولي الأمر','sd_pph',ط['رقم_جوال_ولي_الامر']||'','text',false)+'</div>',confirmButtonText:'حفظ',cancelButtonText:'إلغاء',showCancelButton:true,confirmButtonColor:'#1a3c5e',customClass:{popup:'swal-rtl'},preConfirm:function(){return{رقم_الجوال:val('sd_phone'),الحي_العنوان:val('sd_addr'),الحلقة:val('sd_circle'),حالة_الطالب:val('sd_status'),المرحلة_الدراسية:val('sd_stage'),الصف_الدراسي:val('sd_grade'),مجموع_الحفظ:val('sd_hifz'),_p:val('sd_pph')};}});
  if(!res.isConfirmed||!res.value)return;
  var edits={},pph=res.value._p;
  Object.keys(res.value).forEach(function(k){if(k!=='_p'&&res.value[k]!=='')edits[k]=res.value[k];});
  spin(true,'جارٍ الحفظ…');var r=await api('تعديل_بيانات_طالب',{رقم_الطالب:ط['رقم_الطالب'],تعديلات:edits,تعديلات_ولي_الامر:pph?{رقم_جوال_ولي_الامر:pph}:{}});spin(false);
  if(r.نجاح){Swal.fire({icon:'success',title:'تم الحفظ',timer:2000,timerProgressBar:true,showConfirmButton:false});reloadSt();}
}

function pgAdminReq(){
  updateReqBadge();
  mc('<div class="stitle"><i class="fas fa-inbox"></i> الطلبات الواردة</div>'
    +'<div class="cc"><div class="stabs" id="rqTabs">'
    +'<button class="stab '+(_curTab==='rqNew'?'active':'')+'" onclick="swRqTab(this,\'rqNew\')"><i class="fas fa-clock"></i> جديد ('+arr(D.reqNew).length+')</button>'
    +'<button class="stab '+(_curTab==='rqWait'?'active':'')+'" onclick="swRqTab(this,\'rqWait\')"><i class="fas fa-hourglass-half"></i> انتظار ('+arr(D.reqWait).length+')</button>'
    +'<button class="stab '+(_curTab==='rqRej'?'active':'')+'" onclick="swRqTab(this,\'rqRej\')"><i class="fas fa-circle-xmark"></i> المرفوضون</button>'
    +'<button class="stab '+(_curTab==='rqEdit'?'active':'')+'" onclick="swRqTab(this,\'rqEdit\')"><i class="fas fa-pen"></i> التعديلات ('+arr(D.reqEdits).length+')</button>'
    +'</div>'
    +'<div class="spanel '+(_curTab==='rqNew'?'active':'')+'" id="rqNew">'+buildReqTbl(arr(D.reqNew),'new')+'</div>'
    +'<div class="spanel '+(_curTab==='rqWait'?'active':'')+'" id="rqWait">'+buildReqTbl(arr(D.reqWait),'wait')+'</div>'
    +'<div class="spanel '+(_curTab==='rqRej'?'active':'')+'" id="rqRej">'
    +(D.reqRejLoaded?'<div style="overflow-x:auto">'+buildRejTbl(arr(D.reqRej))+'</div>':'<div class="cbody"><div class="empty"><i class="fas fa-hourglass"></i><h3>اضغط لتحميل المرفوضين</h3><button class="ob sm" style="margin-top:8px" onclick="loadRej()"><i class="fas fa-download"></i> تحميل</button></div></div>')
    +'</div>'
    +'<div class="spanel '+(_curTab==='rqEdit'?'active':'')+'" id="rqEdit">'+buildEditTbl(arr(D.reqEdits))+'</div>'
    +'</div>');
  if(_curTab==='rqRej'&&!D.reqRejLoaded)loadRej();
}

function swRqTab(btn,id){
  _curTab=id;
  document.querySelectorAll('#rqTabs .stab').forEach(function(b){b.classList.remove('active');});
  document.querySelectorAll('#rqTabs ~ .spanel').forEach(function(p){p.classList.remove('active');});
  btn.classList.add('active');
  var e=document.getElementById(id);if(e)e.classList.add('active');
  if(id==='rqRej'&&!D.reqRejLoaded)loadRej();
}

function buildReqTbl(list,mode){
  if(!list.length)return'<div class="cbody"><div class="empty"><i class="fas fa-inbox"></i><h3>لا توجد طلبات</h3></div></div>';
  var rows=list.map(function(ط){
    var waS='<a href="#" onclick="whatsapp(\''+q(ط['رقم_جوال_الطالب'])+'\');return false" style="color:var(--ok)"><i class="fab fa-whatsapp me-1"></i>'+(ط['رقم_جوال_الطالب']||'—')+'</a>';
    var waP='<a href="#" onclick="whatsapp(\''+q(ط['رقم_جوال_ولي_الامر'])+'\');return false" style="color:var(--ok)"><i class="fab fa-whatsapp me-1"></i>'+(ط['رقم_جوال_ولي_الامر']||'—')+'</a>';
    var btns='';
    if(mode==='new')btns='<button class="okb sm" onclick="acceptReq(\''+q(ط['رقم_الطلب'])+'\',\''+q(ط['اسم_الطالب']||'')+'\')"><i class="fas fa-check"></i></button> <button class="warnb sm" onclick="waitReq(\''+q(ط['رقم_الطلب'])+'\')"><i class="fas fa-hourglass-half"></i></button> ';
    else btns='<button class="okb sm" onclick="acceptReq(\''+q(ط['رقم_الطلب'])+'\',\''+q(ط['اسم_الطالب']||'')+'\')"><i class="fas fa-check"></i></button> ';
    btns+='<button class="erb sm" onclick="rejectReq(\''+q(ط['رقم_الطلب'])+'\')"><i class="fas fa-times"></i></button>';
    return'<tr id="rr_'+q(ط['رقم_الطلب'])+'"><td><strong>'+q(ط['اسم_الطالب']||'—')+'</strong></td><td>'+waS+'</td><td>'+waP+'</td><td>'+(ط['المرحلة_الدراسية']||'—')+'</td><td>'+(ط['الصف_الدراسي']||'—')+'</td><td style="font-size:11px">'+fmtDate(ط['تاريخ_الطلب'])+'</td><td style="white-space:nowrap">'+btns+'</td></tr>';
  }).join('');
  return'<div style="overflow-x:auto"><table class="dt"><thead><tr><th>الاسم</th><th>الجوال</th><th>جوال و.الأمر</th><th>المرحلة</th><th>الصف</th><th>التاريخ</th><th>إجراء</th></tr></thead><tbody>'+rows+'</tbody></table></div>';
}

function buildRejTbl(list){
  if(!list.length)return'<div class="empty"><i class="fas fa-check-circle" style="color:var(--ok)"></i><h3>لا توجد مرفوضة</h3></div>';
  var rows=list.map(function(ط){return'<tr><td><strong>'+q(ط['اسم_الطالب']||'—')+'</strong></td><td><a href="#" onclick="whatsapp(\''+q(ط['رقم_جوال_الطالب'])+'\');return false" style="color:var(--ok)"><i class="fab fa-whatsapp me-1"></i>'+(ط['رقم_جوال_الطالب']||'—')+'</a></td><td>'+(ط['المرحلة_الدراسية']||'—')+'</td><td style="color:var(--er)">'+q(ط['سبب_الرفض']||'—')+'</td><td style="font-size:11px">'+fmtDate(ط['تاريخ_المعالجة'])+'</td></tr>';}).join('');
  return'<table class="dt"><thead><tr><th>الاسم</th><th>الجوال</th><th>المرحلة</th><th>سبب الرفض</th><th>التاريخ</th></tr></thead><tbody>'+rows+'</tbody></table>';
}

function buildEditTbl(list){
  if(!list.length)return'<div class="cbody"><div class="empty"><i class="fas fa-check-circle" style="color:var(--ok)"></i><h3>لا توجد طلبات تعديل</h3></div></div>';
  var rows=list.map(function(ط){return'<tr id="er_'+q(ط['رقم_الطلب'])+'"><td><strong>'+q(ط['اسم_الطالب']||'—')+'</strong></td><td>'+(ط['الحقل_المراد_تعديله']||'—')+'</td><td style="color:var(--er)">'+q(ط['القيمة_القديمة']||'—')+'</td><td style="color:var(--ok);font-weight:700">'+q(ط['القيمة_الجديدة']||'—')+'</td><td><button class="okb sm" id="ea_'+q(ط['رقم_الطلب'])+'" onclick="approveEdit(\''+q(ط['رقم_الطلب'])+'\')"><i class="fas fa-check"></i></button> <button class="erb sm" id="er2_'+q(ط['رقم_الطلب'])+'" onclick="rejectEdit(\''+q(ط['رقم_الطلب'])+'\')"><i class="fas fa-times"></i></button></td></tr>';}).join('');
  return'<div style="overflow-x:auto"><table class="dt"><thead><tr><th>الطالب</th><th>الحقل</th><th>القديم</th><th>الجديد</th><th>إجراء</th></tr></thead><tbody>'+rows+'</tbody></table></div>';
}

async function loadRej(){var e=document.getElementById('rqRej');if(e)e.innerHTML='<div class="cbody"><div class="empty"><div class="spri" style="margin:0 auto 8px"></div><p>جارٍ التحميل…</p></div></div>';var r=await api('جلب_طلبات_التسجيل',{حالة:'مرفوض'});D.reqRej=arr(r.طلبات);D.reqRejLoaded=true;if(e)e.innerHTML='<div style="overflow-x:auto">'+buildRejTbl(D.reqRej)+'</div>';}

async function acceptReq(id,name){
  var co=D.circles.map(function(h){return'<option>'+h+'</option>';}).join('');
  var res=await Swal.fire({title:'قبول: '+name,html:'<p style="font-size:12.5px;color:#5a6a7a;margin-bottom:10px">حدّد الحلقة</p><select id="ac" class="swal2-select" style="font-family:Tajawal"><option value="">-- اختر --</option>'+co+'</select>',confirmButtonText:'تأكيد',cancelButtonText:'إلغاء',showCancelButton:true,confirmButtonColor:'#1e7e4a',customClass:{popup:'swal-rtl'},preConfirm:function(){var v2=val('ac');if(!v2)return Swal.showValidationMessage('اختر الحلقة');return v2;}});
  if(!res.isConfirmed||!res.value)return;
  D.reqNew=arr(D.reqNew).filter(function(t){return t['رقم_الطلب']!==id;});
  D.reqWait=arr(D.reqWait).filter(function(t){return t['رقم_الطلب']!==id;});
  updateReqBadge();pgAdminReq();
  var r=await api('قبول_طلب_تسجيل',{رقم_الطلب:id,الحلقة:res.value});
  if(r.نجاح)Swal.fire({icon:'success',title:'تم القبول!',text:'رقم الطالب: '+r.رقم_الطالب,confirmButtonColor:'#1a3c5e',customClass:{popup:'swal-rtl'}});
  else Swal.fire({icon:'error',title:'خطأ',text:r.خطأ,confirmButtonColor:'#1a3c5e'});
}

async function waitReq(id){
  var item=arr(D.reqNew).find(function(t){return t['رقم_الطلب']===id;});
  D.reqNew=arr(D.reqNew).filter(function(t){return t['رقم_الطلب']!==id;});
  if(item){item=Object.assign({},item,{'حالة_الطلب':'انتظار'});D.reqWait=[item].concat(arr(D.reqWait));}
  updateReqBadge();pgAdminReq();
  api('تحويل_للانتظار',{رقم_الطلب:id});
  Swal.fire({icon:'info',title:'تم التحويل للانتظار',timer:1500,timerProgressBar:true,showConfirmButton:false});
}

async function rejectReq(id){
  var res=await Swal.fire({title:'سبب الرفض',input:'textarea',inputPlaceholder:'اكتب سبب الرفض…',inputAttributes:{style:'font-family:Tajawal;direction:rtl'},confirmButtonText:'تأكيد الرفض',cancelButtonText:'إلغاء',showCancelButton:true,confirmButtonColor:'#c0392b',customClass:{popup:'swal-rtl'},preConfirm:function(v2){if(!v2||!v2.trim())return Swal.showValidationMessage('يجب إدخال السبب');return v2.trim();}});
  if(!res.isConfirmed||!res.value)return;
  D.reqNew=arr(D.reqNew).filter(function(t){return t['رقم_الطلب']!==id;});
  D.reqWait=arr(D.reqWait).filter(function(t){return t['رقم_الطلب']!==id;});
  updateReqBadge();pgAdminReq();
  api('رفض_طلب_تسجيل',{رقم_الطلب:id,سبب_الرفض:res.value});
  Swal.fire({icon:'success',title:'تم الرفض',timer:1800,timerProgressBar:true,showConfirmButton:false});
}

async function approveEdit(id){
  var ab=document.getElementById('ea_'+id),rb=document.getElementById('er2_'+id);
  if(ab)ab.disabled=true;if(rb)rb.disabled=true;
  spin(true);var r=await api('قبول_طلب_تعديل',{رقم_الطلب:id});spin(false);
  if(r.نجاح){var row=document.getElementById('er_'+id);if(row)row.remove();D.reqEdits=arr(D.reqEdits).filter(function(t){return t['رقم_الطلب']!==id;});updateReqBadge();Swal.fire({icon:'success',title:'تم القبول',timer:1500,timerProgressBar:true,showConfirmButton:false});}
  else{if(ab)ab.disabled=false;if(rb)rb.disabled=false;}
}

async function rejectEdit(id){
  var ab=document.getElementById('ea_'+id),rb=document.getElementById('er2_'+id);
  if(ab)ab.disabled=true;if(rb)rb.disabled=true;
  spin(true);var r=await api('رفض_طلب_تعديل',{رقم_الطلب:id});spin(false);
  if(r.نجاح){var row=document.getElementById('er_'+id);if(row)row.remove();D.reqEdits=arr(D.reqEdits).filter(function(t){return t['رقم_الطلب']!==id;});updateReqBadge();Swal.fire({icon:'info',title:'تم الرفض',timer:1500,timerProgressBar:true,showConfirmButton:false});}
  else{if(ab)ab.disabled=false;if(rb)rb.disabled=false;}
}

function pgAdminEduW(){
  var all=arr(D.adminEduW);
  var open=all.filter(function(a){return!String(a['تاريخ_الإغلاق']||'');});
  var procs=arr(D.procedures).filter(function(p){return p['نوع_الاجراء']==='تعليمي'&&p['نشط']!=='لا';});
  var copts=D.circles.map(function(h){return'<option>'+h+'</option>';}).join('');
  D._aewOpen=open;D._aewProcs=procs;
  mc('<div class="stitle"><i class="fas fa-book-open"></i> الإنذارات التعليمية</div>'
    +'<div class="cc"><div class="stabs">'
    +'<button class="stab active" onclick="swST(this,\'aewO\')">متابعة الإجراءات ('+open.length+')</button>'
    +'<button class="stab" onclick="swST(this,\'aewAll\')">جميع الإنذارات ('+all.length+')</button>'
    +'</div>'
    +'<div class="spanel active" id="aewO">'
    +'<div style="padding:12px 18px 0"><div class="fb">'
    +'<select class="fi" onchange="filterAEW(this.value,\'\')"><option value="">كل الحلق</option>'+copts+'</select>'
    +'<input class="fi" placeholder="بحث باسم…" oninput="filterAEW(\'\',this.value)" style="min-width:140px">'
    +'</div></div>'
    +'<div class="cbody" id="aewOBody">'+buildAEWCards(open,procs)+'</div></div>'
    +'<div class="spanel" id="aewAll"><div style="overflow-x:auto;padding:8px 16px">'+buildAEWAllTbl(all)+'</div></div>'
    +'</div>');
}

function buildAEWCards(list,procs){
  if(!list.length)return'<div class="empty"><i class="fas fa-check-circle" style="color:var(--ok)"></i><h3>لا توجد إنذارات مفتوحة</h3></div>';
  return list.map(function(a){
    var opts=procs.map(function(p){return'<option>'+p['اسم_الاجراء']+'</option>';}).join('');
    // جلب أرقام الجوال من الإنذار أو من قاموس الطلاب
    var stMap=D.eduStudentMap&&D.eduStudentMap[a['اسم_الطالب']]||{};
    var sPhone=a['رقم_جوال_الطالب']||stMap['رقم_الجوال']||stMap['رقم_جوال_الطالب']||'';
    var pPhone=a['رقم_جوال_ولي_الامر']||stMap['رقم_جوال_ولي_الامر']||'';
    var btnS=sPhone?'<button class="wab sm" onclick="admEduWa(\''+q(sPhone)+'\',\''+q(a['اسم_الطالب'])+'\',\''+q(a['سبب_الانذار']||'')+'\',true)"><i class="fab fa-whatsapp"></i> طالب</button>':'';
    var btnP=pPhone?'<button class="wab sm" onclick="admEduWa(\''+q(pPhone)+'\',\''+q(a['اسم_الطالب'])+'\',\''+q(a['سبب_الانذار']||'')+'\',false)"><i class="fab fa-whatsapp"></i> ولي الأمر</button>':'';
    return'<div class="wcard" id="awc_'+q(a['رقم_الانذار'])+'"><div class="wico wi-e"><i class="fas fa-triangle-exclamation"></i></div>'
     +'<div class="wbody"><h4>'+q(a['اسم_الطالب']||'—')+' · <span style="font-weight:400;font-size:11px">'+q(a['الحلقة']||'—')+'</span></h4>'
     +'<p>'+q(a['سبب_الانذار']||'—')+' · '+fmtDate(a['تاريخ_الإصدار'])+'<br>الإجراء: <strong>'+q(a['حالة_الإجراء']||'بانتظار')+'</strong></p>'
     +'</div><div class="wacts">'
     +'<select class="fi sm" id="ap_'+q(a['رقم_الانذار'])+'" style="font-size:11.5px"><option value="">تحديث</option>'+opts+'<option value="__done__">✓ اكتمل</option></select>'
     +'<button class="pb sm" onclick="saveEduWProc(\''+q(a['رقم_الانذار'])+'\')"><i class="fas fa-save"></i> حفظ</button>'
     +btnS+btnP
     +'</div></div>';
  }).join('');
}

function buildAEWAllTbl(list){
  if(!list.length)return'<div class="empty"><i class="fas fa-check-circle" style="color:var(--ok)"></i><h3>لا توجد إنذارات</h3></div>';
  var rows=list.map(function(a){
    var waS=a['رقم_جوال_الطالب']?'<a href="#" onclick="whatsapp(\''+q(a['رقم_جوال_الطالب'])+'\');return false" style="color:var(--ok)"><i class="fab fa-whatsapp me-1"></i>'+q(a['رقم_جوال_الطالب'])+'</a>':'—';
    var waP=a['رقم_جوال_ولي_الامر']?'<a href="#" onclick="whatsapp(\''+q(a['رقم_جوال_ولي_الامر'])+'\');return false" style="color:var(--ok)"><i class="fab fa-whatsapp me-1"></i>'+q(a['رقم_جوال_ولي_الامر'])+'</a>':'—';
    var badge=String(a['تاريخ_الإغلاق']||'')?'<span class="bp bp-ok">مكتمل</span>':'<span class="bp bp-er">مفتوح</span>';
    return'<tr><td><strong>'+q(a['اسم_الطالب']||'—')+'</strong></td><td>'+q(a['الحلقة']||'—')+'</td><td>'+waS+'</td><td>'+waP+'</td><td>'+q(a['سبب_الانذار']||'—')+'</td><td>'+q(a['حالة_الإجراء']||'—')+'</td><td>'+badge+'</td></tr>';
  }).join('');
  return'<table class="dt"><thead><tr><th>الطالب</th><th>الحلقة</th><th>جوال الطالب</th><th>جوال و.الأمر</th><th>السبب</th><th>الإجراء</th><th>الحالة</th></tr></thead><tbody>'+rows+'</tbody></table>';
}

function filterAEW(c,q2){
  var l=arr(D._aewOpen);
  if(c)l=l.filter(function(a){return a['الحلقة']===c;});
  if(q2)l=l.filter(function(a){return String(a['اسم_الطالب']||'').includes(q2);});
  var e=document.getElementById('aewOBody');if(e)e.innerHTML=buildAEWCards(l,arr(D._aewProcs));
}

async function saveEduWProc(id){
  var sel=document.getElementById('ap_'+id);var v2=sel?sel.value:'';if(!v2)return;
  var done=v2==='__done__';
  if(done){var el=document.getElementById('awc_'+id);if(el)el.remove();}
  spin(true);var r=await api('تحديث_إجراء_انذار_تعليمي',{رقم_الانذار:id,الإجراء:done?'مكتمل':v2,مكتمل:done});spin(false);
  if(r.نجاح){
    D.adminEduW=arr(D.adminEduW).map(function(x){return String(x['رقم_الانذار'])===String(id)?Object.assign({},x,{'حالة_الإجراء':done?'مكتمل':v2,'تاريخ_الإغلاق':done?new Date().toISOString():(x['تاريخ_الإغلاق']||'')}):x;});
    if(!done&&sel)sel.value='';
    // Fix #6: تحديث جميع الإنذارات فوراً
    if(D.allWarnMap){Object.values(D.allWarnMap).forEach(function(s){s.edu=(s.edu||[]).map(function(x){return String(x['رقم_الانذار'])===String(id)?Object.assign({},x,{'حالة_الإجراء':done?'مكتمل':v2}):x;});});var wb=document.getElementById('awBody');if(wb)wb.innerHTML=buildAllWRows(Object.values(D.allWarnMap));}
    Swal.fire({icon:'success',title:'تم',timer:1200,showConfirmButton:false});
  }
}

function admEduWa(phone,sName,reason,isStudent){
  var tpl=(D.templates||[]).find(function(t){return isStudent?t['نوع_القالب']==='انذار_تعليمي_للطالب':t['نوع_القالب']==='انذار_تعليمي_لولي_الامر';});
  var msg=buildMsg(tpl?tpl['نص_القالب']:'',{اسم_الطالب:sName,السبب:reason,تاريخ:hijri()});
  whatsapp(phone,msg);
}

async function pgAdminAdmW(){
  var wd=D.admWarnData||null;
  var cntT=wd?arr((wd['تأخر']||{}).list).length:0;
  var cntG=wd?arr((wd['غياب']||{}).list).length:0;
  var cntE=wd?arr((wd['غياب_بعذر']||{}).list).length:0;
  mc('<div class="stitle"><i class="fas fa-user-clock"></i> الإنذارات الإدارية</div>'
    +'<div class="cc"><div class="stabs" id="admWTabs">'
    +'<button class="stab active" onclick="loadAdmWT(\'تأخر\',this)"><i class="fas fa-clock"></i> التأخر'+(cntT?'<span class="nbadge" style="margin-right:5px">'+cntT+'</span>':'')+'</button>'
    +'<button class="stab" onclick="loadAdmWT(\'غياب\',this)"><i class="fas fa-calendar-xmark"></i> الغياب'+(cntG?'<span class="nbadge" style="margin-right:5px">'+cntG+'</span>':'')+'</button>'
    +'<button class="stab" onclick="loadAdmWT(\'غياب_بعذر\',this)"><i class="fas fa-calendar-minus"></i> الغياب بعذر'+(cntE?'<span class="nbadge" style="margin-right:5px">'+cntE+'</span>':'')+'</button>'
    +'</div><div id="admWC" class="cbody"><div class="empty"><div class="spri" style="margin:0 auto 8px"></div></div></div></div>');
  loadAdmWT('تأخر',document.querySelector('#admWTabs .stab'));
}

async function loadAdmWT(نوع,tabEl){
  document.querySelectorAll('#admWTabs .stab').forEach(function(t){t.classList.remove('active');});
  if(tabEl)tabEl.classList.add('active');
  D.admType=نوع;
  // استخدام البيانات المجلوبة مسبقاً — لا انتظار!
  var cached=D.admWarnData&&D.admWarnData[نوع];
  var مستحقون, أرشيف;
  if(cached){
    // بيانات جاهزة من الخلفية — لا انتظار
    مستحقون=arr(cached.list); أرشيف=arr(cached.arch);
  } else {
    // لم تُجلب بعد — نجلبها الآن
    spin(true,'جارٍ الحساب…');
    try{
      var rs=await Promise.all([
        api('جلب_مستحقي_الانذار_الاداري',{نوع:نوع}),
        api('جلب_ارشيف_انذارات_ادارية',{نوع_الانذار:نوع}),
      ]);
      مستحقون=arr(rs[0].طلاب); أرشيف=arr(rs[1].انذارات);
      if(!D.admWarnData)D.admWarnData={};
      D.admWarnData[نوع]={list:مستحقون,arch:أرشيف};
    }catch(e){ console.warn('loadAdmWT:',e); مستحقون=[]; أرشيف=[]; }
    spin(false);
  }
  var procs=arr(D.procedures).filter(function(p){return p['نوع_الاجراء']===نوع&&p['نشط']!=='لا';});
  D.admTpl=(D.templates||[]).find(function(t){return t['نوع_القالب']&&(t['نوع_القالب'].includes(نوع==='تأخر'?'تاخر':نوع==='غياب_بعذر'?'بعذر':'غياب'));});
  D.admProcs=procs;D._admNew=مستحقون;D._admArch=أرشيف;
  var copts=D.circles.map(function(h){return'<option>'+h+'</option>';}).join('');
  var archRows=أرشيف.map(function(a){return'<tr><td><strong>'+q(a['اسم_الطالب']||'—')+'</strong></td><td>'+(a['الحلقة']||'—')+'</td><td>'+(a['نوع_الانذار']||'—')+'</td><td>'+(a['رقم_العتبة']||'—')+'</td><td>'+(a['عدد_المخالفات']||'—')+'</td><td>'+(a['حالة_الإجراء']||'—')+'</td><td style="font-size:11px">'+fmtDate(a['تاريخ_الإغلاق'])+'</td></tr>';}).join('');
  document.getElementById('admWC').innerHTML=
    '<div class="stabs" style="border-bottom:1px solid var(--bd);margin:-18px -20px 14px;padding:0 8px">'
    +'<button class="stab active" onclick="swST(this,\'adwN\')">الجديدة ('+مستحقون.length+')</button>'
    +'<button class="stab" onclick="swST(this,\'adwA\')">السابقة ('+أرشيف.length+')</button>'
    +'</div>'
    +'<div class="spanel active" id="adwN">'
    +'<div class="fb"><select class="fi" onchange="filterAdmW(this.value,\'\')"><option value="">كل الحلق</option>'+copts+'</select>'
    +'<input class="fi" placeholder="بحث باسم…" oninput="filterAdmW(\'\',this.value)" style="min-width:140px"></div>'
    +'<div id="admWCards">'+buildAdmWCards(مستحقون)+'</div></div>'
    +'<div class="spanel" id="adwA">'
    +(أرشيف.length?'<div style="overflow-x:auto"><table class="dt"><thead><tr><th>الطالب</th><th>الحلقة</th><th>النوع</th><th>العتبة</th><th>المخالفات</th><th>الإجراء</th><th>التاريخ</th></tr></thead><tbody>'+archRows+'</tbody></table></div>':'<div class="empty"><i class="fas fa-box-archive"></i><h3>لا يوجد أرشيف</h3></div>')
    +'</div>';
}

function buildAdmWCards(list){
  if(!list.length)return'<div class="empty"><i class="fas fa-check-circle" style="color:var(--ok)"></i><h3>لا يوجد طلاب مستحقون</h3></div>';
  var procs=arr(D.admProcs);
  return list.map(function(ط){
    var opts=procs.map(function(p){return'<option>'+p['اسم_الاجراء']+'</option>';}).join('');
    var btnWa=ط['رقم_جوال_ولي_الامر']?'<button class="wab sm" onclick="sendAdmWa(\''+q(ط['رقم_جوال_ولي_الامر'])+'\',\''+q(ط['اسم_الطالب'])+'\',\''+q(ط['اسم_ولي_الامر']||'')+'\','+ط['رقم_العتبة']+','+ط['عدد_المخالفات']+')"><i class="fab fa-whatsapp"></i> تواصل</button>':'';
    return'<div class="wcard"><div class="wico wi-l"><i class="fas fa-triangle-exclamation"></i></div>'
     +'<div class="wbody"><h4>'+q(ط['اسم_الطالب']||'—')+' · <span style="font-weight:400;font-size:11px">'+q(ط['الحلقة']||'—')+'</span></h4>'
     +'<p>إنذار العتبة <strong>'+ط['رقم_العتبة']+'</strong> · المخالفات: <strong>'+ط['عدد_المخالفات']+'</strong> · الإجراء: <strong style="color:var(--p)">'+q(ط['الإجراء_المقترح']||'—')+'</strong></p>'
     +'</div><div class="wacts">'
     +'<select class="fi sm" id="adwP_'+q(ط['رقم_الطالب'])+'" style="font-size:11.5px"><option value="">الإجراء</option>'+opts+'<option value="__done__">✓ اكتمل</option></select>'
     +'<button class="pb sm" onclick="saveAdmW(\''+q(ط['رقم_الطالب'])+'\',\''+q(ط['اسم_الطالب'])+'\',\''+q(ط['الحلقة']||'')+'\','+ط['رقم_العتبة']+','+ط['عدد_المخالفات']+')"><i class="fas fa-save"></i> حفظ</button>'
     +btnWa+'</div></div>';
  }).join('');
}

function filterAdmW(c,q2){var l=arr(D._admNew);if(c)l=l.filter(function(ط){return ط['الحلقة']===c;});if(q2)l=l.filter(function(ط){return String(ط['اسم_الطالب']||'').includes(q2);});var e=document.getElementById('admWCards');if(e)e.innerHTML=buildAdmWCards(l);}

async function saveAdmW(id,name,circle,threshold,count){var sel=document.getElementById('adwP_'+id);var v2=sel?sel.value:'';if(!v2)return;var done=v2==='__done__';spin(true);await api('تحديث_إجراء_انذار_اداري',{رقم_الطالب:id,اسم_الطالب:name,الحلقة:circle,نوع_الانذار:D.admType,رقم_العتبة:threshold,عدد_المخالفات:count,الإجراء:done?'مكتمل':v2,مكتمل:done});spin(false);Swal.fire({icon:'success',title:'تم التسجيل',timer:1400,timerProgressBar:true,showConfirmButton:false});if(done)loadAdmWT(D.admType,null);else if(sel)sel.value='';}

function sendAdmWa(phone,sName,pName,threshold,count){var tpl=D.admTpl;var msg=buildMsg(tpl?tpl['نص_القالب']:'',{اسم_الطالب:sName,اسم_ولي_الطالب:pName,رقم_العتبة:threshold,عدد_الغيابات:count,تاريخ:hijri()});whatsapp(phone,msg);}

function pgAdminAllW(){
  var edu=arr(D.adminEduW),adm=arr(D.adminAdmW),map={};
  edu.forEach(function(a){var k=a['اسم_الطالب']||'؟';if(!map[k])map[k]={name:k,circle:a['الحلقة']||'—',stage:a['المرحلة_الدراسية']||'—',edu:[],late:[],abs:[],ex:[]};map[k].edu.push(a);});
  adm.forEach(function(a){var k=a['اسم_الطالب']||'؟';if(!map[k])map[k]={name:k,circle:a['الحلقة']||'—',stage:a['المرحلة_الدراسية']||'—',edu:[],late:[],abs:[],ex:[]};if(a['نوع_الانذار']==='تأخر')map[k].late.push(a);else if(a['نوع_الانذار']==='غياب')map[k].abs.push(a);else map[k].ex.push(a);});
  D.allWarnMap=map;
  var copts=D.circles.map(function(h){return'<option>'+h+'</option>';}).join('');
  var stages=[...new Set(Object.values(map).map(function(x){return x.stage;}).filter(function(x){return x&&x!=='—';}))];
  var sopts=stages.map(function(s){return'<option>'+s+'</option>';}).join('');
  mc('<div class="stitle"><i class="fas fa-list-check"></i> جميع الإنذارات</div>'
    +'<div class="cc"><div class="chdr"><h3>سجل شامل</h3>'
    +'<div class="cacts">'
    +'<select class="fi" id="awfC" onchange="applyAllWF()"><option value="">كل الحلق</option>'+copts+'</select>'
    +'<select class="fi" id="awfS" onchange="applyAllWF()"><option value="">كل المراحل</option>'+sopts+'</select>'
    +'<input class="fi" id="awfQ" placeholder="بحث باسم…" oninput="applyAllWF()" style="min-width:140px">'
    +'</div></div>'
    +'<div style="overflow-x:auto"><table class="dt"><thead><tr><th>الطالب</th><th>الحلقة</th><th>المرحلة</th><th>تأخر</th><th>غياب</th><th>غياب بعذر</th><th>تعليمية</th></tr></thead>'
    +'<tbody id="awBody">'+buildAllWRows(Object.values(map))+'</tbody></table></div></div>');
}

function buildAllWRows(list){
  if(!list.length)return'<tr><td colspan="7" style="text-align:center;padding:18px;color:var(--ts)">لا توجد إنذارات</td></tr>';
  return list.map(function(s){return'<tr><td><strong>'+s.name+'</strong></td><td>'+s.circle+'</td><td>'+s.stage+'</td><td>'+(s.late.length?'<span class="bp bp-wa">'+s.late.length+'</span>':'—')+'</td><td>'+(s.abs.length?'<span class="bp bp-er">'+s.abs.length+'</span>':'—')+'</td><td>'+(s.ex.length?'<span class="bp bp-in">'+s.ex.length+'</span>':'—')+'</td><td>'+(s.edu.length?'<span class="bp bp-er">'+s.edu.length+' إنذار</span>':'—')+'</td></tr>';}).join('');
}

function applyAllWF(){var c=val('awfC'),st=val('awfS'),q2=val('awfQ');var l=Object.values(D.allWarnMap||{});if(c)l=l.filter(function(s){return s.circle===c;});if(st)l=l.filter(function(s){return s.stage===st;});if(q2)l=l.filter(function(s){return s.name.includes(q2);});var e=document.getElementById('awBody');if(e)e.innerHTML=buildAllWRows(l);}

function pgSettings(){
  var tpls=arr(D.templates),thr=arr(D.thresholds),procs=arr(D.procedures);
  var users=arr(D.setUsers),circles=arr(D.setCircles),states=arr(D.setStates);
  var tplH=tpls.map(function(t){return'<div class="cc mb-3" style="border:1px solid var(--bd)"><div class="chdr" style="padding:10px 15px"><h3 style="font-size:13px">'+q(t['عنوان_القالب']||t['نوع_القالب'])+'</h3><div class="cacts"><button class="ob sm" onclick="editTpl(\''+qj(t)+'\')"><i class="fas fa-pen"></i> تعديل</button></div></div><div style="padding:10px 15px;font-size:12.5px;color:var(--ts);white-space:pre-line;line-height:1.6;background:#f8f6f0">'+q(t['نص_القالب']||'')+'</div></div>';}).join('');
  var thrH=['تأخر','غياب','غياب_بعذر'].map(function(نوع){var l=thr.filter(function(e){return e['نوع_المخالفة']===نوع;});var rows=l.map(function(e){return'<tr><td>'+e['رقم_العتبة']+'</td><td><strong>'+e['عدد_المخالفات_للاستحقاق']+'</strong></td><td>'+(e['الإجراء_الافتراضي']||'—')+'</td><td><button class="ob sm" onclick="editThresh(\''+qj(e)+'\')"><i class="fas fa-pen"></i></button></td></tr>';}).join('');return'<h3 style="font-size:13px;font-weight:700;color:var(--p);margin:14px 0 8px">عتبات '+نوع+'</h3><div style="overflow-x:auto;margin-bottom:10px"><table class="dt"><thead><tr><th>العتبة</th><th>المخالفات</th><th>الإجراء</th><th>تعديل</th></tr></thead><tbody>'+rows+'</tbody></table></div><button class="ob sm" onclick="addThresh(\''+نوع+'\')"><i class="fas fa-plus"></i> إضافة</button>';}).join('<hr style="margin:14px 0;border-color:var(--bd)">');
  var procH=['تعليمي','تأخر','غياب','غياب_بعذر'].map(function(نوع){
    var displayName={'تعليمي':'إجراءات متابعة التعليمي','تأخر':'إجراءات التأخر','غياب':'إجراءات الغياب','غياب_بعذر':'إجراءات الغياب بعذر'}[نوع]||نوع;
    var l=procs.filter(function(e){return e['نوع_الاجراء']===نوع;});var pills=l.map(function(p){return'<span class="bp bp-in" style="padding:5px 12px;font-size:12.5px">'+q(p['اسم_الاجراء'])+'<button onclick="delProc(\''+q(p['اسم_الاجراء'])+'\')" style="background:none;border:none;color:var(--er);cursor:pointer;font-size:10px;margin-right:4px">×</button></span>';}).join('');return'<h3 style="font-size:13px;font-weight:700;color:var(--p);margin:14px 0 8px">'+displayName+'</h3><div style="display:flex;flex-wrap:wrap;gap:7px;margin-bottom:10px">'+pills+'</div><button class="ob sm" onclick="addProc(\''+نوع+'\')"><i class="fas fa-plus"></i> إضافة</button>';}).join('<hr style="margin:14px 0;border-color:var(--bd)">');
  var userRows=users.map(function(u){return'<tr><td><strong>'+q(u['الاسم']||'—')+'</strong></td><td>'+roleLabel(u['الوظيفة'])+'</td><td>'+(u['الحلقة']||'—')+'</td><td>'+(u['رقم_الجوال']||'—')+'</td><td>'+(u['نشط']==='نعم'?'<span class="bp bp-ok">نشط</span>':'<span class="bp bp-gr">معطّل</span>')+'</td><td><button class="ob sm" onclick="editUser(\''+qj(u)+'\')"><i class="fas fa-pen"></i></button> <button class="erb sm" onclick="deactUser(\''+q(u['الاسم'])+'\')"><i class="fas fa-ban"></i></button></td></tr>';}).join('');
  var circleC=circles.map(function(h){return'<div style="background:var(--bg);border:1px solid var(--bd);border-radius:10px;padding:10px 13px;display:flex;align-items:center;gap:8px"><i class="fas fa-mosque" style="color:var(--pl)"></i><span style="font-weight:700">'+q(h['اسم_الحلقة']||'—')+'</span><span style="font-size:11.5px;color:var(--ts)">'+q(h['المعلم']||'')+'</span><button onclick="delCircle(\''+q(h['اسم_الحلقة'])+'\')" style="background:none;border:none;color:var(--er);cursor:pointer"><i class="fas fa-times"></i></button></div>';}).join('');
  var stateC=states.map(function(s){return'<div style="background:var(--bg);border:1px solid var(--bd);border-radius:10px;padding:9px 13px;display:flex;align-items:center;gap:8px"><span style="width:11px;height:11px;border-radius:50%;background:'+(s['اللون']||'#888')+';display:inline-block"></span><span style="font-weight:700">'+q(s['اسم_الحالة'])+'</span><button onclick="delState(\''+q(s['اسم_الحالة'])+'\')" style="background:none;border:none;color:var(--er);cursor:pointer"><i class="fas fa-times"></i></button></div>';}).join('');
  mc('<div class="stitle"><i class="fas fa-gear"></i> الإعدادات</div>'
    +'<div class="cc"><div class="stabs" style="overflow-x:auto;-webkit-overflow-scrolling:touch;scrollbar-width:none">'
    +'<button class="stab active" onclick="swST(this,\'stTpl\')"><i class="fas fa-comment-dots"></i> قوالب الإرسال</button>'
    +'<button class="stab" onclick="swST(this,\'stThr\')"><i class="fas fa-layer-group"></i> العتبات</button>'
    +'<button class="stab" onclick="swST(this,\'stProc\')"><i class="fas fa-list-check"></i> الإجراءات</button>'
    +'<button class="stab" onclick="swST(this,\'stUsers\')"><i class="fas fa-users-gear"></i> المستخدمون</button>'
    +'<button class="stab" onclick="swST(this,\'stCircles\')"><i class="fas fa-mosque"></i> الحلق</button>'
    +'<button class="stab" onclick="swST(this,\'stStates\')"><i class="fas fa-circle-dot"></i> الحالات</button>'
    +'<button class="stab" onclick="swST(this,\'stEduR\')"><i class="fas fa-triangle-exclamation"></i> أسباب الإنذارات التعليمية</button>'
    +'</div>'
    +'<div class="spanel active cbody" id="stTpl"><p style="font-size:12px;color:var(--ts);margin-bottom:14px">المتغيرات: <code>#اسم_الطالب</code> <code>#اسم_ولي_الطالب</code> <code>#السبب</code> <code>#تاريخ</code> <code>#رقم_العتبة</code> <code>#عدد_الغيابات</code></p>'+tplH+'</div>'
    +'<div class="spanel cbody" id="stThr">'+thrH+'</div>'
    +'<div class="spanel cbody" id="stProc">'+procH+'</div>'
    +'<div class="spanel cbody" id="stUsers"><div class="mb-3"><button class="pb sm" onclick="addUser()"><i class="fas fa-user-plus"></i> إضافة مستخدم</button></div><div style="overflow-x:auto"><table class="dt"><thead><tr><th>الاسم</th><th>الوظيفة</th><th>الحلقة</th><th>الجوال</th><th>الحالة</th><th>إجراء</th></tr></thead><tbody>'+userRows+'</tbody></table></div></div>'
    +'<div class="spanel cbody" id="stCircles"><div class="mb-3"><button class="pb sm" onclick="addCircle()"><i class="fas fa-plus"></i> إضافة حلقة</button></div><div style="display:flex;flex-wrap:wrap;gap:10px">'+circleC+'</div></div>'
    +'<div class="spanel cbody" id="stStates"><div class="mb-3"><button class="pb sm" onclick="addState()"><i class="fas fa-plus"></i> إضافة حالة</button></div><div style="display:flex;flex-wrap:wrap;gap:10px">'+stateC+'</div></div>'
    +'<div class="spanel cbody" id="stEduR">'+buildEduReasonsPanel()+'</div>'
    +'</div>');
}

async function reloadSettings(){
  spin(true,'جارٍ التحميل…');
  var rs=await Promise.all([api('جلب_قوالب_الرسائل',{}),api('جلب_عتبات_الانذارات',{}),api('جلب_الاجراءات',{}),api('جلب_العاملين',{}),api('جلب_الحلق',{}),api('جلب_حالات_الطالب',{})]);
  spin(false);
  D.templates=arr(rs[0].قوالب);D.thresholds=arr(rs[1].عتبات);D.procedures=arr(rs[2].إجراءات);
  D.setUsers=arr(rs[3].عاملون);D.setCircles=arr(rs[4].حلق);D.setStates=arr(rs[5].حالات);
  saveCache();pgSettings();
}

async function editTpl(s){var t=JSON.parse(decodeURIComponent(s));var res=await Swal.fire({title:'تعديل: '+q(t['عنوان_القالب']||''),html:'<textarea id="ti" class="swal2-textarea" style="font-family:Tajawal;direction:rtl;height:150px;width:100%">'+q(t['نص_القالب']||'')+'</textarea>',confirmButtonText:'حفظ',cancelButtonText:'إلغاء',showCancelButton:true,confirmButtonColor:'#1a3c5e',customClass:{popup:'swal-rtl'},preConfirm:function(){return document.getElementById('ti').value.trim();}});if(!res.isConfirmed||!res.value)return;spin(true);await api('حفظ_قالب_رسالة',{_صف:t['_صف'],عنوان_القالب:t['عنوان_القالب'],نص_القالب:res.value});spin(false);await reloadSettings();}

async function editThresh(s){var e=JSON.parse(decodeURIComponent(s));var res=await Swal.fire({title:'عتبة '+e['نوع_المخالفة']+' #'+e['رقم_العتبة'],html:'<div style="direction:rtl;display:grid;gap:10px"><div><label style="font-size:12px;font-weight:600">عدد المخالفات</label><input id="tc" type="number" class="swal2-input" value="'+e['عدد_المخالفات_للاستحقاق']+'" style="font-family:Tajawal;width:100%;margin:0"></div><div><label style="font-size:12px;font-weight:600">الإجراء</label><input id="tp" type="text" class="swal2-input" value="'+q(e['الإجراء_الافتراضي']||'')+'" style="font-family:Tajawal;width:100%;margin:0;direction:rtl"></div></div>',confirmButtonText:'حفظ',cancelButtonText:'إلغاء',showCancelButton:true,confirmButtonColor:'#1a3c5e',customClass:{popup:'swal-rtl'},preConfirm:function(){return{count:val('tc'),proc:val('tp')};}}); if(!res.isConfirmed||!res.value)return;spin(true);await api('حفظ_عتبات_الانذارات',{نوع_المخالفة:e['نوع_المخالفة'],عتبات:[{نوع_المخالفة:e['نوع_المخالفة'],رقم_العتبة:e['رقم_العتبة'],عدد_المخالفات_للاستحقاق:res.value.count,الإجراء_الافتراضي:res.value.proc}]});spin(false);await reloadSettings();}

async function addThresh(نوع){var res=await Swal.fire({title:'إضافة عتبة - '+نوع,html:'<div style="direction:rtl;display:grid;gap:10px"><div><label style="font-size:12px;font-weight:600">رقم العتبة</label><input id="tn" type="number" class="swal2-input" min="1" style="font-family:Tajawal;width:100%;margin:0"></div><div><label style="font-size:12px;font-weight:600">عدد المخالفات</label><input id="tc" type="number" class="swal2-input" min="1" style="font-family:Tajawal;width:100%;margin:0"></div><div><label style="font-size:12px;font-weight:600">الإجراء</label><input id="tp" type="text" class="swal2-input" style="font-family:Tajawal;width:100%;margin:0;direction:rtl"></div></div>',confirmButtonText:'إضافة',cancelButtonText:'إلغاء',showCancelButton:true,confirmButtonColor:'#1a3c5e',customClass:{popup:'swal-rtl'},preConfirm:function(){return{رقم_العتبة:val('tn'),عدد_المخالفات_للاستحقاق:val('tc'),الإجراء_الافتراضي:val('tp')};}}); if(!res.isConfirmed||!res.value)return;spin(true);await api('حفظ_عتبات_الانذارات',{نوع_المخالفة:نوع,عتبات:[Object.assign({نوع_المخالفة:نوع},res.value)]});spin(false);await reloadSettings();}

async function addProc(نوع){var res=await Swal.fire({title:'إضافة إجراء - '+نوع,input:'text',inputPlaceholder:'اسم الإجراء',inputAttributes:{style:'font-family:Tajawal;direction:rtl'},confirmButtonText:'إضافة',cancelButtonText:'إلغاء',showCancelButton:true,confirmButtonColor:'#1a3c5e',customClass:{popup:'swal-rtl'},preConfirm:function(v2){if(!v2||!v2.trim())return Swal.showValidationMessage('لا يمكن أن يكون فارغاً');return v2.trim();}}); if(!res.isConfirmed||!res.value)return;spin(true);await api('إضافة_إجراء',{نوع_الاجراء:نوع,اسم_الاجراء:res.value});spin(false);await reloadSettings();}

async function delProc(name){var r=await Swal.fire({title:'حذف الإجراء؟',text:name,showCancelButton:true,confirmButtonColor:'#c0392b',confirmButtonText:'حذف',cancelButtonText:'إلغاء',customClass:{popup:'swal-rtl'}});if(!r.isConfirmed)return;spin(true);await api('حذف_إجراء',{اسم_الاجراء:name});spin(false);await reloadSettings();}

async function addUser(){
  var co=arr(D.setCircles).map(function(h){return'<option>'+q(h['اسم_الحلقة'])+'</option>';}).join('');
  var res=await Swal.fire({title:'إضافة مستخدم',width:'500px',html:'<div style="direction:rtl;display:grid;gap:10px;text-align:right">'+sField('الاسم','nu_n','','text',false)+'<div><label style="font-size:12px;font-weight:600;display:block;margin-bottom:4px">الوظيفة</label><select id="nu_r" class="swal2-select" style="font-family:Tajawal;width:100%;margin:0"><option value="معلم">معلم</option><option value="مشرف_تعليمي">مشرف تعليمي</option><option value="مشرف_اداري">مشرف إداري</option><option value="مدير">مدير</option></select></div><div><label style="font-size:12px;font-weight:600;display:block;margin-bottom:4px">الحلقة</label><select id="nu_c" class="swal2-select" style="font-family:Tajawal;width:100%;margin:0"><option value="">—</option>'+co+'</select></div>'+sField('رمز الدخول','nu_k','','text',false)+sField('رقم الجوال','nu_p','','text',false)+'</div>',confirmButtonText:'إضافة',cancelButtonText:'إلغاء',showCancelButton:true,confirmButtonColor:'#1a3c5e',customClass:{popup:'swal-rtl'},preConfirm:function(){var n=val('nu_n'),k=val('nu_k');if(!n||!k)return Swal.showValidationMessage('الاسم والرمز مطلوبان');return{الاسم:n,الوظيفة:val('nu_r'),الحلقة:val('nu_c'),رمز_الدخول:k,رقم_الجوال:val('nu_p')};}}); if(!res.isConfirmed||!res.value)return;spin(true);await api('إضافة_عامل',res.value);spin(false);await reloadSettings();}

async function editUser(s){var u=JSON.parse(decodeURIComponent(s));var res=await Swal.fire({title:'تعديل: '+q(u['الاسم']),html:'<div style="direction:rtl;display:grid;gap:10px;text-align:right">'+sField('رمز الدخول الجديد','eu_k','','text',false)+sField('رقم الجوال','eu_p',u['رقم_الجوال']||'','text',false)+'</div>',confirmButtonText:'حفظ',cancelButtonText:'إلغاء',showCancelButton:true,confirmButtonColor:'#1a3c5e',customClass:{popup:'swal-rtl'},preConfirm:function(){return{رمز_الدخول:val('eu_k')||undefined,رقم_الجوال:val('eu_p')};}}); if(!res.isConfirmed||!res.value)return;spin(true);await api('تعديل_عامل',Object.assign({الاسم_القديم:u['الاسم']},res.value));spin(false);await reloadSettings();}

async function deactUser(name){var r=await Swal.fire({title:'تعطيل حساب؟',text:name,showCancelButton:true,confirmButtonColor:'#c0392b',confirmButtonText:'تعطيل',cancelButtonText:'إلغاء',customClass:{popup:'swal-rtl'}});if(!r.isConfirmed)return;spin(true);await api('حذف_عامل',{الاسم:name});spin(false);await reloadSettings();}

async function addCircle(){var res=await Swal.fire({title:'إضافة حلقة',html:'<div style="direction:rtl;display:grid;gap:10px;text-align:right">'+sField('اسم الحلقة','nc_n','','text',false)+sField('المعلم','nc_t','','text',false)+'</div>',confirmButtonText:'إضافة',cancelButtonText:'إلغاء',showCancelButton:true,confirmButtonColor:'#1a3c5e',customClass:{popup:'swal-rtl'},preConfirm:function(){var n=val('nc_n');if(!n)return Swal.showValidationMessage('اسم الحلقة مطلوب');return{اسم_الحلقة:n,المعلم:val('nc_t')};}}); if(!res.isConfirmed||!res.value)return;spin(true);await api('إضافة_حلقة',res.value);spin(false);await reloadSettings();}

async function delCircle(name){var r=await Swal.fire({title:'حذف الحلقة؟',text:name,showCancelButton:true,confirmButtonColor:'#c0392b',confirmButtonText:'حذف',cancelButtonText:'إلغاء',customClass:{popup:'swal-rtl'}});if(!r.isConfirmed)return;spin(true);await api('حذف_حلقة',{اسم_الحلقة:name});spin(false);await reloadSettings();}

async function addState(){var res=await Swal.fire({title:'إضافة حالة',html:'<div style="direction:rtl;display:grid;gap:10px;text-align:right">'+sField('اسم الحالة','ss_n','','text',false)+'<div><label style="font-size:12px;font-weight:600;display:block;margin-bottom:4px">اللون</label><input id="ss_c" type="color" value="#1e7e4a" style="width:100%;height:38px;border:1px solid var(--bd);border-radius:8px;cursor:pointer"></div></div>',confirmButtonText:'إضافة',cancelButtonText:'إلغاء',showCancelButton:true,confirmButtonColor:'#1a3c5e',customClass:{popup:'swal-rtl'},preConfirm:function(){var n=val('ss_n');if(!n)return Swal.showValidationMessage('اسم الحالة مطلوب');return{اسم_الحالة:n,اللون:document.getElementById('ss_c').value};}}); if(!res.isConfirmed||!res.value)return;spin(true);await api('إضافة_حالة_طالب',res.value);spin(false);await reloadSettings();}

function buildEduReasonsPanel(){
  var reasons=arr(D.eduReasons);
  var pills=reasons.map(function(r){
    return '<span class="bp bp-er" style="padding:5px 12px;font-size:12.5px">'+q(r)
      +'<button onclick="delEduReason(\''+q(r)+'\')" style="background:none;border:none;color:#fff;cursor:pointer;font-size:10px;margin-right:6px;opacity:.8">×</button></span>';
  }).join('');
  return '<p style="font-size:12.5px;color:var(--ts);margin-bottom:14px">'
    +'هذه الأسباب تظهر في قائمة الإنذارات التعليمية عند إصدار إنذار من صفحة الحلق والطلاب</p>'
    +'<div style="display:flex;flex-wrap:wrap;gap:8px;margin-bottom:14px">'+pills+'</div>'
    +'<button class="pb sm" onclick="addEduReason()"><i class="fas fa-plus"></i> إضافة سبب</button>';
}

async function addEduReason(){
  var res=await Swal.fire({
    title:'إضافة سبب إنذار تعليمي',
    input:'text',inputPlaceholder:'مثال: إخلال بنظام الحلقة',
    inputAttributes:{style:'font-family:Tajawal;direction:rtl'},
    confirmButtonText:'إضافة',cancelButtonText:'إلغاء',showCancelButton:true,
    confirmButtonColor:'#1a3c5e',customClass:{popup:'swal-rtl'},
    preConfirm:function(v2){if(!v2||!v2.trim())return Swal.showValidationMessage('لا يمكن أن يكون فارغاً');return v2.trim();}
  });
  if(!res.isConfirmed||!res.value)return;
  spin(true);
  await api('إضافة_إجراء',{نوع_الاجراء:'سبب_تعليمي',اسم_الاجراء:res.value});
  spin(false);
  D.eduReasons.push(res.value);
  D.procedures.push({نوع_الاجراء:'تعليمي',اسم_الاجراء:res.value,نشط:'نعم'});
  D.eduProcs=D.eduReasons;
  saveCache();
  // تحديث الـ panel مباشرة
  var p=document.getElementById('stEduR');
  if(p)p.innerHTML=buildEduReasonsPanel();
  Swal.fire({icon:'success',title:'تمت الإضافة',timer:1800,timerProgressBar:true,showConfirmButton:false});
}

async function delEduReason(name){
  var r=await Swal.fire({
    title:'حذف السبب؟',text:name,showCancelButton:true,
    confirmButtonColor:'#c0392b',confirmButtonText:'حذف',cancelButtonText:'إلغاء',
    customClass:{popup:'swal-rtl'}
  });
  if(!r.isConfirmed)return;
  spin(true);
  await api('حذف_إجراء',{اسم_الاجراء:name});
  spin(false);
  D.eduReasons=D.eduReasons.filter(function(x){return x!==name;});
  // نحذف فقط من الأسباب، لا من الإجراءات
  D.procedures=D.procedures.filter(function(p){
    return !(p['اسم_الاجراء']===name&&(p['نوع_الاجراء']==='سبب_تعليمي'||p['نوع_الاجراء']==='تعليمي'));
  });
  saveCache();
  var p=document.getElementById('stEduR');
  if(p)p.innerHTML=buildEduReasonsPanel();
  Swal.fire({icon:'success',title:'تم الحذف',timer:1500,timerProgressBar:true,showConfirmButton:false});
}

async function delState(name){var r=await Swal.fire({title:'حذف الحالة؟',text:name,showCancelButton:true,confirmButtonColor:'#c0392b',confirmButtonText:'حذف',cancelButtonText:'إلغاء',customClass:{popup:'swal-rtl'}});if(!r.isConfirmed)return;spin(true);await api('حذف_حالة_طالب',{اسم_الحالة:name});spin(false);await reloadSettings();}
