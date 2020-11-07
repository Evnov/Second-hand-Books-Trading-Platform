package com.bookmall.service;

import com.bookmall.common.ServerResponse;
import com.bookmall.pojo.User;

/**
 * @author ella
 * @version 1.0
 * @description: TODO
 * @date 11/6/20
 */
public interface IUserService {

    ServerResponse<User> login(String username, String password);
}
