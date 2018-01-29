/**
 * posts(存储文章)
 * users(存储用户)
 * comment(存储评论)
 * create table if not exists user()表示如果users表不存在则创建该表
 * **/

const mysql = require('mysql')
const config = require('../config/default')
const pool = mysql.createPool({
  host: config.database.HOST,
  user: config.database.USERNAME,
  password: config.database.PASSWORD,
  database: config.database.DATABASE
})
let query = function (sql, values) {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (er) {
        reject(err)
      } else {
        connection.query(sql, values, (err, rows) => {
          if (err) {
            reject(err)
          } else {
            resolve(rows)
          }
          connection.release()
        })
      }
    })
  })
}

/**
 *
 --格式
 CREATE TABLE IF NOT EXISTS [Table Definition];
 --示例
 CREATE TABLE IF NOT EXISTS student(id int unsigned not null primary key,name varchar(32) not null);
 MySQL官方对CREATE TABLE IF NOT EXISTS SELECT给出的解释是：
 CREATE TABLE IF NOT EXIST… SELECT的行为，先判断表是否存在，
 如果存在，语句就相当于执行insert into select；
 如果不存在，则相当于create table … select。
 * **/

let users =
  `create table if not exists users(
   id INT NOT NULL AUTO_INCREMENT,
   name VARCHAR(100) NOT NULL,
   pass VARCHAR(100) NOT NULL,
   avator VARCHAR(100) NOT NULL,
   moment VARCHAR(100) NOT NULL,
   PRIMARY KEY (id)
  );`
let posts =
  `create table if not exists posts(
   id INT NOT NULL AUTO_INCREMENT,
   name VARCHAR(100) NOT NULL,
   title TEXT(0) NOT NULL,
   content TEXT(0) NOT NULL,
   md TEXT(0) NOT NULL,
   uid VARCHAR(40) NOT NULL,
   moment VARCHAR(100) NOT NULL,
   comments VARCHAR(200) NOT NULL DEFAULT '0',
   pv VARCHAR(40) NOT NULL DEFAULT '0',
   avator VARCHAR(100) NOT NULL,
   PRIMARY KEY (id)
  );`

let comment =
  `create table if not exists comment(
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  content TEXT(0) NOT NULL,
  moment VARCHAR(40) NOT NULL,
  postid VARCHAR(40) NOT NULL,
  avator VARCHAR(40) NOT NULL,
  PRIMARY KEY (id)
  );`

let createTable = function (sql) {
  return query(sql, [])
}
// 建表
/**
 *   users      posts    comment
 *     id        id         id
 *     name      name       name
 *     pass      title      content
 *     avator    content    moment
 *     moment      md       postid
 *                 uid       avator
 *                 moment
 *                 comments
 *                 pv
 *                 avator
 * **/

/**
 *
 id主键递增
 name: 用户名
 pass：密码
 avator：头像
 title：文章标题
 content：文章内容和评论
 md：markdown语法
 uid：发表文章的用户id
 moment：创建时间
 comments：文章评论数
 pv：文章浏览数
 postid：文章id
 *
 * **/
createTable(users)
createTable(posts)
createTable(comment)

// 注册用户
let insertdata = function (value) {
  let _sql = "insert into users set name=?,pass=?,avator=?,moment=?;"
  return query(_sql, value)
}
// 删除用户
let deleteUserData = function (name) {
  let _sql = `delete from users where name=${name}`
  return query(_sql)
}
// 查找用户
let findUserData = function (name) {
  let _sql = `select * from users where name=${name}`
  return query(_sql)
}
// 发表文章
let insertPost = function (value) {
  let _sql = `insert into posts set name=?,title=?,content=?,md=?,uid=?,moment=?,avator=?;`
  return query(_sql)
}
// 更新文章评论数
let updatePostComment = function (value) {
  let _sql = `update posts set comments=? where id=?`
  return query(_sql)
}
// 更新浏览数

let updatePostPv = function (value) {
  let _sql = `update posts set pv=?where id=?`
  return query(_sql, value)
}
// 发表评论
let insertComment = function (value) {
  let _sql = "insert into comment set name=?,content=?,moment=?,postid=?,avator=?;"
  return query(_sql, value)
}
// 通过名字查找用户
let findDataByName = function (name) {
  let _sql = `select * from users where name=${name};`
  return query(_sql)
}
// 通过文章的名字查找用户
let findDataByUser = function (name) {
  let _sql = `select * from posts where name=${name}`
  return query(_sql)
}
// 通过文章的id查找
let findDataById = function (id) {
  let _sql = `select * from posts where id="${id}"`
  return query(_sql)
}
// 通过评论id查找
let findCommentById = function (id) {
  let _sql = `select * from comment where postid=${id};`
  return query(_sql)
}
// 查询所有文章

let findAllPost = function () {
  let _sql = `select * from posts`
  return query(_sql)
}
// 查询分页文章

/**
 *
 limit是mysql的语法
 select * from table limit m,n
 其中m是指记录开始的index，从0开始，表示第一条记录
 n是指从第m+1条开始，取n条。
 select * from tablename limit 2,4
 即取出第3条至第6条，4条记录
 * **/
let findPostByPage = function (page) {  //  n是指从第 m+1条开始,取 n条
  let _sql = `select * from posts limit ${(page - 1) * 10},10`
  return query(_sql)
}
// 查询个人分页文章
let findPostByUserPage = function (name, page) {   // ES6字符串模板
  let _sql = `select * from posts where name=${name} order by id desc limit ${(page - 1) * 10},10`
  return query(_sql)
}
// 更新修改文章
let updatePost = function(values){
let _sql = `update posts set title=?,content=?,md=?where id=?`
return query(_sql,values)
}

// 删除文章
let deletePost = function(id){
  let _sql  = `delete from posts where id =${id}`
  return query(_sql)
}
// 删除评论
let deleteComment = function(id){
  let _sql = `delete from comments where id=${id}`
  return query(_sql)
}
// 删除所有评论
let deleteAllPostComment = function(id){
  let _sql = `delete from comment where postid=${id}`
  return query(_sql)
}

// 查找评论数
let findCommentLength = function(id){
  let _sql = `select content from comment where postid in(select id from posts where id=${id})`
  return query(_sql)
}
// 滚动无限加载数据

let findPageById =function(page){
  let _sql = `select * from posts limit ${(page-1)*5},5`
  return query(_sql)
}
// 评论分页
 let findCommentByPage = function(page,postId){
   let _sql = `select * from comment where postid=${postId} order by id desc limit ${page-1}*10,10`
   return query(_sql)
 }
 module.exports = {
  query,
	createTable,
	insertData,
  	deleteUserData,
  	findUserData,
	findDataByName,
  	insertPost,
  	findAllPost,
  	findPostByPage,
	findPostByUserPage,
	findDataByUser,
	findDataById,
	insertComment,
	findCommentById,
	updatePost,
	deletePost,
	deleteComment,
	findCommentLength,
	updatePostComment,
	deleteAllPostComment,
	updatePostPv,
	findPageById,
	findCommentByPage
 }

