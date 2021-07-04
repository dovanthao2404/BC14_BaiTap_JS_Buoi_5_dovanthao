
function getEle(idEle) {
  return document.getElementById(idEle);
}

var notifications = [
  "Vui lòng nhập tên người dùng!",
  "Vui lòng nhập số kw sử dụng!",
  "Số kw người dùng phải là số!"
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

// Kiểm tra người dùng có nhập vào số không.
function checkIsNumber(idCheck, idNotification, indexNotification) {
  var number = /^[0-9]+$/;
  var contentCheck = getEle(idCheck).value;
  var notification = getEle(idNotification);
  if (contentCheck.match(number)) {
    notification.innerHTML = ''
    return true;
  } else {
    notification.innerHTML = notifications[indexNotification];
    return false;
  }
}

function checkValid() {
  var result = checkEntry("username", "notificationUsername", 0);

  var result1 = checkEntry("kwUse", "notificationKWUse", 1);

  if (result1) {
    checkIsNumber("kwUse", "notificationKWUse", 2);
  }
  if (result && result1) {
    return true;
  }
  return false;
}


function tinhTienDien() {

}

getEle("btnTotalAmount").addEventListener("click", function () {
  var result = checkValid();
  if (result) {

  }
})