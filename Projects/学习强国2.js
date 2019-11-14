/**
 * @Description: Auto.js学习强国助手 (6+6)+(6+6)+(1+1+2)=28分
 * @version: 2.7 beta3
 * @Author: Ivan
 * @Date: 2019-11-7
 */

var aCount=10;//文章学习篇数
var vCount=6;//“百灵”小视频学习个数
var cCount=2;//收藏+分享+评论次数

var aTime=75;//每篇文章学习-72秒 72*10=12分钟
var rTime=1080;//广播收听-18分钟
var vTime=16;//每个“百灵”小视频学习-18秒

var commentText=["支持党，支持国家！","为实现中华民族伟大复兴而不懈奋斗！","紧跟党走，毫不动摇！","不忘初心，牢记使命","努力奋斗，回报祖国！"];//评论内容，可自行修改，大于5个字便计分


/**
 * @description: 延时函数
 * @param: seconds-延迟秒数
 * @return: null
 */
function delay(seconds)
{
    sleep(1000*seconds);//sleep函数参数单位为毫秒所以乘1000
}

/**
 * @description: 文章学习计时(弹窗)函数
 * @param: n-文章标号 seconds-学习秒数
 * @return: null
 */
function article_timing(n,seconds)
{
    h=device.height;//屏幕高
    w=device.width;//屏幕宽
    x=(w/3)*2;
    h1=(h/6)*5;
    h2=(h/6);
    for(var i=0;i<seconds;i++)
    {
        while(!textContains("欢迎发表你的观点").exists())//如果离开了文章界面则一直等待
        {
            console.error("当前已离开第"+(n+1)+"文章界面，请重新返回文章页面...");
            delay(1);
        }
        if(i%5==0)//每5秒打印一次学习情况
        {
            console.info("第"+(n+1)+"篇文章已经学习"+(i+1)+"秒,剩余"+(seconds-i-1)+"秒!");
        }
        delay(1);
        if(i%10==0)//每10秒滑动一次，如果android版本<7.0请将此滑动代码删除
        {
            toast("这是防息屏toast,请忽视-。-");
            if(i<=seconds/2)
            {
                swipe(x,h1,x,h2,500);//向下滑动
            }
            else
            {
                swipe(x,h2,x,h1,500);//向上滑动
            }
        }
    }
}

/**
 * @description: 视频学习计时(弹窗)函数
 * @param: n-视频标号 seconds-学习秒数
 * @return: null
 */
function video_timing(n,seconds)
{
    for(var i=0;i<seconds;i++)
    {
        while(!textContains("分享").exists())//如果离开了百灵小视频界面则一直等待
        {
            console.error("当前已离开百灵小视频界面，请重新返回视频...");
            delay(2);
        }
        delay(1);
        console.info("第"+(n+1)+"个小视频已经观看"+(i+1)+"秒,剩余"+(seconds-i-1)+"秒!");
    }
}

/**
 * @description: 广播学习计时(弹窗)函数
 * @param: r_time-已经收听的时间 seconds-学习秒数
 * @return: null
 */
function radio_timing(r_time,seconds)
{
    for(var i=0;i<seconds;i++)
    {
        while(!desc("学习").exists())//如果离开了强国主页
        {
            console.error("当前已离开主页，请返回并确保电台仍在播放...");
            delay(1);
        }
        delay(1);
        if(i%5==0)//每5秒打印一次信息
        {
            console.info("广播已经收听"+(i+1+r_time)+"秒,剩余"+(seconds-i-1)+"秒!");
        }
        if(i%15==0)//每15秒弹一次窗防止息屏
        {
            toast("这是防息屏弹窗，可忽略-. -");
        }
    }
}

/**
 * @description: 日期转字符串函数
 * @param: y,m,d 日期数字 2019 1 1
 * @return: s 日期字符串 "2019-xx-xx"
 */
function dateToString(y,m,d)
{
    var year=y.toString();
    if((m+1)<10){
        var month="0"+(m+1).toString();
    }
    else{
        var month=(m+1).toString();
    }
    if(d<10){
        var day="0"+d.toString();
    }
    else{
        var day=d.toString();
    }
    var s=year+"-"+month+"-"+day;//年-月-日
    return s;
}

