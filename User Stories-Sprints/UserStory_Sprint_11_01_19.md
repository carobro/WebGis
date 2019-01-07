# Supporting Usability Evaluation of WebGIS with Visual Analytics    
## User Stories 

**Verschiedene Analysetools**
   
- Als Nutzer möchte ich eine Auswahl an Analyse Tools haben, um die für meine Daten am besten geeignetsten Analysen durchführen zu können:

- Als Nutzer möchte ich vergleichen zu können, wie schnell die Nutzer mit der Studie fertig waren, in Abhängigkeit von den Indikatoren.

- Als Nutzer möchte ich sehen, wie sich die Anzahl der ausgewählten Grundstücke/Hotels in Abhängigkeit der Zeit ändert.

- Als Nutzer möchte ich sehen, in welchem Kartenbereich sich die Anwender befanden, als diese ein Hotel/Grundstück im Ergebnisfenster ausgewählt haben.

# Sprintplanung (ab dem 07.01.2019)

**Scrum Master für die nächsten zwei Wochen:**

- Carolin Bronowicz
 
**Bereits erledigt:**

- Ordnerstruktur steht fest (Index.js, …)
- Icons für Kibana
- erste Libraries gefunden 
- Test - Dashboard erstellt
- Filter zum Vergleich der beiden Gruppen (mit Indikator/ ohne Indikator) auf dem Dashboard (Hotels, Grundstücke)
- Folgende Plugins (vorerst) fertiggestellt:
  - Swimlane
  - Karte zur Darstellung der Veränderungen der “map-center”
  - Timelion mit relativer Zeitangabe
- Folgende Plugins begonnen:
  - Dotplot
- GeoJson mit Grundstücken der Karte hinzufügen 
- Timeline Mausaktionen pro Zeiteinheit 
- Karte mit Zoomstufen 
- Timeline mit Startzeit (absolute Zeiteinheit)

**User Stories vom letzten Sprint, die wir beantworten können**

- Als Nutzer möchte ich ein Visualisierungstool haben, um die verschiedenen Mausaktionen pro Zeiteinheit zu analysieren.

- Als Nutzer möchte ich ein Visualisierungstool mit einer Karte haben, auf dem auch die unterschiedlichen Zoomstufen visualisiert sind, um zu sehen, in welchen Karten Bereichen weiter raus und in welchen weiter rein gezoomt wurde. 


## Sprint / nächste Schritte (07.01.19 - 18.01.19)

- begonnene Plugins beenden:
  - Stack-Chart
  - Timeline mit Start und Ende kombiniert
  - Punktdichtekarte erstellen für Item_Selected. Also in welchem MapCenter sich der Nutzer befand, als er ein Grundstück oder Hotel gewählt hat.
- Distanzfunktion “common route”- Implementierung (auf Kartenansicht)
