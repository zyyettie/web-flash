package cn.enilu.flash.api.controller.business;

import cn.enilu.flash.api.controller.BaseController;
import cn.enilu.flash.bean.entity.business.Tender;
import cn.enilu.flash.bean.vo.front.Rets;
import cn.enilu.flash.service.business.TenderService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/tender")
public class TenderController extends BaseController {

    private Logger logger = LoggerFactory.getLogger(TenderController.class);
    @Autowired
    private TenderService tenderService;

    @RequestMapping(value = "/list", method = RequestMethod.GET)
    public Object List() {
        List<Tender> list = tenderService.queryAll();
        return Rets.success(list);
    }

}