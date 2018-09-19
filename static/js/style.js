
$(document).ready(function(){
    //document.body.onselectstart=function(){return false;};// 禁止选中页面文字
    tag_cloud_set(); // 标签云设置
    markdown_a_tag_open_new_page(); // 添加markdown的a标签新页面打开的功能
    markdown_img_tag_set_width(); // 添加markdown的img标签设置宽度的功能
});

function tag_cloud_set() {
    var alist = $('#tags p');
    alist.each(function () {
        var t = $(this);
        var a = t.find('a');
        var sup = parseInt(t.find('sup').text());
        t.find('sup').hide();

        if (0<sup && sup<6) {
            a.addClass("text7");
        } else if (5<sup && sup<11) {
            a.addClass("text6");
        } else if (10<sup && sup<16) {
            a.addClass("text5");
        } else if (15<sup && sup<21) {
            a.addClass("text4");
        } else if (20<sup && sup<26) {
            a.addClass("text3");
        } else if (25<sup && sup<31) {
            a.addClass("text2");
        } else if (30<sup && sup<36) {
            a.addClass("text1");
        } else {
            a.addClass("text1");
        }
    });
}

function markdown_a_tag_open_new_page() {
    var aTagArr = [].slice.apply(document.getElementsByTagName("a"));

    aTagArr.forEach(function (e, i) {
        if (e.href.indexOf("?_blank") > -1) {
            e.target = "_blank";
            e.href = e.href.substring(0,e.href.length - 7);
        }
    });       
}

function markdown_img_tag_set_width(){
    var aTagArr = [].slice.apply(document.getElementsByTagName("img"));

    aTagArr.forEach(function (e, i) {
        if (/^\d{2}$/.test(e.alt)) {
            e.style = "max-width:"+e.alt.toString()+"%;";
        }
    });
}

// 设置回到顶部
$.fn.goToTop = function () {
    if ($(window).scrollTop()<400) {
        $('#goToTop').hide(); //滚动条距离顶端的距离小于showDistance是隐藏goToTop按钮
    }
    $(window).scroll(function () {
        if ($(this).scrollTop()>400) {
            $('#goToTop').fadeIn();
        } else {
            $('#goToTop').fadeOut();
        }
    });
    this.click(function () {
        $('html,body').animate({scrollTop:0},800);
        return false;
    });
}
$(document).ready(function () {
    $('#goToTop').goToTop();
});