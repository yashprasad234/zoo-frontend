export const userMenu: Map<string, string> = new Map();
userMenu.set("Home", "/user/");
userMenu.set("About", "/user/about");
userMenu.set("Dashboard", "/user/dashboard");

export const adminMenu: Map<string, string> = new Map();
adminMenu.set("Home", "/admin/");
adminMenu.set("About", "/admin/about");
adminMenu.set("Dashboard", "/admin/dashboard");
adminMenu.set("Users", "/admin/users");

export const superAdminMenu: Map<string, string> = new Map();
superAdminMenu.set("Home", "/superadmin/");
superAdminMenu.set("About", "/superadmin/about");
superAdminMenu.set("Dashboard", "/superadmin/dashboard");
superAdminMenu.set("Users", "/superadmin/dashboard");
superAdminMenu.set("Admins", "/superadmin/dashboard");
