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
  `name` varchar(255) DEFAULT NULL COMMENT '名称',
  `type` varchar(20) DEFAULT NULL COMMENT '类型',
  `quantity` int(20) DEFAULT NULL COMMENT '数量',
  `unit` varchar(255) DEFAULT NULL COMMENT '单位',
  `status` varchar(255) DEFAULT NULL COMMENT '状态',
  `is_delete` tinyint DEFAULT '0' COMMENT '是否删除(0：正常；1：已删)',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8 COMMENT='发标';

-- ----------------------------
-- Records of b_tender
-- ----------------------------
INSERT INTO `b_tender` VALUES ('5', '1', '2019-06-02 16:24:58', null, null, '招标1', 'typeA', '100', 'box', 'box', '0');
INSERT INTO `b_tender` VALUES ('6', '1', '2019-06-02 16:24:58', null, null, '招标2', 'typeA', '200', 'box', 'box', '0');
INSERT INTO `b_tender` VALUES ('7', '1', '2019-06-02 16:24:58', null, null, '招标3', 'typeA', '300', 'box', 'box', '0');
INSERT INTO `b_tender` VALUES ('8', '1', '2019-06-02 16:24:58', null, null, '招标4', 'typeA', '400', 'box', 'box', '0');
INSERT INTO `b_tender` VALUES ('9', '1', '2019-06-02 16:24:58', null, null, '招标5', 'typeA', '500', 'box', 'box', '0');
