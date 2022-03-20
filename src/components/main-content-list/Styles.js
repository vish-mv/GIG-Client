const Styles = theme => ({
      appBar: {
        backgroundColor: '#282c34',
        padding: theme.spacing(1),
      },
      headerColumn: {
        paddingTop: theme.spacing(0.5)
      },
      loaderColumn: {
        paddingTop: theme.spacing(1.5)
      },
      container: {
        backgroundColor: '#eeeeee',
        padding: theme.spacing(2),
        flexGrow: 1,
        display: 'flex',
        justifyContent: 'center',
        width: '100%',
        minHeight: '100vh'
      },
      footer: {
        backgroundColor: '#eeeeee',
        paddingTop: theme.spacing(1),
        paddingBottom: theme.spacing(2),
      },
      paper: {
        margin: theme.spacing(2),
        padding: 0,
        textAlign: 'left',
        color: theme.palette.text.primary,
        boxShadow: '0px 3px 6px #00000029',
        borderRadius: 16,
      },
      profilePaper: {
        margin: theme.spacing(2),
        padding: theme.spacing(2),
        textAlign: 'left',
        color: theme.palette.text.primary,
        boxShadow: '0px 3px 6px #00000029',
        borderRadius: 16,
        minHeight: '100vh',
      },
      headerText: {
        color: '#000000DE',
        marginLeft: theme.spacing(2),
        fontSize: '18px',
      },
      trendingContainer: {
        margin: 10,
        padding: theme.spacing(2),
        textAlign: 'left',
        color: theme.palette.text.primary,
        backgroundColor: '#ddd'
      },
      trendingListContainer: {
        width: '100%',
      },
      listContainer: {
        width: '100%',
      },
      inline: {
        display: 'inline',
      },
      link: {
        paddingRight: theme.spacing(0.5),
        textDecoration: 'none',
      },
      collapsible: {
        maxHeight: "300px",
        overflow: "hidden",
      },
      itemLink: {
        display: 'inline',
        textDecoration: 'none',
      },
      search: {
        position: 'relative',
        borderRadius: '20px',
        backgroundColor: theme.palette.common.white,
        '&:hover': {
          backgroundColor: theme.palette.common.white,
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
          marginLeft: theme.spacing(2),
          width: 'auto',
        },
      },
      searchIcon: {
        width: theme.spacing(9),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      },
      bigAvatar: {
        margin: 10,
        width: 100,
        height: 100,
      },
      searchAvatar: {
        height: 210,
        width: '100%',
        float: 'right',
        objectFit: 'contain',
        borderRadius: 16,
      },
      searchAvatarVertical: {
        height: 140,
        width: '100%',
        float: 'center',
        objectFit: 'cover',
        borderRadius: 16,
      },
      profileAvatar: {
        height: 180,
        width: '100%',
        float: 'right',
        objectFit: 'cover',
        borderRadius: 16,
      },
      mainContentItemTitle: {
        fontSize: 18,
        color: '#000000DE',
        marginBottom: theme.spacing(1),
      },
      trendingItemTitle: {
        fontSize: 16,
        color: '#000000DE',
      },
      leftContentColumn: {
        width: '100%',
        textAlign: 'left',
        position: 'fixed',
        top: '70px',
        left: '0',
        bottom: '0',
        overflow: 'auto'
      },
      rightContentColumn: {
        width: '100%',
        textAlign: 'left',
        position: 'fixed',
        top: '70px',
        right: '0',
        bottom: '0',
        overflow: 'auto'
      },
      mainContentColumn: {
        textAlign: 'left',
      },
    }
  )
;

export default Styles;
