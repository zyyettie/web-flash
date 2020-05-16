package cn.enilu.flash.api.controller.business;

import cn.enilu.flash.api.controller.BaseController;
import cn.enilu.flash.api.mail.MailService;
import cn.enilu.flash.bean.core.BussinessLog;
import cn.enilu.flash.bean.dictmap.TenderDict;
import cn.enilu.flash.bean.dto.TenderDto;
import cn.enilu.flash.bean.entity.business.Tender;
import cn.enilu.flash.bean.entity.system.User;
import cn.enilu.flash.bean.enumeration.BizExceptionEnum;
import cn.enilu.flash.bean.exception.GunsException;
import cn.enilu.flash.bean.vo.front.Rets;
import cn.enilu.flash.service.business.TenderService;
import cn.enilu.flash.service.system.UserService;
import cn.enilu.flash.utils.ToolUtil;
import com.alibaba.fastjson.JSON;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.thymeleaf.context.Context;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/tender")
public class TenderController extends BaseController {

    private Logger logger = LoggerFactory.getLogger(TenderController.class);
    @Autowired
    private TenderService tenderService;
    @Autowired
    private UserService userService;
    @Autowired
    private MailService mailService;

    @RequestMapping(value = "/list", method = RequestMethod.GET)
    public Object List() {
        List<Tender> list = (List<Tender>)tenderService.queryAll();
        //add userName field and then send to frontend
        List<TenderDto> tenderList = new ArrayList<>();
        for(Tender tender: list){
            Long userId = tender.getCreateBy();
            User user = userService.get(userId);
            String userName = user.getName();
            TenderDto tenderDto = new TenderDto();
            tenderDto.setUserName(userName);
            //set other properties
            tenderDto.setId(tender.getId());
            tenderDto.setNo(tender.getNo());
            tenderDto.setName(tender.getName());
            tenderDto.setShape(tender.getShape());
            tenderDto.setSize(tender.getSize());
            tenderDto.setColor(tender.getColor());
            tenderDto.setColorNote(tender.getColorNote());
            tenderDto.setClarity(tender.getClarity());
            tenderDto.setQuantity(tender.getQuantity());
            tenderDto.setUnitOfQuantity(tender.getUnitOfQuantity());
            tenderDto.setEnhance(tender.getEnhance());
            tenderDto.setMaterial(tender.getMaterial());
            tenderDto.setStatus(tender.getStatus());
            tenderDto.setDueDate(tender.getDueDate());
            tenderDto.setCount(tender.getCount());
            tenderDto.setVersion(tender.getVersion());
            tenderDto.setIsDelete(tender.getIsDelete());
            tenderDto.setStoneUseFor(tender.getStoneUseFor());
            tenderDto.setNote(tender.getNote());
            tenderDto.setUnitOfNote(tender.getUnitOfNote());
            tenderList.add(tenderDto);
        }
        return Rets.success(tenderList);
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
        //群发邮件 step0
        String subject = "New Order";
        String templateName = "step0";
        Context context = new Context();
        context.setVariable("name",tender.getName());
        context.setVariable("shape",tender.getShape());
        context.setVariable("size",tender.getSize());
        context.setVariable("color",tender.getColorNote());
//        context.setVariable("clarity",tender.getClarity());
        context.setVariable("treatment",tender.getEnhance());
        context.setVariable("quantity",tender.getQuantity());
        context.setVariable("note",tender.getNote());
        List<String> emailList = userService.getAllVendorEmail();
        for(String to : emailList){
            mailService.sendTemplateMail(to,subject,templateName,context);
        }
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