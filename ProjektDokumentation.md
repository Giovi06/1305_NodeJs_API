# Projektdokumentation

## 1 Informieren

### 1.1 Projektbeschreibung

Das Projekt ist eine Webanwendung, die Node.js und Express.js für das Backend sowie MongoDB als Datenbank verwendet. Sie bietet Benutzer-Authentifizierung, dient statische Dateien und stellt mehrere API-Endpunkte zur Verwaltung von Mitarbeitern bereit. Zudem behandelt sie Fehler und bietet eine 404-Seite für nicht vorhandene Routen.

### 1.2 User Stories

| US-№ | Verbindlichkeit | Typ        | Beschreibung                                                                                                     |
| ---- | --------------- | ---------- | ---------------------------------------------------------------------------------------------------------------- |
| 1    | Muss            | Funktional | Als Benutzer möchte ich ein Konto registrieren, um auf die Anwendung zugreifen zu können.                        |
| 2    | Muss            | Funktional | Als Benutzer möchte ich mich authentifizieren, um geschützte Routen betreten zu können.                          |
| 3    | Muss            | Funktional | Als Benutzer möchte ich meine Sitzung auffrischen, um eingeloggt zu bleiben.                                     |
| 4    | Muss            | Funktional | Als Benutzer möchte ich mich abmelden, um meine Sitzung zu beenden.                                              |
| 5    | Muss            | Funktional | Als Benutzer möchte ich auf die Mitarbeiter-API zugreifen, um Mitarbeiter verwalten zu können.                   |
| 6    | Muss            | Funktional | Als Benutzer möchte ich aussagekräftige Fehlermeldungen erhalten, um zu verstehen, wenn etwas schief geht.       |
| 7    | Muss            | Funktional | Als Benutzer möchte ich eine 404-Seite erhalten, wenn ich eine nicht vorhandene Route aufrufe.                   |
| 8    | Muss            | Funktional | Als Benutzer möchte ich eine Bestätigungsnachricht sehen, wenn ich erfolgreich mit der Datenbank verbunden bin.  |

## 2 Planen

### Arbeitspakete

- Projektdokumentation erstellen
- Planen + Dokumantation
- Server mit Express.js einrichten.
- Benutzerregistrierung implementieren.
- Benutzer-Authentifizierung implementieren.
- Sitzungserneuerung implementieren.
- Benutzerabmeldung implementieren.
- Mitarbeiter-API implementieren.
- Fehlerbehandlung implementieren.
- 404-Seite für nicht vorhandene Routen implementieren.
- Datenbankverbindung mit MongoDB implementieren.

## E - Entscheidung

Entscheidungen, die während des Projekts getroffen werden mussten:

- **Wahl des Technologie-Stacks:** Ich haben uns für Node.js und Express.js für das Backend entschieden, da sie einfach und effizient sind. MongoDB wurde als Datenbank gewählt, weil es flexibel und skalierbar ist.
- **Fehlerbehandlungsstrategie:** Ich haben uns entschieden, eine Middleware-Funktion für die Fehlerbehandlung zu verwenden, um den Code sauber und wartbar zu halten.
- **Authentifizierungsmethode:** Ich haben uns entschieden, JWT für die Authentifizierung zu verwenden, da es sicher und einfach ist.
- **Datenbankverbindungsstrategie:** Ich haben uns entschieden, die Verbindung zur Datenbank einmal beim Start des Servers herzustellen und eine Bestätigungsnachricht für eine erfolgreiche Verbindung zu protokollieren.

## R - Realisierung

Das Projekt wurde wie geplant realisiert, wobei alle User Stories und Arbeitspakete erfolgreich implementiert wurden.

## K - Kontrolle

### 5.1 Testfälle

| TC-№ | Ausgangslage                              | Eingabe               | Erwartete Ausgabe                                      |
| ---- | ----------------------------------------- | --------------------- | ------------------------------------------------------ |
| 1.1  | Der Server ist gestartet                  | -                     | 200-Statuscode und Bestätigungsnachricht               |
| 2.1  | Ein Benutzer registriert sich             | Gültige Benutzerdaten | 200-Statuscode und Bestätigungsnachricht               |
| 3.1  | Ein Benutzer authentifiziert sich         | Gültige Anmeldedaten  | 200-Statuscode und JWT-Token                           |
| 4.1  | Eine Sitzung soll erneuert werden         | Gültiger JWT-Token    | 200-Statuscode und neuer JWT-Token                     |
| 5.1  | Ein Benutzer meldet sich ab               | Gültiger JWT-Token    | 200-Statuscode und Bestätigungsnachricht               |
| 6.1  | Zugriff auf die Mitarbeiter-API           | Gültiger JWT-Token    | 200-Statuscode und Liste von Mitarbeitern              |
| 7.1  | Anfrage an eine nicht vorhandene Route    | -                     | 404-Statuscode und 404-Seite                           |
| 8.1  | Der Server startet und verbindet zur DB   | -                     | Bestätigungsnachricht in der Konsole für DB-Verbindung |

### 5.2 Testprotokoll

| TC-№ | Datum     | Resultat | Tester  |
| ---- | --------- | -------- | ------- |
| 1.1  | 19.06.24  | OK       | Giovanni|
| 2.1  | 19.06.24  | OK       | Giovanni|
| 3.1  | 19.06.24  | OK       | Giovanni|
| 4.1  | 19.06.24  | OK       | Giovanni|
| 5.1  | 19.06.24  | OK       | Giovanni|
| 6.1  | 19.06.24  | OK       | Giovanni|
| 7.1  | 19.06.24  | OK       | Giovanni|
| 8.1  | 19.06.24  | OK       | Giovanni|

## Auswertung

Eine genaue Auswertung mit Reflexion und Verifizierung durch Printscreens findet ihr [hier in meinem Portfolio.](https://portfolio.bbbaden.ch/view/view.php?t=919e0cd919fbae6731ee)