/**
 * @description: 获取当天日期字符串函数
 * @param: null
 * @return: s 日期字符串 "2019-xx-xx"
 */
function getTodayDateString()
{
    var date=new Date();
    var y=date.getFullYear();
    var m=date.getMonth();
    var d=date.getDate();

    var s=dateToString(y,m,d);//年-月-日
    return s
}

/**
 * @description: 获取昨天日期字符串函数
 * @param: null
 * @return: s 日期字符串 "2019-xx-xx"
 */
function getYestardayDateString()
{
    var date=new Date();
    var y=date.getFullYear();
    var m=date.getMonth();
    var d=date.getDate();

    if(m==0 && d==1)//如果是1月1号
    {
        y=y-1;//年数减1
    }
    var day_in_month=[31,28,31,40,31,30,31,31,30,31,30,31];
    if(y%400==0 || (y%4==0 && y%100!=0))//如果是闰年
    {
        day_in_month[1]=29;//闰年二月有29天
    }

    if(d==1){
        d=day_in_month[m-1];//上个月的最后一天
        m=m-1;
    }
    else{
        d=d-1;
    }
    
    var s=dateToString(y,m,d);//年-月-日
    return s
}

/**
 * @description: 文章学习函数  (阅读文章+文章学习时长)---6+6=12分
 * @param: null
 * @return: null
 */
function articleStudy()
{
    while(!desc("学习").exists());//等待加载出主页
    desc("学习").click();//点击主页正下方的"学习"按钮
    delay(2);
    var listView=className("ListView");//获取文章ListView控件用于翻页
    click("推荐");
    delay(2);
    var flag=false;//判断进入专题界面标志
    var fail=0;
    var s=getTodayDateString();//获取当天日期字符串

    for(var i=0,t=0;i<aCount;)
    {
        if(click(s,t)==true)//如果点击成功则进入文章页面,不成功意味着本页已经到底,要翻页
        {   
            delay(1.5);
            if(desc("简介").exists())//如果存在“简介”则认为进入了文章栏中的视频界面需退出
            {
                delay(1);
                console.warn("进入了视频界面，即将退出并进下一篇文章!");
                t++;
                back();
                delay(1.5);
                click("电台");
                delay(1.5);
                click("中国之声");
                console.log("因为广播被打断，正在重新收听广播...");
                delay(2);
                back();
                while(!desc("学习").exists());
                desc("学习").click();
                delay(1.5);
                continue;
            }
            var n=0;
            while(!textContains("欢迎发表你的观点").exists())//如果没有找到评论框则认为没有进入文章界面，一直等待
            {
                delay(1);
                n++;
                console.warn("没找到评论框!该界面非文章界面!");
                if(n>4)//等待超过5秒则认为进入了专题界面，退出进下一篇文章
                {
                    flag=true;
                    break;
                }
            }
            if(flag==true)
            {
                console.warn("进入了专题界面，即将退出并进下一篇文章!")
                t++;
                back();
                delay(2);
                flag=false;
                continue;
            }
            console.log("正在学习第"+(i+1)+"篇文章...");
            fail=0;
            var wave=random(-5,5);//上下随机波动5秒
            article_timing(i,aTime+wave);
            if(i<cCount)//收藏分享2篇文章
            {
                CollectAndShare(i);//收藏+分享。若运行到此报错请注释本行！
                comment(i);//评论
            }
            back();//返回主界面
            while(!desc("学习").exists());//等待加载出主页
            delay(2);
            i++;
            t++;//t为实际点击的文章在listView控件中的标号,和i不同,勿改动!
        }
        else
        {
            if(i==0)
            {
                s=getYestardayDateString();
                console.warn("首页没有找到当天文章，即将学习昨日新闻!");
                continue;
            }
            if(fail>4)//连续翻几页没有点击成功则认为今天的新闻还没出来，学习昨天的
            {
                s=getYestardayDateString();
                delay(1);
                console.warn("没有找到当天文章，即将学习昨日新闻!");
                t=0;
                continue;
            }
            listView.scrollForward();//向下滑动(翻页)
            fail++;//翻页次数加一
            delay(2);
            t=1;
        }
    }
}

