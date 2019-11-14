console.show();
auto.waitFor();

//获取设备信息
var str = "";
str += "屏幕宽度:" + device.width;
str += "\n屏幕高度:" + device.height;
toast("屏幕宽度为" + device.width + "  " + "屏幕高度为" + device.height);

var btn;
main();

function main() {
  openApp();
  dotask();
  //console.log("正在进入朋友圈...");

}

function dotask() {
  while (1) {
    let i = 1; 
    var c = className("ImageView").desc("评论").untilFind();
    c.each(function (btn) {
      like(btn);
      i++;
      console.log("+" + i);
    });
    scroll();
    sleep(3000);
  }
  console.log("点赞结束，3秒后退出微信...");
  sleep(3000);
  console.hide();
  back();
  back();
}

function openApp() {
  console.log("打开微信中...");
  app.launchApp("微信");
  sleep(3000);
  console.log("ps:若打开失败，请手动打开，并重启脚本...");
  sleep(3000);
  console.log("---滑动点赞20次---");

  sleep(3000);
  click("发现");
  click("朋友圈");
  sleep(3000);

}
//下滑
function scroll() {
    if (!click("赞")) {
      className("ListView").scrollForward();
    }
    sleep(2000);
  
}

//点赞
function like(btn) {
  btn.click();
  sleep(1000);
  if (!click("赞") | click("取消")) {
    btn.click();
  }
  sleep(2000);
}
