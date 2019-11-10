console.show();
auto.waitFor();

//获取设备信息
var str = "";
str += "屏幕宽度:" + device.width;
str += "\n屏幕高度:" + device.height;
toast("屏幕宽度为" + device.width + "  " + "屏幕高度为" + device.height);

main();

function main() {
    loadApp(); //1.打开学习强国App
    sleep(3000); //2.等待进入主页

    task_video(); //3.任务1：视听学习 
    back();
    sleep(3000);

    task_article(); //4.任务2：文章学习
    back();

    console.hide(); //隐藏控制台
    exists(); //退出应用
}

function loadApp() {
    console.log("本脚本仅供学习测试...");
    console.log("作者：Zero");
    console.log("版本：V1.0");

    sleep(3000);
    console.log("运行：学习强国");
    sleep(3000);
    log("准备：学习强国主界面..");
    launch("cn.xuexi.android");
    sleep(6000);
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
    sleep(3000); //缓冲3秒
    //click("新思想");
    //sleep(3000);
    click("综合");

    sleep(3000);
    for (let i = 1; i < 8; i++) {
        console.log("进度：这是第" + i + "篇文章");
        click(device.width / 2, 2 * device.height / 5, device.width / 2, device.height / 4);sleep(5000);        
        if(text("学习进行时").exists()) {
            console.log("警告：我要返回..."); sleep(5000); 
            back();sleep(5000);
        }
        swipe(device.width / 2, 4 * device.height / 5, device.width / 2, device.height / 5, 4000);
        sleep(9000);
        star();
        share();
        sleep(5000);
        back();sleep(3000);
        swipe(device.width / 2, 4 * device.height / 5, device.width / 2, device.height / 5, 4500);
    }
}

function 百灵() {
    console.log("提示：进入百灵...");
    sleep(3000); //缓冲3秒
    //点击一个视频进入
    className("android.widget.ImageView").findOne().parent().click(); //找ImageView的上一层FrameLayout
    var video1 = className("android.widget.FrameLayout").findOne().bounds();
    click(device.width = 501, video1.centerY());

    sleep(5000);
    click("继续播放");

    for (let i = 1; i < 2; i++) {
        console.log("提示：这是第" + i + "个视频");
        sleep(9000); //播放时间
        scrollit();
    }

    console.log("进度：最后一个视频持续12分钟...");
    sleep(8000); //总时长12分钟
}

//滚屏
function scrollit() {
    swipe(device.width / 2, 4 * device.height / 5, device.width / 2, device.height / 5, 1000);
}

//分享
function share() {

    bounds(918, 1818, 1026, 1890).clickable().click();
    sleep(3000);
    click("分享到学习强国");
    sleep(2000);
    click("你要选择分享的群");//自行修改
    sleep(1000);
    click("发送");
}

//收藏
function star() {
    bounds(774, 1818, 918, 1890).clickable().click();

}