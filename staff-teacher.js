// مجمع تحفيظ القرآن الكريم — منظومة الإدارة الرقمية
// يُحمَّل هذا الملف من staff.html

function pgTeacherSt(){
  var list=D.teacherStudents,حلقة=D.user['الحلقة']||'—';
  var rows=list.map(function(ط,i){
    return '<tr data-n="'+q(ط['اسم_الطالب']||'')+'">'
     +'<td>'+(i+1)+'</td><td><strong>'+q(ط['اسم_الطالب']||'—')+'</strong></td>'
     +'<td>'+(ط['المرحلة_الدراسية']||'—')+'</td><td>'+(ط['الصف_الدراسي']||'—')+'</td>'
     +'<td><strong style="color:var(--p)">'+(ط['مجموع_الحفظ']||0)+'</strong> جزء</td>'
     +'<td>'+sBadge(ط['حالة_الطالب'])+'</td>'
     +'<td><button class="ob sm" onclick="openNote(\''+q(ط['رقم_الطالب'])+'\',\''+q(ط['اسم_الطالب'])+'\',\''+q(ط['ملاحظات']||'')+'\')"><i class="fas fa-pen"></i> ملاحظة</button></td>'
     +'</tr>';
  }).join('');
  mc('<div class="stitle"><i class="fas fa-users"></i> طلاب حلقة: '+حلقة+'</div>'
    +'<div class="cc"><div class="chdr"><h3>القائمة ('+list.length+')</h3>'
    +'<div class="cacts"><input class="fi" style="min-width:180px" placeholder="بحث باسم…" oninput="filterTbl(this.value,\'tTbl\',\'n\')"></div></div>'
    +'<div style="overflow-x:auto"><table class="dt" id="tTbl">'
    +'<thead><tr><th>#</th><th>الاسم</th><th>المرحلة</th><th>الصف</th><th>الحفظ</th><th>الحالة</th><th>ملاحظة</th></tr></thead>'
    +'<tbody>'+rows+'</tbody></table></div></div>');
}

function filterTbl(q2,tblId,attr){document.querySelectorAll('#'+tblId+' tbody tr').forEach(function(r){r.style.display=r.dataset[attr].includes(q2)?'':'none';});}

async function openNote(id,name,note){
  var res=await Swal.fire({title:'ملاحظة: '+name,html:'<textarea id="ni" class="swal2-textarea" style="font-family:Tajawal;direction:rtl;height:110px">'+(note||'')+'</textarea>',confirmButtonText:'حفظ',cancelButtonText:'إلغاء',showCancelButton:true,confirmButtonColor:'#1a3c5e',customClass:{popup:'swal-rtl'},preConfirm:function(){return document.getElementById('ni').value.trim();}});
  if(!res.isConfirmed)return;
  spin(true,'جارٍ الحفظ…');
  var r=await api('حفظ_ملاحظة_معلم',{رقم_الطالب:id,ملاحظة:res.value});
  spin(false);
  if(r.نجاح)Swal.fire({icon:'success',title:'تم',timer:1800,timerProgressBar:true,showConfirmButton:false});
}

function pgTeacherKpi(){
  var t=D.teacherKpi;
  mc('<div class="stitle"><i class="fas fa-chart-pie"></i> تقارير حلقتي</div><div class="kpi-grid">'
    +kpiCard('إجمالي الطلاب',t.إجمالي_طلاب_الحلقة||0,'fa-users','')
    +kpiCard('المنتظمون',t.منتظمون||0,'fa-user-check','kpi-ok')
    +kpiCard('مجموع الأجزاء',t.مجموع_حفظ_الحلقة||0,'fa-book-open','kpi-ac')
    +kpiCard('متوسط الحفظ/طالب',t.متوسط_الحفظ||0,'fa-chart-bar','')
    +'</div>');
}
