package cn.enilu.flash.bean.dictmap;

import cn.enilu.flash.bean.dictmap.base.AbstractDictMap;

public class SupplierDict extends AbstractDictMap {
    @Override
    public void init(){
        put("no","编号");
        put("name","名称");
        put("email","电子邮件");
        put("telephone","电话号码");
    }

    @Override
    protected void initBeWrapped(){

    }
}
