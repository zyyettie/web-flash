package cn.enilu.flash.bean.vo.business;

import lombok.Data;

import java.util.Date;

@Data
public class Bidtender {
    //bid info
    private String no;
    private String quantity;
    private int price;
    private String unit;
    private int isApproved;
    private Long tenderId;

    //tneder info
    private String tenderNo;
    private String name;
    private String shape;
    private Integer dimension;
    private String color;
    private String purity;
    private Integer tenderQuantity;
    private String tenderUnit;
    private String heated;
    private Integer status;
    private Date dueDate;
    private Integer count;
    private Long version;
    private Integer isDelete;
}
