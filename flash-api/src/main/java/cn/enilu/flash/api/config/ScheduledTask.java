package cn.enilu.flash.api.config;

import cn.enilu.flash.service.business.TenderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Component
public class ScheduledTask {
    @Autowired
    private TenderService tenderService;

    @Scheduled(cron = "0 0 0 1/1 * ?")
    public void closeDueTender(){
        log.info("Staring to close due Tender");
        tenderService.closeDueTender();
        log.info("End to close due Tender");
    }
}
