package cn.enilu.flash.warpper;

import cn.enilu.flash.service.system.impl.ConstantFactory;

import java.util.Map;

public class TenderWarpper extends BaseControllerWarpper {
    public TenderWarpper(Object list) {
        super(list);
    }

    @Override
    public void warpTheMap(Map<String, Object> map) {
        Long createBy = Long.valueOf(map.get("createBy").toString());
        map.put("userName", ConstantFactory.me().getUserNameById(createBy));
    }
}
