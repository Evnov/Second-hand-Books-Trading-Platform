package com.bookmall.dao;

import com.bookmall.pojo.Watchlist;
import com.bookmall.pojo.Product;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public interface WatchlistMapper {
    int deleteByPrimaryKey(Integer id);

    int deleteByUserBook(int user_id, int book_id);

    int insert(Watchlist record);

    int insertWithoutPrimary(int user_id, int book_id);

    Watchlist selectByPrimaryKey(Integer id);

    int updateByPrimaryKey(Watchlist record);

    List<Product> selectByUserId(Integer userId);
}
