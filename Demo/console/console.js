console.show();//显示控制台

console.log("调整大小...");
console.setSize(1000, 1000);
sleep(2000);

console.log("调整位置...");
console.setPosition(0, 500);
sleep(2000);

//文本显示的颜色
console.verbose("这是灰色");
console.log("这是白色");
console.info("这是绿色");
console.warn("这是蓝色");
console.error("这是红色");


