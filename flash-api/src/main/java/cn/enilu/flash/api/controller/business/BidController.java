package cn.enilu.flash.api.controller.business;

import cn.enilu.flash.api.controller.BaseController;
import cn.enilu.flash.bean.core.BussinessLog;
import cn.enilu.flash.bean.dictmap.BidDict;
import cn.enilu.flash.bean.entity.business.Bid;
import cn.enilu.flash.bean.entity.business.Tender;
import cn.enilu.flash.bean.entity.system.User;
import cn.enilu.flash.bean.enumeration.BizExceptionEnum;
import cn.enilu.flash.bean.exception.GunsException;
import cn.enilu.flash.bean.vo.business.Bidtender;
import cn.enilu.flash.bean.vo.front.Rets;
import cn.enilu.flash.service.business.BidService;
import cn.enilu.flash.service.business.TenderService;
import cn.enilu.flash.service.system.UserService;
import cn.enilu.flash.utils.ToolUtil;
import com.alibaba.fastjson.JSON;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/bid")
public class BidController extends BaseController{
    private Logger logger = LoggerFactory.getLogger(SupplierController.class);
    @Autowired
    private BidService bidService;
    @Autowired
    private TenderService tenderService;
    @Autowired
    private UserService userService;

//    @RequestMapping(value = "/list", method = RequestMethod.GET)
//    public Object List(){
//        List<Bid> list = (List<Bid>)bidService.queryAll();
//        return Rets.success(list);
//    }

    /**
     *
     * @param bid
     * @return
     */
    @RequestMapping(method = RequestMethod.POST)
    @BussinessLog(value = "编辑投标", key = "name", dict = BidDict.class)
    public Object save(@ModelAttribute Bid bid){
        logger.info(JSON.toJSONString(bid));
        if(ToolUtil.isOneEmpty(bid, bid.getTenderId())){
            throw new GunsException(BizExceptionEnum.REQUEST_NULL);
        }

        Tender tender = tenderService.get(bid.getTenderId());
        tender.setCount(tender.getCount()+1);
        tenderService.save(tender);
        //根据bid id的最大号码加1生成编号
        String bidNo = tender.getNo() + String.format("%04d", tender.getCount()+1);
        bid.setNo(bidNo);
        bidService.save(bid);

        //根据createBy获取Account
        Bid newlyCreatedBid = bidService.getBidByNo(bidNo);
        User user = userService.get(newlyCreatedBid.getCreateBy());
        newlyCreatedBid.setContact(user.getAccount());
        bidService.save(newlyCreatedBid);

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

    @RequestMapping(value = "/bytender", method = RequestMethod.GET)
    public Object getBidListByTenderId(@Param("tenderId") Long tenderId){
        List<Bid> list = (List<Bid>)bidService.getBidsByTenderId(tenderId);
        return Rets.success(list);
    }

    @RequestMapping(value = "/list", method = RequestMethod.GET)
    public Object List(HttpServletRequest request){
        Long idUser;
        try {
            idUser = getIdUser(request);
        }catch (Exception e){
            return Rets.expire();
        }
        List<Bidtender> list = new ArrayList();
        if(idUser!=null){
            List<Bid> bidList = (List<Bid>)bidService.getListByUser(idUser);
            for(Bid bid: bidList){
                Long tenderId = bid.getTenderId();
                Tender tender = tenderService.get(tenderId);
                Bidtender bidtenderVO = new Bidtender();
                //bid info
                bidtenderVO.setBidId(bid.getId());
                bidtenderVO.setNo(bid.getNo());
                bidtenderVO.setQuantity(bid.getQuantity());
                bidtenderVO.setPrice(bid.getPrice());
                bidtenderVO.setUnit(bid.getUnit());
                bidtenderVO.setIsApproved(bid.getIsApproved());
                bidtenderVO.setBidStatus(bid.getStatus());
                bidtenderVO.setTenderId(bid.getTenderId());

                //tender info
                bidtenderVO.setTenderId(tenderId);
                bidtenderVO.setTenderNo(tender.getNo());
                bidtenderVO.setName(tender.getName());
                bidtenderVO.setShape(tender.getShape());
                bidtenderVO.setDimension(tender.getDimension());
                bidtenderVO.setColor(tender.getColor());
                bidtenderVO.setPurity(tender.getPurity());
                bidtenderVO.setTenderQuantity(tender.getQuantity());
                bidtenderVO.setTenderUnit(tender.getUnit());
                bidtenderVO.setHeated(tender.getHeated());
                bidtenderVO.setTenderStatus(tender.getStatus());
                bidtenderVO.setDueDate(tender.getDueDate());
                bidtenderVO.setCount(tender.getCount());
                list.add(bidtenderVO);
            }
        }
        return Rets.success(list);
    }

    @RequestMapping(value = "/moveToNextStatus/{id}",method = RequestMethod.GET)
    @BussinessLog(value = "移到下一步状态", key = "name", dict = BidDict.class)
    public Object moveToNextStatus(@PathVariable Long id){
        bidService.moveToNextStatus(id);
        return Rets.success();
    }

    @RequestMapping(value = "/approve/{id}", method = RequestMethod.GET)
    @BussinessLog(value = "接受投标", key = "name", dict = BidDict.class)
    public Object approve(@PathVariable Long id){
        bidService.approve(id);
        return Rets.success();
    }

    @RequestMapping(value = "/deny/{id}", method = RequestMethod.GET)
    @BussinessLog(value = "拒绝投标", key = "name", dict = BidDict.class)
    public Object deny(@PathVariable Long id){
        bidService.deny(id);
        return Rets.success();
    }
}
