const LEVEL_1 = 50;
const LEVEL_2 = 100;
const LEVEL_3 = 200;
const LEVEL_4 = 350;

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
  "Số kw không âm!",
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
  if (kw < 0) {
    notification.innerHTML = notifications[indexNotification];
    return false;
  }
  notification.innerHTML = '';
  return true;
}


function checkValid() {
  var result = checkEntry("username", "notificationUsername", 0);

  var result1 = checkEntry("kwUse", "notificationKWUse", 1) &&
    checkIsNumber("kwUse", "notificationKWUse", 2) &&
    checkValueKw("kwUse", "notificationKWUse", 3);

  return (result && result1) ? true : false;
}

function getTotalLevel1(kw) {
  return kw * MONEY_LEVEL_1;
}

function getTotalLevel2(kw) {
  var totalLevel1 = getTotalLevel1(LEVEL_1);
  return (kw - LEVEL_1) * MONEY_LEVEL_2 + totalLevel1;
}

function getTotalLevel3(kw) {
  var totalVevel2 = getTotalLevel2(LEVEL_2);
  return (kw - LEVEL_2) * MONEY_LEVEL_3 + totalVevel2;
}

function getTotalLevel4(kw) {
  var totalLevel3 = getTotalLevel3(LEVEL_3);
  return (kw - LEVEL_3) * MONEY_LEVEL_4 + totalLevel3;
}

function getTotalLevel5(kw) {
  var totalLevel4 = getTotalLevel4(350);
  return (kw - 350) * MONEY_LEVEL_5 + totalLevel4;

}

function getTotalMoney(kw) {
  if (kw <= 50) {
    return getTotalLevel1(kw);
  }
  if (kw <= 100) {
    return getTotalLevel2(kw);
  }
  if (kw <= 200) {
    return getTotalLevel3(kw);
  }
  if (kw <= 350) {
    return getTotalLevel4(kw);
  }
  return getTotalLevel5(kw);
}

getEle("btnTotalAmount").addEventListener("click", function () {
  var result = checkValid();
  getEle('resultAmount').innerHTML = '';
  if (result) {
    var kw = +getEle("kwUse").value;
    var totalMoney = getTotalMoney(kw);
    getEle('resultAmount').innerHTML = "Tổng tiền là: " + totalMoney.toFixed(2) + " VND";
  }
})