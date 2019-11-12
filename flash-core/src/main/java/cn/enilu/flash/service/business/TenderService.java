package cn.enilu.flash.service.business;

import cn.enilu.flash.bean.entity.business.Tender;
import cn.enilu.flash.dao.business.TenderRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

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
}

