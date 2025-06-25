export const paths = {
  auth: {
    login: '/login',
    register: '/register',
  },
  home: {
    root: '/home',
  },
  profile: {
    root: '/profile',
  },
  users: {
    root: '/users',
    create: '/users/create',
  },
  tenants: {
    root: '/tenants',
    create: '/tenants/create',
    update: '/tenants/:tenantId/update',
    settings: '/tenants/:tenantId/settings',
    members: '/tenants/:tenantId/members',
  },
  importExport: {
    root: '/imports-exports',
  },
  analytics: {
    root: '/analytics',
  },
};
