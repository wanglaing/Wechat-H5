var iMGlist = [
  "img/page01.jpg"
];

loadImg(iMGlist, loadEnd);
function loadImg(arr, callback) {
  var cur = 0;
  var curfalse = 0;
  var total = arr;
  for (var i = 0; i < total.length; i++) {
    var img = new Image();
    img.onerror = function () {
      curfalse++;
    };
    img.src = total[i];
    img.onload = function () {
      cur++;
      if (cur + curfalse == total.length) {
        if (callback) {
          callback();
        }
      }
      $(".loadWord").html(
        '<img src="img/logo.png?V1" style="width:30%;display:inline-block;"><br /><br />加载中，请稍等....&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' +
          Math.ceil((parseInt(cur + curfalse) / parseInt(arr.length)) * 100) +
          "%"
      );
    };
  }
}

$("input,select, textarea")
  .focus(function () {
    interval = setInterval(function () {
      bfscrolltop = document.body.scrollTop; 
    }, 100);
    bfscrollboolean = true;
  })
  .blur(function () {
    clearInterval(interval); 
    bfscrollboolean = false;

    setTimeout(function () {
      if (!bfscrollboolean) {
        document.body.scrollTop = bfscrolltop; 
      }
    }, 100);
  });
var Bgmedia = document.getElementById("media");
document.addEventListener(
  "WeixinJSBridgeReady",
  function () {
    Bgmedia.play()
  },
  false
);
$(".audioControl").bind("click", function () {
  if ($(this).hasClass("play")) {
    $(this).removeClass("play");
    $(this).addClass("stop");
    Bgmedia.pause();
  } else {
    $(this).removeClass("stop");
    $(this).addClass("play");
    Bgmedia.play();
  }
});

function loadEnd() {
  $('.pageLode').hide();
  $('.page01').show();
}

function TiShimsg(msg) {
  $(".popGG").find(".ThiMsg").html(msg);
  $(".popGG").show();
}
$(document).ready(function () {
  InItFx(Fxend);
    m_Iscs = getParam("a");
   
  $.get(
    "/WXServices/AjaxHandler.ashx?" + Math.random(),
    {
      Action: "DJAddPlat",
      Name: m_JSName,
      Number: m_JSNumber,
      Type: "Click",
      Iscs: m_Iscs,
    },
    function (ee) {
      var _obj = ee;
      m_IsOpen = _obj.isOpen;
      if (m_IsOpen == 1) {
          TiShimsg(m_Conclusion);
          return false;
      }
      if (m_IsOpen == 2) {
          TiShimsg(m_WKConclusion);
          return false;
      }
    }
  );
});

function Fxend() {
  $(".popshaer").hide();
};



