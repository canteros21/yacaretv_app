$(document).ready(function()
{
	console.log("ready");
	
});

$("#botonLogin").click(function(){

	var url_service = "php/consultas.php";
	var usuario = $("#nombredeusuario");
	var password = $("#clave");

	console.log("user: "+usuario.val()+" pass: "+password.val());

	$.ajax({
		async:true,
		url:url_service,
		data:'login=true&usuario='+usuario.val()+"&pass="+password.val(),
		type:'post',
		dataType:'text',
		beforeSend: function()
		{

		},
		success: function(response)
		{
			console.log(response);
			var dataParseada = JSON.parse(response);
			console.log(dataParseada.usuario);




			$("#saludo").append(dataParseada.usuario);
			$.mobile.changePage("#inicioProyectos");
			getDatos();
		},
		error:function()
		{
			console.log("ERROR! login");
		}
	});
});


function getDatos()
{
	var url_service = "php/consultas.php";

	$.ajax({
		async:true,
		url:url_service,
		data:'buscarTrabajos=true',
		type:'post',
		dataType:'text',
		beforeSend: function()
		{

		},
		success: function(response)
		{
			console.log(response);
			
			var dataParseada = JSON.parse(response);


			var strTrabajos = '';
			$.each(dataParseada, function(i, trabajos){
				console.log("i: " + i + " - trabajos: "+trabajos.nombre);
				strTrabajos += '<a onclick="detallesProyecto('+i+');" href="#detalleProyecto" id="trabajo_'+i+'"><h2>'+ trabajos.nombre +'</h2><p>'+trabajos.cliente+'</p><img src="http://yacaretv.info/admin/img/'+trabajos.rutaThumb+'"></div>';
			});

			$("#prueba").html(strTrabajos);


		},
		error: function()
		{
			console.log("todo mal, error");
		}
	});
}

function detallesProyecto(id)
{
	var url_service = "php/consultas.php";

	$.ajax({
		async:true,
		url:url_service,
		data:'detalleTrabajos=true&idTrabajo='+id,
		type:'post',
		dataType:'text',
		beforeSend: function()
		{

		},
		success: function(response)
		{
			console.log(response);
			
			var dataParseada = JSON.parse(response);
			var strEtapas = '';
			$.each(dataParseada, function(i, etapas){
				console.log("i: " + i + " - etapa: "+etapas.titulo);
				strEtapas += '<div id="etapa_'+i+'"><h2>'+ etapas.titulo +'</h2><p>'+etapas.descripcion+'</p><img src="http://yacaretv.info/admin/img/'+etapas.archivo+'"></div>';
			});
			
			$("#contenedorTrabajos").html(strEtapas);
			
		},
		error: function()
		{
			console.log("todo mal, error");
		}
	});
}
