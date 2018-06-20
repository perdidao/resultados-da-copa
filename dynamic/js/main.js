console.log('Feito com ♥ por lucasalmeida.cc');
function carregaPartidas(){
  $.ajax({
    url: 'https://world-cup-json.herokuapp.com/matches/today',
    contentType: 'application/json; charset=utf-8',
    dataType: 'jsonp',
    async: true,
    success:function(response){

      var html = '<h1>Partidas do dia</h1>', eventosCasa, eventosFora;

      $.each(response, function(p,partida){
        
        var currentStatus = partida.status;
        
        cidade = partida.venue;
        estadio = partida.location;
        
        datahora = new Date(partida.datetime);
        datahoraTratada = datahora.toString();
        hora = datahoraTratada.split(' ')[4];
        horaTratada = hora.split(':')[0]+'h'+hora.split(':')[1];

        golsCasa = partida.home_team.goals;
        golsFora = partida.away_team.goals;
        
        codigoCasa = partida.home_team.code;
        codigoFora = partida.away_team.code;

        tituloCasa = partida.home_team.country;
        tituloFora = partida.away_team.country;

        nomeCasa = partida.home_team.country.replace(' ','-').toLowerCase();
        nomeFora = partida.away_team.country.replace(' ','-').toLowerCase();

        bandeiraCasa = 'https://cdn.countryflags.com/thumbs/'+nomeCasa+'/flag-800.png';
        bandeiraFora = 'https://cdn.countryflags.com/thumbs/'+nomeFora+'/flag-800.png';

        tempo = partida.time;
        if(tempo == 'half-time'){
          tempoDecorrido = 'Intervalo';
        } else if(tempo == 'full-time'){
          tempoDecorrido = 'Partida encerrada';
        } else if(tempo == null){
          tempoDecorrido = 'Começa em breve';
        } else {
          tempoDecorrido = tempo+' decorridos';
        }

        eventosCasa = '';
        $.each(partida.home_team_events, function(ec, ecasa){
          tipoEvento = ecasa.type_of_event;
          jogadorEvento = ecasa.player;
          tempoEvento = ecasa.time;

          if(tipoEvento == 'substitution-in'){
            eventosCasa += '<li><i class="fas fa-arrow-right green"></i> <strong>'+tempoEvento+'</strong> '+jogadorEvento+'</li>';
          } else if(tipoEvento == 'substitution-out'){
            eventosCasa += '<li><i class="fas fa-arrow-left red"></i> <strong>'+tempoEvento+'</strong> '+jogadorEvento+'</li>';
          } else if(tipoEvento == 'goal'){
            eventosCasa += '<li><i class="fas fa-futbol"></i> <strong>'+tempoEvento+'</strong> '+jogadorEvento+'</li>';
          } else if(tipoEvento == 'goal-penalty'){
            eventosCasa += '<li><i class="fas fa-futbol"></i> <strong>'+tempoEvento+'</strong> '+jogadorEvento+'</li>';
          } else if(tipoEvento == 'goal-own'){
            eventosCasa += '<li><i class="fas fa-futbol red"></i> <strong>'+tempoEvento+'</strong> '+jogadorEvento+'</li>';
          } else if(tipoEvento == 'yellow-card'){
            eventosCasa += '<li><i class="fas fa-square yellow"></i> <strong>'+tempoEvento+'</strong> '+jogadorEvento+'</li>';
          } else if(tipoEvento == 'red-card'){
            eventosCasa += '<li><i class="fas fa-square red"></i> <strong>'+tempoEvento+'</strong> '+jogadorEvento+'</li>';
          } else {
            eventosCasa += '<li><strong>'+tempoEvento+'</strong> '+jogadorEvento+'</li>';
          }

        });

        eventosFora = '';
        $.each(partida.away_team_events, function(ef, efora){
          tipoEvento = efora.type_of_event;
          jogadorEvento = efora.player;
          tempoEvento = efora.time;

          if(tipoEvento == 'substitution-in'){
            eventosFora += '<li>'+jogadorEvento+' <strong>'+tempoEvento+'</strong> <i class="fas fa-arrow-right green"></i></li>';
          } else if(tipoEvento == 'substitution-out'){
            eventosFora += '<li>'+jogadorEvento+' <strong>'+tempoEvento+'</strong> <i class="fas fa-arrow-left red"></i></li>';
          } else if(tipoEvento == 'goal'){
            eventosFora += '<li>'+jogadorEvento+' <strong>'+tempoEvento+'</strong> <i class="fas fa-futbol"></i></li>';
          } else if(tipoEvento == 'goal-penalty'){
            eventosFora += '<li>'+jogadorEvento+' <strong>'+tempoEvento+'</strong> <i class="fas fa-futbol"></i></li>';
          } else if(tipoEvento == 'goal-own'){
            eventosFora += '<li>'+jogadorEvento+' <strong>'+tempoEvento+'</strong> <i class="fas fa-futbol red"></i></li>';
          } else if(tipoEvento == 'yellow-card'){
            eventosFora += '<li>'+jogadorEvento+' <strong>'+tempoEvento+'</strong> <i class="fas fa-square yellow"></i></li>';
          } else if(tipoEvento == 'red-card'){
            eventosFora += '<li>'+jogadorEvento+' <strong>'+tempoEvento+'</strong> <i class="fas fa-square red"></i></li>';
          } else {
            eventosFora += '<li>'+jogadorEvento+' <strong>'+tempoEvento+'</strong></li>';
          }

        });

        switch(currentStatus){
          
          // Partida rolando
          case 'future':
          html+='<section id="partida">'+
          '<p class="info">'+horaTratada+' no '+estadio+' em '+cidade+'</p>'+
          '<p class="placar">'+
          '  <span class="bandeira"><img src="'+bandeiraCasa+'" alt=""></span> '+
          tituloCasa+
          '  <strong>'+golsCasa+'</strong>'+
          '  <i class="fas fa-times"></i>'+
          '  <strong>'+golsFora+'</strong> '+
          tituloFora+
          '  <span class="bandeira"><img src="'+bandeiraFora+'" alt=""></span>'+
          '</p>'+
          '<p class="tempo"><i class="fas fa-clock"></i> '+tempoDecorrido+'</p>'+
          '</section>'; 
          break;

          // Padrão
          default:
          html+='<section id="partida">'+
          '<p class="info">'+horaTratada+' no '+estadio+' em '+cidade+'</p>'+
          '<p class="placar">'+
          '  <span class="bandeira"><img src="'+bandeiraCasa+'" alt=""></span> '+
          tituloCasa+
          '  <strong>'+golsCasa+'</strong>'+
          '  <i class="fas fa-times"></i>'+
          '  <strong>'+golsFora+'</strong> '+
          tituloFora+
          '  <span class="bandeira"><img src="'+bandeiraFora+'" alt=""></span>'+
          '</p>'+
          '<p class="tempo"><i class="fas fa-clock"></i> '+tempoDecorrido+'</p>'+
          '<ul class="lances home">'+
          eventosCasa+
          '</ul>'+
          '<ul class="lances away">'+
          eventosFora+
          '</ul>'+
          '</section>'; 

        }
        
      });

      $('#partidas').html(html);

    }
  });
}

