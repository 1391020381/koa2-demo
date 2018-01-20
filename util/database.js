/**
 * 数据库相关操作
 * **/

const mysql = require('mysql')
const connection = mysql.createConnection({
  host: '127.0.0.1',// 数据库地址
  user: 'root', // 数据库用户
  password: 'root',
  database: 'my_database' // 选中数据库
})

// 执行sql脚本对数据库进行读写

connection.query('SELECT * FROM my_table', (err, result, fields) => {
  if (err) throw err
  // connected !
  // 结束会话
  connection.release()
})

// 注意:一个事件就有一个从开始到结束的过程,数据库会话操作执行完后,就需要关闭掉,以免占用连接资源。

// 创建数据连接池
// 一般情况下操作数据库是很复杂的读写过程,不只是一个i额会话,如果直接用会话操作,就需要每次都要配置连接参数。所以这时候就需要连接池管理会话。

const mysql = require('mysql')

// 创建数据池
const pool = mysql.createPool({
  host: '127.0.0.1',
  user: 'root',
  password: 'root',
  database: 'my_table'
})

pool.getConnection((err, connection) => {
  connection.query('SELECT * FROM my_table', (err, result, fields) => {
    if (err) throw err

    console.log(result)
    connection.release()
  })
})


let query = function (sql, values) {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) {
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

async function selectAllData (sql) {
  let dataList = await query(sql)
  return dataList
}

async function getData () {
  let dataList = await selectAllData()
  console.log(dataList)
}


