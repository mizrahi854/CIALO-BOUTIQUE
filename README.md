# Villa Cialo Boutique — Static Website

אתר סטטי מלא של וילת סיאלו בוטיק. **HTML + CSS + JS בלבד** — בלי React, בלי npm, בלי build.

## מבנה הקבצים

```
cialo-site/
├── index.html          # הדף הראשי
├── admin.html          # פאנל ניהול (סיסמה: cialo2026)
├── css/
│   └── style.css       # עיצוב מלא + אנימציות
├── js/
│   └── app.js          # אנימציות גלילה, גלריה, lightbox, טופס, CMS
├── images/             # 58 תמונות מהאתר המקורי
└── README.md
```

## הפעלה ב-VS Code

1. פתחו את התיקייה ב-VS Code
2. לחצו ימני על `index.html` → **Open with Live Server** (התקינו את התוסף "Live Server" אם אין)
3. או פשוט לחצו דאבל-קליק על `index.html` להרצה ישירה בדפדפן

## העלאה לאינטרנט

העלו את כל התיקייה לכל שירות אחסון סטטי:
- **Netlify** — גררו את התיקייה ל-app.netlify.com/drop
- **Vercel** — `vercel deploy`
- **GitHub Pages** — push ל-repo
- כל שרת אחסון רגיל (cPanel, FTP)

## ניהול תכנים

גשו ל-`/admin.html`, סיסמה: **`cialo2026`**

ניתן לעדכן:
- טלפון, WhatsApp, אימייל
- הודעת WhatsApp ברירת מחדל
- כותרת ראשית (עברית/אנגלית)
- הפעלה/כיבוי של פופ-אפים והתראות

ההגדרות נשמרות ב-localStorage של הדפדפן.

## פיצ'רים

✅ עיצוב Dark + Gold יוקרתי, מעט יותר אוורירי וחם
✅ Hero עם Ken Burns + parallax
✅ אנימציות גלילה (reveal on scroll) בכל הסקשנים
✅ Custom cursor אינטראקטיבי במחשב
✅ גלריה דינמית עם Lightbox + ניווט במקלדת
✅ טופס הזמנה ששולח ישירות ל-WhatsApp
✅ Sticky bottom bar במובייל (חיוג / WhatsApp / הזמנה)
✅ Floating WhatsApp button
✅ Live notifications — חיווי הזמנות אחרונות
✅ תמיכה דו-לשונית עברית/אנגלית (RTL/LTR)
✅ Mobile First — מותאם מושלם לטלפון
✅ SEO + Open Graph + JSON-LD
✅ פאנל ניהול מלא

## עריכת תוכן ידנית

- **טקסטים** — ערכו ישירות ב-`index.html`
- **תמונות גלריה** — מערך `GALLERY` בתחילת `js/app.js`
- **צבעים** — משתני CSS בראש `css/style.css` (`:root`)

נהנים! 🌅
