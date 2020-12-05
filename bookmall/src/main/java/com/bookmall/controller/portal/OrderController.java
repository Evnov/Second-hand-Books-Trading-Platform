package com.bookmall.controller.portal;

import com.bookmall.common.Const;
import com.bookmall.pojo.Order;
import com.bookmall.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpSession;
import java.util.List;

@CrossOrigin()
@Controller
@RequestMapping("/order/")
public class OrderController {

    @Autowired
    private OrderService orderService;

    @RequestMapping(value = "setOrderStatus.do", method = RequestMethod.POST)
    @ResponseBody
    public int setOrderStatus(int order_id, int status, HttpSession session) {
        int res = orderService.setOrderStatus(order_id, status);
        session.setAttribute(Const.CURRENT_USER, res);
        return res;
    }

    @RequestMapping(value = "createOrder.do", method = RequestMethod.POST)
    @ResponseBody
    public int createOrder(Order order, HttpSession session) {
        int res = orderService.createOrder(order);
        session.setAttribute(Const.CURRENT_USER, res);
        return res;
    }

    @RequestMapping(value = "getOrderBySeller.do", method = RequestMethod.POST)
    @ResponseBody
    public List<Order> getOrderBySeller(Integer seller_id, HttpSession session) {
        List<Order> orders = orderService.getOrderBySeller(seller_id);
        session.setAttribute(Const.CURRENT_USER, orders);
        return orders;
    }

    @RequestMapping(value = "getOrderByBuyer.do", method = RequestMethod.POST)
    @ResponseBody
    public List<Order> getOrderByBuyer(Integer buyer_id, HttpSession session) {
        List<Order> orders = orderService.getOrderByBuyer(buyer_id);
        session.setAttribute(Const.CURRENT_USER, orders);
        return orders;
    }
}
