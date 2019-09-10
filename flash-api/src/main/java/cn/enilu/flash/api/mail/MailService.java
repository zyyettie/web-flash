package cn.enilu.flash.api.mail;

public interface MailService {

    void sendSimpleMail(String to, String subject, String content);

    void sendAttachmentMail(String to, String subject, String content, String fileName);

    void sendTemplateMail(String to, String subject, String templateName);
}