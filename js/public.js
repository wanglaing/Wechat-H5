var m_Name = "";
var m_Tel = "";
var m_QianDao = "0";
var m_JID = "";
var m_Id = "";
var m_openid = "";
var m_Iscs = "";
var m_opid = 0;
var m_subscribe = 0;
var m_Orientation = 1;
//活动结束标识符,1表示结束
var m_IsOpen = 0;
//活动名称
var m_JSName = "花园城&花漾年双盘联动掀热潮丨双节好礼惠家人";
//活动主表名GBYFGuoQHDHtml
var m_JSNumber = "A202109_HYCCJUser";
//活动未开始语
var m_WKConclusion = "本轮活动还未开始!";
//活动结束语
var m_Conclusion = "本次活动已经结束!";
//活动程序目录GBYFGuoQHD
var m_Dir = 'hyccjhtml';
//未参加活动标题
var m_title_1 = "花园城&花漾年双盘联动掀热潮丨双节好礼惠家人";
//未参加活动引文
var m_desc_1 = "好又多购物中心购物卡、大闸蟹礼盒兑换券，超多精美礼品等您来领";
//参加活动标题
var m_title_2 = "花园城&花漾年双盘联动掀热潮丨双节好礼惠家人";
//参加活动引文
var m_desc_2 = "好又多购物中心购物卡、大闸蟹礼盒兑换券，超多精美礼品等您来领";
//分享域名地址
var m_domain = 'tfbjj.fengchehd.com';
//页面地址
var m_loc = location.href + '';
var m_loc1 = m_loc.substring(0, m_loc.toLowerCase().indexOf('/' + m_Dir + '/'));
//分享地址
var m_link = m_loc1 + '/' + m_Dir + '/indexgo.html';
//var m_link = 'http://chinaoctyada.cdjxyun.com/LHTingLWHtml/indexfx.html';
//分享图片
var m_imgUrl = m_loc1 + '/' + m_Dir + '/img/myshare.png';
//var m_imgUrl = 'http://chinaoctyada.cdjxyun.com/LHTingLWHtml/img/myshare.png';
//获取Cookie
function getCookie(name) {
    var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    if (arr = document.cookie.match(reg))
        return unescape(arr[2]);
    else
        return null;
}
//设置Cookie
function setCookie(name, value) {
    var Days = 30;
    var exp = new Date();
    exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
    document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString();
}
//删除Cookie
function delCookie(name) {
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval = encodeURI(getCookie(name));
    if (cval != null)
        document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
}
//获取参数
var getParam = function (name) {
    var search = document.location.search;
    var pattern = new RegExp("[?&]" + name + "\=([^&]+)", "g");
    var matcher = pattern.exec(search);
    var items = null;
    if (null != matcher) {
        try {
            items = decodeURIComponent(decodeURIComponent(matcher[1]));
        } catch (e) {
            try {
                items = decodeURIComponent(matcher[1]);
            } catch (e) {
                items = matcher[1];
            }
        }
    }
    return items;
};
//验证邮箱
function IsEmal(_val) {
    if (_val == "" || (_val != "" && !/.+@.+\.[a-zA-Z]{2,4}$/.test(_val))) {
        return false;
    }
    else {
        return true;
    }
}
//判断是否是float类型
function numberCheck(text) {
    var regex = /^[+|-]?\d*\.?\d*$/;
    if (!regex.test(text)) {
        return false;
    }
    return true;
}
//未参加活动分享初始化方法
function InItFx(_FxEnd, linkType) {
    var f_link = m_link;
    var f_imgUrl = m_imgUrl;
    var f_title = m_title_1;
    var f_desc = m_desc_1;
    $.get("/WXServices/AjaxHandler.ashx?" + Math.random(), { Action: 'GetPlatFXConfig', Loc: location.href }, function (ee) {
        var constr = ee;
        if (constr.debug == false) {
            wx.config({
                debug: constr.debug,
                appId: constr.appId,
                timestamp: constr.timestamp,
                nonceStr: constr.nonceStr,
                signature: constr.signature,
                jsApiList: [
                                'onMenuShareTimeline',
                                'onMenuShareAppMessage'
                ], // 必填，需要使用的JS接口列表
                openTagList: ['wx-open-launch-weapp']
            });
            if (linkType == 1) {
                f_link = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + constr.appId + '&redirect_uri=http%3A%2F%2F' + m_domain + '%2F' + m_Dir + '%2Findex.html%3fa%3d1&response_type=code&scope=snsapi_userinfo&state=1#wechat_redirect';
                m_link = f_link;
            }
            wx.ready(function () {
                wx.onMenuShareAppMessage({
                    title: f_title,
                    desc: f_desc,
                    link: f_link,
                    imgUrl: f_imgUrl,
                    trigger: function (res) {
                    },
                    success: function (res) {
                        $.get("/WXAJAX.ashx?" + Math.random(), { Action: 'DJAddPlat', Name: m_JSName, Number: m_JSNumber, Type: 'friend', OpId: m_opid }, function (ee) {

                        });
                        if (typeof _FxEnd == 'function') {
                            _FxEnd('friend');
                        }
                    },
                    cancel: function (res) {

                    },
                    fail: function (res) {

                    }
                });

                wx.onMenuShareTimeline({
                    title: f_title,
                    link: f_link,
                    imgUrl: f_imgUrl,
                    trigger: function (res) {
                    },
                    success: function (res) {
                        $.get("/WXAJAX.ashx?" + Math.random(), { Action: 'DJAddPlat', Name: m_JSName, Number: m_JSNumber, Type: 'Circle', OpId: m_opid }, function (ee) {

                        });
                        if (typeof _FxEnd == 'function') {
                            _FxEnd('Circle');
                        }
                    },
                    cancel: function (res) {

                    },
                    fail: function (res) {

                    }
                });
            });
        }
    });
}
//参加活动分享初始化方法
function InItFxTwo(_FxEnd) {
    var f_link = m_link;
    var f_imgUrl = m_imgUrl;
    var f_title = m_title_2;
    var f_desc = m_desc_2;
    wx.ready(function () {
        wx.onMenuShareAppMessage({
            title: f_title,
            desc: f_desc,
            link: f_link,
            imgUrl: f_imgUrl,
            trigger: function (res) {
            },
            success: function (res) {
                $.get("/WXServices/AjaxHandler.ashx?" + Math.random(), { Action: 'DJAddPlat', Name: m_JSName, Number: m_JSNumber, Type: 'friend', OpId: m_opid }, function (ee) {

                });
                if (typeof _FxEnd == 'function') {
                    _FxEnd('friend');
                }
            },
            cancel: function (res) {

            },
            fail: function (res) {

            }
        });

        wx.onMenuShareTimeline({
            title: f_title,
            link: f_link,
            imgUrl: f_imgUrl,
            trigger: function (res) {
            },
            success: function (res) {
                $.get("/WXServices/AjaxHandler.ashx?" + Math.random(), { Action: 'DJAddPlat', Name: m_JSName, Number: m_JSNumber, Type: 'Circle', OpId: m_opid }, function (ee) {

                });
                if (typeof _FxEnd == 'function') {
                    _FxEnd('Circle');
                }

            },
            cancel: function (res) {

            },
            fail: function (res) {

            }
        });
    });
}
function MyAutoAlert(_msg) {
    var _str = '<div id="myshowdiv" style="display: -webkit-box;-webkit-box-pack: center;-webkit-box-align: center;background-color: rgba(0, 0, 0, 0.9);width: 100%;height: 100%;	position: fixed;	top: 0;	left: 0;	z-index: 100;"><div style="margin: 10% 5%;	color: #000;	text-align: left;	line-height: 150%;	font-size: 1.2rem;	max-height: 80%;	overflow: scroll;	background-color: #fff;	padding: 2rem 1em;	border-radius: 5px;	font-family:serif;">'
				+ '<p id="nr">'
                + _msg
				+ '</p>'
				+ '<p style="text-align: center;	margin-top: 1rem;">'
				+ '	<a href="javascript:void(0);" onclick="$(this).parent().parent().parent().remove();" style="text-decoration: none;	color: #fff;	padding: 0.3rem 2rem;	background-color: #1B6BAE;	border-radius: 5px;	display: inline-block;">确认</a>'
				+ '</p>'
			    + '</div>'
		        + '</div>';
    $('body').append(_str);

}
function GetRandomNum(Min, Max) {
    var Range = Max - Min;
    var Rand = Math.random();
    return (Min + Math.round(Rand * Range));
}


