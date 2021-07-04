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
  "Vui lòng nhập vào số!",
  "Vui lòng nhập vào ký tự!"
]

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

function checkAreaScores(idCheck, idNotification, indexNotification) {
  var contentArea = getEle(idCheck).value;
  var notification = getEle(idNotification);
  if (contentArea.toUpperCase() === 'X' ||
    contentArea.toUpperCase() === 'A' ||
    contentArea.toUpperCase() === 'B' ||
    contentArea.toUpperCase() === 'C') {
    return contentArea;
  } else {
    notification.innerHTML = notifications[indexNotification];
    return false;
  }
}

function isNumber(idCheck, idNotification, indexNotification) {
  var number = +getEle(idCheck).value;
  var notification = getEle(idNotification);
  if (isNaN(number)) {
    notification.innerHTML = notifications[indexNotification];
    return false;
  }
  notification.innerHTML = '';
  return true;
}

function checkValueScores(idCheck, idNotification, indexNotification, max) {
  var number = +getEle(idCheck).value;
  var notification = getEle(idNotification);
  if (number < 0 || number > max) {
    notification.innerHTML = notifications[indexNotification];
    return false;
  }
  notification.innerHTML = '';
  return true;
}

function checkValid() {
  var check1 = checkEntry("scores-1", "notificationScores-1", 0);
  if (check1) {
    check1 = isNumber("scores-1", "notificationScores-1", 8);
    if (check1) {
      check1 = checkValueScores("scores-1", "notificationScores-1", 5, 10);
    }
  }
  var check2 = checkEntry("scores-2", "notificationScores-2", 1);
  if (check2) {
    check2 = isNumber("scores-2", "notificationScores-2", 8);
    if (check2) {
      check2 = checkValueScores("scores-2", "notificationScores-2", 5, 10);
    }
  }
  var check3 = checkEntry("scores-3", "notificationScores-3", 2);
  if (check3) {
    check3 = isNumber("scores-3", "notificationScores-3", 8);
    if (check3) {
      check3 = checkValueScores("scores-3", "notificationScores-3", 5, 10);
    }
  }
  var check4 = checkEntry("areaScores", "notificationArea", 3);
  if (check4) {
    check4 = checkAreaScores("areaScores", "notificationArea", 6);
  }

  var check5 = checkEntry("objectScores", "notificationObject", 4); 5
  if (check5) {
    check5 = checkValueScores("objectScores", "notificationObject", 7, 3)
  }
  if (check1 && check2 && check3 && check4 && check5) {
    return true;
  }
  return false;
}

var getScoresArea = () => (getEle(idCheck).value);
// function getScoresArea() {
//   return contentArea = getEle(idCheck).value;
// }

getEle("btnResult").addEventListener("click", function () {
  var resultCheck = checkValid();
  if (resultCheck) {
    var scores1 = +getEle("scores-1").value;
    var scores2 = +getEle("scores-2").value;
    var scores3 = +getEle("scores-3").value;

  }
})

