package com.bookmall.service.impl;

import com.bookmall.dao.OrderMapper;
import com.bookmall.dao.ProductMapper;
import com.bookmall.pojo.Order;
import com.bookmall.pojo.Product;
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

    @Autowired
    private ProductMapper productMapper;

    @Override
    public int createOrder(Order order) {
        Product book = productMapper.selectByPrimaryKey(order.getProductId());
//        if (order.getStatus() == 2) book.setStock(book.getStock() + 1);
//        else
        int stock = book.getStock();
        if (stock > 0) book.setStock(stock - 1);
        if (productMapper.updateByPrimaryKey(book) == 0) return 0;
//        if (book.getStock() <= 0) productMapper.deleteByPrimaryKey(book.getId());
        return orderMapper.insertSelective(order);
    }

    @Override
    public int setOrderStatus(int order_id, int status) {
        Order order = orderMapper.selectByPrimaryKey(order_id);
        int old_status = order.getStatus();
        Product book = productMapper.selectByPrimaryKey(order.getProductId());
        if (old_status != 2 && status == 2) {
            book.setStock(book.getStock() + 1);
            productMapper.updateByPrimaryKey(book);
        }
        if (old_status == 2 && status != 2) {
            book.setStock(book.getStock() - 1);
            productMapper.updateByPrimaryKey(book);
        }
//        if (book.getStock() <= 0) productMapper.deleteByPrimaryKey(book.getId());

        return orderMapper.updateStatus(order_id, status);
    }

    @Override
    public List<Order> getOrderBySeller(Integer seller_id) {
        return orderMapper.selectBySeller(seller_id);
    }

    @Override
    public List<Order> getOrderByBuyer(Integer buyer_id) {
        return orderMapper.selectByBuyer(buyer_id);
    }

}
