// /*!
//  * http://suyati.github.io/line-control
//  * LineControl 1.1.0
//  * Copyright (C) 2014, Suyati Technologies
//  * This program is free software; you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation; either version 2 of the License, or (at your option) any later version.
// This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.
// You should have received a copy of the GNU General Public License along with this library; if not, write to the Free Software Foundation, Inc., 59 Temple Place, Suite 330, Boston, MA 02111-1307 USA
//  *
// */

// (function( $ ){
// 	var editorObj;
// 	var methods = {
// 		saveSelection: function() {
// 			//Function to save the text selection range from the editor
// 			$(this).data('editor').focus();
// 		    if (window.getSelection) {
// 		        sel = window.getSelection();
// 		        if (sel.getRangeAt && sel.rangeCount) {
// 		            $(this).data('currentRange', sel.getRangeAt(0));
// 		        }
// 		    } else if (document.selection && document.selection.createRange) {
// 		        $(this).data('currentRange',document.selection.createRange());
// 		    }
// 		    else
// 		    	$(this).data('currentRange', null);
// 		},

// 		restoreSelection: function(text,mode) {
// 			//Function to restore the text selection range from the editor
// 			var node;
// 			typeof text !== 'undefined' ? text : false;
// 			typeof mode !== 'undefined' ? mode : "";
// 			var range = $(this).data('currentRange');
// 		    if (range) {
// 		        if (window.getSelection) {
// 		        	if(text){
// 		            	range.deleteContents();
// 		            	if(mode=="html")
// 	            		{
//     			            var el = document.createElement("div");
// 				            el.innerHTML = text;
// 				            var frag = document.createDocumentFragment(), node, lastNode;
// 				            while ( (node = el.firstChild) ) {
// 				                lastNode = frag.appendChild(node);
// 				            }
// 				            range.insertNode(frag);
// 	            		}
// 		            	else
//             				range.insertNode( document.createTextNode(text) );

// 		            }
// 		            sel = window.getSelection();
// 		            sel.removeAllRanges();
// 		            sel.addRange(range);		            
// 		        }
// 		        else if (document.selection && range.select) {
// 		            range.select();
// 		            if(text)
// 		            {
// 		            	if(mode=="html")
// 		            		range.pasteHTML(text);
// 		            	else
// 		            		range.text = text;
// 		            }
// 		        }
// 		    }
// 		},

// 		restoreIESelection:function() {
// 			//Function to restore the text selection range from the editor in IE
// 			var range = $(this).data('currentRange');
// 		    if (range) {
// 		        if (window.getSelection) {
// 		            sel = window.getSelection();
// 		            sel.removeAllRanges();
// 		            sel.addRange(range);
// 		        } else if (document.selection && range.select) {
// 		            range.select();
// 		        }
// 		    }
// 		},

// 		insertTextAtSelection:function(text,mode) {
// 		    var sel, range, node ;
// 		    typeof mode !== 'undefined' ? mode : "";
// 		    if (window.getSelection) {
// 		        sel = window.getSelection();
// 		        if (sel.getRangeAt && sel.rangeCount) {
// 		            range = sel.getRangeAt(0);
// 		            range.deleteContents();
// 		            var textNode = document.createTextNode(text); 
		            
// 		            if(mode=="html")
// 		            { 
// 		                var el = document.createElement("div");
// 		                el.innerHTML = text;
// 		                var frag = document.createDocumentFragment(), node, lastNode;
// 		                while ( (node = el.firstChild) ) {
// 		                    lastNode = frag.appendChild(node);
// 		                }
// 		                range.insertNode(frag);
// 		            }
// 		            else
// 		            { 
// 		            	range.insertNode(textNode);
// 		            	range.selectNode(textNode);
// 		            }
// 		            sel.removeAllRanges();
// 		            range = range.cloneRange();		            
// 		            range.collapse(false);
// 		            sel.addRange(range);
// 		        }
// 		    } else if (document.selection && document.selection.createRange) { 
// 		        range = document.selection.createRange();
// 		        range.pasteHTML(text);
// 		        range.select();
// 		    }
// 		},

// 		imageWidget: function(){
// 			//Class for Widget Handling the upload of Files
// 			var _idSuffix = this.attr("id");
// 			var row = $('<div/>',{
// 				"class":"row"
// 			}).append($('<div/>',{
// 				id :"imgErrMsg_" + _idSuffix
// 			}));
// 			var container = $('<div/>',{'class':"tabbable tabs-left"});
// 			var navTabs = $('<ul/>',
// 									{ class: "nav nav-tabs"
// 							}).append($('<li/>',
// 										{ class:"active"
// 									}).append($('<a/>',{
// 											"href":"#uploadImageBar_" + _idSuffix,
// 											"data-toggle":"tab"
// 										}).html("From Computer")
// 							)).append($('<li/>').append($('<a/>',{
// 											"href":"#imageFromLinkBar_" + _idSuffix,
// 											"data-toggle":"tab"
// 										}).html("From URL")));

// 			var tabContent 		= $("<div/>", {class:"tab-content"});
// 			var uploadImageBar  = $("<div/>",{
// 				id: "uploadImageBar_" + _idSuffix,
// 				class: "tab-pane active"
// 			});

// 			handleFileSelect = function(evt) {
//     			var files = evt.target.files; // FileList object
// 				var output = [];
// 				for (var i = 0, f; f = files[i]; i++) {
// 					//Loop thorugh all the files
// 					if(!f.type.match('image.*') || !f.name.match(/(?:gif|jpg|png|jpeg)$/)){ //Process only Images
// 						methods.showMessage.apply(this,["imgErrMsg_" + _idSuffix,"Invalid file type"]);
// 						continue;
// 					}
// 					var reader = new FileReader();
// 					reader.onload = (function(imageFile){
// 						return function(e){
// 							//Render Thumnails
// 							var li = $('<li/>',{class:"col-xs-12 col-sm-6 col-md-3 col-lg-3"});
// 							var a = $('<a/>',{
// 								href:"javascript:void(0)",
// 								class:"thumbnail"
// 							});
// 							var image = $('<img/>',{
// 								src:e.target.result,
// 								title:escape(imageFile.name)
// 							}).appendTo(a).click(function(){
// 								$('#imageList_' + _idSuffix).data('current', $(this).attr('src'));
// 								});
// 							li.append(a).appendTo($('#imageList_' + _idSuffix));
// 						}
// 					})(f);
// 					reader.readAsDataURL(f);					
// 				}				
// 			}
// 			var chooseFromLocal = $('<input/>',{
// 				type: "file",
// 				class:"inline-form-control",
// 				multiple: "multiple"
// 			});
// 			chooseFromLocal.on('change', handleFileSelect);
// 			uploadImageBar.append(chooseFromLocal);
// 			var imageFromLinkBar = $("<div/>",{
// 				id: "imageFromLinkBar_" + _idSuffix,
// 				class: "tab-pane"
// 			});		
// 			var getImageURL = $("<div/>", {class:"input-group"});
// 			var imageURL = $('<input/>',{
// 				type: "url",
// 				class:'form-control',
// 				id:"imageURL_" + _idSuffix,
// 				placeholder: "Enter URL"
// 			}).appendTo(getImageURL);
// 			var getURL = $("<button/>",{
// 				class:"btn btn-success",
// 				type:"button"
// 			}).html("Go!").click(function(){
// 				var url = $('#imageURL_' + _idSuffix).val();
// 				if(url ==''){
// 					methods.showMessage.apply(this,["imgErrMsg_" + _idSuffix,"Please enter image url"]);
// 					return false;
// 				}
// 				var li = $('<li/>',{class:"span6 col-xs-12 col-sm-6 col-md-3 col-lg-3"});
// 				var a = $('<a/>',{
// 					href:"javascript:void(0)",
// 					class:"thumbnail"
// 				});
// 				var image = $('<img/>',{
// 					src:url,
// 				}).error(function(){
// 				  	methods.showMessage.apply(this,["imgErrMsg_" + _idSuffix,"Invalid image url"]);
// 				  	return false;
// 				}).load( function() { $(this).appendTo(a).click(function(){
// 					$('#imageList_' + _idSuffix).data('current', $(this).attr('src'));
// 				});
// 				li.append(a).appendTo($('#imageList_' + _idSuffix));
// 			});
// 			}).appendTo($("<span/>", {class:"input-group-btn form-control-button-right"}).appendTo(getImageURL));

// 			imageFromLinkBar.append(getImageURL);
// 			tabContent.append(uploadImageBar).append(imageFromLinkBar);
// 			container.append(navTabs).append(tabContent);						

// 			var imageListContainer = $("<div/>",{'class': 'col-xs-12 col-sm-12 col-md-12 col-lg-12'});
// 			var imageList = $('<ul/>',{"class":"thumbnails padding-top list-unstyled",
// 										"id": 'imageList_' + _idSuffix
// 			}).appendTo(imageListContainer);
// 			row.append(container).append(imageListContainer);
// 			return row;
// 		},

// 		tableWidget: function(mode){
// 			//Function to generate the table input form
// 			var idExtn = "_" + $(this).attr("id");
// 			if (typeof mode!=='undefined') {
// 				idExtn = "_" + editorObj.attr("id") + "_Edt";
// 			}
// 			var tblCntr = $('<div/>',{ //Outer Container Div
// 				class:"row-fluid"
// 				}).append($('<div/>',{ //Err Message Div
// 				 	id :"tblErrMsg"+idExtn 
// 				})).append($('<form/>',{ //Form 
// 					id:"tblForm"+idExtn 
// 					}).append($('<div/>',{ //Inner Container Div
// 						class:"row" 
// 						}).append($('<div/>',{ //Left input Container Div
// 							id :"tblInputsLeft"+idExtn,
// 							class:"col-xs-12 col-sm-6 col-md-6 col-lg-6"
// 							}).append($('<label/>',{ for:"tblRows"+idExtn,	text:"Rows"}
// 							)).append($('<input/>',{
// 								id:"tblRows"+idExtn,
// 								type:"text",
// 								class:"form-control form-control-width",
// 								value:2
// 							})).append($('<label/>',{ for:"tblColumns"+idExtn,	text:"Columns"}
// 							)).append($('<input/>',{
// 								id:"tblColumns"+idExtn,
// 								type:"text",
// 							 	class:"form-control form-control-width",
// 							 	value:2
// 							})).append($('<label/>',{ for:"tblWidth"+idExtn, text:"Width"}
// 							)).append($('<input/>',{
// 								id:"tblWidth"+idExtn,
// 								type:"text",
// 								class:"form-control form-control-width",
// 								value:400
// 							})).append($('<label/>',{ for:"tblHeight"+idExtn, text:"Height"}
// 							)).append($('<input/>',{ 
// 								id:"tblHeight"+idExtn,
// 								type:"text",
// 								class:"form-control form-control-width", 
// 							}))
// 						).append($('<div/>',{ //Right input Container Div
// 							id :"tblInputsRight"+idExtn,
// 							class:"col-xs-12 col-sm-6 col-md-6 col-lg-6"
// 							}).append($('<label/>',{ for:"tblAlign"+idExtn, text:"Alignment"}
// 							)).append($('<select/>',{ id:"tblAlign"+idExtn, class:"form-control form-control-width"}
// 								).append($('<option/>',{ text:"Choose", value:""}
// 								)).append($('<option/>',{ text:"Left", value:"left"}
// 								)).append($('<option/>',{ text:"Center", value:"center"}
// 								)).append($('<option/>',{ text:"Right",	value:"right"}))
// 							).append($('<label/>',{	for:"tblBorder"+idExtn, text:"Border size"}
// 							)).append($('<input/>',{ 
// 								id:"tblBorder"+idExtn,
// 								type:"text",
// 								class:"form-control form-control-width",
// 								value:1
// 							})).append($('<label/>',{ for:"tblCellspacing"+idExtn,	text:"Cell spacing"}
// 							)).append($('<input/>',{
// 								id:"tblCellspacing"+idExtn,
// 								type:"text", 
// 								class:"form-control form-control-width",
// 								value:1
// 							})).append($('<label/>',{ for:"tblCellpadding"+idExtn,	text:"Cell padding"}
// 							)).append($('<input/>',{
// 								id:"tblCellpadding"+idExtn,
// 								type:"text",
// 								class:"form-control form-control-width",
// 								value:1
// 							}))
// 						)
// 					)
// 				)																	
// 			return tblCntr;
// 		},

