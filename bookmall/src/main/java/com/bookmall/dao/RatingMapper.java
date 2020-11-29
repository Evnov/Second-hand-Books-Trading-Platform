package com.bookmall.dao;

import com.bookmall.pojo.Rating;
import org.springframework.stereotype.Component;

@Component
public interface RatingMapper {
    int deleteByPrimaryKey(Integer id);

    int insert(Rating record);

    Rating selectByPrimaryKey(Integer id);

    int updateByPrimaryKey(Rating record);
}
