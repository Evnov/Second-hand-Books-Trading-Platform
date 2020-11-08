package com.bookmall.dao;

import com.bookmall.pojo.Cart;

/**
 * @author ella
 * @version 1.0
 * @description: TODO
 * @date 11/5/20
 */
public interface CartMapper {
    int deleteByPrimaryKey(Integer id);

    int insert(Cart record);

    int insertSelective(Cart record);

    Cart selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(Cart record);

    int updateByPrimaryKey(Cart record);
}