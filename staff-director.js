// مجمع تحفيظ القرآن الكريم — منظومة الإدارة الرقمية
// يُحمَّل هذا الملف من staff.html

function pgDirectorKpi(){
  var d=D.dirData||{admin:{},edu:{},circles:[],users:[]};
  var a=d.admin||{},e=d.edu||{};
  var معلمون=arr(d.users).filter(function(u){return u['الوظيفة']==='معلم';}).length;
  var مشرفت=arr(d.users).filter(function(u){return u['الوظيفة']==='مشرف_تعليمي';}).length;
  var مشرفإ=arr(d.users).filter(function(u){return u['الوظيفة']==='مشرف_اداري';}).length;
  mc('<div class="stitle"><i class="fas fa-chart-pie"></i> لوحة إحصاءات المدير الشاملة</div>'
    +'<div class="kpi-grid">'
    +kpiCard('إجمالي الطلاب',a.إجمالي_الطلاب||0,'fa-users','')
    +kpiCard('المنتظمون',a.طلاب_منتظمون||0,'fa-user-check','kpi-ok')
    +kpiCard('الموقوفون',a.طلاب_موقوفون||0,'fa-user-slash','kpi-er')
    +kpiCard('عدد الحلق',arr(d.circles).length,'fa-mosque','')
    +kpiCard('المعلمون',معلمون,'fa-chalkboard-user','kpi-ac')
    +kpiCard('مشرفون تعليميون',مشرفت,'fa-user-tie','')
    +kpiCard('مشرفون إداريون',مشرفإ,'fa-user-shield','')
    +kpiCard('مجموع الأجزاء',e.مجموع_الحفظ||0,'fa-book-open','kpi-ac')
    +'</div><div class="stitle mt-2"><i class="fas fa-inbox"></i> الطلبات</div><div class="kpi-grid">'
    +kpiCard('طلبات جديدة',a.طلبات_جديدة||0,'fa-inbox','kpi-wa')
    +kpiCard('قائمة الانتظار',a.طلبات_انتظار||0,'fa-hourglass-half','')
    +'</div><div class="stitle mt-2"><i class="fas fa-triangle-exclamation"></i> الإنذارات الإدارية</div><div class="kpi-grid">'
    +kpiCard('تأخر مستحق',a.إنذارات_اداري_تأخر_مستحقة||0,'fa-clock','kpi-er')
    +kpiCard('تأخر مكتمل',a.ارشيف_تأخر||0,'fa-check','kpi-ok')
    +kpiCard('غياب مستحق',a.إنذارات_اداري_غياب_مستحقة||0,'fa-calendar-xmark','kpi-er')
    +kpiCard('غياب مكتمل',a.ارشيف_غياب||0,'fa-check','kpi-ok')
    +kpiCard('غياب بعذر مستحق',a.إنذارات_اداري_عذر_مستحقة||0,'fa-calendar-minus','kpi-wa')
    +kpiCard('غياب بعذر مكتمل',a.ارشيف_عذر||0,'fa-check','kpi-ok')
    +'</div><div class="stitle mt-2"><i class="fas fa-book-open"></i> الإنذارات التعليمية</div><div class="kpi-grid">'
    +kpiCard('مفتوحة',e.انذارات_تعليمية_مفتوحة||0,'fa-triangle-exclamation','kpi-er')
    +kpiCard('مكتملة',e.انذارات_تعليمية_مكتملة||0,'fa-check-circle','kpi-ok')
    +'</div><div class="stitle mt-2"><i class="fas fa-mosque"></i> الحلق</div><div class="kpi-grid">'
    +arr(d.circles).map(function(h){return kpiCard(h['اسم_الحلقة']||'—',h['عدد_الطلاب']||0,'fa-users','');}).join('')
    +'</div>');
}
