package com.bookmall.dao;

import com.bookmall.pojo.Category;

/**
 * @author ella
 * @version 1.0
 * @description: TODO
 * @date 11/5/20
 */
public interface CategoryMapper {
    int deleteByPrimaryKey(Integer id);

    int insert(Category record);

    int insertSelective(Category record);

    Category selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(Category record);

    int updateByPrimaryKey(Category record);
}