// 		imageAttributeWidget: function(){

// 			var edtTablecntr=$('<div/>',{ 
// 				class:"row-fluid"}
// 				).append($('<div/>',{ //Err Message Div
// 				 	id :"imageErrMsg" 
// 				})).append($('<input/>',{ 
// 						id:"imgAlt",
// 						type:"text",
// 						class:"form-control form-control-link ",
// 						placeholder:"Alt Text",
// 					})).append($('<input/>',{
// 						id:"imgTarget",
// 						class:"form-control form-control-link ",
// 						type:"text",
// 						placeholder:"Link Target"
// 					})).append($('<input/>',{
// 						id:"imgHidden",
// 						type:"hidden"						
// 					}))
					
// 				return edtTablecntr;

// 		},

// 		getHTMLTable: function(tblRows,tblColumns,attributes){
// 			//Function to generate html table. Supplied arguments: tablerows-no.of rows, no.of columns, table attributes.
// 			var tableElement = $('<table/>',{ class:"table" });
// 			for (var i = 0; i < attributes.length; i++){
// 				if(attributes[i].value!=''){
// 					if(attributes[i].attribute=="width" || attributes[i].attribute=="height")
// 	                  	tableElement.css(attributes[i].attribute,attributes[i].value);
// 					else
// 						tableElement.attr(attributes[i].attribute,attributes[i].value);
// 				}
// 			}
// 			for(var i=1; i<=tblRows; i++){
// 				var tblRow = $('<tr/>');
// 			 	for(var j=1; j<=tblColumns; j++){
// 			 		var tblColumn = $('<td/>').html('&nbsp;');
// 			 		tblColumn.appendTo(tblRow);
// 			 	}				
// 				tblRow.appendTo(tableElement);
// 			}
// 			return tableElement;
// 		},

// 		init : function( options )
// 		{
// 			if ($(this).attr("id") === undefined || $(this).attr("id") === "") {
// 				$(this).attr("id", Date.now());
// 			}
// 			var fonts = { "Sans serif"	 : "arial,helvetica,sans-serif",
// 						  "Serif"	 	 : "times new roman,serif",
// 						  "Wide"	 	 : "arial black,sans-serif",
// 						  "Narrow"	 	 : "arial narrow,sans-serif",
// 						  "Comic Sans MS": "comic sans ms,sans-serif",
// 						  "Courier New"  : "courier new,monospace",
// 						  "Garamond"	 : "garamond,serif",
// 						  "Georgia"	 	 : "georgia,serif",
// 						  "Tahoma" 		 : "tahoma,sans-serif",
// 						  "Trebuchet MS" : "trebuchet ms,sans-serif",
// 						  "Verdana" 	 : "verdana,sans-serif"};

// 			var styles = {  "Heading 1":"<h1>",
// 							"Heading 2":"<h2>",
// 							"Heading 3":"<h3>",
// 							"Heading 4":"<h4>",
// 							"Heading 5":"<h5>",
// 							"Heading 6":"<h6>",
// 							"Paragraph":"<p>" };

// 			var fontsizes = {	"Small"	:"2",
// 								"Normal":"3",
// 								"Medium":"4",
// 								"Large"	:"5",
// 								"Huge"	:"6" };

// 			var colors = [	{ name: 'Black', hex: '#000000' },
// 							{ name: 'MediumBlack', hex: '#444444' },
// 							{ name: 'LightBlack', hex: '#666666' },
// 							{ name: 'DimBlack', hex: '#999999' },
// 							{ name: 'Gray', hex: '#CCCCCC' },
// 							{ name: 'DimGray', hex: '#EEEEEE' },
// 							{ name: 'LightGray', hex: '#F3F3F3' },
// 							{ name: 'White', hex: '#FFFFFF' },

// 							{ name: 'libreak', hex: null },

// 							{ name: 'Red', hex: '#FF0000' },
// 							{ name: 'Orange', hex: '#FF9900' },
// 							{ name: 'Yellow', hex: '#FFFF00' },
// 							{ name: 'Lime', hex: '#00FF00' },
// 							{ name: 'Cyan', hex: '#00FFFF' },
// 							{ name: 'Blue', hex: '#0000FF' },
// 							{ name: 'BlueViolet', hex: '#8A2BE2' },
// 							{ name: 'Magenta', hex: '#FF00FF' },

// 							{ name: 'libreak', hex: null },
							
// 							{ name: 'LightPink', hex: '#FFB6C1'},
// 							{ name: 'Bisque', hex: '#FCE5CD'},
// 							{ name: 'BlanchedAlmond', hex: '#FFF2CC'},
// 							{ name: 'LightLime', hex: '#D9EAD3'},
// 							{ name: 'LightCyan', hex: '#D0E0E3'},
// 							{ name: 'AliceBlue', hex: '#CFE2F3'},
// 							{ name: 'Lavender', hex: '#D9D2E9'},
// 							{ name: 'Thistle', hex: '#EAD1DC'},

// 							{ name: 'LightCoral', hex: '#EA9999' },
// 							{ name: 'Wheat', hex: '#F9CB9C' },
// 							{ name: 'NavajoWhite', hex: '#FFE599' },
// 							{ name: 'DarkSeaGreen', hex: '#B6D7A8' },
// 							{ name: 'LightBlue', hex: '#A2C4C9' },
// 							{ name: 'SkyBlue', hex: '#9FC5E8' },
// 							{ name: 'LightPurple', hex: '#B4A7D6' },
// 							{ name: 'PaleVioletRed', hex: '#D5A6BD' },

// 							{ name: 'IndianRed', hex: '#E06666' },
// 							{ name: 'LightSandyBrown', hex: '#F6B26B' },
// 							{ name: 'Khaki', hex: '#FFD966' },
// 							{ name: 'YellowGreen', hex: '#93C47D' },
// 							{ name: 'CadetBlue', hex: '#76A5AF' },
// 							{ name: 'DeepSkyBlue', hex: '#6FA8DC' },
// 							{ name: 'MediumPurple', hex: '#8E7CC3' },
// 							{ name: 'MediumVioletRed', hex: '#C27BA0' },

// 							{ name: 'Crimson', hex: '#CC0000' },
// 							{ name: 'SandyBrown', hex: '#E69138' },
// 							{ name: 'Gold', hex: '#F1C232' },
// 							{ name: 'MediumSeaGreen', hex: '#6AA84F' },
// 							{ name: 'Teal', hex: '#45818E' },
// 							{ name: 'SteelBlue', hex: '#3D85C6' },
// 							{ name: 'SlateBlue', hex: '#674EA7' },
// 							{ name: 'VioletRed', hex: '#A64D79' },

// 							{ name: 'Brown', hex: '#990000' },
// 							{ name: 'Chocolate', hex: '#B45F06' },
// 							{ name: 'GoldenRod', hex: '#BF9000' },
// 							{ name: 'Green', hex: '#38761D' },
// 							{ name: 'SlateGray', hex: '#134F5C' },
// 							{ name: 'RoyalBlue', hex: '#0B5394' },
// 							{ name: 'Indigo', hex: '#351C75' },
// 							{ name: 'Maroon', hex: '#741B47' },

// 							{ name: 'DarkRed', hex: '#660000' },
// 							{ name: 'SaddleBrown', hex: '#783F04' },
// 							{ name: 'DarkGoldenRod', hex: '#7F6000' },
// 							{ name: 'DarkGreen', hex: '#274E13' },
// 							{ name: 'DarkSlateGray', hex: '#0C343D' },
// 							{ name: 'Navy', hex: '#073763' },
// 							{ name: 'MidnightBlue', hex: '#20124D' },
// 							{ name: 'DarkMaroon', hex: '#4C1130' } ];

// 			var specialchars = [{ name:"Exclamation ", text:"!"},
// 								{ name:"At", text:"@"},
// 								{ name:"Hash", text:"#"},
// 								{ name:"Percentage", text:"%"},
// 								{ name:"Uppercase", text:"^"},
// 								{ name:"Ampersand", text:"&"},
// 								{ name:"Asterisk", text:"*"},
// 								{ name:"OpenBracket", text:"("},
// 								{ name:"CloseBracket", text:")"},
// 								{ name:"Underscore", text:"_"},
// 								{ name:"Hiphen", text:"-"},
// 								{ name:"Plus", text:"+"},
// 								{ name:"Equalto", text:"="},
// 								{ name:"OpenSquareBracket", text:"["},
// 								{ name:"CloseSquareBracket", text:"]"},
// 								{ name:"OpenCurly", text:"{"},
// 								{ name:"CloseCurly", text:"}"},
// 								{ name:"Pipe", text:"|"},
// 								{ name:"Colon", text:":"},
// 								{ name:"Semicolon", text:";"},
// 								{ name:"Single quote", text:"&#39;"},
// 								{ name:"Double quote", text:"&#34;"},
// 								{ name:"Left single curly quote", text:"&lsquo;"},
// 								{ name:"right single curly quote", text:"&rsquo;"},
// 								{ name:"Forward-slash", text:"&#47;"},
// 								{ name:"Back-slash", text:"&#92;"},
// 								{ name:"LessThan", text:"<"},
// 								{ name:"GreaterThan", text:">"},
// 								{ name:"QuestionMark", text:"?"},
// 								{ name:"Tilda", text:"~"},
// 								{ name:"Grave accent", text:"`"},
// 								{ name:"Micron", text:"&micro;"},
// 								{ name:"Paragraph sign", text:"&para;"},
// 								{ name:"Plus/minus", text:"&plusmn;"},
// 								{ name:"Trademark", text:"&trade;"},
// 								{ name:"Copyright", text:"&copy;"},
// 								{ name:"Registered", text:"&reg;"},
// 								{ name:"Section", text:"&sect;"},
// 								{ name:"right double angle quotes", text:"&#187;"},
// 								{ name:"fraction one quarter", text:"&#188;"},
// 								{ name:"fraction one half", text:"&#189;"},
// 								{ name:"fraction three quarters", text:"&#190;"},
// 								{ name:"Dollar", text:"$"},
// 								{ name:"Euro", text:"&euro;"},
// 								{ name:"Pound", text:"&pound;"},
// 								{ name:"Yen", text:"&yen;"},
// 								{ name:"Cent", text:"&#162;"},
// 								{ name:"IndianRupee", text:"&#8377;"},];
			
