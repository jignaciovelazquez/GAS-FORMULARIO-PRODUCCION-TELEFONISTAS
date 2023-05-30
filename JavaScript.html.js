// Example starter JavaScript for disabling form submissions if there are invalid fields
(() => {
    'use strict'

    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    const forms = document.querySelectorAll('.needs-validation')

    // Loop over them and prevent submission
    Array.from(forms).forEach(form => {
        form.addEventListener('submit', event => {
            if (!form.checkValidity()) {
                event.preventDefault()
                event.stopPropagation()
            }

            form.classList.add('was-validated')
        }, false)
    })
})()

//Star
window.addEventListener('DOMContentLoaded', () => {
    //alert("Se cargo la pagina");
    ModoInicio();

    //const toast = new bootstrap.Toast(document.getElementById("liveToast"));
    //toast.show();
})

//Variables

let cantLllamados = 1;
let contactPrevios = " ";


//Eventos

document.getElementById("BUSCAR").addEventListener('click', () => {
    

    if (document.getElementById("ID").value == "") {
        window.alert("Debes ingresar un numero de ID");
        return
    }
    
    ActivarSpinerBuscar();
    document.getElementById("BUSCAR").disabled = true;
    document.getElementById("BUSCAR").textContent = 'BUSCANDO...';

    let ID = document.getElementById("ID").value;
    google.script.run.withSuccessHandler(function (output) {


      if ((output[0] == "") && (output[1] == "")&& (output[2] == "")&& (output[3] == "")&& (output[4] == "")) {
            window.alert(`El ID: ${ID} no fue ubicado dentro de la Planilla 1.5.20 GENERAL PDT y PDR`);
            return
      }

      document.getElementById("BUSCAR").disabled = false;
      document.getElementById("BUSCAR").textContent = 'BUSCAR';
      console.log("Contesto: ",output);
      //DesactivarSpinerBuscar();
      //console.log("Encontro: ",output)
      document.getElementById("TELEF").value = output[0];
      document.getElementById("ROL").value = output[1];
      document.getElementById("TGESTION").value = output[2];
      document.getElementById("TLFNO").value = output[3];
      document.getElementById("OBS").value = output[4];
      document.getElementById("OBS").value = output[4];
      document.getElementById("SUBESTANALISIS").value = output[6];
      document.getElementById("DIRECCION").value = output[7];
      

      let largoOBS = Math.ceil(output[4].length/52)+CuentaEnter(output[4]);
      if (largoOBS == 1){largoOBS=2;}
      document.getElementById("OBS").rows = largoOBS;


      let largoSUBESTANALISIS = Math.ceil(output[6].length/52)+CuentaEnter(output[6]);
      document.getElementById("SUBESTANALISIS").rows = largoSUBESTANALISIS;


      document.getElementById("IdEnConsulta").href = "http://crm.telecentro.local//Edificio/ConsultaEdificioNew.aspx?edificioid="+ID;

      document.getElementById("ObservacionEnConsulta").href = "http://crm.telecentro.local//Edificio/Gt_Edificio/DatosComercialesNew.aspx?GtEdificioId="+output[5];

      document.getElementById("AgendamientodeOrden").href = "http://crm.telecentro.local/Edificio/Gt_Edificio/AgendamientoOrdenes.aspx?GtEdificioId="+output[5]+"&EstadoGestionId=4&EdificioId="+ID+"&TipoGestionId=3";
      
      if ((output[1]=="Rol 5") || (output[1]=="Rol 6")){
        document.getElementById("TIPOLLAMADO").value = "Agenda Obra";
      }

        
    }).buscarID(ID);

})



