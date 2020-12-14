var iMGlist = [
    "img/page01.jpg?0.6329218132709407"
];

loadImg(iMGlist, loadEnd);

function loadImg (arr, callback) {
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
            if ((cur + curfalse) == total.length) {
                if (callback) {
                    callback();
                };
            }
            $(".loadWord").html("<img src=\"img/logo.png\" style=\"width:30%;display:inline-block;\"><br /><br />加载中，请稍等....&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + Math.ceil(parseInt(cur + curfalse) / parseInt(arr.length) * 100) + "%");
        };
    }
}

$("input,select, textarea").focus(function () {
    //获取焦点时触发事件
    interval = setInterval(function () {//设置一个计时器，时间设置与软键盘弹出所需时间相近
        bfscrolltop = document.body.scrollTop; //获取焦点后将浏览器内所有内容高度赋给浏览器滚动部分高度
    }, 100)
    bfscrollboolean = true;
}).blur(function () {//设定输入框失去焦点时的事件
    clearInterval(interval); //清除计时器
    bfscrollboolean = false;
    setTimeout(function () {
        if (!bfscrollboolean) {
            document.body.scrollTop = bfscrolltop; //将软键盘唤起前的浏览器滚动部分高度重新赋给改变后的高度
            window.scrollTo(0, 0);
        }
    }, 100)
});
var Bgmedia = document.getElementById('media');
document.addEventListener("WeixinJSBridgeReady", function () {
    Bgmedia.play();
}, false);
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


function loadEnd () {
    $(".pageLode").hide();
    // $('.page01').show();
}

function TiShimsg (msg) {
    $('.popGG').find('.ThiMsg').html(msg);
    $('.popGG').show();
}
var nickName = '';
$(document).ready(function () {
    InItFx(Fxend);
    m_Iscs = getParam('a');
    $.get("/WXServices/AjaxHandler.ashx?" + Math.random(), {
        Action: 'DJAdd',
        Name: m_JSName,
        Number: m_JSNumber,
        Type: 'Click',
        Iscs: m_Iscs
    }, function (ee) {
        var _obj = ee;
        m_IsOpen = _obj.isOpen;
        if (m_IsOpen == 1) {
            TiShimsg(m_Conclusion);
        }
        if (m_IsOpen == 2) {
            TiShimsg(m_WKConclusion);
        }
    });
    $("html,body").animate({
        scrollTop: 0
    }, 0);
    $('.DonateListCon').find('.Item').click(function () {
        $('.DonateListCon').find('.Item').removeClass('active');
        $(this).addClass('active');
    });
    // $('.PHBLIST').on('scroll', function () {
    //     var msg_list = $('.PHBLIST');
    //     if (msg_list.height() + msg_list[0].scrollTop >= msg_list[0].scrollHeight - 60) {
    //         PHB();
    //     }
    // })
});
function Fxend () {
    $('.popshaer').hide();
}
/**
 * 存为壁纸
 */
function handelCWPZ () {
    $('.pageJietuzong').show();
    LodingShow('壁纸生成中，请稍后')
    setTimeout(function () {
        SaveImg();
    }, 500);
}

var mybeis = 2;
function SaveImg () {
    var targetDom = $(".pageJietuzong");
    var copyDom = targetDom.clone();
    var width = $(".pageJietuzong").width(); //这是我们准备画的div
    var height = $(".pageJietuzong").height();
    copyDom.width(width * mybeis);
    copyDom.height(height * mybeis);
    $(copyDom).find('.UserInfo').find('span').css({
        'fontSize': 1.4 * mybeis + 'rem',
    });
    $('body').prepend(copyDom);
    html2canvas(copyDom, {
        useCORS: true,
        allowTaint: false,
        taintTest: true,
        onrendered: function (canvas) {
            canvas.id = "mycanvas";
            var dataUrl = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");//生成base64图片数据
            copyDom.remove();
            $('.ResultImg').attr('src', dataUrl);
            LodingHide();
            $('.pageResute').show();
        },
        width: width * mybeis,
        height: height * mybeis
    });
}
