package cn.enilu.flash.bean.dictmap;

import cn.enilu.flash.bean.dictmap.base.AbstractDictMap;

public class TenderDict extends AbstractDictMap {
    @Override
    public void init(){
        put("name","名称");
        put("type","类型");
        put("quantity","数量");
        put("unit","单位");
        put("status","状态");
        put("isDelete","是否删除");
        put("dueDate","到期日期");
        put("contact","联系人");
    }

    @Override
    protected void initBeWrapped(){

    }
}
