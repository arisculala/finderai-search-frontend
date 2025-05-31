export const paths = {
  auth: {
    login: "/login",
    register: "/register",
  },
  home: {
    root: "/home",
  },
  users: {
    root: "/users",
    create: "/users/create",
  },
  tenants: {
    root: "/tenants",
    create: "/tenants/create",
    update: "/tenants/:tenantId/update",
    settings: "/tenants/:tenantId/settings",
    members: "/tenants/:tenantId/members",
  },
  bots: {
    root: "/bots",
    create: "/bots/create",
    update: "/bots/:botId/update",
    configuration: "/bots/:botId/configuration",
    versioning: "/bots/:botId/versioning",
    lifecycle: "/bots/:botId/lifecycle",
  },
  importExport: {
    root: "/imports-exports",
  },
  analytics: {
    root: "/analytics",
  },
};