// 			var menuItems = { 'fonteffects': true,
// 							  'texteffects': true,
// 							  'aligneffects': true,
// 							  'textformats':true,
// 							  'actions' : true,
// 							  'insertoptions' : true,
// 							  'extraeffects' : true,
// 							  'advancedoptions' : true,
// 							  'screeneffects':true,

// 							  'fonts'	: { "select":true,
// 											"default": "Font",
// 											"tooltip": "Fonts",
// 											"commandname": "fontName",
// 											"custom":null },

// 							  'styles'	: { "select":true,
// 											"default": "Formatting",
// 											"tooltip": "Paragraph Format",
// 											"commandname": "formatBlock",
// 												"custom":null },

// 							 'font_size': {	"select":true,
// 											"default": "Font size",
// 											"tooltip": "Font Size",
// 											"commandname":"fontSize", 
// 											"custom":null },

// 							  'color'	: { "text":"A",
// 											"icon": "fa fa-font", 
// 											"tooltip": "Text/Background Color",
// 											"commandname":null,
// 											"custom":function(button){
// 													var editor = $(this);
// 													var flag = 0;
// 													var paletteCntr   = $('<div/>',{id:"paletteCntr",class:"activeColour", css :{"display":"none","width":"335px"}}).click(function(event){event.stopPropagation();});
// 													var paletteDiv    = $('<div/>',{id:"colorpellete"});
// 													var palette       = $('<ul />',{id:"color_ui"}).append($('<li />').css({"width":"145px","display":"Block","height":"25px"}).html('<div>Text Color</div>'));
// 													var bgPalletteDiv = $('<div/>',{id:"bg_colorpellete"});
// 													var bgPallette    = $('<ul />',{id:"bgcolor_ui"}).append($('<li />').css({"width":"145px","display":"Block","height":"25px"}).html('<div>Background Color</div>'));
// 													if(editor.data("colorBtn")){
// 														flag = 1;
// 														editor.data("colorBtn",null);
// 													}
// 													else
// 														editor.data("colorBtn",1);
// 													if(flag==0){
// 														for (var i = 0; i < colors.length; i++){
// 															if(colors[i].hex!=null){
// 															    palette.append($('<li />').css('background-color', colors[i].hex).mousedown(function(event){ event.preventDefault();}).click(function(){															
// 																	var hexcolor = methods.rgbToHex.apply(this,[$(this).css('background-color')]);
// 																	methods.restoreSelection.apply(this);
// 																	methods.setStyleWithCSS.apply(this);
// 																	document.execCommand('forecolor',false,hexcolor);
// 																	$('#paletteCntr').remove();

// 																	editor.data("colorBtn",null);
// 																}));

// 																bgPallette.append($('<li />').css('background-color', colors[i].hex).mousedown(function(event){ event.preventDefault();}).click(function(){															
// 																var hexcolor = methods.rgbToHex.apply(this,[$(this).css('background-color')]);
// 																methods.restoreSelection.apply(this);
// 																methods.setStyleWithCSS.apply(this);
// 																document.execCommand('backColor',false,hexcolor);
// 																$('#paletteCntr').remove();
// 																editor.data("colorBtn",null);
// 																}));
// 															}
// 															else{
// 																palette.append($('<li />').css({"width":"145px","display":"Block","height":"5px"}));
// 																bgPallette.append($('<li />').css({"width":"145px","display":"Block","height":"5px"}));
// 															}
// 														} 
// 														palette.appendTo(paletteDiv);
// 														bgPallette.appendTo(bgPalletteDiv);
// 														paletteDiv.appendTo(paletteCntr);
// 														bgPalletteDiv.appendTo(paletteCntr)																												
// 														paletteCntr.insertAfter(button);
// 														$('#paletteCntr').slideDown('slow');
// 													}
// 													else 
// 														$('#paletteCntr').remove();
// 												}},
							
// 							  'bold'	: { "text": "B", 
// 											"icon": "fa fa-bold", 
// 											"tooltip": "Bold", 
// 											"commandname":"bold", 
// 											"custom":null },

// 						      'italics'	: { "text":"I", 
// 											"icon":"fa fa-italic", 
// 											"tooltip":"Italics", 
// 											"commandname":"italic",
// 											"custom":null },

// 						     'underline': { "text":"U", 
// 											"icon":"fa fa-underline", 
// 											"tooltip":"Underline", 
// 											"commandname":"underline",
// 											"custom":null },
											
// 						     'strikeout': { "text": "Strikeout", 
// 											"icon":"fa fa-strikethrough", 
// 											"tooltip": "Strike Through", 
// 											"commandname":"strikeThrough", 
// 											"custom":null },

// 						     'ol'		: { "text": "N", 
// 											"icon": "fa fa-list-ol", 
// 											"tooltip": "Insert/Remove Numbered List", 
// 											"commandname":"insertorderedlist", 
// 											"custom":null },

// 						     'ul'		: { "text": "Bullet", 
// 											"icon": "fa fa-list-ul", 
// 											"tooltip": "Insert/Remove Bulleted List", 
// 											"commandname":"insertunorderedlist", 
// 											"custom":null },

// 						     'undo'		: { "text": "undo", 
// 											"icon": "fa fa-undo", 
// 											"tooltip": "Undo", 
// 											"commandname":"undo", 
// 											"custom":null },

// 						     'redo'		: { "text": "redo", 
// 											"icon": "fa fa-repeat", 
// 											"tooltip": "Redo", 
// 											"commandname":"redo", 
// 											"custom":null },

// 						     'l_align'	: { "text": "leftalign", 
// 											"icon": "fa fa-align-left", 
// 											"tooltip": "Align Left", 
// 											"commandname":"justifyleft", 
// 											"custom":null },

// 						     'r_align'	: { "text": "rightalign", 
// 											"icon": "fa fa-align-right", 
// 											"tooltip": "Align Right", 
// 											"commandname":"justifyright", 
// 											"custom":null },

// 						     'c_align'	: { "text": "centeralign", 
// 											"icon": "fa fa-align-center", 
// 											"tooltip": "Align Center", 
// 											"commandname":"justifycenter", 
// 											"custom":null },

// 						     'justify'	: { "text": "justify", 
// 											"icon": "fa fa-align-justify", 
// 											"tooltip": "Justify", 
// 											"commandname":"justifyfull", 
// 											"custom":null },

// 							  'unlink'	: { "text": "Unlink", 
// 											"icon": "fa fa-unlink", 
// 											"tooltip": "Unlink", 
// 											"commandname":"unlink", 
// 											"custom":null },

// 						   'insert_link': { "modal": true,
// 						   					"modalId": "InsertLink_" + $(this).attr("id"),
// 											"icon":"fa fa-link", 
// 											"tooltip": "Insert Link", 
// 											"modalHeader": "Insert Hyperlink",
// 											"modalBody": $('<div/>',{   class:"form-group"
// 																	}).append($('<div/>',{
// 																		id :"errMsg_" + $(this).attr("id")
// 																	})).append($('<input/>',{
// 																		type:"text",
// 																		id:"inputText_" + $(this).attr("id"),
// 																		class:"form-control form-control-link ",
// 																		placeholder:"Text to Display",
// 																	})).append($('<input/>',{
// 																		type:"text",
// 																		id:"inputUrl_" + $(this).attr("id"),
// 																		required:true,
// 																		class:"form-control form-control-link",
// 																		placeholder:"Enter URL"
// 																	})),
// 											"beforeLoad":function(){ 
// 												editorObj = this;
// 												var _idSuffix = "_" + this.attr("id");
// 												$('#inputText' + _idSuffix);
// 												$('#inputUrl' + _idSuffix);
// 												$(".alert").alert("close");
// 												if($(editorObj).data('currentRange')!=''){ 
// 													$('#inputText_' +  _idSuffix).val($(editorObj).data('currentRange'));
// 												}
// 											},
// 											"onSave":function(){
// 												var urlPattern = /(http|ftp|https):\/\/[\w-]+(\.[\w-]+)+([\w.,@?^=%&amp;:\/~+#-]*[\w@?^=%&amp;\/~+#-])?/;
// 												var _idSuffix = "_" + editorObj.attr("id");
// 												var targetText = $('#inputText' + _idSuffix).val();
// 												var targetURL  = $('#inputUrl' + _idSuffix).val();
// 												var range      = $(editorObj).data('currentRange');
// 												if(targetURL ==''){
// 													methods.showMessage.apply(editorObj,["errMsg","Please enter url"]);
// 													return false;
// 												}												
// 												if(!targetURL.match(urlPattern)){
// 													methods.showMessage.apply(editorObj,["errMsg","Enter valid url"]);
// 													return false;
// 												}													
// 												if(range=='' && targetText==''){ 
// 													targetText =targetURL;	
// 												}
// 												if(navigator.userAgent.match(/MSIE/i) || navigator.userAgent.match(/Windows NT.*Trident\//)){	
// 													var targetLink='<a href="'+targetURL+'" target="_blank">'+targetText+'</a>';
// 													methods.restoreSelection.apply(editorObj,[targetLink,'html']);
// 												}
// 												else{
// 												    methods.restoreSelection.apply(editorObj, [targetText]);																																		
// 													document.execCommand('createLink',false,targetURL);
// 												}
// 												$(editorObj).data("editor").find('a[href="'+targetURL+'"]').each(function(){ $(this).attr("target", "_blank"); });
// 												$(".alert").alert("close");
// 												$("#InsertLink" + _idSuffix).modal("hide");
// 												$(editorObj).data("editor").focus();
// 												return false;
// 											}},

