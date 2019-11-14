//1.适用点击文字，页面存在的文本
//click("全部播放",1);

//2.适用点击图片，对应的精确坐标
//bounds(918 , 1818, 1026, 1890).clickable().click();

//3.按设备尺寸点击
//click(device.width / 2, 4 * device.height / 5, device.width / 2, device.height / 5);

 press(device.width/2, device.height/2,1000);
 
 function click1(){
    className("android.widget.ImageView").findOne().parent().click();//找ImageView的上一层FrameLayout
    sleep(3000);

    var 他 = className("android.widget.FrameLayout").findOne().bounds();
    click(device.width=501, 他.centerY());
    sleep(1000);
}

while(true){
        click(550,1000);
        sleep(1); //其中1为两次点击的时间间隔即1毫秒
    }
