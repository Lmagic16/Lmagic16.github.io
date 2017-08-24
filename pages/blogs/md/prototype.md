# 前端知识点6—原型、继承、设计模式
日期：7.29  
内容：原型、继承、设计模式 

## 对象  
- 对象可以通过：对象字面量和构造形式 定义。  
- 对象的属性名是字符串，如果使用非字符串（包括数字）作为属性名，那么他会被转换为一个字符串。
- 可计算属性名（ES6新增）：即可在文字形式中，使用[ ]包裹一个表达式来当作属性名
<pre>
var prefix = "foo";

var myObject = {
	[prefix + "bar"]: "hello",
	[prefix + "baz"]: "world"
};

myObject["foobar"]; // hello
myObject["foobaz"]; // world
</pre>
- 复制对象，ES6中定义了Object.assign()方法来实现浅复制。
- 属性类型：数据属性，访问器属性
- **数据属性**的属性描述符：  
1\. value（包含这个属性的数据值），默认为undefined；  
2\. writable（属性值是否可修改）。默认为true；  
3\. configurable（是否可配置），将configurable修改为false是单向操作，并且某属性configurable为false的情况下，该属性不可被delete删除。默认为true；  
4\. enumerable（是否可枚举），用户定义的所有普通属性默认都是enumerable。默认为true；  
- **访问器属性**的属性描述符：  
1\. configurable；  
2\. enumerable；  
3\. get，在读取属性时调用的函数。默认为undefined；  
4\. set，在写入属性时调用的函数。默认为undefined；  
- 访问器属性只能使用Object.defineProperty()来定义；  
Object.defineProperty()配置单个属性；  
Object.defineProperties()定义多个属性；  
getOwnPropertyDescriptor()获取属性描述符；  
- Object.preventExtensions(obj); 禁止obj对象添加新属性并且保留已有属性；  
Object.seal(obj); 将obj对象密封，不能添加新属性，也不能重新配置或删除现有属性（实现方式：Object.preventExtensions(obj)  +  configurable:false）；  
Object.freeze(); 会创建一个冻结对象，无法修改属性值（实现方式：Object.seal()  +  writable:false）；  
- 对象属性检查与获取：  
![对象属性检查](http://upload-images.jianshu.io/upload_images/7008018-f92c71d0369e6d66.JPG?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)  

## 创建对象
- 1.使用**Object构造函数**或者**对象字面量**  
缺点：大量重复代码  

- 2.**工厂模式**  
缺点：对象没有类型名称，都是属于Object  
<pre>
function createPerson(name, age, job){
    var o = new Object();
    o.name = name;
    o.age = age;
    o.job = job;
    o.sayName = function(){
        alert(this.name);
    };    
    return o;
}

var person1 = createPerson("Nicholas", 29, "Software Engineer");
var person2 = createPerson("Greg", 27, "Doctor");

person1.sayName();   //"Nicholas"
person2.sayName();   //"Greg"
</pre>

- 3.**构造函数模式**  
特点：对象有类名，但是内部方法不能共享，每新创建一个实例，就会创建新的函数。  
<pre>
function Person(name, age, job){
    this.name = name;
    this.age = age;
    this.job = job;
    this.sayName = function(){
        alert(this.name);
    };    
}

var person1 = new Person("Nicholas", 29, "Software Engineer");
var person2 = new Person("Greg", 27, "Doctor");

person1.sayName();   //"Nicholas"
person2.sayName();   //"Greg"

alert(person1 instanceof Object);  //true
alert(person1 instanceof Person);  //true
alert(person2 instanceof Object);  //true
alert(person2 instanceof Person);  //true

alert(person1.sayName == person2.sayName);  //false
</pre>
编码规范：用于构造的函数首字母大写。  
任何函数都可能被用作构造函数，当函数被new操作符“构造调用”时，会执行下面操作：  
1. 创建一个新对象（若该函数不是JS内置的，则创建一个新的Object对象）；  
2. 将this绑定到这个对象；  
3. 执行构造函数中的代码（为这个新对象添加属性）；  
4. 若函数没有返回其他对象，则自动返回这个新对象； 若函数有返回其他对象，则返回这个其他对象；若函数有return返回的是非对象，则还是自动返回这个新对象，即覆盖那个非对象；  

解决函数不能共用：1）将函数声明在全局作用域中，在构造函数中引用它，但这样就没有封装性；2）原型模式；
 
- 4.**原型模式**  
见后文原型对象  
优点：可自定义引用类型，有类型名，属性和方法可共享；  
缺点：引用类型值的属性，在共享时的问题（按引用访问，值可变）；  
<pre>
function Person(){
}

Person.prototype = {
    constructor: Person,
    name : "Nicholas",
    age : 29,
    job : "Software Engineer",
    friends : ["Shelby", "Court"],
    sayName : function () {
        alert(this.name);
    }
};

var person1 = new Person();
var person2 = new Person();

person1.friends.push("Van");

alert(person1.friends);    //"Shelby,Court,Van"
alert(person2.friends);    //"Shelby,Court,Van"
alert(person1.friends === person2.friends);  //true
</pre>
 
- 5.**构造函数模式+原型模式**  
构造函数模式用于定义实例属性，原型模式用于定义方法和共享属性；此外还支持构造函数传递参数。  
<pre>
function Person(name, age, job){
    this.name = name;
    this.age = age;
    this.job = job;
    this.friends = ["Shelby", "Court"];
}

Person.prototype = {
    constructor: Person,
    sayName : function () {
        alert(this.name);
    }
};

var person1 = new Person("Nicholas", 29, "Software Engineer");
var person2 = new Person("Greg", 27, "Doctor");

person1.friends.push("Van");

alert(person1.friends);    //"Shelby,Court,Van"
alert(person2.friends);    //"Shelby,Court"
alert(person1.friends === person2.friends);  //false 实例自己的
alert(person1.sayName === person2.sayName);  //true 共享的
</pre>
- 6.寄生构造函数模式（工厂模式+new）、稳妥构造函数模式（禁用this和new） 

## 原型对象
- 任何函数都有prototype属性，指向它的原型对象（实例化时有用）；其原型对象会继承Object所有方法，其constructor指向构造函数；通过prototype属性定义的属性和方法（在原型对象上定义的属性和方法），会被共享（被 利用new 构造函数所创建的实例  共享），所有的实例访问的是同一组属性和方法；  
- 当new调用构造函数会创建新实例，该实例内部包含一个内部属性[[Prototype]]，指向构造函数的原型对象（松散连接）；构造函数内的属性和方法是实例属性和方法，而原型对象中的属性和方法是通过引用共享；
- JS中的引用类型都是从Object继承而来。
- 读取对象的属性时，先搜索自身，再搜索原型对象。
![原型对象](http://upload-images.jianshu.io/upload_images/7008018-546fe85143900263.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)  
上图中：  
判断原型对象  
 ```console.log(Person.prototype.isPrototypeOf(person1)); // true```  
获取原型对象  
 ```console.log(Object.getPrototypeOf(person1) == Person.prototype); //true```
- Object对象的属性和方法：  
1\. constructor 属性  
2\. 对象名.hasOwnProperty(propertyName)；实例中查找  
3\. isPrototypeOf(object)  
4\. propertyIsEnumerable(propertyName)  
5\. toLocalString()  ， 返回对象的字符串表示  
6\. toString() ， 返回对象的字符串表示  
7\. valueOf() ， 返回对象的字符串、数值或布尔值表示  
- 实例与原型对象的松散连接关系  
<pre>
function Person(){
}

// 对象字面量创建了一个新的原型对象，而不是原来的那个原型对象。
Person.prototype = {
    constructor : Person, // 这个新原型对象的constructor属性不是指向Person，所以得重新设置。
    name : "Nicholas",
    age : 29,
    job: "Software Engineer",
    sayName : function () {
        alert(this.name);
    }
};

var friend = new Person();

alert(friend instanceof Object);  //true
alert(friend instanceof Person);  //true
alert(friend.constructor == Person);  //true
alert(friend.constructor == Object);  //false
</pre>
<pre>
function Person(){
}

var friend = new Person(); //指向原来的原型对象

Person.prototype = {
    constructor : Person, 
    name : "Nicholas",
    age : 29,
    job: "Software Engineer",
    sayName : function () {
        alert(this.name);
    }
};

friend.sayName(); //error
</pre>
- 可以对原生对象（String、Array等）的原型定义新方法，但不推荐该做法。
<pre>
String.prototype.startsWith = function (text) {
            return this.indexOf(text) == 0;
        };
</pre>
- 原型对象的问题：引用类型的属性共享。
- JS中所有对象都有[[Prototype]]内置属性，在对象上进行属性查找时，会访问对象的[[Prototype]]链。
- 所有普通的[[Prototype]]链，最后都会指向内置的Object.prototype。
- Object.getPrototypeof(obj)，获得对象obj的原型对象

## 继承
- JS中只有实现继承（继承实际的方法），不支持接口继承（只继承方法签名；由于JS中函数没有签名，那些函数名都是指向函数实体的引用）
- **原型链继承**  
缺点：  
1）父类的实例属性也被继承在子类的原型中，会变成子类实例的共享属性，若这些共享属性为引用类型值（可变），会有问题。  
2） 创建子类实例时，不能向父类构造函数传递参数。  
<pre>
function SuperType(){
    this.property = true;
}

SuperType.prototype.getSuperValue = function(){
    return this.property;
};

function SubType(){
    this.subproperty = false;
}

//将父类的实例赋值给子类的原型对象，但问题是父类的实例属性会变成子类实例的共享属性。
SubType.prototype = new SuperType();

SubType.prototype.getSubValue = function (){
    return this.subproperty;
};

var instance = new SubType();
alert(instance.getSuperValue());   //true

alert(instance instanceof Object);      //true
alert(instance instanceof SuperType);   //true
alert(instance instanceof SubType);     //true

alert(Object.prototype.isPrototypeOf(instance));    //true
alert(SuperType.prototype.isPrototypeOf(instance)); //true
alert(SubType.prototype.isPrototypeOf(instance));   //true
</pre>
原型链如下图所示：  
![原型链图](http://upload-images.jianshu.io/upload_images/7008018-f5b9524870936295.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)    

- **借用构造函数**   
在子类的构造函数中执行父类的构造函数  
<pre>
function SuperType(name){
    this.name = name;
}

function SubType(){  
    // 继承了SuperType，同时还传递了参数
    SuperType.call(this, "Nicholas");
    
    //实例属性
    this.age = 29;
}

var instance = new SubType();
alert(instance.name);    //"Nicholas";
alert(instance.age);     //29
</pre>
- **组合继承**（原型链+借用构造函数，常用的） 
通过原型链实现对原型属性和方法的继承（函数复用）， 
通过借用构造函数实现实例属性的继承（每个实例有自己的属性）。  
<pre>
function SuperType(name){
    this.name = name;
    this.colors = ["red", "blue", "green"];
}

SuperType.prototype.sayName = function(){
    alert(this.name);
};

function SubType(name, age){  
    // 继承属性
    SuperType.call(this, name);
    this.age = age;
}
 // 继承方法
SubType.prototype = new SuperType();

SubType.prototype.sayAge = function(){
    alert(this.age);
};

var instance1 = new SubType("Nicholas", 29);
instance1.colors.push("black");
alert(instance1.colors);  //"red,blue,green,black"
instance1.sayName();      //"Nicholas";
instance1.sayAge();       //29

var instance2 = new SubType("Greg", 27);
alert(instance2.colors);  //"red,blue,green"
instance2.sayName();      //"Greg";
instance2.sayAge();       //27
</pre>

- **原型式继承**
<pre>
function Foo(name) {
	this.name = name;
}

Foo.prototype.myName = function() {
	return this.name;
};

// 这里Foo函数内的this绑定到call( this, name )中的this对象，但这个this对象取决于Bar()的调用方式。
function Bar(name,label) {
	Foo.call( this, name );
	this.label = label;
}

// 创建了一个新的Bar.prototype对象并关联到Foo.prototype
// 这里与Bar.prototype = new Foo()的区别是父类的实例属性不用变成子类实例的共享属性
Bar.prototype = Object.create( Foo.prototype );

// 现在没有Bar.prototype.constructor属性，若需要则手动修复
Bar.prototype.myLabel = function() {
	return this.label;
};

var a = new Bar( "a", "obj a" );

a.myName(); // "a"
a.myLabel(); // "obj a"
</pre>
个人理解：为了形成原型链，子类的原型对象需要指向（关联）父类的原型对象。直接使用subObj.prototype = obj.prototype是不会产生子类原型对象。
而本身子类的原型对象在构造函数时已有，但是其没有关联父类原型，无法在其基础上增加引用线，这是引擎的工作，只能新创建一个原型对象。  
![create原型继承实现](http://upload-images.jianshu.io/upload_images/7008018-e054c18e16927671.JPG?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)  
ES5中Object.create()的实现方式：  
<pre>
function object(obj){
	function F(){}
	F.prototype = obj;
	return new F();
}
</pre>
好好利用new F()，因为可以产生对象，以及原型链中的引用线。

- 寄生式继承，寄生组合式继承

## 设计模式
- 设计模式是思想，语言不同，其实现方式可能会不同。不同的设计模式针对不同的场景，解决不同的问题。目的：可复用、可维护的代码。   
- 所有设计模式的原则：找出程序中变化的部分，将其封装，不变的部分隔离出来；将程序中变化与稳定的部分分离开。  
- 多态：同一操作作用于不同的对象上，产生不同的执行结果。 目的：程序的稳定性和可扩展性。 对象的多态实际上是把过程化的条件分支语句转化为对象的多态性，消除了这些条件分支语句。 
- 多态的代码层面的理解：    
  变化的部分： 每个对象都会有一个同名方法，分别执行不同的行为。   
  相同的部分： 对这个同名方法的调用。（得益于JS是动态类型，不需要类型检测，可将任何对象作为参数调用。若是静态语言类型会需要指定参数的类型，为了实现多态就必须向上转型）   
  代码的扩展性：单独增加变化部分的代码，无需改动其他部分    
- 继承的两种实现方式：接口继承和实现继承。接口继承只继承方法签名，而JS中函数没有签名，JS中只有实现继承。实现继承是继承实际的方法。 

### 原型模式
- JavaScript是一门基于原型的面向对象语言  
- 原型继承是通过基于原型链的委托机制 
- JavaScript中所有对象原型链的顶端是Object.prototype对象，但是Object.create(null)会创建出没有原型的对象。

### 单例模式  
- 保证一个类仅有一个实例，并提供一个访问它的全局访问点  
- 适用场景：登录浮窗  
**1. 基本实现**
<pre>
//单例模式
function Singleton(name){
	this.name = name;
}
Singleton.prototype.getName = function(){
	return this.name;
}
Singleton.getInstance = function(name){
	if(!this.instance){
		this.instance = new Singleton(name); // 由于函数也是对象，这里的this指向Singleton对象
	}
	return this.instance;
}
//所以当函数1.函数2()形式调用时，this指向函数1

var a = Singleton.getInstance("la");
var b = Singleton.getInstance("ha");
console.log(a.getName()); //la
console.log(b.getName()); //la
console.log(a === b);     //true
console.log(Singleton.instance);  // Singleton { name: 'la' }
</pre>

**实现思路：**编写一个构造函数的方法，将new封装在里面，通过调用这个方法来创建实例。将实例作为构造函数的属性，这样方便判断是否已经创建了一个实例。
特点：必须要知道创建实例的调用函数，new 被封装在函数里面。且实例暴露在函数的属性上。  
**2. 透明的单例模式**
<pre>
//透明的单例模式
var transparentSingleton = (function(){   // 立即执行函数的返回值为undefined
 // 这里需要立即执行函数的原因是创造一个作用域，利用闭包将实例变量封装
	var instance;
	var transparentSingleton = function(name){
		if(!instance){
			this.name = name;
			instance = this;
		}else{
			return instance;
		}
	}
	transparentSingleton.prototype.getName = function(){
		return this.name;
	}
	return transparentSingleton;
})();
var a = new transparentSingleton("la");
var b = new transparentSingleton("ha");
console.log(a.getName()); //la
console.log(b.getName()); //la
console.log(a === b);     //true
console.log(a);     //transparentSingleton { name: 'la' }
</pre>
**特点：**方法1为了判断该构造函数有没有已创建的实例，将实例作为构造函数的属性，可以很方面判断，可是也将实例暴露了出来。方法2将实例放到立即执行函数里，利用闭包将其实例变量封装，形成私有变量，只能通过指定方法来访问。其实就是将Singleton.instance改为通过指定方法访问instance。  
**实现思路：**利用立即执行函数创建作用域，利用闭包将实例对象封装为私有变量。该立即执行函数返回构造函数，这个构造函数可以访问实例对象，全局中利用new 构造函数来创建实例。通过判断实例对象是否为undefined，若undefined则执行逻辑代码，然后将this（指向new创建的对象）赋值给实例对象。  
**说明：**方法1和方法2都是基于“类”的单例模式。   
**3. 惰性单例**：指在需要的时候才创建对象实例，不仅应用于创建单个对象，还可应用于只需执行一次的函数。  
**实现思路：**利用函数创建作用域，创建私有变量，返回一个闭包函数。这个闭包函数内判断和创建单例。不过创建单例可以封装为函数作为参数传入。这样就将创建单例和管理单例的逻辑分开。  
<pre>
//通用的惰性单例
var inertiaSingleton = function(){
	var obj;
	return function(){
		if(!obj){
			obj = createDiv();
			return obj;
		}
		return obj;
	}
};
function createDiv(){
	var div = document.createElement("div");
	div.innerHTML = "我是登录浮窗o";
	div.style.dispaly = "none";
	document.body.appendChild(div);
	return div;
}
var creteSingleton = inertiaSingleton(); //这里也只执行一次，与立即执行函数的区别是，当我需要对象时，我会调用一次这个函数。（没有太大区别）
document.getElementById("login").onclick = function(){
	var logindiv = creteSingleton();
	logindiv.style.dispaly = "block";
}
</pre>
下列惰性单例应用于只需执行一次的函数。
<pre>
//惰性单例——单次执行函数
var inertiaSingleton = function(){
	var obj;
	return function(){
		if(!obj){
			obj = bindClick();
			return obj;
		}
		return obj;
	}
}
function bindClick(){
	console.log("开始渲染列表");
	document.getElementById("div1").onclick = function(){
		alert("click");
	}
	return true;
}
var bindSingleton = inertiaSingleton();
bindSingleton();
bindSingleton();
bindSingleton(); // 这里执行了三次函数，但实际只绑定了一个事件
</pre>
总结：上述两个例子虽然都将创建单例和管理单例的逻辑分开，但是创建单例需要放在全局中声明，才能在闭包函数中调用。可以改为将创建单例函数作为参数传入。如下例所示：
<pre>
var inertiaSingleton = function(fn){
	var obj;
	return function(){
		if(!obj){
			obj = fn.apply(this,arguments); // 实际上obj = fn();也是可以，这里只是为了将fn函数中的this绑定到闭包函数中的this。
			return obj;
		}
		return obj;
	}
};
var creteSingleton = inertiaSingleton( // 函数作为参数传入
	function (){
		var div = document.createElement("div");
		div.innerHTML = "我是唯一的登录浮窗";
		div.style.dispaly = "none";
		document.body.appendChild(div);
		return div;
	}
);
document.getElementById("login").onclick = function(){
	var logindiv = creteSingleton();
	logindiv.style.dispaly = "block";
}
</pre>