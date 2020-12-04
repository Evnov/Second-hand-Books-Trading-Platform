package com.bookmall.controller.portal;

import com.bookmall.common.Const;
import com.bookmall.pojo.Rating;
import com.bookmall.service.RatingService;
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
@RequestMapping("/rating/")
public class RatingController {

    @Autowired
    private RatingService ratingService;

    @RequestMapping(value = "addRating.do", method = RequestMethod.POST)
    @ResponseBody
    public int addRating(Rating rating, HttpSession session) {
        int res = ratingService.addRating(rating);
        session.setAttribute(Const.CURRENT_USER, res);
        return res;
    }

    @RequestMapping(value = "getReview.do", method = RequestMethod.POST)
    @ResponseBody
    public List<Rating> getReview(int reviewee_id, HttpSession session) {
        List<Rating> reviews = ratingService.getReview(reviewee_id);
        session.setAttribute(Const.CURRENT_USER, reviews);
        return reviews;
    }
}
