package cn.enilu.flash.bean.entity.business;

import javax.persistence.*;

import cn.enilu.flash.bean.entity.BaseEntity;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
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
    private Double quantity;
    @Column
    private String unitOfBidQuantity;
    @Column
    private Double price;
    @Column
    private String unitOfBidPrice;
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
    private String memoNo;
    @Column
    private Double confirmedQuantity;
    @Column
    private String confirmedQuantityUnit;
    @Column
    private Double confirmedPrice;
    @Column
    private String confirmedPriceUnit;
    @Column
    private Long idFile;
    @Column
    private String invoiceNo;
    @Column
    private Long invoiceIdFile;

    @JoinColumn(name="tender_id", referencedColumnName = "id",  columnDefinition = "bigint comment '发标ID'")
    @ManyToOne
    private Tender tender;

}
