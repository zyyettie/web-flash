package cn.enilu.flash.api.utils;

import java.util.Random;

public class RandomPassword {
    /**
     * 密码的长度
     */
    private static int passwordLength;

    public String getRamdomPassword() {
        StringBuffer password = new StringBuffer();
        //初始化数字英文和符号
        String num = "0123456789";
        String english = "qwertyuiopasdfghjklzxcvbnm";
        String englishBig = "QWERTYUIOPASDFGHJKLZXCVBNM";
        String symbol = "#$%_+-";
        String stringSum = num + english + englishBig + symbol;
        int length = stringSum.length();
        //定义密码长度,写死8
        passwordLength = 8;
        for (int i = 0; i < passwordLength; i++) {
            Random random = new Random();
            int a = random.nextInt(length + 1);
            char one = stringSum.charAt(a);
            password.append(one);
        }
        return password.toString();
    }
}