document.getElementById("FORMULARIO").addEventListener('submit', () => {


    if (validarCampos()) {
    alert("Debe completar todos los campos")
    return
    }else{

        ActivarSpiner("SPINER_GENERAR");
        document.getElementById("GENERARLOGRADO").disabled = true;
        document.getElementById("GENERARLOGRADO").textContent = 'Generando Formulario...';


        CampoID = document.getElementById("ID").value;
        CampoTIPOLLAMADO = document.getElementById("TIPOLLAMADO").value;
        CampoTELEF = document.getElementById("TELEF").value;
        CampoROL = document.getElementById("ROL").value;
        CampoTGESTION = document.getElementById("TGESTION").value;
        CampoOBS = document.getElementById("OBS").value;
        CampoTLFNO = document.getElementById("TLFNO").value;
        CampoESTADO = document.getElementById("ESTADO").value;
        CampoCONTACTO = document.getElementById("CONTACTO").value;
        CampoPISOCONTACTO = document.getElementById("PISOCONTACTO").value;
        CampoHora1 = document.getElementById("HORA1").value+":00";
        CampoFecha = document.getElementById("FECHA").value;
        CampoOBS3 = document.getElementById("OBS3").value;

        HORA = new Date().toLocaleString();
        DiaMes = "("+(new Date().getDate())+"/"+(new Date().getMonth()+1)+")"
        
        FORMATO = `${DiaMes} - ${CampoTELEF.slice(0,4)} - Estado: ${CampoESTADO} - ${CampoCONTACTO} - ${CampoPISOCONTACTO} - Fecha de agendamiento: ${CampoFecha} a las ${CampoHora1}. Observación: ${CampoOBS3}.`;

        //CampoFhoraria = `${CampoHora1} a ${CampoHora2}`;
        //CampoTelefonista = `${CampoCodTelef} - ${CampoTelef}`;

        document.getElementById("PARRAFO").value = FORMATO;


        FechaAgenda = `${CampoFecha} ${CampoHora1}`;


        google.script.run.withSuccessHandler(function () {
            window.alert("Actividad cargada correctamente");
            document.getElementById("GENERARLOGRADO").disabled = false;
            document.getElementById("GENERARLOGRADO").textContent = 'GENERAR LOGRADO';
            //DesactivarSpiner("SPINER_GENERAR");
        
        }).Escribir(HORA,CampoTLFNO,CampoTIPOLLAMADO,CampoTELEF,CampoROL,CampoID,CampoTGESTION,CampoESTADO,CampoCONTACTO,FechaAgenda,CampoPISOCONTACTO," "," "," ","1",CampoOBS3);

    }
})

document.getElementById("GENERARRECHAZADO").addEventListener('click', () => {

    console.log("contactPrevios: ",contactPrevios);

    if (validarCampos()) {
    alert("Debe completar todos los campos")
    return
    }else{

        ActivarSpiner("SPINER_GENERAR_RECHAZADO");
        document.getElementById("GENERARRECHAZADO").disabled = true;

        CampoID = document.getElementById("ID").value;
        CampoTIPOLLAMADO = document.getElementById("TIPOLLAMADO").value;
        CampoTELEF = document.getElementById("TELEF").value;
        CampoROL = document.getElementById("ROL").value;
        CampoTGESTION = document.getElementById("TGESTION").value;

        CampoTLFNO = document.getElementById("TLFNO").value;
        CampoESTADO = document.getElementById("ESTADO").value;
        CampoOBS2 = document.getElementById("OBS2").value;

        HORA = new Date().toLocaleString();
        DiaMes = "("+(new Date().getDate())+"/"+(new Date().getMonth()+1)+")"
        
        FORMATO = `${DiaMes} - ${CampoTELEF.slice(0,4)} - Estado: ${CampoESTADO} \n${contactPrevios}`;
 
        document.getElementById("PARRAFO").value = FORMATO;

        document.getElementById("GENERARRECHAZADO").disabled = false;
        document.getElementById("GENERARRECHAZADO").textContent = 'GENERAR RECHAZADO';

        /*

        google.script.run.withSuccessHandler(function () {

          document.getElementById("SEGUIR").disabled = false;
          document.getElementById("SEGUIR").textContent = 'Seguir Llamando';
          cantLllamados += 1;

        }).Escribir(HORA,CampoTLFNO,CampoTIPOLLAMADO,CampoTELEF,CampoROL,CampoID,CampoTGESTION,CampoESTADO," "," "," "," "," "," ","1",CampoOBS2);

        */


    }
})



document.getElementById("AGENDADO").addEventListener('click', () => {
        document.getElementById("ESTADO").value = "Agendado";
        ActivarDatosAgendado();
        DesactivarDatosSeguirLlamando();
        DesactivarNuevoNumero();
        

})

document.getElementById("NOCONTESTA").addEventListener('click', () => {
    ActivarDatosSeguirLlamando();
    DesactivarDatosAgendado();
    
    document.getElementById("ESTADO").value = "No Contesto (Buzón de Voz)";

})


