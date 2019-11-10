//卸载应用
var appName = rawInput('请输入要卸载的应用名称');//输入应用名称
var packageName = getPackageName(appName);//获取应用包名
if(!packageName){
    toast("应用不存在！");
}else{
    app.uninstall(packageName);    //卸载应用
}
