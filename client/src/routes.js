import AddArticle from "./views/AddArticle/AddArticle";
import AddBook from "./views/AddBook/AddBook";
import AddResourceLink from "./views/AddResourceLink/AddResourceLink";
import AddTutorial from "./views/AddTutorial/AddTutorial";
import Articles from "./views/Articles/Articles";
import Books from "./views/Books/Books";
import { DefaultLayout } from "./layouts";
import ExampleRepos from "./views/ExampleRepos/ExampleRepos";
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
    path: "/",
    exact: true,
    layout: DefaultLayout,
    component: () => <Redirect to="/qa-dashboard" />
  },
  {
    path: "/qa-dashboard",
    layout: DefaultLayout,
    component: QADashboard
  },
  {
    path: "/resource-links",
    layout: DefaultLayout,
    component: ResourceLinks
  },
  {
    path: "/example-repos",
    layout: DefaultLayout,
    component: ExampleRepos
  },
  {
    path: "/articles",
    layout: DefaultLayout,
    component: Articles
  },
  {
    path: "/tutorials",
    layout: DefaultLayout,
    component: Tutorials
  },
  {
    path: "/books",
    layout: DefaultLayout,
    component: Books
  },
  {
    path: "/add-book",
    layout: DefaultLayout,
    component: AddBook
  },
  {
    path: "/add-article",
    layout: DefaultLayout,
    component: AddArticle
  },
  {
    path: "/add-resourceLink",
    layout: DefaultLayout,
    component: AddResourceLink
  },
  {
    path: "/add-tutorial",
    layout: DefaultLayout,
    component: AddTutorial
  },
  {
    path: "/info",
    layout: DefaultLayout,
    component: Info
  },
  {
    path: "/search",
    layout: DefaultLayout,
    component: Search
  },
  {
    path: "/library",
    layout: DefaultLayout,
    component: LibraryDash
  },
  {
    path: "/officeBook/:office_book_id",
    layout: DefaultLayout,
    component: InOfficeBook
  },
  {
    component: NotFound,
    layout: DefaultLayout
  }
];
