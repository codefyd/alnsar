# Phase 1 frontend integration for `staff.html`

## 1) حفظ التوكن بعد تسجيل الدخول
داخل `doLogin()` وبعد نجاح `تحقق_رمز_دخول` أضف:

```js
D.user = r.عامل;
D.role = D.user['الوظيفة'] || '';
D.sessionToken = r.token || '';
try { localStorage.setItem('alnsar_staff_token', D.sessionToken); } catch(e) {}
```

## 2) جعل `api()` يرسل التوكن تلقائياً
استبدل دالة `api(action,data)` بـ:

```js
async function api(action, data){
  data = data || {};
  var token = D.sessionToken || (function(){
    try { return localStorage.getItem('alnsar_staff_token') || ''; } catch(e) { return ''; }
  })();
  if (token && !data._token) data._token = token;

  var r = await fetch(API, {
    method: 'POST',
    headers: { 'Content-Type': 'text/plain' },
    body: JSON.stringify({ action: action, data: data })
  });

  var json = await r.json();
  if (json && json.خطأ && String(json.خطأ).includes('الجلسة غير صالحة')) {
    try { localStorage.removeItem('alnsar_staff_token'); } catch(e) {}
    D.sessionToken = '';
  }
  return json;
}
```

## 3) استخدام endpoint التهيئة المجمّعة بدل الطلبات الكثيرة
في `doLogin()` وبعد تحديد المستخدم والدور، بدلاً من `prefetch()` استخدم:

```js
spin(true, 'جارٍ تجهيز البيانات...');
var init = await api('جلب_بيانات_التهيئة', {
  الوظيفة: D.role,
  الحلقة: D.user['الحلقة'] || ''
});
spin(false);

if (!init || !init.نجاح) {
  throw new Error((init && init.خطأ) || 'فشل تحميل التهيئة');
}

if (D.role === 'معلم') {
  D.teacherStudents = init.طلاب || [];
  D.teacherKpi = init.تقارير || {};
}
else if (D.role === 'مشرف_تعليمي') {
  D.eduKpi = init.تقارير || {};
  D.eduWarnings = init.انذارات_تعليمية || [];
  D.eduStudents = init.طلاب || [];
  D.eduStudentMap = {};
  D.eduStudents.forEach(function(s){ D.eduStudentMap[s['اسم_الطالب']] = s; });
  D.circles = init.حلق || [];
  D.eduProcs = init.اجراءات_تعليمية || [];
  D.eduReasons = init.اجراءات_تعليمية || [];
}
else if (D.role === 'مشرف_اداري') {
  D.students = init.طلاب || [];
  D.studentsTotal = init.طلاب_مجموع || 0;
  D.studentsPages = init.طلاب_صفحات || 1;
  D.circles = init.حلق || [];
  D.statuses = init.حالات || [];
  D.reqNew = init.طلبات_جديدة || [];
  D.reqWait = init.طلبات_انتظار || [];
  D.reqEdits = init.طلبات_تعديل || [];
  D.adminEduW = init.انذارات_تعليمية || [];
  D.adminAdmW = init.انذارات_ادارية_ارشيف || [];
  D.templates = init.قوالب || [];
  D.thresholds = init.عتبات || [];
  D.procedures = init.اجراءات || [];
  D.setUsers = init.عاملون || [];
  D.kpi = init.kpi || {};
}
else if (D.role === 'مدير') {
  D.dirData = {
    admin: init.admin_kpi || {},
    edu: init.edu_kpi || {},
    circles: init.حلق || [],
    users: init.عاملون || []
  };
}
```

## 4) تسجيل الخروج
استبدل `doLogout()` بـ:

```js
function doLogout(){
  try { localStorage.removeItem('alnsar_staff_token'); } catch(e) {}
  D.sessionToken = '';
  window.location.href = 'index.html';
}
```

## 5) ملاحظة مهمة
بعد تفعيل هذا التحديث، ستحتاج نشر ملف Apps Script الجديد أولاً، لأن الواجهة ستعتمد على:
- `token`
- `_token`
- `جلب_بيانات_التهيئة`
