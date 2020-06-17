package cn.enilu.flash.dao.business;

import cn.enilu.flash.bean.entity.business.Tender;
import cn.enilu.flash.bean.entity.system.OperationLog;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface TenderRepository extends PagingAndSortingRepository<Tender, Long>, JpaSpecificationExecutor<Tender>, JpaRepository<Tender,Long> {
    Tender findFirstByOrderByIdDesc();

//    List<Tender> findAll(Sort sort);
    @Transactional
    @Modifying
    @Query(nativeQuery = true, value = "update t_biz_tender set status = 'CLOSED' where id=?1")
    void closeTender(Long id);

    @Transactional
    @Modifying
    @Query(nativeQuery = true, value ="update t_biz_tender set status = 'CLOSED' where CURDATE() >= due_date ")
    void closeDueTender();
}
