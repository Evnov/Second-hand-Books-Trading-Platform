package com.bookmall.service.impl;

import com.bookmall.common.ResponseCode;
import com.bookmall.common.ServerResponse;
import com.bookmall.dao.ProductMapper;
import com.bookmall.dao.UserMapper;
import com.bookmall.pojo.Product;
import com.bookmall.pojo.User;
import com.bookmall.service.IBookService;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * @author ella
 * @version 1.0
 * @description: TODO
 * @date 11/19/20
 */
@Service("iBookService")
@Component
public class BookServiceImpl implements IBookService {
    @Autowired
    private ProductMapper productMapper;

    public ServerResponse<List<Product>> getAllBooks(){
        List<Product> product = productMapper.getAllBooks();
        return ServerResponse.createBySuccess(product);
    }

    public ServerResponse addOrUpdateBook(Product product) {
        if(product != null)
        {
            if(StringUtils.isNotBlank(product.getBookImage())){
                String[] bookImageArray = product.getBookImage().split(",");
                if(bookImageArray.length > 0){
                    product.setBookImage(bookImageArray[0]);
                }
            }

            if(product.getId() != null){
                int rowCount = productMapper.updateByPrimaryKey(product);
                if(rowCount > 0){
                    return ServerResponse.createBySuccess("The book is updated!");
                }
                return ServerResponse.createBySuccess("Cannot update the book");
            }else{
                int rowCount = productMapper.insert(product);
                if(rowCount > 0){
                    return ServerResponse.createBySuccess("The book is added!");
                }
                return ServerResponse.createBySuccess("Cannot add the book!");
            }
        }

        return ServerResponse.createByErrorMessage("Cannot add or update the book!");
    }

    public ServerResponse<String> setSaleStatus(Integer productId, Integer status) {
        if(productId == null || status == null){
            return ServerResponse.createByErrorCodeMessage(ResponseCode.ILLEGAL_ARGUMENT.getCode(),ResponseCode.ILLEGAL_ARGUMENT.getDesc());
        }
        Product product = new Product();
        product.setId(productId);
        product.setStatus(status);
        int rowCount = productMapper.updateByPrimaryKeySelective(product);
        if(rowCount > 0){
            return ServerResponse.createBySuccess("Updated book sale status!");
        }
        return ServerResponse.createByErrorMessage("Cannot update book sale status!");
    }
}
