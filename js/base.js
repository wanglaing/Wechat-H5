var iMGlist = [
    "img/btn_Back.png?0.5828479106565994",
    "img/btn_ckyg.png?0.9765217305696952",
    "img/btn_CWBZ.png?0.001950314601741221",
    "img/btn_qdje.png?0.5863701624887394",
    "img/btn_Start.png?0.4504716271510094",
    "img/btn_zct.png?0.32505246553149014",
    "img/checkbox.png?0.3549093579640501",
    "img/checkbox1.png?0.7257067785432845",
    "img/code.png?0.8689360904651571",
    "img/fxImg.png?0.27515603684492396",
    "img/HKBg.png?0.7930812030193304",
    "img/left.png?0.8719140674265502",
    "img/logo.png?0.5413773798593629",
    "img/logo1.png?0.09088757769170219",
    "img/myshare.png?0.32602105226680167",
    "img/p1BottomImg.png?0.16551463977792324",
    "img/p1Img.png?0.2944666381429337",
    "img/p2ImgBottom.png?0.3971006891612505",
    "img/p2SwiperBgImg.png?0.10527255582836026",
    "img/p3ImgBottom.png?0.21009830132697505",
    "img/p4Img.png?0.14140761412540903",
    "img/p5Img.png?0.47757630595915135",
    "img/page01.jpg?0.6329218132709407",
    "img/popDonate.png?0.2270407538642507",
    "img/right.png?0.3620153389442442",
    "img/zp0.png?0.675362919615456",
    "img/zp1.png?0.5010573356910202"
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
    $._get("/WXAJAX.ashx?" + Math.random(), {
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
 *开始
 */
var HZswiper = null;
function handelStart () {
    if (m_IsOpen == 1) {
        TiShimsg(m_Conclusion);
        return false;
    }
    if (m_IsOpen == 2) {
        TiShimsg(m_WKConclusion);
        return false;
    }
    /**test start */
    var data = {
        State: 1,
        PaintingArr: [{
            ID: 1,
            WorksName: '《亚兰漫画作品集》',
            Name: '王亚兰',
            Age: '13',
            Disability: '听力障碍',
            Img: 'img/zp0.png',
        }, {
            ID: 2,
            WorksName: '《亚兰漫画作品集》',
            Name: '王亚兰',
            Age: '13',
            Disability: '听力障碍',
            Img: 'img/zp1.png',
        }]
    };
    var str = "";
    for (var i = 0; i < data.PaintingArr.length; i++) {
        var Item = data.PaintingArr[i];
        str += '<div class="swiper-slide" data-Id="' + Item.ID + '">' +
            '<div class="Pictureframe">' +
            '<div div class="zpImgs" data-Img="'+Item.Img+'" style="background-image: url(' + Item.Img + ');"></div>' +
            '</div>' +
            '<div class="zpInfoWords">' +
            '<p>' + Item.WorksName + '</p>' +
            '<p>' + Item.Name + '  ' + Item.Age + '  岁  ' + Item.Disability + '</p>' +
            '</div>' +
            '</div>';
    }
    $('.HZswiper').find('.swiper-wrapper').html(str);
    $('.page02').show();
    HZswiper = null;
    HZswiper = new Swiper('.HZswiper', {
        navigation: {
            nextEl: '.swiper-button-next1',
            prevEl: '.swiper-button-prev1',
        }
    });
    return;
     /**test end */
    $._get("/202005/LGLiuYGHHtml/Ajaxhander.ashx?" + Math.random(), {
        Action: ''
    }, function (data) {
        if (data.State > 0) {
            var str = "";
            for (var i = 0; i < data.PaintingArr.length; i++) {
                var Item = data.PaintingArr[i];
                str += '<div class="swiper-slide" data-Id="' + Item.ID + '">' +
                    '<div class="Pictureframe">' +
                    '<div div class="zpImgs" data-Img="'+Item.Img+'" style="background-image: url(' + Item.Img + ');"></div>' +
                    '</div>' +
                    '<div class="zpInfoWords">' +
                    '<p>' + Item.WorksName + '</p>' +
                    '<p>' + Item.Name + '  ' + Item.Age + '  岁  ' + Item.Disability + '</p>' +
                    '</div>' +
                    '</div>';
            }
            $('.HZswiper').find('.swiper-wrapper').html(str);
            $('.page02').show();
            HZswiper = null;
            HZswiper = new Swiper('.HZswiper', {
                navigation: {
                    nextEl: '.swiper-button-next1',
                    prevEl: '.swiper-button-prev1',
                }
            });
        } else {
            TiShimsg(data.Msg);
        }
    });
}

/**
 * 我的已购
 */
var YGHZswiper = null;
function handelMyYG () {
    if (m_IsOpen == 1) {
        TiShimsg(m_Conclusion);
        return false;
    }
    if (m_IsOpen == 2) {
        TiShimsg(m_WKConclusion);
        return false;
    }

    /**test start */
    var data = {
        State: 1,
        Purchased: [
            {
                ID: 1,
                WorksName: '《亚兰漫画作品集》',
                Name: '王亚兰',
                Age: '13',
                Disability: '听力障碍',
                Img: 'img/zp0.png',
            }, {
                ID: 2,
                WorksName: '《亚兰漫画作品集》',
                Name: '王亚兰',
                Age: '13',
                Disability: '听力障碍',
                Img: 'img/zp1.png',
            }
        ]
    }
    var str = '';
    for (var i = 0; i < data.Purchased.length; i++) {
        var Item = data.Purchased[i];
        str += '<div class="swiper-slide" data-Id="' + Item.ID + '">' +
            '<div class="Pictureframe">' +
            '<div   div class="zpImgs" data-Img="'+Item.Img+'" style="background-image: url(' + Item.Img + ');"></div>' +
            '</div>' +
            '<div class="zpInfoWords">' +
            '<p>' + Item.WorksName + '</p>' +
            '<p>' + Item.Name + '  ' + Item.Age + '  岁  ' + Item.Disability + '</p>' +
            '</div>' +
            '</div>';
    }
    YGHZswiper = null;
    $('.YGHZswiper').find('.swiper-wrapper').html(str);
    $('.page03').show();
    YGHZswiper = null;
    YGHZswiper = new Swiper('.YGHZswiper', {
        navigation: {
            nextEl: '.swiper-button-next2',
            prevEl: '.swiper-button-prev2',
        }
    });
    return;
    /**test end */
    $._get("/202005/LGLiuYGHHtml/Ajaxhander.ashx?" + Math.random(), {
        Action: ''
    }, function (data) {
        if (data.State > 0) {
            var str = '';
            for (var i = 0; i < data.Purchased.length; i++) {
                var Item = data.Purchased[i];
                str += '<div class="swiper-slide" data-Id="' + Item.ID + '">' +
                    '<div class="Pictureframe">' +
                    '<div   div class="zpImgs" style="background-image: url(' + Item.Img + ');"></div>' +
                    '</div>' +
                    '<div class="zpInfoWords">' +
                    '<p>' + Item.WorksName + '</p>' +
                    '<p>' + Item.Name + '  ' + Item.Age + '  岁  ' + Item.Disability + '</p>' +
                    '</div>' +
                    '</div>';
            }
            YGHZswiper = null;
            $('.YGHZswiper').find('.swiper-wrapper').html(str);
            $('.page03').show();
            YGHZswiper = null;
            YGHZswiper = new Swiper('.YGHZswiper', {
                navigation: {
                    nextEl: '.swiper-button-next2',
                    prevEl: '.swiper-button-prev2',
                }
            });
        } else {
            TiShimsg(data.Msg);
        }
    });
}

/**
 * 支持TA
 */
var SelectId = 0;
function handelSupporthim () {
    if (m_IsOpen == 1) {
        TiShimsg(m_Conclusion);
        return false;
    }
    if (m_IsOpen == 2) {
        TiShimsg(m_WKConclusion);
        return false;
    }
    // 当前选中的ID
    SelectId = $('.HZswiper').find('.swiper-slide-active')[0].getAttribute('data-Id');
    $('.popDonate').show();
}
/**
 * 支付
 */
function handelPay () {
    if (m_IsOpen == 1) {
        TiShimsg(m_Conclusion);
        return false;
    }
    if (m_IsOpen == 2) {
        TiShimsg(m_WKConclusion);
        return false;
    }
    var Mmony = $('input[name=Mony]').val() != "" || $('input[name=Mony]').val() != 0 ? $('input[name=Mony]').val() : $('.DonateListCon').find('.active').length==0 ? '': $('.DonateListCon').find('.active')[0].getAttribute('data-Mony');
    if (Mmony == ''||Mmony == 0||Mmony ==undefined || Mmony==null) {
        TiShimsg('请选择或者数据捐赠金额');
        return false;
    }
    $._get("/202005/LGLiuYGHHtml/Ajaxhander.ashx?" + Math.random(), {
        Action: '',
        Id: SelectId,
        Mony: Mmony
    }, function (data) {
        if (data.State > 0) {
            if (typeof WeixinJSBridge == "undefined") {
                if (document.addEventListener) {
                    document.addEventListener('WeixinJSBridgeReady', onBridgeReady(data), false);
                } else if (document.attachEvent) {
                    document.attachEvent('WeixinJSBridgeReady', onBridgeReady(data));
                    document.attachEvent('onWeixinJSBridgeReady', onBridgeReady(data));
                }
            } else {
                onBridgeReady(data);
            }
        } else {
            TiShimsg(data.Msg);
        }
    });
}
//微信支付方法
function onBridgeReady (data) {
    WeixinJSBridge.invoke(
        'getBrandWCPayRequest',
        {
            "appId": data.appId,     //公众号名称，由商户传入     
            "timeStamp": data.timeStamp,         //时间戳，自1970年以来的秒数     
            "nonceStr": data.nonceStr, //随机串     
            "package": data.package,
            "signType": data.signType,         //微信签名方式： "MD5"     
            "paySign": data.paySign //微信签名 
        },
        function (res) {
            if (res.err_msg == "get_brand_wcpay_request:ok") {
                // 支付成功 更新支付状态
                $._get("/202005/LGLiuYGHHtml/Ajaxhander.ashx?" + Math.random(), {
                    Action: '',
                    PayId: SelectId
                }, function (data) {
                    if (data.State > 0) {
                        $('.SelectImg').attr('src', $('.HZswiper').find('data-id="'+SelectId+'"').find('.zpImgs')[0].getAttribute('data-Img'))
                        $('.page04').show();
                        $('.pop').hide();
                    } else {
                        TiShimsg(data.Msg);
                    }
                })
            } else if (res.err_msg == "get_brand_wcpay_request:fail") {
                // 支付失败
            }
        }
    );
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