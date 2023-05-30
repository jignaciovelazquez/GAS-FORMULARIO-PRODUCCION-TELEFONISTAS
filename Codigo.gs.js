function doGet() {
  var html = HtmlService.createTemplateFromFile('Index.html').evaluate()
  .setTitle("Formulario Telefonistas")
  .setFaviconUrl("https://freepngimg.com/download/telephone/13-2-telephone-free-download-png.png");
  return html

}

function buscarID(id="25094"){

  let numero ="";
  let numeros =["1","2","3","4","5","6","7","8","9","0"];
  let roles =["Rol 1","Rol 2","Rol 3","Rol 4","Rol 5","Rol 6","Rol 7","Rol 8","Rol 9"];
  let rol;
  let idGestion;
  let subAnalasis;
  let tipogest;
  let observacion;
  let direccion;
  let cuentaEnter = 0;
  let mailUser = BuscarUser();

  console.log("Inicia la busqueda",id);
  
  //const libro = SpreadsheetApp.openById("1jxIyc4bekg-IFt7l618OZaXnh_ZOucvwc0iurRO779Y");
  const libro = SpreadsheetApp.openById("1GRTQyazro571ozI_3wRXWhsqwnEVZNEp59x48loRu0A");
  const HojaRol = libro.getSheetByName("2 export");
  let ColumnaARol = HojaRol.getRange("A2:A");
  let UltimaFila_HojaRol = ColumnaARol.getValues().filter(String).length;
  let Bandeja_ROL = HojaRol.getRange(2,1,UltimaFila_HojaRol,1).getDisplayValues().map(user => user[0].toString());

  //console.log("Bandeja_OBRAS = ",Bandeja_ROL);
  //console.log("Gestiones = ",Bandeja_ROL.length);

  if (Bandeja_ROL.indexOf(id) !== -1){
    console.log("Esta en Obras",id);
    let Bandeja_ROLTotal = HojaRol.getRange(2,1,UltimaFila_HojaRol,12).getDisplayValues();
    direccion = Bandeja_ROLTotal[Bandeja_ROL.indexOf(id)][1];
    rol = Bandeja_ROLTotal[Bandeja_ROL.indexOf(id)][6];
    tipogest = Bandeja_ROLTotal[Bandeja_ROL.indexOf(id)][4];
    observacion = Bandeja_ROLTotal[Bandeja_ROL.indexOf(id)][8];
    subAnalasis = Bandeja_ROLTotal[Bandeja_ROL.indexOf(id)][7];
    idGestion = Bandeja_ROLTotal[Bandeja_ROL.indexOf(id)][9];   
    
    let ubicacion = observacion.search(/\d{8}/);
    for (i=ubicacion;i<=observacion.length;i++){
      if(numeros.indexOf(observacion[i]) !== -1){
        numero+=observacion[i];
      }else{break}
    }
    //console.log("Se encontro en 2Export ",id,mailUser,rol,tipogest,numero,observacion,idGestion,subAnalasis,direccion)
    //return [mailUser,rol,tipogest,numero,observacion,idGestion,subAnalasis,direccion];
  }else{
    console.log("No esta en Obras",id);
    const libro = SpreadsheetApp.openById("1F30d7gJtDfvNGkGwcOppYTyue0pWYzqJuQhjtr00jYg");
    const HojaRol = libro.getSheetByName("2 export - Nacho");
    let ColumnaARol = HojaRol.getRange("A2:A");
    let UltimaFila_HojaRol = ColumnaARol.getValues().filter(String).length;
    let Bandeja_ROL = HojaRol.getRange(2,1,UltimaFila_HojaRol,1).getDisplayValues().map(user => user[0].toString());

    if (Bandeja_ROL.indexOf(id) !== -1){
      let Bandeja_ROLTotal = HojaRol.getRange(2,1,UltimaFila_HojaRol,13).getDisplayValues();
      direccion = Bandeja_ROLTotal[Bandeja_ROL.indexOf(id)][1];
      rol = Bandeja_ROLTotal[Bandeja_ROL.indexOf(id)][6];
      //rol =  rol.slice(0, 3) + " " + rol.slice(3);
      tipogest = Bandeja_ROLTotal[Bandeja_ROL.indexOf(id)][2];
      observacion = Bandeja_ROLTotal[Bandeja_ROL.indexOf(id)][12]; 
      subAnalasis = Bandeja_ROLTotal[Bandeja_ROL.indexOf(id)][5];
      idGestion = Bandeja_ROLTotal[Bandeja_ROL.indexOf(id)][7]; 


      let ubicacion = observacion.search(/\d{8}/);
      for (i=ubicacion;i<=observacion.length;i++){
        if(numeros.indexOf(observacion[i]) !== -1){
          numero+=observacion[i];
        }else{break}
      }
      

      //console.log("Se encontro en Asignaciones relevos ",id,mailUser,rol,tipogest,observacion,idGestion,subAnalasis,direccion)
      //return [mailUser,rol,tipogest,numero,observacion,idGestion,subAnalasis,direccion];

  }else{

      console.log("llego hasta Acceso/QAP/Record");
      const libro = SpreadsheetApp.openById("1-yZpZ3SO6OUaVA2rIo5mRcvslPBEebJGxLMjbHv6v5c");
      const HojaRol = libro.getSheetByName("QAP/Recoord/Accesos");

      let ColumnaARol = HojaRol.getRange("B2:B");
      let UltimaFila_HojaRol = ColumnaARol.getValues().filter(String).length;
      let Bandeja_ROL = HojaRol.getRange(2,2,UltimaFila_HojaRol,1).getDisplayValues().map(user => user[0].toString());

      //console.log("Bandeja_ROL:",Bandeja_ROL)

      if (Bandeja_ROL.indexOf(id) !== -1){
        console.log("Vio el ID");
        let Bandeja_ROLTotal = HojaRol.getRange(2,2,UltimaFila_HojaRol,13).getDisplayValues();
        direccion = Bandeja_ROLTotal[Bandeja_ROL.indexOf(id)][1];
        rol = "Rol 1";
        tipogest = Bandeja_ROLTotal[Bandeja_ROL.indexOf(id)][2];
        observacion = Bandeja_ROLTotal[Bandeja_ROL.indexOf(id)][8]; 
        subAnalasis = Bandeja_ROLTotal[Bandeja_ROL.indexOf(id)][3];

        let ubicacion = observacion.search(/\d{8}/);
        for (i=ubicacion;i<=observacion.length;i++){
          if(numeros.indexOf(observacion[i]) !== -1){
            numero+=observacion[i];
          }else{break}
        }

        console.log("Se encontro en Acceso/QAP/Record ",id,mailUser,rol,tipogest,observacion,idGestion,subAnalasis,direccion)
        

    }else{return["","","","",""]}

  }

  }

  console.log("return: ",mailUser,rol,tipogest,numero,observacion,idGestion,subAnalasis,direccion);
  return [mailUser,rol,tipogest,numero,observacion,idGestion,subAnalasis,direccion];
}


