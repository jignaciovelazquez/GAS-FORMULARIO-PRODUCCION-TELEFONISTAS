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


//Eventos

document.getElementById("BUSCAR").addEventListener('click', () => {

    if (document.getElementById("ID").value == "") {
        window.alert("Debes ingresar un numero de ID");
        return
    }
    
    ActivarSpinerBuscar();
    document.getElementById("BUSCAR").disabled = true;

    let ID = document.getElementById("ID").value;
    google.script.run.withSuccessHandler(function (output) {
        DesactivarSpinerBuscar();
        document.getElementById("BUSCAR").disabled = false;
        console.log("Encontro: ",output)
        document.getElementById("TELEF").value = output[0];
        document.getElementById("ROL").value = output[1];
        document.getElementById("TGESTION").value = output[2];
        document.getElementById("TLFNO").value = output[3];
        document.getElementById("OBS").value = output[4];
        document.getElementById("IdEnConsulta").href = "http://crm.telecentro.local//Edificio/ConsultaEdificioNew.aspx?edificioid="+ID;
        document.getElementById("ObservacionEnConsulta").href = "http://crm.telecentro.local//Edificio/Gt_Edificio/DatosComercialesNew.aspx?GtEdificioId="+output[5];
        
        if ((output[1]=="Rol 5") || (output[1]=="Rol 6")){
          document.getElementById("TIPOLLAMADO").value = "AOBRA";
        }

        
        if ((output[0] == "") && (output[1] == "")&& (output[2] == "")&& (output[3] == "")&& (output[4] == "")) {
            window.alert(`El ID: ${ID} no fue ubicado dentro de la Planilla 1.5.20 GENERAL PDT y PDR`);
            return
        }
        
    }).buscarID(ID);

})



document.getElementById("FORMULARIO").addEventListener('submit', () => {
/*
    if ((document.getElementById("ID").value == "") || (document.getElementById("DIRECCION").value == "") || (document.getElementById("HORA1").value == "") || (document.getElementById("HORA2").value == "") || (document.getElementById("FECHA").value == "") || (document.getElementById("OBS").value == "") || (document.getElementById("TELEF").value == "") || (document.getElementById("DESPACHO").value == "")){
          alert("Debe completar todos los campos")
          return
        }
*/


        document.getElementById("GENERAR").disabled = true;


        CampoID = document.getElementById("ID").value;
        CampoTLFNO = document.getElementById("TLFNO").value;
        CampoTIPOLLAMADO = document.getElementById("TIPOLLAMADO").value;
        CampoTELEF = document.getElementById("TELEF").value;
        CampoROL = document.getElementById("ROL").value;
        CampoTGESTION = document.getElementById("TGESTION").value;
        CampoOBS = document.getElementById("OBS").value;
        CampoESTADO = document.getElementById("ESTADO").value;
        CampoCONTACTO = document.getElementById("CONTACTO").value;
        CampoPISOCONTACTO = document.getElementById("PISOCONTACTO").value;
        CampoHora1 = document.getElementById("HORA1").value;
        CampoFecha = document.getElementById("FECHA").value;
        CampoOBS3 = document.getElementById("OBS3").value;

        HORA = new Date().toLocaleString();
        DiaMes = "("+(new Date().getDate())+"/"+(new Date().getMonth()+1)+")"
        
        FORMATO = `${DiaMes} - ${CampoTELEF.slice(0,4)} - Estado: ${CampoESTADO} - ${CampoCONTACTO} - ${CampoPISOCONTACTO} - Franja de agendamiento: ${CampoFecha} / ${CampoHora1}. Observación: ${CampoOBS3}.`;

        //CampoFhoraria = `${CampoHora1} a ${CampoHora2}`;
        //CampoTelefonista = `${CampoCodTelef} - ${CampoTelef}`;

        document.getElementById("PARRAFO").value = FORMATO;

        console.log("ENTRO");

        //google.script.run.Escribir(CampoID,CampoDireccion,CampoFhoraria,CampoTelefonista,CampoObs,CampoDespacho,HORA);

        setTimeout(function(){ 
          //window.alert("Gestión cargada correctamente");
          document.getElementById("GENERAR").disabled = false;
          }, 2000);


})

document.getElementById("AGENDADO").addEventListener('click', () => {
        document.getElementById("ESTADO").value = "AGENDADO";
        ActivarDatosAgendado();
        DesactivarDatosSeguirLlamando();
        DesactivarNuevoNumero();
        

})

