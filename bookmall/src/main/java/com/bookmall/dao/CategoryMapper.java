package com.bookmall.dao;

import com.bookmall.pojo.Category;
import org.springframework.stereotype.Component;

/**
 * @author ella
 * @version 1.0
 * @description: TODO
 * @date 11/5/20
 */
@Component
public interface CategoryMapper {
    int deleteByPrimaryKey(Integer id);

    int insert(Category record);

    int insertSelective(Category record);

    Category selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(Category record);

    int updateByPrimaryKey(Category record);
}