// 						   'insert_img'	: { "modal": true,
// 						   					"modalId": "InsertImage_" + $(this).attr("id"), 
// 											"icon":"fa fa-picture-o", 
// 											"tooltip": "Insert Image", 
// 											"modalHeader": "Insert Image",
// 											"modalBody": methods.imageWidget.apply(this),
// 											"beforeLoad":function(){
// 												editorObj = this;
// 												var _idSuffix = editorObj.attr("id");
// 												$('#imageURL_' + _idSuffix).val("");
// 												$("#uploadImageBar_" + _idSuffix + " :input").val("");
// 												$('#imageList_' + _idSuffix).data('current',"");																																				
// 											},
// 											"onSave": function(){
// 												var _idSuffix = "_" + editorObj.attr("id");
// 												methods.restoreSelection.apply(this);												
// 												if($('#imageList' + _idSuffix).data('current')){
// 													if(navigator.userAgent.match(/MSIE/i) || navigator.userAgent.match(/Windows NT.*Trident\//)){
// 														var imageStr = '<img src="'+$('#imageList' + _idSuffix).data('current')+'"/>'
// 														methods.restoreSelection.apply(this,[imageStr,'html'])
// 													}
// 													else{
// 														document.execCommand('insertimage', false, $('#imageList' + _idSuffix).data('current'));
// 													}
// 												}
// 												else{
// 													methods.showMessage.apply(this,["imgErrMsg" + _idSuffix,"Please select an image"]);
// 													return false;
// 												}
// 												$("#InsertImage" + _idSuffix).modal("hide");
// 												$(this).data("editor").focus();
// 											}},

// 						'insert_table'	: { "modal": true,
// 					   						"modalId": "InsertTable_" + $(this).attr("id"), 
// 											"icon":"fa fa-table", 
// 											"tooltip": "Insert Table", 
// 											"modalHeader": "Insert Table",
// 											"modalBody":methods.tableWidget.apply(this),
// 											"beforeLoad":function(){
// 												editorObj = this;
// 												$('#tblForm_' + editorObj.attr("id")).each (function(){ this.reset(); });																																	
// 											},
// 											"onSave": function(){
// 												_idSuffix = "_" + editorObj.attr("id");
// 												methods.restoreSelection.apply(this);
// 												var tblRows        = $('#tblRows' + _idSuffix).val();
// 												var tblColumns     = $('#tblColumns' + _idSuffix).val();
// 												var tblWidth       = $('#tblWidth' + _idSuffix).val();
// 												var tblHeight      = $('#tblHeight' + _idSuffix).val();
// 												var tblAlign       = $('#tblAlign'  + _idSuffix).val();
// 												var tblBorder      = $('#tblBorder' + _idSuffix).val();
// 												var tblCellspacing = $('#tblCellspacing' + _idSuffix).val();
// 												var tblCellpadding = $('#tblCellpadding' + _idSuffix).val();
// 												var intReg 		   = /^[0-9]+$/;
// 												var cssReg 		   = /^auto$|^[+-]?[0-9]+\.?([0-9]+)?(px|em|ex|%|in|cm|mm|pt|pc)?$/ig;
// 												var numReg 		   = /^[0-9]+\.?([0-9])?$/;
												
// 												if(!tblRows.match(intReg)){
// 													methods.showMessage.apply(this,["tblErrMsg","Rows must be a positive number"]);
// 													return false;
// 												}													
// 												if(!tblColumns.match(intReg)){
// 													methods.showMessage.apply(this,["tblErrMsg","Columns must be a positive number"]);
// 													return false;
// 												}
// 												if(tblWidth!="" && !tblWidth.match(cssReg)){
// 													methods.showMessage.apply(this,["tblErrMsg","Please enter positive number with or without a valid CSS measurement unit (px,em,ex,%,in,cm,mm,pt,pc)"]);
// 													return false;
// 												}
// 												if(tblHeight!="" && !tblHeight.match(cssReg)){
// 													methods.showMessage.apply(this,["tblErrMsg","Please enter positive number with or without a valid CSS measurement unit (px,em,ex,%,in,cm,mm,pt,pc)"]);
// 													return false;
// 												}
// 												if(tblBorder!="" && !tblBorder.match(numReg)){
// 													methods.showMessage.apply(this,["tblErrMsg","Border size must be a positive number"]);
// 													return false;
// 												}
// 												if(tblCellspacing!="" && !tblCellspacing.match(numReg)){
// 													methods.showMessage.apply(this,["tblErrMsg","Cell spacing must be a positive number"]);
// 													return false;
// 												}
// 												if(tblCellpadding!="" && !tblCellpadding.match(numReg)){
// 													methods.showMessage.apply(this,["tblErrMsg","Cell padding must be a positive number"]);
// 													return false;
// 												}

// 												var htmlTableCntr = $('<div/>');
// 												var tblAttributes = [	
// 																		{attribute:"align",value:tblAlign},
// 																		{attribute:"border",value:tblBorder},
// 																		{attribute:"cellspacing",value:tblCellspacing},
// 																		{attribute:"cellpadding",value:tblCellpadding},
// 																		{attribute:"width",value:tblWidth},
// 																		{attribute:"height",value:tblHeight},
// 																	];
// 												var htmlTable     = methods.getHTMLTable.apply(this, [tblRows, tblColumns, tblAttributes]);
// 												htmlTable.appendTo(htmlTableCntr);
// 												if(navigator.userAgent.match(/MSIE/i) || navigator.userAgent.match(/Windows NT.*Trident\//))
// 												methods.restoreSelection.apply(this,[htmlTableCntr.html(),'html']);
// 												else
// 												document.execCommand('insertHTML', false, htmlTableCntr.html());
// 												$("#InsertTable" + _idSuffix).modal("hide");
// 												$(this).data("editor").focus();
// 											}},

// 						   'hr_line'	: { "text": "HR", 
// 											"icon":"fa fa-minus", 
// 											"tooltip": "Horizontal Rule", 
// 											"commandname":"insertHorizontalRule", 
// 											"custom":null },

// 						   'block_quote': { "text": "Block Quote", 
// 											"icon":"fa fa-quote-right", 
// 											"tooltip": "Block Quote", 
// 											"commandname":null, 
// 											"custom":function(){ 
// 												methods.setStyleWithCSS.apply(this);
// 												if(navigator.userAgent.match(/MSIE/i) || navigator.userAgent.match(/Windows NT.*Trident\//)){													 
// 													document.execCommand('indent', false, null); 	
// 												}
// 												else{
// 													document.execCommand('formatBlock', false, '<blockquote>');
// 												}
// 											}},						   

// 						   'indent'		: { "text": "Indent", 
// 											"icon":"fa fa-indent", 
// 											"tooltip": "Increase Indent", 
// 											"commandname":"indent", 
// 											"custom":null },

// 						   'outdent'	: { "text": "Outdent", 
// 											"icon":"fa fa-outdent", 
// 											"tooltip": "Decrease Indent", 
// 											"commandname":"outdent", 
// 											"custom":null },

// 							'print'		: { "text": "Print", 
// 											"icon":"fa fa-print", 
// 											"tooltip": "Print", 
// 											"commandname":null, 
// 											"custom":function(){
// 											oDoc = $(this).data("editor");
// 											var oPrntWin = window.open("","_blank","width=450,height=470,left=400,top=100,menubar=yes,toolbar=no,location=no,scrollbars=yes");
// 											oPrntWin.document.open();
// 											oPrntWin.document.write("<!doctype html><html><head><title>Print</title></head><body onload=\"print();\">" + oDoc.html() + "</body></html>");
// 											oPrntWin.document.close();
// 											}},

// 							'rm_format'	: { "text": "Remove format", 
// 											"icon":"fa fa-eraser", 
// 											"tooltip": "Remove Formatting", 
// 											"commandname":"removeformat", 
// 											"custom":null },

// 							'select_all': { "text": "Select all", 
// 											"icon":"fa fa-file-text", 
// 											"tooltip": "Select All", 
// 											"commandname":null, 
// 											"custom":function(){ 
// 												document.execCommand("selectall", null, null);												    
// 											}},

// 							'togglescreen':{ "text": "Toggle Screen",
// 											 "icon": "fa fa-arrows-alt",
// 											 "tooltip": "Toggle Screen",
// 											 "commandname":null,
// 											 "custom":function(button, parameters){
// 												$(this).data("editor").parent().toggleClass('fullscreen');
// 												var statusdBarHeight=0;
// 												if($(this).data("statusBar").length)
// 												{
// 													statusdBarHeight = $(this).data("statusBar").height();
// 												}
// 												if($(this).data("editor").parent().hasClass('fullscreen'))
// 													$(this).data("editor").css({"height":$(this).data("editor").parent().height()-($(this).data("menuBar").height()+statusdBarHeight)-13});
// 						                        else
// 													$(this).data("editor").css({"height":""});
// 						                    }},

// 							'splchars'	: { "text": "S", 
// 											"icon": "fa fa-asterisk", 
// 											"tooltip": "Insert Special Character", 
// 											"commandname":null, 
// 											"custom":function(button){
// 													methods.restoreIESelection.apply(this);
// 													var flag =0;
// 													var splCharDiv = $('<div/>',{id:"specialchar", class:"specialCntr", css :{"display":"none"}}).click(function(event) { event.stopPropagation();});
// 													var splCharUi  = $('<ul />',{id:"special_ui"});
// 													var editor_Content = this; 
// 													if($(this).data("editor").data("splcharsBtn")){
// 														flag = 1;
// 														$(this).data("editor").data("splcharsBtn", null);
// 													}
// 													else
// 														$(this).data("editor").data("splcharsBtn", 1);

// 													if(flag==0){
// 														for (var i = 0; i < specialchars.length; i++){															
// 															splCharUi.append($('<li />').html(specialchars[i].text).attr('title',specialchars[i].name).mousedown(function(event){ event.preventDefault();}).click(function(event){
// 																if(navigator.userAgent.match(/MSIE/i) || navigator.userAgent.match(/Windows NT.*Trident\//)){
// 																	var specCharHtml = $(this).html();
// 																	methods.insertTextAtSelection.apply(this,[specCharHtml,'html']);
// 																}
// 																else{
// 																	document.execCommand('insertHTML',false,$(this).html());
// 																}
// 																$('#specialchar').remove();
// 																$(editor_Content).data("editor").data("splcharsBtn", null);
// 															}));
// 														}														
// 														splCharUi.prependTo(splCharDiv);
// 														splCharDiv.insertAfter(button)
// 														$('#specialchar').slideDown('slow');
// 													}
// 													else
// 														$('#specialchar').remove();
// 											}},

// 							'source'	: { "text": "Source", 
// 											"icon":"fa fa-code", 
// 											"tooltip": "Source", 
// 											"commandname":null, 
// 											"custom":function(button, params){ methods.getSource.apply(this, [button, params]) } },
// 											"params": {"obj":null},
// 										   };

// 			var menuGroups = {'texteffects' : ['bold', 'italics', 'underline', 'color'],
// 							  'aligneffects': ['l_align','c_align', 'r_align', 'justify'],
// 							  'textformats': ['indent', 'outdent', 'block_quote', 'ol', 'ul'],
// 							  'fonteffects' : ['fonts', 'styles', 'font_size'],
// 							  'actions' : ['undo', 'redo'],
// 							  'insertoptions' : ['insert_link', 'unlink', 'insert_img', 'insert_table'],
// 							  'extraeffects' : ['strikeout', 'hr_line', 'splchars'],
// 							  'advancedoptions' : ['print', 'rm_format', 'select_all', 'source'],
// 							  'screeneffects' : ['togglescreen']
// 							};

