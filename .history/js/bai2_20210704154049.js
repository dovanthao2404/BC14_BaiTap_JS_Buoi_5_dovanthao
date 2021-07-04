
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

function checkIsNumber(idCheck, idNotification, indexNotification) {
  var number = /^[0-9]+$/;
  var field = getMyEle(idKiemTra).value;
  var thongBao = getMyEle(idThongBao);
  if (field.match(number)) {
    thongBao.innerHTML = ''
    return true;
  } else {
    thongBao.innerHTML = mangThongBao[indexThongBao];
    return false;
  }
}