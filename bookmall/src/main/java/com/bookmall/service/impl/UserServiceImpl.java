package com.bookmall.service.impl;

import com.bookmall.common.ServerResponse;
import com.bookmall.dao.UserMapper;
import com.bookmall.pojo.User;
import com.bookmall.service.IUserService;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * @author ella
 * @version 1.0
 * @description: TODO
 * @date 11/6/20
 */
@Service("iUserService")
public class UserServiceImpl implements IUserService {

    @Autowired
    private UserMapper userMapper;

    @Override
    public ServerResponse<User> login(String username, String password) {
        int resultCount = userMapper.checkUsername(username);
        if (resultCount == 0){
            return ServerResponse.createByErrorMessage("User doesn't exist!");
        }

        //todo MD5

        User user = userMapper.selectLogin(username, password);
        if (user == null){
            return ServerResponse.createByErrorMessage("Wrong Password!");
        }
        user.setPassword(StringUtils.EMPTY);
        return ServerResponse.createBySuccess("Login successfully", user);
    }
}
