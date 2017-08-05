
## HTTP诞生
1989年为知识共享而诞生的Web，提出了3项WWW构建技术：  
1. 标准通用标记语言设为HTML（HyperText Markup Language，超文本标记语言）   
2. 文档传输协议HTTP（HyperText  Transfer Protocol，超文本传输协议）  
3. 文档定位URL（Uniform Resource Locator，统一资源定位符）  

## HTTP特点
- 无状态协议（不对请求和响应之间的通信状态进行保存，无法实现状态管理），所以后面引入Cookie和LocalStorage等技术。
- 请求方法有：GET（获取资源）、POST（传输实体主体）、PUT（传输文件）、HEAD（获得报文首部）、DELETE（删除文件）、OPTIONS（询问支持的方法）、TRACE（追踪路径）、CONNECT（要求用隧道协议连接代理）
- HTTP/1.1中，所有连接默认都是持久连接（keep-alive），即建立一次TCP连接后可以进行多次HTTP请求和响应
- 管线化，即可并行发送多个请求。
![浏览器并发数](http://upload-images.jianshu.io/upload_images/7008018-35756a46f8126f82.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
- **Cookie**：  
1）客户端发送请求报文；  
2）服务器生成包含Cookie信息的响应报文（Set-Cookie字段包含sid）；  
3）客户端发送带Cookie信息的请求报文（Cookie字段的sid）；  

## HTTP报文
- HTTP报文本身是由多行数据构成的字符串文本。  
- 请求报文与相应报文的结构  
![请求报文与相应报文的结构](http://upload-images.jianshu.io/upload_images/7008018-cc0fc15cb9f88d1f.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![报文实例](http://upload-images.jianshu.io/upload_images/7008018-71bc6e59918706c9.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)  
请求行：请求的方法、请求URI、HTTP版本  
状态行：表明响应结果的状态码、原因短语、HTTP版本  

![通用首部字段](http://upload-images.jianshu.io/upload_images/7008018-3085c0327586dae5.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![请求首部字段](http://upload-images.jianshu.io/upload_images/7008018-12bd39784374acee.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![响应首部字段](http://upload-images.jianshu.io/upload_images/7008018-00d11fbf9561921b.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
![实体首部字段](http://upload-images.jianshu.io/upload_images/7008018-217d9aa48a53ffcc.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


- 压缩传输的内容编码（gzip、compress、deflate、identity）、分割发送的分块传输编码  
- MIME（Multipurpose Internet Mail Extensions，多用途因特网邮件扩展）

## HTTP状态码
![HTTP状态码](http://upload-images.jianshu.io/upload_images/7008018-9ed5048326a862ca.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)  
1） 200 OK ；请求正常处理  
2） 204 No Content ；请求处理成功，但没有资源可返回
3） 206 Partial Content ； 客户端进行了范围请求，服务器成功处理  
4） 301 Moved Permanently ； 永久性重定向，即请求的资源已经被分配了新的URI  
5） 302 Found ； 临时重定向，即请求的资源临时被分配了新的URI  
6） 303 See Other ； 表示请求对应的资源存在着另一个URI，应使用GET方法定向获取  
7） 304 Not Modified ； 资源已找到，但未符合条件请求（与重定向无关）  
8） 307 Temporary Redirect ； 临时重定向  
9） 400 Bad Request ； 表示请求报文中存在语法错误  
10） 401 Unauthorized ； 表明请求需要通过HTTP认证，若之前已请求过一次，则表示用户认证失败  
11） 403 Forbidden ； 服务器拒绝该资源的访问  
12） 404 Not Found ； 服务器无法找到请求的资源  
13） 500 Internal Server Error ； 服务器发生内部错误  
14） 503 Service Unavailable ； 服务器超负荷，无法处理请求  
有些时候，状态码和状况会不一致

## HTTPS（HTTP over SSL，包括加密、认证、完整性保护）
- HTTP的缺点  
1）通信使用明文（不加密），内容可能会被窃听；—>加密  
2）不验证通信方的身份，可能遭遇伪装；—>验证身份  
例子：伪装的web服务器；伪装的客户端；无访问权限的通信方；无法判定无意义请求，可能遭受DoS攻击；  
3） 无法证明报文的完整性，内容可能遭遇篡改；  
- **加密**
  - 通信的加密、内容的加密  
  - 加密方式：对称密钥加密（共享密钥加密）、非对称密钥加密（公开密钥加密）  
**对称加密**：加密和解密使用相同的密钥；问题：密钥如何安全到达对方；  
**非对称加密**：一对密钥（公开密钥+私有密钥）；   
方式：服务器拥有一对密钥，当需要加密传输时，服务器将公开密钥分发给客户端，客户端利用公开密钥加密发送密文给服务器，服务器利用私有密钥解密；  
报文+公开密钥=密文；密文+公开密钥!=报文（技术上异常困难，离散对数求值）；  
非对称加密相比对称加密速度慢；  
  - **HTTPS采用混合加密机制**（非对称加密+对称加密）  
利用非对称加密 传输 对称加密时所需的 密钥，然后采用对称加密 传输主体；  

![HTTPS通信](http://upload-images.jianshu.io/upload_images/7008018-759db18e9e9f1829.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

  - 如何判断服务器发来的公开密钥的真实性？  
借用第三方数字认证机构（CA，Certificate Authority）  
1）服务器将自己的公开密钥登录至CA，申请公钥证书  
2）CA颁发公钥证书（公开密钥+CA数字签名）  
3）服务器向客户端发送公钥证书  
4）客户端利用浏览器内置的CA公钥验证 该公钥证书的 有效性  
5）客户端使用公开密钥对报文加密后发送  
  - MAC（Message Authentication Code）报文摘要检测报文的完整性  
  - 用以确认客户端的客户端证书  
用户得自行安装客户端证书，一般用于网上银行  
- 补充：抓包工具：wireshark，tcpdump  

## web安全
- 主动攻击：
SQL注入攻击、
OS命令注入攻击（利用web应用的漏洞）
- 被动攻击：  
跨站脚本XSS（在正规网站的URL查询字段中加入script标签，使客户端在浏览正规网站的同时，运行JS代码）、  
跨站点请求伪造（CSRF）、  
HTTP首部注入（攻击者在响应首部字段内插入换行，添加任意响应首部或主体）、  
邮件首部注入攻击  
其他攻击：DoS攻击（拒绝服务攻击，向服务器发送大量请求，造成服务器资源过载）  
DDoS（分布式拒绝服务攻击，常利用感染病毒的计算机作为攻击者的攻击跳板）   