document.getElementById("SEGUIR").addEventListener('click', () => {


    if (validarCampos2()) {
    alert("Debe completar todos los campos")
    return
    }else{

        CampoID = document.getElementById("ID").value;
        CampoTIPOLLAMADO = document.getElementById("TIPOLLAMADO").value;
        CampoTELEF = document.getElementById("TELEF").value;
        CampoROL = document.getElementById("ROL").value;
        CampoTGESTION = document.getElementById("TGESTION").value;

        CampoTLFNO = document.getElementById("TLFNO").value;
        CampoESTADO = document.getElementById("ESTADO").value;
        CampoOBS2 = document.getElementById("OBS2").value;

        guardarLlamadoPrevio();
        document.getElementById("SEGUIR").disabled = true;
        document.getElementById("SEGUIR").textContent = 'Generando Formulario...';

        //ActivarNuevoNumero();

        HORA = new Date().toLocaleString();

        console.log("contactPrevios: ",contactPrevios);

        google.script.run.withSuccessHandler(function () {

          document.getElementById("SEGUIR").disabled = false;
          document.getElementById("SEGUIR").textContent = 'Seguir Llamando';
          cantLllamados += 1;

        }).Escribir(HORA,CampoTLFNO,CampoTIPOLLAMADO,CampoTELEF,CampoROL,CampoID,CampoTGESTION,CampoESTADO," "," "," "," "," "," ","1",CampoOBS2);



    }
})



document.getElementById("COPIAR").addEventListener('click', () => {

        var codigoACopiar = document.getElementById('PARRAFO');
        codigoACopiar.select();
        codigoACopiar.setSelectionRange(0,99999);

        document.execCommand('copy');

      })

/*
document.getElementById("TIPOLLAMADO").addEventListener('change',()=> {
        if (document.getElementById("TIPOLLAMADO").value == "Agenda Obra"){
          document.getElementById("AgendamientodeOrden").href = "http://crm.telecentro.local/Edificio/Gt_Edificio/AgendamientoOrdenes.aspx?GtEdificioId="+output[5]+"&EstadoGestionId=4&EdificioId="+ID+"&TipoGestionId=3";
        } 

        if (document.getElementById("TIPOLLAMADO").value == "Agenda Relevo"){
          document.getElementById("AgendamientodeOrden").href = "http://crm.telecentro.local/Edificio/Gt_Edificio/AgendamientoOrdenes.aspx?GtEdificioId="+output[5]+"&EstadoGestionId=4&EdificioId="+ID+"&TipoGestionId=3";
        }

      })

    */

