package com.bookmall.controller.portal;

import com.bookmall.common.Const;
import com.bookmall.common.ResponseCode;
import com.bookmall.common.ServerResponse;
import com.bookmall.pojo.Product;
import com.bookmall.pojo.User;
import com.bookmall.service.IBookService;
import com.bookmall.service.IFileService;
import com.google.common.collect.Maps;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.Map;
import java.util.UUID;

/**
 * @author ella
 * @version 1.0
 * @description: TODO
 * @date 11/19/20
 */
@CrossOrigin()
@Controller
@RequestMapping("/book/")
public class BookController {

    @Autowired
    private IBookService ibookService;

    @Autowired
    private IFileService iFileService;

    @RequestMapping(value = "get_allBooks.do")
    @ResponseBody
    public ServerResponse<List<Product>> get_allBooks(){
        //ServerResponse<List<Product>> productList = bookService.getAllBooks();
        return ibookService.getAllBooks();
    }

    @RequestMapping("upload_image.do")
    @ResponseBody
    public ServerResponse uploadImage(HttpSession session, @RequestParam(value = "upload_file",required = false) MultipartFile file, HttpServletRequest request) throws IOException {
        User user = (User)session.getAttribute(Const.CURRENT_USER);
        if(user == null){
            return ServerResponse.createByErrorCodeMessage(ResponseCode.NEED_LOGIN.getCode(),"User didn't login, please login first!");
        }
//        String path = request.getSession().getServletContext().getRealPath("/img/book-list/");
        String path = request.getSession().getServletContext().getRealPath("upload");
        String fileName = file.getOriginalFilename();// "1.png"
        fileName = UUID.randomUUID().toString().replace("-", "")
                + fileName.substring(fileName.lastIndexOf("."));// XXXX.png

        File targetFile = new File(path, fileName);// "C:///.../upload/XXX.png"
        if (!targetFile.exists())
        {
            targetFile.mkdirs();
        }
        //uploaded
        file.transferTo(targetFile);

        //String targetFileName = iFileService.upload(file,path);
        String targetFileName = targetFile.getName();
        String url = "/" + targetFileName;

        Map fileMap = Maps.newHashMap();
        fileMap.put("uri",targetFileName);
        fileMap.put("url",url);
        return ServerResponse.createBySuccess(fileMap);
    }

    @RequestMapping(value = "upload_book.do")
    @ResponseBody
    public ServerResponse upload_book(HttpSession session, Product product) {
        User user = (User)session.getAttribute(Const.CURRENT_USER);
        if(user == null){
            return ServerResponse.createByErrorCodeMessage(ResponseCode.NEED_LOGIN.getCode(),"User didn't login, please login first!");
        }
        return ibookService.addOrUpdateBook(product);

    }

    @RequestMapping(value = "set_sale_status.do")
    @ResponseBody
    public ServerResponse setSaleStatus(HttpSession session, Integer productId, Integer status) {
        User user = (User)session.getAttribute(Const.CURRENT_USER);
        if(user == null){
            return ServerResponse.createByErrorCodeMessage(ResponseCode.NEED_LOGIN.getCode(),"User didn't login, please login first!");
        }
        return ibookService.setSaleStatus(productId, status);

    }


}
