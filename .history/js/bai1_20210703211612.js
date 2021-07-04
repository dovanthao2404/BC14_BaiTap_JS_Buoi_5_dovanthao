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
  "Vui lòng nhập khu vực ưu tiên!",
  "Vui lòng nhập đối tượng ưu tiên!",
  "Vui lòng nhập giá trị từ 0 - 10!",
  "Chỉ có khu vực A, B hoặc C!",
  "Chỉ có đối tượng 1, 2 hoặc 3!",
]

function checkEntry(idCheck, idNotification, indexNotification) {
  var contentCheck = getEle(idCheck).nodeValue;
  var notification = getEle(idNotification);
  if (contentCheck === '') {
    notification.innerHTML = notifications[indexNotification];
    return false;
  } else {
    notification.innerHTML = '';
    return true;
  }
}

function checkAreaScores() {
  var contentArea = getEle("areaScores").value;
  if (contentArea.toUpercase() === 'X' ||
    contentArea.toUpercase() === 'A' ||
    contentArea.toUpercase() === 'B' ||
    contentArea.toUpercase() === 'C') {
    return contentArea;
  } else {
    return false;
  }
}

function checkObjectScores() {
  var contentBoject = getEle("objectScores").value;
  if (contentBoject === 1 ||
    contentBoject === 2 ||
    contentBoject === 3 ||
    contentBoject === 0) {
    return contentBoject;
  } else {
    return false;
  }
}
function checkValid() {
  var check1 = checkEntry("scores-1", "notificationScores-1", 1);
  var check2 = checkEntry("scores-2", "notificationScores-2", 2);
  var check3 = checkEntry("scores-3", "notificationScores-3", 3);
  var check4 = checkEntry("scores-4", "notificationScores-4", 4);
  var check5 = checkEntry("scores-5", "notificationScores-5", 5);
}

