package cn.enilu.flash.dao.business;

import cn.enilu.flash.bean.entity.business.Bid;
import org.springframework.data.repository.PagingAndSortingRepository;

import java.util.List;

public interface BidRepository extends PagingAndSortingRepository<Bid, Long> {
    List<Bid> findBidsByTenderId(Long tenderId);

    Bid findBidByNo(String no);
}
