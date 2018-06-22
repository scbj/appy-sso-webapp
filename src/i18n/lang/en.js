export default {
  contact: 'Contact',
  about: 'About',
  terms: 'Terms & Conditions',
  username: 'Username',
  password: 'Password',
  settings: 'Settings',
  dashboard: 'Dashboard',
  news: 'News',
  apps: 'Applications',
  new: 'New',
  noGroup: 'No group',
  byDefault: 'By default',
  learnMore: 'learn more',
  licenceKey: 'Licence key:',
  addPeople: 'Add people',
  chooseGroupName: 'Choose the name of the group',
  cancel: 'Cancel',
  alert: {
    username: { ask: 'Please enter your username' },
    password: { ask: 'Please enter your password' },
    incorrectCredentials: 'Incorrect username or password.',
    networkError: 'We have trouble contacting the moon... please try again later! 🚀🌘',
    invalidLicenceKey: 'Invalid or incorrect license key',
    invalidCompanyName: 'Invalid name',
    invalidFullName: 'Invalid name',
    invalidEmail: 'Invaild email',
    invalidFields: 'Invalid fields',
    unknownField: 'Unknown field'
  },
  button: {
    logIn: 'Sign in',
    logOut: 'Sign out',
    needHelp: 'Need help ?',
    continueAs: 'Continue as <b>{username}</b>',
    createGroup: 'Create a group',
    switchGroup: 'Switch group',
    users: 'Users',
    applications: 'Applications',
    validate: 'Validate',
    next: 'Next',
    create: 'Create',
    createGroupWithPeoples: 'Create now | Create and add 1 person | Create and add {count} people',
    createUsers: 'Send email | Send the {count} emails',
    edit: 'Edit group...',
    rename: 'Rename',
    delete: 'Delete',
    deleteGroup: 'Delete group'
  },
  check: { rememberMe: 'Remember me' },
  title: {
    login: 'Login',
    alreadyLogged: 'Already logged in!',
    licenceKey: 'Enter your license key',
    companyName: 'Choose the name of your company',
    ownerInfos: 'Create the user who owns the license',
    completed: 'Congratulations! You have activated your license!',
    createGroup: 'Create a group',
    createUsers: 'Create users',
    renameGroup: 'Rename the group',
    deleteGroup: 'Deleting {groupName}'
  },
  message: {
    alreadyLogged: 'You are already logged in, you can change to another account at any time.',
    hello: 'Hi {firstname}!',
    noData: {
      applications: 'No apps to display ... too bad 👻',
      search: 'No results to display'
    },
    dragAndDropHere: 'Drag and drop your profile picture',
    invalidCompanyName: 'The company name must contain at<br>least 3 characters. It must not<br>begin or end with a space,<br>consecutive spaces will be<br>replaced by one.',
    invalidFullName: 'Your full name must consist of at least two words, only letters and at least 4 characters.',
    invalidEmail: 'The email must contain an at sign, followed by the domain name with a single dot.',
    invalidFields: '@:message.invalidFullName<br>@:message.invalidEmail',
    unknownField: 'Unable to process {key} field.',
    emailSent: 'We have sent you an email so you can access your account.&#13;&#10;You will need to set a password.',
    tooCramped: 'A little too cramped here!',
    tooCrampedInstructions: 'Use a computer and resize the window until you are more comfortable',
    tooCrampedWhy: 'Activation of the license on mobile is under development! You will soon be able to use 100% of Appy on your mobile.',
    groupCreateSuccess: 'New group created successfully!',
    groupCreateError: 'We encountered a problem. The group could not be created.',
    groupRenameError: 'We encountered a problem. The group could not be renamed.',
    groupDeleteSuccess: '{groupName} has been removed.',
    groupDeleteError: 'We encountered a problem. The group could not be deleted.',
    userCreateSuccess: 'Emails sent successfully!',
    userCreateError: 'We encountered a problem. Please try again later.',
    selectionCount: 'You have selected a single user | You have selected {count} users'
  },
  placeholder: {
    fullName: 'Full name (first and last name)',
    email: 'Email address',
    search: 'Search a name, first name or email'
  },
  header: {
    fullName: 'FIRSTNAME AND LASTNAME',
    email: 'EMAIL',
    role: 'ROLE',
    createdAt: 'CREATED AT',
    modifiedAt: 'MODIFIED AT'
  },
  infos: {
    userInGroup: 'user in the group | users in group'
  },
  error: {
    atLeastOneCharacter: 'Must contain at least 1 character',
    atMostSixtyCharacters: 'Must not exceed 60 characters',
    invalidEmail: 'Invaild email',
    groupNameUnchanged: 'Hmm 🤔 No need to rename this group, it already bears that name!',
    noEmailAddressFilled: 'Still a little effort, at least one email address 🙏🏻',
    unknowEmailFormat: 'An email address is not in a known format : {email}'
  },
  question: {
    deleteGroup: 'This will permanently delete the group (group users will be assigned to the default group). Continue?'
  },
  label: {
    emailList: 'List of email addresses'
  },
  description: {
    emailList: 'An account creation email will be sent to each filled-in address.'
  }
}
