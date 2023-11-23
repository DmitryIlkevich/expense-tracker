package com.ui.expensetracker.controler;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * Controller which sends start page with frontend part
 *
 * @author dmitryilkevich
 */
@Controller
public class IndexController {

    /**
     * @return Index page
     */
    @RequestMapping(value = "/")
    public String index() {
        return "index";
    }
}
