import {
    DrawCars,
    GetNumberOfCars,
    SolveProblem,
  } from "./Logic/utilities";
  import { CloseMessage, SetupButtons, GetUserName } from "./Logic/observables";
  import { Auto } from "./Models/Auto";
  import { User } from "./Models/User";
  import { Side } from "./Enum/SideEnum";
  import { BrojPoena } from "./Enum/BrojPoenaEnum";
  import { ButtonType } from "./Enum/ButtonEnum";
  //import { showStats } from "./View/View";
  import { Subject, takeUntil } from "rxjs";
 
  export const BROJ_AKTIVNIH_AUTA = 2;

  const Unsubscribe$: Subject<void> = new Subject<void>();
  
  const CarNameLabel: HTMLLabelElement[] = [];
  const CarAccLabel: HTMLLabelElement[] = [];
  const BrojPoenaLabel: HTMLLabelElement[] = [];
  const SlikeAuta: HTMLImageElement[] = [];
  const Btns: HTMLButtonElement[] = [];
  const Cars: Auto[] = [];



  
  const UserNameInput: HTMLInputElement = document.getElementById(
    "KIme"
  ) as HTMLInputElement;
  
  const SubmitButton: HTMLButtonElement = document.getElementById(
    "BtnPotvrdi"
  ) as HTMLButtonElement;

    
  const SubmitButtonForMsg: HTMLButtonElement = document.getElementById(
    "BtnPotvrdiMsg"
  ) as HTMLButtonElement;
  
  const ActiveModal: HTMLElement = document.getElementById("myModal");

  const MsgModal: HTMLElement = document.getElementById("myModalMsg");

  
  let Igrac: User;
  let BrojAuta: number;
  

  async function SetElements() {
    CarNameLabel[Side.Leva] = document.getElementById(
      "AccNameL"
    ) as HTMLLabelElement;
  
    CarNameLabel[Side.Desna] = document.getElementById(
      "AccNameR"
    ) as HTMLLabelElement;

  
    CarAccLabel[Side.Leva] = document.getElementById(
      "AccL"
    ) as HTMLLabelElement;
  
    CarAccLabel[Side.Desna] = document.getElementById(
      "AccR"
    ) as HTMLLabelElement;
  
    SlikeAuta[Side.Leva] = document.getElementById(
      "photoCarL"
    ) as HTMLImageElement;
  
    SlikeAuta[Side.Desna] = document.getElementById(
      "photoCarR"
    ) as HTMLImageElement;
    

    Btns[ButtonType.Veca] = document.getElementById(
      "btn-veca"
    ) as HTMLButtonElement;
  
    Btns[ButtonType.Manja] = document.getElementById(
      "btn-manja"
    ) as HTMLButtonElement;
  
    BrojPoenaLabel[BrojPoena.Trenutni] = document.getElementById(
      "brPoena"
    ) as HTMLLabelElement;
  
    BrojPoenaLabel[BrojPoena.Max] = document.getElementById(
      "maxPoena"
    ) as HTMLLabelElement;

    
    BrojAuta = await GetNumberOfCars();
  
   for (let i = 0; i < BROJ_AKTIVNIH_AUTA; i++) {
        let newCar: Auto;
        Cars[i] = newCar; 
      }
  
    Igrac = {
      score: 0,
      highScore: 0,
    };
  }

  function SetData() {

    MsgModal.style.display = "none";
    if (localStorage.getItem("username") == null) {
      localStorage.clear();
      ActiveModal.style.display = "block";
      const InputObs$ = GetUserName(UserNameInput, SubmitButton);
  
      InputObs$.pipe(takeUntil(Unsubscribe$)).subscribe((username: string) => {
        localStorage.setItem("username", username);
        if (localStorage.getItem("username") != null) {
          ActiveModal.style.display = "none";
          document.getElementById("UserName").innerHTML = localStorage.getItem("username");
          Unsubscribe$.next();
          Unsubscribe$.complete();
        }
      });
    } else
      document.getElementById("UserName").innerHTML =
        localStorage.getItem("username");
  
    if (localStorage.getItem("HighScore") != null) {
      Igrac.highScore = parseInt(localStorage.getItem("HighScore"));
      BrojPoenaLabel[BrojPoena.Max].innerHTML = Igrac.highScore.toString();
    }
    const MessageSubmitButtonObs$ = CloseMessage(SubmitButtonForMsg);
    MessageSubmitButtonObs$.pipe().subscribe(() => {
      MsgModal.style.display = "none";
    });

  }

  window.onload = async function () {
    await SetElements();
    SetData();
    DrawCars(Cars, CarNameLabel, CarAccLabel, SlikeAuta, BrojAuta);
    let $DugmeEvent = SetupButtons(Btns);


    $DugmeEvent[ButtonType.Veca].subscribe(async function () {
      SolveProblem(
        Cars[Side.Leva].vremeAuta,
        Cars[Side.Desna].vremeAuta,
        Cars,
        CarNameLabel,
        CarAccLabel,
        SlikeAuta,
        BrojPoenaLabel,
        BrojAuta,
        Igrac,
        ButtonType.Veca,
        Btns,
        MsgModal
      );
    });

    $DugmeEvent[ButtonType.Manja].subscribe(async function () {
        SolveProblem(
            Cars[Side.Leva].vremeAuta,
            Cars[Side.Desna].vremeAuta,
            Cars,
            CarNameLabel,
            CarAccLabel,
            SlikeAuta,
            BrojPoenaLabel,
            BrojAuta,
            Igrac,
            ButtonType.Manja,
            Btns,
            MsgModal
        );
      });
      
    };





  



  
  
  
  
  
  
  
  
   
  