import { Component, OnInit } from '@angular/core'

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {
  appName = 'MyHorseRegistry'
  studentName = 'Stijn Schep'
  imagePath = 'assets/images/person.jpg'
  studentNumber = '2142553'

  useCases = [
    {
      id: 'UC-01',
      name: 'Inloggen',
      description: 'De actor kan inloggen met een gebruikersnaam en wachtwoord',
      scenario: [
        'Gebruiker vult email en password in en klikt op Inloggen',
        'De applicatie valideert de ingevoerde gegevens.',
        'Indien gegevens correct zijn dan redirect de applicatie naar het startscherm.'
      ],
      actor: 'Alle gebruikers',
      precondition: 'Geen',
      postcondition: 'De actor is ingelogd'
    },
    {
      id: 'UC-02',
      name: 'Wijzigingen bekijken',
      description: 'De actor kan de wijzigingenlijst bekijken',
      scenario: ['Gebruiker klikt op Wijzigingen'],
      actor: 'Alle gebruikers',
      precondition: 'De actor is ingelogd',
      postcondition: 'De actor krijgt een lijst met wijzigingen te zien'
    },
    {
      id: 'UC-03',
      name: 'Wijzigingen aanmaken',
      description: 'De actor kan een wijziging toevoegen aan de lijst met wijzigingen',
      scenario: [
        'Gebruiker klikt op Wijzigingen',
        'Gebruiker klikt op Toevoegen',
        'Gebruiker vult de titel en beschrijving van de wijziging in',
        'Gebruiker klikt op Opslaan'
      ],
      actor: 'Alle gebruikers, exclusief Adverteerder',
      precondition: 'De actor is ingelogd',
      postcondition: 'De wijziging is toegevoegd aan de wijzigingenlijst'
    },
    {
      id: 'UC-04',
      name: 'Wijzigingen updaten',
      description: 'De actor kan een wijziging aanpassen',
      scenario: [
        'Gebruiker klikt op Wijzigingen',
        'Gebruiker klikt op de te updaten wijziging',
        'Gebruiker vult update de wijziging',
        'Gebruiker klikt op Opslaan'
      ],
      actor: 'Alle gebruikers, exclusief Adverteerder',
      precondition: 'De actor is ingelogd',
      postcondition: 'De wijziging is geüpdate'
    },
    {
      id: 'UC-05',
      name: 'Wijzigingen verwijderen',
      description: 'Als een wijziging niet meer doorgevoerd hoeft te worden, dan kan deze verwijderd worden',
      scenario: [
        'Gebruiker klikt op Wijzigingen',
        'Gebruiker klikt op de te verwijderen wijziging',
        'Gebruiker klikt op Verwijderen'
      ],
      actor: 'Alle gebruikers, exclusief Adverteerder',
      precondition: 'De actor is ingelogd, wijziging is niet afgevinkt',
      postcondition: 'De wijziging is verwijderd uit de wijzigingenlijst'
    },
    {
      id: 'UC-06',
      name: 'Wijzigingen afvinken',
      description: 'Als de actor een wijziging heeft doorgevoerd, dan kan de wijziging afgevinkt worden',
      scenario: ['Gebruiker klikt op Wijzigingen', 'Gebruiker klikt op het vinkje naast de wijziging'],
      actor: 'Adverteerder',
      precondition: 'De actor is ingelogd',
      postcondition: 'De wijziging is afgevinkt'
    },
    {
      id: 'UC-07',
      name: 'Wijzigingen afwijzen',
      description: 'Als een wijziging niet doorgevoerd kan worden, dan kan de actor deze afwijzen',
      scenario: ['Gebruiker klikt op Wijzigingen', 'Gebruiker klikt op Afwijzen naast de wijziging'],
      actor: 'Adverteerder',
      precondition: 'De actor is ingelogd en de wijziging is niet afgevinkt',
      postcondition: 'De wijziging staat vermeld als afgewezen in de wijzigingenlijst'
    },
    {
      id: 'UC-08',
      name: 'Paarden bekijken',
      description: 'De actor kan een lijst met paarden bekijken',
      scenario: ['Gebruiker klikt op Paarden'],
      actor: 'Alle gebruikers',
      precondition: 'De actor is ingelogd',
      postcondition: 'Het paard is toegevoegd aan de paardenlijst'
    },
    {
      id: 'UC-09',
      name: 'Paarden toevoegen',
      description: 'De actor kan een nieuw paard aanmaken',
      scenario: [
        'Gebruiker klikt op Paarden',
        'Gebruiker klikt op Toevoegen',
        'Gebruiker vult de gegevens van het paard in',
        'Gebruiker klikt op Opslaan'
      ],
      actor: 'Administrator, Adverteerder',
      precondition: 'De actor is ingelogd',
      postcondition: 'Het paard is toegevoegd aan de paardenlijst'
    },
    {
      id: 'UC-10',
      name: 'Paarden aanpassen',
      description: 'Indien nodig kan de actor een paard aanpassen',
      scenario: [
        'Gebruiker klikt op Paarden',
        'Gebruiker klikt op het aan te passen paard',
        'Gebruiker past de gegevens van het paard aan',
        'Gebruiker klikt op Opslaan'
      ],
      actor: 'Administrator, Adverteerder',
      precondition: 'De actor is ingelogd',
      postcondition: 'De gegevens van het paard zijn geüpdate'
    },
    {
      id: 'UC-11',
      name: 'Paarden verwijderen',
      description: 'Indien nodig kan de actor een paard verwijderen',
      scenario: [
        'Gebruiker klikt op Paarden',
        'Gebruiker klikt op het te verwijderen paard',
        'Gebruiker bevestigt het verwijderen'
      ],
      actor: 'Administrator, Adverteerder',
      precondition: 'De actor is ingelogd',
      postcondition: 'Het paard is verwijderd uit de paardenlijst'
    },
    {
      id: 'UC-12',
      name: 'Websites bekijken',
      description: 'De actor kan een lijst met advertentiewebsites ophalen',
      scenario: ['Gebruiker klikt op Websites'],
      actor: 'Alle gebruikers',
      precondition: 'De actor is ingelogd',
      postcondition: 'De actor krijgt een lijst met websites te zien'
    },
    {
      id: 'UC-13',
      name: 'Paarden op websites bekijken',
      description: 'De actor kan zien welke paarden op een website staan',
      scenario: ['Gebruiker klikt op Websites', 'Gebruiker klikt op een website'],
      actor: 'Alle gebruikers',
      precondition: 'De actor is ingelogd',
      postcondition: 'De actor heeft een lijst met alle paarden die op de geselecteerde website staan'
    },
    {
      id: 'UC-14',
      name: 'Paard aan een website toevoegen',
      description: 'De actor kan voor een website een paard toevoegen',
      scenario: [
        'Gebruiker klikt op Websites',
        'Gebruiker klikt op een website',
        'Gebruiker klikt op Paard Toevoegen',
        'Gebruiker selecteert het gewenste paard'
      ],
      actor: 'Administrator, Adverteerder',
      precondition: 'De actor is ingelogd',
      postcondition: 'Het paard is toegevoegd aan de website'
    },
    {
      id: 'UC-15',
      name: 'Website toevoegen',
      description: 'De actor kan een advertentiewebsite toevoegen',
      scenario: [
        'Gebruiker klikt op Websites',
        'Gebruiker klikt op Toevoegen',
        'Gebruiker vult de gegevens van de website in',
        'Gebruiker klikt op opslaan'
      ],
      actor: 'Administrator, Adverteerder',
      precondition: 'De actor is ingelogd',
      postcondition: 'De nieuwe website staat in de lijst met websites'
    },
    {
      id: 'UC-16',
      name: 'Website aanpassen',
      description: 'De actor kan een website aanpassen',
      scenario: [
        'Gebruiker klikt op Websites',
        'Gebruiker klikt op een website',
        'Gebruiker klikt op Aanpassen',
        'Gebruiker vult de nieuwe gegevens in',
        'Gebruiker klikt op opslaan'
      ],
      actor: 'Administrator, Adverteerder',
      precondition: 'De actor is ingelogd',
      postcondition: 'De website is geüpdate'
    },
    {
      id: 'UC-17',
      name: 'Website verwijderen',
      description: 'De actor kan een website verwijderen',
      scenario: [
        'Gebruiker klikt op Websites',
        'Gebruiker klikt op een website',
        'Gebruiker klikt op Verwijderen',
        'Gebruiker bevestigt het verwijderen'
      ],
      actor: 'Administrator, Adverteerder',
      precondition: 'De actor is ingelogd',
      postcondition: 'De website is verwijderd uit de lijst met websites'
    },
    {
      id: 'UC-18',
      name: 'Reserveringen bekijken',
      description: 'De actor kan een lijst met reserveringen opvragen',
      scenario: ['Gebruiker klikt op Reserveringen'],
      actor: 'Alle gebruikers',
      precondition: 'De actor is ingelogd',
      postcondition: 'De actor heeft een lijst met reserveringen'
    },
    {
      id: 'UC-19',
      name: 'Reservering aanpassen',
      description: 'De actor kan een reservering aanpassen',
      scenario: [
        'Gebruiker klikt op Reserveringen',
        'Gebruiker klikt op Aanpassen',
        'Gebruiker vult de nieuwe gegevens in'
      ],
      actor: 'Administrator, Adverteerder',
      precondition: 'De actor is ingelogd',
      postcondition: 'De reservering is aangepast'
    },
    {
      id: 'UC-20',
      name: 'Reservering toevoegen',
      description: 'De actor kan een nieuwe reservering aanmaken',
      scenario: [
        'Gebruiker klikt op Reserveringen',
        'Gebruiker klikt op Toevoegen',
        'Gebruiker vult de gegevens van de reservering in',
        'Gebruiker klikt op Opslaan'
      ],
      actor: 'Administrator, Adverteerder',
      precondition: 'De actor is ingelogd',
      postcondition: 'De reservering is toegevoegd aan de lijst met reserveringen'
    },
    {
      id: 'UC-21',
      name: 'Reservering verwijderen',
      description: 'De actor kan een reservering verwijderen',
      scenario: [
        'Gebruiker klikt op Reserveringen',
        'Gebruiker klikt op Verwijderen',
        'Gebruiker bevestigt het verwijderen'
      ],
      actor: 'Administrator, Adverteerder',
      precondition: 'De actor is ingelogd',
      postcondition: 'De reservering is verwijderd uit de lijst met reserveringen'
    }
  ]

  constructor() {}

  ngOnInit() {}
}
