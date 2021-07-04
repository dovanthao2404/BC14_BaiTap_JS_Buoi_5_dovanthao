const AREA_A = 2;
const AREA_B = 1;
const AREA_C = 0.5;

const OBJECT_1 = 2.5;
const OBJECT_2 = 1.5;
const OBJECT_3 = 1;

function getEle(idEle) {
  return document.getElementById(idEle);
}

var notifications = [
  "Vui lòng nhập điểm thứ nhất!",
  "Vui lòng nhập điểm thứ hai!",
  "Vui lòng nhập điểm thức ba!",
  "Vui lòng nhập khu vực ưu tiên",
  "Vui lòng nhập đối tượng ưu tiên"
]

function checkEntry(idCheck, idNotification, indexNotification, lengthInput) {
  var contentCheck = getEle(idCheck).nodeValue;
  var notification = getEle(idNotification);
  if (contentCheck === '' || contentCheck < lengthInput) {
    notification.innerHTML = notifications[indexNotification];
    return false;
  } else {
    notification.innerHTML = '';
    return false;
  }
}

function checkArea() {
  var contentArea = getEle("areaScores");
  if (contentArea)
}
