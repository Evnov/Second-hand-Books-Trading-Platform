package com.bookmall.service;

import com.bookmall.pojo.Order;

import java.util.List;

public interface OrderService {
    int createOrder(Order order);

    int setOrderStatus(int order_id, int status);

    List<Order> getOrderBySeller(Integer seller_id);

    List<Order> getOrderByBuyer(Integer buyer_id);
}