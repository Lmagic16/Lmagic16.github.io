## 类型
 - 七种内置类型：未赋值（undefined），空值（null），布尔值（boolean），数字（number），字符串（string），对象（object），符号（symbol，ES6新增）
 - 除了对象（object）都是基本简单类型
 - 对象（object）包括String，Number，Boolean，Object，Function，Array，Date，RegExp，Error
 - 变量没有类型，只有值有类型，变量可以持有任何类型的值
 - typeof 运算符返回值的类型，其返回的是字符串，即typeof typeof * 为“string”
 - typeof 对未声明和未赋值（undefined）的变量都返回“undefined”（安全防范机制）
 - polyfill 指补充代码，用来补充当前运行环境中缺失的功能，例如在非ES6环境中polyfill ES6中的方法
 - JS为基本数据类型值提供了封装对象，即String，Number，Boolean等，他们也是构造函数，为该子类型提供特有的方法和属性，当基本类型值（如“abc”）需要访问属性（如length）和方法（如Sting.prototype.trim()）时，JS引擎会自动进行对象封装。
 - 最好使用基本数据类型值，而非封装对象（JS引擎已经做了预编译、缓存和性能优化）
 - valueOf()从封装对象中获取基本类型值

<pre>
var a = new String("abc");
a.valueOf();\\"abc"  
</pre>

 - Boolean()封装的对象返回值都为true

### 数组
- 数组可容纳任何类型的值，通常通过数字进行索引，但也可包含字符串键值和属性
- 最好使用对象存储键值/属性值，用数组存放数字索引值（内部优化）
- 其中splice，pop/push，reverse，shift/unshift，sort会改变原始数组；  
 而contact，slice不会改变原始数组，返回的是一个新的数组副本。  
 ![Array对象方法](http://upload-images.jianshu.io/upload_images/7008018-87776ef414703195.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


### 字符串
- 字符串不可变，数组可变（原因：类型决定他们在复制时，前者采用值复制，后者采用引用复制）
![String对象方法](http://upload-images.jianshu.io/upload_images/7008018-19e897d9e45f812a.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


### 数字
- 包括“整数”（没有小数的十进制数）和浮点型
- ES6支持0b（二进制），0o（八进制），0x（十六进制）
- 二进制浮点数存在的问题：无法做到完全精确，例如0.1+0.2 !== 0.3，ES6中Number.EPSILON表示机器精度
- 最大安全整数：2^53-1，ES6中为Number.MAX_SAFE_INTEGER；最小安全整数：-(2^53-1)，Number.MIN_SAFE_INTEGER
- null（空值，曾经赋值过，但目前没有值，例如）；undefined（没有值，从未赋值）；void * 返回值为undefined 
- NaN为数字类型，可理解为无效数值，NaN != NaN（JS中唯一一个不等于自身的值）
- Infinity 和 -Infinity（无穷数）（原因：浮点数运算结果可能溢出）
- -0 === 0，0的符号位可表示状态信息，如方向信息

### 值复制 和 引用复制
- 简单基本类型（undefined，null，boolean，number，string，symbol）采用值复制，对象（包括数组，函数等）采用引用复制
- JS引用指向的是值，也就是说如果有一个值有10个引用，那么这10个引用相互之间没有关系，一个引用无法改变另一个引用的指向
- slice（）不带参数会返回当前数组的一个浅复制

### 强制类型转换（显式和隐式）
* 主要分为三种规则，ToString，ToNumber，ToBoolean
  1\.**ToString**   
  - 转化规则：null转换为“null”，undefined转换为“undefined”，true转换为“true”，数字转化为“数字”
  - toString()方法可以显示调用，或者在需要字符串化时自动调用
  - 通过JSON.stringify()进行JSON字符串化，toJSON()方法返回安全的JSON值，JSON.stringify()可以传参数指定需要字符串化的属性，或者传入函数作为参数
  2\.**ToNumber**
  - 转化规则：true转换为1，false转换为0，undefined转换为NaN，null转换为0，“数字”转换为数字，处理失败返回NaN
  3\.**ToBoolean**
  - 转化规则：undefine，null，false，+0、-0、NaN，“”这几种会转换为false，其余为true。所以，假值对象new Boolean(false)在执行ToBoolean转换时，返回true
* **显式强制类型转换**
  - String()和Number()函数，不封装对象进行转换
  - toSting()方法
  - +“数字” 会转换为数字
  - parseInt(字符串,也可为数字)函数，从左到右，直到遇到第一个非数字字符
  - !!非布尔值转换为布尔值（常用），Boolean()函数（不常用）
* **隐式强制类型转换**
  - +操作中，有一个操作数是字符串，执行字符串拼接，否则执行加法
  - -操作中，两个操作数都需要被转换为数字
  - 隐式转换为布尔值：
    * if()语句
    * for( ; ; )中第二个条件判断表达式
    * while和do while
    * ? : 中的条件判断表达式
    * || 和 && 中左边的操作数
  -  || 和 && 可理解为操作数选择器运算符，返回值为两个操作数中的一个，a || b 可理解为a ? a : b，a && b 可理解为a ? b : a。if(a || b)中实际上是将a || b的结果隐式转换为布尔值。
* **==和===**
  - ==先进行强制类型转换，再比较；===不允许强制类型转换
  - 字符串与数字之间的==：如果一个操作数为数字，一个操作数为字符串，则将字符串转换为数字
  - 其他类型与布尔类型之间的==：将布尔类型转换为数字，再比较。所以尽量避免使用==true和==false
  - null和undefined之间的==：null==undefined，undefined==null都为true，其余为false
  - 对象与非对象之间的==：将对象转换为字符（转换规则是先调用valueOf()方法，没有则调用toString()方法），然后进行比较。
  - 关系比较（<、>、<=、>=）没有严格关系比较，所以需考虑具体情况进行显式强制类型转换