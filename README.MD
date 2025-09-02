# OPE Multi-Step Registration Form

A modern, responsive registration form for Oshakati Premier Electric (OPE) featuring multi-step navigation, real-time validation, and enhanced user experience.

 
## 🌐 Live Link
[https://roushan-sheik.github.io/armin-wieland/](https://roushan-sheik.github.io/armin-wieland/)


## 📁 File Structure
```
└─ .
   ├─ assets
   │  ├─ favicon.ico
   │  ├─ favicon.png
   │  └─ logo.png
   ├─ index.html
   ├─ pages
   │  ├─ forgotPassword.html
   │  ├─ login.html
   │  ├─ setPasswordPage.html
   │  └─ verifyOTP.html
   ├─ README.MD
   ├─ scripts
   │  ├─ forgotPassword.js
   │  ├─ login.js
   │  ├─ scripts.js
   │  ├─ setPasswordPage.js
   │  └─ verifyOTP.js
   ├─ styles
   │  └─ styles.css
   └─ tailwind.config.js

```
## 🚀 Features
### Multi-Step Process


## 📋 Files to Include

### HTML Files (Include in this order):
1. `index.html` - Main registration page
2. `pages/login.html` - Login page
3. `pages/forgotPassword.html` - Forgot password request page
4. `pages/verifyOTP.html` - OTP verification page
5. `pages/setPasswordPage.html` - Password reset page

### CSS Files:
1. `styles/styles.css` - Global OPE styles (must be included in all HTML files)

### JavaScript Files (Include respective file with each HTML page):
1. `scripts/scripts.js` - For index.html
2. `scripts/login.js` - For pages/login.html
3. `scripts/forgotPassword.js` - For pages/forgotPassword.html
4. `scripts/verifyOTP.js` - For pages/verifyOTP.html
5. `scripts/setPasswordPage.js` - For pages/setPasswordPage.html

### 🔄 Form Flow
The authentication system follows this flow:

1. Registration (index.html) → Creates new account
2. Login (pages/login.html) → Access existing account
3. Forgot Password (pages/forgotPassword.html) → Request reset link
4. OTP Verification (pages/verifyOTP.html) → Verify identity
5. Set Password (pages/setPasswordPage.html) → Create new password

## 🔧 Dependencies

1. **Tailwind CSS** - Utility-first CSS framework
   - Include via CDN in HTML head:
   ```html
   <script src="https://cdn.tailwindcss.com"></script>