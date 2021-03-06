# 前端知识点扩展8—访问URL之后、setInterval、前后端分离
日期：8.2  
内容：访问URL之后发生了什么、setInterval 

## 访问URL之后发生了什么  
[github回答](https://github.com/skyline75489/what-happens-when-zh_CN)  
[segmentfault的回答](https://segmentfault.com/a/1190000000697254)  
1. 解析URL（获得域名或IP地址）  
URL的构成：协议+主机名+目录+片段标识符(带#符号)，例如http://www.lmagic.site/home/#hashinfo  
若URL 中没有给出端口号，则采用默认端口号（http 协议默认端口号是 80， https 默认端口号是 443）  
2. DNS域名解析（域名—>IP地址）  
- 检查浏览器缓存  
- 检查本地Hosts缓存 
- 向DNS 服务器发送查询请求：使用 53 端口向 DNS 服务器发送 UDP 请求包，如果响应包太大，会使用 TCP 协议，如果本地/ISP DNS 服务器没有找到结果，它会发送一个递归查询请求，一层一层向高层 DNS 服务器做查询，直到查询到起始授权机构，如果找到会把结果返回。   
3. 层层封装请求报文   
   - 请求一个 TCP流套接字，这个请求先被交给传输层，在传输层请求被封装成 TCP 报文，报文头部包括源端口和目的端口，源端口会在系统内核的动态端口范围内选取。  
   - TCP报文发送到网络层，加上ip头部信息封装为ip报文，包括源ip地址和目的ip地址。   
4. 建立网络连接  
   - 主机根据目的ip查询路由表，决定从哪个网卡端口转发出去。  
   - ip报文会被发送到链路层，并封装为链路层的报文。  
   - 若目标服务器和主机在同一个子网内，主机通过ARP地址解析协议找到目标服务器的mac地址，并与之建立连接。  
   - 若目标服务器和主机不在同一个子网内，主机通过ARP地址解析协议找到网关的mac地址，并将报文发送到网关，经由网关发往目标服务器。  
   - 请求报文经过网络中路由的寻址转发，最后达到目的服务器。  
   - 目标服务器层层解包，获取请求信息。  
 5. 上述为一次TCP的连接，而网络连接的建立，需要TCP三次握手。最后建立网络连接。   
 6. HTTP 服务器请求处理（浏览器获得资源）  
   - 服务器把请求解析为 请求方法、域名、资源路径等，根据请求，返回相应的资源（HTML，CSS，JS，图片等）
 7. 解析  
   - HTML解析生成DOM文档树  
   - 加载css、js等外部文件  
   - CSS解析为样式表对象  
 8. 渲染  
   - 遍历DOM树，计算每个节点的CSS样式值，宽度高度等，然后构建坐标，层处理；然后进行GPU图形渲染。  
 9. 当页面内容和布局需要改变时，产生又一轮渲染与绘制。  

## 浏览器的组件
- **用户界面** 用户界面包含了地址栏，前进后退按钮，书签菜单等等，除了请求页面之外所有你看到的内容都是用户界面的一部分
- **浏览器引擎** 浏览器引擎负责让 UI 和渲染引擎协调工作
- **渲染引擎** 渲染引擎负责展示请求内容。如果请求的内容是 HTML，渲染引擎会解析 HTML 和 CSS，然后将内容展示在屏幕上
- **网络组件** 网络组件负责网络调用，例如 HTTP 请求等，使用一个平台无关接口，下层是针对不同平台的具体实现
- **UI后端** UI 后端用于绘制基本 UI 组件，例如下拉列表框和窗口。UI 后端暴露一个统一的平台无关的接口，下层使用操作系统的 UI 方法实现
- **Javascript 引擎** Javascript 引擎用于解析和执行 Javascript 代码
- **数据存储** 数据存储组件是一个持久层。浏览器可能需要在本地存储各种各样的数据，例如 Cookie 等。浏览器也需要支持诸如 localStorage，IndexedDB，WebSQL 和 FileSystem 之类的存储机制

## setTimeout与setInterval区别
- setTimeout()是设定一个定时器，当定时器到时后，环境会把回调函数放到事件循环中。如果此时事件队列中有多个事件，那么该回调就会等待，所以setTimeout定时器的精度可能不高，只能确保回调函数不会在指定的时间间隔之前运行。  
- setInterval()是设定间隔定时器，假如间隔为1秒。就是从当前开始，每隔1秒将回调函数加入到事件循环中。并不是意味着函数执行的时间间隔为1秒。所以setIntervel具有累积效应，若某个操作特别耗时，超过了时间间隔，那么加入到事件队列中的事件就会被累积起来，然后会在很短的时间内被连续触发，这样就有可能造成性能问题，比如集中触发ajax请求。  
- 结论：最好使用setTimeout超时调用来模拟setInterval间隔调用。  
- HTML5标准规定，setInterval的最短间隔时间是10毫秒，也就是说，小于10毫秒的时间间隔会被调整到10毫秒。  

## web前后端分离的意义