function Escribir(hora,telfcontacto,tipollamado,telefonista,rol,id,tipogestion,estado,nombrecontecto,fechaagenda,pisodpto,numvt,motivorechazo,fechaagendado,cantclientesllamados,observacionadicional){
  
  
  //
  let UltimaFila;
  const libro = SpreadsheetApp.openById("1BpfzUxW_bVG4a5s-LaWoTlI0VzQYTKp6BteowH1sySA");
  const Hoja = libro.getSheetByName("Formulario 1.5.20");  
  
  // -------------- Tabla de Pruebas ------------------------
  //const libro = SpreadsheetApp.openById("1jxIyc4bekg-IFt7l618OZaXnh_ZOucvwc0iurRO779Y");
  //const Hoja = libro.getSheetByName("Hoja 1");  


  let ColumnaARol1 = Hoja.getRange("A1:A").getValues().filter(String);
  let UltimaFila1 = ColumnaARol1.length;
  
  let ColumnaARol2 = Hoja.getRange("C1:C").getValues().filter(String);
  let UltimaFila2 = ColumnaARol2.length;

  if (UltimaFila1>UltimaFila2){UltimaFila=UltimaFila1}
  else{UltimaFila=UltimaFila2}

  insertar1 = [[hora,telfcontacto,tipollamado,telefonista,rol,id,tipogestion,estado,nombrecontecto,fechaagenda,pisodpto,fechaagendado,motivorechazo,cantclientesllamados,observacionadicional]]
  Hoja.getRange(`a${UltimaFila+1}:o${UltimaFila+1}`).setValues(insertar1);

    return
}
	

function BuscarUser(){
  let userActivo = Session.getActiveUser().getEmail();
  Correos = ["2320 - Alejo Arribas","alejoarribas.telecentro@gmail.com","2321 - Nestor Zarlenga","nestorzarlenga32@gmail.com","2322 - Emanuel Ramirez","eramirez.gestion@gmail.com","2323 - Alejandra Suarez","alejandrano455@gmail.com","2325 - Catalina Solmi","catalinagestion69@gmail.com","2326 - Adriana Espinola","aespinola.gestion@gmail.com","Emiliano","emilianoquijano1@gmail.com","Lucas","lucas.gesproce2@gmail.com","Pablo","felininagi@gmail.com","Carlos","carvilla1208@gmail.com","Mara Plaza","maraplaza.gestion@gmail.com","Ignacio","ignaciogproce3@gmail.com"];

  if (Correos.indexOf(userActivo) !== -1){
    userActivo = Correos[Correos.indexOf(userActivo)-1]
  }

  return userActivo
}

function getScriptURL() {
  return ScriptApp.getService().getUrl();
}

function include(filename){
  return HtmlService.createHtmlOutputFromFile(filename)
  .getContent()
}