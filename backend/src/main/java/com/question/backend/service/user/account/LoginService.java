package com.question.backend.service.user.account;

import java.util.Map;

public interface LoginService { // 验证用户名密码，验证成功后返回 jwt token（令牌）
    public Map<String, String> getToken(String username, String password);
}
