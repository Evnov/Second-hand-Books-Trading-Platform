package com.bookmall.dao;

import com.bookmall.pojo.Rating;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public interface RatingMapper {
    int deleteByPrimaryKey(Integer id);

    int insert(Rating record);

    int insertSelective(Rating record);

    Rating selectByPrimaryKey(Integer id);

    int updateByPrimaryKey(Rating record);

    List<Rating> selectByRevieweeId(int reviewee_id);
}
