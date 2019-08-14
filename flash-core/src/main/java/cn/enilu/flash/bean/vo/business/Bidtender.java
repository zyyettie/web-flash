package cn.enilu.flash.bean.vo.business;

import lombok.Data;

import java.util.Date;

@Data
public class Bidtender {
    //bid info
    private Long bidId;
    private String no;
    private String quantity;
    private int price;
    private Integer weight;
    private String unitOfWeight;
    private int isApproved;
    private int bidStatus;
    private int deliverType;
    private String deliverNo;
    private int confirmedQuantity;
    private int confirmedPrice;
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
    private Integer tenderWeight;
    private String tenderUnitOfWeight;
    private String enhance;
    private String tenderStatus;
    private Date dueDate;
    private Integer count;
    private Long version;
    private Integer isDelete;
}
