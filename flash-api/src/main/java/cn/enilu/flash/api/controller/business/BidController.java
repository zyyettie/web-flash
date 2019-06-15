package cn.enilu.flash.api.controller.business;

import cn.enilu.flash.api.controller.BaseController;
import cn.enilu.flash.bean.core.BussinessLog;
import cn.enilu.flash.bean.dictmap.BidDict;
import cn.enilu.flash.bean.entity.business.Bid;
import cn.enilu.flash.bean.enumeration.BizExceptionEnum;
import cn.enilu.flash.bean.exception.GunsException;
import cn.enilu.flash.bean.vo.front.Rets;
import cn.enilu.flash.service.business.BidService;
import cn.enilu.flash.utils.ToolUtil;
import com.alibaba.fastjson.JSON;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/bid")
public class BidController extends BaseController{
    private Logger logger = LoggerFactory.getLogger(SupplierController.class);
    @Autowired
    private BidService bidService;

    @RequestMapping(value = "/list", method = RequestMethod.GET)
    public Object List(){
        List<Bid> list = (List<Bid>)bidService.queryAll();
        return Rets.success(list);
    }

//    @RequestMapping(value = "", method = RequestMethod.POST)
//    public Object addBid(@ModelAttribute Bid bid){
//
//    }

    @RequestMapping(method = RequestMethod.POST)
    @BussinessLog(value = "编辑投标", key = "name", dict = BidDict.class)
    public Object save(@ModelAttribute Bid bid){
        logger.info(JSON.toJSONString(bid));
        if(ToolUtil.isOneEmpty(bid, bid.getTenderId())){
            throw new GunsException(BizExceptionEnum.REQUEST_NULL);
        }
        bidService.save(bid);
        return Rets.success();
    }

    @RequestMapping(method = RequestMethod.DELETE)
    @BussinessLog(value = "删除投标", key = "id", dict = BidDict.class)
    public Object remove(Long id){
        logger.info("id:{}",id);
        if(ToolUtil.isEmpty(id)){
            throw new GunsException(BizExceptionEnum.REQUEST_NULL);
        }
        bidService.delete(id);
        return Rets.success();
    }
}
