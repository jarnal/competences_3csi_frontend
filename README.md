# Projet compétences 3CSI Front End

[![Build Status](https://travis-ci.org/Glognus/competences_3csi_frontend.svg?branch=master)](https://travis-ci.org/Glognus/competences_3csi_frontend)

### Présentation

Ce projet a pour finalité de gérer les compétences des étudiants d'une classe.

Partie front-end du projet réalisée avec NodeJS et ReactJS.

La partie back-end basée sur Symfony 2.8 se trouve ici : 
* https://github.com/jarnal/competence_3csi

### Technologies

Technologies principales utilisées :

* react
* redux
* chai
* mocha
* react-router
* react-bootstrap-table
* admin-lte
* webpack
* babel-loader

### Installation

Dupliquer le fichier 'configuration.dist.js' vers un nouveau fichier 'configuration.js' et renseigner l'IP du back-end.

Installation des dépendances

```sh
$ npm install
```

Démarrage de l'application
```sh
$ npm start
```

Lancement du jeu de tests
```sh
$ npm test
```