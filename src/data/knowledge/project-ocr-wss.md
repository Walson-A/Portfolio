# Projet: OCR Word Search Solver (ocr-wss)

## Description Courte
Pipeline OCR complet pour résoudre des mots cachés depuis une image.

## Description Détaillée
OCR WSS est un logiciel capable de résoudre automatiquement des grilles de mots cachés à partir d'une simple photo. Développé en C, il intègre une interface graphique GTK+ 3 et un réseau de neurones (MLP) fait maison pour la reconnaissance optique.

Le logiciel guide l'utilisateur à travers un pipeline de traitement complet : du prétraitement de l'image (niveaux de gris, réduction de bruit) à la résolution algorithmique, en passant par la segmentation précise de la grille via détection de blobs et projections d'histogrammes.

## Rôle
Développeur C & Computer Vision

## Stack Technique
C, GTK+ 3, SDL2, Neural Networks, Image Processing

## Détails Techniques
L'implémentation repose sur un pipeline strict : 
1. Prétraitement (Greyscale, Binarisation, RLSA). 
2. Segmentation de la grille par détection de blobs et filtrage médian. 
3. Extraction des lettres par profils de projection. 
4. OCR via un MLP (48x48 input) entraîné from scratch. 
5. Résolution par Backtracking.

## Statut
Terminé (2024) - Durée: 4 mois

## Contributeurs
- Walson Argan René (https://github.com/Walson-A)
- Baptiste De Sousa ()

## GitHub
https://github.com/Walson-A