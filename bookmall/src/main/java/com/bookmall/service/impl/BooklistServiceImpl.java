package com.bookmall.service.impl;

import com.bookmall.dao.ProductMapper;
import com.bookmall.pojo.Product;
import com.bookmall.dao.BooklistMapper;
import com.bookmall.pojo.Booklist;
import com.bookmall.service.BooklistService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import java.util.List;

@Service("booklistService")
@Component
public class BooklistServiceImpl implements BooklistService {
    // call dao mapper
    @Autowired
    private BooklistMapper BooklistMapper;

    @Override
    public List<Product> getAllBooks(int userId) {
        List<Product> products = BooklistMapper.selectByUserId(userId);
        return products;
    }


}
