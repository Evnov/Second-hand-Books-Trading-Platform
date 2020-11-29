package com.bookmall.dao;

import com.bookmall.pojo.Order;
import com.bookmall.pojo.Product;
import com.bookmall.pojo.User;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public interface OrderMapper {
    int deleteByPrimaryKey(Integer id);

    int insert(Order record);

    Order selectByPrimaryKey(Integer id);

    int updateByPrimaryKey(Order record);
}
