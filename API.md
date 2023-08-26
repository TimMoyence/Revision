## API : Application programming interface

Un API permet de faire appel au back sans avoir de connection avec le front et de rendre des fichier Json au front. Cela permet une augmentation de la securité info en rajoutant une couche aux requetes. 

## Fonctionnement 

Dans le router on appelle la route et le controller : 
`router.get('/lists', listController.getLists)`

Dans le controller on appelle une fonction asynchrone : 

```JS
async getLists(req, res) {

        try {
            const lists = await List.findAll({
                // inclusion sur 2 niveau, on récupère les cartes, et dans les cartes les labels
                include: {
                    association: 'cards',
                    include: 'labels'
                },
                // tri sur 2 niveau, on trie les listes ET les cartes par position
                order: [
                    ['position', 'ASC'],
                    ['cards', 'position', 'ASC']
                ]
            });
            // on peut envoyer une réponse avec res.send (généraliste) mais on peut aussi préparer une réponse avec res.json 
            // La réponse sera ensuite traité par le Front
            if (!lists) {
                res.status(404).send('no list found');
            } else {
                res.json(lists);
            }
        } catch (e) {
            console.trace(e);
            // pour avoir des réponses uniformes auprès du client, on transforme l'erreur en json à envoyer au client 
            res.status(500).json(e.toString());
        }
    },
```

## Foir pour fetch et comment a fonctionn https://developer.mozilla.org/fr/docs/Web/API/Fetch_API/Using_Fetch