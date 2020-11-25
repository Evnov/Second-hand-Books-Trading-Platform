package com.bookmall.dao;

import com.bookmall.pojo.Booklist;
import com.bookmall.pojo.Product;
import com.bookmall.pojo.User;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public interface BooklistMapper {
    int deleteByPrimaryKey(Integer id);

    int insert(Booklist record);

    Booklist selectByPrimaryKey(Integer id);

    int updateByPrimaryKey(Booklist record);

    List<Product> selectByUserId(Integer userId);

    List<User> selectByBookId(Integer bookId);

}
