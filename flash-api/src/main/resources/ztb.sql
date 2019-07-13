/*
Navicat MySQL Data Transfer

Source Server         : localhost
Source Server Version : 50725
Source Host           : localhost:3306
Source Database       : guns-lite

Target Server Type    : MYSQL
Target Server Version : 50725
File Encoding         : 65001

Date: 2019-04-18 20:33:12
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `t_biz_tender`
-- ----------------------------
DROP TABLE IF EXISTS `t_biz_tender`;
CREATE TABLE `t_biz_tender` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '主键id',
  `create_by` bigint(20) DEFAULT NULL COMMENT '创建者',
  `create_time` datetime DEFAULT NULL COMMENT '创建时间/注册时间',
  `modify_by` bigint(20) DEFAULT NULL COMMENT '最后更新人',
  `modify_time` datetime DEFAULT NULL COMMENT '最后更新时间',
  `no` varchar(255) DEFAULT NULL COMMENT '编号',
  `name` varchar(50) DEFAULT NULL COMMENT '名称',
  `shape` varchar(50) DEFAULT NULL COMMENT '形状',
  `dimension` int(20) DEFAULT 0 COMMENT '尺寸',
  `color` varchar(255) DEFAULT NULL COMMENT '颜色',
  `purity` varchar(50) DEFAULT NULL COMMENT '净度',
  `quantity` int(20) DEFAULT 0 COMMENT '数量',
  `unit` varchar(50) DEFAULT NULL COMMENT '单位',
  `heated` varchar(50) DEFAULT NULL COMMENT '处理方式',
  `status` int(20) DEFAULT 0 COMMENT '发标状态',
  `due_date` datetime DEFAULT NULL COMMENT '到期时间,',
  `count` int(20) DEFAULT 0 COMMENT '已投标数',
  `version` int(20) DEFAULT 0 COMMENT '版本号',
  `is_delete` int(20) DEFAULT '0' COMMENT '是否删除(0：正常；1：已删)',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8 COMMENT='发标';

-- ----------------------------
-- Table structure for `t_biz_supplier`
-- ----------------------------
DROP TABLE IF EXISTS `t_biz_supplier`;
CREATE TABLE `t_biz_supplier` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `create_by` bigint(20) DEFAULT NULL COMMENT '创建者',
  `create_time` datetime DEFAULT NULL COMMENT '创建时间/注册时间',
  `modify_by` bigint(20) DEFAULT NULL COMMENT '最后更新人',
  `modify_time` datetime DEFAULT NULL COMMENT '最后更新时间',
  `no` varchar(255) DEFAULT NULL COMMENT '编号',
  `name` varchar(255) DEFAULT NULL COMMENT '名称',
  `email` varchar(255) DEFAULT NULL COMMENT '电子邮件',
  `telephone` varchar(255) DEFAULT NULL COMMENT '电话号码',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8 COMMENT='供应商';

-- ----------------------------
-- Table structure for `t_biz_bid`
-- ----------------------------
DROP TABLE IF EXISTS `t_biz_bid`;
CREATE TABLE `t_biz_bid` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `create_by` bigint(20) DEFAULT NULL COMMENT '创建者',
  `create_time` datetime DEFAULT NULL COMMENT '创建时间/注册时间',
  `modify_by` bigint(20) DEFAULT NULL COMMENT '最后更新人',
  `modify_time` datetime DEFAULT NULL COMMENT '最后更新时间',
  `no` varchar(255) DEFAULT NULL COMMENT '投标编号',
  `quantity` int(20) DEFAULT NULL COMMENT '数量',
  `price` int(20) DEFAULT NULL COMMENT '价格',
  `unit` varchar(255) DEFAULT NULL COMMENT '单位',
  `contact` varchar(255) DEFAULT NULL COMMENT '投标人',
  `is_approved` int(20) DEFAULT '0' COMMENT '是否中标(0：未中标；1：已中标)',
  `status` int(20) DEFAULT 0 COMMENT '投标状态',
  `tender_id` bigint(20) NOT NULL COMMENT '发标ID',
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_tender_id` FOREIGN KEY (`tender_id`) REFERENCES `t_biz_tender` (`id`) ON DELETE RESTRICT ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8 COMMENT='投标';
