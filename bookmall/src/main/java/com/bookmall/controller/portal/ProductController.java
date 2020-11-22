package com.bookmall.controller.portal;

import com.bookmall.common.Const;
import com.bookmall.common.ResponseCode;
import com.bookmall.common.ServerResponse;
import com.bookmall.pojo.Product;
import com.bookmall.service.IUserService;
import com.bookmall.service.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import java.util.List;
import javax.servlet.http.HttpSession;

@Controller
@RequestMapping("/book/")
public class ProductController {

    @Autowired
    private BookService bookService;

    @RequestMapping(value = "searchByTitle.do", method = RequestMethod.POST)
    @ResponseBody
    public List<Product> searchByTitle(String title, HttpSession session) {
        List<Product> products = bookService.searchByTitle(title);
        session.setAttribute(Const.CURRENT_USER, products);
        return products;
    }

    @RequestMapping(value = "updateBook.do", method = RequestMethod.POST)
    @ResponseBody
    public int updateBook(Product book, boolean flag, HttpSession session) {
        int res = bookService.updateBook(book, flag);
        session.setAttribute(Const.CURRENT_USER, res);
        return res;
    }
}

