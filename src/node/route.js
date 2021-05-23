const express = require('express')
const fs = require('fs')
const formidable = require("formidable")
const router = express.Router()
const path = require('path')
const mysql = require('mysql')
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'manageMysql'
})
connection.connect()

router.post('/login', (req, res) => {
    let flag = true
    const reqData = req.body
    connection.query('SELECT * FROM userList', (err, result) => {
        const newResult = JSON.parse(JSON.stringify(result))
        newResult.some(item => {
            if (item.length != 0 && item.password === reqData.password
                && item.username === reqData.username) {
                flag = false
                res.send(item)
                return true
            }
        })
        if (flag === true) {
            res.json({
                "status": 1
            })
        }
    })
} //登录用户数据库表  userList
)
router.get('/weather', (req, res) => {
    fs.readFile('../pages/admin/weather.json', 'utf8', (err, data) => {
        if (err) throw err
        else {
            JSON.parse(data).results.map(item => {
                res.send(item.weather_data[0])
            })
        }
    })
})

router.get('/categoryList', (req, res) => {
    const reqData = req.query.parentId
    fs.readFile('../pages/category/categoryList.json', 'utf8', (err, result) => {
        if (err) throw err
        else {
            if (reqData === '0') {
                res.send(result)
            }
            else {
                let flag = true
                JSON.parse(result).data.some(item => {
                    if (item.childern && reqData === item._id) {
                        flag = false
                        res.send(item.childern)
                        return true
                    }
                })
                if (flag === true) {
                    res.send("请求失败")
                }
            }
        }
    })
})

router.post('/UpdateCategory', (req, res) => {
    const reqdata = req.body.parentId

    fs.readFile('../pages/category/categoryList.json', 'utf8', (err, result) => {
        if (err) throw err
        else {
            var strResult = result.toString() //读取数据为二进制，转换为字符串
            var ObjectResult = JSON.parse(strResult) //将字符串数据转换为对象
            ObjectResult.data.some(item => {
                if (item._id === reqdata.categoryId && reqdata.parentId === '0') {
                    item.name = reqdata.categoryName
                    return true
                }
                else {
                    if (item.childern && item._id === reqdata.parentId) {
                        item.childern.data.some(citem => {
                            if (citem._id === reqdata.categoryId) {
                                citem.name = reqdata.categoryName
                                return true
                            }
                        })
                    }
                }
            })
            var strData = JSON.stringify(ObjectResult, null, "\t")
            fs.writeFile('../pages/category/categoryList.json', strData, (err) => {
                if (err) throw err
                res.send('修改成功！')
            })
        }
    })
})

router.post('/AddCategory', (req, res) => {
    const reqdata = req.body
    fs.readFile('../pages/category/categoryList.json', 'utf8', (err, result) => {
        if (err) throw err
        else {
            var strResult = result.toString()
            var ObjectResult = JSON.parse(strResult)
            if (reqdata.selectData === '') {
                var newData = {
                    "parentId": "0",
                    "_id": (JSON.parse(result).data.length + 1).toString(),
                    "name": reqdata.addCategory
                }
                ObjectResult.data.push(newData)
                var strData = JSON.stringify(ObjectResult, null, "\t")
                fs.writeFile('../pages/category/categoryList.json', strData, (err, data) => {
                    if (err) throw err
                    res.send('添加一级分类成功！')
                })
            }
            else {
                let selectData = reqdata.selectData
                ObjectResult.data.map(item => {
                    if (item.name === selectData) {
                        if (item.childern) {
                            const newData = {
                                "_id": (item.childern.data.length + 1).toString(),
                                "name": reqdata.addCategory
                            }
                            item.childern.data.push(newData)
                            var strData = JSON.stringify(ObjectResult, null, "\t")
                            res.send('添加子分类成功！')
                            fs.writeFile('../pages/category/categoryList.json', strData, (err, data) => {
                                if (err) throw err
                            })
                        }
                        else {
                            const newData = {
                                "_id": "1",
                                "name": reqdata.addCategory
                            }
                            item.childern = {
                                "status": 0,
                                data: [newData]
                            }
                            var strData = JSON.stringify(ObjectResult, null, "\t")
                            res.send('添加成功！')
                            fs.writeFile('../pages/category/categoryList.json', strData, (err) => {
                                if (err) throw err

                            })
                        }
                    }
                })
            }
        }
    })
})

router.get('/ProductList', (req, res) => {
    fs.readFile('../pages/product/productList.json', 'utf8', (err, result) => {
        if (err) throw err
        let { pageNum, pageSize } = req.query
        var newList = JSON.parse(result).list.slice((pageNum - 1) * pageSize, pageSize * pageNum)
        res.json({
            "status": 0,
            "total": JSON.parse(result).list.length,
            "list": newList
        })
    })
})

router.get('/SearchProduct', (req, res) => {
    const { pageNum, pageSize } = req.query
    fs.readFile('../pages/product/productList.json', 'utf8', (err, result) => {
        if (err) throw err
        else {
            const newResult = JSON.parse(result)
            if (req.query.productName) {
                const newList = newResult.list.filter(item => {
                    return item.name.indexOf(req.query.productName) !== -1
                })
                const filterList = newList.slice((pageNum - 1) * pageSize, pageSize * pageNum)
                res.json({
                    "status": 0,
                    "total": newList.length,
                    "list": filterList
                })
            }
            else {
                const newList = newResult.list.filter(item => {
                    return item.desc.indexOf(req.query.productDesc) != -1
                })
                const filterList = newList.slice((pageNum - 1) * pageSize, pageSize * pageNum)
                res.json({
                    "status": 0,
                    "total": newList.length,
                    "list": filterList
                })
            }
        }
    })
})

