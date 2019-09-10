package cn.enilu.flash.api.mail;

import lombok.extern.slf4j.Slf4j;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;


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
        String subject = "sendSimpleMail5";
        String content = "更无柳絮因风起，唯有葵花向日倾";
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

//    @Test
    public void sendTemplateMail() throws Exception {
        String subject = "sendTemplateMail";
        String templateName = "mail";
        mailService.sendTemplateMail(to, subject, templateName);
        log.info("test sendTemplateMail to {}", to);
    }
}