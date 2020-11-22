import com.bookmall.common.ServerResponse;
import com.bookmall.pojo.Product;
import com.bookmall.service.IBookService;
import com.bookmall.dao.ProductMapper;
import com.bookmall.service.IUserService;
import com.bookmall.service.impl.BookServiceImpl;
import com.bookmall.service.impl.BooklistServiceImpl;
import com.bookmall.service.impl.WatchlistServiceImpl;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;
import org.springframework.test.context.ContextConfiguration;
import org.junit.runner.RunWith;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import java.util.List;
import com.alibaba.fastjson.JSON;

import java.util.List;

/**
 * @author ella
 * @version 1.0
 * @description: TODO
 * @date 11/7/20
 */
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = {"classpath:/applicationContext.xml"})
public class MyTest {

    @Autowired

    @Before
    public void before(){
        System.out.println("before");
    }

    @Test
    public void test(){
        ApplicationContext context = new ClassPathXmlApplicationContext("applicationContext.xml");
        IUserService userServiceImpl = (IUserService) context.getBean("userServiceImpl");
        ServerResponse<String> test1 = userServiceImpl.checkValid("gee", "username");
        String q = test1.toString();
        //System.out.println(q);

        IBookService bookService = (IBookService) context.getBean("bookServiceImpl");
        ServerResponse<List<Product>> test2 = bookService.getAllBooks();
        System.out.println(test2);
    }
}
