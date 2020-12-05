package com.bookmall.service.impl;

import com.bookmall.dao.RatingMapper;
import com.bookmall.pojo.Rating;
import com.bookmall.service.RatingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import java.util.List;

@Service("ratingService")
@Component
public class RatingServiceImpl implements RatingService {
    // call dao mapper
    @Autowired
    private RatingMapper ratingMapper;

    @Override
    public int addRating(Rating rating) {
        return ratingMapper.insertSelective(rating);
    }

    @Override
    public List<Rating> getReview(int reviewee_id) {
        return ratingMapper.selectByRevieweeId(reviewee_id);
    }

}
