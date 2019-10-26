package cn.enilu.flash.api.mail;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ClassPathResource;
import org.springframework.mail.MailException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.thymeleaf.context.Context;
import org.thymeleaf.spring5.SpringTemplateEngine;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

@Slf4j
@Service
public class MailServiceImpl implements MailService {

    @Autowired
    private JavaMailSender javaMailSender;

    @Autowired
    private SpringTemplateEngine templateEngine;

    /**
     * 图片路径
     */
    private static final String IMAGE_PATH = "static/images/";

    /**
     * 邮件模板路径
     */
    private static final String TEMPLATE_PATH = "email/";

    @Value("${spring.mail.username}")
    private String from;
//    private String from = "purchase@mailchinastone.com";

    @Override
    @Async
    public void sendSimpleMail(String to, String subject, String content) {
        log.info("{} sendSimpleMail to {}, subject : {}, content : {}", from, to, subject, content);

        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom(from);
        message.setTo(to);
        message.setSubject(subject);
        message.setText(content);

        log.info("{} sendSimpleMail begin", from);
        try {
            javaMailSender.send(message);
        } catch (MailException e) {
            log.warn("sendSimpleMail MailException : {}", e.getMessage());
        }
        log.info("{} sendSimpleMail finish", from);
    }

    @Override
    @Async
    public void sendAttachmentMail(String to, String subject, String content, String imageName) {
        log.info("{} sendAttachmentMail to {}, subject : {}, content : {}, imageName : {}", from, to, subject, content, imageName);

        MimeMessage message = javaMailSender.createMimeMessage();
        try {
            MimeMessageHelper helper = new MimeMessageHelper(message, true);
            helper.setFrom(from);
            helper.setTo(to);
            helper.setSubject(subject);
            helper.setText(content);

//            File image = new File(IMAGE_PATH + imageName);
            ClassPathResource image = new ClassPathResource(IMAGE_PATH + imageName);
            helper.addAttachment(imageName, image);
        } catch (MessagingException e) {
            log.warn("sendAttachmentMail MessagingException : {}", e.getMessage());
        }

        log.info("{} sendAttachmentMail begin", from);
        try {
            javaMailSender.send(message);
        } catch (MailException e) {
            log.warn("sendAttachmentMail MailException : {}", e.getMessage());
        }
        log.info("{} sendAttachmentMail finish", from);
    }

    @Override
    @Async
    public void sendTemplateMail(String to, String subject, String templateName, Context context) {
        log.info("{} sendTemplateMail to {}, subject : {}, templateName : {}", from, to, subject, templateName);

        MimeMessage message = javaMailSender.createMimeMessage();
        try {
            MimeMessageHelper helper = new MimeMessageHelper(message, true);
            helper.setFrom(from);
            helper.setTo(to);
            helper.setSubject(subject);

//            ClassPathResource backgroundImage = new ClassPathResource(IMAGE_PATH + "peachblossom.jpg");
//            helper.addInline("backgroundImage", backgroundImage);

//            Context context = new Context();
//            context.setVariable("receiver", to);
            String content = templateEngine.process(TEMPLATE_PATH + templateName, context);
            helper.setText(content,true);
        } catch (MessagingException e) {
            log.warn("sendTemplateMail MessagingException : {}", e.getMessage());
        }

        log.info("{} sendTemplateMail begin", from);
        try {
            javaMailSender.send(message);
        } catch (MailException e) {
            log.warn("sendTemplateMail MailException : {}", e.getMessage());
        }
        log.info("{} sendTemplateMail finish", from);
    }
}