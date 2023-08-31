
/*export function Draw()
{
    let Conteiner=document.body;
    let PageTop=document.createElement("div");
    let Modal=document.createElement("div");
    let Playfield=document.createElement("div");
    let Fotter=document.createElement("div");

    Conteiner.appendChild(PageTop);
    PageTopF(PageTop);
    Conteiner.appendChild(Modal);
    ModalF(Modal);
    Conteiner.appendChild(Playfield);
    PlayfieldF(Playfield);
    Conteiner.appendChild(Fotter);

}

export function PageTopF(Cont:HTMLDivElement)
{
   
    let navbar=document.createElement("div");
    let img=document.createElement("img");
    img.className="img";
    img.src="assets/imag/navbar-logo.jpg";
    navbar.appendChild(img);

    let label=document.createElement("label");
    label.innerHTML="Stefan";
    navbar.appendChild(label);

    Cont.appendChild(navbar);
}

export function ModalF(Cont:HTMLDivElement)
{
    let div=document.createElement("div");
    
   

    let brBodova=document.createElement("label");
    brBodova.innerHTML="Broj poena:";
    brBodova.className="BrBodova";
    brBodova.id="UserName";
    div.appendChild(brBodova);

    let poeni=document.createElement("label");
    poeni.className="ms-2 BrBodova";
    poeni.id="brPoena";
    poeni.innerHTML="0";
    div.appendChild(poeni);

    let MaxLabel=document.createElement("label");
    MaxLabel.className="ms-5 BrBodova";
    MaxLabel.innerHTML="Najveci broj poena:";
    div.appendChild(MaxLabel);

    let MaxPrikaz=document.createElement("label");
    MaxPrikaz.className="ms-2 BrBodova";
    MaxPrikaz.id="maxPoena";
    MaxPrikaz.innerHTML="0";
    div.appendChild(MaxPrikaz);

    let label=document.createElement("label");
    label.innerHTML="Unesite vase korisnicko ime";
    div.appendChild(label);
    let input=document.createElement("input");
    input.type="text";
    input.id="KIme";
    div.appendChild(input);

    let BtnPotvrdi=document.createElement("button");
    BtnPotvrdi.innerHTML="Potvrdi";
    BtnPotvrdi.type="button";
    BtnPotvrdi.id="BtnPotvrdi";
    BtnPotvrdi.className="btn btn-success close";
    div.appendChild(BtnPotvrdi);

    //Treba se ubaci Pogresili ste i btn za restart deo container

    let cont2=document.createElement("div");
    cont2.className="container";
    let cont3=document.createElement("div");
    cont3.className="modal";
    cont3.id="myModalMsg";
    cont2.appendChild(cont3);
    let h5=document.createElement("h5");
    h5.innerHTML="";
    cont3.appendChild(h5);

    let p=document.createElement("label");
    p.innerHTML="Pogresili ste!!!";
    cont3.appendChild(p);

    let BtnPotvrdiMSG=document.createElement("button");
    BtnPotvrdiMSG.innerHTML="Potvrdi";
    BtnPotvrdiMSG.type="button";
    BtnPotvrdiMSG.id="BtnPotvrdiMsg";
    BtnPotvrdiMSG.className="btn btn-success close";
    div.appendChild(BtnPotvrdiMSG);



    Cont.appendChild(div);

}
 
export function PlayfieldF(Cont:HTMLDivElement)
{
    
    let div=document.createElement("div");
    //Right part
    let imgR=document.createElement("img");
    imgR.className="car rounded-circle";
    imgR.id="photoCarR";
    imgR.src="/src/assets/img/default_car.png";
    div.appendChild(imgR);

    let labelR=document.createElement("label");
    labelR.innerHTML="";
    labelR.id="AccNameR";
    labelR.className="h1-custom";
    div.appendChild(labelR);

    let labelUbrzanjeR=document.createElement("label");
    labelUbrzanjeR.innerHTML="";
    labelUbrzanjeR.id="AccR";
    labelUbrzanjeR.className="h1-custom";
    div.appendChild(labelUbrzanjeR);

    let labelUbrzanjeImeR=document.createElement("label");
    labelUbrzanjeImeR.innerHTML="Ubrzanjem";
    labelUbrzanjeImeR.className="h2-custom";
    div.appendChild(labelUbrzanjeImeR);
    
    //btn part
    let BtnVece=document.createElement("button");
    BtnVece.innerHTML="Veca";
    BtnVece.type="button";
    BtnVece.id="btn-veca";
    BtnVece.className="btn-veca mt-3 font-lexend";
    div.appendChild(BtnVece);

    let BtnManja=document.createElement("button");
    BtnManja.innerHTML="Manja";
    BtnManja.type="button";
    BtnManja.id="btn-manja";
    BtnManja.className="btn-veca mt-3 font-lexend";
    div.appendChild(BtnManja);

    //left part
    let imgL=document.createElement("img");
    imgL.className="car rounded-circle";
    imgL.id="photoCarL";
    imgL.src="/src/assets/img/default_car.png";
    div.appendChild(imgL);

    let labelL=document.createElement("label");
    labelL.innerHTML="";
    labelL.id="AccNameL";
    labelL.className="h1-custom";
    div.appendChild(labelL);

    let labelUbrzanjeL=document.createElement("label");
    labelUbrzanjeL.innerHTML="";
    labelUbrzanjeL.id="AccL";
    labelUbrzanjeL.className="h1-custom";
    div.appendChild(labelUbrzanjeL);

    let labelUbrzanjeImeL=document.createElement("label");
    labelUbrzanjeImeL.innerHTML="Ubrzanjem";
    labelUbrzanjeImeL.className="h2-custom";
    div.appendChild(labelUbrzanjeImeL);

    Cont.appendChild(div);

    


    
}*/

/*export function showStats() {
    // Get the current number of points.
    const points = document.getElementById("brPoena").innerHTML;
  
    // Get the current maximum number of points.
    const maxPoints = document.getElementById("maxPoena").innerHTML;
  
    // Display the stats.
    document.getElementById("UserName").innerHTML = "Korisnik: " + document.getElementById("KIme");
    document.getElementById("brPoena").innerHTML = points;
    document.getElementById("maxPoena").innerHTML = maxPoints;
  }
  
  export function increaseAcceleration() {
    // Get the current acceleration of the car on the right side.
    const acceleration = document.getElementById("AccR").innerHTML;
  
    // Increase the acceleration by 1.
    //acceleration++;
  
    // Update the acceleration.
    document.getElementById("AccR").innerHTML = acceleration;
  }
  
  export function decreaseAcceleration() {
    // Get the current acceleration of the car on the right side.
    const acceleration = document.getElementById("AccR").innerHTML;
  
    // Decrease the acceleration by 1.
    //acceleration--;
  
    // Update the acceleration.
    document.getElementById("AccR").innerHTML = acceleration;
  }
  
  // Call the showStats function when the page loads.
  window.onload = showStats;

*/