package com.bookmall.dao;

import com.bookmall.pojo.User;
import org.apache.ibatis.annotations.Param;

/**
 * @author ella
 * @version 1.0
 * @description: TODO
 * @date 11/5/20
 */
public interface UserMapper {
    int deleteByPrimaryKey(Integer id);

    int insert(User record);

    int insertSelective(User record);

    User selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(User record);

    int updateByPrimaryKey(User record);

    int checkUsername(String username);

    User selectLogin(@Param("username")String username, @Param("password")String password);
}