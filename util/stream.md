# 学习stream
[nodeschool](https://nodeschool.io/)
## 简单stream进行pipe
首先,我们可以通过管道将输入定位到输出,输入输出可以是控制台或者文件流或者http请求,比如:
1. process.stdin.pipe(process.stdout)
2. process.stdin.pipe(fs.createWriteStream(path))
3. fs.createReadStream(path).pipe(process.stdin)