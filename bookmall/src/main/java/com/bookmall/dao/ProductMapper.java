package com.bookmall.dao;

import com.bookmall.pojo.Product;
import org.springframework.stereotype.Component;

import java.util.List;

import java.util.List;

/**
 * @author ella
 * @version 1.0
 * @description: TODO
 * @date 11/5/20
 */

@Component
public interface ProductMapper {
    int deleteByPrimaryKey(Integer id);

    int insert(Product record);

    int insertSelective(Product record);

    int getLastId();

    Product selectByPrimaryKey(Integer id);

    List<Product> selectByTitle(String title);

    List<Product> selectBySubtitle(String subtitle);

    List<Product> selectByDesc(String desc);

    List<Product> selectByPrice(double low, double high);

    List<Product> selectByStatus(Integer status);

    List<Product> selectByBookCondition(String book_condition);

    List<Product> selectByAttributes(String title, String subtitle, double low, double high, Integer status,
                                     String book_condition);

    int updateByPrimaryKeySelective(Product record);

    int updateByPrimaryKey(Product record);

    int updateStock(int book_id, int stock);

    List<Product> getAllBooks();
}
