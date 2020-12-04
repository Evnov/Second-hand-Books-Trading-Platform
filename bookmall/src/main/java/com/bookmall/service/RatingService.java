package com.bookmall.service;

import com.bookmall.pojo.Rating;

import java.util.List;

public interface RatingService {
    int addRating(Rating rating);

    List<Rating> getReview(int reviewee_id);
}