document.getElementById("NOCONTESTA").addEventListener('click', () => {
        document.getElementById("ESTADO").value = "NOCON";
        ActivarDatosSeguirLlamando();
        DesactivarDatosAgendado();

})

document.getElementById("SEGUIR").addEventListener('click', () => {
        ActivarNuevoNumero();

})


document.getElementById("COPIAR").addEventListener('click', () => {

        var codigoACopiar = document.getElementById('PARRAFO');
        codigoACopiar.select();
        codigoACopiar.setSelectionRange(0,99999);

        document.execCommand('copy');

      })

//----------------------------------------------------------------------------------------------------------
document.getElementById("ENVIAR_TAREA").addEventListener('click', () => {

    if ((!document.getElementById("btnradio0").checked) && (!document.getElementById("btnradio1").checked) && (!document.getElementById("btnradio2").checked) && (!document.getElementById("btnradio3").checked) && (!document.getElementById("btnradio4").checked) && (!document.getElementById("btnradio5").checked) && (!document.getElementById("btnradio6").checked)) {
        window.alert("Debes Seleccionar la Actividad a registrar");
        return
    }
    
    ActivarSpinerEnviarTarea();
    document.getElementById("ENVIAR_TAREA").disabled = true;
    let comentario = "Sin Comentario";

    google.script.run.withSuccessHandler(function (output) {
        console.log("Encontro: ",output)
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
    console.log("Hora: ",HORA);

    google.script.run.withSuccessHandler(function () {
      setTimeout(function(){ 
          window.alert("Actividad cargada correctamente");
          document.getElementById("ENVIAR_TAREA").disabled = false;
          DesactivarSpinerEnviarTarea();
          document.getElementById("btnradio0").checked = false;
          document.getElementById("btnradio1").checked = false;
          document.getElementById("btnradio2").checked = false;
          document.getElementById("btnradio3").checked = false;
          document.getElementById("btnradio4").checked = false;
          document.getElementById("btnradio5").checked = false;
          document.getElementById("btnradio6").checked = false;
          document.getElementById("COMENTARIO").value = " ";
      }, 1000);
      
      
    }).Escribir(HORA,"111111","Otro",CampoTELEF,"111111",Motivo," "," "," ",comentario," "," "," "," "," "," ");

    //hora,telfcontacto,tipollamado,telefonista,id,estado,fechaagenda,numvt,motivorechazo,observacionadicional,fechaagendado,nombrecontecto,pisodpto,rol,cantclientesllamados,tipogestion
   

    }).BuscarUser();
    

    //google.script.run.Escribir(HORA,CampoID,CampoTLFNO,CampoTIPOLLAMADO,CampoTELEFCampoROL,CampoTGESTION,CampoOBS,CampoESTADO,CampoCONTACTO,CampoPISOCONTACTO,FORMATO);
        

})
//-----------------------------------------------------------------------------------------------------------

document.getElementById("ENVIAR").addEventListener('click', () => {

  abrirNuevoTab('https://api.whatsapp.com/send?&text='+`@${CampoTelef} => ID: ${CampoID} Dirección: ${CampoDireccion} Telefonista: ${CampoCodTelef} - ${CampoTelef} Franja horaria de agendamiento: ${CampoHora1} a ${CampoHora2} - ${CampoFecha} Observación: ${CampoObs}\n`)

      })



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
        document.getElementById("ID").value = "";
        document.getElementById("DIRECCION").value = "";
        document.getElementById("HORA1").value = "";
        document.getElementById("HORA2").value = "";
        document.getElementById("FECHA").value = "";
        document.getElementById("OBS").value = "";
        document.getElementById("TELEF").value = "";
        document.getElementById("TELEFONISTA").value = "";
        document.getElementById("DESPACHO").value = "";

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

const ActivarSpinerEnviarTarea = () => {
    document.getElementById("SPINER_ENVIAR_TAREA").classList.add("spinner-border");
    document.getElementById("SPINER_ENVIAR_TAREA").classList.add("spinner-border-sm");
}

const DesactivarSpinerEnviarTarea = () => {
    document.getElementById("SPINER_ENVIAR_TAREA").classList.remove("spinner-border");
    document.getElementById("SPINER_ENVIAR_TAREA").classList.remove("spinner-border-sm");
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





