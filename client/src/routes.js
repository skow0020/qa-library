import AddArticle from 'views/AddArticle/AddArticle';
import AddBook from 'views/AddBook/AddBook';
import AddResourceLink from 'views/AddResourceLink/AddResourceLink';
import AddTutorial from 'views/AddTutorial/AddTutorial';
import Articles from 'views/Articles/Articles';
import Books from 'views/Books/Books';
import Dashboard from '@material-ui/icons/Dashboard';
import { DefaultLayout } from 'layouts';
import ExampleRepos from 'views/ExampleRepos/ExampleRepos';
import IconFolderOpen from '@material-ui/icons/FolderOpen';
import IconGitHub from '@material-ui/icons/GitHub';
import IconLibraryBooks from '@material-ui/icons/LibraryBooks';
import IconLink from '@material-ui/icons/Link';
import IconQuestionAnswer from '@material-ui/icons/QuestionAnswer';
import Info from 'views/Info/Info';
import NotFound from 'components/common/NotFound';
import QADashboard from 'views/QADashboard/QADashboard';
import ResourceLinks from 'views/ResourceLinks/ResourceLinks';
import Search from 'views/Search';
import Tutorials from 'views/Tutorials/Tutorials';

const routes = [
  {
    path: '/',
    layout: DefaultLayout,
    element: QADashboard,
    name: 'Dashboard'
  },
  {
    path: '/qa-dashboard',
    layout: DefaultLayout,
    element: QADashboard,
    name: 'Dashboard',
    icon: Dashboard
  },
  {
    path: '/resource-links',
    layout: DefaultLayout,
    element: ResourceLinks,
    name: 'Resource Links',
    icon: IconLink
  },

  {
    path: '/articles',
    layout: DefaultLayout,
    element: Articles,
    name: 'Articles',
    icon: IconFolderOpen
  },
  {
    path: '/tutorials',
    layout: DefaultLayout,
    element: Tutorials,
    name: 'Tutorials',
    icon: IconQuestionAnswer
  },
  {
    path: '/books',
    layout: DefaultLayout,
    element: Books,
    name: 'Books',
    icon: IconLibraryBooks
  },
  {
    path: '/example-repos',
    layout: DefaultLayout,
    element: ExampleRepos,
    name: 'Example Repos',
    icon: IconGitHub
  },
  {
    path: '/add-book',
    layout: DefaultLayout,
    element: AddBook,
    name: 'Add Book'
  },
  {
    path: '/add-article',
    layout: DefaultLayout,
    element: AddArticle,
    name: 'Add Article'
  },
  {
    path: '/add-resourceLink',
    layout: DefaultLayout,
    element: AddResourceLink,
    name: 'Add Resource Link'
  },
  {
    path: '/add-tutorial',
    layout: DefaultLayout,
    element: AddTutorial,
    name: 'Add Tutorial'
  },
  {
    path: '/info',
    layout: DefaultLayout,
    element: Info
  },
  {
    path: '/search',
    layout: DefaultLayout,
    element: Search,
    name: 'Search'
  },
  {
    path: '*',
    element: NotFound,
    layout: DefaultLayout
  }
];

export default routes;