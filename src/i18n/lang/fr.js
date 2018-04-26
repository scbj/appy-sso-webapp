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
    unknownField: 'Champ inconnu'
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
    create: 'Créer'
  },
  check: { rememberMe: 'Se souvenir de moi' },
  alt: { profilPicture: 'Photo de profil' },
  title: {
    login: 'Connexion',
    alreadyLogged: 'Déjà connecté !',
    licenceKey: 'Entrez votre clé de licence',
    companyName: 'Choisissez le nom de votre entreprise',
    ownerInfos: "Créez l'utilisateur propriétaire de la licence",
    completed: "Félicitations ! Vous venez d'activer votre licence !"
  },
  message: {
    alreadyLogged: 'Vous êtes actuellement déjà connecté, vous pouvez changer de compte à tout moment.',
    hello: 'Bonjour {firstname} !',
    noData: {
      applications: 'Aucune application à afficher... tant pis 👻'
    },
    dragAndDropHere: 'Glissez-déposez votre photo de profil',
    invalidCompanyName: "Le nom de l'entreprise doit<br>contenir au moins 3 caractères.<br>Il ne doit pas commencer ni finir<br>par un espace, les espaces<br>consécutifs seront remplacés par<br>un seul.",
    invalidFullName: "Votre nom complet doit être constitué d'au moins deux mots, uniquement des<br>lettres et au minimum 4 caractères.",
    invalidEmail: "L'email doit contenir un arobase, suivi du nom de domaine avec un seul point.",
    invalidFields: '@:message.invalidFullName<br>@:message.invalidEmail',
    unknownField: 'Impossible de traiter le champ {key}.',
    emailSent: 'Nous vous avons envoyé un mail afin que vous puissiez accèder à votre compte.&#13;&#10;Vous serez amené à définir un mot de passe.'
  },
  placeholder: {
    fullName: 'Nom complet (prénom et nom)',
    email: 'Adresse mail'
  }
}
