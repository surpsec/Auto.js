console.show() //显示控制台。

while (true) {
    var a = new Date()
    var b = a.getSeconds()
    log(b)
    sleep(500) //时间间隔默认一秒刷新2次，数值越小精度越大
    if (b == 59) {
        break
    }
}

for (var i = 0; i < 100; i++) {
    press(20, 20, 10) //点击屏幕
    log("一点击:" + i)
} //点击100次

console.hide()