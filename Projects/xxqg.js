/*
 * @file: xxqg.js
 * @Description: Auto.js学习强国助手 (6+6)+(6+6)+(1+1+2)=28分
 * @version: 2.0
 * @author: Zero
 * @contact: https://github.com/kessil/AutoXue/
 * @Date: 2019-11-7
 * @Copyright © 2019. All rights reserved.
 */

//获取设备信息
var str = "";
str += "屏幕宽度:" + device.width;
str += "\n屏幕高度:" + device.height;
toast("屏幕宽度为" + device.width + "  " + "屏幕高度为" + device.height);

var 学习强国 = "cn.xuexi.android";

function initial() {
    auto.waitFor(); //等待获取无障碍辅助权限
    console.show(); //显示控制台
    console.setPosition(0, device.height / 4);

    console.log("本脚本仅供学习测试...");
    console.log("作者：Zero");
    console.log("版本：V1.0");
    delay(3);

}

function loadApp() {
    console.log("运行：学习强国");
    delay(3);
    log("准备：学习强国主界面..");
    launch(学习强国);
    delay(6);
}

function task_video() {

    console.log("任务1：视听学习  3秒后开始...");
    click("百灵");
    sleep(3000);
    百灵();
    console.log("进度：视听浏览任务完成，正在返回...");
}

function task_article() {
    console.log("任务2：阅读文章  3秒后开始...");
    //bounds(918 , 1818, 1026, 1890).clickable().click();
    bounds(432, 1762, 648, 1920).clickable().click(); //click("学习");
    sleep(3000);
    学习();
    console.log("进度：文章浏览任务完成，正在返回...");
}

function 学习() {
    console.log("提示：进入学习...");
    delay(3);
    click("新思想");
    delay(3);
    click("综合");

    delay(3);
    for (let i = 1; i < 8; i++) {
        console.log("进度：这是第" + i + "篇文章");
        click(device.width / 2, 2 * device.height / 5, device.width / 2, device.height / 4);
        delay(5);
        if (text("学习进行时").exists()) {
            console.log("警告：我要返回...");
            delay(5);
            back();
            delay(6);
            back();
        }
        swipe(device.width / 2, 4 * device.height / 5, device.width / 2, device.height / 5, random() * delay(1));
        delay(9);
        if (i < 3) {
            star();
            share();
            delay(5);
        }
        back();
        delay(3);
        swipe(device.width / 2, 4 * device.height / 5, device.width / 2, device.height / 5, delay(4.5));
    }
}

function 百灵() {
    sleep(3000); //缓冲3秒
    console.log("提示：进入百灵，每个视频浏览时长8秒...");

    //点击一个视频进入
    className("android.widget.ImageView").findOne().parent().click(); //找ImageView的上一层FrameLayout
    var video1 = className("android.widget.FrameLayout").findOne().bounds();
    click(device.width = 501, video1.centerY());

    sleep(8000);
    click("继续播放");

    for (let i = 1; i < 7; i++) {
        console.log("提示：这是第" + i + "个视频");
        sleep(9000); //播放时间
        scroll();
    }

    console.log("进度：最后一个视频持续12分钟...");
    sleep(60000 * 6); //总时长6分钟
}

//滚屏
function scroll() {
    swipe(device.width / 2, 4 * device.height / 5, device.width / 2, device.height / 5, delay(1));
}

//延迟
function delay(seconds) {
    sleep(1000 * seconds);
}

//分享
function share() {

    bounds(918, 1818, 1026, 1890).clickable().click();
    delay(3);
    click("分享到学习强国");
    delay(2);
    click("你要转发的名字或者群名"); //自行修改
    delay(1);
    click("发送");
}

//收藏
function star() {
    bounds(774, 1818, 918, 1890).clickable().click();

}

function main() {
    initial();
    loadApp(); //1.打开学习强国App
    delay(3); //2.等待进入主页

    task_video(); //3.任务1：视听学习 
    back();
    delay(3);

    task_article(); //4.任务2：文章学习
    back();
    delay(3);

    console.hide(); //隐藏控制台
    exists(); //退出应用
}

main();