package cn.enilu.flash.service.business;

import cn.enilu.flash.bean.entity.business.Bid;
import cn.enilu.flash.dao.business.BidRepository;
import cn.enilu.flash.utils.factory.Page;
import com.google.common.base.Strings;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import javax.persistence.criteria.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

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
        List<Bid> list = bidRepository.findBidsByTenderId(tenderId, sortByIdDesc());
        return list;
    }

    public Bid getBidByNo(String no){
        Bid bid = bidRepository.findBidByNo(no);
        return bid;
    }

    public Object getListByUser(Long userId){
        List<Bid> list = bidRepository.findBidsByCreateBy(userId, sortByIdDesc());
        return list;
    }
    private Sort sortByIdDesc() {
        return new Sort(Sort.Direction.DESC, "id");
    }

    public Object getListForPayment(){
        List<Bid> list = bidRepository.getBidsForPayment();
        return list;
    }

    public void moveToNextStatus(Long id){
        bidRepository.moveToNextStatus(id);
    }

    public void moveBackToStatus1(Long id){
        bidRepository.moveBackToStatus1(id);
    }

    public void moveToNextStatusWithDeliverInfo(Long id, Integer deliverType, String deliverNo, String memoNo){
        bidRepository.moveToNextStatusWithDeliverInfo(id, deliverType, deliverNo, memoNo);
    }

    public void moveToNextStatusWithQuantityPrice(Long id, Integer confirmedQuantity, Float confirmedPrice, String confirmedQuantityUnit, String confirmedPriceUnit){
        bidRepository.moveToNextStatusWithQuantityPrice(id, confirmedQuantity, confirmedPrice, confirmedQuantityUnit, confirmedPriceUnit);
    }

    public void moveToNextStatusWithInvoice(Long id, Long invoiceIdFile, String invoiceNo){
        bidRepository.moveToNextStatusWithInvoice(id, invoiceIdFile, invoiceNo);
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

    public void updateQuantityAndPrice(Long id, Integer quantity, String unitOfBidQuantity, Float price, String unitOfBidPrice){
        bidRepository.updateQuantityAndPrice(id, quantity, unitOfBidQuantity, price, unitOfBidPrice);
    }

    public Bid get(Long id){
        Optional<Bid> optional = bidRepository.findById(id);
        if (optional.isPresent()) {
            return optional.get();
        }
        return null;
    }

    public Page getBids(Page<Bid> page, final String name, final String colorNote, final String shape, final String size, final String memoNo, final Long createBy) {
        Pageable pageable = null;
        if(page.isOpenSort()) {
            pageable = new PageRequest(page.getCurrent()-1, page.getSize(), page.isAsc() ? Sort.Direction.ASC : Sort.Direction.DESC, page.getOrderByField());
        }else{
            pageable = new PageRequest(page.getCurrent()-1,page.getSize(),Sort.Direction.DESC,"id");
        }

        org.springframework.data.domain.Page<Bid> bidPage = bidRepository.findAll(new Specification<Bid>(){

            @Override
            public Predicate toPredicate(Root<Bid> root, CriteriaQuery<?> criteriaQuery, CriteriaBuilder criteriaBuilder) {
                List<Predicate> list = new ArrayList<Predicate>();
                list.add(criteriaBuilder.equal(root.get("createBy").as(Long.class),createBy));
                if(!Strings.isNullOrEmpty(memoNo)){{
                    list.add(criteriaBuilder.like(root.get("memoNo").as(String.class),"%"+memoNo+"%"));
                }}
                //跨表查询
                if(!Strings.isNullOrEmpty(name)){{
                    list.add(criteriaBuilder.like(root.get("tender").get("name").as(String.class),"%"+name+"%"));
                }}
                if(!Strings.isNullOrEmpty(colorNote)){{
                    list.add(criteriaBuilder.like(root.get("tender").get("colorNote").as(String.class),"%"+colorNote+"%"));
                }}
                if(!Strings.isNullOrEmpty(shape)){{
                    list.add(criteriaBuilder.like(root.get("tender").get("shape").as(String.class),"%"+shape+"%"));
                }}
                if(!Strings.isNullOrEmpty(size)){{
                    list.add(criteriaBuilder.like(root.get("tender").get("size").as(String.class),"%"+size+"%"));
                }}
                Predicate[] p = new Predicate[list.size()];
                return criteriaBuilder.and(list.toArray(p));
            }
        },pageable);
        page.setTotal(Integer.valueOf(bidPage.getTotalElements()+""));
        page.setRecords(bidPage.getContent());
        return page;
    }

    public Page getPaymentBids(Page<Bid> page, final String name, final String colorNote) {
        Pageable pageable = null;
        if(page.isOpenSort()) {
            pageable = new PageRequest(page.getCurrent()-1, page.getSize(), page.isAsc() ? Sort.Direction.ASC : Sort.Direction.DESC, page.getOrderByField());
        }else{
            pageable = new PageRequest(page.getCurrent()-1,page.getSize(),Sort.Direction.DESC,"id");
        }

        org.springframework.data.domain.Page<Bid> bidPage = bidRepository.findAll(new Specification<Bid>(){

            @Override
            public Predicate toPredicate(Root<Bid> root, CriteriaQuery<?> criteriaQuery, CriteriaBuilder criteriaBuilder) {
                List<Predicate> list = new ArrayList<Predicate>();
                //跨表查询
                if(!Strings.isNullOrEmpty(name)){{
                    list.add(criteriaBuilder.like(root.get("tender").get("name").as(String.class),"%"+name+"%"));
                }}
                if(!Strings.isNullOrEmpty(colorNote)){{
                    list.add(criteriaBuilder.like(root.get("tender").get("colorNote").as(String.class),"%"+colorNote+"%"));
                }}
                Predicate[] p = new Predicate[list.size()];
                return criteriaBuilder.and(list.toArray(p));
            }
        },pageable);
        page.setTotal(Integer.valueOf(bidPage.getTotalElements()+""));
        page.setRecords(bidPage.getContent());
        return page;
    }

}
