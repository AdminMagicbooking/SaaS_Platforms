# Notes de travail — Segmentation clients & modèle de consommation énergie (HPA)

> Statut : brouillon de session (2026-06-12). À intégrer plus tard dans le Business Plan / brain.md sur instruction de Franck.

## 1. Segmentation clients — deux axes indépendants

Principe : **la taille (emplacements) et le classement (étoiles) sont deux axes différents.**
Les étoiles (Atout France, ~200 critères) ne dépendent pas de la taille. La taille = proxy de la taille du contrat ; les étoiles/équipements = proxy de l'intensité énergétique.

| Tier | Emplacements | Profil type | Équipements types | Conso estimée |
|---|---|---|---|---|
| S | 50–150 | 2–3★, familial | Sanitaires, éclairage, piscine non chauffée, épicerie | 60–130 MWh/an |
| M | 150–350 | 3–4★ | + Mobile homes clim, piscine chauffée, snack/resto, laverie | 300–600 MWh/an |
| L | 350–700 | 4–5★, groupes (Capfun, Yelloh!) | + Parc aquatique, restaurant, spa, bornes VE | 800–1 500 MWh/an |
| XL | 700+ / multi-sites | Chaînes & resorts | + Piscines multiples, balnéo, salles animation, flotte VE | 1 800–3 500 MWh/an/site |

Overlay : **score d'intensité énergétique** (piscine chauffée, % mobile homes clim, restauration, saison > 6 mois, bornes VE) pour prioriser au sein de chaque tier. Un M 4★ avec parc aquatique chauffé > un L 3★ basique.

## 2. Estimation de consommation

- **Top-down (taille)** : ~1 000–2 000 kWh/emplacement/an pour un site équipé ; < 500 pour emplacements nus. Précision ±40 %, usage = qualification rapide.
- **Bottom-up (équipements)** : kW × heures × saison × occupation. Collectable en un appel commercial. Base d'un pré-audit crédible.

### Charges indicatives par équipement

| Équipement | Charge indicative |
|---|---|
| Mobile home clim + ECS | 2–4 MWh/unité/saison |
| Piscine chauffée (pompes, chauffage, traitement) | 25–80 MWh/saison |
| Parc aquatique / toboggans / balnéo | 80–250 MWh/saison |
| Sanitaires (ECS, douches) | 0,3–0,6 MWh/emplacement/saison |
| Restaurant / bar / chambres froides | 30–100 MWh/an |
| Épicerie / commerces | 10–30 MWh/an |
| Laverie | 5–15 MWh/an |
| Éclairage extérieur | 10–40 MWh/an |
| Bornes VE (7–22 kW) | 2–10 MWh/borne/an |
| Spa / wellness / fitness | 20–60 MWh/an |

### Sites représentatifs — détail bottom-up (MWh/an)

Hypothèses : saison 6 mois, occupation ~65 %, Europe du Sud (clim).

| Équipement | S (100 empl, 10 MH) | M (250, 100 MH) | L (500, 300 MH) | XL (900, 600 MH) |
|---|---|---|---|---|
| Mobile homes | 15 | 250 | 750 | 1 800 |
| Piscine(s) | 10 | 50 | 150 | 300 |
| Sanitaires | 40 | 60 | 80 | 120 |
| Restauration | 15 | 45 | 80 | 150 |
| Spa / wellness | — | — | 40 | 60 |
| Animation | — | — | — | 40 |
| Laverie | 5 | 10 | 15 | 20 |
| Éclairage | 12 | 20 | 30 | 50 |
| Bornes VE | — | 10 | 50 | 100 |
| **Total** | **≈ 95** | **≈ 445** | **≈ 1 195** | **≈ 2 640** |

## 3. Points clés pour le pitch ECOGRID

1. **Les mobile homes dominent** dès le tier M (~55–70 % de la charge) — clim + ECS = charge pilotable → cœur de la proposition de valeur pour les 4–5★.
2. **Facture annuelle** à 0,20–0,25 €/kWh : ~20 k€ (S) → ~100 k€ (M) → ~270 k€ (L) → 600 k€+ (XL). Sert à dimensionner le discours d'économies par tier.
3. ECS = Eau Chaude Sanitaire — charge importante et flexible (déplaçable vers heures creuses / pics solaires).

## 4. À faire (en attente d'instruction)

- Intégration dans le Business Plan / brain.md (Franck précisera comment).
- Option : estimateur xlsx (inputs : emplacements, équipements, saison, tarif → MWh/an et €/an).
- Chiffres = ordres de grandeur pour qualification ; audit sur site pour affiner.
