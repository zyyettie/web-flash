package cn.enilu.flash.dao.business;

import cn.enilu.flash.bean.entity.business.Bid;
import org.springframework.data.repository.PagingAndSortingRepository;

public interface BidRepository extends PagingAndSortingRepository<Bid, Long> {
}
