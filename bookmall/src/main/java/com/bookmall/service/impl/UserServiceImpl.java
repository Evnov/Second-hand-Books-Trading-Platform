package com.bookmall.service.impl;

import com.bookmall.common.Const;
import com.bookmall.common.ServerResponse;
import com.bookmall.common.TokenCache;
import com.bookmall.dao.UserMapper;
import com.bookmall.pojo.User;
import com.bookmall.service.IUserService;
import com.bookmall.util.MD5Util;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import java.util.UUID;

/**
 * @author ella
 * @version 1.0
 * @description: TODO
 * @date 11/6/20
 */
@Service("iUserService")
@Component
public class UserServiceImpl implements IUserService {

    // Service层调dao层
    @Autowired
    private UserMapper userMapper;

    @Override
    public ServerResponse<User> login(String username, String password) {
        int resultCount = userMapper.checkUsername(username);
        if (resultCount == 0){
            return ServerResponse.createByErrorMessage("User doesn't exist!");
        }

        //todo MD5
        //String md5Password = MD5Util.MD5EncodeUtf8(password);
        User user = userMapper.selectLogin(username, password);
        if (user == null){
            return ServerResponse.createByErrorMessage("Wrong Password!");
        }
        user.setPassword(StringUtils.EMPTY);
        return ServerResponse.createBySuccess("Login successfully", user);
    }

    public ServerResponse<String> checkValid(String str, String type) {
        if(org.apache.commons.lang3.StringUtils.isNoneBlank(type)){
            //开始校验
            if(Const.USERNAME.equals((type))){
                int resultCount = userMapper.checkUsername(str);
                if (resultCount > 0){
                    return ServerResponse.createByErrorMessage("User already exist!");
                }
            }
            if(Const.EMAIL.equals((type))){
                int resultCount = userMapper.checkUserEmail(str);
                if (resultCount > 0){
                    return ServerResponse.createByErrorMessage("Email already exist!");
                }
            }
        }else{
            return ServerResponse.createByErrorMessage("Wrong Params");
        }
        return ServerResponse.createBySuccessMessage("Checked!");
    }

    public ServerResponse<String> register(User user){
        ServerResponse validResponse = this.checkValid(user.getUsername(), Const.USERNAME);
        if(!validResponse.isSuccess()){
            return validResponse;
        }
        validResponse = this.checkValid((user.getEmail()), Const.EMAIL);
        if(!validResponse.isSuccess()){
            return validResponse;
        }
        user.setRole(Const.Role.ROLE_CUSTOMER);

        //MD5加密
        //user.setPassword(MD5Util.MD5EncodeUtf8(user.getPassword()));
        user.setPassword(user.getPassword());
        int resultCount = userMapper.insert(user);
        if(resultCount == 0) {
            return ServerResponse.createByErrorMessage("Register fail!");
        }
        return ServerResponse.createBySuccessMessage("Register succeed!");
    }

    public ServerResponse selectQuestion(String username){
        ServerResponse validResponse = this.checkValid(username, Const.USERNAME);
        if(validResponse.isSuccess()){
            //用户不存在
            return ServerResponse.createByErrorMessage("User did not exist!");
        }
        String question = userMapper.selectQuestionByUsername(username);
        if(org.apache.commons.lang3.StringUtils.isNotBlank(question)){
            return ServerResponse.createBySuccess(question);
        }
        return ServerResponse.createByErrorMessage("The question is empty!");
    }

    public ServerResponse<String> checkAnswer(String username,String question,String answer){
        int resultCount = userMapper.checkAnswer(username,question,answer);
        if(resultCount>0){
            //说明问题及问题答案是这个用户的,并且是正确的
            String forgetToken = UUID.randomUUID().toString();
            TokenCache.setKey(TokenCache.TOKEN_PREFIX+username, forgetToken);
            return ServerResponse.createBySuccess(forgetToken);
        }
        return ServerResponse.createByErrorMessage("The answer is wrong!");
    }

    public ServerResponse<String> forgetResetPassword(String username, String passwordNew, String forgetToken){
//        if(org.apache.commons.lang3.StringUtils.isNotBlank(forgetToken)){
//            return ServerResponse.createByErrorMessage("Wrong token, need correct token!");
//        }
        ServerResponse validResponse = this.checkValid(username,Const.USERNAME);
        if(validResponse.isSuccess()){
            //用户不存在
            return ServerResponse.createByErrorMessage("User did not exist!");
        }
        String token = TokenCache.getKey(TokenCache.TOKEN_PREFIX+username);
        if(org.apache.commons.lang3.StringUtils.isBlank(token)){
            return ServerResponse.createByErrorMessage("Invalid token");
        }

        if(org.apache.commons.lang3.StringUtils.equals(forgetToken,token)){
            //String md5Password  = MD5Util.MD5EncodeUtf8(passwordNew);
            int rowCount = userMapper.updatePasswordByUsername(username,passwordNew);

            if(rowCount > 0){
                return ServerResponse.createBySuccessMessage("Password changed successfully!");
            }
        }else{
            return ServerResponse.createByErrorMessage(" Wrong token,please get the reset token again!");
        }
        return ServerResponse.createByErrorMessage("Password changed failed!");
    }

    public ServerResponse<String> resetPassword(String passwordOld,String passwordNew,User user){
        //int resultCount = userMapper.checkPassword(MD5Util.MD5EncodeUtf8(passwordOld),user.getId());
        int resultCount = userMapper.checkPassword(passwordOld,user.getId());
        if(resultCount == 0){
            return ServerResponse.createByErrorMessage("Wrong old password!");
        }

        //user.setPassword(MD5Util.MD5EncodeUtf8(passwordNew));
        user.setPassword(passwordNew);
        int updateCount = userMapper.updateByPrimaryKeySelective(user);
        if(updateCount > 0){
            return ServerResponse.createBySuccessMessage("Password changed successfully!");
        }
        return ServerResponse.createByErrorMessage("Password changed failed!");
    }

    public ServerResponse<User> updateInformation(User user){
        //username是不能被更新的
        //email也要进行一个校验,校验新的email是不是已经存在,并且存在的email如果相同的话,不能是当前的这个用户的.
        int resultCount = userMapper.checkEmailByUserId(user.getEmail(),user.getId());
        if(resultCount > 0){
            return ServerResponse.createByErrorMessage("Email already exist!");
        }
        User updateUser = new User();
        updateUser.setId(user.getId());
        updateUser.setEmail(user.getEmail());
        updateUser.setPhone(user.getPhone());
        updateUser.setQuestion(user.getQuestion());
        updateUser.setAnswer(user.getAnswer());

        int updateCount = userMapper.updateByPrimaryKeySelective(updateUser);
        if(updateCount > 0){
            return ServerResponse.createBySuccess("Update information successfully!",updateUser);
        }
        return ServerResponse.createByErrorMessage("Update information failed!");
    }

    public ServerResponse<User> getInformation(Integer userId){
        User user = userMapper.selectByPrimaryKey(userId);
        if(user == null){
            return ServerResponse.createByErrorMessage("Can't find user!");
        }
        user.setPassword(org.apache.commons.lang3.StringUtils.EMPTY);
        return ServerResponse.createBySuccess(user);

    }

    public ServerResponse<User> getWatchList(Integer userId){
        User user = userMapper.selectByPrimaryKey(userId);
        if(user == null){
            return ServerResponse.createByErrorMessage("Can't find user!");
        }

    }
}
