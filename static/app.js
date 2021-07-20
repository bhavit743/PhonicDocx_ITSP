var spr=new webkitSpeechRecognition();
function startConverting()
              {
                // document.getElementById("re").style.visibility = "";   
                var r=document.getElementById("textarea1");
                 //Initialisation of web Kit
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
function stopConverting(){
    spr.stop();
    console.log("stop")
};          
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
                
                function refine(){
                    var str = document.getElementById("textarea2").value;
                    document.getElementById("textarea2").value = str.replace('∫', '<strong>Hi</strong>');
                    var rough = document.getElementById("textarea2").value;
                    var elem = document.createElement('div');
                    elem.innerHTML = rough;
                     put = elem.getElementsByTagName('strong');
                     document.getElementsByClassName('tempp').innerHTML = rough

                    // console.log(rough)
                    // var refined = new DOMParser().parseFromString(rough, "text/html")
                    // console.log(refined.firstChild.firstChild)
                    // var refined = new DOMParser().parseFromString(rough, "text/html");
                    // document.getElementById("textarea2").value = refined.firstChild.firstChild.innerHTML;
                    // var elem = document.createElement('div');
                    // elem.id = "integratesym"
                    // elem.innerHTML="booh"
                    // elem.innerHTML = 
                }