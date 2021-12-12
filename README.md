## URL

![](./docs/mdn-url-all.png)

[What is a URL? - MDN](https://developer.mozilla.org/en-US/docs/Learn/Common_questions/What_is_a_URL)

```js
const url = new URL("http://holden:pasuwado@wuhaoda.life:8080/secret_router?page=114514#footer")
const data = {};
const keys = [
    "hash",
    "host",
    "hostname",
    "href",
    "origin",
    "password",
    "pathname",
    "port",
    "protocol",
    "search",
    "username"
];
keys.map(key => data[key] = url[key])

console.table(data);
console.log(data.searchParams)
```

## HTTP 协议

### 简介

**超文本传输协议（HTTP）** 是一个用于传输超媒体文档（例如 HTML）的[应用层](https://en.wikipedia.org/wiki/Application_Layer)协议。它是为 Web 浏览器与 Web 服务器之间的通信而设计的，但也可以用于其他目的。HTTP 遵循经典的[客户端-服务端模型](https://en.wikipedia.org/wiki/Client–server_model)，客户端打开一个连接以发出请求，然后等待直到收到服务器端响应。HTTP 是[无状态协议](http://en.wikipedia.org/wiki/Stateless_protocol)，这意味着服务器不会在两个请求之间保留任何数据（状态）。尽管通常基于 TCP/IP 层，但它可以在任何可靠的[传输层](https://zh.wikipedia.org/wiki/传输层)上使用，也就是说，该协议不会像 UDP 那样静默的丢失消息。[RUDP](https://en.wikipedia.org/wiki/Reliable_User_Datagram_Protocol)——作为 UDP 的可靠化升级版本——是一种合适的替代选择。

**HTTP是一种能够获取如 HTML 这样的网络资源的** [protocol](https://developer.mozilla.org/zh-CN/docs/Glossary/Protocol)(通讯协议)。**它是在 Web 上进行数据交换的基础，是一种 client-server 协议，也就是说，请求通常是由像浏览器这样的接受方发起的。一个完整的Web文档通常是由不同的子文档拼接而成的，像是文本、布局描述、图片、视频、脚本等等。**

![Fetching_a_page](docs/Fetching_a_page.png)

# 

### HTTP 报文

随便打开一个带有网络请求的页面，然后打开浏览器的开发人员工具，进入 `Network` 栏，任意选中一条请求，就可以看到它的详细信息：

![](./docs/devtool.png)

Request Headers

```
GET /demo/who-is-god HTTP/1.1
Host: localhost:8000
User-Agent: Mozilla/5.0 (X11; Linux x86_64; rv:95.0) Gecko/20100101 Firefox/95.0
Accept: */*
Accept-Language: en-US,en;q=0.5
Accept-Encoding: gzip, deflate
Referer: http://127.0.0.1:5500/
Origin: http://127.0.0.1:5500
Connection: keep-alive
Sec-Fetch-Dest: empty
Sec-Fetch-Mode: cors
Sec-Fetch-Site: cross-site
Cache-Control: max-age=0
```

Response Headers

```
HTTP/1.1 200 OK
access-control-allow-headers: Authorization
access-control-allow-origin: *
content-type: text/plain; charset=utf-8
content-length: 45
date: Fri, 03 Dec 2021 06:47:00 GMT
```

下面主要提一下 General 区中的 `Status Code` （状态码），`Request Method`（请求方法）和 `Content-Type`。

### 状态码（Status Code）

HTTP 状态码用来表示特定的 HTTP 请求是否已成功完成。响应分为五类：信息响应(`100`–`199`)，成功响应(`200`–`299`)，重定向(`300`–`399`)，客户端错误(`400`–`499`)和服务器错误 (`500`–`599`)。

| Code | Text              | Information |
| ---- | ----------------- | ----------- |
| 200  | OK                | 成功          |
| 301  | Moved Permanently | 永久重定向       |
| 302  | Found             | 临时重定向       |
| 403  | Forbiddenext      | 禁止访问        |
| 404  | Not Found         | 找不到文件       |

[🐱 Click Me](https://http.cat/)

Ref: [HTTP 响应代码 - MDN](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Status)

### 请求方法（Request Method）

HTTP 定义了一组**请求方法**，以表明要对给定资源执行的操作。指示针对给定资源要执行的期望动作。

| Method   | Description                      |
| -------- | -------------------------------- |
| **GET**  | 请求一个指定资源的表示形式，使用GET的请求应该只被用于获取数据 |
| HEAD     | 请求一个与GET请求的响应相同的响应，但没有响应体        |
| **POST** | 用于将实体提交到指定的资源，通常导致在服务器上的状态变化或副作用 |
| PUT      | 用请求有效载荷替换目标资源的所有当前表示             |
| DELETE   | 删除指定的资源                          |
| CONNECT  | 建立一个到由目标资源标识的服务器的隧道              |
| OPTIONS  | 用于描述目标资源的通信选项                    |
| TRACE    | 沿着到目标资源的路径执行一个消息环回测试             |
| PATCH    | 用于对资源应用部分修改                      |

Ref: [HTTP 请求方法 - MDN](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Methods)

### 请求主体（Body） & `Content-Type`

请求主体按照格式的不同，在 Postman 上有六种：

`none`, `form-data`, `x-www-form-urlencoded`, `raw`, `binary`, `GraphQL`.

Content-Type 示例：

```
Content-Type: text/html; charset=UTF-8
Content-Type: multipart/form-data; boundary=something
```

#### FormData

media type: `multipart/formdata`

```js
const formData = new FormData();
formData.append('username', 'admin');
formData.append('password', 'root');
```

#### x-www-form-urlencoded

media type: `application/x-www-form-urlencoded`

```
username=admin&password=root
```

#### JSON

media type: `application/json`

```json
{
    "username": "admin",
    "password": "root"
}
```

## Ajax

下面是我直接翻译的维基百科对于 [Ajax](https://en.wikipedia.org/wiki/Ajax_(programming)) 的介绍：

**Ajax** (又称 **AJAX** [/ˈeɪdʒæks/](https://en.wikipedia.org/wiki/Help:IPA/English); 是 "[Asynchronous](https://en.wikipedia.org/wiki/Asynchronous_I/O) [JavaScript](https://en.wikipedia.org/wiki/JavaScript) and [XML](https://en.wikipedia.org/wiki/XML)" 的缩写) 是一组用于 [Web 开发](https://en.wikipedia.org/wiki/Web_development)的 techniques，它在客户端使用了各种 web technologies，用来创建异步网络应用。借助 Ajax，Web 应用可以在没有影响当前页面的显示和行为的情况下，向一个服务器异步地（在后台）请求和接受数据。通过将数据的展示层从其处理层中分离出来，Ajax 允许 Web Page 乃至 Web App，在不需要刷新整个页面的情况下就可以动态地修改内容。实际上，现在一般都是使用 JSON 来实现 Ajax，而不是 XML。

Ajax 不是一个 technology，而是一个编程概念。[HTML](https://en.wikipedia.org/wiki/Hypertext_Markup_Language) and [CSS](https://en.wikipedia.org/wiki/Cascading_Style_Sheets) 合起来用来表示布局和样式信息。而 JavaScript 可以修改网页来动态地显示界面，并允许用户与新信息进行交互。内建的 XMLHttpRequest 对象可以用来在网页中执行 Ajax，允许网站在不刷新页面的情况下将新内容加载到屏幕。Ajax 不是一项新技术，也不是一门新语言。相反，它只是对现存技术的新的使用方式。

（technology 和 techniques 在这里不太好翻译，容易混淆，所以我就索性不翻了）

以下是原文：

> **Ajax** (also **AJAX** [/ˈeɪdʒæks/](https://en.wikipedia.org/wiki/Help:IPA/English); short for "[Asynchronous](https://en.wikipedia.org/wiki/Asynchronous_I/O) [JavaScript](https://en.wikipedia.org/wiki/JavaScript) and [XML](https://en.wikipedia.org/wiki/XML)") is a set of [web development](https://en.wikipedia.org/wiki/Web_development) techniques that uses various web technologies on the [client-side](https://en.wikipedia.org/wiki/Client-side) to create asynchronous [web applications](https://en.wikipedia.org/wiki/Web_application). With Ajax, web applications can send and retrieve data from a [server](https://en.wikipedia.org/wiki/Web_server) asynchronously (in the background) without interfering with the display and behaviour of the existing page. By decoupling the data interchange layer from the presentation layer, Ajax allows web pages and, by extension, web applications, to change content dynamically without the need to reload the entire page. In practice, modern implementations commonly utilize [JSON](https://en.wikipedia.org/wiki/JSON) instead of XML.
> 
> Ajax is not a technology, but rather a programming concept. [HTML](https://en.wikipedia.org/wiki/Hypertext_Markup_Language) and [CSS](https://en.wikipedia.org/wiki/Cascading_Style_Sheets) can be used in combination to mark up and style information. The webpage can be modified by JavaScript to dynamically display—and allow the user to interact with the new information. The built-in [XMLHttpRequest](https://en.wikipedia.org/wiki/XMLHttpRequest) object is used to execute Ajax on webpages, allowing websites to load content onto the screen without refreshing the page. Ajax is not a new technology, nor is it a new language. Instead, it is existing technologies used in a new way.

### [XMLHttpRequest](https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest)

`XMLHttpRequest`（XHR）对象用于与服务器交互。通过 XMLHttpRequest 可以在不刷新页面的情况下请求特定 URL，获取数据。这允许网页在不影响用户操作的情况下，更新页面的局部内容。`XMLHttpRequest` 在 [AJAX](https://developer.mozilla.org/zh-CN/docs/Glossary/AJAX) 编程中被大量使用。

XMLHttpRequest 是过去前端开发人员用于实现 Ajax 的唯一方式，但是语法比较复杂，于是前端社区衍生出了 axios 等一系列用于网络请求的相关开源库。再后来，浏览器提供了内置的 Fetch API，至此，XMLHttpRequest 也该寿终正寝了。

但是由于历史惯性太大，许多历史项目中仍然存在 XHR 的相关代码，因此这里我们还是会对它进行一些简单的介绍，你只需要确保以后见到相关代码能看懂就行，对于实际的使用不做要求。或者如果你对它有兴趣，可以阅读 [MDN 的相关文档](https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest)（MDN 文档搬运工了属于是）以及相关鞭尸文章：[传统 Ajax 已死，Fetch 永生](https://segmentfault.com/a/1190000003810652)。

```javascript
const xhr = new XMLHttpRequest();

xhr.onreadystatechange = (e) => {
    if (xhr.readyState === 4)
        if (xhr.status === 200)
            console.log(xhr.response)
        else
            throw new Error("WTF")
}

xhr.open('GET', "http://localhost:8000/demo/who-is-god/")
xhr.send();
```

### [Fetch](https://developer.mozilla.org/zh-CN/docs/Web/API/fetch) !important

Fetch API 提供了一个获取资源的接口（包括跨域请求）。任何使用过 [`XMLHttpRequest`](https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest) 的人都能轻松上手，而且新的 API 提供了更强大和灵活的功能集。

`fetch()` 必须接受一个参数——资源的路径。无论请求成功与否，它都返回一个 Promise 对象，resolve 对应请求的 [`Response`](https://developer.mozilla.org/zh-CN/docs/Web/API/Response)。你也可以传一个可选的第二个参数 `init`（参见 [`Request`](https://developer.mozilla.org/zh-CN/docs/Web/API/Request)）。    

```js
const res = await fetch("http://localhost:8000/demo/frameworks")
const data = await res.json()
```

### [Axios](https://axios-http.com/zh/docs/intro)

Axios 是一个基于 [*promise*](https://javascript.info/promise-basics) 网络请求库，作用于[`node.js`](https://nodejs.org) 和浏览器中。 它是 [*isomorphic*](https://www.lullabot.com/articles/what-is-an-isomorphic-application) 的(即同一套代码可以运行在浏览器和node.js中)。在服务端它使用原生 node.js `http` 模块, 而在客户端 (浏览端) 则使用 XMLHttpRequests。

## 本地存储

### Cookies

HTTP Cookie（也叫 Web Cookie 或浏览器 Cookie）是服务器发送到用户浏览器并保存在本地的一小块数据，它会在浏览器下次向同一服务器再发起请求时被携带并发送到服务器上。通常，它用于告知服务端两个请求是否来自同一浏览器，如保持用户的登录状态。Cookie 使基于[无状态](https://developer.mozilla.org/en-US/docs/Web/HTTP/Overview#http_is_stateless_but_not_sessionless)的HTTP协议记录稳定的状态信息成为了可能。

Cookie 主要用于以下三个方面：

- 会话状态管理（如用户登录状态、购物车、游戏分数或其它需要记录的信息）
- 个性化设置（如用户自定义设置、主题等）
- 浏览器行为跟踪（如跟踪分析用户行为等）

Cookie 曾一度用于客户端数据的存储，因当时并没有其它合适的存储办法而作为唯一的存储手段，但现在随着现代浏览器开始支持各种各样的存储方式，Cookie 渐渐被淘汰。由于服务器指定 Cookie 后，浏览器的每次请求都会携带 Cookie 数据，会带来额外的性能开销（尤其是在移动环境下）。新的浏览器API已经允许开发者直接将数据存储到本地，如使用 [Web storage API](https://developer.mozilla.org/zh-CN/docs/Web/API/Web_Storage_API) （本地存储和会话存储）或 [IndexedDB](https://developer.mozilla.org/zh-CN/docs/Web/API/IndexedDB_API) 。

Ref: [HTTP cookies - MDN](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Cookies)

### Storage(Local & Session)

- [`Storage.getItem()`](https://developer.mozilla.org/en-US/docs/Web/API/Storage/getItem)

When passed a key name, will return that key's value.

- [`Storage.setItem()`](https://developer.mozilla.org/en-US/docs/Web/API/Storage/setItem)

When passed a key name and value, will add that key to the storage, or update that key's value if it already exists.

- [`Storage.removeItem()`](https://developer.mozilla.org/en-US/docs/Web/API/Storage/removeItem)

When passed a key name, will remove that key from the storage.

- [`Storage.clear()`](https://developer.mozilla.org/en-US/docs/Web/API/Storage/clear)

When invoked, will empty all keys out of the storage.

### IndexDB

IndexedDB 是一种底层 API，用于在客户端存储大量的结构化数据（也包括文件/二进制大型对象（blobs））。该 API 使用索引实现对数据的高性能搜索。虽然 [Web Storage](https://developer.mozilla.org/zh-CN/docs/Web/API/Web_Storage_API) 在存储较少量的数据很有用，但对于存储更大量的结构化数据来说力不从心。而 IndexedDB 提供了这种场景的解决方案。

[LocalForage](https://localforage.docschina.org/): Offline storage, improved. Wraps IndexedDB, WebSQL, or localStorage using a simple but powerful API.

## WebSockets

**WebSockets** 是一种先进的技术。它可以在用户的浏览器和服务器之间打开交互式通信会话。使用此API，您可以向服务器发送消息并接收事件驱动的响应，而无需通过轮询服务器的方式以获得响应。

```js
const ws = new WebSocket("ws://localhost:8000/ws?usernasme=admin")
ws.onopen = () => console.log("OPEN");
ws.onclose = () => console.log("CLOSE");
ws.onmessage = (event) => console.log(event.data);
ws.send(message)
```

## CORS

出于安全性，浏览器限制脚本内发起的跨源HTTP请求。 例如，XMLHttpRequest和Fetch API遵循同源策略。 这意味着使用这些API的Web应用程序只能从加载应用程序的同一个域请求HTTP资源，除非响应报文包含了正确CORS响应头。

**跨源资源共享** ([CORS](https://developer.mozilla.org/zh-CN/docs/Glossary/CORS)) （或通俗地译为跨域资源共享）是一种基于[HTTP](https://developer.mozilla.org/zh-CN/docs/Glossary/HTTP) 头的机制，该机制通过允许服务器标示除了它自己以外的其它[origin](https://developer.mozilla.org/zh-CN/docs/Glossary/Origin)（域，协议和端口），这样浏览器可以访问加载这些资源。跨源资源共享还通过一种机制来检查服务器是否会允许要发送的真实请求，该机制通过浏览器发起一个到服务器托管的跨源资源的"预检"请求。在预检中，浏览器发送的头中标示有HTTP方法和真实请求中会用到的头。

## 作业

### LV 0

#### 题目

现给定一接口 `http://anonym.ink:8000/homework/get_homework`，以 `POST` 方法向其发送请求，其返回值（文本格式）即为下一级作业题目。

- 要求：利用此接口获取下面的作业。不可使用 [Hoppscotch](https://postwoman.io/)，[Postman](https://www.postman.com/)，[curl](https://curl.se/) 等工具。
- 建议使用 Fetch，可以使用 Axios
- 如果使用 XHR，建议先自己封装后再调用

#### NEXT LV

从此题即可获取下一道题的题目。
