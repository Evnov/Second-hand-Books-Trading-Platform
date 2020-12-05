package com.bookmall.service.impl;

import com.bookmall.dao.OrderMapper;
import com.bookmall.pojo.Order;
import com.bookmall.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import java.util.List;

@Service("orderService")
@Component
public class OrderServiceImpl implements OrderService {
    // call dao mapper
    @Autowired
    private OrderMapper orderMapper;

    @Override
    public int createOrder(Order order) {
        return orderMapper.insertSelective(order);
    }

    @Override
    public int setOrderStatus(int order_id, int status) {
        return orderMapper.updateStatus(order_id, status);
    }

}
