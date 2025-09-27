//copy menu for mobile
function copyMenu() {
  //copy inside .dpt-cat to .departments
  var dptCategory = document.querySelector(".dpt-cat");
  var dptPlace = document.querySelector(".departments");
  dptPlace.innerHTML = dptCategory.innerHTML;
  //copy inside nav to
  var mainnav = document.querySelector(".header-nav nav");
  var navPlace = document.querySelector(".off-canvas nav");
  navPlace.innerHTML = mainnav.innerHTML;
  //copy .header top .wrapper to .thetop nav
  var topNav = document.querySelector(".header-top .wrapper");
  var topPlace = document.querySelector(".off-canvas .thetop-nav");
  topPlace.innerHTML = topNav.innerHTML;
}
copyMenu();

//show mobile menu
const menuButton = document.querySelector(".trigger"),
  closeButton = document.querySelector(".t-close"),
  addclass = document.querySelector(".site");
menuButton.addEventListener("click", function () {
  addclass.classList.toggle("showmenu");
});
closeButton.addEventListener("click", function () {
  addclass.classList.remove("showmenu");
});

//Show Sub menu on mobile
const submenu = document.querySelectorAll(".has-child .icon-small");
submenu.forEach((menu) => menu.addEventListener("click", toggle));
function toggle(e) {
  e.preventDefault();
  submenu.forEach((item) =>
    item != this ? item.closest(".has-child").classList.remove("expand") : null
  );
  if (this.closest(".has-child").classList != "expand")
    this.closest(".has-child").classList.toggle("expand");
}
//slider
const swiper = new Swiper(".swiper", {
  loop: true,

  pagination: {
    el: ".swiper-pagination",
  },
});

// show search
const searchButton = document.querySelector(".t-search"),
  tClose = document.querySelector(".search-close"),
  showClass = document.querySelector(".site");
searchButton.addEventListener("click", function () {
  showClass.classList.toggle("showsearch");
});
tClose.addEventListener("click", function () {
  showClass.classList.remove("showsearch");
});

let countdownTime = localStorage.getItem("countdownEnd");

if (!countdownTime) {
  countdownTime = Date.now() + 2 * 24 * 60 * 60 * 1000;
  localStorage.setItem("countdownEnd", countdownTime);
} else {
  countdownTime = +countdownTime;
}

const dayEl = document.getElementById("day-offer");
const hoursEl = document.getElementById("hours-offer");
const minutesEl = document.getElementById("minutes-offer");
const secondsEl = document.getElementById("seconds-offer");

function updateCountdown() {
  const now = Date.now();
  const distance = countdownTime - now;

  if (distance <= 0) {
    dayEl.textContent = "00";
    hoursEl.textContent = "00";
    minutesEl.textContent = "00";
    secondsEl.textContent = "00";
    clearInterval(timer);
    return;
  }

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((distance / (1000 * 60)) % 60);
  const seconds = Math.floor((distance / 1000) % 60);

  if (dayEl) dayEl.textContent = String(days).padStart(2, "0");
  hoursEl.textContent = String(hours).padStart(2, "0");
  minutesEl.textContent = String(minutes).padStart(2, "0");
  secondsEl.textContent = String(seconds).padStart(2, "0");
}

const timer = setInterval(updateCountdown, 1000);
updateCountdown();

const dptSection = document.querySelector(".header-main");
const dptTrigger = dptSection.querySelector(".dpt-trigger");
const dptMenu = dptSection.querySelector(".dpt-menu");

dptTrigger.addEventListener("click", function (e) {
  e.preventDefault();
  dptMenu.classList.toggle("active");
});

/// لما المستخدم يضغط على أي أيقونة هارت أو شوبينج كارت
//const wishlistButtons = document.querySelectorAll('.hoverable .ri-heart-line');
//const cartButtons = document.querySelectorAll('.hoverable .ri-shopping-cart-line');
//
/// دالة لعرض رسالة بسيطة
//function showToast(message) {
// let toast = document.createElement('div');
// toast.textContent = message;
// toast.style.position = 'fixed';
// toast.style.bottom = '20px';
// toast.style.right = '20px';
// toast.style.background = '#333';
// toast.style.color = '#fff';
// toast.style.padding = '10px 15px';
// toast.style.borderRadius = '8px';
// toast.style.zIndex = '9999';
// document.body.appendChild(toast);
// setTimeout(() => toast.remove(), 2000); // تختفي بعد ثانيتين
//
//
//wishlistButtons.forEach(btn => {
// btn.addEventListener('click', e => {
//   e.preventDefault();
//   showToast('تمت الإضافة إلى المفضلة ❤️');
// });
//);
//
//cartButtons.forEach(btn => {
// btn.addEventListener('click', e => {
//   e.preventDefault();
//   showToast('تمت الإضافة إلى السلة 🛒');
// });
//);

//if (distance <= 0) {
//  // احسب وقت جديد بعد 24 ساعة (أو أي مدة انت عايزها)
//  countdownTime = Date.now() + 24 * 60 * 60 * 1000; // 👈 مدة جديدة
//  localStorage.setItem('countdownEnd', countdownTime); // خزنه عشان يبقى ثابت بعد الـRefresh
//  return; // العداد هيكمل تلقائي بالتوقيت الجديد في التحديث الجاي
//}
