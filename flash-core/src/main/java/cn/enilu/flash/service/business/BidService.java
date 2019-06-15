package cn.enilu.flash.service.business;

import cn.enilu.flash.bean.entity.business.Bid;
import cn.enilu.flash.dao.business.BidRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BidService {
    private Logger logger = LoggerFactory.getLogger(BidService.class);
    @Autowired
    private BidRepository bidRepository;

    public Object queryAll(){
        List<Bid> list = (List<Bid>)bidRepository.findAll();
        return list;
    }

    public void save(Bid bid){
        bid.setApproved(false);
        bidRepository.save(bid);
    }
    public void delete(Long id){
        bidRepository.deleteById(id);
    }
}
