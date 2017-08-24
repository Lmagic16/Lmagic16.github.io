# 前端知识点扩展7—AJAX请求、跨域、垃圾回收、严格模式、标准与混杂模式
日期：8.3 
内容：AJAX请求、跨域、垃圾回收、严格模式、标准与混杂模式

## AJAX请求  
1. 创建XMLHttpRequest对象;  
2. open(请求类型，请求的URL，是否异步发送请求)方法 启动一个http请求；
3. 设置响应HTTP请求状态变化的函数；
4. send() 方法 发送请求；
5. 获取响应数据（判断XHR对象的readyState状态属性 or 触发load事件）；
6. JS操作DOM将数据渲染到页面；
<pre>
var xhr = new XMLHttpRequest();
xhr.open("get","https://api.github.com",true);
xhr.send(null);

// load事件为XMLHttpRequest2 中接收到完整的响应数据时触发
// XMLHttpRequest中为readystatechange事件中 判断readyState属性为4，即为已接收到全部响应。
xhr.onload = function(){
	if((xhr.status >=200 && xhr.status < 300) || (xhr.status == 304)){
		console.log(xhr.responseText);
	}else{
		console.log("Request was unsuccessful: " + xhr.status);
	}
}
</pre>
**同源策略**：XHR对象只能访问 相同的域，相同的端口，相同的协议 的资源。

## 跨域
**跨域解决方案**：  
1. CORS（Cross-Origin Resource Sharing，跨域源资源共享），IE8通过XDomainRequest对象支持CORS，其他浏览器通过XHR对象原生支持CORS。  
2. JSONP（JSON with padding）  
原理：利用script标签没有跨域限制的特点，客户端将script脚本的src设置为服务器的请求地址。服务器会返回一段js代码，并在本地执行，形如：```callback({"name":"Nicholas"});```，一个带参数的函数，这个参数就是需要请求的json数据。这个函数名是服务器端根据客户端发过去的数据动态设置的（原理是字符串拼接）。而这个函数会事先在本地声明如何处理json数据。    
优点：简单易用；支持浏览器与服务器双向通信；  
缺点：不安全，由于JSONP是从其他域中加载代码执行；难以确定请求是否失败；只支持GET请求；    
[网络上的解释](http://kb.cnblogs.com/page/139725/)       

3.其他方法：如html5中postMessage方法，window.name，document.domain 

## 垃圾回收
原理：找出不再使用的变量，然后释放其占用的内存（垃圾收集器周期性地执行）  
方法：  
1. 标记清除：目前主流的垃圾收集算法，将当前不使用的值加上标记，然后进行内存回收。  
2. 引用计数：记录所有值被引用的次数，当引用次数为0时，进行内存回收。存在的问题：循环引用会导致内存泄露。所以最好手动解除引用。  

性能问题：垃圾收集器的执行间隔：IE6根据内存分配量运行，当内存量大时，一般整个程序所需要的内存量就很大，这样会造成垃圾收集器的频繁执行。IE7重写了之后采用的规则：触发垃圾收集的临界值动态变化。初始触发垃圾收集的临界值与IE6相同，若回收的内存分配量低于15%，则临界值加倍；若回收的内存分配量大于85%，则临界值保持不变。  

## 严格模式 'use strict';   
[MDN文档](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode)    
可以应用于整个脚本，或者单个函数    
 1. 使用未声明的变量，会抛出ReferenceError；非严格模式下会新创建一个全局变量。    
![严格模式1](http://upload-images.jianshu.io/upload_images/7008018-0744fedf63eb89b9.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)  
 2. 任何在正常模式下引起静默失败的赋值操作 (给不可写属性赋值, 给只读属性赋值, 给不可扩展对象的新属性赋值) 都会抛出异常.  
 3. 在严格模式下, 试图删除不可删除的属性时会抛出异常(之前这种操作不会产生任何效果)
![严格模式2](http://upload-images.jianshu.io/upload_images/7008018-9e99dd43c2314088.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)  
 4. 在函数内使用严格模式，若该函数单独调用，则函数内的this不能默认绑定全局对象，this会返回undefined。  
 5. with在严格模式下会被禁止，eval的功能也会受影响。  
 6.  严格模式要求函数的参数名唯一，函数有重名的参数将报错，而在非严格模式中，后面的同名参数将覆盖前面的。  
 7. 严格模式禁止八进制数字语法  

## 标准与混杂模式  
[W3school](http://www.w3school.com.cn/tags/tag_doctype.asp)  
HTML5中是<!DOCTYPE html>  
如果在文档开始处没有文档类型声明，则默认 混杂模式。  
混杂模式：不可取，宽松的向后兼容的方式显示。  
标准模式：浏览器按 W3C 标准解析执行代码。  