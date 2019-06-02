package cn.enilu.flash.bean.entity.business;

import cn.enilu.flash.bean.entity.BaseEntity;
import lombok.Data;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Table(name = "b_tender")
@Data
public class Tender extends BaseEntity {
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
}