router.post('/UpdateProductStatus', (req, res) => {
    const { productId, status } = req.body
    fs.readFile('../pages/product/productList.json', 'utf8', (err, result) => {
        const newResult = JSON.parse(result)
        newResult.list.some(item => {
            if (item.id === productId) {
                item.status = status
                return true
            }
        })
        const strResult = JSON.stringify(newResult, null, "\t")
        fs.writeFile('../pages/product/productList.json', strResult, (err) => {
            if (err) throw err
            res.send({
                status: '0'
            })
        })
    })
})

router.post("/ProductBelong", (req, res) => {
    fs.readFile('../pages/category/categoryList.json', 'utf8', (err, result) => {
        if (err) throw err
        const newResult = JSON.parse(result)
        newResult.data.some(item => {
            if (item._id === req.body.categoryId) {
                res.send(item.name)
                return true
            }
        })
    })
})

router.post("/loadImages", (req, res) => {
    const form = new formidable.IncomingForm()
    form.encoding = 'utf-8'   // 设置表单域的编码
    form.uploadDir = path.join(__dirname + "/../pages/product/images")
    form.keepExtensions = true  //保留后缀
    form.maxFieldsSize = 2 * 1024 * 1024 // 限制所有存储表单字段域的大小（除去file字段），如果超出，则会触发error事件，默认为2M
    form.parse(req, function (err, fields, files) {
        const filename = files.file.name
        const newPath = form.uploadDir + "/" + filename
        fs.renameSync(files.file.path, newPath) //重命名
        res.json({ "name": filename, "url": newPath })
    })
})

router.post("/DeleteImages", (req, res) => {
    const deletePath = path.join(__dirname + "/../pages/product/images" + "/" + req.body.imagesName)
    fs.exists(deletePath, (exists) => {
        if (exists) {
            fs.unlinkSync(deletePath)
        }
    })
    res.send("删除成功")
})

router.post("/AddProduct", (req, res) => {
    let product = req.body.product
    fs.readFile("../pages/product/productList.json", 'utf8', (err, result) => {
        if (err) throw err
        else {
            const objResult = JSON.parse(result)
            product.id = (objResult.list.length + 1).toString()
            product.status = "2"
            objResult.list.push(product)
            const newProduct = JSON.stringify(objResult, "", "\t")
            fs.writeFile("../pages/product/productList.json", newProduct, (err) => {
                if (err) throw err
                res.send('添加成功')

            })
        }
    }
    )
})

router.get("/RoleList", (req, res) => {
    connection.query('SELECT * FROM roleList', (err, result) => {
        const newResult = JSON.parse(JSON.stringify(result))
        newResult.map(item => {
            if (item.menu != null) {
                item.menu = item.menu.split(',')
            }
        })
        console.log(newResult)
        res.send(newResult)
    })
})

router.post("/AddRole", (req, res) => {
    const { roleName, authTime, authName } = req.body
    const sql = "INSERT INTO rolelist(roleName,authTime,authName)" + " VALUES ('" + roleName + "','" + authTime + "','" + authName + "')"
    connection.query(sql, (err, result) => {
        if (err) throw err
        res.send('创建角色成功')
    })
})

router.post('/RoleMenu', (req, res) => {
    const id = req.body.id
    const menu = req.body.menu
    if (menu !== '') {
        const sqlSelect = "SELECT * FROM roleList where id=" + "'" + id + "'"
        connection.query(sqlSelect, (err, result) => {
            const newResult = JSON.parse(JSON.stringify(result))
            const newMenu = newResult.map(item => {
                item.menu = menu.toString()
                return item.menu
            })
            const sqlUpdate = "UPDATE roleList SET menu=" + "'" + newMenu.toString() + "'" + "WHERE id=" + "'" + id + "'"
            connection.query(sqlUpdate, (err, result) => {
            }
            )
            res.send('设置权限成功')
        })
    }
    else {
        res.send('设置权限成功')
    }

})

router.get('/userList', (req, res) => {
    connection.query('SELECT * FROM userList', (err, result) => {
        if (err) throw err
        else {
            const newResult = JSON.parse(JSON.stringify(result))
            newResult.map(item => {
                if (item.menu != null) {
                    item.menu = item.menu.split(',')
                }
            })
            res.send(newResult)
        }
    })
})  //用户数据库表，跟登录用户同个数据库

router.post('/AddUser', (req, res) => {
    const user = req.body.user
    const { roleName } = req.body.user
    user.menu = ''
    const selectSql = "SELECT * FROM rolelist where roleName=" + "'" + roleName + "'"
    connection.query(selectSql, (err, result) => {
        const newResult = JSON.parse(JSON.stringify(result))
        newResult.map(item => {
            user.menu = item.menu
        })
        const sql = "INSERT INTO userList(username,password,email,tel,roleName,menu)" + " VALUES ('" + user.username + "','" + user.password + "','" + user.email + "','" + user.tel + "','" + user.roleName + "','" + user.menu + "')"
        connection.query(sql)
    })
    res.send('添加成功')
})

router.post('/DeleteUser', (req, res) => {
    const user = req.body.user
    const deleteSql = "DELETE FROM userList where" + " id=" + "'" + user.id + "'"
    connection.query(deleteSql)
    const sql = 'ALTER TABLE userList AUTO_INCREMENT = 1'
    connection.query(sql)
    res.send('删除成功')

})

module.exports = router