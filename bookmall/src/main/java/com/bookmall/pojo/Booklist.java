package com.bookmall.pojo;

import java.math.BigDecimal;
import java.util.Date;

public class Booklist {
    private Integer id;

    private Integer userId;

    private Integer bookId;

    public Booklist(Integer id, Integer userId, Integer bookId) {
        this.id = id;
        this.userId = userId;
        this.bookId = bookId;
    }

    public Booklist() {
        super();
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public Integer getBookId() {
        return bookId;
    }

    public void setBookId(Integer bookId) {
        this.bookId = bookId;
    }
}
