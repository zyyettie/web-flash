/*
Navicat MySQL Data Transfer

Source Server         : localhost
Source Server Version : 50725
Source Host           : localhost:3306
Source Database       : guns-lite

Target Server Type    : MYSQL
Target Server Version : 50725
File Encoding         : 65001

Date: 2019-03-18 20:33:12
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `t_cms_article`
-- ----------------------------
DROP TABLE IF EXISTS `t_cms_article`;
CREATE TABLE `t_cms_article` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `create_by` bigint(20) DEFAULT NULL COMMENT '创建者',
  `create_time` datetime DEFAULT NULL COMMENT '创建时间/注册时间',
  `modify_by` bigint(20) DEFAULT NULL COMMENT '最后更新人',
  `modify_time` datetime DEFAULT NULL COMMENT '最后更新时间',
  `author` varchar(255) DEFAULT NULL,
  `content` text,
  `title` varchar(255) DEFAULT NULL,
  `id_channel` bigint(20) DEFAULT NULL,
  `img` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8 COMMENT='文章';

-- ----------------------------
-- Table structure for `t_cms_banner`
-- ----------------------------
DROP TABLE IF EXISTS `t_cms_banner`;
CREATE TABLE `t_cms_banner` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `create_by` bigint(20) DEFAULT NULL COMMENT '创建者',
  `create_time` datetime DEFAULT NULL COMMENT '创建时间/注册时间',
  `modify_by` bigint(20) DEFAULT NULL COMMENT '最后更新人',
  `modify_time` datetime DEFAULT NULL COMMENT '最后更新时间',
  `title` varchar(255) DEFAULT NULL,
  `url` varchar(255) DEFAULT NULL,
  `type` varchar(18) DEFAULT NULL,
  `id_file` bigint(20) DEFAULT NULL COMMENT 'banner文件id',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8 COMMENT='banner';

-- ----------------------------
-- Table structure for `t_cms_channel`
-- ----------------------------
DROP TABLE IF EXISTS `t_cms_channel`;
CREATE TABLE `t_cms_channel` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `create_by` bigint(20) DEFAULT NULL COMMENT '创建者',
  `create_time` datetime DEFAULT NULL COMMENT '创建时间/注册时间',
  `modify_by` bigint(20) DEFAULT NULL COMMENT '最后更新者',
  `modify_time` datetime DEFAULT NULL COMMENT '最后更新时间',
  `name` varchar(255) DEFAULT NULL,
  `code` varchar(36) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8 COMMENT='栏目';

-- ----------------------------
-- Table structure for `t_cms_contacts`
-- ----------------------------
DROP TABLE IF EXISTS `t_cms_contacts`;
CREATE TABLE `t_cms_contacts` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `create_by` bigint(20) DEFAULT NULL COMMENT '创建人',
  `create_time` datetime DEFAULT NULL COMMENT '创建时间/注册时间',
  `modify_by` bigint(20) DEFAULT NULL COMMENT '最后更新人',
  `modify_time` datetime DEFAULT NULL COMMENT '最后更新时间',
  `email` varchar(255) DEFAULT NULL,
  `mobile` varchar(255) DEFAULT NULL,
  `remark` varchar(255) DEFAULT NULL,
  `user_name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COMMENT='客户邀约信息';

-- ----------------------------
-- Records of t_snow_product
-- ----------------------------

-- ----------------------------
-- Table structure for `t_sys_cfg`
-- ----------------------------
DROP TABLE IF EXISTS `t_sys_cfg`;
CREATE TABLE `t_sys_cfg` (
  `id` bigint(64) NOT NULL AUTO_INCREMENT COMMENT '自增主键',
  `cfg_name` varchar(100) DEFAULT NULL COMMENT '参数名',
  `cfg_value` varchar(3000) DEFAULT NULL COMMENT '参数值',
  `cfg_desc` varchar(200) DEFAULT NULL COMMENT '参数描述',
  `create_time` datetime DEFAULT NULL,
  `create_by` bigint(20) DEFAULT NULL,
  `modify_time` datetime DEFAULT NULL,
  `modify_by` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COMMENT='系统参数';
-- ----------------------------
-- Records of t_sys_cfg
-- ----------------------------
INSERT INTO `t_sys_cfg` (`id`, `cfg_name`, `cfg_value`, `cfg_desc`, `create_time`, `create_by`, `modify_time`, `modify_by`) VALUES ('1', 'system.app.name', 'tender bid system', '应用名称update by 2019-03-27 11:47:04', null, null, '2019-04-15 21:36:07', '1');
INSERT INTO `t_sys_cfg` (`id`, `cfg_name`, `cfg_value`, `cfg_desc`, `create_time`, `create_by`, `modify_time`, `modify_by`) VALUES ('2', 'system.file.upload.path', 'D:\\data\\tender\\runtime\\upload', '系统默认上传文件路径', null, null, '2019-04-15 21:36:17', '1');

-- ----------------------------
-- Table structure for `t_sys_dept`
-- ----------------------------
DROP TABLE IF EXISTS `t_sys_dept`;
CREATE TABLE `t_sys_dept` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键id',
  `num` int(11) DEFAULT NULL COMMENT '排序',
  `pid` int(11) DEFAULT NULL COMMENT '父部门id',
  `pids` varchar(255) DEFAULT NULL COMMENT '父级ids',
  `simplename` varchar(45) DEFAULT NULL COMMENT '简称',
  `fullname` varchar(255) DEFAULT NULL COMMENT '全称',
  `tips` varchar(255) DEFAULT NULL COMMENT '提示',
  `version` int(11) DEFAULT NULL COMMENT '版本（乐观锁保留字段）',
  `create_time` datetime DEFAULT NULL,
  `create_by` bigint(20) DEFAULT NULL,
  `modify_time` datetime DEFAULT NULL,
  `modify_by` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8 COMMENT='部门表';
-- ----------------------------
-- Records of t_sys_dept
-- ----------------------------
INSERT INTO `t_sys_dept` (`id`, `num`, `pid`, `pids`, `simplename`, `fullname`, `tips`, `version`, `create_time`, `create_by`, `modify_time`, `modify_by`) VALUES ('24', '1', '0', '[0],', '总公司', '总公司', '', null, null, null, null, null);
INSERT INTO `t_sys_dept` (`id`, `num`, `pid`, `pids`, `simplename`, `fullname`, `tips`, `version`, `create_time`, `create_by`, `modify_time`, `modify_by`) VALUES ('25', '2', '24', '[0],[24],', '开发部', '开发部', '', null, null, null, null, null);
INSERT INTO `t_sys_dept` (`id`, `num`, `pid`, `pids`, `simplename`, `fullname`, `tips`, `version`, `create_time`, `create_by`, `modify_time`, `modify_by`) VALUES ('26', '3', '24', '[0],[24],', '运营部', '运营部', '', null, null, null, null, null);
INSERT INTO `t_sys_dept` (`id`, `num`, `pid`, `pids`, `simplename`, `fullname`, `tips`, `version`, `create_time`, `create_by`, `modify_time`, `modify_by`) VALUES ('27', '4', '24', '[0],[24],', '战略部', '战略部', '', null, null, null, null, null);
INSERT INTO `t_sys_dept` (`id`, `num`, `pid`, `pids`, `simplename`, `fullname`, `tips`, `version`, `create_time`, `create_by`, `modify_time`, `modify_by`) VALUES ('28', '5', '24', '[0],[24],', 'tender dept', 'tender department', '', null, null, null, null, null);
INSERT INTO `t_sys_dept` (`id`, `num`, `pid`, `pids`, `simplename`, `fullname`, `tips`, `version`, `create_time`, `create_by`, `modify_time`, `modify_by`) VALUES ('29', '6', '24', '[0],[24],', 'vendor dept', 'vendor department', '', null, null, null, null, null);

-- ----------------------------
-- Table structure for `t_sys_dict`
-- ----------------------------
DROP TABLE IF EXISTS `t_sys_dict`;
CREATE TABLE `t_sys_dict` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键id',
  `num` varchar(32) DEFAULT NULL COMMENT '排序',
  `pid` int(11) DEFAULT NULL COMMENT '父级字典',
  `name` varchar(255) DEFAULT NULL COMMENT '名称',
  `tips` varchar(255) DEFAULT NULL COMMENT '提示',
  `create_time` datetime DEFAULT NULL,
  `create_by` bigint(20) DEFAULT NULL,
  `modify_time` datetime DEFAULT NULL,
  `modify_by` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=71 DEFAULT CHARSET=utf8 COMMENT='字典表';
-- ----------------------------
-- Records of t_sys_dict
-- ----------------------------
INSERT INTO `t_sys_dict` (`id`, `num`, `pid`, `name`, `tips`, `create_time`, `create_by`, `modify_time`, `modify_by`) VALUES ('16', '0', '0', '状态', null, null, null, null, null);
INSERT INTO `t_sys_dict` (`id`, `num`, `pid`, `name`, `tips`, `create_time`, `create_by`, `modify_time`, `modify_by`) VALUES ('17', '1', '16', '启用', null, null, null, null, null);
INSERT INTO `t_sys_dict` (`id`, `num`, `pid`, `name`, `tips`, `create_time`, `create_by`, `modify_time`, `modify_by`) VALUES ('18', '2', '16', '禁用', null, null, null, null, null);
INSERT INTO `t_sys_dict` (`id`, `num`, `pid`, `name`, `tips`, `create_time`, `create_by`, `modify_time`, `modify_by`) VALUES ('29', '0', '0', '性别', null, null, null, null, null);
INSERT INTO `t_sys_dict` (`id`, `num`, `pid`, `name`, `tips`, `create_time`, `create_by`, `modify_time`, `modify_by`) VALUES ('30', '1', '29', '男', null, null, null, null, null);
INSERT INTO `t_sys_dict` (`id`, `num`, `pid`, `name`, `tips`, `create_time`, `create_by`, `modify_time`, `modify_by`) VALUES ('31', '2', '29', '女', null, null, null, null, null);
INSERT INTO `t_sys_dict` (`id`, `num`, `pid`, `name`, `tips`, `create_time`, `create_by`, `modify_time`, `modify_by`) VALUES ('35', '0', '0', '账号状态', null, null, null, null, null);
INSERT INTO `t_sys_dict` (`id`, `num`, `pid`, `name`, `tips`, `create_time`, `create_by`, `modify_time`, `modify_by`) VALUES ('36', '1', '35', '启用', null, null, null, null, null);
INSERT INTO `t_sys_dict` (`id`, `num`, `pid`, `name`, `tips`, `create_time`, `create_by`, `modify_time`, `modify_by`) VALUES ('37', '2', '35', '冻结', null, null, null, null, null);
INSERT INTO `t_sys_dict` (`id`, `num`, `pid`, `name`, `tips`, `create_time`, `create_by`, `modify_time`, `modify_by`) VALUES ('38', '3', '35', '已删除', null, null, null, null, null);
INSERT INTO `t_sys_dict` (`id`, `num`, `pid`, `name`, `tips`, `create_time`, `create_by`, `modify_time`, `modify_by`) VALUES ('53', '0', '0', '证件类型', null, null, null, null, null);
INSERT INTO `t_sys_dict` (`id`, `num`, `pid`, `name`, `tips`, `create_time`, `create_by`, `modify_time`, `modify_by`) VALUES ('54', '1', '53', '身份证', null, null, null, null, null);
INSERT INTO `t_sys_dict` (`id`, `num`, `pid`, `name`, `tips`, `create_time`, `create_by`, `modify_time`, `modify_by`) VALUES ('55', '2', '53', '护照', null, null, null, null, null);
INSERT INTO `t_sys_dict` (`id`, `num`, `pid`, `name`, `tips`, `create_time`, `create_by`, `modify_time`, `modify_by`) VALUES ('68', '0', '0', '是否', null, '2019-01-13 14:18:21', '1', '2019-01-13 14:18:21', '1');
INSERT INTO `t_sys_dict` (`id`, `num`, `pid`, `name`, `tips`, `create_time`, `create_by`, `modify_time`, `modify_by`) VALUES ('69', '1', '68', '是', null, '2019-01-13 14:18:21', '1', '2019-01-13 14:18:21', '1');
INSERT INTO `t_sys_dict` (`id`, `num`, `pid`, `name`, `tips`, `create_time`, `create_by`, `modify_time`, `modify_by`) VALUES ('70', '0', '68', '否', null, '2019-01-13 14:18:21', '1', '2019-01-13 14:18:21', '1');

-- ----------------------------
-- Table structure for `t_sys_file_info`
-- ----------------------------
DROP TABLE IF EXISTS `t_sys_file_info`;
CREATE TABLE `t_sys_file_info` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `create_by` bigint(20) DEFAULT NULL COMMENT '创建人',
  `create_time` datetime DEFAULT NULL COMMENT '创建时间/注册时间',
  `modify_by` bigint(20) DEFAULT NULL COMMENT '最后更新人',
  `modify_time` datetime DEFAULT NULL COMMENT '最后更新时间',
  `original_file_name` varchar(255) DEFAULT NULL,
  `real_file_name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8 COMMENT='文件信息';

-- ----------------------------
-- Table structure for `t_sys_login_log`
-- ----------------------------
DROP TABLE IF EXISTS `t_sys_login_log`;
CREATE TABLE `t_sys_login_log` (
  `id` int(65) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `logname` varchar(255) DEFAULT NULL COMMENT '日志名称',
  `userid` int(65) DEFAULT NULL COMMENT '管理员id',
  `create_time` datetime DEFAULT NULL COMMENT '创建时间',
  `succeed` varchar(255) DEFAULT NULL COMMENT '是否执行成功',
  `message` text COMMENT '具体消息',
  `ip` varchar(255) DEFAULT NULL COMMENT '登录ip',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COMMENT='登录记录';
-- ----------------------------
-- Records of t_sys_login_log
-- ----------------------------
INSERT INTO `t_sys_login_log` (`id`, `logname`, `userid`, `create_time`, `succeed`, `message`, `ip`) VALUES ('71', '登录日志', '1', '2019-05-10 13:17:43', '成功', null, '127.0.0.1');
INSERT INTO `t_sys_login_log` (`id`, `logname`, `userid`, `create_time`, `succeed`, `message`, `ip`) VALUES ('72', '登录日志', '1', '2019-05-12 13:36:56', '成功', null, '127.0.0.1');

-- ----------------------------
-- Table structure for `t_sys_menu`
-- ----------------------------
DROP TABLE IF EXISTS `t_sys_menu`;
CREATE TABLE `t_sys_menu` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '主键id',
  `code` varchar(255) DEFAULT NULL COMMENT '菜单编号',
  `pcode` varchar(255) DEFAULT NULL COMMENT '菜单父编号',
  `pcodes` varchar(255) DEFAULT NULL COMMENT '当前菜单的所有父菜单编号',
  `name` varchar(255) DEFAULT NULL COMMENT '菜单名称',
  `icon` varchar(255) DEFAULT NULL COMMENT '菜单图标',
  `url` varchar(255) DEFAULT NULL COMMENT 'url地址',
  `num` int(65) DEFAULT NULL COMMENT '菜单排序号',
  `levels` int(65) DEFAULT NULL COMMENT '菜单层级',
  `ismenu` int(11) DEFAULT NULL COMMENT '是否是菜单（1：是  0：不是）',
  `tips` varchar(255) DEFAULT NULL COMMENT '备注',
  `status` int(65) DEFAULT NULL COMMENT '菜单状态 :  1:启用   0:不启用',
  `isopen` int(11) DEFAULT NULL COMMENT '是否打开:    1:打开   0:不打开',
  `create_time` datetime DEFAULT NULL,
  `create_by` bigint(20) DEFAULT NULL,
  `modify_time` datetime DEFAULT NULL,
  `modify_by` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=211 DEFAULT CHARSET=utf8 COMMENT='菜单表';
-- ----------------------------
-- Records of t_sys_menu
-- ----------------------------
INSERT INTO `t_sys_menu` (`id`, `code`, `pcode`, `pcodes`, `name`, `icon`, `url`, `num`, `levels`, `ismenu`, `tips`, `status`, `isopen`, `create_time`, `create_by`, `modify_time`, `modify_by`) VALUES ('105', 'system', '0', '[0],', '系统管理', 'fa-cog', '/system', '4', '1', '1', null, '1', '1', null, null, null, null);
INSERT INTO `t_sys_menu` (`id`, `code`, `pcode`, `pcodes`, `name`, `icon`, `url`, `num`, `levels`, `ismenu`, `tips`, `status`, `isopen`, `create_time`, `create_by`, `modify_time`, `modify_by`) VALUES ('106', 'mgr', 'system', '[0],[system],', '用户管理', '', '/mgr', '1', '2', '1', null, '1', null, null, null, '2019-04-16 18:59:16', '1');
INSERT INTO `t_sys_menu` (`id`, `code`, `pcode`, `pcodes`, `name`, `icon`, `url`, `num`, `levels`, `ismenu`, `tips`, `status`, `isopen`, `create_time`, `create_by`, `modify_time`, `modify_by`) VALUES ('107', 'mgr_add', 'mgr', '[0],[system],[mgr],', '添加用户', '', '/mgr/add', '1', '3', '0', null, '1', null, null, null, null, null);
INSERT INTO `t_sys_menu` (`id`, `code`, `pcode`, `pcodes`, `name`, `icon`, `url`, `num`, `levels`, `ismenu`, `tips`, `status`, `isopen`, `create_time`, `create_by`, `modify_time`, `modify_by`) VALUES ('108', 'mgr_edit', 'mgr', '[0],[system],[mgr],', '修改用户', '', '/mgr/edit', '2', '3', '0', null, '1', null, null, null, null, null);
INSERT INTO `t_sys_menu` (`id`, `code`, `pcode`, `pcodes`, `name`, `icon`, `url`, `num`, `levels`, `ismenu`, `tips`, `status`, `isopen`, `create_time`, `create_by`, `modify_time`, `modify_by`) VALUES ('109', 'mgr_delete', 'mgr', '[0],[system],[mgr],', '删除用户', null, '/mgr/delete', '3', '3', '0', null, '1', '0', null, null, null, null);
INSERT INTO `t_sys_menu` (`id`, `code`, `pcode`, `pcodes`, `name`, `icon`, `url`, `num`, `levels`, `ismenu`, `tips`, `status`, `isopen`, `create_time`, `create_by`, `modify_time`, `modify_by`) VALUES ('110', 'mgr_reset', 'mgr', '[0],[system],[mgr],', '重置密码', null, '/mgr/reset', '4', '3', '0', null, '1', '0', null, null, null, null);
INSERT INTO `t_sys_menu` (`id`, `code`, `pcode`, `pcodes`, `name`, `icon`, `url`, `num`, `levels`, `ismenu`, `tips`, `status`, `isopen`, `create_time`, `create_by`, `modify_time`, `modify_by`) VALUES ('111', 'mgr_freeze', 'mgr', '[0],[system],[mgr],', '冻结用户', null, '/mgr/freeze', '5', '3', '0', null, '1', '0', null, null, null, null);
INSERT INTO `t_sys_menu` (`id`, `code`, `pcode`, `pcodes`, `name`, `icon`, `url`, `num`, `levels`, `ismenu`, `tips`, `status`, `isopen`, `create_time`, `create_by`, `modify_time`, `modify_by`) VALUES ('112', 'mgr_unfreeze', 'mgr', '[0],[system],[mgr],', '解除冻结用户', null, '/mgr/unfreeze', '6', '3', '0', null, '1', '0', null, null, null, null);
INSERT INTO `t_sys_menu` (`id`, `code`, `pcode`, `pcodes`, `name`, `icon`, `url`, `num`, `levels`, `ismenu`, `tips`, `status`, `isopen`, `create_time`, `create_by`, `modify_time`, `modify_by`) VALUES ('113', 'mgr_setRole', 'mgr', '[0],[system],[mgr],', '分配角色', null, '/mgr/setRole', '7', '3', '0', null, '1', '0', null, null, null, null);
INSERT INTO `t_sys_menu` (`id`, `code`, `pcode`, `pcodes`, `name`, `icon`, `url`, `num`, `levels`, `ismenu`, `tips`, `status`, `isopen`, `create_time`, `create_by`, `modify_time`, `modify_by`) VALUES ('114', 'role', 'system', '[0],[system],', '角色管理', null, '/role', '2', '2', '1', null, '1', '0', null, null, null, null);
INSERT INTO `t_sys_menu` (`id`, `code`, `pcode`, `pcodes`, `name`, `icon`, `url`, `num`, `levels`, `ismenu`, `tips`, `status`, `isopen`, `create_time`, `create_by`, `modify_time`, `modify_by`) VALUES ('115', 'role_add', 'role', '[0],[system],[role],', '添加角色', null, '/role/add', '1', '3', '0', null, '1', '0', null, null, null, null);
INSERT INTO `t_sys_menu` (`id`, `code`, `pcode`, `pcodes`, `name`, `icon`, `url`, `num`, `levels`, `ismenu`, `tips`, `status`, `isopen`, `create_time`, `create_by`, `modify_time`, `modify_by`) VALUES ('116', 'role_edit', 'role', '[0],[system],[role],', '修改角色', null, '/role/edit', '2', '3', '0', null, '1', '0', null, null, null, null);
INSERT INTO `t_sys_menu` (`id`, `code`, `pcode`, `pcodes`, `name`, `icon`, `url`, `num`, `levels`, `ismenu`, `tips`, `status`, `isopen`, `create_time`, `create_by`, `modify_time`, `modify_by`) VALUES ('117', 'role_remove', 'role', '[0],[system],[role],', '删除角色', null, '/role/remove', '3', '3', '0', null, '1', '0', null, null, null, null);
INSERT INTO `t_sys_menu` (`id`, `code`, `pcode`, `pcodes`, `name`, `icon`, `url`, `num`, `levels`, `ismenu`, `tips`, `status`, `isopen`, `create_time`, `create_by`, `modify_time`, `modify_by`) VALUES ('118', 'role_setAuthority', 'role', '[0],[system],[role],', '配置权限', null, '/role/setAuthority', '4', '3', '0', null, '1', '0', null, null, null, null);
INSERT INTO `t_sys_menu` (`id`, `code`, `pcode`, `pcodes`, `name`, `icon`, `url`, `num`, `levels`, `ismenu`, `tips`, `status`, `isopen`, `create_time`, `create_by`, `modify_time`, `modify_by`) VALUES ('119', 'menu', 'system', '[0],[system],', '菜单管理', null, '/menu', '4', '2', '1', null, '1', '0', null, null, null, null);
INSERT INTO `t_sys_menu` (`id`, `code`, `pcode`, `pcodes`, `name`, `icon`, `url`, `num`, `levels`, `ismenu`, `tips`, `status`, `isopen`, `create_time`, `create_by`, `modify_time`, `modify_by`) VALUES ('120', 'menu_add', 'menu', '[0],[system],[menu],', '添加菜单', null, '/menu/add', '1', '3', '0', null, '1', '0', null, null, null, null);
INSERT INTO `t_sys_menu` (`id`, `code`, `pcode`, `pcodes`, `name`, `icon`, `url`, `num`, `levels`, `ismenu`, `tips`, `status`, `isopen`, `create_time`, `create_by`, `modify_time`, `modify_by`) VALUES ('121', 'menu_edit', 'menu', '[0],[system],[menu],', '修改菜单', null, '/menu/edit', '2', '3', '0', null, '1', '0', null, null, null, null);
INSERT INTO `t_sys_menu` (`id`, `code`, `pcode`, `pcodes`, `name`, `icon`, `url`, `num`, `levels`, `ismenu`, `tips`, `status`, `isopen`, `create_time`, `create_by`, `modify_time`, `modify_by`) VALUES ('122', 'menu_remove', 'menu', '[0],[system],[menu],', '删除菜单', null, '/menu/remove', '3', '3', '0', null, '1', '0', null, null, null, null);
INSERT INTO `t_sys_menu` (`id`, `code`, `pcode`, `pcodes`, `name`, `icon`, `url`, `num`, `levels`, `ismenu`, `tips`, `status`, `isopen`, `create_time`, `create_by`, `modify_time`, `modify_by`) VALUES ('128', 'log', 'system', '[0],[system],', '业务日志', null, '/log', '6', '2', '1', null, '1', '0', null, null, null, null);
INSERT INTO `t_sys_menu` (`id`, `code`, `pcode`, `pcodes`, `name`, `icon`, `url`, `num`, `levels`, `ismenu`, `tips`, `status`, `isopen`, `create_time`, `create_by`, `modify_time`, `modify_by`) VALUES ('131', 'dept', 'system', '[0],[system],', '部门管理', null, '/dept', '3', '2', '1', null, '1', null, null, null, null, null);
INSERT INTO `t_sys_menu` (`id`, `code`, `pcode`, `pcodes`, `name`, `icon`, `url`, `num`, `levels`, `ismenu`, `tips`, `status`, `isopen`, `create_time`, `create_by`, `modify_time`, `modify_by`) VALUES ('132', 'dict', 'system', '[0],[system],', '字典管理', null, '/dict', '4', '2', '1', null, '1', null, null, null, null, null);
INSERT INTO `t_sys_menu` (`id`, `code`, `pcode`, `pcodes`, `name`, `icon`, `url`, `num`, `levels`, `ismenu`, `tips`, `status`, `isopen`, `create_time`, `create_by`, `modify_time`, `modify_by`) VALUES ('133', 'loginLog', 'system', '[0],[system],', '登录日志', null, '/loginLog', '6', '2', '1', null, '1', null, null, null, null, null);
INSERT INTO `t_sys_menu` (`id`, `code`, `pcode`, `pcodes`, `name`, `icon`, `url`, `num`, `levels`, `ismenu`, `tips`, `status`, `isopen`, `create_time`, `create_by`, `modify_time`, `modify_by`) VALUES ('134', 'log_clean', 'log', '[0],[system],[log],', '清空日志', null, '/log/delLog', '3', '3', '0', null, '1', null, null, null, null, null);
INSERT INTO `t_sys_menu` (`id`, `code`, `pcode`, `pcodes`, `name`, `icon`, `url`, `num`, `levels`, `ismenu`, `tips`, `status`, `isopen`, `create_time`, `create_by`, `modify_time`, `modify_by`) VALUES ('135', 'dept_add', 'dept', '[0],[system],[dept],', '添加部门', null, '/dept/add', '1', '3', '0', null, '1', null, null, null, null, null);
INSERT INTO `t_sys_menu` (`id`, `code`, `pcode`, `pcodes`, `name`, `icon`, `url`, `num`, `levels`, `ismenu`, `tips`, `status`, `isopen`, `create_time`, `create_by`, `modify_time`, `modify_by`) VALUES ('136', 'dept_update', 'dept', '[0],[system],[dept],', '修改部门', null, '/dept/update', '1', '3', '0', null, '1', null, null, null, null, null);
INSERT INTO `t_sys_menu` (`id`, `code`, `pcode`, `pcodes`, `name`, `icon`, `url`, `num`, `levels`, `ismenu`, `tips`, `status`, `isopen`, `create_time`, `create_by`, `modify_time`, `modify_by`) VALUES ('137', 'dept_delete', 'dept', '[0],[system],[dept],', '删除部门', null, '/dept/delete', '1', '3', '0', null, '1', null, null, null, null, null);
INSERT INTO `t_sys_menu` (`id`, `code`, `pcode`, `pcodes`, `name`, `icon`, `url`, `num`, `levels`, `ismenu`, `tips`, `status`, `isopen`, `create_time`, `create_by`, `modify_time`, `modify_by`) VALUES ('138', 'dict_add', 'dict', '[0],[system],[dict],', '添加字典', null, '/dict/add', '1', '3', '0', null, '1', null, null, null, null, null);
INSERT INTO `t_sys_menu` (`id`, `code`, `pcode`, `pcodes`, `name`, `icon`, `url`, `num`, `levels`, `ismenu`, `tips`, `status`, `isopen`, `create_time`, `create_by`, `modify_time`, `modify_by`) VALUES ('139', 'dict_update', 'dict', '[0],[system],[dict],', '修改字典', null, '/dict/update', '1', '3', '0', null, '1', null, null, null, null, null);
INSERT INTO `t_sys_menu` (`id`, `code`, `pcode`, `pcodes`, `name`, `icon`, `url`, `num`, `levels`, `ismenu`, `tips`, `status`, `isopen`, `create_time`, `create_by`, `modify_time`, `modify_by`) VALUES ('140', 'dict_delete', 'dict', '[0],[system],[dict],', '删除字典', null, '/dict/delete', '1', '3', '0', null, '1', null, null, null, null, null);
INSERT INTO `t_sys_menu` (`id`, `code`, `pcode`, `pcodes`, `name`, `icon`, `url`, `num`, `levels`, `ismenu`, `tips`, `status`, `isopen`, `create_time`, `create_by`, `modify_time`, `modify_by`) VALUES ('150', 'to_menu_edit', 'menu', '[0],[system],[menu],', '菜单编辑跳转', '', '/menu/menu_edit', '4', '3', '0', null, '1', null, null, null, null, null);
INSERT INTO `t_sys_menu` (`id`, `code`, `pcode`, `pcodes`, `name`, `icon`, `url`, `num`, `levels`, `ismenu`, `tips`, `status`, `isopen`, `create_time`, `create_by`, `modify_time`, `modify_by`) VALUES ('151', 'menu_list', 'menu', '[0],[system],[menu],', '菜单列表', '', '/menu/list', '5', '3', '0', null, '1', null, null, null, null, null);
INSERT INTO `t_sys_menu` (`id`, `code`, `pcode`, `pcodes`, `name`, `icon`, `url`, `num`, `levels`, `ismenu`, `tips`, `status`, `isopen`, `create_time`, `create_by`, `modify_time`, `modify_by`) VALUES ('152', 'to_dept_update', 'dept', '[0],[system],[dept],', '修改部门跳转', '', '/dept/dept_update', '4', '3', '0', null, '1', null, null, null, null, null);
INSERT INTO `t_sys_menu` (`id`, `code`, `pcode`, `pcodes`, `name`, `icon`, `url`, `num`, `levels`, `ismenu`, `tips`, `status`, `isopen`, `create_time`, `create_by`, `modify_time`, `modify_by`) VALUES ('153', 'dept_list', 'dept', '[0],[system],[dept],', '部门列表', '', '/dept/list', '5', '3', '0', null, '1', null, null, null, null, null);
INSERT INTO `t_sys_menu` (`id`, `code`, `pcode`, `pcodes`, `name`, `icon`, `url`, `num`, `levels`, `ismenu`, `tips`, `status`, `isopen`, `create_time`, `create_by`, `modify_time`, `modify_by`) VALUES ('154', 'dept_detail', 'dept', '[0],[system],[dept],', '部门详情', '', '/dept/detail', '6', '3', '0', null, '1', null, null, null, null, null);
INSERT INTO `t_sys_menu` (`id`, `code`, `pcode`, `pcodes`, `name`, `icon`, `url`, `num`, `levels`, `ismenu`, `tips`, `status`, `isopen`, `create_time`, `create_by`, `modify_time`, `modify_by`) VALUES ('155', 'to_dict_edit', 'dict', '[0],[system],[dict],', '修改菜单跳转', '', '/dict/dict_edit', '4', '3', '0', null, '1', null, null, null, null, null);
INSERT INTO `t_sys_menu` (`id`, `code`, `pcode`, `pcodes`, `name`, `icon`, `url`, `num`, `levels`, `ismenu`, `tips`, `status`, `isopen`, `create_time`, `create_by`, `modify_time`, `modify_by`) VALUES ('156', 'dict_list', 'dict', '[0],[system],[dict],', '字典列表', '', '/dict/list', '5', '3', '0', null, '1', null, null, null, null, null);
INSERT INTO `t_sys_menu` (`id`, `code`, `pcode`, `pcodes`, `name`, `icon`, `url`, `num`, `levels`, `ismenu`, `tips`, `status`, `isopen`, `create_time`, `create_by`, `modify_time`, `modify_by`) VALUES ('157', 'dict_detail', 'dict', '[0],[system],[dict],', '字典详情', '', '/dict/detail', '6', '3', '0', null, '1', null, null, null, null, null);
INSERT INTO `t_sys_menu` (`id`, `code`, `pcode`, `pcodes`, `name`, `icon`, `url`, `num`, `levels`, `ismenu`, `tips`, `status`, `isopen`, `create_time`, `create_by`, `modify_time`, `modify_by`) VALUES ('159', 'log_detail', 'log', '[0],[system],[log],', '日志详情', '', '/log/detail', '3', '3', '0', null, '1', null, null, null, null, null);
INSERT INTO `t_sys_menu` (`id`, `code`, `pcode`, `pcodes`, `name`, `icon`, `url`, `num`, `levels`, `ismenu`, `tips`, `status`, `isopen`, `create_time`, `create_by`, `modify_time`, `modify_by`) VALUES ('160', 'del_login_log', 'loginLog', '[0],[system],[loginLog],', '清空登录日志', '', '/loginLog/delLoginLog', '1', '3', '0', null, '1', null, null, null, null, null);
INSERT INTO `t_sys_menu` (`id`, `code`, `pcode`, `pcodes`, `name`, `icon`, `url`, `num`, `levels`, `ismenu`, `tips`, `status`, `isopen`, `create_time`, `create_by`, `modify_time`, `modify_by`) VALUES ('161', 'login_log_list', 'loginLog', '[0],[system],[loginLog],', '登录日志列表', '', '/loginLog/list', '2', '3', '0', null, '1', null, null, null, null, null);
INSERT INTO `t_sys_menu` (`id`, `code`, `pcode`, `pcodes`, `name`, `icon`, `url`, `num`, `levels`, `ismenu`, `tips`, `status`, `isopen`, `create_time`, `create_by`, `modify_time`, `modify_by`) VALUES ('162', 'to_role_edit', 'role', '[0],[system],[role],', '修改角色跳转', '', '/role/role_edit', '5', '3', '0', null, '1', null, null, null, null, null);
INSERT INTO `t_sys_menu` (`id`, `code`, `pcode`, `pcodes`, `name`, `icon`, `url`, `num`, `levels`, `ismenu`, `tips`, `status`, `isopen`, `create_time`, `create_by`, `modify_time`, `modify_by`) VALUES ('163', 'to_role_assign', 'role', '[0],[system],[role],', '角色分配跳转', '', '/role/role_assign', '6', '3', '0', null, '1', null, null, null, null, null);
INSERT INTO `t_sys_menu` (`id`, `code`, `pcode`, `pcodes`, `name`, `icon`, `url`, `num`, `levels`, `ismenu`, `tips`, `status`, `isopen`, `create_time`, `create_by`, `modify_time`, `modify_by`) VALUES ('164', 'role_list', 'role', '[0],[system],[role],', '角色列表', '', '/role/list', '7', '3', '0', null, '1', null, null, null, null, null);
INSERT INTO `t_sys_menu` (`id`, `code`, `pcode`, `pcodes`, `name`, `icon`, `url`, `num`, `levels`, `ismenu`, `tips`, `status`, `isopen`, `create_time`, `create_by`, `modify_time`, `modify_by`) VALUES ('165', 'to_assign_role', 'mgr', '[0],[system],[mgr],', '分配角色跳转', '', '/mgr/role_assign', '8', '3', '0', null, '1', null, null, null, null, null);
INSERT INTO `t_sys_menu` (`id`, `code`, `pcode`, `pcodes`, `name`, `icon`, `url`, `num`, `levels`, `ismenu`, `tips`, `status`, `isopen`, `create_time`, `create_by`, `modify_time`, `modify_by`) VALUES ('166', 'to_user_edit', 'mgr', '[0],[system],[mgr],', '编辑用户跳转', '', '/mgr/user_edit', '9', '3', '0', null, '1', null, null, null, null, null);
INSERT INTO `t_sys_menu` (`id`, `code`, `pcode`, `pcodes`, `name`, `icon`, `url`, `num`, `levels`, `ismenu`, `tips`, `status`, `isopen`, `create_time`, `create_by`, `modify_time`, `modify_by`) VALUES ('167', 'mgr_list', 'mgr', '[0],[system],[mgr],', '用户列表', '', '/mgr/list', '10', '3', '0', null, '1', null, null, null, null, null);
INSERT INTO `t_sys_menu` (`id`, `code`, `pcode`, `pcodes`, `name`, `icon`, `url`, `num`, `levels`, `ismenu`, `tips`, `status`, `isopen`, `create_time`, `create_by`, `modify_time`, `modify_by`) VALUES ('198', 'cfg', 'system', '[0],[system],', '参数管理', '', '/cfg', '10', '2', '1', null, '1', null, null, null, null, null);
INSERT INTO `t_sys_menu` (`id`, `code`, `pcode`, `pcodes`, `name`, `icon`, `url`, `num`, `levels`, `ismenu`, `tips`, `status`, `isopen`, `create_time`, `create_by`, `modify_time`, `modify_by`) VALUES ('199', 'cfg_add', 'cfg', '[0],[system],[cfg],', '添加系统参数', '', '/cfg/add', '1', '3', '0', null, '1', null, null, null, null, null);
INSERT INTO `t_sys_menu` (`id`, `code`, `pcode`, `pcodes`, `name`, `icon`, `url`, `num`, `levels`, `ismenu`, `tips`, `status`, `isopen`, `create_time`, `create_by`, `modify_time`, `modify_by`) VALUES ('200', 'cfg_update', 'cfg', '[0],[system],[cfg],', '修改系统参数', '', '/cfg/update', '2', '3', '0', null, '1', null, null, null, null, null);
INSERT INTO `t_sys_menu` (`id`, `code`, `pcode`, `pcodes`, `name`, `icon`, `url`, `num`, `levels`, `ismenu`, `tips`, `status`, `isopen`, `create_time`, `create_by`, `modify_time`, `modify_by`) VALUES ('201', 'cfg_delete', 'cfg', '[0],[system],[cfg],', '删除系统参数', '', '/cfg/delete', '3', '3', '0', null, '1', null, null, null, null, null);
INSERT INTO `t_sys_menu` (`id`, `code`, `pcode`, `pcodes`, `name`, `icon`, `url`, `num`, `levels`, `ismenu`, `tips`, `status`, `isopen`, `create_time`, `create_by`, `modify_time`, `modify_by`) VALUES ('202', 'task', 'system', '[0],[system],', '任务管理', '', '/task', '11', '2', '1', '', '1', null, null, null, null, null);
INSERT INTO `t_sys_menu` (`id`, `code`, `pcode`, `pcodes`, `name`, `icon`, `url`, `num`, `levels`, `ismenu`, `tips`, `status`, `isopen`, `create_time`, `create_by`, `modify_time`, `modify_by`) VALUES ('203', 'task_add', 'task', '[0],[system],[task],', '添加任务', '', '/task/add', '1', '3', '0', '', '1', null, null, null, null, null);
INSERT INTO `t_sys_menu` (`id`, `code`, `pcode`, `pcodes`, `name`, `icon`, `url`, `num`, `levels`, `ismenu`, `tips`, `status`, `isopen`, `create_time`, `create_by`, `modify_time`, `modify_by`) VALUES ('204', 'task_update', 'task', '[0],[system],[task],', '修改任务', '', '/task/update', '2', '3', '0', '', '1', null, null, null, null, null);
INSERT INTO `t_sys_menu` (`id`, `code`, `pcode`, `pcodes`, `name`, `icon`, `url`, `num`, `levels`, `ismenu`, `tips`, `status`, `isopen`, `create_time`, `create_by`, `modify_time`, `modify_by`) VALUES ('205', 'task_delete', 'task', '[0],[system],[task],', '删除任务', '', '/task/delete', '3', '3', '0', '', '1', null, null, null, null, null);
INSERT INTO `t_sys_menu` (`id`, `code`, `pcode`, `pcodes`, `name`, `icon`, `url`, `num`, `levels`, `ismenu`, `tips`, `status`, `isopen`, `create_time`, `create_by`, `modify_time`, `modify_by`) VALUES ('206', 'cms', '0', '[0],', 'CMS管理', '', '/cms', '5', '1', '1', null, '1', null, null, null, '2019-03-11 22:25:38', '1');
INSERT INTO `t_sys_menu` (`id`, `code`, `pcode`, `pcodes`, `name`, `icon`, `url`, `num`, `levels`, `ismenu`, `tips`, `status`, `isopen`, `create_time`, `create_by`, `modify_time`, `modify_by`) VALUES ('207', 'channel', 'cms', '[0],[cms],', '栏目管理', null, '/channel', '1', '2', '1', null, '1', null, '2019-03-11 22:29:55', '1', '2019-03-11 22:29:55', '1');
INSERT INTO `t_sys_menu` (`id`, `code`, `pcode`, `pcodes`, `name`, `icon`, `url`, `num`, `levels`, `ismenu`, `tips`, `status`, `isopen`, `create_time`, `create_by`, `modify_time`, `modify_by`) VALUES ('208', 'article', 'cms', '[0],[cms],', '文章管理', null, '/article', '2', '2', '1', null, '1', null, '2019-03-11 22:30:18', '1', '2019-03-11 22:30:18', '1');
INSERT INTO `t_sys_menu` (`id`, `code`, `pcode`, `pcodes`, `name`, `icon`, `url`, `num`, `levels`, `ismenu`, `tips`, `status`, `isopen`, `create_time`, `create_by`, `modify_time`, `modify_by`) VALUES ('209', 'banner', 'cms', '[0],[cms],', 'banner管理', null, '/banner', '3', '2', '1', null, '1', null, '2019-03-11 22:30:52', '1', '2019-03-11 22:30:52', '1');
INSERT INTO `t_sys_menu` (`id`, `code`, `pcode`, `pcodes`, `name`, `icon`, `url`, `num`, `levels`, `ismenu`, `tips`, `status`, `isopen`, `create_time`, `create_by`, `modify_time`, `modify_by`) VALUES ('210', 'contacts', 'cms', '[0],[cms],', '联系管理', null, '/contacts', '4', '2', '1', null, '1', null, '2019-03-18 19:45:38', '1', '2019-03-18 19:45:38', '1');
INSERT INTO `t_sys_menu` (`id`, `code`, `pcode`, `pcodes`, `name`, `icon`, `url`, `num`, `levels`, `ismenu`, `tips`, `status`, `isopen`, `create_time`, `create_by`, `modify_time`, `modify_by`) VALUES ('211', 'fileMgr', 'cms', '[0],[cms],', '文件管理', null, '/fileMgr', '5', '2', '1', null, '1', null, '2019-03-19 10:25:06', '1', '2019-03-19 10:25:06', '1');
INSERT INTO `t_sys_menu` (`id`, `code`, `pcode`, `pcodes`, `name`, `icon`, `url`, `num`, `levels`, `ismenu`, `tips`, `status`, `isopen`, `create_time`, `create_by`, `modify_time`, `modify_by`) VALUES ('214', 'task_log', 'task', '[0],[system],[task],', '任务日志', null, '/taskLog', '4', '3', '1', null, '1', null, null, null, null, null);
INSERT INTO `t_sys_menu` (`id`, `code`, `pcode`, `pcodes`, `name`, `icon`, `url`, `num`, `levels`, `ismenu`, `tips`, `status`, `isopen`, `create_time`, `create_by`, `modify_time`, `modify_by`) VALUES ('215', 'editArticle', 'article', '[0],[cms],[article]', '编辑文章', null, '/article/edit', '1', '3', '1', null, '1', null, '2019-03-11 22:30:18', '1', '2019-03-11 22:30:18', '1');
INSERT INTO `t_sys_menu` (`id`, `code`, `pcode`, `pcodes`, `name`, `icon`, `url`, `num`, `levels`, `ismenu`, `tips`, `status`, `isopen`, `create_time`, `create_by`, `modify_time`, `modify_by`) VALUES ('216', 'tender_mgr', '0', '[0],', '发标管理', null, '/tender_mgr', '1001', '1', '1', null, '1', null, '2019-07-01 22:30:18', '1', null, null);
INSERT INTO `t_sys_menu` (`id`, `code`, `pcode`, `pcodes`, `name`, `icon`, `url`, `num`, `levels`, `ismenu`, `tips`, `status`, `isopen`, `create_time`, `create_by`, `modify_time`, `modify_by`) VALUES ('217', 'tender', 'tender_mgr', '[0],[tender_mgr],', '发标', null, '/tender', '101', '2', '1', null, '1', null, '2019-07-01 22:30:18', '1', null, null);
INSERT INTO `t_sys_menu` (`id`, `code`, `pcode`, `pcodes`, `name`, `icon`, `url`, `num`, `levels`, `ismenu`, `tips`, `status`, `isopen`, `create_time`, `create_by`, `modify_time`, `modify_by`) VALUES ('218', 'tenderDetail', 'tender_mgr', '[0],[tender_mgr],', '标书详细', null, '/tenderDetail', '102', '2', '1', null, '1', null, '2019-07-01 22:30:18', '1', null, null);
INSERT INTO `t_sys_menu` (`id`, `code`, `pcode`, `pcodes`, `name`, `icon`, `url`, `num`, `levels`, `ismenu`, `tips`, `status`, `isopen`, `create_time`, `create_by`, `modify_time`, `modify_by`) VALUES ('219', 'bid_mgr', '0', '[0],', '投标管理', null, '/bid_mgr', '2001', '1', '1', null, '1', null, '2019-07-01 22:30:18', '1', null, null);
INSERT INTO `t_sys_menu` (`id`, `code`, `pcode`, `pcodes`, `name`, `icon`, `url`, `num`, `levels`, `ismenu`, `tips`, `status`, `isopen`, `create_time`, `create_by`, `modify_time`, `modify_by`) VALUES ('220', 'bid', 'bid_mgr', '[0],[bid_mgr],', '我的投标', null, '/bid', '201', '2', '1', null, '1', null, '2019-07-01 22:30:18', '1', null, null);
INSERT INTO `t_sys_menu` (`id`, `code`, `pcode`, `pcodes`, `name`, `icon`, `url`, `num`, `levels`, `ismenu`, `tips`, `status`, `isopen`, `create_time`, `create_by`, `modify_time`, `modify_by`) VALUES ('221', 'tenderbid', 'bid_mgr', '[0],[bid_mgr],', '投标', null, '/tenderbid', '202', '2', '1', null, '1', null, '2019-07-01 22:30:18', '1', null, null);

-- ----------------------------
-- Table structure for `t_sys_notice`
-- ----------------------------
DROP TABLE IF EXISTS `t_sys_notice`;
CREATE TABLE `t_sys_notice` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `title` varchar(255) DEFAULT NULL COMMENT '标题',
  `type` int(11) DEFAULT NULL COMMENT '类型',
  `content` text COMMENT '内容',
  `create_time` datetime DEFAULT NULL COMMENT '创建时间',
  `create_by` bigint(11) DEFAULT NULL COMMENT '创建人',
  `modify_time` datetime DEFAULT NULL,
  `modify_by` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COMMENT='通知表';
-- ----------------------------
-- Records of t_sys_notice
-- ----------------------------
INSERT INTO `t_sys_notice` (`id`, `title`, `type`, `content`, `create_time`, `create_by`, `modify_time`, `modify_by`) VALUES ('1', '世界', '10', '欢迎使用原料采购招标管理系统', '2019-05-11 08:53:20', '1', '2019-05-12 23:30:58', '1');

-- ----------------------------
-- Table structure for `t_sys_operation_log`
-- ----------------------------
DROP TABLE IF EXISTS `t_sys_operation_log`;
CREATE TABLE `t_sys_operation_log` (
  `id` int(65) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `logtype` varchar(255) DEFAULT NULL COMMENT '日志类型',
  `logname` varchar(255) DEFAULT NULL COMMENT '日志名称',
  `userid` int(65) DEFAULT NULL COMMENT '用户id',
  `classname` varchar(255) DEFAULT NULL COMMENT '类名称',
  `method` text COMMENT '方法名称',
  `create_time` datetime DEFAULT NULL COMMENT '创建时间',
  `succeed` varchar(255) DEFAULT NULL COMMENT '是否成功',
  `message` text COMMENT '备注',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COMMENT='操作日志';
-- ----------------------------
-- Records of t_sys_operation_log
-- ----------------------------
INSERT INTO `t_sys_operation_log` (`id`, `logtype`, `logname`, `userid`, `classname`, `method`, `create_time`, `succeed`, `message`) VALUES ('76', '业务日志', '编辑文章', '1', 'cn.enilu.guns.api.controller.cms.ArticleMgrController', 'save', '2019-05-10 13:22:49', '成功', '名称=null;;;');
INSERT INTO `t_sys_operation_log` (`id`, `logtype`, `logname`, `userid`, `classname`, `method`, `create_time`, `succeed`, `message`) VALUES ('77', '业务日志', '编辑文章', '1', 'cn.enilu.guns.api.controller.cms.ArticleMgrController', 'save', '2019-05-10 13:31:09', '成功', '名称=null;;;');

-- ----------------------------
-- Table structure for `t_sys_relation`
-- ----------------------------
DROP TABLE IF EXISTS `t_sys_relation`;
CREATE TABLE `t_sys_relation` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `menuid` bigint(11) DEFAULT NULL COMMENT '菜单id',
  `roleid` int(11) DEFAULT NULL COMMENT '角色id',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=459 DEFAULT CHARSET=utf8 COMMENT='角色和菜单关联表';
-- ----------------------------
-- Records of t_sys_relation
-- ----------------------------
INSERT INTO `t_sys_relation` (`id`, `menuid`, `roleid`) VALUES ('281', '105', '3');
INSERT INTO `t_sys_relation` (`id`, `menuid`, `roleid`) VALUES ('282', '106', '3');
INSERT INTO `t_sys_relation` (`id`, `menuid`, `roleid`) VALUES ('283', '107', '3');
INSERT INTO `t_sys_relation` (`id`, `menuid`, `roleid`) VALUES ('284', '108', '3');
INSERT INTO `t_sys_relation` (`id`, `menuid`, `roleid`) VALUES ('285', '109', '3');
INSERT INTO `t_sys_relation` (`id`, `menuid`, `roleid`) VALUES ('286', '110', '3');
INSERT INTO `t_sys_relation` (`id`, `menuid`, `roleid`) VALUES ('287', '111', '3');
INSERT INTO `t_sys_relation` (`id`, `menuid`, `roleid`) VALUES ('288', '112', '3');
INSERT INTO `t_sys_relation` (`id`, `menuid`, `roleid`) VALUES ('289', '113', '3');
INSERT INTO `t_sys_relation` (`id`, `menuid`, `roleid`) VALUES ('290', '165', '3');
INSERT INTO `t_sys_relation` (`id`, `menuid`, `roleid`) VALUES ('291', '166', '3');
INSERT INTO `t_sys_relation` (`id`, `menuid`, `roleid`) VALUES ('292', '167', '3');
INSERT INTO `t_sys_relation` (`id`, `menuid`, `roleid`) VALUES ('293', '114', '3');
INSERT INTO `t_sys_relation` (`id`, `menuid`, `roleid`) VALUES ('294', '115', '3');
INSERT INTO `t_sys_relation` (`id`, `menuid`, `roleid`) VALUES ('295', '116', '3');
INSERT INTO `t_sys_relation` (`id`, `menuid`, `roleid`) VALUES ('296', '117', '3');
INSERT INTO `t_sys_relation` (`id`, `menuid`, `roleid`) VALUES ('297', '118', '3');
INSERT INTO `t_sys_relation` (`id`, `menuid`, `roleid`) VALUES ('298', '162', '3');
INSERT INTO `t_sys_relation` (`id`, `menuid`, `roleid`) VALUES ('299', '163', '3');
INSERT INTO `t_sys_relation` (`id`, `menuid`, `roleid`) VALUES ('300', '164', '3');
INSERT INTO `t_sys_relation` (`id`, `menuid`, `roleid`) VALUES ('301', '119', '3');
INSERT INTO `t_sys_relation` (`id`, `menuid`, `roleid`) VALUES ('302', '120', '3');
INSERT INTO `t_sys_relation` (`id`, `menuid`, `roleid`) VALUES ('303', '121', '3');
INSERT INTO `t_sys_relation` (`id`, `menuid`, `roleid`) VALUES ('304', '122', '3');
INSERT INTO `t_sys_relation` (`id`, `menuid`, `roleid`) VALUES ('305', '150', '3');
INSERT INTO `t_sys_relation` (`id`, `menuid`, `roleid`) VALUES ('306', '151', '3');
INSERT INTO `t_sys_relation` (`id`, `menuid`, `roleid`) VALUES ('307', '128', '3');
INSERT INTO `t_sys_relation` (`id`, `menuid`, `roleid`) VALUES ('308', '134', '3');
INSERT INTO `t_sys_relation` (`id`, `menuid`, `roleid`) VALUES ('309', '159', '3');
INSERT INTO `t_sys_relation` (`id`, `menuid`, `roleid`) VALUES ('310', '131', '3');
INSERT INTO `t_sys_relation` (`id`, `menuid`, `roleid`) VALUES ('311', '135', '3');
INSERT INTO `t_sys_relation` (`id`, `menuid`, `roleid`) VALUES ('312', '136', '3');
INSERT INTO `t_sys_relation` (`id`, `menuid`, `roleid`) VALUES ('313', '137', '3');
INSERT INTO `t_sys_relation` (`id`, `menuid`, `roleid`) VALUES ('314', '152', '3');
INSERT INTO `t_sys_relation` (`id`, `menuid`, `roleid`) VALUES ('315', '153', '3');
INSERT INTO `t_sys_relation` (`id`, `menuid`, `roleid`) VALUES ('316', '154', '3');
INSERT INTO `t_sys_relation` (`id`, `menuid`, `roleid`) VALUES ('317', '132', '3');
INSERT INTO `t_sys_relation` (`id`, `menuid`, `roleid`) VALUES ('318', '138', '3');
INSERT INTO `t_sys_relation` (`id`, `menuid`, `roleid`) VALUES ('319', '139', '3');
INSERT INTO `t_sys_relation` (`id`, `menuid`, `roleid`) VALUES ('320', '140', '3');
INSERT INTO `t_sys_relation` (`id`, `menuid`, `roleid`) VALUES ('321', '155', '3');
INSERT INTO `t_sys_relation` (`id`, `menuid`, `roleid`) VALUES ('322', '156', '3');
INSERT INTO `t_sys_relation` (`id`, `menuid`, `roleid`) VALUES ('323', '157', '3');
INSERT INTO `t_sys_relation` (`id`, `menuid`, `roleid`) VALUES ('324', '133', '3');
INSERT INTO `t_sys_relation` (`id`, `menuid`, `roleid`) VALUES ('325', '160', '3');
INSERT INTO `t_sys_relation` (`id`, `menuid`, `roleid`) VALUES ('326', '161', '3');
INSERT INTO `t_sys_relation` (`id`, `menuid`, `roleid`) VALUES ('327', '198', '3');
INSERT INTO `t_sys_relation` (`id`, `menuid`, `roleid`) VALUES ('328', '199', '3');
INSERT INTO `t_sys_relation` (`id`, `menuid`, `roleid`) VALUES ('329', '200', '3');
INSERT INTO `t_sys_relation` (`id`, `menuid`, `roleid`) VALUES ('330', '201', '3');
INSERT INTO `t_sys_relation` (`id`, `menuid`, `roleid`) VALUES ('331', '202', '3');
INSERT INTO `t_sys_relation` (`id`, `menuid`, `roleid`) VALUES ('332', '203', '3');
INSERT INTO `t_sys_relation` (`id`, `menuid`, `roleid`) VALUES ('333', '204', '3');
INSERT INTO `t_sys_relation` (`id`, `menuid`, `roleid`) VALUES ('334', '205', '3');
INSERT INTO `t_sys_relation` (`id`, `menuid`, `roleid`) VALUES ('534', '105', '2');
INSERT INTO `t_sys_relation` (`id`, `menuid`, `roleid`) VALUES ('535', '106', '2');
INSERT INTO `t_sys_relation` (`id`, `menuid`, `roleid`) VALUES ('536', '107', '2');
INSERT INTO `t_sys_relation` (`id`, `menuid`, `roleid`) VALUES ('537', '108', '2');
INSERT INTO `t_sys_relation` (`id`, `menuid`, `roleid`) VALUES ('538', '109', '2');
INSERT INTO `t_sys_relation` (`id`, `menuid`, `roleid`) VALUES ('539', '110', '2');
INSERT INTO `t_sys_relation` (`id`, `menuid`, `roleid`) VALUES ('540', '111', '2');
INSERT INTO `t_sys_relation` (`id`, `menuid`, `roleid`) VALUES ('541', '112', '2');
INSERT INTO `t_sys_relation` (`id`, `menuid`, `roleid`) VALUES ('542', '113', '2');
INSERT INTO `t_sys_relation` (`id`, `menuid`, `roleid`) VALUES ('543', '165', '2');
INSERT INTO `t_sys_relation` (`id`, `menuid`, `roleid`) VALUES ('544', '166', '2');
INSERT INTO `t_sys_relation` (`id`, `menuid`, `roleid`) VALUES ('545', '167', '2');
INSERT INTO `t_sys_relation` (`id`, `menuid`, `roleid`) VALUES ('547', '105', '1');
INSERT INTO `t_sys_relation` (`id`, `menuid`, `roleid`) VALUES ('548', '106', '1');
INSERT INTO `t_sys_relation` (`id`, `menuid`, `roleid`) VALUES ('549', '107', '1');
INSERT INTO `t_sys_relation` (`id`, `menuid`, `roleid`) VALUES ('550', '108', '1');
INSERT INTO `t_sys_relation` (`id`, `menuid`, `roleid`) VALUES ('551', '109', '1');
INSERT INTO `t_sys_relation` (`id`, `menuid`, `roleid`) VALUES ('552', '110', '1');
INSERT INTO `t_sys_relation` (`id`, `menuid`, `roleid`) VALUES ('553', '111', '1');
INSERT INTO `t_sys_relation` (`id`, `menuid`, `roleid`) VALUES ('554', '112', '1');
INSERT INTO `t_sys_relation` (`id`, `menuid`, `roleid`) VALUES ('555', '113', '1');
INSERT INTO `t_sys_relation` (`id`, `menuid`, `roleid`) VALUES ('556', '165', '1');
INSERT INTO `t_sys_relation` (`id`, `menuid`, `roleid`) VALUES ('557', '166', '1');
INSERT INTO `t_sys_relation` (`id`, `menuid`, `roleid`) VALUES ('558', '167', '1');
INSERT INTO `t_sys_relation` (`id`, `menuid`, `roleid`) VALUES ('559', '114', '1');
INSERT INTO `t_sys_relation` (`id`, `menuid`, `roleid`) VALUES ('560', '115', '1');
INSERT INTO `t_sys_relation` (`id`, `menuid`, `roleid`) VALUES ('561', '116', '1');
INSERT INTO `t_sys_relation` (`id`, `menuid`, `roleid`) VALUES ('562', '117', '1');
INSERT INTO `t_sys_relation` (`id`, `menuid`, `roleid`) VALUES ('563', '118', '1');
INSERT INTO `t_sys_relation` (`id`, `menuid`, `roleid`) VALUES ('564', '162', '1');
INSERT INTO `t_sys_relation` (`id`, `menuid`, `roleid`) VALUES ('565', '163', '1');
INSERT INTO `t_sys_relation` (`id`, `menuid`, `roleid`) VALUES ('566', '164', '1');
INSERT INTO `t_sys_relation` (`id`, `menuid`, `roleid`) VALUES ('567', '119', '1');
INSERT INTO `t_sys_relation` (`id`, `menuid`, `roleid`) VALUES ('568', '120', '1');
INSERT INTO `t_sys_relation` (`id`, `menuid`, `roleid`) VALUES ('569', '121', '1');
INSERT INTO `t_sys_relation` (`id`, `menuid`, `roleid`) VALUES ('570', '122', '1');
INSERT INTO `t_sys_relation` (`id`, `menuid`, `roleid`) VALUES ('571', '150', '1');
INSERT INTO `t_sys_relation` (`id`, `menuid`, `roleid`) VALUES ('572', '151', '1');
INSERT INTO `t_sys_relation` (`id`, `menuid`, `roleid`) VALUES ('573', '128', '1');
INSERT INTO `t_sys_relation` (`id`, `menuid`, `roleid`) VALUES ('574', '134', '1');
INSERT INTO `t_sys_relation` (`id`, `menuid`, `roleid`) VALUES ('575', '159', '1');
INSERT INTO `t_sys_relation` (`id`, `menuid`, `roleid`) VALUES ('576', '131', '1');
INSERT INTO `t_sys_relation` (`id`, `menuid`, `roleid`) VALUES ('577', '135', '1');
INSERT INTO `t_sys_relation` (`id`, `menuid`, `roleid`) VALUES ('578', '136', '1');
INSERT INTO `t_sys_relation` (`id`, `menuid`, `roleid`) VALUES ('579', '137', '1');
INSERT INTO `t_sys_relation` (`id`, `menuid`, `roleid`) VALUES ('580', '152', '1');
INSERT INTO `t_sys_relation` (`id`, `menuid`, `roleid`) VALUES ('581', '153', '1');
INSERT INTO `t_sys_relation` (`id`, `menuid`, `roleid`) VALUES ('582', '154', '1');
INSERT INTO `t_sys_relation` (`id`, `menuid`, `roleid`) VALUES ('583', '132', '1');
INSERT INTO `t_sys_relation` (`id`, `menuid`, `roleid`) VALUES ('584', '138', '1');
INSERT INTO `t_sys_relation` (`id`, `menuid`, `roleid`) VALUES ('585', '139', '1');
INSERT INTO `t_sys_relation` (`id`, `menuid`, `roleid`) VALUES ('586', '140', '1');
INSERT INTO `t_sys_relation` (`id`, `menuid`, `roleid`) VALUES ('587', '155', '1');
INSERT INTO `t_sys_relation` (`id`, `menuid`, `roleid`) VALUES ('588', '156', '1');
INSERT INTO `t_sys_relation` (`id`, `menuid`, `roleid`) VALUES ('589', '157', '1');
INSERT INTO `t_sys_relation` (`id`, `menuid`, `roleid`) VALUES ('590', '133', '1');
INSERT INTO `t_sys_relation` (`id`, `menuid`, `roleid`) VALUES ('591', '160', '1');
INSERT INTO `t_sys_relation` (`id`, `menuid`, `roleid`) VALUES ('592', '161', '1');
INSERT INTO `t_sys_relation` (`id`, `menuid`, `roleid`) VALUES ('593', '198', '1');
INSERT INTO `t_sys_relation` (`id`, `menuid`, `roleid`) VALUES ('594', '199', '1');
INSERT INTO `t_sys_relation` (`id`, `menuid`, `roleid`) VALUES ('595', '200', '1');
INSERT INTO `t_sys_relation` (`id`, `menuid`, `roleid`) VALUES ('596', '201', '1');
INSERT INTO `t_sys_relation` (`id`, `menuid`, `roleid`) VALUES ('597', '202', '1');
INSERT INTO `t_sys_relation` (`id`, `menuid`, `roleid`) VALUES ('598', '203', '1');
INSERT INTO `t_sys_relation` (`id`, `menuid`, `roleid`) VALUES ('599', '204', '1');
INSERT INTO `t_sys_relation` (`id`, `menuid`, `roleid`) VALUES ('600', '205', '1');
INSERT INTO `t_sys_relation` (`id`, `menuid`, `roleid`) VALUES ('605', '206', '1');
INSERT INTO `t_sys_relation` (`id`, `menuid`, `roleid`) VALUES ('606', '207', '1');
INSERT INTO `t_sys_relation` (`id`, `menuid`, `roleid`) VALUES ('607', '208', '1');
INSERT INTO `t_sys_relation` (`id`, `menuid`, `roleid`) VALUES ('608', '209', '1');
INSERT INTO `t_sys_relation` (`id`, `menuid`, `roleid`) VALUES ('609', '210', '1');
INSERT INTO `t_sys_relation` (`id`, `menuid`, `roleid`) VALUES ('610', '211', '1');
INSERT INTO `t_sys_relation` (`id`, `menuid`, `roleid`) VALUES ('611', '214', '1');
INSERT INTO `t_sys_relation` (`id`, `menuid`, `roleid`) VALUES ('612', '215', '1');

INSERT INTO `t_sys_relation` (`id`, `menuid`, `roleid`) VALUES ('616', '216', '1');
INSERT INTO `t_sys_relation` (`id`, `menuid`, `roleid`) VALUES ('617', '217', '1');
INSERT INTO `t_sys_relation` (`id`, `menuid`, `roleid`) VALUES ('618', '218', '1');
INSERT INTO `t_sys_relation` (`id`, `menuid`, `roleid`) VALUES ('619', '219', '1');
INSERT INTO `t_sys_relation` (`id`, `menuid`, `roleid`) VALUES ('620', '220', '1');
INSERT INTO `t_sys_relation` (`id`, `menuid`, `roleid`) VALUES ('621', '221', '1');
INSERT INTO `t_sys_relation` (`id`, `menuid`, `roleid`) VALUES ('622', '216', '4');
INSERT INTO `t_sys_relation` (`id`, `menuid`, `roleid`) VALUES ('623', '217', '4');
INSERT INTO `t_sys_relation` (`id`, `menuid`, `roleid`) VALUES ('624', '218', '4');
INSERT INTO `t_sys_relation` (`id`, `menuid`, `roleid`) VALUES ('625', '219', '5');
INSERT INTO `t_sys_relation` (`id`, `menuid`, `roleid`) VALUES ('626', '220', '5');
INSERT INTO `t_sys_relation` (`id`, `menuid`, `roleid`) VALUES ('627', '221', '5');
-- ----------------------------
-- Table structure for `t_sys_role`
-- ----------------------------
DROP TABLE IF EXISTS `t_sys_role`;
CREATE TABLE `t_sys_role` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键id',
  `num` int(11) DEFAULT NULL COMMENT '序号',
  `pid` int(11) DEFAULT NULL COMMENT '父角色id',
  `name` varchar(255) DEFAULT NULL COMMENT '角色名称',
  `deptid` int(11) DEFAULT NULL COMMENT '部门名称',
  `tips` varchar(255) DEFAULT NULL COMMENT '提示',
  `version` int(11) DEFAULT NULL COMMENT '保留字段(暂时没用）',
  `create_time` datetime DEFAULT NULL,
  `create_by` bigint(20) DEFAULT NULL,
  `modify_time` datetime DEFAULT NULL,
  `modify_by` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COMMENT='角色表';
-- ----------------------------
-- Records of t_sys_role
-- ----------------------------
INSERT INTO `t_sys_role` (`id`, `num`, `pid`, `name`, `deptid`, `tips`, `version`, `create_time`, `create_by`, `modify_time`, `modify_by`) VALUES ('1', '1', '0', '超级管理员', '24', 'administrator', '1', null, null, null, null);
INSERT INTO `t_sys_role` (`id`, `num`, `pid`, `name`, `deptid`, `tips`, `version`, `create_time`, `create_by`, `modify_time`, `modify_by`) VALUES ('2', '1', '1', '开发人员', '25', 'developer', null, null, null, null, null);
INSERT INTO `t_sys_role` (`id`, `num`, `pid`, `name`, `deptid`, `tips`, `version`, `create_time`, `create_by`, `modify_time`, `modify_by`) VALUES ('3', '3', '0', 'test', '24', '测试', null, null, null, null, null);
INSERT INTO `t_sys_role` (`id`, `num`, `pid`, `name`, `deptid`, `tips`, `version`, `create_time`, `create_by`, `modify_time`, `modify_by`) VALUES ('4', '4', '0', 'tender', '28', 'tender', null, null, null, null, null);
INSERT INTO `t_sys_role` (`id`, `num`, `pid`, `name`, `deptid`, `tips`, `version`, `create_time`, `create_by`, `modify_time`, `modify_by`) VALUES ('5', '5', '0', 'vendor', '29', 'vendor', null, null, null, null, null);

-- ----------------------------
-- Table structure for `t_sys_task`
-- ----------------------------
DROP TABLE IF EXISTS `t_sys_task`;
CREATE TABLE `t_sys_task` (
  `id` bigint(64) NOT NULL AUTO_INCREMENT COMMENT '自增主键',
  `name` varchar(50) DEFAULT NULL COMMENT '任务名',
  `job_group` varchar(50) DEFAULT NULL COMMENT '任务组',
  `job_class` varchar(255) DEFAULT NULL COMMENT '执行类',
  `note` varchar(255) DEFAULT NULL COMMENT '任务说明',
  `cron` varchar(50) DEFAULT NULL COMMENT '定时规则',
  `data` text COMMENT '执行参数',
  `exec_at` datetime DEFAULT NULL COMMENT '执行时间',
  `exec_result` text COMMENT '执行结果',
  `disabled` tinyint(1) DEFAULT NULL COMMENT '是否禁用',
  `create_time` datetime DEFAULT NULL,
  `create_by` bigint(20) DEFAULT NULL,
  `concurrent` tinyint(4) DEFAULT '0' COMMENT '是否允许并发',
  `modify_time` datetime DEFAULT NULL,
  `modify_by` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COMMENT='定时任务';
-- ----------------------------
-- Records of t_sys_task
-- ----------------------------
INSERT INTO `t_sys_task` (`id`, `name`, `job_group`, `job_class`, `note`, `cron`, `data`, `exec_at`, `exec_result`, `disabled`, `create_time`, `create_by`, `concurrent`, `modify_time`, `modify_by`) VALUES ('1', '测试任务', 'default', 'cn.enilu.guns.service.task.job.HelloJob', '测试任务\n            \n            \n            \n            ', '0 47 11 * * ?', '{\n\"appname\": \"tender\",\n\"version\":1\n}\n            \n            \n            \n            \n            \n            \n            \n            \n            \n            \n            \n            ', '2019-03-27 11:47:00', '执行成功', '0', '2018-12-28 09:54:00', '1', '0', '2019-03-27 11:47:11', '-1');

-- ----------------------------
-- Table structure for `t_sys_task_log`
-- ----------------------------
DROP TABLE IF EXISTS `t_sys_task_log`;
CREATE TABLE `t_sys_task_log` (
  `id` bigint(64) NOT NULL AUTO_INCREMENT COMMENT '自增主键',
  `name` varchar(50) DEFAULT NULL COMMENT '任务名',
  `exec_at` datetime DEFAULT NULL COMMENT '执行时间',
  `exec_success` int(11) DEFAULT NULL COMMENT '执行结果（成功:1、失败:0)',
  `job_exception` varchar(255) DEFAULT NULL COMMENT '抛出异常',
  `id_task` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='定时任务日志';
-- ----------------------------
-- Records of t_sys_task_log
-- ----------------------------

-- ----------------------------
-- Table structure for `t_sys_user`
-- ----------------------------
DROP TABLE IF EXISTS `t_sys_user`;

CREATE TABLE `t_sys_user` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键id',
  `avatar` varchar(255) DEFAULT NULL COMMENT '头像',
  `account` varchar(45) DEFAULT NULL COMMENT '账号',
  `password` varchar(45) DEFAULT NULL COMMENT '密码',
  `salt` varchar(45) DEFAULT NULL COMMENT 'md5密码盐',
  `name` varchar(45) DEFAULT NULL COMMENT '名字',
  `birthday` datetime DEFAULT NULL COMMENT '生日',
  `sex` int(11) DEFAULT NULL COMMENT '性别（1：男 2：女）',
  `email` varchar(45) DEFAULT NULL COMMENT '电子邮件',
  `phone` varchar(45) DEFAULT NULL COMMENT '电话',
  `roleid` varchar(255) DEFAULT NULL COMMENT '角色id',
  `deptid` int(11) DEFAULT NULL COMMENT '部门id',
  `status` int(11) DEFAULT NULL COMMENT '状态(1：启用  2：冻结  3：删除）',
  `version` int(11) DEFAULT NULL COMMENT '保留字段',
  `create_time` datetime DEFAULT NULL COMMENT '创建时间',
  `create_by` bigint(20) DEFAULT NULL COMMENT '创建人',
  `modify_time` datetime DEFAULT NULL COMMENT '修改时间',
  `modify_by` bigint(20) DEFAULT NULL COMMENT '最后更新人',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=48 DEFAULT CHARSET=utf8 COMMENT='管理员表';
-- ----------------------------
-- Records of t_sys_user
-- ----------------------------

INSERT INTO `t_sys_user` (`id`, `create_by`, `create_time`, `modify_by`, `modify_time`, `account`, `avatar`, `birthday`, `deptid`, `email`, `name`, `password`, `phone`, `roleid`, `salt`, `sex`, `status`,  `version`) VALUES ('-1', null, null, null, null, 'system', null, null, null, null, '应用系统', null, null, null, null, null, null, null);
INSERT INTO `t_sys_user` (`id`, `create_by`, `create_time`, `modify_by`, `modify_time`, `account`, `avatar`, `birthday`, `deptid`, `email`, `name`, `password`, `phone`, `roleid`, `salt`, `sex`, `status`,  `version`) VALUES ('1', null, '2016-01-29 08:49:53', '1', '2019-03-20 23:45:24', 'admin', null, '2017-05-05 00:00:00', '27', 'purchase@mailchinastone.com', '管理员', 'b5a51391f271f062867e5984e2fcffee', null, '1', '8pgby', '2', '1', '25');
INSERT INTO `t_sys_user` (`id`, `create_by`, `create_time`, `modify_by`, `modify_time`, `account`, `avatar`, `birthday`, `deptid`, `email`, `name`, `password`, `phone`, `roleid`, `salt`, `sex`, `status`,  `version`) VALUES ('45', null, '2017-12-04 22:24:02', '1', '2019-01-09 23:06:09', 'boss', null, '2017-12-04 00:00:00', '24', '', '老板', 'fb43a2366344b29c5487cba15290367d', '', '1,2,', '1f7bf', '1', '1', null);
INSERT INTO `t_sys_user` (`id`, `create_by`, `create_time`, `modify_by`, `modify_time`, `account`, `avatar`, `birthday`, `deptid`, `email`, `name`, `password`, `phone`, `roleid`, `salt`, `sex`, `status`,  `version`) VALUES ('46', null, '2017-12-04 22:24:24', null, null, 'manager', null, '2017-12-04 00:00:00', '24', '', '经理', '06925fac8af87a19019bcd3c4a5d974d', '', '1', 'j3cs9', '1', '1', null);
INSERT INTO `t_sys_user` (`id`, `create_by`, `create_time`, `modify_by`, `modify_time`, `account`, `avatar`, `birthday`, `deptid`, `email`, `name`, `password`, `phone`, `roleid`, `salt`, `sex`, `status`,  `version`) VALUES ('47', null, '2018-09-13 17:21:02', '1', '2019-01-09 23:05:51', 'developer', null, '2017-12-31 00:00:00', '25', 'purchase@mailchinastone.com', '开发人员', 'fac36d5616fe9ebd460691264b28ee27', '', '2,', 'vscp9', '1', '1', null);
INSERT INTO `t_sys_user` (`id`, `create_by`, `create_time`, `modify_by`, `modify_time`, `account`, `avatar`, `birthday`, `deptid`, `email`, `name`, `password`, `phone`, `roleid`, `salt`, `sex`, `status`,  `version`) VALUES ('48', null, '2018-09-13 17:21:02', '1', '2019-01-09 23:05:51', 'tenderadmin', null, '2017-12-31 00:00:00', '28', 'purchase@mailchinastone.com', '发标管理员', 'b5a51391f271f062867e5984e2fcffee', '', '4,', '8pgby', '1', '1', null);

