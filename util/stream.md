# 学习stream
[nodejs stream 手册](https://github.com/jabez128/stream-handbook)
[nodeschool](https://nodeschool.io/)
[csdn](http://blog.csdn.net/vieri_32/article/details/48376547)
## 简单stream进行pipe
首先,我们可以通过管道将输入定位到输出,输入输出可以是控制台或者文件流或者http请求,比如:
1. `process.stdin.pipe(process.stdout)`
2. `process.stdin.pipe(fs.createWriteStream(path))`
3. `fs.createReadStream(path).pipe(process.stdin)`
## pipe中间进行处理
如果我们想要在管道中间进行处理,比如想将输入的字符串变成大写写到输出里,我们可以使用一些可以作为中间处理的框架,比如 through2就很方便
```$xslt
var through2 = require('through2')
var stream = through2(write,end)
process.stdin
    .pipe(stream)
    .pipe(process.stdout)
    
 function write(line,_,next){
  this.push(line.toString().toUpperCase())
  next()
 } 
 function end(done){
 done()
 }
```
## http server中的流
类似stdin和fs,http由于其特性也适合使用流,所有其自带类似特性
```$xslt
var http = require('http')
var server = http.createServer(function(req,res){
req.pipe(res)

})

```