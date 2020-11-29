package com.bookmall.controller.portal;

import com.bookmall.common.Const;
import com.bookmall.common.ResponseCode;
import com.bookmall.common.ServerResponse;
import com.bookmall.pojo.Product;
import com.bookmall.service.IUserService;
import com.bookmall.service.IBookService;
import com.alibaba.fastjson.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import javax.servlet.http.HttpSession;

@CrossOrigin()
@Controller
@RequestMapping("/product/")
public class ProductController {

    @Autowired
    private IBookService ibookService;

    @RequestMapping(value = "searchByTitle.do", method = RequestMethod.POST)
    @ResponseBody
    public List<Product> searchByTitle(String title, HttpSession session) {
        List<Product> products = ibookService.searchByTitle(title);
        session.setAttribute(Const.CURRENT_USER, products);
        return products;
    }

    @RequestMapping(value = "searchBySubtitle.do", method = RequestMethod.POST)
    @ResponseBody
    public List<Product> searchBySubtitle(String subtitle, HttpSession session) {
        List<Product> products = ibookService.searchBySubtitle(subtitle);
        session.setAttribute(Const.CURRENT_USER, products);
        return products;
    }

    @RequestMapping(value = "searchByDesc.do", method = RequestMethod.POST)
    @ResponseBody
    public List<Product> searchByDesc(String desc, HttpSession session) {
        List<Product> products = ibookService.searchByDesc(desc);
        session.setAttribute(Const.CURRENT_USER, products);
        return products;
    }

    @RequestMapping(value = "searchByPrice.do", method = RequestMethod.POST)
    @ResponseBody
    public List<Product> searchByPrice(double low, double high, HttpSession session) {
        List<Product> products = ibookService.searchByPrice(low, high);
        session.setAttribute(Const.CURRENT_USER, products);
        return products;
    }

    @RequestMapping(value = "searchByStatus.do", method = RequestMethod.POST)
    @ResponseBody
    public List<Product> searchByStatus(Integer status, HttpSession session) {
        List<Product> products = ibookService.searchByStatus(status);
        session.setAttribute(Const.CURRENT_USER, products);
        return products;
    }

    @RequestMapping(value = "searchByBookCondition.do", method = RequestMethod.POST)
    @ResponseBody
    public List<Product> searchByBookCondition(String book_condition, HttpSession session) {
        List<Product> products = ibookService.searchByBookCondition(book_condition);
        session.setAttribute(Const.CURRENT_USER, products);
        return products;
    }

    @RequestMapping(value = "searchByAttributes.do", method = RequestMethod.POST)
    @ResponseBody
    public List<Product> searchByAttributes(String title, String subtitle, double low, double high, Integer status,
                                            String book_condition, HttpSession session) {
        List<Product> products = ibookService.searchByAttributes(title, subtitle, low, high, status, book_condition);
        session.setAttribute(Const.CURRENT_USER, products);
        return products;
    }

    @RequestMapping(value = "getBookById.do", method = RequestMethod.POST)
    @ResponseBody
    public Product getBookById(int book_id, HttpSession session) {
        Product product = ibookService.getBookById(book_id);
        session.setAttribute(Const.CURRENT_USER, product);
        return product;
    }

    @RequestMapping(value = "updateBook.do", method = RequestMethod.POST)
    @ResponseBody
    public int updateBook(Product book, int user_id, HttpSession session) {
        // post a new book
        int res;
        if (book.getId() == null) {
            res = ibookService.insertSelective(user_id, book);
        }
        // update a existing book
        else {
            res = ibookService.updateBook(book);
        }
        session.setAttribute(Const.CURRENT_USER, res);

        return res;
    }
}

