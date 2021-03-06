package cn.enilu.flash.bean.entity.business;

import cn.enilu.flash.bean.entity.BaseEntity;
import lombok.Data;

import javax.persistence.*;


import org.hibernate.annotations.Table;
import org.springframework.data.annotation.Version;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;
import java.util.List;

@Entity(name = "t_biz_tender")
@Table(appliesTo = "t_biz_tender",comment = "发标")
@Data
@EntityListeners(AuditingEntityListener.class)
public class Tender extends BaseEntity {
    @Column
    private String no;
    @Column
    private String name;
    @Column
    private String shape;
    @Column
    private String size;
    @Column
    private String color;
    @Column
    private String colorNote;
    @Column
    private String clarity;
    @Column
    private Double quantity;
    @Column
    private String unitOfQuantity;
    @Column
    private String enhance;
    @Column
    private String material;
    @Column
    private String status;
    @Column
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private Date dueDate;
    @Column
    private Integer count;
    @Column
    @Version
    private Long version;
    @Column
    private Integer isDelete;
    @Column
    private String stoneUseFor;
    @Column
    private String note;
    @Column
    private String unitOfNote;

    //仅仅在多的那一方单向关联， 没必要双向关联
//    @OneToMany(mappedBy = "tender", cascade=CascadeType.ALL,fetch=FetchType.LAZY)
//    private List<Bid> bidList;

}
