package cn.enilu.flash.bean.entity.business;

import cn.enilu.flash.bean.entity.BaseEntity;
import lombok.Data;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EntityListeners;

import org.hibernate.annotations.Table;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;

@Entity(name = "b_tender")
@Table(appliesTo = "b_tender",comment = "投标")
@Data
@EntityListeners(AuditingEntityListener.class)
public class Tender extends BaseEntity {
    @Column
    private String no;
    @Column
    private String name;
    @Column
    private String type;
    @Column
    private int quantity;
    @Column
    private String unit;
    @Column
    private String status;
    @Column
    private boolean isDelete;
    @Column
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private Date dueDate;
    @Column
    private String contact;
}
