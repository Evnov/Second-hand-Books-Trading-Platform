import com.bookmall.common.ServerResponse;
import com.bookmall.pojo.Product;
import com.bookmall.service.IBookService;
import com.bookmall.service.IUserService;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

import java.util.List;

/**
 * @author ella
 * @version 1.0
 * @description: TODO
 * @date 11/7/20
 */
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

    @After
    public void after() {
        System.out.println("after");
    }

}