placarAway = 0;
placarHome = 0;

function notificaGol(){
  $.ajax({
    url: 'https://world-cup-json.herokuapp.com/matches/today',
    contentType: 'application/json; charset=utf-8',
    dataType: 'jsonp',
    async: true,
    success:function(r){
      
      $.each(r,function(p,partida){

        if(partida.status == 'in progress'){
          if(placarHome != partida.home_team.goals){
            OneSignal.sendSelfNotification(
              "Gol!!! ⚽",
              partida.home_team.code + " " + partida.home_team.goals + " x " + partida.away_team.goals + " " + partida.away_team.code,
              'http://www.lucasalmeida.cc/copa',
              'https://onesignal.com/images/notification_logo.png',
              {
                notificationType: 'news-feature'
              }, 
              [{
                id: 'like-button',
                text: 'Placar',
                icon: 'http://i.imgur.com/N8SN8ZS.png',
                url: 'http://www.lucasalmeida.cc/copa'
              }]
            );
            placarHome = partida.home_team.goals;
          } else if(placarAway != partida.away_team.goals){
            OneSignal.sendSelfNotification(
              "Gol!!! ⚽",
              partida.home_team.code + " " + partida.home_team.goals + " x " + partida.away_team.goals + " " + partida.away_team.code,
              'http://www.lucasalmeida.cc/copa',
              'https://onesignal.com/images/notification_logo.png',
              {
                notificationType: 'news-feature'
              }, 
              [{
                id: 'like-button',
                text: 'Placar',
                icon: 'http://i.imgur.com/N8SN8ZS.png',
                url: 'http://www.lucasalmeida.cc/copa'
              }]
            );
            placarAway = partida.away_team.goals;
          }
        }

      });

    }
  });
}

$(document).ready(function(){
  carregaPartidas();
});

setInterval(function(){
  carregaPartidas();
  notificaGol();
},30000);