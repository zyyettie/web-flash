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
    @Query(nativeQuery = true, value = "update t_biz_bid set status = status+1, deliver_type=?2, deliver_no=?3 where id=?1")
    void moveToNextStatusWithDeliverInfo(Long id, Integer deliverType, String deliverNo);

    @Transactional
    @Modifying
    @Query(nativeQuery = true, value = "update t_biz_bid set status = status+1, confirmed_quantity=?2, confirmed_price=?3 where id=?1")
    void moveToNextStatusWithQuantityPrice(Long id, Integer confirmedQuantity, Integer confirmedPrice);

    @Transactional
    @Modifying
    @Query(nativeQuery = true, value = "update t_biz_bid set status = status+1, id_file=?2 where id=?1")
    void moveToNextStatusWithPayment(Long id, Long idFile);

    @Transactional
    @Modifying
    @Query(nativeQuery = true, value = "update t_biz_bid set is_approved = 1, status = 1 where id=?1")
    void approve(Long id);

    @Transactional
    @Modifying
    @Query(nativeQuery = true, value = "update t_biz_bid set is_approved = -1 where id=?1")
    void deny(Long id);
}
