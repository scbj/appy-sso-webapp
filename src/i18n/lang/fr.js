export default {
  contact: 'Contact',
  about: 'A propos',
  terms: 'Mentions légales',
  username: "Nom d'utilisateur",
  password: 'Mot de passe',
  settings: 'Paramètres',
  administration: 'Administration',
  news: 'Actualités',
  apps: 'Mes applications',
  new: 'Nouveau',
  noGroup: 'Aucun groupe',
  byDefault: 'Par défaut',
  learnMore: 'en savoir plus',
  licenceKey: 'Clé de licence :',
  addPeople: 'Ajouter des personnes',
  chooseGroupName: 'Choisissez le nom du groupe',
  cancel: 'Annuler',
  alert: {
    username: { ask: "Veuillez renseigner votre nom d'utilisateur" },
    password: { ask: 'Veuillez renseigner votre mot de passe' },
    incorrectCredentials: 'Identifiant ou mot de passe incorrect.',
    networkError: 'Nous avons du mal à contacter la lune... veuillez réessayer plus tard ! 🚀🌘',
    invalidLicenceKey: 'Clé de licence invalide ou incorrect',
    invalidCompanyName: 'Nom invalide',
    invalidFullName: 'Nom complet invalide',
    invalidEmail: 'Email invalide',
    invalidFields: 'Champs invalides',
    unknownField: 'Champ inconnu',
    atLeastOneCharacter: 'Doit contenir au moins 1 caractère',
    atMostSixtyCharacters: 'Ne doit pas dépasser 60 caractères'
  },
  button: {
    logIn: 'Se connecter',
    logOut: 'Se déconnecter',
    needHelp: "Besoin d'aide ?",
    continueAs: 'Continuer en tant que <b>{username}</b>',
    createGroup: 'Créer un groupe',
    switchGroup: 'Changer de groupe',
    users: 'Utilisateurs',
    applications: 'Applications',
    validate: 'Valider',
    next: 'Suivant',
    create: 'Créer',
    createGroupWithPeoples: 'Créer maintenant | Créer et ajouter 1 personne | Créer et ajouter {count} personnes',
    edit: 'Modifier le groupe...'
  },
  check: { rememberMe: 'Se souvenir de moi' },
  alt: { profilPicture: 'Photo de profil' },
  title: {
    login: 'Connexion',
    alreadyLogged: 'Déjà connecté !',
    licenceKey: 'Entrez votre clé de licence',
    companyName: 'Choisissez le nom de votre entreprise',
    ownerInfos: "Créez l'utilisateur propriétaire de la licence",
    completed: "Félicitations ! Vous venez d'activer votre licence !",
    createGroup: 'Créer un groupe',
    createUser: 'Créer un utilisateur'
  },
  message: {
    alreadyLogged: 'Vous êtes actuellement déjà connecté, vous pouvez changer de compte à tout moment.',
    hello: 'Bonjour {firstname} !',
    noData: {
      applications: 'Aucune application à afficher... tant pis 👻',
      search: 'Aucun résultat à afficher'
    },
    dragAndDropHere: 'Glissez-déposez votre photo de profil',
    invalidCompanyName: "Le nom de l'entreprise doit<br>contenir au moins 3 caractères.<br>Il ne doit pas commencer ni finir<br>par un espace, les espaces<br>consécutifs seront remplacés par<br>un seul.",
    invalidFullName: "Votre nom complet doit être constitué d'au moins deux mots, uniquement des<br>lettres et au minimum 4 caractères.",
    invalidEmail: "L'email doit contenir un arobase, suivi du nom de domaine avec un seul point.",
    invalidFields: '@:message.invalidFullName<br>@:message.invalidEmail',
    unknownField: 'Impossible de traiter le champ {key}.',
    emailSent: 'Nous vous avons envoyé un mail afin que vous puissiez accèder à votre compte.&#13;&#10;Vous serez amené à définir un mot de passe.',
    tooCramped: "Un peu trop à l'étroit ici !",
    tooCrampedInstructions: "Utilisez un ordinateur et agrandissez la fenêtre jusqu'à ce qu'on soit plus à l'aise",
    tooCrampedWhy: "L'activation de la licence sur mobile est en développement ! Vous pourrez bientôt utiliser 100% d'Appy sur votre mobile.",
    groupCreatedSuccess: 'Nouveau groupe créé avec succès !',
    selectionCount: 'Vous avez sélectionné un utilisateur | Vous avez sélectionné {count} utilisateurs'
  },
  placeholder: {
    fullName: 'Nom complet (prénom et nom)',
    email: 'Adresse mail',
    search: 'Rechercher un nom, prénom ou email'
  },
  header: {
    fullName: 'PRÉNOM ET NOM',
    email: 'EMAIL',
    role: 'RÔLE',
    createdAt: 'CRÉÉ IL Y A',
    modifiedAt: 'MODIFIÉ IL Y A'
  },
  infos: {
    userInGroup: 'utilisateur dans le groupe | utilisateurs dans le groupe'
  }
}
