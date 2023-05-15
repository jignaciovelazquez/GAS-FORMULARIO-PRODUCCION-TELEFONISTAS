function doGet() {
  var html = HtmlService.createTemplateFromFile('Index.html').evaluate()
  .setTitle("Formulario Telefonistas")
  .setFaviconUrl("https://freepngimg.com/download/telephone/13-2-telephone-free-download-png.png");
  return html

}

function buscarID(id){

  let numero ="";
  let numeros =["1","2","3","4","5","6","7","8","9","0"];
  let roles =["Rol 1","Rol 2","Rol 3","Rol 4","Rol 5","Rol 6","Rol 7","Rol 8","Rol 9"];
  let idGestion;

  let mailUser = BuscarUser();
  
  const libro = SpreadsheetApp.openById("1BpfzUxW_bVG4a5s-LaWoTlI0VzQYTKp6BteowH1sySA");
  const HojaRol = libro.getSheetByName("1.5.7 Obras");
  let ColumnaARol = HojaRol.getRange("A2:A");
  let UltimaFila_HojaRol = ColumnaARol.getValues().filter(String).length;
  let Bandeja_ROL = HojaRol.getRange(2,1,UltimaFila_HojaRol,1).getValues().map(user => user[0].toString());

  //console.log("Bandeja_OBRAS = ",Bandeja_ROL);
  //console.log("Gestiones = ",Bandeja_ROL.length);

  if (Bandeja_ROL.indexOf(id) !== -1){
    let Bandeja_ROLTotal = HojaRol.getRange(2,1,UltimaFila_HojaRol,12).getValues();
    let rol = Bandeja_ROLTotal[Bandeja_ROL.indexOf(id)][6];
    let tipogest = Bandeja_ROLTotal[Bandeja_ROL.indexOf(id)][4];
    let observacion = Bandeja_ROLTotal[Bandeja_ROL.indexOf(id)][8];  
    
    let ubicacion = observacion.search(/\d{8}/);
    for (i=ubicacion;i<=observacion.length;i++){
      if(numeros.indexOf(observacion[i]) !== -1){
        numero+=observacion[i];
      }else{break}
    }
    console.log("Se encontro en 2Export ",id,mailUser,rol,tipogest,numero,observacion,idGestion)
    return [mailUser,rol,tipogest,numero,observacion,idGestion];
  }else{
    const HojaRol = libro.getSheetByName("Asignaciones relevos");
    let ColumnaARol = HojaRol.getRange("A2:A");
    let UltimaFila_HojaRol = ColumnaARol.getValues().filter(String).length;
    let Bandeja_ROL = HojaRol.getRange(2,1,UltimaFila_HojaRol,1).getValues().map(user => user[0].toString());

    if (Bandeja_ROL.indexOf(id) !== -1){
      let Bandeja_ROLTotal = HojaRol.getRange(2,1,UltimaFila_HojaRol,13).getValues();
      let rol = Bandeja_ROLTotal[Bandeja_ROL.indexOf(id)][6];
      rol =  rol.slice(0, 3) + " " + rol.slice(3);
      let tipogest = Bandeja_ROLTotal[Bandeja_ROL.indexOf(id)][2];
      let observacion = Bandeja_ROLTotal[Bandeja_ROL.indexOf(id)][12]; 
      idGestion = Bandeja_ROLTotal[Bandeja_ROL.indexOf(id)][7]; 


      let ubicacion = observacion.search(/\d{8}/);
      for (i=ubicacion;i<=observacion.length;i++){
        if(numeros.indexOf(observacion[i]) !== -1){
          numero+=observacion[i];
        }else{break}
      }
      

      console.log("Se encontro en Asignaciones relevos ",id,mailUser,rol,tipogest,observacion,idGestion)
      return [mailUser,rol,tipogest,numero,observacion,idGestion];

  }else{

      console.log("llego hasta Acceso/QAP/Record");
      const HojaRol = libro.getSheetByName("Acceso/QAP/Record");

      let ColumnaARol = HojaRol.getRange("B3500:B");
      let UltimaFila_HojaRol = ColumnaARol.getValues().filter(String).length;
      let Bandeja_ROL = HojaRol.getRange(3500,2,UltimaFila_HojaRol,1).getValues().map(user => user[0].toString());

      if (Bandeja_ROL.indexOf(id) !== -1){
        console.log("Vio el ID");
        let Bandeja_ROLTotal = HojaRol.getRange(3500,2,UltimaFila_HojaRol,13).getValues();
        let rol = "Rol 1";
        let tipogest = Bandeja_ROLTotal[Bandeja_ROL.indexOf(id)][2];
        let observacion = Bandeja_ROLTotal[Bandeja_ROL.indexOf(id)][8]; 

        let ubicacion = observacion.search(/\d{8}/);
        for (i=ubicacion;i<=observacion.length;i++){
          if(numeros.indexOf(observacion[i]) !== -1){
            numero+=observacion[i];
          }else{break}
        }

        console.log("Se encontro en Acceso/QAP/Record ",id,mailUser,rol,tipogest,observacion,idGestion)
        return [mailUser,rol,tipogest,numero,observacion,idGestion];

    }else{return["","","","",""]}

  }
  }
  
}


