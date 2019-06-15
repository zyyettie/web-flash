package cn.enilu.flash.bean.dictmap;

import cn.enilu.flash.bean.dictmap.base.AbstractDictMap;

public class BidDict extends AbstractDictMap {
    @Override
    public void init(){
        put("quantity","数量");
        put("unit","单位");
        put("contact","联系人");
        put("isApproved","是否接受");
        put("tenderId","发标ID");
        put("tenderNo","发标编号");
    }

    @Override
    protected void initBeWrapped(){

    }
}
