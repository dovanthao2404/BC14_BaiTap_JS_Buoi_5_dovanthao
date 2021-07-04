const MONEY_LEVEL_1 = 500;
const MONEY_LEVEL_2 = 650;
const MONEY_LEVEL_3 = 850;
const MONEY_LEVEL_4 = 1100;
const MONEY_LEVEL_5 = 1300;



function getEle(idEle) {
  return document.getElementById(idEle);
}

var notifications = [
  "Vui lòng nhập tên người dùng!",
  "Vui lòng nhập số kw sử dụng!",
  "Số kw người dùng phải là số!",
  "Số kw lớn hơn 0",
]

// Kiểm tra người dùng có nhập không
function checkEntry(idCheck, idNotification, indexNotification) {
  var contentCheck = getEle(idCheck).value;
  var notification = getEle(idNotification);
  if (contentCheck === '') {
    notification.innerHTML = notifications[indexNotification];
    return false;
  } else {
    notification.innerHTML = '';
    return true;
  }
}

// Kiểm tra có phải là số không
function checkIsNumber(idCheck, idNotification, indexNotification) {
  var number = +getEle(idCheck).value;
  var notification = getEle(idNotification);
  if (isNaN(number)) {
    notification.innerHTML = notifications[indexNotification];
    return false;
  }
  notification.innerHTML = '';
  return true;
}

// Kiểm tra giá giá trị của điểm
function checkValueKw(idCheck, idNotification, indexNotification) {
  var kw = +getEle(idCheck).value;
  var notification = getEle(idNotification);
  if (kw <= 0) {
    notification.innerHTML = notifications[indexNotification];
    return false;
  }
  notification.innerHTML = '';
  return true;
}


function checkValid() {
  var result = checkEntry("username", "notificationUsername", 0);

  var result1 = checkEntry("kwUse", "notificationKWUse", 1);

  if (result1) {
    result1 = checkIsNumber("kwUse", "notificationKWUse", 2);
    if (result1) {
      result1 = checkValueKw("kwUse", "notificationKWUse", 3)
    }
  }
  if (result && result1) {
    return true;
  }
  return false;
}

function totalLevel1(kw) {
  return kw * MONEY_LEVEL_1;
}

function totalLevel2(kw) {
  var totalLevel1 = totalLevel1(50);
  return (kw - 50 + 1) * MONEY_LEVEL_2 + totalLevel1;
}

function totalLevel3(kw) {
  var totalVevel2 = totalLevel2(50);
  return (kw - 100 + 1) * MONEY_LEVEL_3 + totalVevel2;
}

function totalLevel4(kw) {
  var totalLevel3 = totalLevel3(200);
  return (kw - 200 + 1) * MONEY_LEVEL_4 + totalLevel3;
}

function totalLevel5(kw) {
  var totalLevel3 = totalLevel4(350);
  return (kw - 350 + 1) * MONEY_LEVEL_5 + totalLevel4;

}

// function () {

// }

getEle("btnTotalAmount").addEventListener("click", function () {
  var result = checkValid();
  if (result) {

  }
})