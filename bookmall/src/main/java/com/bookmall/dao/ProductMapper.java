package com.bookmall.dao;

import com.bookmall.pojo.Product;

/**
 * @author ella
 * @version 1.0
 * @description: TODO
 * @date 11/5/20
 */
public interface ProductMapper {
    int deleteByPrimaryKey(Integer id);

    int insert(Product record);

    int insertSelective(Product record);

    Product selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(Product record);

    int updateByPrimaryKey(Product record);
}