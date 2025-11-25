# Projet: OCR Word Search Solver (ocr-wss)

## Description Courte
Pipeline OCR complet pour résoudre des mots cachés depuis une image.

## Description Détaillée
OCR WSS est un logiciel d'OCR capable de résoudre automatiquement des grilles de mots cachés à partir d'une simple photo. Développé entièrement en C sans bibliothèques de haut niveau (hormis SDL2), le projet implémente un pipeline complet : prétraitement d'image, détection de grille, segmentation des caractères, reconnaissance optique (OCR) via un réseau de neurones maison, et algorithme de résolution.

Ce projet a nécessité une maîtrise des algorithmes bas niveau de traitement d'image (projections, binarisation, détection de lignes).

## Rôle
Développeur C & Computer Vision

## Stack Technique
C, SDL2, Neural Networks, Image Processing

## Détails Techniques
La contrainte de n'utiliser que la SDL2 a nécessité l'implémentation manuelle d'algorithmes complexes de vision par ordinateur. La détection de grille robuste face aux rotations et au bruit, ainsi que la création d'un réseau de neurones optimisé pour la reconnaissance de caractères, ont constitué les principaux défis techniques.

## Statut
Terminé (2024) - Durée: 10 mois

## Contributeurs
- Walson Argan René (https://github.com/Walson-A)
- Baptiste De Sousa ()
- Sacha Radic ()

## GitHub
https://github.com/Walson-A