package cn.enilu.flash.bean.entity.business;

import cn.enilu.flash.bean.entity.BaseEntity;
import lombok.Data;
import org.hibernate.annotations.Table;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EntityListeners;

@Entity(name = "b_supplier")
@Table(appliesTo = "b_supplier",comment = "供应商")
@Data
@EntityListeners(AuditingEntityListener.class)
public class Supplier extends BaseEntity {
    @Column
    private String no;
    @Column
    private String name;
    @Column
    private String email;
    @Column
    private String telephone;
}
