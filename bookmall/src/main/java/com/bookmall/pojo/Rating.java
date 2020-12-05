package com.bookmall.pojo;

import java.util.Date;

public class Rating {
    private Integer id;

    private Integer orderId;

    private Integer revieweeId;

    private Integer reviewerId;

    private Integer score;

    private String review;

    private Date createTime;

    public Rating(Integer id, Integer orderId, Integer revieweeId, Integer reviewerId, Integer score, String review, Date createTime) {
        this.id = id;
        this.orderId = orderId;
        this.revieweeId = revieweeId;
        this.reviewerId = reviewerId;
        this.score = score;
        this.review = review;
        this.createTime = createTime;
    }

    public Rating() {
        super();
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getOrderId() {
        return orderId;
    }

    public void setOrderId(Integer orderId) {
        this.orderId = orderId;
    }

    public Integer getRevieweeId() {
        return revieweeId;
    }

    public void setRevieweeId(Integer revieweeId) {
        this.revieweeId = revieweeId;
    }

    public Integer getReviewerId() {
        return reviewerId;
    }

    public void setReviewerId(Integer reviewerId) {
        this.reviewerId = reviewerId;
    }

    public Integer getScore() {
        return score;
    }

    public void setScore(Integer score) {
        this.score = score;
    }

    public String getReview() {
        return review;
    }

    public void setReview(String review) {
        this.review = review;
    }

    public Date getCreateTime() {
        return createTime;
    }

    public void setCreateTime(Date createTime) {
        this.createTime = createTime;
    }
}
