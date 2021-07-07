
const INVOICE_HANDLING_FEE_PERSONAL = 4.5;
const BASIC_SERVICE_FEE_PERSONAL = 20.5;
const PREMIUM_SERVICE_FEE_PERSONAL = 7.5;


const INVOICE_HANDLING_FEE_ENTERPRISE = 15;
const BASIC_SERVICE_FEE_ENTERPRISE_FIRST = 7.5;
const BASIC_SERVICE_FEE_ENTERPRISE_SECOND = 5;
const PREMIUM_SERVICE_FEE_ENTERPRISE = 50;


// Lấy element từ id
function getEle(id) {
  return document.getElementById(id);
}

// Các thông báo lỗi
var notifications = [
  "Vui lòng nhập vào mã khách hàng!",
  "Vui lòng chọn loại khách hàng!",
  "Vui lòng nhập số kết nối!",
  "Vui lòng nhập số kênh cao cấp!",
  "Số kết nối phải là số và phải là số nguyên!",
  "Số kênh cao cấp phải là số và phải là số nguyên!",
  "Số kết nối không phải là số âm",
  "Số kênh cao cấp không phải là số âm!",
  "Số kết nối là số nguyên!",
  "Số kênh cao cấp là số nguyên!"
]

// Kiểm tra người dùng có nhập không
function checkEntry(idCheck, idNotification, indexNotification) {
  var contentCheck = getEle(idCheck).value;
  var notification = getEle(idNotification);
  if (contentCheck === '') {
    notification.innerHTML = notifications[indexNotification];
    return false;
  }
  notification.innerHTML = "";
  return true;
}


// Kiểm tra người dùng nhập vào có phải là số không
function checkIsNumber(idCheck, idNotification, indexNotification) {
  var number = +getEle(idCheck).value;
  var notification = getEle(idNotification);
  if (isNaN(number)) {
    notification.innerHTML = notifications[indexNotification];
    return false;
  }
  notification.innerHTML = notifications[indexNotification];
  return true;
}

// kiểm tra người dùng nhập vào số có đúng điều kiện không.
function checkValueNumber(idCheck, idNotification, indexNotification) {
  var number = +getEle(idCheck).value;
  var notification = getEle(idNotification);
  if (number < 0) {
    notification.innerHTML = notifications[indexNotification];
    return false;
  }
  notification.innerHTML = '';
  return true;
}

// Kiểm tra có phải là số nguyên không
function checkInteger(idCheck, idNotification, indexNotification) {
  var number = +getEle(idCheck).value;
  var notification = getEle(idNotification);
  if (number % 1 === 0) {
    notification.innerHTML = '';
    return true;
  }
  notification.innerHTML = notifications[indexNotification];
  return false;
}


// Xử lý disabled số kết nối
getEle("personal").addEventListener("click", function () {
  var personal = getEle("personal");
  connectionNumber.setAttribute("disabled", '');
  getEle("connectionNumber").value = "";
  getEle("notificationConnection").style.display = "none";
})

// enabled số kết nối
getEle("enterprise").addEventListener("click", function () {
  var enterprise = getEle("enterprise");
  connectionNumber.removeAttribute("disabled");
  getEle("notificationConnection").style.display = "block";
  getEle("notificationConnection").innerHTML = "";
})

// check select loại khách hàng
function checkCustomerType(idNotification, indexNotification) {

  var customerType = getCustomerType();
  var notification = getEle(idNotification);
  if (customerType === 0 || customerType === 1) {
    notification.innerHTML = '';
    return customerType;
  }
  getEle("notificationType").innerHTML = notifications[indexNotification];
  return false;
}

// Lấy loại khách hàng
function getCustomerType() {
  var personal = getEle("personal").checked;
  return (personal) ? 0 : 1;
}


// Kiểm tra tất cả giá trị có hợp lệ không
function checkValid() {
  var result1 = checkEntry("customerCode", "notificationCode", 0);

  var result2 = checkCustomerType('notificationType', 1);

  var result4 = checkEntry("premiumChannel", "notificationPremium", 3) &&
    checkIsNumber("premiumChannel", "notificationPremium", 5) &&
    checkValueNumber("premiumChannel", "notificationPremium", 7) &&
    checkInteger("premiumChannel", "notificationPremium", 9);

  if (result2) {

    var result3 = checkEntry("connectionNumber", "notificationConnection", 2) &&
      checkIsNumber("connectionNumber", "notificationConnection", 4) &&
      checkValueNumber("connectionNumber", "notificationConnection", 6) &&
      checkInteger("connectionNumber", "notificationConnection", 8);

    return (result1 && result2 && result3 && result4) ? true : false;
  }

  return (result1 && !result2 && result4) ? true : false;
}

function getNumberChannelPremium() {
  return +getEle("premiumChannel").value;
}

// tính tiền cáp cá nhân
function calculateCableFeePersonal() {
  var premiumChannel = getNumberChannelPremium();
  var total = INVOICE_HANDLING_FEE_PERSONAL + BASIC_SERVICE_FEE_PERSONAL + (PREMIUM_SERVICE_FEE_PERSONAL * premiumChannel);
  return total;
}

// Tính tiền doanh nghiệp
function calculateCableFeeEnterprise() {
  var premiumChannel = getNumberChannelPremium();
  var connectionNumber = +getEle("connectionNumber").value;
  var total;

  if (connectionNumber <= 10) {
    total = 15 + 7.5 * connectionNumber + premiumChannel * 50;
    return total;
  }

  total = 15 + 75 + (5 * (connectionNumber - 10)) + premiumChannel * 50;
  return total;
}

// Xử lý xuất kết quả
getEle("btnTotalMoney").addEventListener("click", function () {
  var check = checkValid();
  var resultContent = getEle("resultContent");
  resultContent.innerHTML = '';
  if (check) {
    var total;
    var customerType = getCustomerType();

    if (customerType === 0) {
      total = calculateCableFeePersonal();
      resultContent.innerHTML = "Tổng số tiền phải trả là: " + total + "$";
    } else {
      total = calculateCableFeeEnterprise();
      resultContent.innerHTML = "Tổng số tiền phải trả là: " + total + "$";
    }
  }
})



