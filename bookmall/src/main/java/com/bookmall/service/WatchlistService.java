package com.bookmall.service;

import com.bookmall.pojo.Product;

import java.util.List;

public interface WatchlistService {
    public int updateBook(int user_id, int book_id, boolean flag);
    public List<Product> getAllBooks(int userId);
}