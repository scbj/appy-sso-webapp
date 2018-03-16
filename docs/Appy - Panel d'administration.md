# Interface d'administration

Ce document définit l'aspect, les fonctionnalités et l'expérience de l'onglet d'administration d'**Appy**.

## ⚡ Page de démarrage

### Affichage

#### Données brutes

- 📟 Nombre d'utilisateurs actuel et maximum (exemple : *16/150*)
- 📟 Nombre d'administrateur
- 📅 Date d'expiration de la licence
- 🙋 Nom, prénom et mail du propriétaire de la licence

#### Graphiques

Les graphiques seront affichés un certain temps après la première utilisation. Lorsque les données recueillies seront suffisantes.

- Évolution de l'utilisation (connexion) par jour/mois/année

### Fonctionnalités

  L'utilisateur à la possibilité de cliquer sur le **nombre d'administrateur** afin d'en afficher **la liste** dans une boîte de dialogue. Il peut également changer l'**ordre de grandeur** du graphique de l'**évolution de l'utilisation** (par jour, mois ou année).

  Deux boutons seront disponibles, l'un pour **gérer les groupes** et l'autre pour **gérer les utilisateurs** dans leurs globalité.

## ✏️ Page d'édition des groupes

L'édition est orientée **groupe**. Les informations et actions disponibles sont donc **intrinsèquement lié au groupe sélectionné**. 

### Affichage

#### Données brutes

- 📟 Nombre d'utilisateur dans le groupe sélectionné
- Liste des utilisateurs du groupe sélectionné :
  - Prénom
  - Nom
  - Email
  - [Admin?]
- Liste de tous les utilisateurs de la compagnie :
  - Prénom
  - Nom
  - Photo de profil
  - Email en **tooltip**

### Fonctionnalités

#### Sélection du groupe

L'utilisateur peut sélectionner le groupe qu'il souhaite administrer. Deux formes du contrôle sont possibles en fonction du nombre de groupe à afficher :

- **Normal** : Un *dropdown menu* qui indique le groupe actuellement sélectionné puis déroulé qui liste les groupes et affiche un bouton *Créer un groupe*.
- **Beaucoup** : Un bouton sous forme d'icon + afin de créer un groupe. Suivi d'un bouton indiquant le groupe actuellement sélectionné qui ouvre une boîte de dialogue contenant une liste des groupes avec pagination.

Par défaut le groupe sélectionné est celui par... défaut.

#### ⚙️ Paramètres du groupe

Un bouton (sous forme de roue cranté) permettra l'édition du groupe dans une boite de dialogue. L'utilisateur pourra **renommer** et **supprimer** le groupe.

#### Type d'édition

Une radio bouton permettra à l'utilisateur de switcher entre l'édition des **utilisateurs** et l'édition des **applications** du groupe.

#### Drag and drop

Afin de permettre une manipulation simple et une édition rapide l'utilisateur pourra glisser-déposer les utilisateurs de la liste complète vers la liste du groupe pour les ajouter à ce groupe.

#### Ajouter un utilisateur au groupe

Deux possibilités permettent d'ajouter un utilisateur au groupe sélectionné :

- Le *drag and drop* décrit précédemment
- Grâce au bouton dédié (sous forme de +) lors du passage de la souris sur la ligne de l'utilisateur

#### Retirer un utilisateur d'un groupe

Le *drag and drop* est activé que dans un seul sens. Afin de retirer un utilisateur du groupe sélectionné il faudra utiliser le bouton dédié (sous forme de corbeille 🗑️) lors du passage de la souris sur la ligne d'utilisateur concerné.

Une demande de confirmation est affichée dans une boîte de dialogue. L'utilisateur a la possibilité de cocher une case "*Ne plus demander pour cette session*" avant de valider afin de ne plus demander de confirmation pour la session en cours uniquement.

#### Rechercher un utilisateur

Deux barres de recherche seront disponibles. L'une pour filtrer la liste des **utilisateurs d'un groupe**, l'autre pour filtrer la liste **complète des utilisateurs**.

## ✏️ Page d'édition des utilisateurs

Cette page est scindée en deux, en mode *master-detail*.


### Affichage

#### Données brutes

- 📟 Nombre d'utilisateurs actuel et maximum (exemple : 16/150)
- Liste des utilisateurs :
  - Prénom
  - Nom
  - Photo de profil
  - Email en **tooltip**
  - Admin ?
- Détails de l'utilisateur sélectionné :
  - Prénom
  - Nom
  - Email
  - Photo de profil
  - Rôle
  - Groupe
  - Date de création

### Fonctionnalités

#### Ajouter un utilisateur

Pour ajouter un utilisateur il faut ouvrir la boite de dialogue correspondante en cliquant sur le bouton dédié "*Créer un utilisateur*". La boite de dialogue de création d'utilisateur s'ouvre alors.

#### Édition des informations

Les informations affichées dans le détail de l'utilisateur sélectionné pourront être modifiées directement en cliquant sur les champs concernés.

#### Suppression d'un utilisateur

Pour supprimer un utilisateur il faut se rendre dans sa fiche détaillé et cliqué sur le bouton dédié, après confirmation l'utilisateur sera supprimé.

## 🗨️ Boîtes de dialogue

Lorsqu’un formulaire est requis pour créer, éditer, modifier un groupe ou un utilisateur une boîte de dialogue est utilisée. Ainsi l'utilisateur n'est pas distrait par le reste de l'interface. Cela permet également de découpe le flow de remplissage du formulaire en plusieurs étapes.

### Activation d'une licence

Lors de l'achat d'une licence l'utilisateur possède une clé. Il doit alors se créer un compte en allant sur la page d'activation (exemple : <https://appy.io/activate>).

#### Étape 1

Une seule entrée de texte disponible pour la clé de licence. On passe à l'étape suivante lorsque la clé est validée par le serveur (nombre de tentative limité).

#### Étape 2

Une seule entrée de texte disponible pour le nom de la compagnie.

#### Étape 3

L'acheteur doit rentrer les informations nécessaires à la création d'un premier utilisateur (owner ~ admin). A savoir :

- Prénom
- Nom
- Email
- Photo de profil

Après confirmation l'administrateur est redirigé vers la page de connexion afin de valider ses identifiants en se connectant une première fois au portail.

### Créer un utilisateur

#### Étape 1

L'administrateur doit remplir toutes les informations concernant l'utilisateur qu'il souhaite créer. A savoir :

- Prénom
- Nom
- Email
- Photo de profil

#### Étape 2

Dans le cas où des groupes ont déjà été créé, l'administrateur est invité à ajouter le nouvel utilisateur à un groupe existant.

### Créer un groupe

#### Étape 1

L'administrateur doit donner un nom au groupe qu'il souhaite créer.

#### Étape 2

Dans le cas où des utilisateurs ont déjà été créé, l'administrateur est invité à en ajouter au nouveau groupe.

### Créer des utilisateurs

#### Étape 1

L'administrateur doit lister des adresse email. Un email sera envoyé à chaque adresse email afin que l'utilisateur final remplisse lui-même ses informations.

#### Étape 2

Dans le cas où des groupes ont déjà été créé, cette étape permet d'assigner un groupe aux futurs utilisateurs.
