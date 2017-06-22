$(document).ready(function(){
    var backlist = ["images/back1.jpg","images/back2.jpg","images/back3.jpg","images/back4.jpg","images/back5.jpg"];
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

});
