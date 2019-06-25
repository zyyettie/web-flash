package cn.enilu.flash.bean.dictmap;

import cn.enilu.flash.bean.dictmap.base.AbstractDictMap;

public class TenderDict extends AbstractDictMap {
    @Override
    public void init(){
        put("no","编号");
        put("name","名称");
        put("shape","形状");
        put("dimension","尺寸");
        put("color","颜色");
        put("purity","净度");
        put("quantity","数量");
        put("unit","单位");
        put("heated","处理方式");
        put("status","发标状态");
        put("dueDate","到期日期");
        put("count","已投标数");
        put("isDelete","是否删除");
    }

    @Override
    protected void initBeWrapped(){

    }
}
