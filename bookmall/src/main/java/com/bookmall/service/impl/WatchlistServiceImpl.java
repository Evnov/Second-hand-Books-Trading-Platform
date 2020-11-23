package com.bookmall.service.impl;

import com.bookmall.dao.WatchlistMapper;
import com.bookmall.pojo.Product;
import com.bookmall.service.WatchlistService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import java.util.List;

@Service("watchlistService")
@Component
public class WatchlistServiceImpl implements WatchlistService {
    // call dao mapper
    @Autowired
    private WatchlistMapper WatchlistMapper;

    @Override
    public int updateBook(int user_id, int book_id, boolean flag) {
        // add
        if (flag == true) {
            return WatchlistMapper.insertWithoutPrimary(user_id, book_id);
        }
        // remove
        else {
            return WatchlistMapper.deleteByUserBook(user_id, book_id);
        }
    }

    @Override
    public List<Product> getAllBooks(int userId) {
        List<Product> products = WatchlistMapper.selectByUserId(userId);
        return products;
    }
}
