package com.bookmall.service;

import com.bookmall.common.ServerResponse;
import com.bookmall.pojo.Product;

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

    String searchByTitle(String title);

    String selectBySubtitle(String subtitle);

    String selectByDesc(String desc);

    String selectByPrice(double low, double high);

    String selectByStatus(Integer status);

    String selectByBookCondition(double book_condition);

    String selectByAttributes(String title, String subtitle, double low, double high, Integer status,
                              double book_condition);
}
