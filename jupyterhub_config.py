
# The JupyterLab user interface
c.Spawner.default_url = '/lab'

# Jupyterhub Log level
c.JupyterHub.log_level = 'DEBUG'

# LDAP configurations
c.JupyterHub.authenticator_class = 'ldapauthenticator.LDAPAuthenticator'
c.LDAPAuthenticator.use_ssl = False
c.LDAPAuthenticator.server_address = '103.127.28.120'
c.LDAPAuthenticator.bind_dn_template = 'uid={username},cn=users,cn=accounts,dc=pdcloudex,dc=com'

# Admin Uesrs
c.Authenticator.admin_users = {'pduserajay', 'pduserrk'}

# Whitelisted users
c.Authenticator.whitelist = {'pduserajay',
                             'pduserrk', 'pduseranand', 'pduserabhi'}

# Spawner profiles
c.KubeSpawner.profile_list = [
    {
        'display_name': 'Minimal Notebook (CentOS 7 / Python 3.5)',
        'kubespawner_override': {
            'image_spec': 's2i-minimal-notebook:3.5',
            'supplemental_gids': [100]
        }
    },
    {
        'display_name': 'Minimal Notebook (CentOS 7 / Python 3.6)',
        'default': True,
        'kubespawner_override': {
            'image_spec': 's2i-minimal-notebook:3.6',
            'supplemental_gids': [100]
        }
    },
    {
        'display_name': 'Jupyter - Scipy Notebook',
        'kubespawner_override': {
            'image_spec': 's2i-scipy-notebook:3.6',
            'supplemental_gids': [100]
        }
    },
    {
        'display_name': 'Jupyter - Tensorflow Notebook',
        'kubespawner_override': {
            'image_spec': 's2i-tensorflow-notebook:3.6',
            'supplemental_gids': [100]
        },
    }
]
c.KubeSpawner.supplemental_gids = [100]
