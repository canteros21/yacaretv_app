$(document).ready(function()
{
	console.log("ready");
});
var url_service = "http://yacaretv.info/app/php/consultas.php";

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
	var url_service = "http://yacaretv.info/app/php/consultas.php";

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
				strTrabajos += '<a onclick="detallesProyecto('+i+');" href="#detalleProyecto" class="proyecto" id="trabajo_'+i+'"><div class="cont-imagen" style="background: url(http://yacaretv.info/admin/img/'+trabajos.rutaThumb+') no-repeat center top!important;"></div><div class="cont-info"><h5>'+ trabajos.nombre +'</h5><h6>Director: '+trabajos.director+'</h6><div class="btn-ver-mas">Ver avances</div></div></a>';
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
	var url_service = "http://yacaretv.info/app/php/consultas.php";

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
			$("#id_trabajo").val(id);
			
		},
		error: function()
		{
			console.log("todo mal, error");
		}
	});
}

$(".post_comentario").click(function(){
	var comentario 	= $("#comentarios").val();
	var idTrabajo 	= $("#id_trabajo").val();
	var dataComentario = 'enviarComentarios=true&comentario='+comentario+'&idTrabajo='+idTrabajo;

	console.log(dataComentario);

	$.ajax({
		async:true,
		data:dataComentario,
		url:url_service,
		type:'post',
		dataType:'text',
		beforeSend: function()
		{

		},
		success: function(response)
		{
			console.log(response);
			if(response != false)
			{
				$("#contenedor_comentarios").append(response);
			}
			else
			{
				alert("se produjo un error al ingresar el comentario");
			}
		},
		error:function()
		{
			alert("error al comentar");
		}
	});

});