/*------------------------------------------------------------------------------------------------------------------*/
//							OUTIL D'ANALYSE des données dans un fichier									//
/*------------------------------------------------------------------------------------------------------------------*/

// Charger le texte -----------------------------------------------------------------------
window.onload = function() {
    let fileInput = document.getElementById('fileInput');
    let fileDisplayArea = document.getElementById('fileDisplayArea');

    // On "écoute" si le fichier donné a été modifié.
    // Si on a donné un nouveau fichier, on essaie de le lire.
    fileInput.addEventListener('change', function(e) {  //addEventListener a été utilisée en faisant référence à https://www.w3schools.com/jsref/tryit.asp?filename=tryjsref_element_addeventlistener2
        
        let file = fileInput.filter
        // on utilise cette expression régulière pour vérifier qu'on a bien un fichier texte.
        let textType = new RegExp("text.*");

        
            // lecture du fichier. D'abord, on crée un objet qui sait lire un fichier.
            

            // on dit au lecteur de fichier de placer le résultat de la lecture
            // dans la zone d'affichage du texte.
            reader.onload = function(e) {
                fileDisplayArea.innerText = reader.result;
                segText();
                let nbTokens = xx
                let nbLines = xx
                document.getElementById("logger2").innerHTML = '<span class="infolog">Nombre de tokens : ' + nbTokens + '<br>Nombre de lignes : ' + nbLines +' </span>';
            }

            // on lit concrètement le fichier.
            // Cette lecture lancera automatiquement la fonction "onload" juste au-dessus.
            reader.readAsText(file);

            document.getElementById("logger1").innerHTML = '<span class="infolog">Fichier chargé avec succès</span>';
        } else { // pas un fichier texte : message d'erreur.
            fileDisplayArea.innerText = "";
            document.getElementById("logger1").innerHTML = '<span class="errorlog">Type de fichier non supporté !</span>';
        }
    });
}

// VERSION segText() ------------------------------------------------------------------------
function segText() {
    if (document.getElementById('fileDisplayArea').innerHTML==""){
        document.getElementById('logger3').innerHTML="Il faut d'abord charger un fichier .txt !";
    } else {
        if (document.getElementById("delimID").value === "") {
            document.getElementById("logger3").innerHTML = '<span class="errorlog">Aucun délimiteur donné !</span>'
        }else{
            document.getElementById('logger3').innerHTML="";
            let text = document.getElementById("fileDisplayArea").innerText;
            let delim = document.getElementById("delimID").value;
            let display = document.getElementById("page-analysis");
        
            let regex_delim = new RegExp(
                "["
                + delim
                    .replace("-", "\\-") // le tiret n'est pas à la fin : il faut l'échapper, sinon erreur sur l'expression régulière
                    .replace("[", "\\[").replace("]", "\\]") // à changer sinon regex fautive, exemple : [()[]{}] doit être [()\[\]{}], on doit "échapper" les crochets, sinon on a un symbole ] qui arrive trop tôt.
                + "\\s" // on ajoute tous les symboles d'espacement (retour à la ligne, etc)
                + "]+" // on ajoute le + au cas où plusieurs délimiteurs sont présents : évite les tokens vides
            );
        
            let tokens = text.split(regex_delim);
            tokens = tokens.filter(x => x.trim() != ""); // on s'assure de ne garder que des tokens "non vides"
            let lines = text.split(/\r?\n/g);
            lines = lines.filter(line => line.trim() != "");
        
            global_var_tokens = xx; // décommenter pour vérifier l'état des tokens dans la console développeurs sur le navigateur
            global_var_lines = xx;
            display.innerHTML = xx.join(" ");
        }
    }
}


// A RETENIR : différences .innerHTML  .textContent  .innerText
//.innerHTML permet de récupérer ou définir le contenu HTML d'un élément, y compris les balises HTML.
//.textContent permet de récupérer ou définir le contenu textuel d'un élément, en ignorant les balises HTML. Supprime les espaces supplémentaires et les retours chariot.
//.innerText est similaire à .textContent, mais tient compte de la mise en forme CSS appliquée à l'élément, ce qui peut parfois affecter le texte affiché. Inclue des espaces et des retours chariot supplémentaires.

// Dictionnaire -----------------------------------------------------------------
function dictionnaire() {
    if (document.getElementById('fileDisplayArea').innerHTML==""){ //commenter l'utilité de innerHTML==""
        //alert("Il faut d'abord charger un fichier .txt !");
        document.getElementById('logger3').innerHTML="Il faut d'abord charger un fichier .txt !";
        } else {
            document.getElementById('logger3').innerHTML="";
            let tokenFreq = {}; //commenter
            let tokens = global_var_tokens;
            // commenter
            tokens.forEach(token => tokenFreq[token] = (tokenFreq[token] || 0) + 1);
            // Convertir l'objet en tableau de paires clé-valeur
            let freqPairs = Object.entries(tokenFreq);
            // Trier le tableau par fréquence décroissante
            freqPairs.sort((a, b) => b[1] - a[1]);
            // Ajouter l'entête du tableau
            let tableArr = [['<b>Token</b>', '<b>Fréquence</b>']];
            // Créer un tableau de tableaux contenant les tokens et leurs fréquences
            let tableData = freqPairs.map(pair => [pair[0], pair[1]]);
            // Concaténer les deux tableaux
            let finalTable = tableArr.concat(tableData);
            // Créer le tableau HTML à partir du tableau final
            let tableHtml = finalTable.map(row => '<tr><td>' + row.join('</td><td>').join('');
            // Afficher le tableau HTML dans la page
            document.getElementById('page-analysis').innerHTML = '<table>' + tableHtml + '</table>';
        }
}
