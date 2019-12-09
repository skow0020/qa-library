import AddArticle from "./views/AddArticle/AddArticle";
import AddBook from "./views/AddBook/AddBook";
import AddResourceLink from "./views/AddResourceLink/AddResourceLink";
import AddTutorial from "./views/AddTutorial/AddTutorial";
import Articles from "./views/Articles/Articles";
import Books from "./views/Books/Books";
import Dashboard from "@material-ui/icons/Dashboard";
import { DefaultLayout } from "./layouts";
import ExampleRepos from "./views/ExampleRepos/ExampleRepos";
import IconFolderOpen from "@material-ui/icons/FolderOpen";
import IconGitHub from "@material-ui/icons/GitHub";
import IconLibraryBooks from "@material-ui/icons/LibraryBooks";
import IconLink from "@material-ui/icons/Link";
import IconLocalLibrary from "@material-ui/icons/LocalLibrary";
import IconQuestionAnswer from "@material-ui/icons/QuestionAnswer";
import InOfficeBook from "./views/InOfficeBook/InOfficeBook";
import Info from "./views/Info/Info";
import LibraryDash from "./views/LibraryDash/LibraryDash";
import NotFound from "./components/common/NotFound";
import QADashboard from "./views/QADashboard/QADashboard";
import React from "react";
import { Redirect } from "react-router-dom";
import ResourceLinks from "./views/ResourceLinks/ResourceLinks";
import Search from "./views/Search";
import Tutorials from "./views/Tutorials/Tutorials";

export default [
  {
    path: "/qa-dashboard",
    layout: DefaultLayout,
    component: QADashboard,
    name: "Dashboard",
    icon: Dashboard
  },
  {
    path: "/resource-links",
    layout: DefaultLayout,
    component: ResourceLinks,
    name: "Resource Links",
    icon: IconLink
  },
  {
    path: "/example-repos",
    layout: DefaultLayout,
    component: ExampleRepos,
    name: "Example Repos",
    icon: IconGitHub
  },
  {
    path: "/articles",
    layout: DefaultLayout,
    component: Articles,
    name: "Articles",
    icon: IconFolderOpen
  },
  {
    path: "/tutorials",
    layout: DefaultLayout,
    component: Tutorials,
    name: "Tutorials",
    icon: IconQuestionAnswer
  },
  {
    path: "/books",
    layout: DefaultLayout,
    component: Books,
    name: "Books",
    icon: IconLibraryBooks
  },
  {
    path: "/add-book",
    layout: DefaultLayout,
    component: AddBook,
    name: "Add Book"
  },
  {
    path: "/add-article",
    layout: DefaultLayout,
    component: AddArticle,
    name: "Add Article"
  },
  {
    path: "/add-resourceLink",
    layout: DefaultLayout,
    component: AddResourceLink,
    name: "Add Resource Link"
  },
  {
    path: "/add-tutorial",
    layout: DefaultLayout,
    component: AddTutorial,
    name: "Add Tutorial"
  },
  {
    path: "/info",
    layout: DefaultLayout,
    component: Info
  },
  {
    path: "/search",
    layout: DefaultLayout,
    component: Search,
    name: "Search"
  },
  {
    path: "/library",
    layout: DefaultLayout,
    component: LibraryDash,
    name: "Library Dashboard",
    icon: IconLocalLibrary
  },
  {
    path: "/officeBook/:office_book_id",
    layout: DefaultLayout,
    component: InOfficeBook,
    name: "In-Office Book"
  },
  {
    path: "/",
    exact: true,
    layout: DefaultLayout,
    component: () => <Redirect to="/qa-dashboard" />
  },
  {
    component: NotFound,
    layout: DefaultLayout
  }
];