// 			var settings = $.extend({				
// 				'texteffects':true,
// 				'aligneffects':true,
// 				'textformats':true,
// 				'fonteffects':true,
// 				'actions' : true,
// 				'insertoptions' : true,
// 				'extraeffects' : true,
// 				'advancedoptions' : true,
// 				'screeneffects':true,
// 				'bold': true,
// 				'italics': true,
// 				'underline':true,
// 				'ol':true,
// 				'ul':true,
// 				'undo':true,
// 				'redo':true,
// 				'l_align':true,
// 				'r_align':true,
// 				'c_align':true,
// 				'justify':true,
// 				'insert_link':true,
// 				'unlink':true,
// 				'insert_img':true,
// 				'hr_line':true,
// 				'block_quote':true,
// 				'source':true,
// 				'strikeout':true,
// 				'indent':true,
// 				'outdent':true,
// 				'fonts':fonts,
// 				'styles':styles,
// 				'print':true,
// 				'rm_format':true,
// 				'status_bar':true,
// 				'font_size':fontsizes,
// 				'color':colors,
// 				'splchars':specialchars,
// 				'insert_table':true,
// 				'select_all':true,
// 				'togglescreen':true
// 			},options);

// 	       	var containerDiv = $("<div/>",{ class : "row-fluid Editor-container" });
// 			var $this = $(this).hide();	       	
// 	       	$this.after(containerDiv); 
// 	       	var menuBar = $( "<div/>",{ id : "menuBarDiv_" + $(this).attr("id"),
// 								  		class : "row-fluid line-control-menu-bar"
// 							}).prependTo(containerDiv);
// 	       	var editor  = $(".editorpers").appendTo(containerDiv);
// 			// var editor  = document.getElementById('temp').appendTo(containerDiv);
// 			var statusBar = $("<div/>", {	id : "statusbar_" + $(this).attr("id"),
// 											class: "row-fluid line-control-status-bar",
// 											unselectable:"on",
// 							}).appendTo(containerDiv);
// 	       	$(this).data("menuBar", menuBar);
// 	       	$(this).data("editor", editor);
// 	       	$(this).data("statusBar", statusBar);
// 	       	var editor_Content = this;
// 	       	if(settings['status_bar']){
// 				editor.keyup(function(event){
// 					var wordCount = methods.getWordCount.apply(editor_Content);
// 					var charCount = methods.getCharCount.apply(editor_Content);
// 					$(editor_Content).data("statusBar").html('<div class="label">'+'Words : '+wordCount+'</div>');
// 					$(editor_Content).data("statusBar").append('<div class="label">'+'Characters : '+charCount+'</div>');
//             	});
// 	        }	        
	       	
	       	
// 	       	for(var item in menuItems){
// 	       		if(!settings[item] ){ //if the display is not set to true for the button in the settings.	       		
// 	       			if(settings[item] in menuGroups){
// 	       				for(var each in menuGroups[item]){
// 	       					settings[each] = false;
// 	       				}
// 	       			}
// 	       			continue;
// 	       		}
// 	       		if(item in menuGroups){
// 	       			var group = $("<div/>",{class:"btn-group"});	       			
// 	       			for(var index=0;index<menuGroups[item].length;index++){
// 	       				var value = menuGroups[item][index];	       				
// 	       				if(settings[value]){
//        						var menuItem = methods.createMenuItem.apply(this,[menuItems[value], settings[value], true]);
//        						group.append(menuItem);
//        					}
//        					settings[value] = false;
// 	       			}
// 	       			menuBar.append(group);	       				       			
// 	       		}
// 	       		else{
// 	       			var menuItem = methods.createMenuItem.apply(this,[menuItems[item], settings[item],true]);
// 	       			menuBar.append(menuItem);
// 	       		}	       		
// 	       	}

// 	       	//For contextmenu	       	
// 		    $(document.body).mousedown(function(event) {
// 		        var target = $(event.target);
// 		        if (!target.parents().andSelf().is('#context-menu')) { // Clicked outside
// 		            $('#context-menu').remove();
// 		        } 
// 		        if (!target.parents().andSelf().is('#specialchar') && (target.closest('a').html()!='<i class="fa fa-asterisk"></i>')) { //Clicked outside
// 		        	if($("#specialchar").is(':visible'))
// 		            {
// 						$(editor_Content).data("editor").data("splcharsBtn", null);
// 						$('#specialchar').remove();
// 		           	}
// 		        }
// 		        if (!target.parents().andSelf().is('#paletteCntr') && (target.closest('a').html()!='<i class="fa fa-font"></i>')) { //Clicked outside
// 		        	if($("#paletteCntr").is(':visible'))
// 		            {
// 						$(editor_Content).data("editor").data("colorBtn", null);
// 						$('#paletteCntr').remove();
// 		           	}
// 		        }
// 		    });
// 		    editor.bind("contextmenu", function(e){
// 	       		if($('#context-menu').length)
// 	       			$('#context-menu').remove();
// 	       		var cMenu 	= $('<div/>',{id:"context-menu"
// 	       						}).css({position:"absolute", top:e.pageY, left: e.pageX, "z-index":9999
// 	       						}).click(function(event){
// 								    event.stopPropagation();
// 								});
// 	       		var cMenuUl = $('<ul/>',{ class:"dropdown-menu on","role":"menu"});
// 	       		e.preventDefault();
// 	       		if($(e.target).is('a')){
// 	       			methods.createLinkContext.apply(this,[e,cMenuUl]);
// 	       			cMenuUl.appendTo(cMenu);
// 	       		    cMenu.appendTo('body');
// 	       		}
// 	       		else if($(e.target).is('td') || $(e.target).is("th")){
// 	       			methods.createTableContext.apply(this,[e,cMenuUl]);
// 	       			cMenuUl.appendTo(cMenu);
// 	       		    cMenu.appendTo('body');
// 	       		}
// 	       		else if($(e.target).is('img')){
	       				       			
// 	       			methods.createImageContext.apply(this,[e,cMenuUl]);
// 	       			cMenuUl.appendTo(cMenu);
// 	       			cMenu.appendTo('body');
// 	       		}
// 	       	});
// 		},
// 		createLinkContext: function(event,cMenuUl){
// 			var cMenuli = $('<li/>').append($('<a/>',{
// 				id:"rem_link",
// 				"href":"javascript:void(0)",
// 				"text":"RemoveLink"
// 			}).click(function(e){
// 				return function(){
// 				$(e.target).contents().unwrap();
// 				$('#context-menu').remove();
// 			}}(event)));
// 			cMenuli.appendTo(cMenuUl);

// 		},

// 		createImageContext: function(event,cMenuUl){
// 			var cModalId="imgAttribute";
// 			var cModalHeader="Image Attributes";
// 			var imgModalBody=methods.imageAttributeWidget.apply(this,["edit"]);
// 			var onSave = function(){
// 				var urlPattern = /(http|ftp|https):\/\/[\w-]+(\.[\w-]+)+([\w.,@?^=%&amp;:\/~+#-]*[\w@?^=%&amp;\/~+#-])?/;
// 				var imageAlt = $('#imgAlt').val();
// 				var imageTarget = $('#imgTarget').val();
// 				if(imageAlt==""){
// 					methods.showMessage.apply(this,["imageErrMsg","Please enter image alternative text"]);
// 					return false;
// 				}
// 				if(imageTarget!=""&& !imageTarget.match(urlPattern)){
// 					methods.showMessage.apply(this,["imageErrMsg","Please enter valid url"]);
// 					return false;
// 				}
// 				if($("#imgHidden").val()!=""){
//                         var imgId = $("#imgHidden").val();
// 	       				$("#"+imgId).attr('alt',imageAlt);
// 	       				if(imageTarget!="")
// 	       				{
// 	       				 if($("#wrap_"+imgId).length)
// 	       				 $("#wrap_"+imgId).attr("href",imageTarget);	
// 	       				 else
// 					     $("#"+imgId).wrap($('<a/>',{ id:"wrap_"+imgId,href:imageTarget,target:"_blank"}));
// 					    }
// 					    else
// 					    {
// 					    	if($("#wrap_"+imgId).length)
// 					    	$("#"+imgId).unwrap();
// 					    }
// 	       		}	       		
// 				$("#imgAttribute").modal("hide");
// 				editorObj.data("editor").focus();
// 			};
// 			methods.createModal.apply(this,[cModalId,cModalHeader, imgModalBody, onSave]);
// 			var modalTrigger = $('<a/>',{	href:"#"+cModalId,
//        										"text":"Image Attributes",
// 											"data-toggle":"modal"
// 			}).click( function(e){ 
// 				return function(){	
// 			        $('#context-menu').remove();
// 			        var stamp   = (new Date).getTime();			        
// 			        $('#imgAlt').val($(e.target).closest("img").attr("alt"));
// 			        $('#imgTarget').val('');

// 			        if(typeof $(e.target).closest("img").attr("id")!=="undefined"){	
// 			            var identifier = $(e.target).closest("img").attr("id");		        	
// 			        	$('#imgHidden').val(identifier);
// 			        	if($('#wrap_'+identifier).length)
// 			        		$('#imgTarget').val($('#wrap_'+identifier).attr("href"));
// 			        	else
// 			        	 	$('#imgTarget').val('');	
// 			        }
// 			    	else{			    		
// 			    		$(e.target).closest("img").attr("id","img_"+stamp)
// 			    		$('#imgHidden').val("img_"+stamp);
// 			    	}
					
// 			}}(event));
// 			cMenuUl.append($('<li/>').append(modalTrigger))
// 					.append($('<li/>').append($('<a/>',{text:"Remove Image"}).click( 
// 						function(e) { return function(){ 
// 								$('#context-menu').remove();
// 								$(e.target).closest("img").remove(); 
// 						}}(event))));
// 		},

