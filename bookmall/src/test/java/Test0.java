import com.bookmall.dao.UserMapper;
import com.bookmall.pojo.User;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = {"classpath:applicationContext.xml"})
public class Test0
{
    @Autowired	//检索applicationContext.xml，自动注入指定的bean
    UserMapper userMapper;

    @Test
    public void testGetUser() {

        String userInfo = userMapper.selectQuestionByUsername("gee");
        System.out.println(userInfo);
    }

}