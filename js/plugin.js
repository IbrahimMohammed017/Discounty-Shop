/* Toggle Navbar */
$(document).ready(function () {
  var isButtonClicked = false;

  // عند الضغط على زر ال button
  $(".menu").click(function () {
    // تحديد العناصر
    var ulElement = $("nav ul");
    var productsElement = $(".products");

    if (!isButtonClicked) {
      // زيادة الـ margin-top لعنصر ال .products الى 175 فى مدة 1000
      productsElement.animate({ marginTop: "175px" }, 800);

      // ظهور عنصر ul وتحويل الصفة الاساسية له الى display="flex" فى مدة 1500
      setTimeout(function () {
        ulElement.show().css({ display: "flex" }).animate({ opacity: 1 });
      }, 800);
    } else {
      // اخفاء عنصر ال ul وتحويل الصفة الاساسية له الى display="none" فى مدة 1000
      ulElement.animate({ opacity: 0 }, 1000, function () {
        ulElement.hide();
      });

      // تقليل ال margin-top لعنصر ال .products الى 120px فى مدة 1500
      productsElement.animate({ marginTop: "120px" }, 1500);
    }

    // تغيير حالة الزر
    isButtonClicked = !isButtonClicked;
  });
});

// Toggle Theme
$(document).ready(function () {
  // Check if mode is stored in localStorage
  var savedMode = localStorage.getItem("mode");
  if (savedMode === "dark") {
    enableDarkMode();
  } else {
    enableLightMode();
  }

  $(".light").on("click", function () {
    enableLightMode();
    // Save mode to localStorage
    localStorage.setItem("mode", "light");
  });

  $(".dark").on("click", function () {
    enableDarkMode();
    // Save mode to localStorage
    localStorage.setItem("mode", "dark");
  });

  function enableLightMode() {
    $(".dark").css("display", "block");
    $(".light").css("display", "none");
    $("body, header, .header-box ul").css(
      "background-image",
      "url(images/logo/bg-light.jpg)"
    );
    $("body").css("--fontColor", "#000");
    $(".popups").css("--bgColor", "#fff");
    $("option").css("color", "#000");
    $("option").css("background", "#fff");
    $(".close").css("background", "#fff");
    $(".light-logo").css("display", "block");
    $(".dark-logo").css("display", "none");
    $(".fa-tiktok").css("color", "#000");
  }

  function enableDarkMode() {
    $(".light").css("display", "block");
    $(".dark").css("display", "none");
    $("body, header, .header-box ul").css(
      "background-image",
      "url(images/logo/bg-dark.png)"
    );
    $("body").css("--fontColor", "#f7eee5");
    $(".popups").css("--bgColor", "#000");
    $("option").css("color", "#fff");
    $("option").css("background", "#000");
    $(".close").css("background", "#000");
    $(".light-logo").css("display", "none");
    $(".dark-logo").css("display", "block");
    $(".fa-tiktok").css("color", "#fff");
  }
});

// Trigger Nice Scroll
$("html").niceScroll({
  cursorcolor: "#fd5825",
  cursorwidth: "7.5px",
  cursorborder: "1px solid #ff6200",
  zindex: "2000",
});
