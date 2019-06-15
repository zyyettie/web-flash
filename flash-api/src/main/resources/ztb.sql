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
-- Table structure for `b_tender`
-- ----------------------------
DROP TABLE IF EXISTS `b_tender`;
CREATE TABLE `b_tender` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `create_by` bigint(20) DEFAULT NULL COMMENT '创建者',
  `create_time` datetime DEFAULT NULL COMMENT '创建时间/注册时间',
  `modify_by` bigint(20) DEFAULT NULL COMMENT '最后更新人',
  `modify_time` datetime DEFAULT NULL COMMENT '最后更新时间',
  `no` varchar(255) DEFAULT NULL COMMENT '编号',
  `name` varchar(255) DEFAULT NULL COMMENT '名称',
  `type` varchar(20) DEFAULT NULL COMMENT '类型',
  `quantity` int(20) DEFAULT NULL COMMENT '数量',
  `unit` varchar(255) DEFAULT NULL COMMENT '单位',
  `status` varchar(255) DEFAULT NULL COMMENT '状态',
  `is_delete` tinyint DEFAULT '0' COMMENT '是否删除(0：正常；1：已删)',
  `due_date` datetime DEFAULT NULL COMMENT '到期时间,',
  `contact` varchar(255) DEFAULT NULL COMMENT '联系人',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8 COMMENT='发标';

-- ----------------------------
-- Records of b_tender
-- ----------------------------
INSERT INTO `b_tender` VALUES ('5', '1', '2019-06-02 16:24:58', null, null, '招标1', 'typeA', '100', 'box', 'box', '0','2019-07-02 16:24:58','张三');
INSERT INTO `b_tender` VALUES ('6', '1', '2019-06-02 16:24:58', null, null, '招标2', 'typeA', '200', 'box', 'box', '0','2019-07-02 16:24:58','张三');
INSERT INTO `b_tender` VALUES ('7', '1', '2019-06-02 16:24:58', null, null, '招标3', 'typeA', '300', 'box', 'box', '0','2019-07-02 16:24:58','张三');
INSERT INTO `b_tender` VALUES ('8', '1', '2019-06-02 16:24:58', null, null, '招标4', 'typeA', '400', 'box', 'box', '0','2019-07-02 16:24:58','张三');
INSERT INTO `b_tender` VALUES ('9', '1', '2019-06-02 16:24:58', null, null, '招标5', 'typeA', '500', 'box', 'box', '0','2019-07-02 16:24:58','张三');

-- ----------------------------
-- Table structure for `b_supplier`
-- ----------------------------
CREATE TABLE IF EXISTS `b_supplier`;
CREATE TABLE `b_supplier` (
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
-- Table structure for `b_bid`
-- ----------------------------
DROP TABLE IF EXISTS `b_bid`;
CREATE TABLE `b_bid` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `create_by` bigint(20) DEFAULT NULL COMMENT '创建者',
  `create_time` datetime DEFAULT NULL COMMENT '创建时间/注册时间',
  `modify_by` bigint(20) DEFAULT NULL COMMENT '最后更新人',
  `modify_time` datetime DEFAULT NULL COMMENT '最后更新时间',
  `quantity` int(20) DEFAULT NULL COMMENT '数量',
  `unit` varchar(255) DEFAULT NULL COMMENT '单位',
  `contact` varchar(255) DEFAULT NULL COMMENT '联系人',
  `is_approved` tinyint DEFAULT '0' COMMENT '是否批准(0：未批准；1：已批准)',
  `tender_id` bigint(20) NOT NULL COMMENT '发标ID',
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_tender_id` FOREIGN KEY (`tender_id`) REFERENCES `b_tender` (`id`) ON DELETE RESTRICT ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8 COMMENT='投标';
