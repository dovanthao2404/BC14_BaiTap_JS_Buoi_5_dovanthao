const BENCHMARK = 24;

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
  "Vui lòng nhập vào ký tự!",
  "Bạn đã rớt",
  "Bạn trúng tuyển",
  "Vui lòng nhập điểm chuẩn",
  "Điểm chuẩn lớn hơn 0"
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

// Kiểm tra có nhập đúng khu vực ưu tiên không
function checkAreaScores(idCheck, idNotification, indexNotification) {
  var contentArea = getEle(idCheck).value;
  var notification = getEle(idNotification);
  if (contentArea.toUpperCase() === 'X' ||
    contentArea.toUpperCase() === 'A' ||
    contentArea.toUpperCase() === 'B' ||
    contentArea.toUpperCase() === 'C') {
    return true;
  } else {
    notification.innerHTML = notifications[indexNotification];
    return false;
  }
}

// Kiểm tra có phải là số không
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

// Kiểm tra giá giá trị của điểm
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

// Kiểm tra hợp lệ
function checkValid() {
  var check = checkEntry("benchmark", "notificationBenchmark", 12);
  if (check) {
    check = isNumber("sbenchmark", "notificationBenchmark", 8);
    if (check) {
      check = checkValueScores("benchmark", "notificationBenchmark", 5, 10);
    }
  }
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
  if (check && check1 && check2 && check3 && check4 && check5) {
    return true;
  }
  return false;
}

// Get điểm khu vực
function getScoresArea() {
  var contentArea = getEle("areaScores").value;
  if (contentArea.toUpperCase() === "X") {
    return 0;
  }
  if (contentArea.toUpperCase() === "A") {
    return AREA_A;
  }
  if (contentArea.toUpperCase() === "B") {
    return AREA_B;
  }
  if (contentArea.toUpperCase() === "C") {
    return AREA_C;
  }
}

// Get điểm của đối tượng
function getScoresObject() {
  var contentArea = +getEle("objectScores").value;
  if (contentArea === 0) {
    return 0;
  }
  if (contentArea === 1) {
    return OBJECT_1;
  }
  if (contentArea === 2) {
    return OBJECT_2;
  }
  if (contentArea === 2) {
    return OBJECT_3;
  }
}

function score(scores1, scores2, scores3, scoresArea, scoresObject) {
  return (scores1 + scores2 + scores3 + scoresArea + scoresObject);
}

getEle("btnResult").addEventListener("click", function () {
  var resultCheck = checkValid();
  if (resultCheck) {

    var scores1 = +getEle("scores-1").value;
    var scores2 = +getEle("scores-2").value;
    var scores3 = +getEle("scores-3").value;
    var scoresArea = getScoresArea();
    var scoresObject = getScoresObject();
    console.log(scoresObject);

    var sumScores = score(scores1, scores2, scores3, scoresArea, scoresObject);

    if (scores1 === 0 ||
      scores2 === 0 ||
      scores3 === 0) {
      getEle('showResult').innerHTML = notifications[10];
      getEle('showResult').innerHTML += " vì có một môn có số điểm bằng 0";
    } else {
      if (sumScores >= BENCHMARK) {
        getEle('showResult').innerHTML = notifications[11];
        getEle('showResult').innerHTML += " với số điểm " + sumScores;
      } else {
        getEle('showResult').innerHTML = notifications[10];
        getEle('showResult').innerHTML += " với số điểm " + sumScores;
      }

    }
  }
})

