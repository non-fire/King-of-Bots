package com.question.backend.controller.pk;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/pk/")
public class BotInfoController {

    @RequestMapping("/info/")
    public Map<String, String> getinfo(){
        Map<String, String> info = new HashMap<String, String>();
        info.put("name", "apple");
        info.put("rating", "1000");
        return info;
    }
}
