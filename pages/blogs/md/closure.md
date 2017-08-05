# 前端知识点整理3—作用域、闭包、模块
日期：7.27   
内容：作用域、闭包、模块

## 作用域
- 作用域：根据名称查找变量的一套规则。
- 编译的三个阶段：  
1\. 词法分析：将字符组成的字符串分解成有意义的代码块，这些代码块被称为词法单元（token）。  
2\. 语法分析：将词法单元流数组，转换成一个由元素逐级嵌套组成的“抽象语法树”（AST）。  
3\. 代码生成：将AST转换为可执行的代码（机器指令）。   
JS引擎在2和3阶段都会进行性能优化，大部分情况下编译发生在代码执行前的几微妙。  
- 变量的赋值：1）编译器在当前作用域中声明一个变量；2）运行时引擎会在作用域中查找该变量，然后赋值；  
- **LHS查询：**当需要赋值的时候，去查找赋值的目标（变量是否声明）  
- **RHS查询**：当需要获取变量的值时，去查找其源头（根据变量容器取变量值）  
- 遍历嵌套作用域链的规则：从当前作用域开始，向上一级层层查找，直到最外层的全局作用域。  
- RHS引用找不到变量，会抛出ReferenceError异常；RHS引用找到变量后对变量进行不合理操作，会抛出TypeError异常；LHS引用不成功会导致隐式创建全局变量（非严格模式）  
- JS只有词法作用域，即书写代码时各自的位置决定；但是this表现得像动态作用域；  
- 欺骗词法作用域：eval()和with，导致JS引擎无法在编译时优化，性能下降，最好不用。  
- 我理解的JS作用域：全局作用域，函数作用域，ES6中新增let和const块作用域；函数作用域（软件设计中，最小限度暴露必要内容，访问权限，规避命名冲突）  
- 回调参数中的匿名函数表达式  
- 立即执行函数表达式
- let块作用域中的声明不会提升
- 特殊：try/catch中catch分句会创建一个块作用域，with块作用域

## 提升
- 提升：所有的声明（变量和函数）都会被“移动”到各自作用域的最顶端
- 声明会被提升，赋值和其他运行逻辑会留在原地
- ```var a = 2;``` 时，JS会将其看成```var a;```和```a = 2;``` 第一个会在编译阶段进行提升，第二个赋值声明会被留在原地等待执行。
- 每个作用域都会进行提升操作
- 函数声明会被提升，但函数表达式不会被提升
- 函数声明先被提升，然后才是变量声明提升
- 后面的函数声明会覆盖前面的函数声明

