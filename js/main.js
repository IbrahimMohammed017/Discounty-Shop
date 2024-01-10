/* Copy Prevention */
// document.oncontextmenu = function () {
//   return false;
// };
// document.onkeydown = function (e) {
//   if (e.keyCode == 123) {
//     return false;
//   }
//   if (e.ctrlKey && e.shiftKey && e.keyCode == "I".charCodeAt(0)) {
//     return false;
//   }
//   if (e.ctrlKey && e.shiftKey && e.keyCode == "J".charCodeAt(0)) {
//     return false;
//   }
//   if (e.ctrlKey && e.keyCode == "U".charCodeAt(0)) {
//     return false;
//   }
//   if (e.ctrlKey && e.shiftKey && e.keyCode == "C".charCodeAt(0)) {
//     return false;
//   }
// };

/****************************************/

/* Form Settings */

// 1- Show And Hide Form:
document.addEventListener("DOMContentLoaded", function () {
  // Get all buttons with data-showform attribute
  var buttons = document.querySelectorAll("[data-showform]");

  // Add click event listener to each button
  buttons.forEach(function (button) {
    button.addEventListener("click", function () {
      // Get the form id from data-showform attribute
      var formId = button.getAttribute("data-showform");

      // Get the form element with the specified id
      var form = document.getElementById(formId);

      // Toggle the visibility of the form
      if (form) {
        form.classList.toggle("form");
        form.classList.toggle("flex-display");
      }
    });
  });
});

// 2- Determine The Product Price Value:
let arabicNums = ["٠", "١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩"];
let englishNums = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

function switchNum(num) {
  return num
    .split("")
    .map((num) => {
      if (arabicNums.includes(num)) {
        return englishNums[arabicNums.indexOf(num)];
      } else {
        return arabicNums[englishNums.indexOf(num)];
      }
    })
    .join("");
}

document.addEventListener("DOMContentLoaded", function () {
  // Get all elements with class 'pro-price'
  var proPriceElements = document.querySelectorAll(".pro-price");

  // Loop through each element
  proPriceElements.forEach(function (proPriceElement) {
    // Get the corresponding current_price value
    var currentPriceElement = proPriceElement
      .closest(".popups")
      .querySelector(".current_price");
    var currentPriceValue = currentPriceElement.innerText;

    // Convert the current_price value to Arabic numerals
    currentPriceValue = switchNum(currentPriceValue);

    // Set the pro-price value to current_price value
    proPriceElement.value = currentPriceValue;
  });
});

// 3- Mathematical Calculations:
document.addEventListener("DOMContentLoaded", function () {
  // تحديد جميع الفورمات بواسطة الكلاس "form"
  var forms = document.querySelectorAll(".form");

  // إضافة مستمع لكل فورم
  forms.forEach(function (form) {
    // تغيير الكمية
    form.querySelector(".quantity").addEventListener("input", function () {
      updateTotalPrice(form);
    });

    // اختيار المحافظة
    form.querySelector(".select").addEventListener("change", function () {
      updateTransPrice(form);
      updateTotalPrice(form);
    });
  });

  function updateTotalPrice(form) {
    // حساب حاصل الضرب بين الكمية وسعر المنتج
    var quantity = parseInt(form.querySelector(".quantity").value) || 0;
    var productPrice = parseInt(form.querySelector(".pro-price").value) || 0;
    var netPrice = quantity * productPrice;

    // تحديث قيمة الحقل net-price
    form.querySelector(".net-price").value = netPrice;

    // تحديث قيمة الحقل total-price
    updateTransPrice(form);
    var transPrice = parseInt(form.querySelector(".trans-price").value) || 0;
    var totalPrice = netPrice + transPrice;
    form.querySelector(".total-price").value = totalPrice;
  }

  function updateTransPrice(form) {
    // تحديث قيمة الحقل trans-price بناءً على اختيار المحافظة
    var selectedZone = form.querySelector(".select").value;
    var transPrice = 0;

    switch (selectedZone) {
      case "zone1":
        transPrice = 40;
        break;
      case "zone2":
        transPrice = 45;
        break;
      case "zone3":
        transPrice = 50;
        break;
      default:
        transPrice = 0;
    }

    form.querySelector(".trans-price").value = transPrice;
  }
});

/****************************************/

/* Open And Close Products Popups */
document.addEventListener("DOMContentLoaded", function () {
  let open = document.querySelectorAll(".product-card");
  let close = document.querySelectorAll(".close");

  open.forEach((el) => {
    el.addEventListener("click", showPopup);
  });

  close.forEach((button) => {
    button.addEventListener("click", closePopup);
  });

  document.addEventListener("keydown", function (event) {
    // Check if the pressed key is the "Esc" key
    if (event.key === "Escape") {
      closePopup();
    }
  });

  // Add hashchange event listener
  window.addEventListener("hashchange", function () {
    if (location.hash === "") {
      closePopup();
    }
  });

  function showPopup() {
    document.querySelectorAll(this.dataset.popup).forEach((popup) => {
      popup.style.display = "grid";
    });

    // Add hash to the URL
    location.hash = "popup";
  }

  function closePopup() {
    document.querySelectorAll(".popups").forEach((popup) => {
      popup.style.display = "none";
    });

    // Remove hash from the URL
    history.replaceState(
      {},
      document.title,
      location.pathname + location.search
    );
  }
});

/****************************************/

/* Gallery Settings */
document.addEventListener("DOMContentLoaded", function () {
  let photo = document.querySelectorAll(".photo");
  let tvShow = document.querySelectorAll(".element");

  photo.forEach((img) => {
    img.addEventListener("click", show);
  });

  function show() {
    tvShow.forEach((imm) => {
      // @ts-ignore
      imm.style.display = "none";
    });
    document.querySelectorAll(this.dataset.show).forEach((sh) => {
      sh.style.display = "block";
    });
  }
});

// ********** Shuffle Products Card **********
// document.addEventListener("DOMContentLoaded", function () {
//   let crdsContainer = document.querySelector(".products-box");
//   // @ts-ignore
//   let cardsBlocks = Array.from(crdsContainer.children);
//   let orderRange = Array.from(Array(cardsBlocks.length).keys());

//   Shuffle(orderRange);

//   cardsBlocks.forEach((cardsBlock, index) => {
//     // @ts-ignore
//     cardsBlock.style.order = orderRange[index];
//   });

//   function Shuffle(array) {
//     // @ts-ignore
//     let current = array.length,
//       temp,
//       randome;
//     while (current > 0) {
//       randome = Math.floor(Math.random() * current);
//       current--;
//       temp = array[current];
//       array[current] = array[randome];
//       array[randome] = temp;
//     }
//     return array;
//   }
// });

// ********** WhatsApp Form **********
function whatsapp() {
  var myNum = 201094361474;
  var name = document.getElementById("name").value;
  var phone = document.getElementById("phone").value;
  var quan = document.getElementById("quan").value;
  var message = document.getElementById("message").value;

  var text =
    "\nName: " +
    name +
    "\nPhone: " +
    phone +
    "\nQuan: " +
    quan +
    "\nMessage: " +
    message;


  var url = "https://wa.me/" + myNum + "?text=" + encodeURIComponent(text);

  window.open(url, "_blank").focus();
}
