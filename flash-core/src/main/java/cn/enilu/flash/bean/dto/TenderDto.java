package cn.enilu.flash.bean.dto;

import lombok.Data;

import java.util.Date;

@Data
public class TenderDto {
    private Long id;
    private String no;
    private String name;
    private String shape;
    private String size;
    private String color;
    private String colorNote;
    private String clarity;
    private Integer quantity;
    private String unitOfQuantity;
    private String enhance;
    private String material;
    private String status;
    private Date dueDate;
    private Integer count;
    private Long version;
    private Integer isDelete;
    private String stoneUseFor;
    private String note;
    private String unitOfNote;

    private String userName;
}
