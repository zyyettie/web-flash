package cn.enilu.flash.service.business;

import cn.enilu.flash.bean.entity.business.Tender;
import cn.enilu.flash.dao.business.TenderRepository;
import com.google.common.base.Strings;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import cn.enilu.flash.utils.factory.Page;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class TenderService {

    private Logger logger = LoggerFactory.getLogger(TenderService.class);
    @Autowired
    private TenderRepository tenderRepository;

    public Object queryAll() {
        List<Tender> list = tenderRepository.findAll(sortByIdDesc());
        return list;
    }
    private Sort sortByIdDesc() {
        return new Sort(Sort.Direction.DESC, "id");
    }

    public void save(Tender tender) {
        tenderRepository.save(tender);
    }

    public void delete(Long id){
        tenderRepository.deleteById(id);
    }

    public Long findMaxId() {
        Tender tender = tenderRepository.findFirstByOrderByIdDesc();
        if(tender == null){
            return new Long(0);
        }
        return tender.getId();
    }

    public Tender get(Long id){
        Optional<Tender> optional = tenderRepository.findById(id);
        if (optional.isPresent()) {
            return optional.get();
        }
        return null;
    }

    public void closeDueTender() {
        tenderRepository.closeDueTender();
    }

    public void close(Long id) {
        tenderRepository.closeTender(id);
    }

    public Page getTenders(Page<Tender> page, final String name, final String colorNote, final String shape, final String size) {
        Pageable pageable = null;
        if(page.isOpenSort()) {
            pageable = new PageRequest(page.getCurrent()-1, page.getSize(), page.isAsc() ? Sort.Direction.ASC : Sort.Direction.DESC, page.getOrderByField());
        }else{
            pageable = new PageRequest(page.getCurrent()-1,page.getSize(),Sort.Direction.DESC,"id");
        }

        org.springframework.data.domain.Page<Tender> tenderPage = tenderRepository.findAll(new Specification<Tender>(){

            @Override
            public Predicate toPredicate(Root<Tender> root, CriteriaQuery<?> criteriaQuery, CriteriaBuilder criteriaBuilder) {
                List<Predicate> list = new ArrayList<Predicate>();
                if(!Strings.isNullOrEmpty(name)){
                    list.add(criteriaBuilder.like(root.get("name").as(String.class), "%"+name+"%"));
                }
                if(!Strings.isNullOrEmpty(colorNote)){
                    list.add(criteriaBuilder.like(root.get("colorNote").as(String.class), "%"+colorNote+"%"));
                }
                if(!Strings.isNullOrEmpty(shape)){
                    list.add(criteriaBuilder.like(root.get("shape").as(String.class),"%"+shape+"%"));
                }
                if(!Strings.isNullOrEmpty(size)){{
                    list.add(criteriaBuilder.equal(root.get("size").as(String.class),"%"+size+"%"));
                }}
                Predicate[] p = new Predicate[list.size()];
                return criteriaBuilder.and(list.toArray(p));
            }
        },pageable);
        page.setTotal(Integer.valueOf(tenderPage.getTotalElements()+""));
        page.setRecords(tenderPage.getContent());
        return page;
    }
    public Page getOpenTenders(Page<Tender> page, final String name, final String colorNote, final String shape, final String size) {
        Pageable pageable = null;
        if(page.isOpenSort()) {
            pageable = new PageRequest(page.getCurrent()-1, page.getSize(), page.isAsc() ? Sort.Direction.ASC : Sort.Direction.DESC, page.getOrderByField());
        }else{
            pageable = new PageRequest(page.getCurrent()-1,page.getSize(),Sort.Direction.DESC,"id");
        }

        org.springframework.data.domain.Page<Tender> tenderPage = tenderRepository.findAll(new Specification<Tender>(){

            @Override
            public Predicate toPredicate(Root<Tender> root, CriteriaQuery<?> criteriaQuery, CriteriaBuilder criteriaBuilder) {
                List<Predicate> list = new ArrayList<Predicate>();
                list.add(criteriaBuilder.equal(root.get("status").as(String.class), "OPEN"));
                if(!Strings.isNullOrEmpty(name)){
                    list.add(criteriaBuilder.like(root.get("name").as(String.class), "%"+name+"%"));
                }
                if(!Strings.isNullOrEmpty(colorNote)){
                    list.add(criteriaBuilder.like(root.get("colorNote").as(String.class), "%"+colorNote+"%"));
                }
                if(!Strings.isNullOrEmpty(shape)){
                    list.add(criteriaBuilder.like(root.get("shape").as(String.class),"%"+shape+"%"));
                }
                if(!Strings.isNullOrEmpty(size)){{
                    list.add(criteriaBuilder.equal(root.get("size").as(String.class),"%"+size+"%"));
                }}
                Predicate[] p = new Predicate[list.size()];
                return criteriaBuilder.and(list.toArray(p));
            }
        },pageable);
        page.setTotal(Integer.valueOf(tenderPage.getTotalElements()+""));
        page.setRecords(tenderPage.getContent());
        return page;
    }
}

