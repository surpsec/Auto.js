//1.获取设备信息
console.show();
var str = "";
str += "屏幕宽度:" + device.width;
str += "\n屏幕高度:" + device.height;
str += "\nbuildId:" + device.buildId;
str += "\n主板:" + device.board;
str += "\n制造商:" + device.brand;
str += "\n型号:" + device.model;
str += "\n产品名称:" + device.product;
str += "\nbootloader版本:" + device.bootloader;
str += "\n硬件名称:" + device.hardware;
str += "\n唯一标识码:" + device.fingerprint;
str += "\nIMEI: " + device.getIMEI();
str += "\nAndroidId: " + device.getAndroidId();
str += "\nMac: " + device.getMacAddress();
str += "\nAPI: " + device.sdkInt;
str += "\n电量: " + device.getBattery();

log(str);

//2.调整设备亮度
"ui";

ui.layout(
    <vertical padding="16">
        <checkbox id="auto" text="自动亮度"/>
        <text textColor="black" textSize="16sp" margin="8">亮度</text>
        <seekbar id="brightness" max="100"/>
    </vertical>
);

//getBrightnessMode()返回亮度模式，1为自动亮度
ui.auto.setChecked(device.getBrightnessMode() == 1);
ui.auto.setOnCheckedChangeListener(function(v, checked){
    device.setBrightnessMode(checked ? 1: 0);
});

ui.brightness.setProgress(device.getBrightness());
ui.brightness.setOnSeekBarChangeListener({
    onProgressChanged: function(seekbar, p, fromUser){
        if(fromUser){
            device.setBrightness(p);
        }
    }
});

//3.调整设备音量
"ui";

ui.layout(
    <vertical padding="16">
        <text textColor="black" textSize="16sp">媒体音量</text>
        <seekbar id="music"/>

        <text textColor="black" textSize="16sp">通知音量</text>
        <seekbar id="notification"/>

        <text textColor="black" textSize="16sp">闹钟音量</text>
        <seekbar id="alarm"/>
    </vertical>
);

ui.music.setMax(device.getMusicMaxVolume());
ui.music.setProgress(device.getMusicVolume());
ui.music.setOnSeekBarChangeListener({
    onProgressChanged: function(seekbar, p, fromUser){
        if(fromUser){
            device.setMusicVolume(p);
        }
    }
});

ui.notification.setMax(device.getNotificationMaxVolume());
ui.notification.setProgress(device.getAlarmVolume());
ui.notification.setOnSeekBarChangeListener({
    onProgressChanged: function(seekbar, p, fromUser){
        if(fromUser){
            device.setNotificationVolume(p);
        }
    }
});

ui.alarm.setMax(device.getAlarmMaxVolume());
ui.alarm.setProgress(device.getAlarmVolume());
ui.alarm.setOnSeekBarChangeListener({
    onProgressChanged: function(seekbar, p, fromUser){
        if(fromUser){
            device.setAlarmVolume(p);
        }
    }
});
