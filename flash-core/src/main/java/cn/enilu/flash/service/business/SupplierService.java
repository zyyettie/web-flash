package cn.enilu.flash.service.business;

import cn.enilu.flash.bean.entity.business.Supplier;
import cn.enilu.flash.dao.business.SupplierRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SupplierService {
    private Logger logger = LoggerFactory.getLogger(SupplierService.class);
    @Autowired
    private SupplierRepository supplierRepository;

    public Object queryAll(){
        List<Supplier> list = (List<Supplier>)supplierRepository.findAll();
        return list;
    }

    public void save(Supplier supplier){
        supplierRepository.save(supplier);
    }
    public void delete(Long id){
        supplierRepository.deleteById(id);
    }
}
