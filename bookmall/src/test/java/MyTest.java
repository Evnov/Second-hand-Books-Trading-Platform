import com.bookmall.common.ServerResponse;
import com.bookmall.service.IUserService;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

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
        System.out.println(q);

    }

    @After
    public void after() {
        System.out.println("after");
    }

}
