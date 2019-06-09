package cn.enilu.flash.api.controller.business;

import cn.enilu.flash.api.controller.BaseController;
import cn.enilu.flash.bean.core.BussinessLog;
import cn.enilu.flash.bean.dictmap.SupplierDict;
import cn.enilu.flash.bean.entity.business.Supplier;
import cn.enilu.flash.bean.enumeration.BizExceptionEnum;
import cn.enilu.flash.bean.exception.GunsException;
import cn.enilu.flash.bean.vo.front.Rets;
import cn.enilu.flash.service.business.SupplierService;
import cn.enilu.flash.utils.ToolUtil;
import com.alibaba.fastjson.JSON;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/supplier")
public class SupplierController extends BaseController {
    private Logger logger = LoggerFactory.getLogger(SupplierController.class);
    @Autowired
    private SupplierService supplierService;

    @RequestMapping(value = "/list", method = RequestMethod.GET)
    public Object List(){
        List<Supplier> list = (List<Supplier>)supplierService.queryAll();
        return Rets.success(list);
    }

    @RequestMapping(method = RequestMethod.POST)
    @BussinessLog(value = "编辑供应商", key = "name", dict = SupplierDict.class)
    public Object save(@ModelAttribute Supplier supplier){
        logger.info(JSON.toJSONString(supplier));
        if(ToolUtil.isOneEmpty(supplier, supplier.getName())){
            throw new GunsException(BizExceptionEnum.REQUEST_NULL);
        }
        supplierService.save(supplier);
        return Rets.success();
    }

    @RequestMapping(method = RequestMethod.DELETE)
    @BussinessLog(value = "删除供应商", key = "id", dict = SupplierDict.class)
    public Object remove(Long id){
        logger.info("id:{}",id);
        if(ToolUtil.isEmpty(id)){
            throw new GunsException(BizExceptionEnum.REQUEST_NULL);
        }
        supplierService.delete(id);
        return Rets.success();
    }
}
