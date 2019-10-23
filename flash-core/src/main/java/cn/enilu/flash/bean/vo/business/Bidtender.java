package cn.enilu.flash.bean.vo.business;

import lombok.Data;

import java.util.Date;

@Data
public class Bidtender {
    //bid info
    private Long bidId;
    private String no;
    private int quantity;
    private Float price;
    private Float weight;
    private String unitOfWeight;
    private int isApproved;
    private int bidStatus;
    private int deliverType;
    private String deliverNo;
    private int confirmedQuantity;
    private Float confirmedPrice;
    private Long tenderId;

    //tender info
    private String tenderNo;
    private String name;
    private String shape;
    private String size;
    private String color;
    private String colorNote;
    private String clarity;
    private Integer tenderQuantity;
    private Float tenderWeight;
    private String tenderUnitOfWeight;
    private String enhance;
    private String material;
    private String note;
    private String tenderStatus;
    private Date dueDate;
    private Integer count;
    private Long version;
    private Integer isDelete;
}
