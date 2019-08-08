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
        bid.setIsApproved(0);
        bidRepository.save(bid);
    }
    public void delete(Long id){
        bidRepository.deleteById(id);
    }

    public Object getBidsByTenderId(Long tenderId){
        List<Bid> list = bidRepository.findBidsByTenderId(tenderId);
        return list;
    }

    public Bid getBidByNo(String no){
        Bid bid = bidRepository.findBidByNo(no);
        return bid;
    }

    public Object getListByUser(Long userId){
        List<Bid> list = bidRepository.findBidsByCreateBy(userId);
        return list;
    }

    public void moveToNextStatus(Long id){
        bidRepository.moveToNextStatus(id);
    }

    public void moveToNextStatusWithDeliverInfo(Long id, Integer deliverType, String deliverNo){
        bidRepository.moveToNextStatusWithDeliverInfo(id, deliverType, deliverNo);
    }

    public void moveToNextStatusWithQuantityPrice(Long id, Integer confirmedQuantity, Integer confirmedPrice){
        bidRepository.moveToNextStatusWithQuantityPrice(id, confirmedQuantity, confirmedPrice);
    }

    public void moveToNextStatusWithPayment(Long id, Long idFile){
        bidRepository.moveToNextStatusWithPayment(id, idFile);
    }

    public void approve(Long id){
        bidRepository.approve(id);
    }

    public void deny(Long id){
        bidRepository.deny(id);
    }
}