// 		createTableContext: function(event,cMenuUl){
// 			var _idSuffix = "_" + editorObj.attr("id") + "_Edt";
// 			var modalId="editProperties_" + editorObj.attr("id");
// 			$("#" + modalId).remove();
//        		var modalHeader="Table Properties";
//        		var tblModalBody= methods.tableWidget.apply(this,["edit"]);
//        		var onSave = function(){ 
//        			var tblWidthEdt			= $('#tblWidth' + _idSuffix).val();
//        			var tblHeightEdt		= $('#tblHeight' + _idSuffix).val();
//        			var tblBorderEdt		= $('#tblBorder' + _idSuffix).val();
//        			var tblAlignEdt	        = $('#tblAlign' + _idSuffix).val();
//        			var tblCellspacingEdt	= $('#tblCellspacing' + _idSuffix).val();
//        			var tblCellpaddingEdt	= $('#tblCellpadding' + _idSuffix).val();
// 				var tblEdtCssReg 		= /^auto$|^[+-]?[0-9]+\.?([0-9]+)?(px|em|ex|%|in|cm|mm|pt|pc)?$/ig;
// 				var tblEdtNumReg 		= /^[0-9]+\.?([0-9])?$/;
// 				if(tblWidthEdt!="" && !tblWidthEdt.match(tblEdtCssReg)){
// 					methods.showMessage.apply(this,["tblErrMsgEdt","Please enter positive number with or without a valid CSS measurement unit (px,em,ex,%,in,cm,mm,pt,pc)"]);
// 					return false;
// 				}
// 				if(tblHeightEdt!="" && !tblHeightEdt.match(tblEdtCssReg)){
// 					methods.showMessage.apply(this,["tblErrMsgEdt","Please enter positive number with or without a valid CSS measurement unit (px,em,ex,%,in,cm,mm,pt,pc)"]);
// 					return false;
// 				}
// 				if(tblBorderEdt!="" && !tblBorderEdt.match(tblEdtNumReg)){
// 					methods.showMessage.apply(this,["tblErrMsgEdt","Border size must be a positive number"]);
// 					return false;
// 				}
// 				if(tblCellspacingEdt!="" && !tblCellspacingEdt.match(tblEdtNumReg)){
// 					methods.showMessage.apply(this,["tblErrMsgEdt","Cell spacing must be a positive number"]);
// 					return false;
// 				}
// 				if(tblCellpaddingEdt!="" && !tblCellpaddingEdt.match(tblEdtNumReg)){
// 					methods.showMessage.apply(this,["tblErrMsgEdt","Cell padding must be a positive number"]);
// 					return false;
// 				}
// 				$(event.target).closest('table').css('width',tblWidthEdt);
// 				if(tblHeightEdt!="")
// 				$(event.target).closest('table').css('height',tblHeightEdt);
// 			    $(event.target).closest('table').attr('align',tblAlignEdt);
// 			    $(event.target).closest('table').attr('border',tblBorderEdt);
// 			    $(event.target).closest('table').attr('cellspacing',tblCellspacingEdt);
// 			    $(event.target).closest('table').attr('cellpadding',tblCellpaddingEdt);
// 			    $("#" + modalId).modal("hide");
// 				editorObj.data("editor").focus();
//        		};
//        		methods.createModal.apply(this,[modalId,modalHeader, tblModalBody, onSave]);
//        		var modalTrigger = $('<a/>',{	href:"#"+modalId,
//        										"text":"Table Properties",
// 											"data-toggle":"modal"
// 			}).click( function(e){ return function(){
// 					var _idSuffix = "_" + editorObj.attr("id") + "_Edt";
// 			        $('#context-menu').remove();			
// 					$('#tblRows' + _idSuffix).val($(e.target).closest('table').prop('rows').length);			
// 				    $('#tblColumns' + _idSuffix).val($(e.target).closest('table').find('tr')[0].cells.length);
// 				    $('#tblRows' + _idSuffix).attr('disabled','disabled');   
// 				    $('#tblColumns' + _idSuffix).attr('disabled','disabled');
// 				    $('#tblWidth' + _idSuffix).val($(e.target).closest('table').get(0).style.width);
// 				    $('#tblHeight' + _idSuffix).val($(e.target).closest('table').get(0).style.height);
// 				    $('#tblAlign' + _idSuffix).val($(e.target).closest('table').attr("align"));
// 				    $('#tblBorder' + _idSuffix).val($(e.target).closest('table').attr("border"));
// 				    $('#tblCellspacing' + _idSuffix).val($(e.target).closest('table').attr("cellspacing"));
// 				    $('#tblCellpadding' + _idSuffix).val($(e.target).closest('table').attr("cellpadding"));

				    
// 			}}(event));
       		
// 			cMenuUl.append($('<li/>',{class:"dropdown-submenu",css:{display:"block"}})
//        						.append($('<a/>',{"tabindex":"-1", href:"javascript:void(0)","text":"Row"}))
//        						.append($('<ul/>',{class:"dropdown-menu"})
//        								.append($('<li/>').append($('<a/>',{
// 											id:"tbl_addrow",
// 											"href":"javascript:void(0)",
// 											"text":"Add Row"
// 											}).click(function(e){
// 												return function(){
// 													$("#context-menu").remove();
// 													var selectedRow = $(e.target).closest("tr");
// 													var newRow = $("<tr/>");
// 													selectedRow.children().each(function() {
// 														var newColumn = $("<" + $(this).prop("nodeName") + "/>").html("&nbsp;");
// 														newRow.append(newColumn);
// 													});
// 													selectedRow.after(newRow);
// 												}
// 											}(event))))
//        								.append($('<li/>').append($('<a/>',{text:"Remove Row"}).click( 
// 											function(e) { return function(){ 
// 													$('#context-menu').remove();
// 													$(e.target).closest("tr").remove(); 
// 											}}(event))))
//        			)).append($('<li/>',{class:"dropdown-submenu",css:{display:"block"}})
//    						.append($('<a/>',{"tabindex":"-1", href:"javascript:void(0)","text":"Column"}))
//    						.append($('<ul/>',{class:"dropdown-menu"})
//    								.append($('<li/>').append($('<a/>',{
// 										id:"tbl_addcolumn",
// 										"href":"javascript:void(0)",
// 										"text":"Add Column",
// 										}).click(function(e){
// 											return function(){
// 												$('#context-menu').remove();
// 												var selectedCell = $(e.target);
// 												var columnIndex = selectedCell.siblings().addBack().index(selectedCell);
// 												selectedCell.closest("table").find("tr").each(function() {
// 													var cellInSelectedColumn = $(this).children(":eq(" + columnIndex + ")");
// 													var newCell = $("<" + cellInSelectedColumn.prop("nodeName") + "/>").html("&nbsp;");
// 													cellInSelectedColumn.after(newCell);
// 												});
// 											}
// 										}(event))))
//    								.append($('<li/>').append($('<a/>',{text:"Remove Column"}).click( 
// 										function(e) { return function(){ 
// 												$('#context-menu').remove();
// 												var selectedCell = $(e.target);
// 												var columnIndex = selectedCell.siblings().addBack().index(selectedCell);
// 												selectedCell.closest("table").find("tr").each(function() {
// 													$(this).children(":eq(" + columnIndex + ")").remove();
// 												});
// 										}}(event))))
//    						));
// 			cMenuUl.append($('<li/>').append(modalTrigger))
// 					.append($('<li/>',{class:"divider"}))
// 					.append($('<li/>').append($('<a/>',{text:"Remove Table"}).click( 
// 						function(e){ return function(){ 
// 								$('#context-menu').remove();
// 								$(e.target).closest("table").remove(); 
// 						}}(event))));

// 		},

// 		createModal: function(modalId, modalHeader, modalBody, onSave){
// 			//Create a Modal for the button.		
// 			var modalTrigger = $('<a/>',{	href:"#"+modalId,
// 											role:"button",
// 											class:"btn btn-default",
// 											"data-toggle":"modal"
// 			});
// 			var modalElement = $('<div/>',{ id: modalId,
// 								           class: "modal fade",
// 								              tabindex: "-1",
// 								              role: "dialog",
// 								              "aria-labelledby":"h3_"+modalId,
// 								              "aria-hidden":"true"
// 								          }).append($('<div>',{
// 								            	class:"modal-dialog"
// 								         		}).append($('<div>',{
// 							            			class:"modal-content"
// 									         		}).append($('<div>',{
// 									           			class:"modal-header"
// 									           			}).append($('<button/>',{
// 										                	type:"button",
// 										                	class:"close",
// 										                	"data-dismiss":"modal",
// 										                	"aria-hidden":"true"
// 										               		}).html('x')
// 									            		).append($('<h3/>',{
// 									                		id:"h3_"+modalId
// 									           				}).html(modalHeader))
// 									         		).append($('<div>',{
// 									           			class:"modal-body"
// 									           			}).append(modalBody)
// 									          		).append($('<div>',{
// 									            		class:"modal-footer"
// 									         			}).append($('<button/>',{
// 									                		type:"button",
// 									                		class:"btn btn-default",
// 									                		"data-dismiss":"modal",
// 									                		"aria-hidden":"true"
// 									               			}).html('Cancel')
// 								           	  			).append($('<button/>',{
// 								                			type:"button",
// 								                			class:"btn btn-success",
// 								               				}).html('Done').mousedown(function(e){
// 								                			e.preventDefault();
// 								               				}).click(function(obj){return function(){onSave.apply(obj)}}(this)))
// 	         								  		)
//        											)	
//        									);	
// 			modalElement.appendTo("body");
// 			return modalTrigger;
// 		},

// 		createMenuItem: function(itemSettings, options, returnElement){
// 			//Function to perform multiple actions.supplied arguments: itemsettings-list of buttons and button options, options: options for select input, returnelement: boolean.
// 			//1.Create Select Options using Bootstrap Dropdown.
// 			//2.Create modal dialog using bootstrap options
// 			//3.Create menubar buttons binded with corresponding event actions
// 			typeof returnElement !== 'undefined' ? returnElement : false;

// 			if(itemSettings["select"]){
// 				var menuWrapElement = $("<div/>", {class:"btn-group"});
// 				var menuElement 	= $("<ul/>", {class:"dropdown-menu"});
// 				menuWrapElement.append($('<a/>',{
// 										class:"btn btn-default dropdown-toggle",
// 										"data-toggle":"dropdown",
// 										"href":"javascript:void(0)",
// 										"title":itemSettings["tooltip"]
// 										}).html(itemSettings["default"]).append($("<span/>",{class:"caret"})).mousedown(function(e){
// 											e.preventDefault();
// 										}));
// 				$.each(options,function(i,v){
// 					var option = $('<li/>')
// 		            $("<a/>",{
// 		              tabindex : "-1",
// 		              href : "javascript:void(0)"
// 		            }).html(i).appendTo(option);

// 		            option.click(function(){
// 		            	$(this).parent().parent().data("value", v);
// 		            	$(this).parent().parent().trigger("change")
// 		            });
// 		            menuElement.append(option);		            
// 		        });
// 				var action = "change";
// 		    }
// 		    else if(itemSettings["modal"]){
// 		    	var menuWrapElement = methods.createModal.apply(this,[itemSettings["modalId"], itemSettings["modalHeader"], itemSettings["modalBody"], itemSettings["onSave"]]);		    			    	
// 		    	var menuElement = $("<i/>");
// 		    	if(itemSettings["icon"])
// 					menuElement.addClass(itemSettings["icon"]);
// 				else
// 					menuElement.html(itemSettings["text"]);
// 				menuWrapElement.append(menuElement);
// 				menuWrapElement.mousedown(function(obj, methods, beforeLoad){
// 					return function(e){
// 						e.preventDefault();
// 						methods.saveSelection.apply(obj);
// 						if(beforeLoad){		    	    
// 							beforeLoad.apply(obj); 					
// 				    	}
// 					}
// 				}(this, methods,itemSettings["beforeLoad"]));
// 				menuWrapElement.attr('title', itemSettings['tooltip']);
// 				return menuWrapElement;
// 		    }
// 			else{
// 				var menuWrapElement = $("<a/>",{href:'javascript:void(0)', class:'btn btn-default'});
// 				var menuElement = $("<i/>");
// 				if(itemSettings["icon"])
// 					menuElement.addClass(itemSettings["icon"]);
// 				else
// 					menuElement.html(itemSettings["text"]);
// 				var action = "click";
// 			}
// 			if(itemSettings["custom"]){
// 				menuWrapElement.bind(action, (function(obj, params){
// 						return function(){
// 						methods.saveSelection.apply(obj);
// 						itemSettings["custom"].apply(obj, [$(this), params]);
// 						}
// 					})(this, itemSettings['params']));
// 			}
// 			else{
// 				menuWrapElement.data("commandName", itemSettings["commandname"]);
// 				menuWrapElement.data("editor", $(this).data("editor"));
// 				menuWrapElement.bind(action, function(){ methods.setTextFormat.apply(this) });
// 			}
// 			menuWrapElement.attr('title', itemSettings['tooltip']);
// 			menuWrapElement.css('cursor', 'pointer');
// 			menuWrapElement.append(menuElement);
// 			if(returnElement)
// 				return menuWrapElement;
// 			$(this).data("menuBar").append(menuWrapElement);
// 		},

