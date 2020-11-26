<html>
<body>
<h2>Hello World!</h2>

springmvc upload
<form name="form1" action="/book/upload_book.do" method="post" enctype="multipart/form-data">
    <input type="file" name="upload_file" />
    <input type="submit" value="springmvc upload file" />
</form>
<form name="form1" action="${pageContext.request.contextPath}/product/updateBook.do" method="post" enctype="multipart/form-data">
<%--    <input type="text" name="user_id" placeholder="input the user_id:" />--%>
<%--    <input type="text" name="book_id" placeholder="input the book_id:" />--%>
<%--    <input type="radio" name="flag" value=true placeholder="select flag:" />--%>
<%--    <input type="text" name="id" placeholder="input the id:" />--%>
    <input type="text" name="categoryId" placeholder="input the categoryId" />
    <input type="text" name="title" placeholder="input the title" />
    <input type="text" name="price" placeholder="input the price" />
    <input type="text" name="stock" placeholder="input the stock" />
    <input type="text" name="book_condition" placeholder="input the book_condition" />
<%--    <input type="text" name="book" placeholder="input the title" />--%>
<%--    <input type="text" name="book" placeholder="input the subtitle" />--%>
<%--    <input type="radio" name="flag" value=true placeholder="select flag:" />--%>
<%--    <input type="text" name="low" placeholder="input the low" />--%>
<%--    <input type="text" name="high" placeholder="input the high" />--%>
<%--    <input type="text" name="status" placeholder="input the status" />--%>
    <input type="submit" value="search" />
</form>

</body>
</html>
