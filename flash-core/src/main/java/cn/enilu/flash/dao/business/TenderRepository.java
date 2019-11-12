package cn.enilu.flash.dao.business;

import cn.enilu.flash.bean.entity.business.Tender;
import org.springframework.data.domain.Sort;
import org.springframework.data.repository.PagingAndSortingRepository;

import java.util.List;

public interface TenderRepository extends PagingAndSortingRepository<Tender, Long> {
    Tender findFirstByOrderByIdDesc();

    List<Tender> findAll(Sort sort);
}
