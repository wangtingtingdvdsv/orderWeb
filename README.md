
**项目中遇到的一些坑**


1 .今天在windows下安装mysql，在启动时出现了发生‘系统错误 1067’的错误。

当出现这个错误后，进入计算机管理->事件查看器->管理事件的摘要，找到MySQL查看最新的错误。

点击错误以后在常规一栏会列出错误信息



我的错误信息是:

Can't find messagefile 'D: oftware\database\mysql-5.6\share\errmsg.sys'



这个错误对应得实my.ini中的配置项：

basedir=D:\software\mysql-5.6

当时拿到的这个错误信息的时候我去我的安装目录下查看，我的确有这个errmsg.sys这个文件，再仔细观察错误后发现这个错误有些问题啊，这个路径是不正确的啊。D：oftware

我有目录D:\software ,但是我的\s去哪儿了，\s是一个转义字符啊，我在my.ini中的设置是basedir=D:\software\mysql-5.6\，并没有对\s进行转义。然后改为
basedir=D:\\software\mysql-5.6，记得转义啊！！！！
