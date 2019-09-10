package cn.enilu.flash.api.mail;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;

import java.nio.charset.Charset;
import java.util.HashMap;
import java.util.Map;

@Data
@ConfigurationProperties(prefix = "spring.mail")
public class MailProperties {

    /**
     * 邮件服务器主机名
     * 163邮箱 : smtp.163.com
     * QQ邮箱 : smtp.qq.com
     */
    private String host;

    /**
     * 邮件服务器端口号
     * 默认25
     */
    private Integer port = 25;

    /**
     * 邮箱用户名
     */
    private String username;

    /**
     * 邮箱第三方授权码
     */
    private String password;

    /**
     * 邮件传输协议
     * 默认smtp
     */
    private String protocol = "smtp";

    /**
     * 邮件编码
     * 默认UTF-8
     */
    private Charset charset = Charset.forName("UTF-8");

    private Map<String, String> properties;

    public MailProperties() {
        this.properties = new HashMap();
    }

}