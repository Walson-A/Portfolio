# Projet: Atlas (atlas)

## Description Courte
Assistant vocal IA local ultra-rapide mêlant ASR, LLM, TTS et domotique.

## Description Détaillée
Atlas est un assistant vocal IA de nouvelle génération, conçu pour fonctionner entièrement en local afin de garantir confidentialité et réactivité. S'affranchissant des écosystèmes fermés, il orchestre un pipeline audio complet intégrant détection de mot-clé (hotword), reconnaissance vocale (ASR), appel LLM et synthèse vocale (TTS), le tout entièrement modulable.

Au-delà de la simple commande vocale, Atlas est une véritable intelligence ambiante connectée à son environnement virtuel (contrôle de différentes fonctionnalités du PC) et réel (avec une gestion complète des appareils connectés via Home Assistant). Il offre une expérience conversationnelle fluide et naturelle (barge-in, contexte), tout en étant bâti sur une architecture modulaire prête pour le futur (mémoire long terme, analyse émotionnelle, routines adaptatives).

## Rôle
Architecte Système & Développeur Fullstack

## Stack Technique
Python, LLM, Function Tools, ASR, TTS

## Détails Techniques
Le défi majeur a été de concevoir un pipeline audio temps réel à faible latence capable de gérer simultanément le hotword, le VAD, la transcription et l'interruption (barge-in), le tout en local. L'architecture est strictement découplée permettant une maintenance et une évolution indépendantes de chaque module.

## Statut
En cours (2025-07) - Durée: Projet long terme



## GitHub
https://github.com/Walson-A