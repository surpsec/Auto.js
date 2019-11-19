/*
 * @file: xxqg.js
 * @Description: Auto.js学习强国助手 (6+6)+(6+6)+(1+1+2)=28分
 * @version: 2.0
 * @author: Zero
 * @contact: https://github.com/kessil/AutoXue/
 * @Date: 2019-11-7
 * @Copyright © 2019. All rights reserved.
 */

var str = "";
str += "屏幕宽度:" + device.width;
str += "\n屏幕高度:" + device.height;
toast("屏幕宽度为" + device.width + "  " + "屏幕高度为" + device.height);

var 学习强国 = "cn.xuexi.android";


main();

/**
 * @description:初始化设备 
 */
function init_device() {
    device.keepScreenOn();
}

/**
 * @description: 初始化console
 */
function init_console() {
    auto.waitFor(); //等待获取无障碍辅助权限
    console.setSize(1000, 500);
    console.show(); //显示控制台
    console.log("学习强国脚本启动中...");
    delay_s(3);
    console.log("作者：Zero");
    delay_s(2);
    console.log("版本：V1.0");
    delay_s(2);

}
/**
 * @description: 加载app
 */
function loadApp() {
    console.log("运行：学习强国");
    delay_s(3);
    log("准备：学习强国主界面..");
    //launch(学习强国);
    while (!launch(学习强国)) //启动学习强国app
    {
        console.error("进度：找不到学习强国App!请手动打开...");
        delay_s(5);
    }
    delay_s(6);
}

/**
 * @description: 视听学习
 */
function task_video() {
    console.log("进度：任务1-视听学习");
    delay_s(3);
    click("百灵");
    while(!click("百灵")) {
        console.log("进度：请手动点击百灵页面...");
        delay_s(1);
    }
    delay_s(5);
    百灵();
    console.log("进度：视听浏览任务完成，正在返回...");
    back();
}
/**
 * @description: 百灵页面
 */
function 百灵() {
    delay_s(3); //缓冲3秒
    console.log("提示：进入百灵主界面，每个视频浏览时长8秒...");
    //点击一个视频进入
    className("android.widget.ImageView").findOne().parent().click(); //找ImageView的上一层FrameLayout
    var video1 = className("android.widget.FrameLayout").findOne().bounds();
    click(device.width = 501, video1.centerY());
    delay_s(8);
    click("继续播放");
    for (let i = 1; i < 7; i++) {
        delay_s(5);
        console.log("进度：完成" + i + "个视频浏览");
        delay_s(9); //播放时间
        scroll_it();
    }
    console.log("进度：最后一个视频持续12分钟...");
    delay_m(1); //总时长1分钟
}
/**
 * @description: 文章阅读
 */
function task_article() {
    console.log("任务2：阅读文章  3秒后开始...");
    bounds(432, 1762, 648, 1920).clickable().click();
    delay_s(3);
    学习();
    console.log("进度：文章浏览任务完成，正在返回...");
    back();
}

function 学习() {
    console.log("提示：进入学习主界面...");
    delay_s(3);
    click("新思想");
    delay_s(3);
    for (let i = 1; i < 8; i++) {
        console.log("进度：进行第" + i + "次文章浏览");
        click(device.width / 2, 2 * device.height / 5, device.width / 2, device.height / 4);
        delay_s(5);
        swipe(device.width / 2, 4 * device.height / 5, device.width / 2, device.height / 5, random() * 1000);
        delay_s(9);
        if (i > 5) {
            star();
            delay_s(5);
            share();
            delay_s(5);
        }
        back();
        delay_s(3);
        swipe(device.width / 2, 4 * device.height / 5, device.width / 2, device.height / 5, 4500);
        console.log("进度：完成" + i + "次文章浏览");
        delay_s(2);
    }
}

//滚屏
function scroll_it() {
    swipe(device.width / 2, 4 * device.height / 5, device.width / 2, device.height / 5, 1000);
}

//延迟
function delay_s(seconds) {
    sleep(1000 * seconds);
}

function delay_m(minute) {
    sleep(60000 * minute);
}

//分享
function share() {
    console.log("进度：分享...");
    bounds(918, 1818, 1026, 1890).clickable().click();
    delay_s(3);
    click("分享到学习强国");
    delay_s(2);
    click("李"); //自行修改
    delay_s(1);
    click("发送");
    delay_s(2);
}

//收藏
function star() {
    console.log("进度：收藏...");
    bounds(774, 1818, 918, 1890).clickable().click();
}

function tasks() {
    loadApp(); //1.打开学习强国App
    task_video(); //2.任务1：视听学习 
    task_article(); //3.任务2：文章学习
}

function init() {
    init_device();
    init_console();
}

function deinit() {
    console.hide(); //隐藏控制台
    exists(); //退出应用
}

//主函数
function main() {
    init();
    tasks();
    deinit();
}
