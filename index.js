$(document).ready(function(){
    var backlist = ["http://ojb21p87b.bkt.clouddn.com/back1.jpg","http://ojb21p87b.bkt.clouddn.com/back2.jpg","http://ojb21p87b.bkt.clouddn.com/back3.jpg","http://ojb21p87b.bkt.clouddn.com/back4.jpg","http://ojb21p87b.bkt.clouddn.com/back5.jpg"];
    var backinfo = ["第一张图片介绍","第二张图片介绍","第三张图片介绍","第四张图片介绍","第五张图片介绍"]
    var backNum = backlist.length;
    //图片轮播左边点击
    $("#controdiv>a#leftlink").click(function() {
        var src = $("#imgdiv>img").attr("src");
        for(var i=0;i<backNum;i++){
            if(backlist[i] === src){
                if(i>0){
                    $("#imgdiv>img").attr("src",backlist[i-1]);
                    $("#backimginfo").text(backinfo[i-1]);
                }else{
                    $("#imgdiv>img").attr("src",backlist[backNum-1]);
                    $("#backimginfo").text(backinfo[backNum-1]);
                }
            }
        }
    });
    //图片轮播右边点击
    $("#controdiv>a#rightlink").click(function() {
        var src = $("#imgdiv>img").attr("src");
        for(var i=0;i<backNum;i++){
            if(backlist[i] === src){
                if(i<backNum-1){
                    $("#imgdiv>img").attr("src",backlist[i+1]);
                    $("#backimginfo").text(backinfo[i+1]);
                }else{
                    $("#imgdiv>img").attr("src",backlist[0]);
                    $("#backimginfo").text(backinfo[0]);
                }
            }
        }
    });
    //记录网站访问次数
    var ref = new Wilddog("https://lmagic.wilddogio.com/lmagic_club/");
    ref.child("visitNum").once('value', function(snapshot){
        //取出后端访问次数
        var visitNum = snapshot.val();
        visitNum = visitNum +1 ;
        $("#indexInfo span").text(visitNum);
        //将数据提交到后台野狗云
        /*ref.child("visitNum").set(visitNum);*/
    });
    var cityName;
    //获取城市名
    $.ajax({
        url:"http://ipinfo.io/json?",
        type:'GET',
        dataType:'json',
        success:function(res){
            cityName = res.city;
            $("#city .text").text(cityName);
            getTemp();
        }
    });
    //通过城市名获取温度
    function getTemp(){
        var cityUrl = "https://free-api.heweather.com/v5/weather?key=29df2248f4de473f92cc1a49dd26efa3&city="+cityName;
        var temp;
        $.ajax({
            url:cityUrl,
            type:'GET',
            dataType:'json',
            success:function(data){
                if(data.HeWeather5[0].status == "unknown city"){
                    temp = "null";
                }else{
                    temp = data.HeWeather5[0].now.tmp;
                }
                var tempText = temp+String.fromCharCode(176)+'C';
                $("#temp .text").text(tempText);
            }
        });
    }
});
