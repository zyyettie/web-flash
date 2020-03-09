package cn.enilu.flash.dao.system;


import cn.enilu.flash.bean.entity.system.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

/**
 * Created  on 2018/3/21 0021.
 *
 * @author enilu
 */
public interface UserRepository extends JpaRepository<User,Long>,JpaSpecificationExecutor<User> {
    User findByAccount(String account);

    @Query(nativeQuery = true, value = "select email from t_sys_user where roleid=5 and status=1")
    List<String> getAllVendorEmail();

    @Query(nativeQuery = true, value = "select email from t_sys_user where id = (select create_by from t_biz_tender where id=?1)")
    String getEmailByTenderId(Long id);

    @Query(nativeQuery = true, value = "select email from t_sys_user where id = (select create_by from t_biz_bid where id=?1)")
    String getVendorEmailByBidId(Long id);

    @Query(nativeQuery = true, value = "select email from t_sys_user where id =(SELECT t_biz_tender.create_by FROM t_biz_bid, t_biz_tender where t_biz_bid.tender_id=t_biz_tender.id and t_biz_bid.id=?1)")
    String getTenderAdminEmailByBidId(Long id);
}
