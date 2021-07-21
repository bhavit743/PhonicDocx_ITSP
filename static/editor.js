// function getSelectedText() 
// {
//     // obtain the object reference for the <textarea>
//     var txtarea = document.getElementById("textarea1");
//     // obtain the index of the first selected character
//     var start = txtarea.selectionStart;
//     // obtain the index of the last selected character
//     var finish = txtarea.selectionEnd;
//     // obtain the selected text
//     window.sel = txtarea.value.substring(start, finish);
//     // do something with the selected content
// 	window.iDiv = document.createElement('div');

// iDiv.id = 'temp';
// iDiv.className = 'temp1';
// iDiv.innerHTML += sel
// }


function f1() {
	//function to make the text bold using DOM method
	document.getElementById("textarea2").style.fontWeight = "bold";
}

function f2() {
	//function to make the text italic using DOM method
	document.getElementById("textarea2").style.fontStyle = "italic";
}

function f3() {
	//function to make the text alignment left using DOM method
	document.getElementById("textarea2").style.textAlign = "left";
}

function f4() {
	//function to make the text alignment center using DOM method
	document.getElementById("textarea2").style.textAlign = "center";
}

function f5() {
	//function to make the text alignment right using DOM method
	document.getElementById("textarea2").style.textAlign = "right";
}

function f6() {
	//function to make the text in Uppercase using DOM method
	document.getElementById("textarea2").style.textTransform = "uppercase";
}

function f7() {
	//function to make the text in Lowercase using DOM method
	document.getElementById("textarea2").style.textTransform = "lowercase";
}

function f8() {
	//function to make the text capitalize using DOM method
	document.getElementById("textarea2").style.textTransform = "capitalize";
}

function f9() {
	//function to make the text back to normal by removing all the methods applied
	//using DOM method
	document.getElementById("textarea2").style.fontWeight = "normal";
	document.getElementById("textarea2").style.textAlign = "left";
	document.getElementById("textarea2").style.fontStyle = "normal";
	document.getElementById("textarea2").style.textTransform = "capitalize";
	document.getElementById("textarea2").value = " ";
}

