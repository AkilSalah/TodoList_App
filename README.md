# ToDO List - Application Angular

## Description
L'application **Gestion des Tâches** est une solution construite avec Angular qui permet de gérer efficacement les tâches quotidiennes. Elle offre des fonctionnalités telles que l'ajout, la modification, la suppression, la gestion par catégories, et le suivi des statistiques (tâches terminées, en cours, et en retard).  

## Fonctionnalités
- **Gestion des Tâches** : Ajouter, modifier et supprimer des tâches.
- **Gestion des Catégories** : Organiser les tâches par catégories.
- **Statistiques** : Afficher les tâches terminées, en cours et en retard.
- **Recherche** : Rechercher des tâches via une barre de recherche.
- **LocalStorage** : Stocker et persister les données localement dans le navigateur.

---

## Technologies utilisées
- **Framework** : Angular
- **Langage** : TypeScript
- **Bibliothèques** : RxJS
- **Styles** : CSS et Tailwind CSS
- **Stockage** : LocalStorage

---

## Installation et Configuration
### Prérequis
Avant de commencer, assurez-vous d'avoir les éléments suivants installés sur votre machine :
- Node.js (version 16 ou supérieure)
- Angular CLI
## Étapes d'installation
- 1. Cloner le projet
```bash
git clone https://github.com/votre-repository/task-manager.git
cd task-manager
```
- 2. Installer les dépendances

 ```bash
npm install
```
- 3. Démarrer le serveur de développement

``` bash
ng serve
```
- 4. **Accéder à l'application** : Ouvrez votre navigateur et rendez-vous sur http://localhost:4200.

## Utilisation

### Ajouter une tâche
1. Cliquez sur le bouton **"Ajouter une tâche"**.
2. Remplissez les champs obligatoires :  
   - **Titre**  
   - **Description**  
   - **Date d'échéance**  
   - **Priorité**  
3. Cliquez sur le bouton **"Enregistrer"** pour sauvegarder la tâche.

---

### Modifier une tâche
1. Sélectionnez une tâche dans la liste des tâches.
2. Modifiez les champs souhaités (titre, description, date, etc.).
3. Cliquez sur **"Enregistrer"** pour valider les changements.

---

### Supprimer une tâche
1. Cliquez sur l'icône **"Corbeille"** à côté de la tâche que vous souhaitez supprimer.
2. Confirmez la suppression si nécessaire.

---

### Filtrer par catégories
1. Ouvrez le **menu déroulant des catégories**.
2. Sélectionnez une catégorie spécifique pour afficher uniquement les tâches correspondantes.

---

### Consulter les statistiques
- Les statistiques sont générées automatiquement et incluent :  
  - **Tâches terminées** : Nombre total de tâches marquées comme terminées.  
  - **Tâches en cours** : Nombre total de tâches actuellement en progression.  
  - **Tâches en retard** : Nombre de tâches dont la date d'échéance est dépassée.  
- Ces informations sont affichées directement dans l'interface de l'application.

---