// 		setTextFormat: function(){			
// 			//Function to run the text formatting options using execCommand.
// 			methods.setStyleWithCSS.apply(this);
// 			document.execCommand($(this).data("commandName"), false, $(this).data("value") || null);
// 			$(this).data("editor").focus();
// 			return false;
// 		},

// 		getSource: function(button, params){
// 			//Function to show the html source code to the editor and toggle the text display.
// 			var flag = 0;
// 			if(button.data('state')){
// 				flag = 1;
// 				button.data('state', null);
// 			}
// 			else
// 				button.data('state', 1);
// 			$(this).data("source-mode", !flag);
// 			var editor = $(this).data('editor');
// 			var content;
// 			if(flag==0){ //Convert text to HTML			
// 				content = document.createTextNode(editor.html());
// 				editor.empty();
// 				editor.attr('contenteditable', false);
// 				preElement = $("<pre/>",{
// 					contenteditable: true					
// 					});
// 				preElement.append(content);				
// 				editor.append(preElement);
// 				button.parent().siblings().hide();
// 				button.siblings().hide();
// 			}
// 			else{
// 				var html = editor.children().first().text();
// 				editor.html(html);
// 				editor.attr('contenteditable', true);
// 				button.parent().siblings().show();
// 				button.siblings().show();
// 			}
// 		},

// 		countWords: function(node){
// 			//Function to count the number of words recursively as the text grows in the editor.
// 			var count = 0;	
//     		var textNodes = node.contents().filter(function() { 
// 				return (this.nodeType == 3); 
// 			});			
// 			for(var index=0;index<textNodes.length;index++){
// 				text = textNodes[index].textContent;
// 				text = text.replace(/[^-\w\s]/gi, ' ');
// 				text = $.trim(text);
// 				count = count + text.split(/\s+/).length;
// 			}
// 			var childNodes = node.children().each(function(){
// 				count = count + methods.countWords.apply(this, [$(this)]);
// 			});
// 			return count
// 		},

// 		countChars: function(node){
// 			//Function to count the number of characters recursively as the text grows in the editor.
// 			var count = 0;
//     		var textNodes = node.contents().filter(function() { 
// 				return (this.nodeType == 3); 
// 			});
// 			for(var index=0;index<textNodes.length;index++){
// 				text = textNodes[index].textContent;
// 				count = count + text.length;
// 			}
// 			var childNodes = node.children().each(function(){
// 				count = count + methods.countChars.apply(this, [$(this)]);
// 			});
// 			return count;
// 		},

// 		getWordCount: function(){
// 			//Function to return the word count of the text in the editor
// 			return methods.countWords.apply(this, [$(this).data("editor")]);
// 		},

// 		getCharCount: function(){
// 			//Function to return the character count of the text in the editor
// 			return methods.countChars.apply(this, [$(this).data("editor")]);
// 		},

// 		rgbToHex: function(rgb){
// 			//Function to convert the rgb color codes into hexadecimal code
// 			rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
// 			return "#" +
// 			("0" + parseInt(rgb[1],10).toString(16)).slice(-2) +
// 			("0" + parseInt(rgb[2],10).toString(16)).slice(-2) +
// 			("0" + parseInt(rgb[3],10).toString(16)).slice(-2);
// 		},

// 		showMessage: function(target,message){
// 			//Function to show the error message. Supplied arguments:target-div id, message-message text to be displayed.
// 			var errorDiv=$('<div/>',{ class:"alert alert-danger"	}
// 				).append($('<button/>',{
// 									type:"button",
// 									class:"close",
// 									"data-dismiss":"alert",
// 									html:"x"
// 				})).append($('<span/>').html(message));
// 			errorDiv.appendTo($('#'+target));
// 			setTimeout(function() { $('.alert').alert('close'); }, 3000);								
// 		},
		
// 		getText: function(){
// 			//Function to get the source code.
// 			if(!$(this).data("source-mode"))
// 				return $(this).data("editor").html();
// 			else
// 				return $(this).data("editor").children().first().text();
// 		},

// 		setText: function(text){
// 			//Function to set the source code
// 			if(!$(this).data("source-mode"))
// 				$(this).data("editor").html(text);
// 			else
// 				$(this).data("editor").children().first().text(text);
// 		},

// 		setStyleWithCSS:function(){
// 			if(navigator.userAgent.match(/MSIE/i)){	//for IE10
// 				try {
//                 	Editor.execCommand("styleWithCSS", 0, false);
//             	} catch (e) {
// 	                try {
// 	                    Editor.execCommand("useCSS", 0, true);
// 	                } catch (e) {
// 	                    try {
// 	                        Editor.execCommand('styleWithCSS', false, false);
// 	                    }
// 	                    catch (e) {
// 	                    }
// 	                }
//             	}
// 			}
// 			else{
// 				document.execCommand("styleWithCSS", null, true);
// 			}
// 		},				

// 	}

// 	$.fn.Editor = function( method ){

// 		if ( methods[method] ) {
// 			return methods[method].apply( this, Array.prototype.slice.call( arguments, 1 ));
// 		} else if ( typeof method === 'object' || ! method ) {
// 			return methods.init.apply( this, arguments );
// 		} else {
// 			$.error( 'Method ' +  method + ' does not exist on jQuery.Editor' );
// 		}    
// 	}; 
// })( jQuery );

// (function (global, factory) {
// 	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
// 	typeof define === 'function' && define.amd ? define(['exports'], factory) :
// 	(factory((global.pell = {})));
// }(this, (function (exports) { 'use strict';

// var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

// var defaultParagraphSeparatorString = 'defaultParagraphSeparator';
// var formatBlock = 'formatBlock';
// var addEventListener = function addEventListener(parent, type, listener) {
//   return parent.addEventListener(type, listener);
// };
// var appendChild = function appendChild(parent, child) {
//   return parent.appendChild(child);
// };
// var createElement = function createElement(tag) {
//   return document.createElement(tag);
// };
// var queryCommandState = function queryCommandState(command) {
//   return document.queryCommandState(command);
// };
// var queryCommandValue = function queryCommandValue(command) {
//   return document.queryCommandValue(command);
// };

// var exec = function exec(command) {
//   var value = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
//   return document.execCommand(command, false, value);
// };

