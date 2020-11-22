package com.bookmall.controller.portal;

import com.bookmall.common.Const;
import com.bookmall.pojo.Product;
import com.bookmall.service.WatchlistService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpSession;
import java.util.List;

@Controller
@RequestMapping("/watchlist/")
public class WatchlistController {

    @Autowired
    private WatchlistService watchlistService;

    @RequestMapping(value = "getAllBooks.do", method = RequestMethod.POST)
    @ResponseBody
    public List<Product> getAllBooks(int user_id, HttpSession session) {
        List<Product> products = watchlistService.getAllBooks(user_id);
        session.setAttribute(Const.CURRENT_USER, products);
        return products;
    }

    @RequestMapping(value = "updateBook.do", method = RequestMethod.POST)
    @ResponseBody
    public int updateBook(int user_id, int book_id, boolean flag, HttpSession session) {
        //service ---> mybatis ----> dao
        int res = watchlistService.updateBook(user_id, book_id, flag);
        session.setAttribute(Const.CURRENT_USER, res);
        return res;
    }
}

