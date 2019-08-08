package cn.enilu.flash.bean.entity.business;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EntityListeners;

import cn.enilu.flash.bean.entity.BaseEntity;
import lombok.Data;
import org.hibernate.annotations.Table;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

@Entity(name="t_biz_bid")
@Table(appliesTo = "t_biz_bid",comment = "投标")
@Data
@EntityListeners(AuditingEntityListener.class)
public class Bid extends BaseEntity {
    @Column
    private String no;
    @Column
    private String quantity;
    @Column
    private Integer price;
    @Column
    private Integer weight;
    @Column
    private String unitOfWeight;
    @Column
    private String contact;
    @Column
    private Integer isApproved;
    @Column
    private Integer status;
    @Column
    private Integer deliverType;
    @Column
    private String deliverNo;
    @Column
    private Integer confirmedQuantity;
    @Column
    private Integer confirmedPrice;
    @Column
    private Long idFile;
    @Column
    private Long tenderId;
}
