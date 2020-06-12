package cn.enilu.flash.warpper;

import cn.enilu.flash.bean.entity.business.Tender;
import cn.enilu.flash.service.system.impl.ConstantFactory;

import java.util.Map;

public class BidWarpper extends BaseControllerWarpper{
    public BidWarpper(Object list) {
        super(list);
    }

    public void warpTheMap(Map<String, Object> map) {
        Tender tender = (Tender)map.get("tender");
        map.put("tenderNo", tender.getNo());
        map.put("name", tender.getName());
        map.put("color", tender.getColor());
        map.put("colorNote", tender.getColorNote());
        map.put("shape", tender.getShape());
        map.put("size", tender.getSize());
        map.put("quantity", tender.getQuantity());
        map.put("clarity", tender.getClarity());
        map.put("enhance", tender.getEnhance());
        map.put("material", tender.getMaterial());
        map.put("note", tender.getNote());

        Long userid = Long.valueOf(map.get("createBy").toString());
        map.put("paymentTerms", ConstantFactory.me().getPaymentTermsById(userid));
        map.put("paymentType", ConstantFactory.me().getPaymentTypeById(userid));

    }
}