## 闭包
- 通俗理解：  
1）在函数A内部定义一个函数B，函数B作用域链包含了函数A作用域，函数B可以记住其所在的此法作用域，不会被垃圾回收（创建闭包）；  
2）函数B在本身词法作用域外执行，即访问1）中记住的词法作用域（使用闭包）；  
- 缺点：由于闭包作用域不会被垃圾回收，内存占用。
- 优点：可以保留外部作用域对一个变量的私有引用；设计私有的方法和变量；避免全局变量的污染；
- 实例：  
1）闭包函数作为函数参数传递给setTimeout()  
```  
function wait(message) {
	 setTimeout( function timer(){
		 console.log( message );
	 }, 1000 );
 }
 wait( "Hello, closure!" );
```  
2）在定时器、事件监听器、Ajax请求、跨窗口通信中，只要使用了回调函数，实际上就是在使用闭包。
```
function setupBot(name,selector) {
	$( selector ).click( function activator(){
		console.log( "Activating: " + name );
	} );
}
setupBot( "Closure Bot 1", "#bot_1" );
setupBot( "Closure Bot 2", "#bot_2" );
```
- **经典例子**
1）
```
for (var i=1; i<=5; i++) {
	setTimeout( function timer(){
		console.log( i );
	}, i*1000 );
}
```
输出是每秒一次的频率输出6,6,6,6,6
i\*1000是每次都会计算，即1000，2000，3000，4000，5000
我的理解：setTimeout()为异步方式，所以for循环会在很短的时间内执行完5次循环，第一次执行setTimeout(func,1000)，将会设定一个1秒的定时器，1秒之后会将func函数加入到事件队列中；第二次执行setTimeout(func,2000)，将会设定一个2秒的定时器，2秒之后会将func函数加入到事件队列中；这样输出的频率为1秒。由于for循环为同步方式，所以事件队列会等同步事件执行完再执行。而当事件队列中执行console.log(i)时，当前i会访问外层作用域，即for循环中i的值，即为6。
备注：如果setTimeout()函数中，i\*1000改为0，则结果为同时输出6,6,6,6,6
问题：这里只有一个闭包作用域，如果要打印出1，2，3，4，5得要这5个延迟函数，分别引用不同的i，也就是不同的作用域。所以需要创建不同的作用域。
**改写方式1**：立即执行函数能创建作用域
```
for (var i=1; i<=5; i++) {
	(function(){
		var j = i;
		setTimeout( function timer(){
			console.log( j );
		}, j*1000 );
	})();
}
```
或者
```
for (var i=1; i<=5; i++) {
	(function(j){
		setTimeout( function timer(){
			console.log( j );
		}, j*1000 );
	})( i );
}
```
输出：每秒一次的频率输出0,1,2,3,4,5
**改写方式2**：let可劫持块作用域
```
for (var i=1; i<=5; i++) {
	let j = i; // 闭包的块作用域
	setTimeout( function timer(){
		console.log( j );
	}, j*1000 );
}
```
或者：for(let=i; ;)每次迭代都会产生新的let块作用域
```
for (let i=1; i<=5; i++) {
	setTimeout( function timer(){
		console.log( i );
	}, i*1000 );
}
```
输出：每秒一次的频率输出0,1,2,3,4,5  
相关链接：  
[闭包面试题](http://mp.weixin.qq.com/s?__biz=MzAxODE2MjM1MA==&mid=2651552304&idx=2&sn=6abd16cf650f64cdcc12abfbb6231cbc&chksm=8025adf1b75224e789d21d12750949d3d4e9428b7f5add79aab6945c7d98cf1549da17a2b337&mpshare=1&scene=23&srcid=0729WeoziBvRKNSgKvHuBd9a#rd)
**相关知识**：
1.普通函数：
```
function compare(value1,value2){
	if(value1 < value2){
		return -1;
	}else if(value1 > value2){
		return 1;
	}else{
		return 0;
	}
}
var result = compare(5,10);
```
![函数执行时的作用域链](http://upload-images.jianshu.io/upload_images/7008018-e2bf0b3e455a59de.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)  
解释：在创建/声明compare()函数时，会创建一个预先包含全局变量对象的作用域链；当执行函数/函数被调用时，会创建一个执行环境及相应的作用域链，并且创建本地活动对象，并将其推入作用链前端；当compare()函数执行完毕后，执行环境的作用域链被销毁，compare()的活动对象已没用（标记清除或引用计数），最后被垃圾回收。
2.闭包函数  
```
function createComparisonFunction(propertyName){
	return function(object1,object2){
		var value1 = object1[propertyName];
		var value2 = object2[propertyName];
		if(value1 < value2){
			return -1;
		}else if(value1 > value2){
			return 1;
		}else{
			return 0;
		}
	};
}
var compareNames = createComparisonFunction("name");
var result = compareNames({name:"Nicholas"},{name:"Greg"});
compareNames = null; // 解除引用
```

![闭包函数执行时的作用域链](http://upload-images.jianshu.io/upload_images/7008018-0eb9b6b8c5728346.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
解释：当createComparisonFunction()函数执行完毕后，其执行环境的作用链被销毁，但是其活动对象依然被保留在内存中，还存在引用。直到匿名函数被销毁后，createComparisonFunction()的活动对象才会被销毁。


## 模块  
- 模块函数内：声明私有变量和内部函数；内部函数可访问私有变量；返回对象，其属性为内部函数。
```
function CoolModule() {
	var something = "cool";
	var another = [1, 2, 3];

	function doSomething() {
		console.log( something );
	}

	function doAnother() {
		console.log( another.join( " ! " ) );
	}

	return {
		doSomething: doSomething,
		doAnother: doAnother
	};
}
var foo = CoolModule();
foo.doSomething(); // cool
foo.doAnother(); // 1 ! 2 ! 3
```
备注：模块函数也可直接返回内部函数，例如jQuery中的$标识符就是jQuery模块的公共API。
- **单例模式**
当只需要一个实例时
```
var foo = (function CoolModule() {
	var something = "cool";
	var another = [1, 2, 3];

	function doSomething() {
		console.log( something );
	}

	function doAnother() {
		console.log( another.join( " ! " ) );
	}

	return {
		doSomething: doSomething,
		doAnother: doAnother
	};
})();

foo.doSomething(); // cool
foo.doAnother(); // 1 ! 2 ! 3
```
备注：将模块函数，改为立即执行函数。