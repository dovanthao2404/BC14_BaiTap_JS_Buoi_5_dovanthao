const INVOICE_HANDLING_FEE_PERSONAL = 4.5;
const BASIC_SERVICE_FEE_PERSONAL = 20.5;
const PREMIUM_SERVICE_FEE_PERSONAL = 7.5;


const INVOICE_HANDLING_FEE_ENTERPRISE = 15;
const BASIC_SERVICE_FEE_ENTERPRISE_FIRST = 7.5;
const BASIC_SERVICE_FEE_ENTERPRISE_SECOND = 5;
const PREMIUM_SERVICE_FEE_ENTERPRISE = 50;



// Kiểm tra có phải là số nguyên không
function checkInteger(idCheck, idNotification, indexNotifiParent, indexNotification) {
  var number = +getEle(idCheck).value;
  var notification = getEle(idNotification);
  if (number % 1 === 0) {
    notification.innerHTML = '';
    return true;
  }
  notification.innerHTML = notifications[indexNotifiParent][indexNotification];
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

  var customerType = document.querySelectorAll("input[name=typeServices]");
  for (var i = 0; i < customerType.length; i++) {
    if (customerType[i].checked) {
      getEle("notificationType").innerHTML = '';
      return true;
    }
  }
  getEle("notificationType").innerHTML = notifications[indexNotifiParent][indexNotification];
  return false;
}

// Lấy loại khách hàng
function getCustomerType() {
  var personal = getEle("personal").checked;
  return (personal) ? 0 : 1;
}

// Kiểm tra mã khách hàng
function checkCustomerCode(idCheck, idNotification, indexNotifiParent, indexNotification) {
  var codes = /^([\w])+$/;
  var code = getEle(idCheck).value;
  var notification = getEle(idNotification);
  if (!(code.match(codes))) {
    notification.innerHTML = notifications[indexNotifiParent][indexNotification];
    return false;
  }
  notification.innerHTML = '';
  return true;
}

// Kiểm tra tất cả giá trị có hợp lệ không
function checkValid() {
  var result1 = checkEntry("customerCode", "notificationCode", 3, 0) &&
    checkCustomerCode("customerCode", "notificationCode", 3, 10);
  var result2 = checkCustomerType('notificationType', 3, 1);

  var result4 = checkEntry("premiumChannel", "notificationPremium", 3, 3) &&
    checkIsNumber("premiumChannel", "notificationPremium", 3, 5) &&
    checkValueNumber("premiumChannel", "notificationPremium", 3, 7) &&
    checkInteger("premiumChannel", "notificationPremium", 3, 9);

  var customerType = getCustomerType();

  if (customerType === 0) {
  } else {

    var result3 = checkEntry("connectionNumber", "notificationConnection", 3, 2) &&
      checkIsNumber("connectionNumber", "notificationConnection", 3, 4) &&
      checkValueNumber("connectionNumber", "notificationConnection", 3, 6) &&
      checkInteger("connectionNumber", "notificationConnection", 3, 8);

    return (result1 && result2 && result3 && result4) ? true : false;

  }

  return (result1 && result2 && result4) ? true : false;
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
  var firstConnections = 10;

  if (connectionNumber <= firstConnections) {
    total = INVOICE_HANDLING_FEE_ENTERPRISE + BASIC_SERVICE_FEE_ENTERPRISE_FIRST * connectionNumber +
      premiumChannel * PREMIUM_SERVICE_FEE_ENTERPRISE;
    return total;
  }

  total = INVOICE_HANDLING_FEE_ENTERPRISE + BASIC_SERVICE_FEE_ENTERPRISE_FIRST * firstConnections +
    (BASIC_SERVICE_FEE_ENTERPRISE_SECOND * (connectionNumber - firstConnections)) +
    premiumChannel * PREMIUM_SERVICE_FEE_ENTERPRISE;
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
      resultContent.innerHTML = "Tổng số tiền cáp phải trả là: " + total + "$";
    } else {
      total = calculateCableFeeEnterprise();
      resultContent.innerHTML = "Tổng số tiền cáp phải trả là: " + total + "$";
    }
  }
})