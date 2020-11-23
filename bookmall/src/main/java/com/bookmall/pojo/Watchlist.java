package com.bookmall.pojo;

public class Watchlist {
    private Integer id;

    private Integer userId;

    private Integer bookId;

    public Watchlist(Integer id, Integer userId, Integer bookId) {
        this.id = id;
        this.userId = userId;
        this.bookId = bookId;
    }

    public Watchlist() {
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
