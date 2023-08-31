import { ButtonType } from "../Enum/ButtonEnum";
import { Side } from "../Enum/SideEnum";
import { Auto } from "../Models/Auto";
import { User } from "../Models/User";
import { BrojPoena } from "../Enum/BrojPoenaEnum";
import { getAllCars, GetCar, GetNewOne } from "./observables";


export function FormatAcceleration(Acceleration:number)
{
    let UnFormattedReversed=Acceleration.toString().split("").reverse();
    let ToBeFormatted: string[]=[];
    for(let i=0;i<UnFormattedReversed.length;i++)
    {
        if(i!=0 && i%3==0)
            {
                ToBeFormatted.push(".");
                ToBeFormatted.push(UnFormattedReversed[i]);
            }
        else ToBeFormatted.push(UnFormattedReversed[i]);
    }
    //pogledati sta je gi
    return ToBeFormatted.reverse().toString().replace(/,/gi,"")+"km/h";
}

export async function DrawCars(Cars:Auto[],CarNameLabel: HTMLLabelElement[], CarAccLabel: HTMLLabelElement[], SlikeAuta: HTMLImageElement[],BrojAuta: number) {
    for(let i=0;i<Cars.length;i++)
    {
     
        do{
            Cars[i]= await GetCar(BrojAuta);
        }        
        while(Cars[i].ime==CarNameLabel[Side.Leva].innerHTML);      

        CarNameLabel[i].innerHTML=Cars[i].ime;
        CarAccLabel[i].innerHTML=FormatAcceleration(Cars[i].vremeAuta);
        //SlikeAuta[i].src=Cars[i].slikaAuta;

        // Kreiranje nove instance HTMLImageElement
        const newImageElement = new Image();

        // Postavljanje putanje slike na novi element
        newImageElement.src = Cars[i].slikaAuta;

        // Postavljanje putanje slike na stari element tek nakon što se nova slika učita
        if (SlikeAuta[i] !== null) {
          // Postavljanje putanje slike na stari element tek nakon što se nova slika učita
          newImageElement.onload = () => {
              SlikeAuta[i].src = newImageElement.src;
          };
      }


            console.log(Cars[i].slikaAuta);
            const imgElement = SlikeAuta[i];
            if (!imgElement) {
                console.error(`Element za sliku broj ${i} nije pronađen.`);
            }

    }
    if(CarAccLabel[Side.Desna]!=null){
    CarAccLabel[Side.Desna].style.visibility="hidden";    
    }
}

export function ContinueGame(Cars:Auto[],CarNameLabel: HTMLLabelElement[], CarAccLabel: HTMLLabelElement[], SlikeAuta: HTMLImageElement[],BrojAuta: number,BrojPoenaLabel: HTMLLabelElement[],Igrac:User)
{

    Igrac.score++;
    if(BrojPoenaLabel[BrojPoena.Trenutni]!=null){
    BrojPoenaLabel[BrojPoena.Trenutni].innerHTML=Igrac.score.toString();
    }
    const AccelerationArray= Cars.filter((item)=>item.vremeAuta>0).map(
        (item)=>item.id
    );
    
    const fetchObs=GetNewOne(
        AccelerationArray[Side.Leva],
        AccelerationArray[Side.Desna],
        BrojAuta
    )

    fetchObs.subscribe((NewCar:Auto)=>
    {
        CarNameLabel[Side.Leva].innerHTML= CarNameLabel[Side.Desna].innerHTML;
        CarAccLabel[Side.Leva].innerHTML=CarAccLabel[Side.Desna].innerHTML;        
        SlikeAuta[Side.Leva].src=SlikeAuta[Side.Desna].src;
        Cars[Side.Leva] = Cars[Side.Desna];
        Cars[Side.Desna] = NewCar;


        CarNameLabel[Side.Desna].innerHTML = NewCar.ime;
        CarAccLabel[Side.Desna].innerHTML = FormatAcceleration(NewCar.vremeAuta);
        SlikeAuta[Side.Desna].src = NewCar.slikaAuta;
        CarAccLabel[Side.Desna].style.visibility = "hidden";
    })
}

export function StopAndRestart(Cars:Auto[],CarNameLabel: HTMLLabelElement[], CarAccLabel: HTMLLabelElement[], SlikeAuta: HTMLImageElement[],BrojAuta: number,BrojPoenaLabel: HTMLLabelElement[],Igrac:User) {
    if (Igrac.score > Igrac.highScore) {
      Igrac.highScore = Igrac.score;
      BrojPoenaLabel[BrojPoena.Max].innerHTML = Igrac.highScore.toString();
      localStorage.setItem("HighScore", Igrac.highScore.toString());
    }
    Igrac.score = 0;
    if(BrojPoenaLabel[BrojPoena.Trenutni]!=null){
    BrojPoenaLabel[BrojPoena.Trenutni].innerHTML = Igrac.score.toString();
    }
    DrawCars(Cars, CarNameLabel, CarAccLabel, SlikeAuta, BrojAuta);
  }


  export function SolveProblem(Left: number,Right: number,Cars:Auto[], CarNameLabel: HTMLLabelElement[], CarAccLabel: HTMLLabelElement[], SlikeAuta: HTMLImageElement[],BrojPoena: HTMLLabelElement[], BrojAuta: number, Igrac: User, ButtonActivated: ButtonType, Btns: HTMLButtonElement[], MsgModal: HTMLElement) 
  {
    CarAccLabel[Side.Desna].style.visibility = "visible";
    EnableOrDisableButtons(Btns);
    setTimeout(() => {
      switch (ButtonActivated) {
        case ButtonType.Veca:
          if (Left <= Right) {
            ContinueGame(
                Cars,
                CarNameLabel,
                CarAccLabel,
                SlikeAuta,
                BrojAuta,
                BrojPoena,
                Igrac
            );
            EnableOrDisableButtons(Btns);
          } else {
            MsgModal.style.display = "block";
            StopAndRestart(
                Cars,
                CarNameLabel,
                CarAccLabel,
                SlikeAuta,
                BrojAuta,
                BrojPoena,
                Igrac
            );
            EnableOrDisableButtons(Btns);
          }
  
          break;
        case ButtonType.Manja:
          if (Left >= Right) {
            ContinueGame(
                Cars,
                CarNameLabel,
                CarAccLabel,
                SlikeAuta,
                BrojAuta,
                BrojPoena,
                Igrac
            );
            EnableOrDisableButtons(Btns);
          } else {
            MsgModal.style.display = "block";
            StopAndRestart(
                Cars,
                CarNameLabel,
                CarAccLabel,
                SlikeAuta,
                BrojAuta,
                BrojPoena,
                Igrac
            );
            EnableOrDisableButtons(Btns);
  
            break;
          }
      }
    }, 1500);
  }

  export async function GetNumberOfCars() {
    let CarsList: Auto[] = [];
    CarsList = await getAllCars();
    return CarsList.length;
  }
  function EnableOrDisableButtons(BtnList: HTMLButtonElement[]) {
    BtnList.forEach((Button) => (Button.hidden = !Button.hidden));
  }









