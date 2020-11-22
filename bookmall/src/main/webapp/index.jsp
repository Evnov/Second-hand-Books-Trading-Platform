<html>
<body>
<h2>Hello World!</h2>

springmvc upload
<form name="form1" action="/book/upload_book.do" method="post" enctype="multipart/form-data">
    <input type="file" name="upload_file" />
    <input type="submit" value="springmvc upload file" />
</form>
<form name="form1" action="${pageContext.request.contextPath}/booklist/getAllBooks.do" method="post" enctype="multipart/form-data">
    <input type="text" name="user_id" placeholder="input the user_id:" />
<%--    <input type="text" name="book_id" placeholder="input the book_id:" />--%>
<%--    <input type="radio" name="flag" value=true placeholder="select flag:" />--%>

    <input type="submit" value="search" />
</form>

</body>
</html>
