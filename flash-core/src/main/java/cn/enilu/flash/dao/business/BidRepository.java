package cn.enilu.flash.dao.business;

import cn.enilu.flash.bean.entity.business.Bid;
import cn.enilu.flash.bean.entity.business.Tender;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface BidRepository extends PagingAndSortingRepository<Bid, Long>, JpaSpecificationExecutor<Bid>, JpaRepository<Bid,Long> {
    List<Bid> findBidsByTenderId(Long tenderId, Sort sort);

    Bid findBidByNo(String no);

//    Bid findById(Long id);

    List<Bid> findBidsByCreateBy(Long userId, Sort sort);

    @Query(nativeQuery = true, value = "select * from t_biz_bid where status=6 or status=7 order by id DESC")
    List<Bid> getBidsForPayment();

    @Transactional
    @Modifying
    @Query(nativeQuery = true, value = "update t_biz_bid set status = status+1 where id=?1")
    void moveToNextStatus(Long id);

    @Transactional
    @Modifying
    @Query(nativeQuery = true, value = "update t_biz_bid set status = 1 where id=?1")
    void moveBackToStatus1(Long id);

    @Transactional
    @Modifying
    @Query(nativeQuery = true, value = "update t_biz_bid set status = status+1, deliver_type=?2, deliver_no=?3, memo_no=?4 where id=?1")
    void moveToNextStatusWithDeliverInfo(Long id, Integer deliverType, String deliverNo, String memoNo);

    @Transactional
    @Modifying
    @Query(nativeQuery = true, value = "update t_biz_bid set status = status+1, confirmed_quantity=?2, confirmed_price=?3, confirmed_quantity_unit=?4, confirmed_price_unit=?5 where id=?1")
    void moveToNextStatusWithQuantityPrice(Long id, Double confirmedQuantity, Double confirmedPrice, String confirmedQuantityUnit, String confirmedPriceUnit);

    @Transactional
    @Modifying
    @Query(nativeQuery = true, value = "update t_biz_bid set status = status+1, invoice_id_file=?2, invoice_no=?3 where id=?1")
    void moveToNextStatusWithInvoice(Long id, Long invoiceIdFile, String invoiceNo);

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

    @Transactional
    @Modifying
    @Query(nativeQuery = true, value = "update t_biz_bid set quantity=?2, unit_of_bid_quantity=?3, price=?4, unit_of_bid_price=?5 where id=?1")
    void updateQuantityAndPrice(Long id, Double quantity, String unitOfBidQuantity, Double price, String unitOfBidPrice);
}
