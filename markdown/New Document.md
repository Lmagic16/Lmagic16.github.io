#记录一次Jekyll建站过程#
##安装jekyll##
所有安装信息来源：  
1.[http://holbrook.github.io/2013/05/27/2013-05-27-jekyll_mysite.html#guan-yu-jekyll](http://holbrook.github.io/2013/05/27/2013-05-27-jekyll_mysite.html#guan-yu-jekyll)  
2.[http://stackoverflow.com/questions/22460117/error-error-installing-jekyll-error-failed-to-build-gem-native-extension](http://stackoverflow.com/questions/22460117/error-error-installing-jekyll-error-failed-to-build-gem-native-extension)  
3.[https://www.panxw.com/posts/ububtu-ruby2-install.html](https://www.panxw.com/posts/ububtu-ruby2-install.html)  
安装环境为ubuntu14.04  
安装jekyll所需依赖：  
- ruby版本2.0.0以上  
- gem为对应版本
- rvm(可选)(RVM（Ruby Version Manager）是一种在单个操作系统上安装和管理多个Ruby版本的工具。)

   
1.安装ruby  
    `sudo apt-get install ruby`  
但是默认安装的版本是1.9.3  
2.安装rvm版本管理工具
    `\curl -L https://get.rvm.io | bash -s stable --rails --autolibs=enabled`  
3.安装了ruby2.4.0版本  
rvm install 版本号  
4.所以系统同时存在两种版本的ruby，查看版本  
    ![](http://i.imgur.com/wcxkr2U.jpg)   
	`$ rvm list `  
![](http://i.imgur.com/hv30d78.jpg)  
5.利用rvm修改默认的ruby版本  
    `rvm use 2.4.0 --default`  
![](http://i.imgur.com/ZUhS0xV.jpg)  
6.更新gem  
    `gem update --system`  
    `gem pristine --all`
再查看一次版本：  
![](http://i.imgur.com/LYy71tM.jpg)  
7.安装jekyll  
报错：说ruby版本号必须大于2.0.0  
于是按照[http://stackoverflow.com/questions/33503796/error-installing-jekyll-requires-ruby-2-0-0](http://stackoverflow.com/questions/33503796/error-installing-jekyll-requires-ruby-2-0-0)中所述方法，将ruby链接修改了，于是  
![](http://i.imgur.com/jDx0CM1.jpg)  
再安装jekyll，出现新问题  
![](http://i.imgur.com/UhZG58W.jpg)
搜索得知可能是源的问题，对原有的taobao源进行了修改  
按照[http://www.jianshu.com/p/6ae07d566331](http://www.jianshu.com/p/6ae07d566331)方法对源修改之后，更新了gem，然后再安装jekyll  
但是又出现同样的问题，所以再查询得知，还是源的问题，所以按照[http://stackoverflow.com/questions/14678573/rails-installing-a-gem-hostname-does-not-match-the-server-certificate](http://stackoverflow.com/questions/14678573/rails-installing-a-gem-hostname-does-not-match-the-server-certificate)，新加了源`gem sources --add https://rubygems.org/`，之后再安装jekyll，终于成功了。  
![](http://i.imgur.com/ciBBwlg.jpg)  
##使用jekyll##
但是在jekyll new 目录名 时报错。  
![](http://i.imgur.com/8xd1At5.jpg)
由于没有添加系统路径，所以jekyll不能在终端命令行执行。  
1.添加系统路径  
查看gem路径
![](http://i.imgur.com/Aa7NiwA.jpg)
暂时添加路径 
  ![](http://i.imgur.com/7Fp9i3F.jpg)
再执行jekyll new 目录名时成功  
![](http://i.imgur.com/1cqe0g7.jpg)
在已创建的目录mysite下$jekyll server没问题  
![](http://i.imgur.com/EOUO0Ld.jpg)  
查看网站  
![](http://i.imgur.com/y7yzdw3.jpg)
于是永久修改系统路径：  
在文件/etc/profile文件内增加export PATH=$PATH:/home/lmagic/.rvm/gems/ruby-2.4.0/bin内容。






