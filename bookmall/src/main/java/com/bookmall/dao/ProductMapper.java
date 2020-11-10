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

    Product selectByPrimaryKey(Integer id);

    List<Product> selectByTitle(String title);

    int updateByPrimaryKeySelective(Product record);

    int updateByPrimaryKey(Product record);

    List<Product> getAllBooks();
}
