// 【客户修改】视图模块
var express = require('express');
var router = express.Router();

// 导入MySQL模块
var mysql = require('mysql');
var dbConfig = require('../db/dbconfig');
var customersql = require('../db/customersql');

// 使用dbconfig.js的配置信息创建一个MySQL连接池
var pool = mysql.createPool(dbConfig.mysql);

module.exports = function (req, res, next) {
    // 从连接池获取连接
    pool.getConnection(function (err, connection) {
        // 获取get过来的参数
        var param = req.params;

        // 建立连接 查询所有用户信息
        connection.query(customersql.getCustomerById, [param.userid], function (err, result) {
            // 释放连接
            connection.release();

            res.render('customer_edit', {page_title: "客户修改", data: result});
        });
    });
};