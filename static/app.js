function startConverting()
              {
                // document.getElementById("re").style.visibility = "";   
                var r=document.getElementById("textarea1");
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
                      var old = r.value;
                      r.value = old + ftr;
                      console.log("hi")
                      }
                  };
                  spr.onerror=function(event){};
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
                function savePDF(){
                            const invoice = this.document.getElementById("textarea2");
                            console.log(invoice);
                            console.log("hihih");
                            var opt = {
                                margin: 1,
                                filename: 'myfile.pdf',
                                image: { type: 'jpeg', quality: 0.98 },
                                html2canvas: { scale: 2 },
                                jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
                            };
                            html2pdf().from(invoice).set(opt).save();
                        }
                