// var defaultActions = {
// bold: {icon: '<b>B</b>',title: 'Bold',state: function state() {return queryCommandState('bold');},result: function result() {return exec('bold');}},
// italic: {icon: '<i>I</i>',title: 'Italic',state: function state() {return queryCommandState('italic');},result: function result() {return exec('italic');}},
// underline: {icon: '<u>U</u>',title: 'Underline',state: function state() {return queryCommandState('underline');},result: function result() {return exec('underline');}},
// strikethrough: {icon: '<strike>S</strike>',title: 'Strike-through',state: function state() {return queryCommandState('strikeThrough');},result: function result() {return exec('strikeThrough');}},
// heading1: {icon: '<b>H<sub>1</sub></b>',title: 'Heading 1',result: function result() {return exec(formatBlock, '<h1>');}},
// heading2: {icon: '<b>H<sub>2</sub></b>',title: 'Heading 2',result: function result() {return exec(formatBlock, '<h2>');}},
// paragraph: {icon: '&#182;',title: 'Paragraph',result: function result() {return exec(formatBlock, '<p>');}},
// quote: {icon: '&#8220; &#8221;',title: 'Quote',result: function result() {return exec(formatBlock, '<blockquote>');}},
// olist: {icon: '<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAGhSURBVGhD7dm9K0VxGMDxG0neklKUkImShcVkMBgopbDYKBmlpBSDBROrwaIsdhYG5T/wUsjLwKTIiAHfp+5TT7f7Uo57nef6fetT955bp/t0z7n9zjmJUCj0Kw1gLKlLNnirAuv4MlbhqgY8wQ7hcpAWpA7hepBn3CdfuxykCkOowS6yDbKMrQKYR6RyDXIK/TyfThCpfzPILNYKYAaRyjWIm4pmkCnoP8eIbAiFoleCTvSiUjZ4rBvn0BP9FZNwVSNknaVDWKNw0ybsl38zr2/gpiPoF19Cn3kvyuGiCSwk9eMCOsQ1bC6WKM24gg7xiXHYYr9obIO9qBJzSC3Wg3TgAXZHZ9DDzZ4jsT60jmGHSFULF8nPmG4A5WaQFexl4Xa5Evrr2tGTRhNclelkd3epWzSDHOAF77CDDMJdctv0ETrEHarhLnmoY38NcYtW2OSqUZcu+SQr8h+VbhAhh50t9qvfUtQlyWM33eEHyqDFepBhTBvb0B3KZa/cXdFi/Vgh09+v2IGbMg1yiXq4aQOHxj4WIU96Q6FQKBShROIboaWfEY6f8hEAAAAASUVORK5CYII=" width="15px">',title: 'Ordered List',result: function result() {return exec('insertOrderedList');}},
// ulist: {icon: '<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAEvSURBVGhD7dm/K0VxGMfxg8RMWQzkb7CzsIiRQQxKKSmLDMrsX7AalL/DxmZTFiYKUQbKr/dzL3V6+g5O6dv3OX3e9eqeW7dTT5177+k5lVJKqVIbxAT6Ou+Cto83fOEO8wjXEmyAuheMw2cDH2awg8adwA9iNuC7QOqz/+0UjTtC6mRr8BU9yAw+UT/RPUbg28ZBBqmr4U+t4BrvOMMkQtf/86qUUipbPRjuHsZtC0+wf/UrTCNcC6jfnphnjMJX9C3KMfwgZh2+om8aWzNI6tKy70u4S8vaxCNsiEtMIWz28zvUPVRKKZW38MuHVdzgA+cIuQ6ahV/QPSC1oLPt424Gy2hca1amrVliL8KfyB4rjMFX9GMFaw+vsCFuMYewDcAevfV23imllFK/VdU3IVxO0eKIC0kAAAAASUVORK5CYII=" width="15px">',title: 'Unordered List',result: function result() {return exec('insertUnorderedList');}},
// code: {icon: '&lt;/&gt;',title: 'Code',result: function result() {return exec(formatBlock, '<pre>');}},
// line: {icon: '&#8213;',title: 'Horizontal Line',result: function result() {return exec('insertHorizontalRule');}},
// link: {icon: '&#128279;',title: 'Link',result: function result() {var url = window.prompt('Enter the link URL');if (url) exec('createLink', url);}},
// unlink:{icon:'<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAASlSURBVGhD7ZnJj1VFFMZbkHEBkQgiYOKCsDCBxMgkYUFcgC5w5wBiQEHYMP0lJAwODEZWDDuiJv4LKBqXGMWAYRAChqiIE6LfL/h1Tir17qt7X7/bj+R9yS/dt27d6jo1nHOqemSooYYaaqhCzRXviKPiE/GxOCK2iNli4PWU+FD8Lf7twJ/iXTFHDKReED+JXOdzXBXLxUDpFfGXiB29IPaJnWKXOCB+ELHOb2KFGAhhRFxKvwj2wgSR6lGBUb8L178sxn3fvCyiETfEYtFNq8Ufwt8xW+MmOnxHuDPXxTOiVLuFv2VZPi5a1yPirHBHboo6RqBJ4opwG5tF62JJuQP/iLWiid4Xboc407pOCHfgDAUNtVe4HYJm67ol3IH1FDTUHuF2PqWgTU0T/uPwpIiaKhY8+LWrDgq3QzrTquaJaMhMYWHEZ+KieJqCCk0U1HM720Srmiz8x78X0wWyEX53SVTNzFbhusSi+aJ1fSswgiQRpUYAz1NETsSgX4XrfiT6Lkac5cRMWHibpkbQ1jfCdXEc6T4bExHsiBMnRfROwEzgaay6RkQREJ8VJSlNbS0Rn4vYsUgvy6k1EQ/iuk15KIxIU/H74rR4SXCSYxnQeVTHCMpo47D4UlwTnBD5yfMH4kUxJgOQGkECuEbkVGoE547tgg7Hup2gHnGE7xqJ4ykj5AarUvFSI1h+X4lYrxRmqTQrGBUfRK/EoahXI5aKH0Wsx74jydwonhcLxSrxhsAzxjMN8P1zoljHhD/+WXRyg6VGMDAMhuuwz94T3W5LuDoinae+v8WYopnh43vCH74lOokGY06UM4K1/bVwnbviVVFHrwm+cxssM/KxSrGx/MF3IndREEUCSO6UMwLtEG6PkaVT1mOCWc2Jct5br4s4M+RjlSJldmWubErEzOSMoCx6Jy7frFmCjc8ApMZ4yfKeehYu2W1x95X7m6PiEOPKXAL0IuKE22Jje08w0tF7RWNshN9RzzPzhIgOYJ3oKI6VrhhzpyYi2LktvJOVdhZ4nvH/z7Q8ztgp4Xc4go7ioO+KeJZexKZ0W7jUqJwxt5Pn1Aj0pvD7cxR0EjeBrsiVDClIU8W4sZKCRDljTM4IRLxxHfZJR3FFGe9q6+yT9CQXM4NFFGTEckpngmfKc6Id16P9Sh0Srsz1JdeY3UTQPP/g11H1Y0aI/K5TOSMI7xJv+rhY5oI5l7gRZ/DpeCX8fFyKrGG3sYmCoJwRY7pHLK70udqPDXP1zzUNRsF+ESM7cLKzot8nd7JyRvBc4rU4QvhdsTNaJpi+2HAVpPmcJC3OE36H/ycOoKZxhPN7jCO1rmPZ/OyZuHFTcA7HRXpRQOSNAxFHsElkj1kH/zuJlx7F4mof10yQI2iSAdAwuVlVNhpzN/YQOZPFSKdGWJR7JtAGEXOtt0WrwkHEwEgWGxPHEmFEzH65BOma/fZDzFh0xYws6UW3Oyvek2nEmSAJLTqP9Euc7KIxwMbFC+GaiQ8+IeJiKU9PiBhR64TYLzGScZnV4QsxrjORij1DAC29RSEws7G7HfDGTbhOzhPsFUYbN42L5yfPuGreV7jYkZH/AKFhQlKp3jgAAAAAAElFTkSuQmCC" width="15px">',title:"Unlink",result:function(){return exec('unlink')}},
// image: {icon: '&#128247;',title: 'Image',result: function result() {var url = window.prompt('Enter the image URL');if (url) exec('insertImage', url);}}
// ,justifyLeft:{icon:'<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAACOSURBVGhD7dixDYQwEERRJxRwIR1QBPElxPREKRRDREMwrsBOWFbDf9LPvRIWKxcAAGBuUL/k1TM2LepKXj1jE4ME1jWIzR1BNrM6AtvVI6Iv+6keYTPIqNbA/gqfMKktefWMTTYris0gNp8WsrH5IdqsKDaD2KzxyIYHusC6VhQGCaxrEB7oAADAq0q5AYd4KPsuwNLDAAAAAElFTkSuQmCC" width="15px">',title:"Align Left",result:function(){return exec('justifyLeft')}},
// justifyRight:{icon:'<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAACSSURBVGhD7dixCYAwEEbhNA5g6QYOYW1j7U6O4jBWLqSXXsgh5Iw/74PX58DDkAQAAMR1Vt94+YxFi3U1Xj5jEYME5hpEZkegYLeOwCaritN6WspauZb9DZlBZmsNbLDwO6O1NV4+Y5HMFUVmEJlPCwpkfojctV5WbRCZazxq4oEuMNeyM0hgrkF4oAMAAJ9K6QZQyij7CV5mPwAAAABJRU5ErkJggg==" width="15px">',title:"Align Right",result:function(){return exec('justifyRight')}},
// justifyCenter:{icon:'<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAACUSURBVGhD7dfBDYAgDEBRLt5MjFu4i2d3cjh30vZOAolQS/0v+WdpIogJAAAEN0mr83SNRbt0O0/XWMQghlUNEmaPYBSzdBmnz2xukXIbr2f6zObCDKInxWEcp1Mom3Q6T9dYxF3LsKpBwrxaGEWYDyJ3rRd1GSTMNR5f0ZMi98PvqarTjLuWYf8aJMweAQAAY0rpAWwhKPvu8FH3AAAAAElFTkSuQmCC" width="15px">',title:"Align Center",result:function(){return exec('justifyCenter')}},
// justifyFull:{icon:'<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAACESURBVGhD7dixDYBACEbhaxzA0g0cwg2s3cnh3ElhAqjwF9+XvB4SPc0NAADQ3GTN4vmMod26xfMZQyxSWGqRNu8I1GzWJZ7PGOLUKiy1yGId4vmM+JzVOsXzGUOcWoWlFmnzaEFNmw8ip1ZhqUXa/MZDDRd0hf3r1GqzCBd0AADgVWM8Tb120zvb4ToAAAAASUVORK5CYII=" width="15px">',title:"Align Justify",result:function(){return exec('justifyFull')}}
// };

// var defaultClasses = {
//   actionbar: 'pell-actionbar',
//   button: 'pell-button',
//   content: 'pell-content',
//   selected: 'pell-button-selected'
// };

// var init = function init(settings) {
//   var actions = settings.actions ? settings.actions.map(function (action) {
//     if (typeof action === 'string') return defaultActions[action];else if (defaultActions[action.name]) return _extends({}, defaultActions[action.name], action);
//     return action;
//   }) : Object.keys(defaultActions).map(function (action) {
//     return defaultActions[action];
//   });

//   var classes = _extends({}, defaultClasses, settings.classes);

//   var defaultParagraphSeparator = settings[defaultParagraphSeparatorString] || 'div';

//   var actionbar = createElement('div');
//   actionbar.className = classes.actionbar;
//   appendChild(settings.element, actionbar);

//   var content = settings.element.content = createElement('div');
//   content.contentEditable = true;
//   content.className = classes.content;
//   content.oninput = function (_ref) {
//     var firstChild = _ref.target.firstChild;

//     if (firstChild && firstChild.nodeType === 3) exec(formatBlock, '<' + defaultParagraphSeparator + '>');else if (content.innerHTML === '<br>') content.innerHTML = '';
//     // settings.onChange(content.innerHTML);
//   };
//   content.onkeydown = function (event) {
//     if (event.key === 'Tab') {
//       event.preventDefault();
//     } else if (event.key === 'Enter' && queryCommandValue(formatBlock) === 'blockquote') {
//       setTimeout(function () {
//         return exec(formatBlock, '<' + defaultParagraphSeparator + '>');
//       }, 0);
//     }
//   };
//   appendChild(settings.element, content);

//   actions.forEach(function (action) {
//     var button = createElement('button');
//     button.className = classes.button;
//     button.innerHTML = action.icon;
//     button.title = action.title;
//     button.setAttribute('type', 'button');
//     button.onclick = function () {
//       return action.result() && content.focus();
//     };

//     if (action.state) {
//       var handler = function handler() {
//         return button.classList[action.state() ? 'add' : 'remove'](classes.selected);
//       };
//       addEventListener(content, 'keyup', handler);
//       addEventListener(content, 'mouseup', handler);
//       addEventListener(button, 'click', handler);
//     }

//     appendChild(actionbar, button);
//   });

//   if (settings.styleWithCSS) exec('styleWithCSS');
//   exec(defaultParagraphSeparatorString, defaultParagraphSeparator);

//   return settings.element;
// };

// var pell = { exec: exec, init: init };

// exports.exec = exec;
// exports.init = init;
// exports['default'] = pell;

// Object.defineProperty(exports, '__esModule', { value: true });

// })));

function f1() {
	//function to make the text bold using DOM method
	document.getElementById("textarea1").style.fontWeight = "bold";
	console.log(selectedText)
}

function f2() {
	//function to make the text italic using DOM method
	document.getElementById("textarea1").style.fontStyle = "italic";
}

function f3() {
	//function to make the text alignment left using DOM method
	document.getElementById("textarea1").style.textAlign = "left";
}

function f4() {
	//function to make the text alignment center using DOM method
	document.getElementById("textarea1").style.textAlign = "center";
}

function f5() {
	//function to make the text alignment right using DOM method
	document.getElementById("textarea1").style.textAlign = "right";
}

function f6() {
	//function to make the text in Uppercase using DOM method
	document.getElementById("textarea1").style.textTransform = "uppercase";
}

function f7() {
	//function to make the text in Lowercase using DOM method
	document.getElementById("textarea1").style.textTransform = "lowercase";
}

function f8() {
	//function to make the text capitalize using DOM method
	document.getElementById("textarea1").style.textTransform = "capitalize";
}

function f9() {
	//function to make the text back to normal by removing all the methods applied
	//using DOM method
	document.getElementById("textarea1").style.fontWeight = "normal";
	document.getElementById("textarea1").style.textAlign = "left";
	document.getElementById("textarea1").style.fontStyle = "normal";
	document.getElementById("textarea1").style.textTransform = "capitalize";
	document.getElementById("textarea1").value = " ";
}
