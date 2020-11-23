package com.bookmall.service;

import com.bookmall.common.ServerResponse;
import com.bookmall.pojo.Product;
import com.bookmall.common.ServerResponse;

import java.util.List;

/**
 * @author ella
 * @version 1.0
 * @description: TODO
 * @date 11/19/20
 */
public interface IBookService {

    ServerResponse<List<Product>> getAllBooks();

    ServerResponse addOrUpdateBook(Product product);

    ServerResponse<String> setSaleStatus(Integer productId, Integer status);

    int updateBook(Product book, boolean flag);

    List<Product> searchByTitle(String title);

    List<Product> searchBySubtitle(String subtitle);

    List<Product> searchByDesc(String desc);

    List<Product> searchByPrice(double low, double high);

    List<Product> searchByStatus(Integer status);

    List<Product> searchByBookCondition(double book_condition);

    List<Product> searchByAttributes(String title, String subtitle, double low, double high, Integer status,
                              double book_condition);
}
