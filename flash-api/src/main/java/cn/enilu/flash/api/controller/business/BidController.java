package cn.enilu.flash.api.controller.business;

import cn.enilu.flash.api.controller.BaseController;
import cn.enilu.flash.api.mail.MailService;
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
import cn.enilu.flash.utils.DateTime;
import cn.enilu.flash.utils.ToolUtil;
import com.alibaba.fastjson.JSON;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.web.bind.annotation.*;
import org.thymeleaf.context.Context;

import javax.servlet.http.HttpServletRequest;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import cn.enilu.flash.utils.DateTimeKit;


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
    @Autowired
    private MailService mailService;


//    @RequestMapping(value = "/list", method = RequestMethod.GET)
//    public Object List(){
//        List<Bid> list = (List<Bid>)bidService.queryAll();
//        return Rets.success(list);
//    }

    /**
     * 投标
     * @param bid
     * @return
     */
    @RequestMapping(method = RequestMethod.POST)
    @BussinessLog(value = "投标", key = "name", dict = BidDict.class)
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
        bid.setStatus(0);//设置初始投标状态为0
        bidService.save(bid);

        //根据createBy获取Account
        Bid newlyCreatedBid = bidService.getBidByNo(bidNo);
        User user = userService.get(newlyCreatedBid.getCreateBy());
        newlyCreatedBid.setContact(user.getAccount());
        bidService.save(newlyCreatedBid);

        //发邮件给tenderadmin
        Long tenderId = bid.getTenderId();
        String tenderAdminEmail = userService.getEmailByTenderId(tenderId);
        mailService.sendSimpleMail(tenderAdminEmail,"A new bid <"+ bidNo +"> has been created","Please login to Bid Management System to check");
        return Rets.success();
    }

    /**
     * 修改投标 (EDIT)
     * @param bid
     * @return
     */
    @RequestMapping(value="/edit", method = RequestMethod.POST)
    @BussinessLog(value = "修改投标", key = "name", dict = BidDict.class)
    public Object edit(@ModelAttribute Bid bid){
        logger.info(JSON.toJSONString(bid));
        if(ToolUtil.isOneEmpty(bid, bid.getId())){
            throw new GunsException(BizExceptionEnum.REQUEST_NULL);
        }
        Bid bidInDB = bidService.get(bid.getId());
        if(bidInDB.getIsApproved()!=0){
            throw new GunsException(BizExceptionEnum.BID_HAS_BEEN_APPROVED_ERROR);
        }
        //供应商更新bid的数量和价格
        bidService.updateQuantityAndPrice(bid.getId(), bid.getQuantity(), bid.getUnitOfBidQuantity(), bid.getPrice(), bid.getUnitOfBidPrice());
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

    /**
     * 我的投标
     * @param request
     * @return
     */
    @RequestMapping(value = "/list", method = RequestMethod.GET)
    public Object list(HttpServletRequest request){
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
                bidtenderVO.setUnitOfBidQuantity(bid.getUnitOfBidQuantity());
                bidtenderVO.setPrice(bid.getPrice());
                bidtenderVO.setUnitOfBidPrice(bid.getUnitOfBidPrice());
                bidtenderVO.setIsApproved(bid.getIsApproved());
                bidtenderVO.setBidStatus(bid.getStatus());
                if(bid.getDeliverType()!=null)
                  bidtenderVO.setDeliverType(bid.getDeliverType());
                if(bid.getDeliverNo()!=null)
                  bidtenderVO.setDeliverNo(bid.getDeliverNo());
                if(bid.getConfirmedQuantity()!=null)
                  bidtenderVO.setConfirmedQuantity(bid.getConfirmedQuantity());
                if(bid.getConfirmedPrice()!=null)
                  bidtenderVO.setConfirmedPrice(bid.getConfirmedPrice());
                bidtenderVO.setTenderId(bid.getTenderId());
                bidtenderVO.setIdFile(bid.getIdFile());
                bidtenderVO.setInvoiceNo(bid.getInvoiceNo());
                bidtenderVO.setInvoiceIdFile(bid.getInvoiceIdFile());

                //tender info
                bidtenderVO.setTenderId(tenderId);
                bidtenderVO.setTenderNo(tender.getNo());
                bidtenderVO.setName(tender.getName());
                bidtenderVO.setShape(tender.getShape());
                bidtenderVO.setSize(tender.getSize());
                bidtenderVO.setColor(tender.getColor());
                bidtenderVO.setColorNote(tender.getColorNote());
                bidtenderVO.setClarity(tender.getClarity());
                bidtenderVO.setTenderQuantity(tender.getQuantity());
                bidtenderVO.setEnhance(tender.getEnhance());
                bidtenderVO.setMaterial(tender.getMaterial());
                bidtenderVO.setNote(tender.getNote());
                bidtenderVO.setTenderStatus(tender.getStatus());
                bidtenderVO.setDueDate(tender.getDueDate());
                bidtenderVO.setCount(tender.getCount());
                list.add(bidtenderVO);
            }
        }
        return Rets.success(list);
    }

    @RequestMapping(value = "/moveToNextStatusStep3/{id}",method = RequestMethod.GET)
    @BussinessLog(value = "移到下一步状态step3 ", key = "name", dict = BidDict.class)
    public Object moveToNextStatusStep3(@PathVariable Long id){
        bidService.moveToNextStatus(id);

        //准备邮件信息
        Bid bid = bidService.get(id);
        String bidNo = bid.getNo();
        //发送step3 邮件
        String subject = "Confirmation Received Shipment";
        String templateName = "step3";
        Context context = new Context();
        Date date = new Date();
        SimpleDateFormat dateFormat = new SimpleDateFormat("dd/MM/YYYY");
        context.setVariable("receivedDate",dateFormat.format(date));
        context.setVariable("bidNo",bidNo);
        String vendorEmail = userService.getVendorEmailByBidId(id);
        mailService.sendTemplateMail(vendorEmail,subject,templateName,context);
//        sendEmail(id);
        return Rets.success();
    }

    @RequestMapping(value = "/moveBackToStep2/{id}",method = RequestMethod.GET)
    @BussinessLog(value = "移到上一步状态step2 ", key = "name", dict = BidDict.class)
    public Object moveBackToStep2(@PathVariable Long id){
        bidService.moveBackToStatus1(id);
        return Rets.success();
    }

    @RequestMapping(value = "/moveToNextStatusWithDeliverInfo",method = RequestMethod.POST)
    @BussinessLog(value = "移到供应商发货状态step2", key = "name", dict = BidDict.class)
    public Object moveToNextStatusWithDeliverInfo(@ModelAttribute Bid bid){
        bidService.moveToNextStatusWithDeliverInfo(bid.getId(), bid.getDeliverType(),bid.getDeliverNo(), bid.getMemoNo());
        Bid bidFromDB = bidService.get(bid.getId());
        String bidNo = bidFromDB.getNo();
        //供货商货物发出后需要给Nam（人名）发邮件
        String subject = "Gemstone has been shipped out for order" + bidNo;
        String templateName = "nam";
        Context context = new Context();
        context.setVariable("bidNo",bid.getNo());
        //查询nam的邮件, 暂定nam用户的id不会变，初始化时为50
        User nam = userService.get(50L);
        String namEmail = nam.getEmail();
        context.setVariable("bidNo",bidNo);
        context.setVariable("deliverType",bid.getDeliverType());
        context.setVariable("deliverNo",bid.getDeliverNo());
        mailService.sendTemplateMail(namEmail,subject,templateName,context);
        return Rets.success();
    }

    @RequestMapping(value = "/moveToNextStatusWithQuantityPrice",method = RequestMethod.POST)
    @BussinessLog(value = "移到确认数量价格状态step4", key = "name", dict = BidDict.class)
    public Object moveToNextStatusWithQuantityPrice(@ModelAttribute Bid bidDto){
        bidService.moveToNextStatusWithQuantityPrice(bidDto.getId(), bidDto.getConfirmedQuantity(), bidDto.getConfirmedPrice(),bidDto.getConfirmedQuantityUnit(), bidDto.getConfirmedPriceUnit());

        //准备邮件信息
        Long bidId =bidDto.getId();
        Bid realBid = bidService.get(bidId);
        Tender tender = tenderService.get(realBid.getTenderId());
        String bidNo = realBid.getNo();
        Long bidCreateBy = realBid.getCreateBy();
        User user = userService.get(bidCreateBy);
        String paymentTerms = user.getPaymentTerms();
        String dueDate = "";
        Date today = new Date();
        switch (paymentTerms){
            case "cash":
                dueDate = DateTimeKit.now();
                break;
            case "30days":
                dueDate = DateTimeKit.offsiteDay(today,30).toString();
                break;
            case "60days":
                dueDate = DateTimeKit.offsiteDay(today,60).toString();
                break;
            case "90days":
                dueDate = DateTimeKit.offsiteDay(today,90).toString();
                break;
        }
        //发送step4 邮件
        String subject = "Confirmation Order Items - Order: " + bidNo;
        String templateName = "step4";
        Context context = new Context();
        context.setVariable("bidNo",bidNo);
        context.setVariable("name",tender.getName());
        context.setVariable("pieces",realBid.getConfirmedQuantity());
        context.setVariable("price",realBid.getConfirmedPrice());
        context.setVariable("totalPrice", realBid.getConfirmedPrice());
        context.setVariable("dueDate", dueDate);
        String vendorEmail = userService.getVendorEmailByBidId(bidId);
        mailService.sendTemplateMail(vendorEmail,subject,templateName,context);
//        sendEmail(bid.getId());
        return Rets.success();
    }

    @RequestMapping(value = "/moveToNextStatus/{id}",method = RequestMethod.GET)
    @BussinessLog(value = "移到下一步状态step5 ", key = "name", dict = BidDict.class)
    public Object moveToNextStatus(@PathVariable Long id){
        bidService.moveToNextStatus(id);
//        sendEmail(id);
        return Rets.success();
    }

    @RequestMapping(value = "/moveToNextStatusWithInvoice",method = RequestMethod.POST)
    @BussinessLog(value = "移到收到发票状态step6", key = "name", dict = BidDict.class)
    public Object moveToNextStatusWithInvoice(@ModelAttribute Bid bid){
        bidService.moveToNextStatusWithInvoice(bid.getId(), bid.getInvoiceIdFile(), bid.getInvoiceNo());

        //准备邮件信息
        Long bidId =bid.getId();
        Bid realBid = bidService.get(bidId);

        //发送step6 邮件
        String subject = "Payment Notification";
        String templateName = "step6";
        Context context = new Context();
        context.setVariable("invoiceNo",realBid.getInvoiceNo());
        String vendorEmail = userService.getVendorEmailByBidId(bidId);
        mailService.sendTemplateMail(vendorEmail,subject,templateName,context);
//        sendEmail(bid.getId());
        return Rets.success();
    }

    @RequestMapping(value = "/moveToNextStatusWithPayment",method = RequestMethod.POST)
    @BussinessLog(value = "移到完成付款状态step7", key = "name", dict = BidDict.class)
    public Object moveToNextStatusWithPayment(@ModelAttribute Bid bid){
        bidService.moveToNextStatusWithPayment(bid.getId(), bid.getIdFile());
        sendEmail(bid.getId());
        return Rets.success();
    }

    @RequestMapping(value = "/approve/{id}", method = RequestMethod.GET)
    @BussinessLog(value = "接受投标 step1", key = "name", dict = BidDict.class)
    public Object approve(@PathVariable Long id){
        //id为bid id
        bidService.approve(id);

        //准备邮件信息
        Bid bid = bidService.get(id);
        String bidNo = bid.getNo();
        Tender tender = tenderService.get(bid.getTenderId());
        String tenderName = tender.getName();
        //发送step1 邮件
        String subject = "Delivery Confirmation "+tenderName;
        String templateName = "step1";
        Context context = new Context();
        context.setVariable("name",tenderName);
        context.setVariable("bidNo",bidNo);
        String vendorEmail = userService.getVendorEmailByBidId(id);
        mailService.sendTemplateMail(vendorEmail,subject,templateName,context);
//        sendEmail(id);
        return Rets.success();
    }

    @RequestMapping(value = "/deny/{id}", method = RequestMethod.GET)
    @BussinessLog(value = "拒绝投标", key = "name", dict = BidDict.class)
    public Object deny(@PathVariable Long id){
        bidService.deny(id);
        sendEmail(id);
        return Rets.success();
    }

    @RequestMapping(value = "/listForPayment", method = RequestMethod.GET)
    public Object listForPayment(HttpServletRequest request){
        List<Bidtender> list = new ArrayList();
            List<Bid> bidList = (List<Bid>)bidService.getListForPayment();
            for(Bid bid: bidList){
                Long tenderId = bid.getTenderId();
                Tender tender = tenderService.get(tenderId);
                Bidtender bidtenderVO = new Bidtender();
                //bid info
                bidtenderVO.setBidId(bid.getId());
                bidtenderVO.setNo(bid.getNo());
                bidtenderVO.setQuantity(bid.getQuantity());
                bidtenderVO.setPrice(bid.getPrice());
                bidtenderVO.setIsApproved(bid.getIsApproved());
                bidtenderVO.setBidStatus(bid.getStatus());
                if(bid.getDeliverType()!=null)
                    bidtenderVO.setDeliverType(bid.getDeliverType());
                if(bid.getDeliverNo()!=null)
                    bidtenderVO.setDeliverNo(bid.getDeliverNo());
                if(bid.getConfirmedQuantity()!=null)
                    bidtenderVO.setConfirmedQuantity(bid.getConfirmedQuantity());
                if(bid.getConfirmedPrice()!=null)
                    bidtenderVO.setConfirmedPrice(bid.getConfirmedPrice());
                bidtenderVO.setTenderId(bid.getTenderId());
                bidtenderVO.setIdFile(bid.getIdFile());
                bidtenderVO.setInvoiceNo(bid.getInvoiceNo());
                bidtenderVO.setInvoiceIdFile(bid.getInvoiceIdFile());

                //tender info
                bidtenderVO.setTenderId(tenderId);
                bidtenderVO.setTenderNo(tender.getNo());
                bidtenderVO.setName(tender.getName());
                bidtenderVO.setShape(tender.getShape());
                bidtenderVO.setSize(tender.getSize());
                bidtenderVO.setColor(tender.getColor());
                bidtenderVO.setColorNote(tender.getColorNote());
                bidtenderVO.setClarity(tender.getClarity());
                bidtenderVO.setTenderQuantity(tender.getQuantity());
                bidtenderVO.setEnhance(tender.getEnhance());
                bidtenderVO.setMaterial(tender.getMaterial());
                bidtenderVO.setNote(tender.getNote());
                bidtenderVO.setTenderStatus(tender.getStatus());
                bidtenderVO.setDueDate(tender.getDueDate());
                bidtenderVO.setCount(tender.getCount());
                list.add(bidtenderVO);
            }
        return Rets.success(list);
    }


    private void sendEmail(Long id) {
        //发送邮件给tenderadmin
        String tenderAdminEmail = userService.getTenderAdminEmailByBidId(id);
        mailService.sendSimpleMail(tenderAdminEmail,"Your tender status has been changed","Please login to Bid Management System to check");
        //发邮件给vendor
        String vendorEmail = userService.getVendorEmailByBidId(id);
        mailService.sendSimpleMail(tenderAdminEmail,"Your bid status has been changed","Please login to Bid Management System to check");
    }
}
