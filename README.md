Question 1.1 donner la liste des en-têtes de la réponse HTTP du serveur

connection:keep-alive
date:Mon, 30 Sep 2024 11:57:53 GMT
keep-alive:timeout=5
transfer-encoding:chunked


Question 1.2 donner la liste des en-têtes qui ont changé depuis la version précédente

content-length:20
content-type:application/json
date:Mon, 30 Sep 2024 12:00:35 GMT
keep-alive:timeout=5


Question 1.3 que contient la réponse reçue par le client ?
{"message":"I'm OK"}

Question 1.4 quelle est l’erreur affichée dans la console ? Retrouver sur https://nodejs.org/api le code d’erreur affiché.

Error: ENOENT: no such file or directory, open 'C:\Users\monpc\Desktop\dev web\tp5\index.html'
    at async open (node:internal/fs/promises:639:25)
    at async Object.readFile (node:internal/fs/promises:1242:14) {
  errno: -4058,
  code: 'ENOENT',
  syscall: 'open',
  path: 'C:\\Users\\monpc\\Desktop\\dev web\\tp5\\index.html'   
}

Le fichier index.html n'est pas trouvé


function requestListener(_request, response) {
  fs.readFile("index.html", "utf8")
    .then((contents) => {
      response.setHeader("Content-Type", "text/html");
      response.writeHead(200);
      return response.end(contents);
    })
    .catch((error) => {
        response.writeHead(500);
        response.end("<html><h1>No file index.html<h1></html>");
    });
}

Question 1.5 donner le code de requestListener() modifié avec gestion d’erreur en async/await.

function readfile(){
    return fs.readFile("index.html", "utf8")
}

async function requestListener(_request, response) {
    try{
        const contents = await readfile();
        response.setHeader("Content-Type", "text/html");
        response.writeHead(200);
        return response.end(contents);
    } catch(error) {
        response.writeHead(500);
        response.end("<html><h1>No file index.html<h1></html>");
    };
}

Question 1.6 indiquer ce que cette commande a modifié dans votre projet.
Il nous a rajouté une liste deroulantes de node_modules

Question 1.7 quelles sont les différences entre les scripts http-dev et http-prod ?
http-dev lance le script en mode developpement (la page est relancé dès que l'on change le script) et http-prod lance en mode production (ne relance pas la page automatiquement)

Question 1.8 donner les codes HTTP reçus par votre navigateur pour chacune des quatre pages précédentes


http://localhost:8000/index.html
200
http://localhost:8000/random.html
200
http://localhost:8000/
404
http://localhost:8000/dont-exist
404

Question 2.1 donner les URL des documentations de chacun des modules installés par la commande précédente.

https://expressjs.com
https://www.npmjs.com/package/http-errors
https://github.com/pimterry/loglevel
https://github.com/expressjs/morgan

Question 2.2 vérifier que les trois routes fonctionnent.
http://localhost:8000/ (fonctionne)
http://localhost:8000/index.html (fonctionne)
http://localhost:8000/random/4 (fonctionne)

Question 2.3 lister les en-têtes des réponses fournies par Express. Lesquelles sont nouvelles par rapport au serveur HTTP ?
http://localhost:8000/
accept-ranges:bytes
cache-control:public, max-age=0
connection:keep-alive
content-length:122
content-type:text/html; charset=UTF-8
date:Mon, 30 Sep 2024 22:28:27 GMT
etag:W/"7a-192274c59b3"
keep-alive:timeout=5
last-modified:Wed, 25 Sep 2024 03:49:28 GMT
x-powered-by:Express


http://localhost:8000/index.html 
accept-ranges:bytes
cache-control:public, max-age=0
connection:keep-alive
content-length:122
content-type:text/html; charset=UTF-8
date:Mon, 30 Sep 2024 22:27:43 GMT
etag:W/"7a-192274c59b3"
keep-alive:timeout=5
last-modified:Wed, 25 Sep 2024 03:49:28 GMT
x-powered-by:Express


http://localhost:8000/random/4
connection:keep-alive
content-length:69
content-type:text/html; charset=utf-8
date:Mon, 30 Sep 2024 22:26:26 GMT
etag:W/"45-w5iIzTA4Yi+TU8GSOtAF0SjBops"
keep-alive:timeout=5
x-powered-by:Express


Les nouvells en-tête par rapport au server http sont:
accept-ranges:bytes
cache-control:public, max-age=0

content-length:69
content-type:text/html; charset=utf-8
etag:W/"45-w5iIzTA4Yi+TU8GSOtAF0SjBops"
last-modified:Wed, 25 Sep 2024 03:49:28 GMT
x-powered-by:Express

Question 2.4 quand l’événement listening est-il déclenché ?
l'événemént listening est déclenché quand on rafraichit la page sur l'addresse et le port spécifié

Question 2.5 indiquer quelle est l’option (activée par défaut) qui redirige / vers /index.html ?
L'option activé par défaut est express.static()

Question 2.6 visiter la page d’accueil puis rafraichir (Ctrl+R) et ensuite forcer le rafraichissement (Ctrl+Shift+R). Quels sont les codes HTTP sur le fichier style.css ? Justifier.
Lors de la première visite on a 200 OK le navigateur demande les fichiers au serveur
Lors du rafraichissement on a 304 Not modified car le navigateur minimise le traffic en utilisant les fichiers déja télécharger
Lors du rafraichissement forcé on a 200 OK et ici le navigateur est forcé de demender les fichiers au serveur