//----------------------------------------------------------------------------------------------------------
document.getElementById("ENVIAR_TAREA").addEventListener('click', () => {

    if ((!document.getElementById("btnradio0").checked) && (!document.getElementById("btnradio1").checked) && (!document.getElementById("btnradio2").checked) && (!document.getElementById("btnradio3").checked) && (!document.getElementById("btnradio4").checked) && (!document.getElementById("btnradio5").checked) && (!document.getElementById("btnradio6").checked)) {
        window.alert("Debes Seleccionar la Actividad a registrar");
        return
    }
    
    ActivarSpiner("SPINER_ENVIAR_TAREA");
    document.getElementById("ENVIAR_TAREA").disabled = true;
    document.getElementById("ENVIAR_TAREA").textContent = 'Generando Formulario...';
    let comentario = "Sin Comentario";

    google.script.run.withSuccessHandler(function (output) {
        //console.log("Encontro: ",output)
        CampoTELEF = output;


    if (document.getElementById("btnradio0").checked){
        Motivo = "Inicio de Jornada";
        if (document.getElementById("COMENTARIO").value != " "){
            comentario = document.getElementById("COMENTARIO").value;
        }
    }

    if (document.getElementById("btnradio1").checked){
        Motivo = "Almuerzo";
        if (document.getElementById("COMENTARIO").value != " "){
            comentario = document.getElementById("COMENTARIO").value;
        }
    }

    if (document.getElementById("btnradio2").checked){
        Motivo = "Reunion";
        if (document.getElementById("COMENTARIO").value != " "){
            comentario = document.getElementById("COMENTARIO").value;
        }
    }

    if (document.getElementById("btnradio3").checked){
        Motivo = "Break";
        if (document.getElementById("COMENTARIO").value != " "){
            comentario = document.getElementById("COMENTARIO").value;
        }
    }

    if (document.getElementById("btnradio4").checked){
        Motivo = "Permiso";
        if (document.getElementById("COMENTARIO").value != " "){
            comentario = document.getElementById("COMENTARIO").value;
        }
    }

    if (document.getElementById("btnradio5").checked){
        Motivo = "Coaching - Inicio";
        if (document.getElementById("COMENTARIO").value != " "){
            comentario = document.getElementById("COMENTARIO").value;
        }
    }

    if (document.getElementById("btnradio6").checked){
        Motivo = "Coaching - Fin";
        if (document.getElementById("COMENTARIO").value != " "){
            comentario = document.getElementById("COMENTARIO").value;
        }  
    }


    HORA = new Date().toLocaleString();
    //console.log("Hora: ",HORA);

    google.script.run.withSuccessHandler(function () {
      setTimeout(function(){ 
          window.alert("Actividad cargada correctamente");
          document.getElementById("ENVIAR_TAREA").disabled = false;
          document.getElementById("ENVIAR_TAREA").textContent = 'ENVIAR';
          //DesactivarSpiner("SPINER_ENVIAR_TAREA");
          document.getElementById("btnradio0").checked = false;
          document.getElementById("btnradio1").checked = false;
          document.getElementById("btnradio2").checked = false;
          document.getElementById("btnradio3").checked = false;
          document.getElementById("btnradio4").checked = false;
          document.getElementById("btnradio5").checked = false;
          document.getElementById("btnradio6").checked = false;
          document.getElementById("COMENTARIO").value = " ";
      }, 1000);

    }).Escribir(HORA,"111111","Otro",CampoTELEF,"-"," "," ",Motivo," "," "," "," "," "," "," ",comentario);
   

    }).BuscarUser();       

})
//-----------------------------------------------------------------------------------------------------------
/*
document.getElementById("ENVIAR_WASAP").addEventListener('click', () => {

  abrirNuevoTab('https://api.whatsapp.com/send?&text='+`@${CampoTelef} => ID: ${CampoID} Dirección: ${CampoDireccion} Telefonista: ${CampoCodTelef} - ${CampoTelef} Franja horaria de agendamiento: ${CampoHora1} a ${CampoHora2} - ${CampoFecha} Observación: ${CampoObs}\n`)

      })
*/


document.getElementById("BORRAR").addEventListener('click',()=> {
        limpiar();
      })


//Funciones

function abrirNuevoTab(url) {
  // Abrir nuevo tab
  var win = window.open(url, '_blank');
  // Cambiar el foco al nuevo tab (punto opcional)
  win.focus();
}

function limpiar(){

  google.script.run.withSuccessHandler(function() {
    window.open("https://script.google.com/macros/s/AKfycbzTJr06wVqeMcIFvgpWnWsIplL9saDeI1Vxlj6k3WA/dev",'_top');
    }).getScriptURL();

  //location.reload(true);

}

//function actualizar(){location.reload(true);}
//Función para actualizar cada 5 segundos(5000 milisegundos)
//setInterval("actualizar()",5000);


function CuentaEnter(cade){
  let aux=0;
  let cuentaEnter=0;
  while (aux < cade.length){
        if (cade.indexOf("\n") !== -1){
          posicion = cade.indexOf("\n");
          cuentaEnter ++;
          cade = cade.slice(posicion+2)
        }else{break}
        aux++;
      }
  return cuentaEnter;
}

function guardarLlamadoPrevio(){

    CampoTLFNO = document.getElementById("TLFNO").value;
    CampoESTADO = document.getElementById("ESTADO").value;
    CampoNCLIENTE = document.getElementById("NCLIENTE").value;
    CampoOBS2 = document.getElementById("OBS2").value;

    const LlamadoPrevio = document.createElement('DIV');
    const ContenedorPadre = document.getElementById("LLAMADOSANTERIORES");


    LlamadoPrevio.innerHTML = `<div class="row">
                                    <div class="col-sm-12">
                                        <textarea class="form-control" id="LLAMADO${cantLllamados}"rows="5" disabled></textarea>
                                    </div>
                                </div>
                                    
                                    `;
    ContenedorPadre.append(LlamadoPrevio);

    FORMATO = `Llamado Previo N: ${cantLllamados} \nNro. Cliente: ${CampoNCLIENTE} \nTelf. Contactado: ${CampoTLFNO} \nEstado de Contacto: ${CampoESTADO} \nObservacion: ${CampoOBS2}.`;

    contactPrevios = contactPrevios + `${CampoNCLIENTE} Telf:${CampoTLFNO} - ${CampoESTADO}.\n`

    document.getElementById("LLAMADO" + cantLllamados).value = FORMATO;

    document.getElementById("TLFNO").value = "";
    document.getElementById("ESTADO").value = "";
    document.getElementById("OBS2").value = "";
    document.getElementById("NCLIENTE").value = "";

    return contactPrevios;

}

