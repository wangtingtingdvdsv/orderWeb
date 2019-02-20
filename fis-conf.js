fis.config.merge({
    deploy : {
        //使用fis release --dest remote来使用这个配置
        remote : {
            receiver : 'http://120.79.192.19:3997/cgi-bin/release',
            from : '/dist/',
            subOnly:'true',//subOnly 参数  默认上传 from 整个目录到测试机。添加 subOnly 参数仅上传 from 目录下文件。
            to : '/wangtingting/project/orderWeb',
        }
    }
});

fis.config.set('roadmap.path',[
    {
        reg : '*.*',
        useCache: false
    }
]);