/**
 * @description: “百灵”小视频学习函数
 * @param: null
 * @return: null
 */
function videoStudy()
{
    h=device.height;//屏幕高
    w=device.width;//屏幕宽
    x=(w/3)*2;
    h1=(h/6)*5;
    h2=(h/6);

    click("百灵");
    delay(2);
    click("竖");
    delay(2);
    //var a=className("FrameLayout").depth(23).findOnce(0);//根据控件搜索视频框，但部分手机不适配，改用下面坐标点击
    //a.click();//点击小视频
    click(w/2,h/4);//坐标点击第一个视频
    delay(1);
    for(var i=0;i<vCount;i++)
    {
        console.log("正在观看第"+(i+1)+"个小视频");
        video_timing(i,vTime);//观看每个小视频
        if(i!=vCount-1){
            swipe(x,h1,x,h2,500);//往下滑
        }
    }
    back();
    delay(2);
}

/**
 * @description: 听“电台”新闻广播函数  (视听学习+视听学习时长)---6+6=12分
 * @param: null
 * @return: null
 */
function listenToRadio()
{
    click("电台");
    delay(2);
    click("听新闻广播");
    delay(2);
    click("中国之声");
    console.log("正在收听“中国之声”广播...");
    delay(2);
    back();
    delay(1);
}

/**
 * @description: 收藏加分享函数  (收藏+分享)---1+1=2分
 * @param: i-文章标号
 * @return: null
 */
function CollectAndShare(i)
{
    console.log("正在进行第"+(i+1)+"次收藏和分享...");

    var collectIcon = classNameContains("ImageView").depth(10).findOnce(0);//右下角收藏按钮
    collectIcon.click();//点击收藏
    delay(2);
    console.info("收藏成功!");
    var shareIcon = classNameContains("ImageView").depth(10).findOnce(1);//右下角分享按钮
    shareIcon.click();//点击分享

    while(!textContains("分享到学习强").exists());//等待弹出分享选项界面
    delay(2);
    click("分享到学习强国");
    delay(2);
    console.info("分享成功!");
    back();//返回文章界面
    delay(2);
}

/**
 * @description: 评论函数---2分
 * @param: i-文章标号
 * @return: null
 */
function comment(i)
{
    click("欢迎发表你的观点");//单击评论框
    console.log("正在进行第"+(i+1)+"次评论...");
    delay(1);
    var num=random(0,commentText.length-1)//随机数
    setText(commentText[num]);//输入评论内容
    delay(1);
    click("发布");//点击右上角发布按钮
    console.info("评论成功!");
    delay(2);
    click("删除");//删除该评论
    delay(2);
    click("确认");//确认删除
    console.info("评论删除成功!");
    delay(2);
}

//主函数
function main()
{
    auto.waitFor();//等待获取无障碍辅助权限
    console.show();//部分华为手机console有bug请注释本行
    console.setPosition(0,device.height/4);
    
    console.log("学习强国助手启动中...");
    if(!launchApp("学习强国"))//启动学习强国app
    {
        console.error("找不到学习强国App!");
    }
    while(!desc("学习").exists()){
        console.log("正在等待加载出主页...");
        delay(1);
    }
    delay(2);
    
    var start=new Date().getTime();//程序开始时间
    videoStudy();//看“百灵”小视频

    var r_start=new Date().getTime();//广播开始时间
    listenToRadio();//听电台新闻
    
    articleStudy();//学习文章，包含点赞分享和评论
    listenToRadio();
    var end=new Date().getTime();
    var radio_time=(parseInt((end-r_start)/1000));//剩余广播需收听时间
    radio_timing(parseInt((end-r_start)/1000),rTime-radio_time);//继续收听广播
    var end=new Date().getTime();

    console.log("运行结束,共耗时"+(parseInt(end-start))/1000+"秒");
}

main();