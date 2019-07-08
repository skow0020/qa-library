const getCategoryTheme = (category) => {
  if (!category) return 'dark';
  switch (category.toLowerCase()) {
    case 'general':
      return 'royal-blue';
    case 'ui automation':
      return 'warning';
    case 'api automation':
      return 'info';
    case 'unit testing':
      return 'secondary';
    case 'devops':
      return 'success';
    case 'development':
      return 'primary';
    case 'databasaes':
      return 'danger';
    default:
      return 'dark';
  }
};

const getLanguageTheme = (language) => {
  if (!language) return 'dark';
  switch (language.toLowerCase()) {
    case 'java':
      return 'info';
    case 'csharp':
      return 'secondary';
    case 'javascript':
      return 'success';
    case 'python':
      return 'primary';
    case 'ruby':
      return 'danger';
    case 'cpp':
      return 'royal-blue';
    case 'swift':
      return 'warning';
    default:
      return 'dark';
  }
};

export{ getCategoryTheme, getLanguageTheme };