package com.bookmall.pojo;

import java.math.BigDecimal;
import java.util.Date;

/**
 * @author ella
 * @version 1.0
 * @description: TODO
 * @date 11/5/20
 */
public class Product {
    private Integer id;

    private Integer categoryId;

    private String title;

    private String subtitle;

    private String bookImage;

    private String descr;

    private BigDecimal price;

    private Integer stock;

    private Integer status;

    private Date createTime;

    private Date updateTime;

    public Product(Integer id, Integer categoryId, String title, String subtitle, String bookImage, String descr, BigDecimal price, Integer stock, Integer status, Date createTime, Date updateTime) {
        this.id = id;
        this.categoryId = categoryId;
        this.title = title;
        this.subtitle = subtitle;
        this.bookImage = bookImage;
        this.descr = descr;
        this.price = price;
        this.stock = stock;
        this.status = status;
        this.createTime = createTime;
        this.updateTime = updateTime;
    }

    public Product() {
        super();
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getCategoryId() {
        return categoryId;
    }

    public void setCategoryId(Integer categoryId) {
        this.categoryId = categoryId;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title == null ? null : title.trim();
    }

    public String getSubtitle() {
        return subtitle;
    }

    public void setSubtitle(String subtitle) {
        this.subtitle = subtitle == null ? null : subtitle.trim();
    }

    public String getBookImage() {
        return bookImage;
    }

    public void setBookImage(String bookImage) {
        this.bookImage = bookImage == null ? null : bookImage.trim();
    }

    public String getDescr() {
        return descr;
    }

    public void setDescr(String descr) {
        this.descr = descr == null ? null : descr.trim();
    }

    public BigDecimal getPrice() {
        return price;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }

    public Integer getStock() {
        return stock;
    }

    public void setStock(Integer stock) {
        this.stock = stock;
    }

    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }

    public Date getCreateTime() {
        return createTime;
    }

    public void setCreateTime(Date createTime) {
        this.createTime = createTime;
    }

    public Date getUpdateTime() {
        return updateTime;
    }

    public void setUpdateTime(Date updateTime) {
        this.updateTime = updateTime;
    }

    public void print() {
        System.out.println("ID: " + this.id);
        System.out.println("categoryId: " + this.categoryId);
        System.out.println("title: " + this.title);
        System.out.println("subtitle: " + this.subtitle);
        System.out.println("bookImage: " + this.bookImage);
        System.out.println("descr: " + this.descr);
        System.out.println("price: " + this.price);
        System.out.println("stock: " + this.stock);
        System.out.println("status: " + this.status);
        System.out.println("createTime: " + this.createTime);
        System.out.println("updateTime: " + this.updateTime);
        System.out.print("\n");
    }
}