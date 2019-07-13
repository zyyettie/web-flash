package cn.enilu.flash.dao.business;

import cn.enilu.flash.bean.entity.business.Bid;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface BidRepository extends PagingAndSortingRepository<Bid, Long> {
    List<Bid> findBidsByTenderId(Long tenderId);

    Bid findBidByNo(String no);

    List<Bid> findBidsByCreateBy(Long userId);

    @Transactional
    @Modifying
    @Query(nativeQuery = true, value = "update t_biz_bid set status = status+1 where id=?1")
    void moveToNextStatus(Long id);

    @Transactional
    @Modifying
    @Query(nativeQuery = true, value = "update t_biz_bid set is_approved = 1, status = 1 where id=?1")
    void approve(Long id);

    @Transactional
    @Modifying
    @Query(nativeQuery = true, value = "update t_biz_bid set is_approved = -1 where id=?1")
    void deny(Long id);
}
