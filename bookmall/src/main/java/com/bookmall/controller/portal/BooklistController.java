package com.bookmall.controller.portal;

import com.bookmall.common.Const;
import com.bookmall.pojo.Product;
import com.bookmall.pojo.User;
import com.bookmall.pojo.Booklist;
import com.bookmall.service.BooklistService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpSession;
import java.util.List;

@CrossOrigin()
@Controller
@RequestMapping("/booklist/")
public class BooklistController {

    @Autowired
    private BooklistService booklistService;

    @RequestMapping(value = "getAllBooks.do", method = RequestMethod.POST)
    @ResponseBody
    public List<Product> getAllBooks(int user_id, HttpSession session) {
        List<Product> products = booklistService.getAllBooks(user_id);
        session.setAttribute(Const.CURRENT_USER, products);
        return products;
    }

    @RequestMapping(value = "getUser.do", method = RequestMethod.POST)
    @ResponseBody
    public List<User> getUser(int book_id, HttpSession session) {
        List<User> users = booklistService.getUser(book_id);
        session.setAttribute(Const.CURRENT_USER, users);
        return users;
    }
}
