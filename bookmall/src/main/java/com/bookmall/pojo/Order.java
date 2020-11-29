package com.bookmall.pojo;

import java.util.Date;

public class Order {
    private Integer id;

    private Integer sellerId;

    private Integer buyerId;

    private Integer productId;

    private Date createTime;

    private Date finishTime;

    public Order(Integer id, Integer sellerId, Integer buyerId, Integer productId, Date createTime, Date finishTime) {
        this.id = id;
        this.sellerId = sellerId;
        this.buyerId = buyerId;
        this.productId = productId;
        this.createTime = createTime;
        this.finishTime = finishTime;
    }

    public Order() {
        super();
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getSellerId() {
        return sellerId;
    }

    public void setSellerId(Integer sellerId) {
        this.sellerId = sellerId;
    }

    public Integer getBuyerId() {
        return buyerId;
    }

    public void setBuyerId(Integer buyerId) {
        this.buyerId = buyerId;
    }

    public Integer getProductId() {
        return productId;
    }

    public void setProductId(Integer productId) {
        this.productId = productId;
    }

    public Date getCreateTime() {
        return createTime;
    }

    public void setCreateTime(Date createTime) {
        this.createTime = createTime;
    }

    public Date getFinishTime() {
        return finishTime;
    }

    public void setFinishTime(Date finishTime) {
        this.finishTime = finishTime;
    }
}
