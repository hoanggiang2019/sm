package com.sm.server;

import com.sm.server.core.service.RoleService;
import com.sm.server.core.service.UserService;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.context.ApplicationListener;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.stereotype.Component;

@Component
public class ApplicationStartupListener implements ApplicationListener<ContextRefreshedEvent>, InitializingBean {
    private final UserService userService;
    private final RoleService roleService;

    public ApplicationStartupListener(UserService userService, RoleService roleService) {
        this.userService = userService;
        this.roleService = roleService;
    }

    @Override
    public void afterPropertiesSet() throws Exception {

    }

    @Override
    public void onApplicationEvent(ContextRefreshedEvent event) {
//        Role role = roleService.getByName("ROLE_ADMIN");
//        if (role == null) {
//            role = new Role();
//            role.setName("ROLE_ADMIN");
//            roleService.save(role);
//        }
//
//        User user = (User) userService.loadUserByUsername("admin");
//        if (user != null) return;
//
//        user = new User();
//        user.setUsername("admin");
//        user.setPassword("admin");
//        List<Role> roles = user.getRoles();
//        roles.add(role);
//        userService.save(user);
    }
}
