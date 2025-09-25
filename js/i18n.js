// Simple i18n helper for EN/AR with localStorage persistence
(() => {
  const defaultLang = localStorage.getItem("lang") || (navigator.language?.startsWith("ar") ? "ar" : "en");

  const translations = {
    en: {
      // common
      login: "LogIn",
      logout: "Logn Out",
      addNewToDo: "Add New To Do",
      address: "Address",
      description: "Description",
      delete: "Delete",
      add: "Add",
      edit: "Edit",
      editTitle: "Edit To Do",
      delete: "Delete",
      emptyToDo: "Empty To Do",
      search: "search",
      all: "All",
      completed: "Completed",
      active: "No Complete",
      welcomeName: "Welcome {name}",
      areYouSure: "Are you sure?",
      yesLogout: "Yes, Logn Out",
      cancelLogout:" Cancel",
      youMustLogin: "You must log in first",
      signIn: "logIn",
      pleaseFillToDo: "Please Fill To Do",
      deleted: "Deleted!",
      deletedText: "Your file has been deleted.",
      deleteConfirm: "Yes, delete it!",
      register: "Register",
      name: "Name",
      email: "Email",
      password: "Password",
      forgotPassword: "Forgot your password?",
      or: "Or",
      success: "success",
      pleaseEnterName: "Please Enter Your Name",
      pleaseEnterEmail: "Please Enter Your email",
      pleaseEnterPassword: "Please Enter Your password",
      userExists: "User already exists",
      emailInvalid: "Please enter a valid email address",
      fillAllInputs: "Please Fill All Inputs",
      registerFirst: "Please Register First",
      emailOrPasswordWrong: "Email or password is wrong",
    },
    ar: {
      // common
      login: "تسجيل الدخول",
      logout: "تسجيل الخروج",
      addNewToDo: "إضافة مهمة جديدة",
      address: "العنوان",
      description: "الوصف",
      add: "إضافة",
      edit: "تعديل",
      delete: "حذف",
      editTitle: "تعديل المهمة",
      delete: "حذف",
      emptyToDo: "لا توجد مهام",
      search: "بحث",
      all: "الكل",
      completed: "منتهية",
      active: "غير منتهية",
      welcomeName: "مرحباً {name}",
      areYouSure: "هل أنت متأكد؟",
      yesLogout: "نعم، تسجيل الخروج",
      cancelLogout:" الغاء",
      youMustLogin: "يجب تسجيل الدخول أولاً",
      signIn: "تسجيل الدخول",
      pleaseFillToDo: "يرجى ملء بيانات المهمة",
      deleted: "تم الحذف!",
      deletedText: "تم حذف المهمة بنجاح",
      deleteConfirm: "نعم، احذف",
      register: "إنشاء حساب",
      name: "الاسم",
      email: "البريد الإلكتروني",
      password: "كلمة المرور",
      forgotPassword: "نسيت كلمة المرور؟",
      or: "أو",
      success: "تم بنجاح",
      pleaseEnterName: "يرجى إدخال الاسم",
      pleaseEnterEmail: "يرجى إدخال البريد الإلكتروني",
      pleaseEnterPassword: "يرجى إدخال كلمة المرور",
      userExists: "المستخدم موجود بالفعل",
      emailInvalid: "يرجى إدخال بريد إلكتروني صحيح",
      fillAllInputs: "يرجى ملء جميع الحقول",
      registerFirst: "يرجى إنشاء حساب أولاً",
      emailOrPasswordWrong: "البريد الإلكتروني أو كلمة المرور غير صحيحة",
    },
  };

  function applyDirection(lang) {
    const isAr = lang === "ar";
    document.documentElement.setAttribute("lang", lang);
    document.documentElement.setAttribute("dir", isAr ? "rtl" : "ltr");
  }

  function t(key, vars = {}) {
    const lang = window.currentLang || defaultLang;
    let str = translations[lang]?.[key] ?? translations.en[key] ?? key;
    Object.keys(vars).forEach((k) => {
      str = str.replace(new RegExp(`\\{${k}\\}`, "g"), vars[k]);
    });
    return str;
  }

  function i18nApply(root = document) {
    root.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n");
      const name = el.getAttribute("data-i18n-name") || "";
      const value = t(key, { name });
      if (el.placeholder !== undefined && el.tagName === "INPUT") {
        el.placeholder = value;
      } else {
        el.textContent = value;
      }
    });
  }

  function setLang(lang) {
    window.currentLang = lang;
    localStorage.setItem("lang", lang);
    applyDirection(lang);
    i18nApply();
  }

  // Expose
  window.i18n = { t, setLang, i18nApply, translations };

  // init
  window.currentLang = localStorage.getItem("lang") || defaultLang;
  applyDirection(window.currentLang);
  window.addEventListener("DOMContentLoaded", () => i18nApply());
})();


