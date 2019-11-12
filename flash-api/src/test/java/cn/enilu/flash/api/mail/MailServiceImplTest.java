package cn.enilu.flash.api.mail;

import lombok.extern.slf4j.Slf4j;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.thymeleaf.context.Context;


@Slf4j
@RunWith(SpringJUnit4ClassRunner.class)
@SpringBootTest
public class MailServiceImplTest {

    @Autowired
    private MailService mailService;

    @Value("${spring.mail.receiver}")
    private String to;

    @Test
    public void sendSimpleMail() throws Exception {
        String subject = "sendSimpleMail7";
        String content = "更无柳絮因风起，唯有葵花向日倾,这是一个测试邮件";
        String to="zyyettie@163.com";
        mailService.sendSimpleMail(to, subject, content);
        log.info("test sendSimpleMail to {}", to);
    }

//    @Test
    public void sendAttachmentMail() throws Exception {
        String subject = "sendAttachmentMail";
        String content = "况是青春日将暮，桃花乱落如红雨";
        mailService.sendAttachmentMail(to, subject, content, "peachblossom.jpg");
        log.info("test sendAttachmentMail to {}", to);
    }

    @Test
    public void sendTemplateMail() throws Exception {
        String subject = "sendTemplateMail-0";
        String templateName = "step0";
        String to="zyyettie@163.com";
        Context context = new Context();
//        context.setVariable("receivedDate", "25/10/2019");
        context.setVariable("name", "蓝宝石");
        context.setVariable("bidNo", "1910240001");
        context.setVariable("size", "1.1mm*2.2mm");
        context.setVariable("color", "red");
        context.setVariable("clarity", "Eye Clean");
        context.setVariable("treatment", "Heated");
        context.setVariable("quantity", "100");
        context.setVariable("note", "1000~1200");
        mailService.sendTemplateMail(to, subject, templateName, context);
        log.info("test sendTemplateMail to {}", to);
    }
}