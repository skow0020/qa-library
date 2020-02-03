import Colors from './Colors';

const getCategoryTheme = (category) => {
  if (!category) return 'dark';
  switch (category.toLowerCase()) {
    case 'general':
      return Colors.primary;
    case 'ui automation':
      return Colors.blue;
    case 'api automation':
      return Colors.red;
    case 'unit testing':
      return Colors.green;
    case 'devops':
      return Colors.cyan;
    case 'development':
      return Colors.purple;
    case 'databasaes':
      return Colors.teal;
    default:
      return Colors.deactivated;
  }
};

const getLanguageTheme = (language) => {
  if (!language) return 'dark';
  switch (language.toLowerCase()) {
    case 'java':
      return Colors.purple;
    case 'c#':
      return Colors.blue;
    case 'javascript':
      return Colors.green;
    case 'python':
      return Colors.cyan;
    case 'ruby':
      return Colors.red;
    case 'cpp':
      return Colors.purple;
    case 'swift':
      return Colors.teal;
    default:
      return Colors.deactivated;
  }
};

export{ getCategoryTheme, getLanguageTheme };