function LodingShow(Msg) {
    if (Msg) {
        Msg = Msg
    } else {
        Msg = "";
    }
    var _ss = '';
    _ss += '<div class="pop popflex popLoding" style="background-color: rgba(0,0,0,0.8);">';
    _ss += '<div class="popbox">';
    _ss += '<div class="lds-css ng-scope" style="transform: scale(0.5);">';
    _ss += '<div class="lds-spinner" style="width:100%;height:100%">';
    _ss += ' <div></div>';
    _ss += '<div></div>';
    _ss += '<div></div>';
    _ss += ' <div></div>';
    _ss += ' <div></div>';
    _ss += ' <div></div>';
    _ss += '<div></div>';
    _ss += ' <div></div>';
    _ss += ' <div></div>';
    _ss += '<div></div>';
    _ss += '<div></div>';
    _ss += ' <div></div>';
    _ss += '</div>';
    _ss += '</div>';
    _ss += ' <p  style="font-size: 1rem;color: #ffffff;position: absolute;top: 75%;left: 50%;transform: translate(-50%, -50%);width: 100%;text-align: center;">' + Msg + '</p>';
    _ss += '</div>';
    _ss += '</div>';
    $('body').append(_ss);
}
function LodingHide () {
    $('.popLoding').remove();
}
