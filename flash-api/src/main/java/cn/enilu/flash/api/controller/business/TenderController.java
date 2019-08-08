package cn.enilu.flash.api.controller.business;

import cn.enilu.flash.api.controller.BaseController;
import cn.enilu.flash.bean.core.BussinessLog;
import cn.enilu.flash.bean.dictmap.TenderDict;
import cn.enilu.flash.bean.entity.business.Bid;
import cn.enilu.flash.bean.entity.business.Tender;
import cn.enilu.flash.bean.enumeration.BizExceptionEnum;
import cn.enilu.flash.bean.exception.GunsException;
import cn.enilu.flash.bean.vo.front.Rets;
import cn.enilu.flash.service.business.TenderService;
import cn.enilu.flash.utils.ToolUtil;
import com.alibaba.fastjson.JSON;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/tender")
public class TenderController extends BaseController {

    private Logger logger = LoggerFactory.getLogger(TenderController.class);
    @Autowired
    private TenderService tenderService;

    @RequestMapping(value = "/list", method = RequestMethod.GET)
    public Object List() {
        List<Tender> list = (List<Tender>)tenderService.queryAll();
        return Rets.success(list);
    }

    @RequestMapping(method = RequestMethod.POST)
    @BussinessLog(value = "新增投标", key = "name", dict = TenderDict.class)
    public Object save(@ModelAttribute Tender tender){
        logger.info(JSON.toJSONString(tender));
        //根据tender id的最大号码加1生成编号
       String dateStr = new SimpleDateFormat("yyMMdd").format(new Date());
        Long maxId = tenderService.findMaxId();//1
        Long noPlusOne = maxId+1;
        String no = dateStr + String.format("%04d", noPlusOne);
        tender.setNo(no);
        tender.setCount(0);
        tender.setStatus("OPEN");
        if (ToolUtil.isOneEmpty(tender, tender.getName())){
            throw new GunsException(BizExceptionEnum.REQUEST_NULL);
        }
        tenderService.save(tender);
        return Rets.success();
    }
    @RequestMapping(method = RequestMethod.DELETE)
    @BussinessLog(value = "删除投标", key = "id", dict = TenderDict.class)
    public Object remove(Long id){
        logger.info("id:{}",id);
        if(ToolUtil.isEmpty(id)){
            throw new GunsException(BizExceptionEnum.REQUEST_NULL);
        }
        tenderService.delete(id);
        return Rets.success();
    }

    @RequestMapping(method = RequestMethod.GET)
    @BussinessLog(value = "查看投标", key = "id", dict = TenderDict.class)
    public Object getDetails(@RequestParam Long tenderId) {
        Tender tender = tenderService.get(tenderId);
        return tender;
    }
}