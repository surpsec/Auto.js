console.show();
auto.waitFor();

//获取设备信息
var w = device.width;
var h = device.height;
toast("屏幕宽度为" + device.width + "  " + "屏幕高度为" + device.height);

//全局变量
var t = 0;
var max = dialogs.input("大约刷多少分钟", 60);

waitForActivity("com.jifen.qkbase.main.MainActivity");

function is(parent) {
    console.log("is??????????");
    if (parent.childCount() == 0) {
        console.log("12222222222222222");
        if (parent.text() == "\u5e7f\u544a" || (parent.text() == "\u7f6e\u9876" || parent.text() == "\u89c6\u9891")) return true;
        return false;
    }
    for (var i = 1; i < parent.childCount(); i++) {
        if (is(parent.child(i))) 
        console.log("1111111111111");
        return true;
    }
    return false;
}

while (t < max) {
    console.log("进度："+t+"分钟");
    sleep(1000);

    click(w * 0.1, h * 0.95);//点击第一个
    sleep(1000 + 1000 * random());

    var list = className("android.support.v7.widget.RecyclerView").findOne();
    sleep(1500);

    var is_ent = false;
    for (var i = 1; i < list.childCount() && !is_ent; i++) {
        if (is(list.child(i))) continue;
        is_ent = true;
        list.child(i).click();
        for (var j = 0; j < 10; j++) {
            sleep(2000);
           // 判断是不是趣头条界面();
            swipe(w / 2, h * 0.6 + h * random() * 0.1, w / 2, h * 0.3, 600 + 600 * random());
            sleep(2000);
        }
        //判断是不是趣头条界面();
        back();
        t++;
        console.log(i);
        
        sleep(100);
    }
}

function 判断是不是趣头条界面() {
    console.log("提示：判断是不是趣头条界面");
    if (currentPackage() != "com.jifen.qukan") {
        console.log("结束");
        exit();
    }
}