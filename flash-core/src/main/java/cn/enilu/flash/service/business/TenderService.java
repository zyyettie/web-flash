package cn.enilu.flash.service.business;

import cn.enilu.flash.bean.entity.business.Tender;
import cn.enilu.flash.dao.business.TenderRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class TenderService {

    private Logger logger = LoggerFactory.getLogger(TenderService.class);
    @Autowired
    private TenderRepository tenderRepository;

    public List<Tender> queryAll() {
        List<Tender> list = (List<Tender>) tenderRepository.findAll();
        return list;
    }
}

