// Các hằng số global
const LEVEL_1 = 60e6;
const LEVEL_2 = 120e6;
const LEVEL_3 = 210e6;
const LEVEL_4 = 384e6;
const LEVEL_5 = 624e6;
const LEVEL_6 = 960e6;

const TAX_PERCENTAGE_LEVEL_1 = 0.05;
const TAX_PERCENTAGE_LEVEL_2 = 0.1;
const TAX_PERCENTAGE_LEVEL_3 = 0.15;
const TAX_PERCENTAGE_LEVEL_4 = 0.2;
const TAX_PERCENTAGE_LEVEL_5 = 0.25;
const TAX_PERCENTAGE_LEVEL_6 = 0.3;
const TAX_PERCENTAGE_LEVEL_7 = 0.35;

// Lấy element từ id
function getEle(id) {
  return document.getElementById(id);
}

// Các thông báo lỗi
var notifications = [
  "Vui lòng nhập vào họ và tên!",
  "Vui lòng nhập vào tổng thu nhập trên một năm!",
  "Vui lòng nhập số người phụ thuộc!",
  "Vui lòng nhập vào số!",
  "Tổng thu nhập không phải số âm!",
  "Số người phụ thuộc không phải là số âm!",
  "Vui lòng nhập tên hợp lệ!",
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


// Kiểm tra họ tên,
function checkName(idCheck, idNotification, indexNotification) {
  var validation = /^[a-zA-Z_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ_ ]+$/
    ;

  var contentCheck = getEle(idCheck).value;
  var notification = getEle(idNotification);
  if (contentCheck.match(validation)) {
    notification.innerHTML = ''
    return true;
  } else {
    notification.innerHTML = notifications[indexNotification];
    return false;
  }
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

// Kiểm tra tất cả giá trị có hợp lệ không
function checkValid() {
  var result1 = checkEntry("fullName", "notifiName", 0) &&
    checkName("fullName", "notifiName", 6);

  var result2 = checkEntry("totalIncome", "notifiIncome", 1) &&
    checkIsNumber("totalIncome", "notifiIncome", 3) &&
    checkValueNumber("totalIncome", "notifiIncome", 4);

  var result3 = checkEntry("dependents", "notifiDependent", 2) &&
    checkIsNumber("dependents", "notifiDependent", 3) &&
    checkValueNumber("dependents", "notifiDependent", 5);

  return (result1 && result2 && result3) ? true : false;
}

// Tính tiền phải chịu thuế
function calculateTaxableIncome() {
  const FREE = 4000000;
  const DEPENDENT_MONEY = 1600000;
  var totalIncome = +getEle("totalIncome").value;
  var dependents = +getEle("dependents").value;
  return totalIncome - FREE - dependents * DEPENDENT_MONEY;
}

// tính tiền thuế bậc 1
function calculateTaxLevel1(taxableIncome) {
  return taxableIncome * TAX_PERCENTAGE_LEVEL_1;
}

// tính tiền thuế bậc 2
function calculateTaxLevel2(taxableIncome) {
  var TaxLevel1 = calculateTaxLevel1(LEVEL_1);
  return (taxableIncome - LEVEL_1) * TAX_PERCENTAGE_LEVEL_2 + TaxLevel1;
}

// tính tiền thuế bậc 3
function calculateTaxLevel3(taxableIncome) {
  var TaxLevel2 = calculateTaxLevel2(LEVEL_2);
  return (taxableIncome - LEVEL_2) * TAX_PERCENTAGE_LEVEL_3 + TaxLevel2;
}

// tính tiền thuế bậc 4
function calculateTaxLevel4(taxableIncome) {
  var TaxLevel3 = calculateTaxLevel3(LEVEL_3);
  return (taxableIncome - LEVEL_3) * TAX_PERCENTAGE_LEVEL_4 + TaxLevel3;
}

// tính tiền thuế bậc 5
function calculateTaxLevel5(taxableIncome) {
  var TaxLevel4 = calculateTaxLevel4(LEVEL_4);
  return (taxableIncome - LEVEL_4) * TAX_PERCENTAGE_LEVEL_5 + TaxLevel4;
}

// tính tiền thuế bậc 6
function calculateTaxLevel6(taxableIncome) {
  var TaxLevel5 = calculateTaxLevel5(LEVEL_5);
  return (taxableIncome - LEVEL_5) * TAX_PERCENTAGE_LEVEL_6 + TaxLevel5;
}

// tính tiền thuế bậc 7
function calculateTaxLevel7(taxableIncome) {
  var TaxLevel6 = calculateTaxLevel6(LEVEL_6);
  return (taxableIncome - LEVEL_6) * TAX_PERCENTAGE_LEVEL_7 + TaxLevel6;
}




// Tính tiền thuế phải trả
function calculateTax() {
  var taxableIncome = calculateTaxableIncome();
  if (taxableIncome > LEVEL_6) {
    return calculateTaxLevel7(taxableIncome);
  }
  if (taxableIncome > LEVEL_5) {
    return calculateTaxLevel6(taxableIncome);

  }
  if (taxableIncome > LEVEL_4) {
    return calculateTaxLevel5(taxableIncome);
  }
  if (taxableIncome > LEVEL_3) {
    return calculateTaxLevel4(taxableIncome);

  }
  if (taxableIncome > LEVEL_2) {
    return calculateTaxLevel3(taxableIncome);
  }
  if (taxableIncome > LEVEL_1) {
    return calculateTaxLevel2(taxableIncome);

  }
  if (taxableIncome > 0) {
    return calculateTaxLevel1(taxableIncome);
  }
  return 0;
}

getEle("btnResult").addEventListener("click", function () {
  var check = checkValid();
  getEle("resultContent").innerHTML = "";
  if (check) {
    var taxMoney = calculateTax();
    if (taxMoney > 0) {
      getEle("resultContent").innerHTML = "Tiền thuế phải trả là: " + taxMoney.toFixed(2) + " VND";
    } else {
      getEle("resultContent").innerHTML = "Bạn không phải chịu thuế!";
    }
  }
})
