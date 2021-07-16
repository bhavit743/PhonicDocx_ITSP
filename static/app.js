// 
math_dict = {
    'one': '1',
    'two': '2',
    'three': '3',
    'four': '4',
    'five': '5',
    'six': '6',
    'seven': '7',
    'eight': '8',
    'nine': '9',
    'zero' : '0',
    'delta': 'Δ',
    'alpha': 'α',
    'beta': 'β',
    'gamma': 'γ',
    'delta':'δ',
    'epsilon': 'ε',
    'zeta': 'ζ',
    'eta':'η',
    'theta': 'θ',
    'iota': 'ι',
    'kappa':'κ',
    'lamda': 'λ',
    'mu':'μ',
    'nu':'ν',
    'xi':'ξ',
    'pi':'π',
    'rho':'ρ',
    'sigma':'σ'
}

function startConverting()
              {
                // document.getElementById("re").style.visibility = "";   
                var r=document.getElementById('temp');
                var spr=new webkitSpeechRecognition(); //Initialisation of web Kit
                  spr.continuous=false; //True if continous conversion is needed, false to stop transalation when paused 
                  spr.interimResults=true;
                  spr.lang='en-IN'; // Set Input language
                  spr.start(); //Start Recording the voice 
                  var ftr='';
                  spr.onresult=function(event){
                      var interimTranscripts='';
                      for(var i=event.resultIndex;i<event.results.length;i++)
                      {
                          var transcript=event.results[i][0].transcript;
                          transcript.replace("\n","<br>")
                          if(event.results[i].isFinal){
                              ftr+=transcript;
                          }
                          else
                          interimTranscripts+=transcript;
                      };
					  r.innerHTML = ftr ;
					  var temp = r.innerHTML ;
					  $.ajax({
						type: "POST",
						url: "swap.py",
						data: { param: temp}
					  }).done(function( o ) {
						 // do something
						 console.log("success")
					  });
                     
                  };
                  spr.onerror=function(event){};
              }
              $(document).ready(function() {
                  $("#send").click(function(event){
                        $.ajax({
                            type:"POST",
                            url:"/audio_data/",
                            data: {
                                    send : $('#temp').html()
                                    },
                            success: function(){
                                alert("Audio succesfully Submitted");
                            }
                        });
                  });
                });