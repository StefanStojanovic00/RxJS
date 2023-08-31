import {
    debounceTime,
    filter,
    from,
    fromEvent,
    merge,
    Observable,
    of,
    switchMap,
  } from "rxjs";
  import { api } from "../api";
  import { ButtonType } from "../Enum/ButtonEnum";
  
  export function GetCar(BrojAuta: number)
  {
    const ID= Math.round(Math.random()*BrojAuta);
    return fetch(api.API_URL+`/Car/?id=${ID}`)
    .then((AutoPackage)=>
    {
        if(AutoPackage.ok) 
            return AutoPackage.json();
        else 
            throw new Error("Auto nije pronadjen");
    })
    .then(function (AutoPackage)
    {
        return AutoPackage[0];
    })
    .catch((err)=>console.log(err));

  }
  export function SetupButtons(Btns: HTMLButtonElement[]) {
    let $DugmeEvent1 = fromEvent(Btns[ButtonType.Veca], "click");
    let $DugmeEvent2 = fromEvent(Btns[ButtonType.Manja], "click");
  
    //prepraviti od zavisnosti sta getElementByID hvata
    let $MobileEvent1 = fromEvent(
      document.getElementById("photoCarR") as HTMLDivElement,
      "click"
    );
    let $MobileEvent2 = fromEvent(
      document.getElementById("photoCarL") as HTMLDivElement,
      "click"
    );
  
    $DugmeEvent1 = merge($DugmeEvent1, $MobileEvent1);
    $DugmeEvent2 = merge($DugmeEvent2, $MobileEvent2);
  
    let ObsArr$: Observable<Event>[] = [];
    ObsArr$[ButtonType.Veca] = $DugmeEvent1.pipe(debounceTime(500));
    ObsArr$[ButtonType.Manja] = $DugmeEvent2.pipe(debounceTime(500));
    return ObsArr$;
  }
  
  export function GetNewOne(IDPrvogAuta:number, IDDrugogAuta:number,BrojAuta:number)
  {
    let SearchID=IDPrvogAuta;
    while(SearchID==IDPrvogAuta || SearchID==IDDrugogAuta)
    {
        SearchID=Math.round(Math.random()*BrojAuta);
    }

    return from(
        fetch(api.API_URL+`/Car/?id=${SearchID}`)
        .then((AutoPackage)=>
        {
            if(AutoPackage.ok)
                return AutoPackage.json();
            else    
                throw new Error("Auto nije pronadjen");
        })
        .then(function(AutoPackage){
            return AutoPackage[0];
        })
        .catch((err)=>console.log(err))
    );
  }

  export function GetUserName(Input: HTMLInputElement,SubmitButton: HTMLButtonElement)
  {
    return fromEvent(SubmitButton,"click").pipe(
        switchMap(()=>of(Input.value.toString())),
        filter((KorisnickoIme:string)=>KorisnickoIme.length>3)
    );
  }

  export function CloseMessage(SubmitButton:HTMLButtonElement)
  {
    return fromEvent(SubmitButton,"click");
  }

  export function getAllCars()
  {
    return fetch(api.API_URL+`/Car/`)
        .then((AutoPackage)=>
        {
            if(AutoPackage.ok)
                return AutoPackage.json();
            else 
                throw new Error("Auto nije pronadjen");
        })
        .then(function(AutoPackage)
        {
            return AutoPackage;
        })
        .catch((err)=>console.log(err));
  }
