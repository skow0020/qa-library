export default function() {
  return [
    {
      title: "QA Dashboard",
      to: "/qa-dashboard",
      htmlBefore: '<i class="material-icons">home</i>',
      htmlAfter: ""
    },
    {
      title: "Articles",
      htmlBefore: '<i class="material-icons">vertical_split</i>',
      to: "/articles"
    },
    {
      title: "Resource Links",
      htmlBefore: '<i class="material-icons">build</i>',
      to: "/resource-links"
    },
    {
      title: "Books",
      htmlBefore: '<i class="material-icons">book</i>',
      to: "/books"
    },
    {
      title: "Tutorials",
      htmlBefore: '<i class="material-icons">face</i>',
      to: "/Tutorials"
    },
    {
      title: "Example Repos",
      htmlBefore: '<i class="material-icons">view_module</i>',
      to: "/example-repos"
    },
    {
      title: "In-Office Library",
      htmlBefore: '<i class="material-icons">local_library</i>',
      to: "/library"
    }
  ];
}