const ModoInicio = () => {
    DesactivarDatosAgendado();
}

const ActivarDatosAgendado = () => {
    document.getElementById("DATOSAGENDADO").classList.add("d-block");
    document.getElementById("DATOSAGENDADO").classList.remove("d-none");
}

const DesactivarDatosAgendado = () => {
    document.getElementById("DATOSAGENDADO").classList.add("d-none");
    document.getElementById("DATOSAGENDADO").classList.remove("d-block");
}

const ActivarDatosSeguirLlamando = () => {
    document.getElementById("DATOSSEGUIRLLAMANDO").classList.add("d-block");
    document.getElementById("DATOSSEGUIRLLAMANDO").classList.remove("d-none");
}

const DesactivarDatosSeguirLlamando = () => {
    document.getElementById("DATOSSEGUIRLLAMANDO").classList.add("d-none");
    document.getElementById("DATOSSEGUIRLLAMANDO").classList.remove("d-block");
}

const ActivarNuevoNumero = () => {
    document.getElementById("NUEVONUMERO").classList.add("d-block");
    document.getElementById("NUEVONUMERO").classList.remove("d-none");
}

const DesactivarNuevoNumero = () => {
    document.getElementById("NUEVONUMERO").classList.add("d-none");
    document.getElementById("NUEVONUMERO").classList.remove("d-block");
}


const ActivarSpinerBuscar = () => {
    document.getElementById("SPINER_BUSCAR").classList.add("spinner-border");
    document.getElementById("SPINER_BUSCAR").classList.add("spinner-border-sm");
}

const DesactivarSpinerBuscar = () => {
    document.getElementById("SPINER_BUSCAR").classList.remove("spinner-border");
    document.getElementById("SPINER_BUSCAR").classList.remove("spinner-border-sm");
}

const ActivarSpiner = (SPINER) => {
    document.getElementById(SPINER).classList.add("spinner-border");
    document.getElementById(SPINER).classList.add("spinner-border-sm");
}

const DesactivarSpiner = (SPINER) => {
    document.getElementById(SPINER).classList.remove("spinner-border");
    document.getElementById(SPINER).classList.remove("spinner-border-sm");
}

function validarCampos() {

  if (cantLllamados != 0){
    if ((document.getElementById("ID").value == "") || (document.getElementById("TIPOLLAMADO").value == "") || (document.getElementById("ROL").value == "") || (document.getElementById("TGESTION").value == "") || (document.getElementById("ESTADO").value == "")) {
        return true
    }

  }else{
    if ((document.getElementById("ID").value == "") || (document.getElementById("TIPOLLAMADO").value == "") || (document.getElementById("ROL").value == "") || (document.getElementById("TGESTION").value == "") || (document.getElementById("TLFNO").value == "") || (document.getElementById("ESTADO").value == "") || (document.getElementById("CONTACTO").value == "") || (document.getElementById("PISOCONTACTO").value == "") || (document.getElementById("HORA1").value == "") || (document.getElementById("FECHA").value == "") || (document.getElementById("OBS3").value == "")) {
        return true
    }
  }
}

function validarCampos2() {
    if ((document.getElementById("ID").value == "") || (document.getElementById("TIPOLLAMADO").value == "") || (document.getElementById("ROL").value == "") || (document.getElementById("TGESTION").value == "") || (document.getElementById("NCLIENTE").value == "") || (document.getElementById("TLFNO").value == "") || (document.getElementById("ESTADO").value == "") || (document.getElementById("OBS2").value == "")) {
        return true
    }
}


/*
const MostrarOBSERVACIONES = () => {
    document.getElementById("OBSERVACION").classList.add("d-block");
    document.getElementById("OBSERVACION").classList.remove("d-none");
}

const OcultarOBSERVACIONES = () => {
    document.getElementById("OBSERVACION").classList.remove("d-block");
    document.getElementById("OBSERVACION").classList.add("d-none");
}

*/





