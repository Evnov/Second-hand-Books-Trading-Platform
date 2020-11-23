package com.bookmall.service;

import com.bookmall.pojo.Product;
import com.bookmall.pojo.Booklist;

import java.util.List;

public interface BooklistService {
    List<Product> getAllBooks(int userId);
}