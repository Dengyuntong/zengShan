var express = require('express');
var router = express.Router();
var mongo = require('mongodb-curd');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', {
        title: 'Express'
    });
});

//查询列表
router.post('/find', function(req, res, next) {
    mongo.find('app', 'zengShangaiCha', function(data) {
        if (data) {
            res.send({ code: 1, message: data })
        }
    })
})

//查看详情
router.post('/detail', function(req, res, next) {
    var id = req.body.id;
    mongo.find('app', 'zengShangaiCha', { _id: id }, function(result) {
        if (result.length > 0) {
            res.send({ code: 1, message: result })
        } else {
            res.send({ code: 0, message: '没有信息' })
        }
    })
})

//删除
router.post('/remove', function(req, res, next) {
    var id = req.body.id;
    mongo.remove('app', 'zengShangaiCha', { _id: id }, function(result) {
        if (result.deletedCount == 1) {
            res.send({ code: 1, message: '成功' })
        } else {
            res.send({ code: 0, message: '失败' })
        }
    })
})

// 添加信息
router.post('/insert', function(req, res, next) {
    var name = req.body.name,
        age = req.body.age,
        site = req.body.site,
        idnumber = req.body.idnumber,
        id = req.body.id;

    if (!name || !age || !site || !idnumber) {
        res.send({ code: 3, message: "请完善信息" })
    } else {
        getIsHas()
    }

    function getIsHas() {
        if (id) { //如果有id属性   则执行修改操作
            delete req.body.id; //删除id属性 防止添加数据时出现多余id
            mongo.update('app', 'zengShangaiCha', [{ _id: id }, req.body], function(result) {
                if (result) {
                    res.send({ code: 1, message: '修改成功' })
                } else {
                    res.send({ code: 0, message: '修改失败' })
                }
            })
        } else { //否则为添加操作
            mongo.find('app', 'zengShangaiCha', { idnumber: idnumber }, function(result) {
                if (result.length > 0) {
                    res.send({ code: 2, message: "信息重复" })
                } else {
                    mongo.insert('app', 'zengShangaiCha', req.body, function(result) {
                        if (result) {
                            res.send({ code: 1, message: '添加成功' })
                        } else {
                            res.send({ code: 0, message: '添加失败' })
                        }
                    })
                }
            })
        }
    }
})

// //修改
// router.post('/update', function(req, res, next) {
//     var id = req.body.id;
//     delete req.body.id;
//     mongo.update('app', 'zengShangaiCha', [{ _id: id }, req.body], function(result) {
//         if (result) {
//             res.send({ code: 1, message: '成功' })
//         } else {
//             res.send({ code: 0, message: '失败' })
//         }
//     })
// })

module.exports = router;