function Escribir(hora,telfcontacto,tipollamado,telefonista,id,estado,fechaagenda,numvt,motivorechazo,observacionadicional,fechaagendado,nombrecontecto,pisodpto,rol,cantclientesllamados,tipogestion){
  
  
  console.log("Va a Escribir");
  let UltimaFila;
  const libro = SpreadsheetApp.openById("1L2RVTXg5DLpzWvbu202qGUxu2pRn4JRkAqH-NWhk05g");
  const Hoja = libro.getSheetByName("Respuestas de formulario 1");  

  let ColumnaARol1 = Hoja.getRange("A1:A").getValues().filter(String);
  let UltimaFila1 = ColumnaARol1.length;
  
  let ColumnaARol2 = Hoja.getRange("C1:C").getValues().filter(String);
  let UltimaFila2 = ColumnaARol2.length;

  if (UltimaFila1>UltimaFila2){UltimaFila=UltimaFila1}
  else{UltimaFila=UltimaFila2}

  insertar1 = [[hora,telfcontacto,tipollamado,telefonista,id,estado,fechaagenda,numvt,motivorechazo,observacionadicional,fechaagendado,nombrecontecto,pisodpto,rol,cantclientesllamados,tipogestion]]
  Hoja.getRange(`a${UltimaFila+1}:p${UltimaFila+1}`).setValues(insertar1);

    return
}
	

function BuscarUser(){
  let userActivo = Session.getActiveUser().getEmail();
  Correos = ["2320 - Alejo Arribas","alejoarribas.telecentro@gmail.com","2321 - Nestor Zarlenga","nestorzarlenga32@gmail.com","2322 - Emanuel Ramirez","eramirez.gestion@gmail.com","2323 - Alejandra Suarez","alejandrano455@gmail.com","2325 - Catalina Solmi","catalinagestion69@gmail.com","2326 - Adriana Espinola","aespinola.gestion@gmail.com","Emiliano","emilianoquijano1@gmail.com","Lucas","lucas.gesproce2@gmail.com","Pablo","felininagi@gmail.com","Carlos","carvilla1208@gmail.com","Mara Plaza","maraplaza.gestion@gmail.com","Ignacio","ignaciogproce3@gmail.com"];

  if (Correos.indexOf(userActivo) !== -1){
    userActivo = Correos[Correos.indexOf(userActivo)-1]
  }

  return userActivo


  /*
  const libro = SpreadsheetApp.openById("1jxIyc4bekg-IFt7l618OZaXnh_ZOucvwc0iurRO779Y");
  const Hoja = libro.getSheetByName("Hoja 1");  
  var UltimaFila = Hoja.getLastRow();
  //console.log("Ultima Fila:",UltimaFila)

  var ColumnaA = Hoja.getRange("A1:A");
  var UltimaFila2 = ColumnaA.getValues().filter(String).length;
  //console.log("Ultima Fila2 :",UltimaFila2)

  Hoja.getRange(UltimaFila2+1,1).setValue("userActivo");
  console.log("userActivo")
  Hoja.getRange(UltimaFila2+2,1).setValue(userActivo);
  */

}

function include(filename){
  return HtmlService.createHtmlOutputFromFile(filename)
  .getContent()
}