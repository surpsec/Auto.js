
console.show();
auto.waitFor();

showv();

function showv(){
    app.sendEmail({
        email: ["2296582473@qq.com","3096585932@qq.com"],
        subject: "这是一个邮件标题",
        text: "这是邮件正文"
    });
    
}
exit();